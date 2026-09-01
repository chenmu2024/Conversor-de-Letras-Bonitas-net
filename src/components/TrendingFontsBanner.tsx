import React, { useState } from 'react';
import { FontGenerator } from '../types';
import { Flame, Copy, Check, Sparkles } from 'lucide-react';

interface TrendingFontsBannerProps {
  inputText: string;
  allGenerators: FontGenerator[];
}

export const TrendingFontsBanner: React.FC<TrendingFontsBannerProps> = ({
  inputText,
  allGenerators,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pick 4 popular font generators
  const topGenerators = allGenerators.filter((g) =>
    ['cursiva-negrita', 'gotica-medieval', 'free-fire-alas', 'circulos-lleno'].includes(g.id)
  ).slice(0, 4);

  if (topGenerators.length === 0) return null;

  const handleCopy = (gen: FontGenerator) => {
    const textToCopy = gen.transform(inputText);
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(gen.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-300/60 shadow-xs relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Flame className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🔥 Los 4 Estilos Más Copiados del Día</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Copia directamente las fuentes más buscadas con un solo clic
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>Tendencia Top</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {topGenerators.map((gen) => {
          const transformed = gen.transform(inputText);
          const isCopied = copiedId === gen.id;

          return (
            <div
              key={gen.id}
              onClick={() => handleCopy(gen)}
              className={`p-3 bg-white/90 backdrop-blur-xs rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                isCopied
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/90 shadow-xs'
                  : 'border-slate-200/90 hover:border-amber-400 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="text-[10px] font-extrabold text-slate-400 group-hover:text-amber-600 uppercase tracking-wider truncate mb-1">
                  {gen.name}
                </div>
                <div className="text-sm sm:text-base font-medium text-slate-900 truncate mb-3 select-all">
                  {transformed}
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-1.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  isCopied
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-2xs group-hover:scale-[1.02]'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Rápido</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
