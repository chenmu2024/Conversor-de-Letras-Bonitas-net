import React, { useState } from 'react';
import { FavoriteItem, FontGenerator } from '../types';
import { Star, Copy, Check, Trash2, Heart } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface FavoritesSectionProps {
  favorites: FavoriteItem[];
  inputText: string;
  onToggleFavorite: (generator: FontGenerator, result: string) => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favorites,
  inputText,
  onToggleFavorite,
}) => {
  const [copiedName, setCopiedName] = useState<string | null>(null);

  if (!favorites || favorites.length === 0) return null;

  const handleCopy = (fav: FavoriteItem) => {
    const generator = FONT_GENERATORS.find((g) => g.name === fav.fontName);
    const textToCopy = generator ? generator.transform(inputText) : (fav.result || fav.text);
    navigator.clipboard.writeText(textToCopy);
    setCopiedName(fav.fontName);
    setTimeout(() => setCopiedName(null), 1800);
  };

  return (
    <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-300/80 shadow-xs relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Star className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>⭐ Mis Fuentes Favoritas Guardadas ({favorites.length})</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Tus estilos preferidos para acceso rápido permanente
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {favorites.map((fav) => {
          const generator = FONT_GENERATORS.find((g) => g.name === fav.fontName);
          const transformed = generator ? generator.transform(inputText) : (fav.result || fav.text);
          const isCopied = copiedName === fav.fontName;

          return (
            <div
              key={fav.fontName}
              className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider truncate">
                    {fav.fontName}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (generator) {
                        onToggleFavorite(generator, transformed);
                      }
                    }}
                    title="Quitar de favoritos"
                    className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-sm font-medium text-slate-900 truncate mb-3 select-all">
                  {transformed}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(fav)}
                className={`w-full py-1.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
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
                    <span>Copiar Favorita</span>
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
