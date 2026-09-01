import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Dices, Copy, Check, X, Wand2, RefreshCw, Undo2, Lock, Unlock, Zap } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { copyToClipboard } from '../utils/clipboard';
import { useModalBackdrop } from '../hooks/useModalBackdrop';

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
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [lockedWords, setLockedWords] = useState<Record<number, string>>({});

  useModalBackdrop(isOpen, onClose, 'style-mixer');

  const baseText = inputText.trim() || 'Letras Bonitas';
  const words = baseText.split(/\s+/).filter(Boolean);

  // Safe subset of high-legibility generators that blend harmoniously
  const harmoniousGens = FONT_GENERATORS.filter(
    (g) =>
      g.id.includes('italic') ||
      g.id.includes('gothic') ||
      g.id.includes('bold') ||
      g.id.includes('small-caps') ||
      g.id.includes('double') ||
      g.id.includes('sans') ||
      g.id.includes('serif')
  );

  const applyResult = (newResult: string) => {
    setMixedResult((prev) => {
      if (prev && prev !== newResult) {
        setHistory((h) => [prev, ...h].slice(0, 10));
      }
      return newResult;
    });
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const [previous, ...rest] = history;
    setMixedResult(previous);
    setHistory(rest);
  };

  // 1. Smart Word-by-Word Mix with Lock Support
  const generateRandomWordMix = () => {
    const list = words.map((w, idx) => {
      if (lockedWords[idx]) {
        return lockedWords[idx];
      }
      const randGen = harmoniousGens[Math.floor(Math.random() * harmoniousGens.length)];
      return randGen ? randGen.transform(w) : w;
    });

    const result = list.join(' ');
    applyResult(`꧁༺ ${result} ༻꧂`);
  };

  // 2. High-legibility Alternating Mix
  const generateAlternatingMix = () => {
    const genA = FONT_GENERATORS.find((g) => g.id === 'italic-bold-serif') || FONT_GENERATORS[0];
    const genB = FONT_GENERATORS.find((g) => g.id === 'bold-sans') || FONT_GENERATORS[1];

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
    applyResult(`『 ${result} 』`);
  };

  // 3. Aesthetic Sakura
  const generateAestheticMix = () => {
    const gen = FONT_GENERATORS.find((g) => g.id === 'small-caps') || FONT_GENERATORS[0];
    const transformed = gen.transform(baseText);
    applyResult(`₊˚⊹ 🌸 ${transformed} 🌸 ⊹˚₊`);
  };

  // 4. Gamer King
  const generateGamerKingMix = () => {
    const gen = FONT_GENERATORS.find((g) => g.id === 'bold-sans') || FONT_GENERATORS[0];
    const transformed = gen.transform(baseText);
    applyResult(`亗 ${transformed} 亗 ⚔️`);
  };

  // 5. Cursive & Serif Hybrid
  const generateCursiveHybrid = () => {
    const cursive = FONT_GENERATORS.find((g) => g.id === 'cursive-bold') || FONT_GENERATORS[0];
    const smallCaps = FONT_GENERATORS.find((g) => g.id === 'small-caps') || FONT_GENERATORS[1];

    const result = words
      .map((w, idx) => {
        if (lockedWords[idx]) return lockedWords[idx];
        return idx % 2 === 0 ? cursive.transform(w) : smallCaps.transform(w);
      })
      .join(' ');

    applyResult(`✦ ${result} ✦`);
  };

  // Initial populate if empty
  useEffect(() => {
    if (isOpen && !mixedResult) {
      generateRandomWordMix();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!mixedResult) return;
    const success = await copyToClipboard(mixedResult, 'Mixer Creativo');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-lg text-slate-900 dark:text-white">
                Mezclador Mágico de Estilos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Combina múltiples fuentes de forma armónica y legible.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Result Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/60 dark:from-slate-800/80 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-100/90 dark:border-indigo-900/40 shadow-xs text-center flex flex-col items-center justify-center min-h-[130px] relative">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Resultado Mágico Generado:
              </span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleUndo}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs transition-all active:scale-95"
                  title="Deshacer y volver a la mezcla anterior"
                >
                  <Undo2 className="w-3 h-3" />
                  <span>Deshacer ({history.length})</span>
                </button>
              )}
            </div>

            <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white break-words max-w-full my-2 selection:bg-indigo-600 selection:text-white">
              {mixedResult}
            </p>
          </div>

          {/* Word Lock Inspector for Multi-word inputs */}
          {words.length > 1 && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Bloquear Palabras (Fijar para no cambiarlas al remezclar):</span>
                </span>
                {Object.keys(lockedWords).length > 0 && (
                  <button
                    type="button"
                    onClick={() => setLockedWords({})}
                    className="text-[10px] font-bold text-slate-400 hover:text-rose-500"
                  >
                    Desbloquear todas
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {words.map((w, idx) => {
                  const isLocked = Boolean(lockedWords[idx]);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setLockedWords((prev) => {
                          const updated = { ...prev };
                          if (isLocked) {
                            delete updated[idx];
                          } else {
                            // Find current styled word in mixedResult or keep original
                            updated[idx] = w;
                          }
                          return updated;
                        });
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isLocked
                          ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-2xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      {isLocked ? <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" /> : <Unlock className="w-3 h-3 text-slate-400" />}
                      <span>{w}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Formulas */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              Fórmulas de Mezcla Inteligente:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={generateRandomWordMix}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50/40 dark:hover:bg-slate-700 text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs"
              >
                <Dices className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Palabras Armónicas</span>
              </button>
              <button
                type="button"
                onClick={generateCursiveHybrid}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50/40 dark:hover:bg-slate-700 text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs"
              >
                <Zap className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Cursiva + Versalitas</span>
              </button>
              <button
                type="button"
                onClick={generateAlternatingMix}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50/40 dark:hover:bg-slate-700 text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs"
              >
                <RefreshCw className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Letras Alternadas</span>
              </button>
              <button
                type="button"
                onClick={generateAestheticMix}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50/40 dark:hover:bg-slate-700 text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Aesthetic Sakura</span>
              </button>
              <button
                type="button"
                onClick={generateGamerKingMix}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50/40 dark:hover:bg-slate-700 text-left transition-all text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs col-span-2"
              >
                <Wand2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Gamer King FF 亗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={generateRandomWordMix}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-1.5"
            >
              <Dices className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Remezclar</span>
            </button>
          </div>

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
