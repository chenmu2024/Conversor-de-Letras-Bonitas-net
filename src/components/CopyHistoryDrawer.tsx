import React, { useState, useEffect, useMemo } from 'react';
import { History, Copy, Check, Trash2, X, Sparkles, Search, Calendar, FileText } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { useModalBackdrop } from '../hooks/useModalBackdrop';

interface CopyHistoryItem {
  id: string;
  text: string;
  fontName: string;
  timestamp: number;
}

const STORAGE_KEY = 'letras_bonitas_copy_history';

export const CopyHistoryDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<CopyHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useModalBackdrop(isOpen, () => setIsOpen(false), 'copy-history');

  // Load history from localStorage
  const loadHistory = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    loadHistory();

    // Listen for custom copy event from cards
    const handleCopyEvent = (e: any) => {
      const newText = (e.detail?.text || '').trim();
      if (!newText) return;

      const item: CopyHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        text: newText,
        fontName: e.detail?.fontName || 'Letras Bonitas',
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        // Remove identical text entry to keep history clean and deduped
        const filtered = prev.filter((p) => p.text !== item.text);
        const updated = [item, ...filtered].slice(0, 30);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {}
        return updated;
      });
    };

    // Listen for open drawer request event
    const handleOpenDrawerEvent = () => {
      loadHistory();
      setIsOpen(true);
    };

    window.addEventListener('font-copied', handleCopyEvent);
    window.addEventListener('open-copy-history', handleOpenDrawerEvent);
    return () => {
      window.removeEventListener('font-copied', handleCopyEvent);
      window.removeEventListener('open-copy-history', handleOpenDrawerEvent);
    };
  }, []);

  const handleCopyAgain = async (item: CopyHistoryItem) => {
    const success = await copyToClipboard(item.text, item.fontName);
    if (success) {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const deleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  // Filtered and sorted history items
  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history;
    const q = searchQuery.toLowerCase();
    return history.filter(
      (item) => item.text.toLowerCase().includes(q) || item.fontName.toLowerCase().includes(q)
    );
  }, [history, searchQuery]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="btn-open-copy-history"
        type="button"
        onClick={() => {
          loadHistory();
          setIsOpen(true);
        }}
        className="fixed bottom-20 left-4 z-40 px-3.5 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2 text-xs font-bold"
      >
        <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span className="hidden sm:inline">Historial</span>
        {history.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-extrabold">
            {history.length}
          </span>
        )}
      </button>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-800">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold font-heading text-sm text-slate-900 dark:text-white">
                    Historial de Copiados
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {history.length} {history.length === 1 ? 'estilo guardado' : 'estilos guardados'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    title="Vaciar todo el historial"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search filter in history */}
            {history.length > 3 && (
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrar frases copiadas..."
                    className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-16 px-4 text-slate-400 dark:text-slate-500">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    {searchQuery ? 'No hay resultados que coincidan' : 'No hay elementos recientes'}
                  </p>
                  <p className="text-[11px]">
                    {searchQuery
                      ? 'Intenta con otra palabra clave.'
                      : 'Copia cualquier estilo de la lista y se guardará automáticamente aquí.'}
                  </p>
                </div>
              ) : (
                filteredHistory.map((item) => {
                  const isCopied = copiedId === item.id;
                  const dateStr = new Date(item.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCopyAgain(item)}
                      className={`group p-3 rounded-2xl border transition-all cursor-pointer select-none relative ${
                        isCopied
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 ring-2 ring-emerald-500/20'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          {item.fontName}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">
                            {dateStr}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => deleteItem(item.id, e)}
                            className="text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 p-0.5 transition-colors"
                            title="Eliminar de historial"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 break-words mb-2">
                        {item.text}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-700/60 text-[11px]">
                        <span className="text-slate-400 dark:text-slate-500">
                          Toca para volver a copiar
                        </span>
                        <span
                          className={`font-bold flex items-center gap-1 ${
                            isCopied ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {history.length > 0 && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={clearHistory}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Borrar Historial</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
