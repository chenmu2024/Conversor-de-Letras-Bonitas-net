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
              if (!data.message || !data.message.trim()) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                  success: false,
                  error: 'El campo de mensaje es obligatorio.',
                }));
                return;
              }

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
                    reply_to: data.email && data.email.includes('@') ? data.email : undefined,
                    subject: `[Contacto - ${data.topic || 'general'}] Nuevo mensaje de ${data.name || 'Anónimo'}`,
                    text: `Nuevo mensaje recibido:\n\nNombre: ${data.name}\nEmail: ${data.email}\nMotivo: ${data.topic}\nMensaje:\n${data.message}`,
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
                // Without RESEND_API_KEY, return clear failure without faking success
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
