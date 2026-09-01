import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Send, 
  Globe, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  fontName?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  text,
  fontName,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedFormattedText, setCopiedFormattedText] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://conversordeletrasbonitas.net';
  const shareUrl = `${currentOrigin}/?text=${encodeURIComponent(text)}`;
  const viralMessage = `✨ ¡Mira qué genial se ve mi nombre en letras bonitas!\n\n${text}\n\n👉 Crea el tuyo gratis aquí:\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(30);
      }
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleCopyViralMessage = async () => {
    try {
      await navigator.clipboard.writeText(viralMessage);
      setCopiedFormattedText(true);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(30);
      }
      setTimeout(() => setCopiedFormattedText(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Letras Bonitas: ${fontName || 'Texto Estilizado'}`,
          text: `✨ Mira mi texto estilizado:\n${text}\n\nCrea el tuyo gratis en:`,
          url: shareUrl,
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(viralMessage)}`, '_blank');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`✨ Mira mi texto en letras bonitas:\n${text}`)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`✨ Mira mi texto en letras bonitas:\n${text}\n\n`)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base text-slate-900">
                Compartir Texto & Link Viral
              </h3>
              <p className="text-[11px] text-slate-500">
                {fontName ? `Estilo: ${fontName}` : 'Comparte tu resultado directamente'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Text Preview Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Vista previa del mensaje:
          </span>
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 font-bold text-slate-800 text-sm sm:text-base break-words shadow-2xs">
            {text}
          </div>
        </div>

        {/* Direct Social Buttons */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
            Compartir en Redes Sociales:
          </span>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={shareToWhatsApp}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-all active:scale-95 border border-emerald-200"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-[11px]">WhatsApp</span>
            </button>

            <button
              onClick={shareToTelegram}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs transition-all active:scale-95 border border-sky-200"
            >
              <Send className="w-5 h-5 text-sky-600" />
              <span className="text-[11px]">Telegram</span>
            </button>

            <button
              onClick={shareToTwitter}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all active:scale-95 border border-slate-200"
            >
              <span className="font-black text-sm">𝕏</span>
              <span className="text-[11px]">Twitter (X)</span>
            </button>

            <button
              onClick={shareToFacebook}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-all active:scale-95 border border-blue-200"
            >
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="text-[11px]">Facebook</span>
            </button>
          </div>
        </div>

        {/* Native Share & Direct Link Copy */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 font-mono truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? '¡Copiado!' : 'Copiar Link'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopyViralMessage}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              {copiedFormattedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              <span>Copiar Texto + Link</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center gap-1.5 transition-all border border-indigo-200"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Menú Nativo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
