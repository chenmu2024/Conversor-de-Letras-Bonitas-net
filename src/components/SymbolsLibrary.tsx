import React, { useState, useMemo } from 'react';
import { SYMBOL_CATEGORIES, POPULAR_SYMBOL_COMBOS, INVISIBLE_SPACE } from '../data/symbols';
import {
  Copy,
  Check,
  Search,
  Layers,
  Sparkles,
  Trash2,
  Space,
  Flame,
  Star,
  Swords,
  Heart,
  Crown,
  Tag,
  ArrowRight,
  Plus,
  Zap,
  MousePointerClick,
  FileEdit
} from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface SymbolsLibraryProps {
  onApplyText?: (text: string) => void;
}

export const SymbolsLibrary: React.FC<SymbolsLibraryProps> = ({ onApplyText }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [clickMode, setClickMode] = useState<'copy' | 'insert' | 'scratchpad'>('copy');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scratchpad, setScratchpad] = useState<string>('');
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const [copiedPad, setCopiedPad] = useState(false);
  const [copiedCombo, setCopiedCombo] = useState<string | null>(null);
  const [quickCopiedSpace, setQuickCopiedSpace] = useState(false);

  const handleCopySingle = async (char: string, name?: string) => {
    const success = await copyToClipboard(char, name || 'Símbolo Especial');
    if (success) {
      setCopiedChar(char);
      setTimeout(() => setCopiedChar(null), 1500);
    }
  };

  const handleSymbolClick = (char: string, name: string) => {
    if (clickMode === 'copy') {
      handleCopySingle(char, name);
    } else if (clickMode === 'insert') {
      if (onApplyText) {
        onApplyText(char);
      }
      setCopiedChar(char);
      setTimeout(() => setCopiedChar(null), 1000);
    } else {
      handleAddToPad(char);
    }
  };

  const handleAddToPad = (char: string) => {
    setScratchpad((prev) => prev + char);
  };

  const handleCopyPad = async () => {
    if (!scratchpad) return;
    const success = await copyToClipboard(scratchpad, 'Combinación de Símbolos');
    if (success) {
      setCopiedPad(true);
      setTimeout(() => setCopiedPad(false), 2000);
      if (onApplyText) onApplyText(scratchpad);
    }
  };

  const handleCopyCombo = async (text: string, name: string) => {
    const success = await copyToClipboard(text, name);
    if (success) {
      setCopiedCombo(name);
      setTimeout(() => setCopiedCombo(null), 1800);
      if (onApplyText) onApplyText(text);
    }
  };

  const handleCopySpace = async () => {
    const success = await copyToClipboard(INVISIBLE_SPACE, 'Espacio Invisible U+3164');
    if (success) {
      setQuickCopiedSpace(true);
      setTimeout(() => setQuickCopiedSpace(false), 1800);
    }
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return SYMBOL_CATEGORIES.map((cat) => {
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }
      const filteredSymbols = cat.symbols.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.char.includes(searchQuery)
      );
      if (filteredSymbols.length === 0) return null;
      return {
        ...cat,
        symbols: filteredSymbols,
      };
    }).filter(Boolean);
  }, [activeCategory, searchQuery]);

  return (
    <div id="simbolos-section" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-12">
      {/* Studio Header Banner */}
      <div className="p-6 sm:p-7 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white border-b border-indigo-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 shrink-0 border border-indigo-400/30 shadow-inner">
              <Layers className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/30 text-[10px] font-black uppercase tracking-wider text-indigo-200 border border-indigo-400/30">
                  CONVERSOR DE LETRAS BONITAS · SÍMBOLOS
                </span>
                <span className="text-xs text-indigo-200 font-bold">Símbolos del Conversor de Letras Bonitas · 1 Clic Copiar</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5 text-white">
                Símbolos y Caracteres en el Conversor de Letras Bonitas
              </h2>
            </div>
          </div>

          {/* Quick Copy Invisible Space in Header */}
          <button
            type="button"
            onClick={handleCopySpace}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 shadow-sm ${
              quickCopiedSpace
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-700/80 hover:bg-indigo-600 text-white border border-indigo-500/30 active:scale-95'
            }`}
            title="Copiar Hangul Filler U+3164 para Free Fire"
          >
            <Space className="w-4 h-4" />
            <span>{quickCopiedSpace ? '¡Espacio Copiado!' : 'Copiar Espacio Invisible [ㅤ]'}</span>
          </button>
        </div>

        {/* Scratchpad: Combinador de Símbolos */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-indigo-950/70 border border-indigo-800/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Combinador de Símbolos (Toca cualquier símbolo para ir armando tu diseño)
            </span>
            {scratchpad && (
              <button
                type="button"
                onClick={() => setScratchpad('')}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <input
              id="scratchpad-input"
              type="text"
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              placeholder="Tus símbolos seleccionados aparecerán aquí... Escribe o toca los símbolos de abajo."
              className="flex-1 px-4 py-2.5 text-sm bg-slate-900/90 border border-indigo-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 font-mono"
            />
            <button
              id="btn-copy-scratchpad"
              type="button"
              onClick={handleCopyPad}
              disabled={!scratchpad}
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-sm ${
                copiedPad
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-500 hover:bg-indigo-400 text-slate-950'
              }`}
            >
              {copiedPad ? (
                <>
                  <Check className="w-4 h-4 stroke-[3] animate-pulse" />
                  <span>¡Copiado Todo! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Combinación</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Popular Combos Quick Ribbon */}
        <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Combinaciones y Decoraciones Populares (1 Clic para Copiar):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SYMBOL_COMBOS.map((combo) => {
              const isCopied = copiedCombo === combo.name;
              return (
                <button
                  key={combo.name}
                  type="button"
                  onClick={() => handleCopyCombo(combo.text, combo.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs border ${
                    isCopied
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 border-slate-200'
                  }`}
                  title={`Copiar ${combo.name}`}
                >
                  <span className="font-mono">{combo.text}</span>
                  {isCopied && <Check className="w-3 h-3 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Click Action Mode Selector & Quick Switcher */}
        <div className="mb-6 p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
              <MousePointerClick className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-black text-slate-800">
                Al tocar un símbolo:
              </span>
              <p className="text-[11px] text-slate-500">
                Elige qué sucede al hacer clic sobre cualquier icono de la lista.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => setClickMode('copy')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                clickMode === 'copy'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Copiar Directo</span>
            </button>
            <button
              type="button"
              onClick={() => setClickMode('insert')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                clickMode === 'insert'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Insertar en Texto</span>
            </button>
            <button
              type="button"
              onClick={() => setClickMode('scratchpad')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                clickMode === 'scratchpad'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Al Combinador</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="symbol-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar símbolo (alas, corona, fuego, flecha, cruz, corazón, kaomoji...)"
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-hidden focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white text-slate-900 transition-all font-medium"
            />
          </div>

          {/* Category Pill Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({SYMBOL_CATEGORIES.reduce((acc, c) => acc + c.symbols.length, 0)})
            </button>
            {SYMBOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({cat.symbols.length})
              </button>
            ))}
          </div>
        </div>

        {/* Symbol Categories Display */}
        <div className="space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category!.id} className="border border-slate-200/80 rounded-2xl p-5 sm:p-6 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      {category!.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal">
                      {category!.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg self-start sm:self-auto border border-indigo-100">
                    {category!.symbols.length} símbolos
                  </span>
                </div>

                {/* Grid of symbols */}
                <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
                  {category!.symbols.map((sym, idx) => {
                    const isCopied = copiedChar === sym.char;
                    return (
                      <div
                        key={idx}
                        className="group relative flex flex-col items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all shadow-2xs"
                      >
                        {/* Action on click based on selected clickMode */}
                        <button
                          type="button"
                          onClick={() => handleSymbolClick(sym.char, sym.name)}
                          title={`Tocar para ${clickMode === 'copy' ? 'copiar' : clickMode === 'insert' ? 'insertar' : 'combinar'} '${sym.name}'`}
                          className="text-lg sm:text-2xl font-normal text-slate-800 group-hover:scale-115 active:scale-90 transition-transform min-h-[36px] flex items-center justify-center w-full"
                        >
                          {sym.char}
                        </button>

                        {/* Tooltip / Name */}
                        <span className="text-[9px] font-medium text-slate-400 truncate max-w-full text-center mt-1">
                          {sym.name}
                        </span>

                        {/* Direct Copy Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopySingle(sym.char);
                          }}
                          title="Copiar directamente al portapapeles"
                          className={`mt-2 w-full py-1 text-[10px] font-extrabold rounded-lg transition-all flex items-center justify-center gap-0.5 active:scale-95 ${
                            isCopied
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                              <span>¡Listo!</span>
                            </>
                          ) : (
                            <span>Copiar</span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-semibold">
              No se encontraron símbolos con el término "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
