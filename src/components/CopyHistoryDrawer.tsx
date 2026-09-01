import React, { useState, useEffect } from 'react';
import { History, Copy, Check, Trash2, X, Sparkles } from 'lucide-react';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
      const item: CopyHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        text: e.detail.text,
        fontName: e.detail.fontName || 'Letras Bonitas',
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        const filtered = prev.filter((p) => p.text !== item.text);
        const updated = [item, ...filtered].slice(0, 15);
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
    try {
      await navigator.clipboard.writeText(item.text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

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
        className="fixed bottom-20 left-4 z-40 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-700 hover:text-indigo-600 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2 text-xs font-bold"
      >
        <History className="w-4 h-4 text-indigo-600" />
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
          <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold font-heading text-sm text-slate-900">
                    Historial de Copiados
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Últimas {history.length} frases copiadas
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {history.length === 0 ? (
                <div className="text-center py-16 px-4 text-slate-400">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-bold text-slate-600 mb-1">
                    No hay elementos recientes
                  </p>
                  <p className="text-[11px]">
                    Copia cualquier estilo de la lista y se guardará automáticamente aquí.
                  </p>
                </div>
              ) : (
                history.map((item) => {
                  const isCopied = copiedId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>{item.fontName}</span>
                        <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>

                      <p className="text-xs font-medium text-slate-900 break-words">
                        {item.text}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleCopyAgain(item)}
                        className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>¡Copiado de nuevo!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {history.length > 0 && (
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={clearHistory}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Borrar Historial</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
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
