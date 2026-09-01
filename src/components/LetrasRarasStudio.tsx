import React, { useState } from 'react';
import { Sparkles, Eye, Copy, Check, Terminal, Skull, AlertCircle, Ghost } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

interface LetrasRarasStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

export const LetrasRarasStudio: React.FC<LetrasRarasStudioProps> = ({
  onApplyText,
  initialText = 'Letras Raras',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [customWord, setCustomWord] = useState(initialText);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(text);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(20);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const rarePresets = [
    { name: 'Estilo Oriental / Kanji', text: '尺卂尺卂丂 ﾘ ㄥㄖ匚卂丂', tag: 'Oriental' },
    { name: 'Runas Nórdicas Falsas', text: 'ᚱᚢᚾᚨᛊ ᛗᛁᛊᛏᛁᚲᚨᛊ', tag: 'Rúnico' },
    { name: 'Glitch Zalgo Pesado', text: 'R̶a̷r̸a̷s̴ ̸M̸a̸l̸d̶i̸t̵a̷s̴', tag: 'Zalgo' },
    { name: 'Texto Invertido 180°', text: 'sɐɹɐᴚ sɐɹʇǝꞀ', tag: 'Al Revés' },
    { name: 'Monospaciado Hacker', text: '「 0 1 0 1 _ C Y B E R 」', tag: 'Cyberpunk' },
    { name: 'Símbolos de Ojo Místico', text: '👁️ 𓁹 𓁺 𓁻 𓁼 𓁿 𓁹 👁️', tag: 'Jeroglíficos' },
    { name: 'Cruces & Muerte', text: '✞ 𝕸𝖚𝖊𝖗𝖙𝖊 ✞ 𝕯𝖆𝖗𝖐 ✞', tag: 'Gótico Dark' },
    { name: 'Kaomoji Perturbador', text: '(⊙_⊙) (ಠ_ಠ) (ʘ‿ʘ)', tag: 'Caras Raras' },
    { name: 'Espacio Oculto Garena', text: `亗${INVISIBLE_SPACE}𝕹𝕴𝕮𝕶${INVISIBLE_SPACE}亗`, tag: 'Invisible Hack' },
  ];

  const exoticSymbolCombos = [
    { title: 'Armas & Francotirador', combo: '︻╦╤─ ҉ - - - ︻デ═一' },
    { title: 'Alas Cósmicas & Ojos', combo: '꧁༺ 👁️ 𓁹 𓁺 ༻꧂' },
    { title: 'Corona de Espinas & Calavera', combo: '☠️ ꧁☠︎₭iℒℒ℥℟☠︎꧂ ☠️' },
    { title: 'Símbolos Alquímicos & Raros', combo: '🜲 🝤 🝯 🜂 🜄 🜁 🜃 ☉ ☽ ♁' },
    { title: 'Música & Ondas Psicodélicas', combo: 'ılı.lıllılı.ıllı. 𝟶:𝟶𝟶 ──●── 𝟹:𝟺𝟻 ılı.lıllılı.ıllı.' },
  ];

  const generateWeirdStyles = (word: string) => [
    `尺${word}丂`,
    `T̶e̶x̶t̶o̶: ${word}`,
    `ᚱ${word}ᛊ`,
    `【 𝕯𝖆𝖗𝖐: ${word} 】`,
    `ıllıllı ${word} ıllıllı`,
    `ıll ${word} llı`,
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-950 rounded-2xl border border-purple-800/40 p-6 sm:p-8 shadow-xs text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Ghost className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-300 border border-purple-700/50">
                🔮 Glifos Exóticos & Unicode Oculto
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Estudio de Letras Raras, Símbolos Extraños & Zalgo
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(INVISIBLE_SPACE)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 transition-all active:scale-95"
        >
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span>Copiar Carácter Invisible [ㅤ]</span>
        </button>
      </div>

      {/* Input Box for Rare Transformation */}
      <div className="bg-slate-950/80 rounded-xl border border-purple-800/60 p-4 sm:p-5 mb-6 shadow-inner">
        <label className="block text-xs font-black uppercase tracking-wider text-purple-300 mb-2">
          Transforma cualquier palabra a Letras Raras & Exóticas:
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
            placeholder="Escribe palabra rara..."
            maxLength={25}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-purple-700/50 bg-slate-900 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => onApplyText(customWord)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-purple-600/30"
          >
            Aplicar al Conversor
          </button>
        </div>

        {/* Realtime Variations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {generateWeirdStyles(customWord || 'Raro').map((styled, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg border border-purple-900/60 bg-slate-900/80 hover:border-purple-500 transition-all group"
            >
              <span className="font-mono text-xs text-purple-200 truncate pr-2">
                {styled}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(styled)}
                className="p-1.5 rounded-md bg-purple-800/50 text-purple-200 hover:bg-purple-500 hover:text-white transition-colors shrink-0 shadow-2xs"
                title="Copiar texto raro"
              >
                {copiedItem === styled ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Rare Presets */}
      <h3 className="text-sm font-black uppercase tracking-wider text-purple-200 mb-3 flex items-center gap-2">
        <Skull className="w-4 h-4 text-purple-400" />
        <span>Alfabetos Raros & Símbolos Ocultos Listos para Copiar:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {rarePresets.map((preset, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-purple-900/70 bg-slate-900/90 shadow-2xs hover:border-purple-500 transition-all group"
          >
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-0.5">
                {preset.tag}
              </span>
              <span className="font-bold text-sm text-white tracking-wide">
                {preset.text}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(preset.text)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-600 text-purple-200 hover:text-white font-bold text-xs transition-all active:scale-95"
            >
              {copiedItem === preset.text ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Exotic Symbol Combos */}
      <h3 className="text-sm font-black uppercase tracking-wider text-purple-200 mb-3 flex items-center gap-2">
        <Eye className="w-4 h-4 text-purple-400" />
        <span>Combinaciones de Símbolos Raros & Arte ASCII:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exoticSymbolCombos.map((comboItem, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-purple-900/60 bg-slate-900/90 shadow-2xs hover:border-purple-400 transition-all"
          >
            <div className="pr-2 truncate">
              <span className="text-[10px] font-bold text-purple-400 block mb-0.5">
                {comboItem.title}
              </span>
              <p className="font-mono text-xs text-white truncate">
                {comboItem.combo}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(comboItem.combo)}
              className="p-2 rounded-lg bg-purple-800/60 hover:bg-purple-600 text-purple-200 hover:text-white transition-all shrink-0"
              title="Copiar combo raro"
            >
              {copiedItem === comboItem.combo ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
