import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function contactApiDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              const data = JSON.parse(body || '{}');

              // Honeypot check
              if (data.website && typeof data.website === 'string' && data.website.trim() !== '') {
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, message: 'Mensaje enviado correctamente.' }));
                return;
              }

              if (!data.message || typeof data.message !== 'string' || !data.message.trim()) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                  success: false,
                  error: 'El campo de mensaje es obligatorio.',
                }));
                return;
              }

              const name = (typeof data.name === 'string' ? data.name : 'Anónimo').trim().slice(0, 100);
              const email = (typeof data.email === 'string' ? data.email : '').trim().slice(0, 254);
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const isValidEmail = email.length > 0 && emailRegex.test(email);
              const allowedTopics = new Set(['sugerencia', 'error', 'duda']);
              const topic = allowedTopics.has(data.topic) ? data.topic : 'sugerencia';
              const message = data.message.trim().slice(0, 5000);

              const resendApiKey = process.env.RESEND_API_KEY;
              if (resendApiKey) {
                fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: 'Conversor de Letras Bonitas <contacto@conversordeletrasbonitas.net>',
                    to: process.env.CONTACT_EMAIL || 'soporte@conversordeletrasbonitas.net',
                    reply_to: isValidEmail ? email : undefined,
                    subject: `[Contacto - ${topic}] Nuevo mensaje de ${name}`,
                    text: `Nuevo mensaje recibido:\n\nNombre: ${name}\nEmail: ${email || 'No proporcionado'}\nMotivo: ${topic}\nMensaje:\n${message}`,
                  }),
                })
                  .then(async (resp) => {
                    if (!resp.ok) {
                      res.statusCode = 502;
                      res.end(JSON.stringify({
                        success: false,
                        error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.',
                      }));
                    } else {
                      const resData = await resp.json();
                      res.statusCode = 200;
                      res.end(JSON.stringify({
                        success: true,
                        message: 'Mensaje enviado correctamente.',
                        ticketId: resData?.id,
                      }));
                    }
                  })
                  .catch(() => {
                    res.statusCode = 500;
                    res.end(JSON.stringify({
                      success: false,
                      error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.',
                    }));
                  });
              } else {
                // Without RESEND_API_KEY, return clear 503 without faking success
                res.statusCode = 503;
                res.end(JSON.stringify({
                  success: false,
                  error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.',
                  details: 'El servicio de correo no está configurado actualmente.',
                }));
              }
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({
                success: false,
                error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.',
              }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), contactApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
