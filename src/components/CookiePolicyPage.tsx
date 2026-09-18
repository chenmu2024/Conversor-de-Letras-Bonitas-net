import React from 'react';
import { Cookie, Shield, CheckCircle2, Sliders, ExternalLink, RefreshCw, Lock } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  const handleOpenCookieSettings = () => {
    const win = window as unknown as { openCookiePreferences?: () => void };
    if (win.openCookiePreferences) {
      win.openCookiePreferences();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black shadow-xs">
          <Cookie className="w-4 h-4 text-amber-600" />
          <span>Guía de Cookies, Privacidad y Preferencias</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Política de Cookies
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Última actualización: Septiembre de 2026. Te explicamos qué son las cookies, qué almacenamiento utilizamos en este sitio y cómo puedes configurarlo o rechazarlo en cualquier momento.
        </p>
      </div>

      {/* Quick Action Box */}
      <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sliders className="w-6 h-6 text-indigo-600 shrink-0" />
          <div>
            <div className="font-bold text-sm text-slate-900">Panel de Control y Preferencias de Cookies</div>
            <p className="text-xs text-slate-600">Puedes gestionar las preferencias disponibles desde este panel. Si en el futuro se habilitan servicios analíticos o publicitarios, también podrás gestionar su consentimiento desde aquí.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpenCookieSettings}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap active:scale-95"
        >
          ⚙️ Modificar mis Preferencias
        </button>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Section 1: What is a cookie */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">1</span>
            ¿Qué es una Cookie?
          </h2>
          <p>
            Una cookie es un pequeño archivo de texto que los sitios web descargan en su ordenador, teléfono inteligente o tableta cuando accede a determinadas páginas. Las cookies permiten a un sitio web almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario y optimizar la experiencia de navegación.
          </p>
        </section>

        {/* Section 2: Optional third party and advertising services */}
        <section className="space-y-3 bg-amber-50/70 p-5 sm:p-6 rounded-2xl border border-amber-200">
          <h2 className="font-bold text-base text-amber-950 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-600" />
            <span>2. Cookies de Terceros y Servicios Opcionales</span>
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <p>
              Actualmente el conversor funciona mediante almacenamiento local y cookies técnicas. Si en el futuro se incorporan servicios publicitarios de terceros como <strong>Google AdSense</strong> o herramientas analíticas:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Google y proveedores externos:</strong> Podrán utilizar cookies (como la cookie de <strong>DoubleClick DART</strong>) para publicar anuncios basados en las visitas previas de un usuario a este sitio web o a otros sitios de Internet.
              </li>
              <li>
                <strong>Publicidad personalizada:</strong> Los anuncios que se muestren podrán ser personalizados o no personalizados según las preferencias que haya seleccionado en el banner de consentimiento.
              </li>
              <li>
                <strong>Cómo inhabilitar la publicidad personalizada:</strong> Puede gestionar o inhabilitar la personalización de anuncios en cualquier momento visitando la{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-800 underline hover:text-amber-950"
                >
                  Configuración de Anuncios de Google
                </a>{' '}
                o el portal de la Digital Advertising Alliance en{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-800 underline hover:text-amber-950"
                >
                  www.aboutads.info
                </a>.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Storage and Cookie Table */}
        <section className="space-y-3">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">3</span>
            Cookies y almacenamiento local actualmente utilizados
          </h2>
          <p className="text-xs text-slate-600">
            A continuación se detallan los elementos de almacenamiento local (<code>localStorage</code>) y cookies técnicas que la aplicación utiliza en su dispositivo para su correcto funcionamiento:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Nombre / Clave</th>
                  <th className="p-3">Mecanismo</th>
                  <th className="p-3">Finalidad y Uso</th>
                  <th className="p-3">Duración</th>
                  <th className="p-3">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_cookie_consent</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda la elección general de privacidad / consentimiento.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Técnica</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_cookies_analytics</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda la preferencia del usuario respecto a servicios analíticos opcionales. Actualmente puede permanecer en false si no hay analítica habilitada.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Preferencia</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_cookies_ads</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda la preferencia del usuario respecto a servicios publicitarios opcionales. Actualmente puede permanecer en false si no hay publicidad habilitada.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Preferencia</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_bonitas_theme</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda la preferencia de tema claro / oscuro.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Técnica</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_bonitas_favs</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda localmente las fuentes o estilos marcados como favoritos.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Funcional</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_bonitas_copy_history</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda localmente el historial reciente de textos o estilos copiados.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Funcional</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">conversor_feedback</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda localmente la valoración simple Sí / No de la herramienta.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Funcional</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">feedback_*</td>
                  <td className="p-3">Almacenamiento local (localStorage)</td>
                  <td className="p-3">Guarda localmente si una guía concreta fue marcada como útil (clave dinámica según el artículo).</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Funcional</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Prospective cookies section */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600 mt-3">
            <strong className="text-slate-800">Cookies que podrían utilizarse si se habilitan servicios publicitarios o de terceros:</strong>
            <p>
              Si en el futuro se activan servicios de publicidad como Google AdSense o herramientas analíticas, los proveedores externos pueden utilizar cookies HTTP en el navegador (como <code>__gads</code>, <code>__gpi</code>, <code>IDE</code> o <code>DSID</code>) según sus políticas y las opciones de consentimiento del usuario para medir impresiones y prevenir fraudes.
            </p>
          </div>
        </section>

        {/* Section 4: How to Disable in Browsers */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">4</span>
            Cómo Desactivar o Eliminar Cookies desde su Navegador
          </h2>
          <p>
            Además de nuestro panel de control, usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador web que utilice:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies de terceros.</li>
            <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.</li>
            <li><strong>Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
            <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio &gt; Administrar y eliminar cookies.</li>
          </ul>
        </section>

        {/* Section 5: Updates */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">5</span>
            Actualizaciones y Cambios en la Política de Cookies
          </h2>
          <p>
            Podemos modificar esta Política de Cookies en función de nuevas exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos (AEPD) o el Comité Europeo de Protección de Datos (CEPD).
          </p>
        </section>
      </div>

      {/* Trust Seal */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <span>Política de Cookies y Transparencia de Datos · Última revisión: Septiembre 2026</span>
      </div>
    </div>
  );
};
