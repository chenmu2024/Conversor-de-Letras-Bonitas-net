import React, { useState, useEffect } from 'react';
import { Check, Sparkles, X } from 'lucide-react';

interface ToastData {
  id: string;
  text: string;
  fontName: string;
}

export const ToastNotification: React.FC = () => {
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    const handleCopyEvent = (e: any) => {
      const data: ToastData = {
        id: Math.random().toString(36).substring(2, 9),
        text: e.detail.text,
        fontName: e.detail.fontName || 'Fuente Especial',
      };
      setToast(data);
    };

    window.addEventListener('font-copied', handleCopyEvent);
    return () => window.removeEventListener('font-copied', handleCopyEvent);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      id="global-copy-toast"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[92%] sm:w-auto bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-between gap-3 transition-all duration-200 animate-in fade-in slide-in-from-top-4"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
              ¡Copiado!
            </span>
            <span className="text-[10px] text-slate-400 font-medium truncate">
              ({toast.fontName})
            </span>
          </div>
          <p className="text-sm font-medium text-slate-200 truncate max-w-[220px]">
            {toast.text}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setToast(null)}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors shrink-0"
        title="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
