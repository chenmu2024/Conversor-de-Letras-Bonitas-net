import React, { useState } from 'react';
import { Sparkles, Copy, Check, Star, Heart, Crosshair, Smile, Layers, Plus } from 'lucide-react';

interface SymbolCategory {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  symbols: string[];
}

const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    id: 'estrellas',
    name: 'Estrellas & Destellos',
    badge: 'Popular IG',
    icon: <Star className="w-3.5 h-3.5 text-amber-500" />,
    symbols: [
      '★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '⋆', '✵', '✶', '✹', '✸', '✷', '⁂', '✡', '⚝', '☪', '✨', '⭐', '🌟', '💫', '⚡',
    ],
  },
  {
    id: 'corazones-flores',
    name: 'Corazones & Flores',
    badge: 'Aesthetic',
    icon: <Heart className="w-3.5 h-3.5 text-pink-500" />,
    symbols: [
      '♥', '♡', '❥', '❣', '❦', '❧', 'ღ', 'ɞ', '𑁍', '🌸', '🌹', '🌺', '🌻', '🌷', '✿', '❀', '❁', '❂', '❃', '❊', '❋', '𑁍', '𖤣', '𖥧', '𖡼', '𖤣', '𖥧',
    ],
  },
  {
    id: 'cruces-armas',
    name: 'Cruces, Alas & Armas Gamer',
    badge: 'Free Fire',
    icon: <Crosshair className="w-3.5 h-3.5 text-indigo-500" />,
    symbols: [
      '꧁', '༺', '༻', '꧂', '亗', '☬', '༒', '†', '‡', '✞', '✟', '✢', '✠', '⚔', '🗡', '🏹', '🛡', '☠', '☣', '☢', 'Ψ', '彡', '父', '气', '王',
    ],
  },
  {
    id: 'corchetes-marcos',
    name: 'Corchetes, Flechas & Marcos',
    badge: 'Organización',
    icon: <Layers className="w-3.5 h-3.5 text-emerald-500" />,
    symbols: [
      '『', '』', '「', '」', '【', '】', '〖', '〗', '〘', '〙', '《', '》', '〔', '〕', '«', '»', '‹', '›', '➔', '➜', '➤', '➥', '➳', '▲', '▼', '◄', '►', '◆', '◇', '◈', '◉',
    ],
  },
  {
    id: 'kaomoji-caritas',
    name: 'Caritas Kaomoji Japonesas',
    badge: 'Cute & Anime',
    icon: <Smile className="w-3.5 h-3.5 text-purple-500" />,
    symbols: [
      '(◕‿◕) ♡',
      '(づ｡◕‿‿◕｡)づ',
      '(ง\'̀-\'́)ง',
      '(✿◠‿◠)',
      'ʕ•ᴥ•ʔ',
      '(｡♥‿♥｡)',
      '(•‿•)',
      '¯\\_(ツ)_/¯',
      '(╯°□°)╯︵ ┻━┻',
      '(⁄ ⁄•⁄ω⁄•⁄ ⁄)',
      '٩(◕‿◕｡)۶',
      '(¬‿¬)',
      '(≧◡≦)',
      '｡◕‿◕｡',
    ],
  },
];

interface SymbolMatrixSectionProps {
  onInsertSymbol?: (symbol: string) => void;
}

export const SymbolMatrixSection: React.FC<SymbolMatrixSectionProps> = ({ onInsertSymbol }) => {
  const [activeCategory, setActiveCategory] = useState<string>('estrellas');
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const currentCat = SYMBOL_CATEGORIES.find((c) => c.id === activeCategory) || SYMBOL_CATEGORIES[0];

  const handleCopySymbol = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    setCopiedChar(symbol);
    if (onInsertSymbol) {
      onInsertSymbol(symbol);
    }
    setTimeout(() => setCopiedChar(null), 1500);
  };

  return (
    <section id="catalogo-simbolos-especiales" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Catálogo de Símbolos Unicode & Kaomojis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Símbolos Especiales, Estrellas, Cruces y Caritas para Copiar
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Haz clic en cualquier símbolo o emoticono para copiarlo al instante en tu portapapeles o insertarlo en tu diseño de texto.
          </p>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap gap-1.5">
          {SYMBOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Symbol Display Matrix */}
      <div className="mt-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-900">{currentCat.name}</span>
            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-bold">
              {currentCat.badge}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {currentCat.symbols.length} caracteres
          </span>
        </div>

        {/* Grid: adaptive for single characters vs long kaomojis */}
        <div
          className={
            activeCategory === 'kaomoji-caritas'
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5'
              : 'grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-14 gap-2'
          }
        >
          {currentCat.symbols.map((sym, index) => (
            <button
              key={`${activeCategory}-${index}`}
              onClick={() => handleCopySymbol(sym)}
              title={`Copiar símbolo: ${sym}`}
              className={`relative flex items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                copiedChar === sym
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                  : 'bg-slate-50/80 border-slate-200/80 text-slate-800 hover:bg-white hover:border-purple-300 hover:shadow-xs'
              } ${activeCategory === 'kaomoji-caritas' ? 'text-xs font-mono font-bold' : 'text-lg font-bold'}`}
            >
              <span>{sym}</span>
              {copiedChar === sym && (
                <span className="absolute -top-2 -right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions footer note */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Compatibles con WhatsApp, Instagram, TikTok, Facebook y Free Fire</span>
        </span>
        <span className="font-semibold text-slate-700">1 Clic para Copiar</span>
      </div>
    </section>
  );
};
