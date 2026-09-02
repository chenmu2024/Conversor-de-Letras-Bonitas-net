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
          <span>Guía de Cookies RGPD / ePrivacy & Google AdSense</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Política de Cookies
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Última actualización: Agosto de 2026. Te explicamos qué son las cookies, qué tipos utilizamos en este sitio y cómo puedes configurarlas o rechazarlas en cualquier momento.
        </p>
      </div>

      {/* Quick Action Box */}
      <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sliders className="w-6 h-6 text-indigo-600 shrink-0" />
          <div>
            <div className="font-bold text-sm text-slate-900">Panel de Control y Preferencias de Cookies</div>
            <p className="text-xs text-slate-600">Puedes activar o desactivar las cookies analíticas y publicitarias cuando lo desees.</p>
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

        {/* Section 2: Google AdSense and DoubleClick Cookie */}
        <section className="space-y-3 bg-amber-50/70 p-5 sm:p-6 rounded-2xl border border-amber-200">
          <h2 className="font-bold text-base text-amber-950 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-600" />
            <span>2. Cookies de Terceros y Publicidad de Google AdSense</span>
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <p>
              Este sitio web puede utilizar <strong>Google AdSense</strong> para mostrar anuncios relevantes y no intrusivos que permiten mantener todas nuestras herramientas 100% gratuitas. Respecto a este servicio:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Google y proveedores externos:</strong> Utilizan cookies (como la cookie de <strong>DoubleClick DART</strong>) para publicar anuncios basados en las visitas previas de un usuario a este sitio web o a otros sitios de Internet.
              </li>
              <li>
                <strong>Publicidad personalizada:</strong> Los anuncios que se muestran pueden ser personalizados o no personalizados según las preferencias que haya seleccionado en nuestro banner de consentimiento.
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

        {/* Section 3: Cookie Table */}
        <section className="space-y-3">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">3</span>
            Tabla Detallada de Cookies Utilizadas
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Proveedor</th>
                  <th className="p-3">Finalidad</th>
                  <th className="p-3">Duración</th>
                  <th className="p-3">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_cookie_consent</td>
                  <td className="p-3">Propia</td>
                  <td className="p-3">Almacena el estado de aceptación del banner de cookies del usuario.</td>
                  <td className="p-3">12 meses</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Técnica</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">letras_favorites_v1</td>
                  <td className="p-3">Propia (localStorage)</td>
                  <td className="p-3">Guarda las fuentes y nicks que el usuario marca con la estrella de favoritos.</td>
                  <td className="p-3">Persistente local</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Funcional</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">__gads / __gpi</td>
                  <td className="p-3">Google AdSense</td>
                  <td className="p-3">Permite a Google medir el rendimiento de los anuncios y evitar fraudes o impresiones repetitivas.</td>
                  <td className="p-3">13 meses</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Publicitaria</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-indigo-600">IDE / DSID</td>
                  <td className="p-3">Google DoubleClick</td>
                  <td className="p-3">Utilizada para reorientar, medir la conversión de anuncios y limitar la frecuencia de visualización.</td>
                  <td className="p-3">12 meses</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Publicitaria</span></td>
                </tr>
              </tbody>
            </table>
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
        <span>Política de Cookies Conforme al Reglamento General de Protección de Datos (RGPD UE 2016/679)</span>
      </div>
    </div>
  );
};
