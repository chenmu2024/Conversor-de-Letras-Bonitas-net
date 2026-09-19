interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type PagesFunction<T = unknown> = (context: {
  request: Request;
  env: T;
  params: Record<string, string | string[]>;
  data: Record<string, unknown>;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}) => Response | Promise<Response>;

const ALLOWED_ORIGINS = new Set([
  'https://conversordeletrasbonitas.net',
  'https://www.conversordeletrasbonitas.net',
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TOPICS = new Set(['sugerencia', 'error', 'duda']);
const MAX_CONTENT_LENGTH = 10240; // 10 KB

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const origin = request.headers.get('Origin') || request.headers.get('origin');

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Origen de petición no autorizado.',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const corsHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(origin && ALLOWED_ORIGINS.has(origin) ? { 'Access-Control-Allow-Origin': origin } : {}),
  };

  // 1. Content-Length validation limit
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_CONTENT_LENGTH) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'El tamaño de la petición excede el límite permitido (10 KB).',
      }),
      { status: 413, headers: corsHeaders }
    );
  }

  try {
    const data = await request.json().catch(() => null) as {
      name?: string;
      email?: string;
      topic?: string;
      message?: string;
      website?: string; // Honeypot field
      turnstileToken?: string;
    } | null;

    if (!data) {
      return new Response(
        JSON.stringify({ success: false, error: 'Datos no válidos.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 2. Honeypot check - if filled by bot, silently return success
    if (data.website && typeof data.website === 'string' && data.website.trim() !== '') {
      return new Response(
        JSON.stringify({ success: true, message: 'Mensaje enviado correctamente.' }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 3. Turnstile bot protection verification if configured
    if (env.TURNSTILE_SECRET_KEY) {
      const turnstileToken = data.turnstileToken || request.headers.get('CF-Turnstile-Token');
      if (!turnstileToken) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Verificación de seguridad requerida (Turnstile).',
          }),
          { status: 400, headers: corsHeaders }
        );
      }

      const clientIp = request.headers.get('CF-Connecting-IP') || '';
      const turnstileParams = new URLSearchParams();
      turnstileParams.append('secret', env.TURNSTILE_SECRET_KEY);
      turnstileParams.append('response', turnstileToken);
      if (clientIp) turnstileParams.append('remoteip', clientIp);

      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: turnstileParams.toString(),
      });

      const outcome = await turnstileRes.json().catch(() => null) as { success?: boolean } | null;
      if (!outcome || !outcome.success) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'La verificación de seguridad ha fallado. Por favor, recarga la página.',
          }),
          { status: 403, headers: corsHeaders }
        );
      }
    }

    // 4. Validate message body
    if (!data.message || typeof data.message !== 'string' || !data.message.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El campo de mensaje es obligatorio.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const name = (typeof data.name === 'string' ? data.name : 'Anónimo').trim().slice(0, 100);
    const rawEmail = (typeof data.email === 'string' ? data.email : '').trim().slice(0, 254);
    const isValidEmail = rawEmail.length > 0 && EMAIL_REGEX.test(rawEmail);
    const rawTopic = typeof data.topic === 'string' ? data.topic.trim().toLowerCase() : 'sugerencia';
    const topic = ALLOWED_TOPICS.has(rawTopic) ? rawTopic : 'sugerencia';
    const message = data.message.trim().slice(0, 5000);

    const recipientEmail = env.CONTACT_EMAIL || 'soporte@conversordeletrasbonitas.net';

    // If Resend API key is configured, send the email via Resend
    if (env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Conversor de Letras Bonitas <contacto@conversordeletrasbonitas.net>',
          to: recipientEmail,
          reply_to: isValidEmail ? rawEmail : undefined,
          subject: `[Contacto - ${topic}] Nuevo mensaje de ${name || 'Usuario'}`,
          text: `Nuevo mensaje recibido a través del formulario de contacto:\n\nNombre: ${name}\nEmail: ${rawEmail || 'No proporcionado'}\nMotivo: ${topic}\n\nMensaje:\n${message}\n\nFecha: ${new Date().toISOString()}`,
        }),
      });

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error('Error enviando con Resend:', errorText);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.',
          }),
          { status: 502, headers: corsHeaders }
        );
      }

      const resData = await resendResponse.json() as { id?: string };
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Mensaje enviado correctamente.',
          ticketId: resData?.id || undefined,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // If Resend API Key is not configured
    console.warn('RESEND_API_KEY no configurado en Cloudflare Pages / entorno.');
    return new Response(
      JSON.stringify({
        success: false,
        error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.',
        details: 'El servicio de correo no está configurado actualmente.',
      }),
      { status: 503, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('Error procesando /api/contact:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};
