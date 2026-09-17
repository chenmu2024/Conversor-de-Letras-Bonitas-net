import React from 'react';
import { Lock, EyeOff, Database, ShieldAlert, CheckCircle, RefreshCcw, Cookie, Globe2, AlertCircle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black shadow-xs">
          <Lock className="w-4 h-4" />
          <span>Cumplimiento RGPD (GDPR), CCPA y Google AdSense</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Política de Privacidad y Cookies
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Última actualización: Agosto de 2026. Tu privacidad, seguridad y el control de tus datos son nuestra prioridad absoluta.
        </p>
      </div>

      {/* Main Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <EyeOff className="w-5 h-5" />
            <span>Sin Registro ni Datos Personales</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            No necesitas crearte una cuenta, iniciar sesión ni proporcionar tu correo electrónico, número de teléfono o datos bancarios para usar nuestras herramientas.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <Database className="w-5 h-5" />
            <span>Procesamiento Local en Navegador</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            El texto introducido directamente en el conversor se procesa localmente en tu navegador y no se envía automáticamente a nuestro servidor. Si utilizas una función de compartir mediante URL, el texto puede quedar incluido en el enlace generado y, por tanto, puede aparecer en el historial del navegador, registros técnicos o servicios donde compartas dicho enlace.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <RefreshCcw className="w-5 h-5" />
            <span>Almacenamiento Local (localStorage)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tus fuentes marcadas como favoritas y tu historial temporal de copiado se guardan exclusivamente en el almacenamiento interno de tu navegador y puedes borrarlos cuando quieras.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
            <span>Cero Venta de Información</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cumplimos estrictamente con la ley CCPA de California: <em>No vendemos ni compartimos su información personal</em> (Do Not Sell My Personal Information).
          </p>
        </div>
      </div>

      {/* Comprehensive Detailed Policy Clauses */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* 1. Responsable */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">1</span>
            Responsable del Tratamiento de Datos
          </h2>
          <p>
            El sitio web <strong>conversordeletrasbonitas.net</strong> opera como una plataforma gratuita de utilidades tipográficas y procesamiento de glifos Unicode. Actuamos bajo el principio de minimización de datos estipulado en el Artículo 5(1)(c) del Reglamento General de Protección de Datos de la Unión Europea (RGPD / GDPR). Para cualquier asunto relacionado con la privacidad, puede comunicarse a: <span className="font-mono font-bold text-indigo-600" dangerouslySetInnerHTML={{ __html: '<!--email_off-->privacidad@conversordeletrasbonitas.net<!--/email_off-->' }} />.
          </p>
        </section>

        {/* 2. Publicidad de Terceros y Cookies de Google AdSense (Crucial for AdSense) */}
        <section className="space-y-3 bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80">
          <h2 className="font-bold text-base text-amber-950 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-amber-600" />
            <span>2. Publicidad, Proveedores de Terceros y Cookie DoubleClick de Google</span>
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            <p>
              Para mantener este servicio completamente gratuito, este sitio web utiliza servicios de publicidad de terceros, incluyendo <strong>Google AdSense</strong>. Le informamos sobre las siguientes prácticas estándar de la industria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Proveedores de terceros</strong>, incluido Google, utilizan cookies para publicar anuncios en función de las visitas anteriores de un usuario a este sitio web o a otros sitios web de Internet.
              </li>
              <li>
                El uso de cookies de publicidad por parte de Google (como la cookie de <strong>DoubleClick DART</strong>) permite a Google y a sus socios comerciales mostrar anuncios pertinentes a los usuarios en función de sus visitas a este y otros sitios en la red.
              </li>
              <li>
                <strong>Inhabilitación de publicidad personalizada:</strong> Los usuarios pueden inhabilitar la publicidad personalizada visitando la{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-800 underline hover:text-amber-950"
                >
                  Configuración de Anuncios de Google
                </a>
                . De forma alternativa, los usuarios pueden inhabilitar el uso de cookies de proveedores de terceros para la publicidad personalizada visitando{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-800 underline hover:text-amber-950"
                >
                  www.aboutads.info
                </a>{' '}
                o el portal de la{' '}
                <a
                  href="https://www.networkadvertising.org/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-800 underline hover:text-amber-950"
                >
                  Network Advertising Initiative (NAI)
                </a>
                .
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Clasificación de Cookies */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">3</span>
            Tipos de Cookies Utilizadas en Este Sitio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Cookies Técnicas / Esenciales</span>
              <p className="text-slate-600">
                Imprescindibles para recordar sus preferencias de visualización, tema (claro/oscuro) y estado de aceptación del banner de consentimiento.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Cookies Analíticas</span>
              <p className="text-slate-600">
                Nos permiten contabilizar visitas y fuentes de tráfico agregadas de forma anónima para medir y mejorar el rendimiento de la aplicación.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Cookies Publicitarias</span>
              <p className="text-slate-600">
                Establecidas por socios publicitarios autorizados para mostrar anuncios relevantes acordes a sus intereses y limitar la frecuencia de un mismo anuncio.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Derechos RGPD */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">4</span>
            Derechos de los Usuarios según el RGPD / GDPR (Unión Europea)
          </h2>
          <p>
            Si usted reside en el Espacio Económico Europeo (EEE), tiene garantizados los siguientes derechos respecto a sus datos:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
            <li><strong>Derecho de acceso:</strong> Conocer si se están tratando datos personales.</li>
            <li><strong>Derecho de rectificación o supresión:</strong> Solicitar la eliminación de cualquier registro.</li>
            <li><strong>Derecho de oposición y limitación:</strong> Oponerse al tratamiento de datos con fines publicitarios.</li>
            <li><strong>Derecho a retirar el consentimiento:</strong> Puede revocar su autorización de cookies en cualquier momento borrando el almacenamiento del navegador o a través de nuestro banner de configuración.</li>
          </ul>
        </section>

        {/* 5. Cumplimiento CCPA / CPRA & Leyes de Protección de Datos en Latinoamérica */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">5</span>
            Derechos de Privacidad en California (CCPA / CPRA) y Latinoamérica
          </h2>
          <p>
            En cumplimiento de las normativas de California (CCPA/CPRA) y los marcos de protección de datos de Latinoamérica (como la Ley Federal de Protección de Datos Personales en México, Ley 25.326 de Argentina, Ley 1581 de Colombia y LGPD de Brasil):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
            <li><strong>No vendemos datos personales:</strong> No comercializamos, alquilamos ni cedemos información identificable con terceros ni intermediarios publicitarios.</li>
            <li><strong>Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición):</strong> Los usuarios de cualquier país pueden solicitar el borrado de cualquier dato técnico transmitido en consultas de soporte.</li>
            <li><strong>Derecho a no discriminación:</strong> Todos los usuarios acceden a la totalidad de las fuentes y herramientas sin restricción independientemente de las opciones de privacidad seleccionadas.</li>
          </ul>
        </section>

        {/* 6. Privacidad Infantil (COPPA) */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">6</span>
            Protección de la Privacidad de los Menores (COPPA)
          </h2>
          <p>
            Nuestros servicios son utilidades de texto generales y no están dirigidos a menores de 13 años. No recopilamos a sabiendas información de identificación personal de niños. Si cree que un menor ha proporcionado información en nuestro sitio web, contáctenos inmediatamente para su eliminación.
          </p>
        </section>

        {/* 7. Cómo Gestionar o Bloquear Cookies en su Navegador */}
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">7</span>
            Gestión y Desactivación de Cookies en el Navegador
          </h2>
          <p>
            Usted puede configurar su navegador para que rechace todas las cookies o le avise cuando se envía una cookie:
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold">Google Chrome: Ajustes &gt; Privacidad y Seguridad</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold">Mozilla Firefox: Opciones &gt; Privacidad y Seguridad</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold">Apple Safari: Preferencias &gt; Privacidad</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold">Microsoft Edge: Configuración &gt; Permisos de Sitios</span>
          </div>
        </section>
      </div>

      {/* Trust Seal */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <CheckCircle className="w-4 h-4 text-emerald-500" />
        <span>Garantía de Privacidad, Transparencia y Cumplimiento Digital 2026</span>
      </div>
    </div>
  );
};
