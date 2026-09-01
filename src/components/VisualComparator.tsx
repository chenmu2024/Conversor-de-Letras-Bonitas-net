import React, { useState } from 'react';
import { FontGenerator } from '../types';
import { Columns2, Copy, Check, Sparkles, X, Plus } from 'lucide-react';

interface VisualComparatorProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  generators: FontGenerator[];
}

export const VisualComparator: React.FC<VisualComparatorProps> = ({
  isOpen,
  onClose,
  inputText,
  generators,
}) => {
  const [slotA, setSlotA] = useState<string>(generators[0]?.id || 'italic-bold-serif');
  const [slotB, setSlotB] = useState<string>(generators[3]?.id || 'gothic-bold');
  const [slotC, setSlotC] = useState<string>(generators[14]?.id || 'wings-angle');

  const [copiedSlot, setCopiedSlot] = useState<string | null>(null);

  if (!isOpen) return null;

  const genA = generators.find((g) => g.id === slotA) || generators[0];
  const genB = generators.find((g) => g.id === slotB) || generators[1];
  const genC = generators.find((g) => g.id === slotC) || generators[2];

  const handleCopy = async (textToCopy: string, slotKey: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedSlot(slotKey);
      setTimeout(() => setCopiedSlot(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const slots = [
    { key: 'A', label: 'Estilo 1', gen: genA, currentId: slotA, setFn: setSlotA },
    { key: 'B', label: 'Estilo 2', gen: genB, currentId: slotB, setFn: setSlotB },
    { key: 'C', label: 'Estilo 3', gen: genC, currentId: slotC, setFn: setSlotC },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Columns2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-lg text-slate-900">
                Comparador Visual A/B/C
              </h3>
              <p className="text-xs text-slate-500">
                Compara 3 estilos lado a lado para elegir el mejor para tu bio o nick.
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

        {/* Comparison columns */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slots.map((s) => {
              const converted = s.gen.transform(inputText || 'Letras Bonitas');
              const isCopied = copiedSlot === s.key;

              return (
                <div
                  key={s.key}
                  className="bg-slate-50/70 rounded-2xl border-2 border-indigo-100 p-4 flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Selector */}
                    <div className="mb-3">
                      <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                        {s.label}:
                      </label>
                      <select
                        value={s.currentId}
                        onChange={(e) => s.setFn(e.target.value)}
                        className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      >
                        {generators.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Converted Text View */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs min-h-[110px] flex items-center justify-center text-center">
                      <p className="text-lg font-medium text-slate-900 break-words selection:bg-indigo-600 selection:text-white">
                        {converted}
                      </p>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(converted, s.key)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Este Estilo</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-extrabold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 shadow-2xs"
          >
            Cerrar Comparador
          </button>
        </div>
      </div>
    </div>
  );
};
