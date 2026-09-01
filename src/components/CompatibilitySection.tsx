import React from 'react';
import { ShieldCheck, Smartphone, Monitor, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const COMPATIBILITY_DATA = [
  {
    platform: 'Instagram (Bio, Historias, DMs)',
    compatibility: '100% Compatible',
    status: 'high',
    desc: 'Compatible con Cursiva, Gótica, Negrita, Círculos y Símbolos especiales sin necesidad de apps externas.',
  },
  {
    platform: 'WhatsApp (Estados y Nombres)',
    compatibility: '100% Compatible',
    status: 'high',
    desc: 'Los caracteres Unicode son reconocidos de forma nativa en Android, iPhone y WhatsApp Web.',
  },
  {
    platform: 'TikTok (Biografía y Comentarios)',
    compatibility: '99% Compatible',
    status: 'high',
    desc: 'Acepta estilos aesthetic, caracteres con alas y símbolos de estrellas.',
  },
  {
    platform: 'Free Fire / Garena Nick',
    compatibility: '98% Compatible',
    status: 'high',
    desc: 'Permite el uso de espacio invisible Hangul Filler [ㅤ], cruces y decoraciones con corchetes.',
  },
  {
    platform: 'iOS (iPhone / iPad / Mac)',
    compatibility: '100% Nativo',
    status: 'high',
    desc: 'Apple incluye compatibilidad completa con el estándar Unicode 15.0+ en todo el sistema operativo.',
  },
  {
    platform: 'Android (Samsung, Xiaomi, Motorola)',
    compatibility: '98% Nativo',
    status: 'high',
    desc: 'Android 8.0 o superior muestra todos los caracteres sin recuadros de error (tofu boxes).',
  },
];

export const CompatibilitySection: React.FC = () => {
  return (
    <section id="compatibilidad-seccion" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Conversor de Letras Bonitas · Compatibilidad Universal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Compatibilidad del Conversor de Letras Bonitas en Móviles y Redes
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            El Conversor de Letras Bonitas utiliza únicamente códigos Unicode estándar internacionales. No instalas fuentes (`.ttf` ni `.otf`); el texto generado por el Conversor de Letras Bonitas es interpretado nativamente por todos los dispositivos.
          </p>
        </div>
      </div>

      {/* Grid of Platform Compatibility */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {COMPATIBILITY_DATA.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-900">{item.platform}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{item.compatibility}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Why it works banner */}
      <div className="mt-5 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-950 leading-relaxed">
          <strong>¿Por qué se ven bien en todos lados?</strong> Las letras bonitas no son imágenes ni tipografías instaladas; son <em>glifos alfanuméricos matemáticos</em> asignados en el consorcio oficial <strong>Unicode</strong>. Por eso puedes copiarlas y pegarlas en cualquier app moderna exactamente como si fueran un emoji.
        </p>
      </div>
    </section>
  );
};
