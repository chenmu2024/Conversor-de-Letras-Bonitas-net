import React, { useState } from 'react';
import { FontGenerator } from '../types';
import { Copy, Check, Star, Eye, Image as ImageIcon, CheckSquare, Square, Share2 } from 'lucide-react';

interface CompactFontRowProps {
  generator: FontGenerator;
  inputText: string;
  isFavorite: boolean;
  isSelected?: boolean;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  onToggleFavorite: (generator: FontGenerator, result: string) => void;
  onToggleSelect?: (generatorId: string, resultText: string) => void;
  onPreview: (resultText: string, fontName: string) => void;
  onExportImage?: (resultText: string, fontName: string) => void;
  onShareText?: (resultText: string, fontName: string) => void;
}

export const CompactFontRow: React.FC<CompactFontRowProps> = React.memo(({
  generator,
  inputText,
  isFavorite,
  isSelected = false,
  fontSize = 'md',
  onToggleFavorite,
  onToggleSelect,
  onPreview,
  onExportImage,
  onShareText,
}) => {
  const [copied, setCopied] = useState(false);

  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl font-medium',
    xl: 'text-xl sm:text-2xl font-bold',
  };

  const isDefaultPlaceholder = !inputText.trim();
  const convertedText = !isDefaultPlaceholder
    ? generator.transform(inputText)
    : generator.transform('Letras Bonitas');

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // If input is empty, focus the main input box to guide user to type
    if (isDefaultPlaceholder) {
      const inputEl = document.getElementById('main-text-input');
      if (inputEl) {
        inputEl.focus();
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);

      // Haptic vibration feedback for mobile
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(35);
        } catch {
          // Ignore
        }
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('font-copied', {
            detail: { text: convertedText, fontName: generator.name },
          })
        );
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div
      id={`compact-font-${generator.id}`}
      onClick={handleCopy}
      className={`group relative flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3.5 bg-white rounded-2xl border transition-all duration-200 cursor-pointer select-none overflow-hidden ${
        isSelected
          ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
          : copied
            ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
            : 'border-slate-200/80 hover:border-indigo-400 hover:shadow-xs hover:bg-slate-50/60 shadow-2xs'
      }`}
    >
      {/* Subtle Left Active Hover Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 ${
        isSelected ? 'bg-indigo-600' : copied ? 'bg-emerald-500' : 'bg-transparent group-hover:bg-indigo-500'
      }`} />

      {/* Multi-select Checkbox */}
      {onToggleSelect && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(generator.id, convertedText);
          }}
          title={isSelected ? 'Deseleccionar' : 'Seleccionar'}
          className={`p-1 rounded-lg transition-colors ${
            isSelected
              ? 'text-indigo-600 bg-indigo-100'
              : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'
          }`}
        >
          {isSelected ? (
            <CheckSquare className="w-4 h-4 text-indigo-600" />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Left: Font Name & Transformed Text */}
      <div className="flex-1 min-w-0 pr-2 pl-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-extrabold text-slate-600 group-hover:text-indigo-600 uppercase tracking-wider truncate transition-colors">
            {generator.name}
          </span>
          {generator.isPopular && (
            <span className="bg-amber-100/90 text-amber-900 text-[9px] font-black px-2 py-0.3 rounded-md uppercase tracking-wider shadow-2xs">
              ★ Popular
            </span>
          )}
        </div>
        <p className={`${sizeClasses[fontSize]} text-slate-900 truncate font-normal tracking-wide`}>
          {convertedText}
        </p>
      </div>

      {/* Right: Quick Action Buttons & 1-Click Copy Badge */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Subtle quick tools (hidden on extra small, visible on hover or tablet) */}
        <div className="hidden sm:flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {onExportImage && (
            <button
              type="button"
              aria-label="Descargar texto como imagen"
              onClick={(e) => {
                e.stopPropagation();
                onExportImage(convertedText, generator.name);
              }}
              title="Descargar imagen"
              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
          )}

          {onShareText && (
            <button
              type="button"
              aria-label="Compartir texto estilizado"
              onClick={(e) => {
                e.stopPropagation();
                onShareText(convertedText, generator.name);
              }}
              title="Compartir texto estilizado"
              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            aria-label="Previsualizar texto"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(convertedText, generator.name);
            }}
            title="Previsualizar"
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(generator, convertedText);
            }}
            title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-500 hover:bg-amber-50 transition-colors"
          >
            <Star
              className={`w-3.5 h-3.5 ${
                isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
              }`}
            />
          </button>
        </div>

        {/* Big Tap to Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-xs ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 group-hover:shadow-indigo-600/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3] animate-pulse" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
});
