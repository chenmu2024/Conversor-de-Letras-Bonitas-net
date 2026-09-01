import React from 'react';
import { Scale, ShieldCheck, FileText, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black shadow-xs">
          <Scale className="w-4 h-4" />
          <span>Aviso Legal y Condiciones de Servicio</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Términos y Condiciones de Uso
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Última actualización: Agosto de 2026. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones.
        </p>
      </div>

      {/* Main Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <FileText className="w-5 h-5" />
            <span>Servicio Gratuito y Libre</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            El acceso a todas las herramientas de conversión de fuentes y catálogo de símbolos es libre, abierto e ilimitado para cualquier usuario.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Estándar Unicode Público</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Las representaciones tipográficas generadas pertenecen al dominio público internacional conforme al Consorcio Unicode y la norma ISO/IEC 10646.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Exención de Marcas</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instagram, TikTok, Free Fire, WhatsApp y Facebook son marcas registradas de sus respectivos propietarios y no patrocinan este sitio.
          </p>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-7 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">1</span>
            Objeto del Sitio y Aceptación de las Condiciones
          </h2>
          <p>
            El portal web <strong>conversordeletrasbonitas.net</strong> (en adelante, «el Sitio») ofrece herramientas en línea para la conversión instantánea de texto alfanumérico en caracteres tipográficos estilizados y símbolos Unicode. La navegación y el uso de los servicios implican la aceptación plena e incondicional de los presentes Términos y Condiciones.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">2</span>
            Uso Aceptable y Responsabilidad del Usuario
          </h2>
          <p>
            El usuario se compromete a hacer un uso lícito, diligente y de buena fe de las herramientas proporcionadas. Queda expresamente prohibido:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li>Utilizar el generador de texto para crear o difundir contenidos injuriosos, difamatorios, amenazantes, de incitación al odio o ilegales.</li>
            <li>Intentar realizar ataques de denegación de servicio (DoS/DDoS), scraping masivo automatizado o ingeniería inversa no autorizada sobre el código fuente de la plataforma.</li>
            <li>Hacerse pasar por personal de soporte o administración del sitio web.</li>
          </ul>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">3</span>
            Propiedad Intelectual y Derechos de Autor
          </h2>
          <p>
            El diseño web, la interfaz gráfica, los componentes de software, el logotipo y los textos explicativos e instructivos son propiedad exclusiva de <strong>conversordeletrasbonitas.net</strong> y están protegidos por las leyes internacionales de propiedad intelectual.
          </p>
          <p className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <strong>Nota sobre los caracteres Unicode:</strong> Los glifos tipográficos individuales (como letras cursivas, góticas o símbolos matemáticos) son estándar abierto definido por el <em>Unicode Consortium</em> y carecen de derechos de autor exclusivos, por lo que el usuario puede emplear libremente el texto generado para fines personales, creativos o comerciales.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">4</span>
            Exención de Responsabilidad y Marcas de Terceros
          </h2>
          <p>
            Cualquier mención a plataformas externas como <em>Instagram, TikTok, WhatsApp, Facebook, Garena Free Fire, Discord o Twitter (X)</em> se realiza exclusivamente con fines descriptivos y de compatibilidad funcional. Este sitio web no está asociado, afiliado, autorizado ni respaldado de ninguna manera por dichas empresas.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">5</span>
            Disponibilidad del Servicio y Garantías
          </h2>
          <p>
            El servicio se suministra «tal cual» (<em>as is</em>) y «según disponibilidad». Aunque nos esforzamos por garantizar una operatividad del 99.9% y compatibilidad universal en dispositivos móviles y de escritorio, no garantizamos que el servicio sea ininterrumpido o esté completamente libre de errores tipográficos en dispositivos heredados o desactualizados.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">6</span>
            Modificaciones de los Términos
          </h2>
          <p>
            Nos reservamos el derecho de modificar o actualizar estos Términos y Condiciones en cualquier momento para reflejar cambios legales o mejoras operativas. El uso continuado del Sitio tras la publicación de los cambios constituirá su aceptación de los mismos.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">7</span>
            Contacto Legal
          </h2>
          <p>
            Para cualquier consulta, aclaración o notificación legal relacionada con estos Términos de Uso, puede dirigirse por escrito a: <span className="font-mono font-bold text-indigo-600" dangerouslySetInnerHTML={{ __html: '<!--email_off-->legal@conversordeletrasbonitas.net<!--/email_off-->' }} />.
          </p>
        </section>
      </div>

      {/* Trust Seal */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
        <span>Términos de Servicio Transparentes y Conformes a la Legislación Digital Vigente</span>
      </div>
    </div>
  );
};
