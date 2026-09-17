interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
}

type PagesFunction<T = unknown> = (context: {
  request: Request;
  env: T;
  params: Record<string, string | string[]>;
  data: Record<string, unknown>;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Handle CORS headers if needed
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const data = await request.json().catch(() => null) as {
      name?: string;
      email?: string;
      topic?: string;
      message?: string;
    } | null;

    if (!data || !data.message || typeof data.message !== 'string' || !data.message.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El campo de mensaje es obligatorio.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const name = (data.name || 'Anónimo').trim().slice(0, 100);
    const email = (data.email || 'No proporcionado').trim().slice(0, 120);
    const topic = (data.topic || 'general').trim().slice(0, 50);
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
          reply_to: email.includes('@') ? email : undefined,
          subject: `[Contacto - ${topic}] Nuevo mensaje de ${name}`,
          text: `Nuevo mensaje recibido a través del formulario de contacto:\n\nNombre: ${name}\nEmail: ${email}\nMotivo: ${topic}\n\nMensaje:\n${message}\n\nFecha: ${new Date().toISOString()}`,
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

    // If Resend API Key is not configured, do not pretend to succeed
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
