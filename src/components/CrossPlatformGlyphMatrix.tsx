import React, { useState } from 'react';
import { Smartphone, Monitor, Gamepad2, Layers, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, Cpu } from 'lucide-react';
import { ArticleHelpfulFeedback } from './ArticleHelpfulFeedback';

export const CrossPlatformGlyphMatrix: React.FC = () => {
  const [sampleWord, setSampleWord] = useState('Letras');

  const comparisonRows = [
    {
      style: 'Cursiva Elegante',
      unicode: '𝒯𝑒𝓍𝓉𝑜 𝐸𝓁𝑒𝑔𝒶𝓃𝓉𝑒',
      block: 'Mathematical Script (U+1D4B6)',
      ios: 'Excelente (San Francisco CoreText)',
      android: 'Excelente (Noto Serif/Sans)',
      windows: 'Excelente (Segoe UI Symbol)',
      freeFire: 'Compatible en Nombres & Chat',
      status: '100% Universal',
    },
    {
      style: 'Gótica Medieval / Fraktur',
      unicode: '𝔊𝔬𝔱𝔦𝔠 𝔖𝔱𝔶𝔩𝔢',
      block: 'Mathematical Fraktur (U+1D504)',
      ios: 'Excelente (Apple Typographic Engine)',
      android: 'Excelente (HarfBuzz Renderer)',
      windows: 'Excelente (DirectWrite)',
      freeFire: 'Compatible en Clan & Biografía',
      status: '100% Universal',
    },
    {
      style: 'Small Caps (Minúsculas Mayúsculas)',
      unicode: 'ᴛᴇxᴛᴏ ᴇᴊᴇᴄᴜᴛɪᴠᴏ',
      block: 'Phonetic Extensions (U+1D00)',
      ios: 'Nativo sin distorsión',
      android: 'Nativo sin distorsión',
      windows: 'Nativo sin distorsión',
      freeFire: 'Muy utilizado en Nicks Pro',
      status: '100% Universal',
    },
    {
      style: 'Espacio Invisible Gamer',
      unicode: '[ㅤ] (Hangul Filler U+3164)',
      block: 'Hangul Compatibility (U+3164)',
      ios: 'Oculto / Espacio en Blanco',
      android: 'Oculto / Espacio en Blanco',
      windows: 'Oculto / Espacio en Blanco',
      freeFire: 'Válido para Nicks Invisibles',
      status: '100% Gamer Safe',
    },
    {
      style: 'Circulado / Bubble',
      unicode: 'Ⓣⓔⓧⓣⓞ',
      block: 'Enclosed Alphanumerics (U+24B6)',
      ios: 'Renderizado circular nítido',
      android: 'Renderizado circular nítido',
      windows: 'Renderizado circular nítido',
      freeFire: 'Compatible en Descripciones',
      status: '100% Universal',
    },
  ];

  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs mb-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-2xs">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                🔬 Conversor de Letras Bonitas · Matriz Multiplataforma
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Matriz de Compatibilidad en el Conversor de Letras Bonitas
            </h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Sin Necesidad de Descargar Fuentes</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        A diferencia de los archivos de tipografía descargables (.ttf o .otf), los caracteres generados en nuestra plataforma forman parte del estándar oficial <strong>Unicode ISO/IEC 10646</strong>. Esto significa que cada sistema operativo ya incluye el soporte nativo en su memoria ROM. A continuación, se detalla la matriz de compatibilidad técnica auditada por nuestro equipo:
      </p>

      {/* Responsive Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-900 text-white font-bold">
            <tr>
              <th className="p-3.5 whitespace-nowrap">Estilo & Glifo</th>
              <th className="p-3.5 whitespace-nowrap">Bloque Unicode Oficial</th>
              <th className="p-3.5 whitespace-nowrap flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-slate-300" />
                <span>iOS (Apple)</span>
              </th>
              <th className="p-3.5 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Android</span>
                </div>
              </th>
              <th className="p-3.5 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-sky-400" />
                  <span>Windows / PC</span>
                </div>
              </th>
              <th className="p-3.5 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Juegos (Free Fire)</span>
                </div>
              </th>
              <th className="p-3.5 whitespace-nowrap text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {comparisonRows.map((row, idx) => (
              <tr key={row.style} className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50/80' : 'bg-slate-50/40 hover:bg-slate-50'}>
                <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                  <div>{row.style}</div>
                  <div className="text-[13px] text-indigo-600 font-normal mt-0.5">{row.unicode}</div>
                </td>
                <td className="p-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                  {row.block}
                </td>
                <td className="p-3.5 text-slate-600 whitespace-nowrap">
                  {row.ios}
                </td>
                <td className="p-3.5 text-slate-600 whitespace-nowrap">
                  {row.android}
                </td>
                <td className="p-3.5 text-slate-600 whitespace-nowrap">
                  {row.windows}
                </td>
                <td className="p-3.5 text-slate-600 whitespace-nowrap font-medium text-amber-800">
                  {row.freeFire}
                </td>
                <td className="p-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technical Summary Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <p>
          <strong>Nota de Ingeniería:</strong> En caso de que un teléfono móvil con una versión antigua de Android (inferior a Android 7.0 Nougat) no cuente con las fuentes del sistema actualizadas, el sistema mostrará un sustituto genérico (fallback glyph) sin provocar caídas de la aplicación o bloqueos de cuenta.
        </p>
      </div>

      {/* Helpful feedback */}
      <ArticleHelpfulFeedback articleTitle="Matriz de compatibilidad técnica de glifos Unicode por sistema operativo" />
    </section>
  );
};
