import React, { useState, useEffect } from 'react';
import { Type, ArrowUp, Copy, Check, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface StickyMobileInputBarProps {
  currentText: string;
  onTextChange: (text: string) => void;
  onScrollToTop: () => void;
}

export const StickyMobileInputBar: React.FC<StickyMobileInputBarProps> = ({
  currentText,
  onTextChange,
  onScrollToTop,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past the main converter input (around 380px)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleCopyCurrent = async () => {
    if (!currentText) return;
    const success = await copyToClipboard(currentText, 'Texto Rápido');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <aside aria-label="Barra rápida flotante" className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-96 z-40 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-2.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-2">
        {/* Input box */}
        <div className="flex-1 relative flex items-center">
          <Type className="w-4 h-4 text-indigo-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={currentText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Cambiar texto rápido..."
            className="w-full pl-8 pr-2 py-1.5 bg-slate-800/90 border border-slate-600 rounded-xl text-xs font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
          />
        </div>

        {/* Action: Copy or Jump to Top */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopyCurrent}
            className={`p-1.5 rounded-xl transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
            title="Copiar texto actual"
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onScrollToTop}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors"
            title="Subir al conversor"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
