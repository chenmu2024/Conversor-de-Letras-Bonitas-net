import React, { useState } from 'react';
import { Sparkles, Dices, Copy, Check, X, Wand2, RefreshCw } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface StyleMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
}

export const StyleMixerModal: React.FC<StyleMixerModalProps> = ({
  isOpen,
  onClose,
  inputText,
}) => {
  const [mixedResult, setMixedResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const baseText = inputText.trim() || 'Letras Bonitas';

  // Generator algorithms
  const generateRandomWordMix = () => {
    const words = baseText.split(' ');
    const chosenGens = FONT_GENERATORS.filter(
      (g) => g.id.includes('italic') || g.id.includes('gothic') || g.id.includes('bold') || g.id.includes('double')
    );

    const result = words
      .map((w) => {
        const randGen = chosenGens[Math.floor(Math.random() * chosenGens.length)];
        return randGen ? randGen.transform(w) : w;
      })
      .join(' ');

    setMixedResult(`꧁༺ ${result} ༻꧂`);
  };

  const generateAlternatingMix = () => {
    const genA = FONT_GENERATORS.find((g) => g.id === 'italic-bold-serif') || FONT_GENERATORS[0];
    const genB = FONT_GENERATORS.find((g) => g.id === 'gothic-bold') || FONT_GENERATORS[1];

    let result = '';
    for (let i = 0; i < baseText.length; i++) {
      const char = baseText[i];
      if (char === ' ') {
        result += ' ';
      } else if (i % 2 === 0) {
        result += genA.transform(char);
      } else {
        result += genB.transform(char);
      }
    }
    setMixedResult(`『 ${result} 』`);
  };

  const generateAestheticMix = () => {
    const gen = FONT_GENERATORS.find((g) => g.id === 'small-caps') || FONT_GENERATORS[0];
    const transformed = gen.transform(baseText);
    setMixedResult(`₊˚⊹ 🌸 ${transformed} 🌸 ⊹˚₊`);
  };

  const generateGamerKingMix = () => {
    const gen = FONT_GENERATORS.find((g) => g.id === 'bold-sans') || FONT_GENERATORS[0];
    const transformed = gen.transform(baseText);
    setMixedResult(`亗 ${transformed} 亗 ⚔️`);
  };

  // Initial populate if empty
  if (!mixedResult) {
    generateRandomWordMix();
  }

  const handleCopy = async () => {
    if (!mixedResult) return;
    try {
      await navigator.clipboard.writeText(mixedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-lg text-slate-900">
                Mezclador Mágico de Estilos
              </h3>
              <p className="text-xs text-slate-500">
                Combina múltiples fuentes y decoraciones aleatorias en un solo resultado.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Result Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/60 border border-indigo-100/90 shadow-xs text-center flex flex-col items-center justify-center min-h-[130px]">
            <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider mb-2">
              Resultado Mágico Generado:
            </span>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 break-words max-w-full">
              {mixedResult}
            </p>
          </div>

          {/* Quick Presets for mixing */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              Elige una Fórmula de Mezcla:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={generateRandomWordMix}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/40 text-left transition-all text-xs font-bold text-slate-800 flex items-center gap-2"
              >
                <Dices className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Palabras Aleatorias</span>
              </button>
              <button
                type="button"
                onClick={generateAlternatingMix}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/40 text-left transition-all text-xs font-bold text-slate-800 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Letras Alternadas</span>
              </button>
              <button
                type="button"
                onClick={generateAestheticMix}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/40 text-left transition-all text-xs font-bold text-slate-800 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Aesthetic Sakura</span>
              </button>
              <button
                type="button"
                onClick={generateGamerKingMix}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/40 text-left transition-all text-xs font-bold text-slate-800 flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Gamer King 亗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={generateRandomWordMix}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5"
          >
            <Dices className="w-3.5 h-3.5 text-indigo-600" />
            <span>Remezclar</span>
          </button>

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all shadow-md active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>¡Copiado con Éxito!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Mezcla</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
