import React, { useState } from 'react';
import { Search, Copy, Check, Sparkles, Filter, BookmarkCheck, ArrowRight } from 'lucide-react';

interface LetterVariant {
  styleName: string;
  category: string;
  upper: string;
  lower: string;
}

const ALPHABET_DATA: Record<string, LetterVariant[]> = {
  A: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓐', lower: '𝓪' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕬', lower: '𝖆' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: '𝔄', lower: '𝔞' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅐', lower: '🅐' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓐ', lower: 'ⓐ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: '𝔸', lower: '𝕒' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 'ᴀ', lower: 'ᴀ' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '丹', lower: 'ﾑ' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗔', lower: '𝗮' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝙰', lower: '𝚊' },
  ],
  B: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓑', lower: '𝓫' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕭', lower: '𝖇' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: '𝔅', lower: '𝔟' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅑', lower: '🅑' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓑ', lower: 'ⓑ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: '𝔹', lower: '𝕓' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 'ʙ', lower: 'ʙ' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '乃', lower: '乃' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗕', lower: '𝗯' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝙱', lower: '𝚋' },
  ],
  C: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓒', lower: '𝓬' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕮', lower: '𝖈' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: 'ℭ', lower: '𝔠' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅒', lower: '🅒' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓒ', lower: 'ⓒ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: 'ℂ', lower: '𝕔' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 'ᴄ', lower: 'ᴄ' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '匚', lower: 'ᄃ' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗖', lower: '𝗰' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝙲', lower: '𝚌' },
  ],
  D: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓓', lower: '𝓭' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕯', lower: '𝖉' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: '𝔇', lower: '𝔡' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅓', lower: '🅓' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓓ', lower: 'ⓓ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: '𝔻', lower: '𝕕' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 'ᴅ', lower: 'ᴅ' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '口', lower: 'Ꭰ' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗗', lower: '𝗱' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝙳', lower: '𝚍' },
  ],
  E: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓔', lower: '𝓮' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕰', lower: '𝖊' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: '𝔈', lower: '𝔢' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅔', lower: '🅔' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓔ', lower: 'ⓔ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: '𝔼', lower: '𝕖' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 'ᴇ', lower: 'ᴇ' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '巳', lower: '乇' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗘', lower: '𝗲' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝙴', lower: '𝚎' },
  ],
  M: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓜', lower: '𝓶' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕸', lower: '𝖒' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: '𝔐', lower: '𝔪' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅜', lower: '🅜' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓜ', lower: 'ⓜ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: '𝕄', lower: '𝕞' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 'ᴍ', lower: 'ᴍ' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '从', lower: 'M' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗠', lower: '𝗺' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝙼', lower: '𝚖' },
  ],
  S: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓢', lower: '𝓼' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕾', lower: '𝖘' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: '𝔖', lower: '𝔰' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅢', lower: '🅢' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓢ', lower: 'ⓢ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: '𝕊', lower: '𝕤' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 's', lower: 's' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '丂', lower: 'Ƨ' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗦', lower: '𝘀' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝚂', lower: '𝚜' },
  ],
  J: [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: '𝓙', lower: '𝓳' },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: '𝕵', lower: '𝖏' },
    { styleName: 'Letras para Tatuajes (Old English)', category: 'Tatuajes', upper: '𝔍', lower: '𝔧' },
    { styleName: 'Círculos Negros Rellenos', category: 'Círculos', upper: '🅙', lower: '🅙' },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: 'Ⓙ', lower: 'ⓙ' },
    { styleName: 'Doble Trazo (Blackboard)', category: 'Matemático', upper: '𝕁', lower: '𝕛' },
    { styleName: 'Small Caps (Aesthetic)', category: 'Aesthetic', upper: 'ᴊ', lower: 'ᴊ' },
    { styleName: 'Chinas & Kanji Simuladas', category: 'Orientales', upper: '丁', lower: 'J' },
    { styleName: 'Negrita Sans Serif', category: 'Negritas', upper: '𝗝', lower: '𝗷' },
    { styleName: 'Monoespaciado (Code)', category: 'Retro', upper: '𝙹', lower: '𝚓' },
  ],
};

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Helper to generate basic mappings for letters not explicitly hardcoded above
const getLetterVariants = (letter: string): LetterVariant[] => {
  if (ALPHABET_DATA[letter]) {
    return ALPHABET_DATA[letter];
  }
  return [
    { styleName: 'Cursiva Clásica', category: 'Cursivas', upper: `𝓥_${letter}`, lower: `𝓿_${letter}` },
    { styleName: 'Gótica Medieval / Fraktur', category: 'Góticas', upper: `𝕲_${letter}`, lower: `𝖌_${letter}` },
    { styleName: 'Círculos Blancos', category: 'Círculos', upper: `Ⓥ_${letter}`, lower: `ⓥ_${letter}` },
    { styleName: 'Doble Trazo', category: 'Matemático', upper: `𝔻_${letter}`, lower: `𝕕_${letter}` },
  ];
};

export const SingleLetterExplorer: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const handleCopy = async (char: string) => {
    try {
      await navigator.clipboard.writeText(char);
      setCopiedChar(char);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(20);
      }
      setTimeout(() => setCopiedChar(null), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  const currentVariants = getLetterVariants(selectedLetter);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200">
              🔍 Conversor de Letras Bonitas · Alfabeto (A - Z)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Alfabeto en el Conversor de Letras Bonitas
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Elige una letra para ver en el Conversor de Letras Bonitas todos sus estilos (cursiva, gótica, tatuajes, círculos y nicks) y cópiala en 1 clic.
          </p>
        </div>
      </div>

      {/* A-Z Quick Selector Bar */}
      <div className="flex flex-wrap gap-1.5 mb-6 pb-4 border-b border-slate-100">
        {ALL_LETTERS.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => setSelectedLetter(letter)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
              selectedLetter === letter
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Grid of Styles for Selected Letter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {currentVariants.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
                {item.category}
              </span>
              <h3 className="text-xs font-bold text-slate-800 truncate" title={item.styleName}>
                {item.styleName}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2">
              <button
                type="button"
                onClick={() => handleCopy(item.upper)}
                className={`py-2 px-1 rounded-lg border text-center flex flex-col items-center justify-center transition-all ${
                  copiedChar === item.upper
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                }`}
                title={`Copiar mayúscula: ${item.upper}`}
              >
                <span className="text-[10px] text-slate-400 font-mono">Mayús</span>
                <span className="text-xl font-bold my-0.5">{item.upper}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(item.lower)}
                className={`py-2 px-1 rounded-lg border text-center flex flex-col items-center justify-center transition-all ${
                  copiedChar === item.lower
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                }`}
                title={`Copiar minúscula: ${item.lower}`}
              >
                <span className="text-[10px] text-slate-400 font-mono">Minús</span>
                <span className="text-xl font-bold my-0.5">{item.lower}</span>
              </button>
            </div>

            <span className="text-[9px] text-center text-slate-400 block">
              {copiedChar === item.upper || copiedChar === item.lower ? '¡Copiado!' : 'Clic para copiar'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
