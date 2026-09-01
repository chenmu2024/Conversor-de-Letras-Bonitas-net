import React from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

interface SymbolQuickRibbonProps {
  onInsertSymbol: (symbol: string) => void;
}

const QUICK_SYMBOLS = [
  { symbol: '༺ ༻', label: 'Alas Simples' },
  { symbol: '꧁ ꧂', label: 'Marcos FF' },
  { symbol: '★', label: 'Estrella' },
  { symbol: '⚡', label: 'Rayo' },
  { symbol: '✿', label: 'Flor' },
  { symbol: '✦', label: 'Destello' },
  { symbol: '👑', label: 'Corona' },
  { symbol: '🔥', label: 'Fuego' },
  { symbol: '亗', label: 'Corona FF' },
  { symbol: 'ꔪ', label: 'Insignia' },
  { symbol: '✓', label: 'Verificado' },
  { symbol: 'ㅤ', label: 'Espacio Invisible' },
];

export const SymbolQuickRibbon: React.FC<SymbolQuickRibbonProps> = ({ onInsertSymbol }) => {
  const [copiedSymbol, setCopiedSymbol] = React.useState<string | null>(null);

  const handleTap = (sym: string) => {
    onInsertSymbol(sym);
    setCopiedSymbol(sym);
    setTimeout(() => setCopiedSymbol(null), 1200);
  };

  return (
    <div className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-200/70">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Insertar Símbolos y Adornos Rápidos:</span>
        </span>
        <span className="text-[10px] text-slate-400 font-semibold hidden sm:inline">
          Toca para agregar al texto
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {QUICK_SYMBOLS.map((item) => {
          const isJustCopied = copiedSymbol === item.symbol;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleTap(item.symbol)}
              title={`Añadir ${item.label} (${item.symbol})`}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 border ${
                isJustCopied
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border-slate-200 shadow-2xs'
              }`}
            >
              <span className="font-mono text-sm">{item.symbol === 'ㅤ' ? '[Espacio Invisible]' : item.symbol}</span>
              {isJustCopied ? (
                <Check className="w-3 h-3 text-white" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
