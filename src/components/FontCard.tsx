import React, { useState } from 'react';
import { FontGenerator } from '../types';
import { Copy, Check, Star, Eye, Image as ImageIcon, CheckSquare, Square, Share2, ThumbsUp, Send, Volume2 } from 'lucide-react';

interface FontCardProps {
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

export const FontCard: React.FC<FontCardProps> = React.memo(({
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
  const [shared, setShared] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => {
    // Generate deterministic pleasing baseline count based on id hash
    let hash = 0;
    for (let i = 0; i < generator.id.length; i++) {
      hash = (hash << 5) - hash + generator.id.charCodeAt(i);
    }
    return 120 + Math.abs(hash % 380);
  });

  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl md:text-2xl',
    lg: 'text-xl sm:text-2xl md:text-3xl',
    xl: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
  };

  const convertedText = inputText
    ? generator.transform(inputText)
    : generator.transform('Letras Bonitas');

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);

      // Haptic feedback for mobile devices
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(35);
        } catch {
          // Ignore
        }
      }

      // Dispatch event for copy history drawer
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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShareText) {
      onShareText(convertedText, generator.name);
      return;
    }
    const shareMessage = `${convertedText}\n\n✨ Creado gratis en conversordeletrasbonitas.net`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Letras Bonitas: ${generator.name}`,
          text: shareMessage,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        // User cancelled or share failed, fallback to whatsapp URL
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, '_blank');
      }
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, '_blank');
    }
  };

  return (
    <div
      id={`font-card-${generator.id}`}
      onClick={handleCopy}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer select-none p-4 sm:p-5 flex flex-col justify-between hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.06)] hover:border-indigo-300 ${
        isSelected
          ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50/10'
          : copied 
            ? 'ring-2 ring-emerald-500/30 border-emerald-400 bg-emerald-50/20' 
            : 'border-slate-200/90 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]'
      }`}
    >
      {/* Top row: font name + category tags + action icons */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          {/* Multi-select toggle checkbox */}
          {onToggleSelect && (
            <button
              type="button"
              id={`btn-select-${generator.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect(generator.id, convertedText);
              }}
              title={isSelected ? 'Deseleccionar' : 'Seleccionar para copiar en lote'}
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

          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
            {generator.name}
          </span>
          {generator.isPopular && (
            <span className="bg-amber-100/90 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              ★ Popular
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* Share to WhatsApp / WebShare */}
          <button
            type="button"
            id={`btn-share-${generator.id}`}
            onClick={(e) => {
              e.stopPropagation();
              const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(convertedText)}`;
              window.open(url, '_blank');
            }}
            title="Enviar directamente por WhatsApp"
            className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <Send className="w-4 h-4 text-emerald-600" />
          </button>

          {/* Export PNG Card button */}
          {onExportImage && (
            <button
              type="button"
              id={`btn-img-${generator.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onExportImage(convertedText, generator.name);
              }}
              title="Descargar como imagen para Instagram Story / Post"
              className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          )}

          {/* Preview icon */}
          <button
            type="button"
            id={`btn-preview-${generator.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onPreview(convertedText, generator.name);
            }}
            title="Previsualizar en Instagram / TikTok / WhatsApp"
            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Audio Pronunciation TTS button */}
          <button
            type="button"
            id={`btn-speak-${generator.id}`}
            onClick={(e) => {
              e.stopPropagation();
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(inputText || 'Letras Bonitas');
                utter.lang = 'es-ES';
                window.speechSynthesis.speak(utter);
              }
            }}
            title="Escuchar pronunciación por voz"
            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Favorite star */}
          <button
            type="button"
            id={`btn-fav-${generator.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(generator, convertedText);
            }}
            title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className="p-1.5 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
          >
            <Star
              className={`w-4 h-4 transition-transform group-hover/star:scale-110 ${
                isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Converted text display area */}
      <div className="my-1 py-3 px-4 rounded-xl bg-slate-50/70 border border-slate-100/80 group-hover:bg-indigo-50/30 group-hover:border-indigo-100/90 transition-all min-h-[64px] flex items-center">
        <p className={`${sizeClasses[fontSize]} text-slate-900 break-words font-medium tracking-wide leading-relaxed selection:bg-indigo-600 selection:text-white`}>
          {convertedText}
        </p>
      </div>

      {/* Bottom bar with Copy button & Helpful like counter */}
      <div className="flex items-center justify-between mt-3 pt-2">
        <div className="flex items-center gap-2">
          {/* Like / Helpful vote button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
              setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
            }}
            title="Votar este estilo como útil"
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
              liked
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ThumbsUp className={`w-3 h-3 ${liked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
            <span>{likeCount}</span>
          </button>

          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-500 transition-colors hidden sm:inline">
            Toca para copiar
          </span>
        </div>

        <button
          type="button"
          id={`btn-copy-${generator.id}`}
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 group-hover:shadow-indigo-600/35'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3] animate-pulse" />
              <span>¡Copiado! ✓</span>
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


