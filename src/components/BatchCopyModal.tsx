import React, { useState } from 'react';
import { FontGenerator } from '../types';
import { Copy, Check, Sparkles, X, ChevronRight } from 'lucide-react';

interface BatchCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  generators: FontGenerator[];
}

export const BatchCopyModal: React.FC<BatchCopyModalProps> = ({
  isOpen,
  onClose,
  inputText,
  generators,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    generators.slice(0, 10).map((g) => g.id)
  );
  const [copiedBatch, setCopiedBatch] = useState(false);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectTop10 = () => {
    setSelectedIds(generators.slice(0, 10).map((g) => g.id));
  };

  const selectAll = () => {
    setSelectedIds(generators.map((g) => g.id));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const handleCopySelected = async () => {
    if (selectedIds.length === 0) return;

    const selectedGens = generators.filter((g) => selectedIds.includes(g.id));
    const combinedText = selectedGens
      .map((g) => `[${g.name}]\n${g.transform(inputText || 'Letras Bonitas')}`)
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(combinedText);
      setCopiedBatch(true);
      setTimeout(() => setCopiedBatch(false), 2500);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-lg text-slate-900">
                Copiar en Lote (Top 10 o Selección)
              </h3>
              <p className="text-xs text-slate-500">
                Copia múltiples fuentes a la vez para probar en tus perfiles.
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

        {/* Quick Select Buttons */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={selectTop10}
              className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-bold hover:bg-indigo-200 transition-colors"
            >
              Top 10 Populares
            </button>
            <button
              onClick={selectAll}
              className="px-2.5 py-1 rounded-lg bg-slate-200/80 text-slate-700 font-bold hover:bg-slate-300 transition-colors"
            >
              Seleccionar Todas ({generators.length})
            </button>
            <button
              onClick={clearSelection}
              className="px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 font-medium"
            >
              Limpiar
            </button>
          </div>

          <span className="text-slate-500 font-semibold text-[11px]">
            Seleccionadas: <strong className="text-indigo-600 font-black">{selectedIds.length}</strong>
          </span>
        </div>

        {/* Scrollable list of fonts */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[48vh]">
          {generators.map((gen) => {
            const isSelected = selectedIds.includes(gen.id);
            const converted = gen.transform(inputText || 'Letras Bonitas');

            return (
              <div
                key={gen.id}
                onClick={() => toggleSelect(gen.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-200 shadow-2xs'
                    : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {gen.name}
                    </div>
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {converted}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            Se copiarán {selectedIds.length} formatos con sus etiquetas correspondientes.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Cancelar
            </button>
            <button
              onClick={handleCopySelected}
              disabled={selectedIds.length === 0}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-extrabold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                copiedBatch
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
              }`}
            >
              {copiedBatch ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Copiadas al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Seleccionadas ({selectedIds.length})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
