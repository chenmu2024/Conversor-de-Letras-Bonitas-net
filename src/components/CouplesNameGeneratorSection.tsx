import React, { useState } from 'react';
import { Heart, Copy, Check, Users, Sparkles, RefreshCw, Flame, Crown } from 'lucide-react';

interface CouplesNameGeneratorSectionProps {
  onApplyText?: (text: string) => void;
}

interface CoupleTemplate {
  id: string;
  name: string;
  theme: 'Amor & Pareja' | 'Gamer Dúo FF' | 'Aesthetic Goals' | 'Reyes & Reinas';
  render: (n1: string, n2: string) => { p1: string; p2: string; combined: string };
}

const COUPLE_TEMPLATES: CoupleTemplate[] = [
  {
    id: 'king-queen',
    name: 'King & Queen (Reyes del Dúo)',
    theme: 'Reyes & Reinas',
    render: (n1, n2) => ({
      p1: `👑 𝓚𝓲𝓷𝓰 ${n1} ♛`,
      p2: `♛ 𝓠𝓾𝓮𝓮𝓷 ${n2} 👑`,
      combined: `👑 𝓚𝓲𝓷𝓰 ${n1} ♥ ♛ 𝓠𝓾𝓮𝓮𝓷 ${n2}`,
    }),
  },
  {
    id: 'aesthetic-wings',
    name: 'Alas de Ángel & Demonio',
    theme: 'Aesthetic Goals',
    render: (n1, n2) => ({
      p1: `ʚ ${n1} ɞ ✧`,
      p2: `ʚ ${n2} ɞ ✧`,
      combined: `ʚ ${n1} ɞ ✧ 𝐼𝑛𝑠𝑒𝑝𝑎𝑟𝑎𝑏𝑙𝑒𝑠 ✧ ʚ ${n2} ɞ`,
    }),
  },
  {
    id: 'ff-duo-insane',
    name: 'Dúo Dinámico Free Fire',
    theme: 'Gamer Dúo FF',
    render: (n1, n2) => ({
      p1: `亗 Ꭾʀᴏ • ${n1} ⚡`,
      p2: `亗 Ꭾʀᴏ • ${n2} ⚡`,
      combined: `亗 Ꭾʀᴏ • ${n1} ⚡ 亗 Ꭾʀᴏ • ${n2}`,
    }),
  },
  {
    id: 'infinite-love',
    name: 'Amor Infinito Romántico',
    theme: 'Amor & Pareja',
    render: (n1, n2) => ({
      p1: `𝒯𝓊 𝓎 𝒴ℴ: ${n1} ♡`,
      p2: `𝒯𝓊 𝓎 𝒴ℴ: ${n2} ♡`,
      combined: `𝒯𝓊 𝓎 𝒴ℴ: ${n1} ∞ ${n2} ♡`,
    }),
  },
  {
    id: 'mr-mrs',
    name: 'Mr. & Mrs. Cursiva',
    theme: 'Amor & Pareja',
    render: (n1, n2) => ({
      p1: `𝓜𝓻. ${n1} 💍`,
      p2: `𝓜𝓻𝓼. ${n2} 💍`,
      combined: `𝓜𝓻. ${n1} & 𝓜𝓻𝓼. ${n2} 💍`,
    }),
  },
  {
    id: 'badboy-badgirl',
    name: 'Gamer Pareja Tóxica Goals',
    theme: 'Gamer Dúo FF',
    render: (n1, n2) => ({
      p1: `꧁ঔৣ☬✞ ${n1} ✞☬ঔৣ꧂`,
      p2: `꧁ঔৣ☬✞ ${n2} ✞☬ঔৣ꧂`,
      combined: `꧁ ${n1} ☬ ${n2} ꧂`,
    }),
  },
];

export const CouplesNameGeneratorSection: React.FC<CouplesNameGeneratorSectionProps> = ({
  onApplyText,
}) => {
  const [name1, setName1] = useState('Carlos');
  const [name2, setName2] = useState('Sofia');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  return (
    <section id="generador-nombres-parejas-duos" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-800 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-500" />
            <span>Conversor de Letras Bonitas · Nombres para Dúos y Parejas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Nombres para Parejas en el Conversor de Letras Bonitas
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Genera en el Conversor de Letras Bonitas nicks coordinados, biografías compartidas con amor y nombres con coronas o alas para jugar en dúo.
          </p>
        </div>

        {/* Input Pair */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Nombre 1"
              className="w-full sm:w-32 px-3 py-2 bg-pink-50/50 border border-pink-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-pink-500"
            />
            <span className="text-pink-500 font-bold">&</span>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Nombre 2"
              className="w-full sm:w-32 px-3 py-2 bg-pink-50/50 border border-pink-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            onClick={() => {
              setName1('Carlos');
              setName2('Sofia');
            }}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl transition-colors shrink-0"
            title="Restablecer ejemplo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Couple Names */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COUPLE_TEMPLATES.map((tmpl) => {
          const res = tmpl.render(name1 || 'Él', name2 || 'Ella');
          return (
            <div
              key={tmpl.id}
              className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-pink-300 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/50">
                  <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">
                    {tmpl.theme}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold truncate max-w-[140px]">
                    {tmpl.name}
                  </span>
                </div>

                <div className="space-y-2 py-1">
                  {/* Person 1 */}
                  <div className="flex items-center justify-between gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/70 text-xs font-bold text-slate-800">
                    <span className="truncate">{res.p1}</span>
                    <button
                      onClick={() => handleCopy(`${tmpl.id}-1`, res.p1)}
                      className="text-[10px] text-indigo-600 hover:text-indigo-800 font-extrabold shrink-0"
                    >
                      {copiedKey === `${tmpl.id}-1` ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>

                  {/* Person 2 */}
                  <div className="flex items-center justify-between gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/70 text-xs font-bold text-slate-800">
                    <span className="truncate">{res.p2}</span>
                    <button
                      onClick={() => handleCopy(`${tmpl.id}-2`, res.p2)}
                      className="text-[10px] text-indigo-600 hover:text-indigo-800 font-extrabold shrink-0"
                    >
                      {copiedKey === `${tmpl.id}-2` ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-200/60">
                {onApplyText && (
                  <button
                    onClick={() => onApplyText(res.combined)}
                    className="text-[11px] font-bold text-slate-600 hover:text-pink-600 transition-colors"
                  >
                    Usar combinado
                  </button>
                )}

                <button
                  onClick={() => handleCopy(`${tmpl.id}-both`, res.combined)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 transition-all ml-auto shadow-2xs"
                >
                  {copiedKey === `${tmpl.id}-both` ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>¡Ambos Copiados!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Dúo Completo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
