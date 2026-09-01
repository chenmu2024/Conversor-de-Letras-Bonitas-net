import React, { useState, useRef } from 'react';
import { 
  Download, 
  Sparkles, 
  X, 
  Check, 
  Image as ImageIcon, 
  Palette, 
  Type, 
  Share2, 
  Copy,
  Layers,
  Smartphone,
  Square,
  Monitor
} from 'lucide-react';

interface TextImageExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  fontName: string;
}

interface GradientTheme {
  id: string;
  name: string;
  colors: string[];
  textColor: string;
  watermarkColor: string;
  borderColor: string;
  dark?: boolean;
}

const THEMES: GradientTheme[] = [
  { 
    id: 'insta-sunset', 
    name: 'Instagram Sunset', 
    colors: ['#833ab4', '#fd1d1d', '#fcb045'], 
    textColor: '#ffffff', 
    watermarkColor: 'rgba(255,255,255,0.75)',
    borderColor: 'rgba(255,255,255,0.2)'
  },
  { 
    id: 'cyber-dark', 
    name: 'Cyberpunk Dark', 
    colors: ['#090d16', '#1e1b4b', '#311042'], 
    textColor: '#f8fafc', 
    watermarkColor: 'rgba(248,250,252,0.65)',
    borderColor: 'rgba(99,102,241,0.3)',
    dark: true
  },
  { 
    id: 'neon-violet', 
    name: 'Neon Violet & Rose', 
    colors: ['#4f46e5', '#7c3aed', '#db2777'], 
    textColor: '#ffffff', 
    watermarkColor: 'rgba(255,255,255,0.75)',
    borderColor: 'rgba(255,255,255,0.25)'
  },
  { 
    id: 'golden-luxury', 
    name: 'Luxury Black & Gold', 
    colors: ['#121212', '#2a241b', '#423722'], 
    textColor: '#fef08a', 
    watermarkColor: 'rgba(254,240,138,0.7)',
    borderColor: 'rgba(254,240,138,0.3)',
    dark: true
  },
  { 
    id: 'emerald-mint', 
    name: 'Emerald Aurora', 
    colors: ['#064e3b', '#047857', '#10b981'], 
    textColor: '#ffffff', 
    watermarkColor: 'rgba(255,255,255,0.75)',
    borderColor: 'rgba(255,255,255,0.2)'
  },
  { 
    id: 'pastel-pink', 
    name: 'Pastel Aesthetic', 
    colors: ['#fdf2f8', '#fce7f3', '#fbcfe8'], 
    textColor: '#831843', 
    watermarkColor: 'rgba(131,24,67,0.6)',
    borderColor: 'rgba(131,24,67,0.15)'
  },
  { 
    id: 'clean-white', 
    name: 'Minimal Pure White', 
    colors: ['#ffffff', '#f8fafc', '#f1f5f9'], 
    textColor: '#0f172a', 
    watermarkColor: 'rgba(15,23,42,0.5)',
    borderColor: 'rgba(15,23,42,0.1)'
  },
  { 
    id: 'ocean-deep', 
    name: 'Ocean Gradient', 
    colors: ['#0f172a', '#0369a1', '#06b6d4'], 
    textColor: '#ffffff', 
    watermarkColor: 'rgba(255,255,255,0.75)',
    borderColor: 'rgba(255,255,255,0.2)'
  }
];

export const TextImageExportModal: React.FC<TextImageExportModalProps> = ({
  isOpen,
  onClose,
  text,
  fontName,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<GradientTheme>(THEMES[0]);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '4:5' | '16:9'>('9:16');
  const [subtitle, setSubtitle] = useState('conversordeletrasbonitas.net');
  const [fontSize, setFontSize] = useState<number>(38);
  const [includeBorder, setIncludeBorder] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  if (!isOpen) return null;

  const createRenderCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    let width = 1080;
    let height = 1920;

    if (aspectRatio === '1:1') {
      width = 1080;
      height = 1080;
    } else if (aspectRatio === '4:5') {
      width = 1080;
      height = 1350;
    } else if (aspectRatio === '16:9') {
      width = 1200;
      height = 675;
    }

    canvas.width = width;
    canvas.height = height;

    // Linear Gradient Background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (selectedTheme.colors.length === 3) {
      grad.addColorStop(0, selectedTheme.colors[0]);
      grad.addColorStop(0.5, selectedTheme.colors[1]);
      grad.addColorStop(1, selectedTheme.colors[2]);
    } else {
      grad.addColorStop(0, selectedTheme.colors[0]);
      grad.addColorStop(1, selectedTheme.colors[1] || selectedTheme.colors[0]);
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Decorative Inner Frame
    if (includeBorder) {
      ctx.strokeStyle = selectedTheme.borderColor;
      ctx.lineWidth = 4;
      const margin = Math.round(width * 0.04);
      ctx.strokeRect(margin, margin, width - (margin * 2), height - (margin * 2));

      // Decorative corner accents
      const cornerSize = 24;
      ctx.lineWidth = 6;
      ctx.strokeStyle = selectedTheme.textColor;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(margin, margin + cornerSize);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + cornerSize, margin);
      ctx.stroke();
      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(width - margin, height - margin - cornerSize);
      ctx.lineTo(width - margin, height - margin);
      ctx.lineTo(width - margin - cornerSize, height - margin);
      ctx.stroke();
    }

    // Main Text Rendering
    ctx.fillStyle = selectedTheme.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const renderFontSize = Math.round(fontSize * (width / 600));
    ctx.font = `bold ${renderFontSize}px "Outfit", "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Symbol", sans-serif`;

    const maxWidth = width - Math.round(width * 0.16);
    const words = text.split(' ');
    let lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    const lineHeight = renderFontSize * 1.35;
    const startY = (height / 2) - ((lines.length - 1) * lineHeight / 2);

    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, startY + (index * lineHeight));
    });

    // Watermark / Brand footer
    if (subtitle) {
      ctx.font = `600 ${Math.round(20 * (width / 600))}px "Plus Jakarta Sans", system-ui, sans-serif`;
      ctx.fillStyle = selectedTheme.watermarkColor;
      const watermarkY = height - Math.round(height * 0.05);
      ctx.fillText(subtitle, width / 2, watermarkY);
    }

    return canvas;
  };

  const handleDownload = () => {
    setIsExporting(true);
    const canvas = createRenderCanvas();
    const url = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = url;
    link.download = `letras-bonitas-${aspectRatio.replace(':', '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsExporting(false);
      onClose();
    }, 800);
  };

  const handleCopyImageToClipboard = async () => {
    try {
      const canvas = createRenderCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopiedImage(true);
          if ('vibrate' in navigator) navigator.vibrate(30);
          setTimeout(() => setCopiedImage(false), 2000);
        } else {
          handleDownload();
        }
      }, 'image/png', 1.0);
    } catch {
      handleDownload();
    }
  };

  const handleShareImage = async () => {
    try {
      const canvas = createRenderCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `letras-bonitas-${Date.now()}.png`, { type: 'image/png' });
        if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Letras Bonitas: ${fontName}`,
            text: `✨ Mira mi diseño de texto creado en https://conversordeletrasbonitas.net/`,
          });
        } else {
          handleDownload();
        }
      }, 'image/png', 1.0);
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-base sm:text-lg text-slate-900">
                Exportar Imagen HD para Redes
              </h3>
              <p className="text-[11px] text-slate-500">
                Descarga o copia al portapapeles una imagen lista para Instagram Story o WhatsApp.
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Live Preview Area */}
          <div className="flex justify-center bg-slate-100/60 p-4 rounded-2xl border border-slate-200/80">
            <div
              className={`rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-lg transition-all relative overflow-hidden ${
                aspectRatio === '9:16'
                  ? 'w-48 h-80 sm:w-56 sm:h-96'
                  : aspectRatio === '1:1'
                  ? 'w-56 h-56 sm:w-64 sm:h-64'
                  : aspectRatio === '4:5'
                  ? 'w-52 h-64 sm:w-60 sm:h-72'
                  : 'w-full h-36 sm:h-40 max-w-sm'
              }`}
              style={{
                background: `linear-gradient(135deg, ${selectedTheme.colors.join(', ')})`,
                color: selectedTheme.textColor,
              }}
            >
              {includeBorder && (
                <div 
                  className="absolute inset-2.5 rounded-xl pointer-events-none border"
                  style={{ borderColor: selectedTheme.borderColor }}
                />
              )}

              <div className="w-full h-full flex flex-col items-center justify-center p-2 relative z-10">
                <p className="font-bold text-center break-words max-w-full text-base sm:text-lg leading-relaxed">
                  {text}
                </p>
                {subtitle && (
                  <span 
                    className="text-[9px] font-semibold mt-3 tracking-wider"
                    style={{ color: selectedTheme.watermarkColor }}
                  >
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Configuration Controls */}
          <div className="space-y-3.5">
            {/* Format Ratio Selector */}
            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                Proporción / Formato:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: '9:16', label: 'Story (9:16)', icon: <Smartphone className="w-3.5 h-3.5" /> },
                  { id: '1:1', label: 'Post (1:1)', icon: <Square className="w-3.5 h-3.5" /> },
                  { id: '4:5', label: 'Feed (4:5)', icon: <Layers className="w-3.5 h-3.5" /> },
                  { id: '16:9', label: 'Banner (16:9)', icon: <Monitor className="w-3.5 h-3.5" /> },
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    type="button"
                    onClick={() => setAspectRatio(ratio.id as any)}
                    className={`py-2 px-1.5 text-xs font-bold rounded-xl border flex items-center justify-center gap-1 transition-all ${
                      aspectRatio === ratio.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ratio.icon}
                    <span className="hidden sm:inline">{ratio.label}</span>
                    <span className="sm:hidden">{ratio.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gradient Theme Swatches */}
            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                Estilo de Color & Fondo:
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    title={theme.name}
                    className={`h-9 w-9 rounded-xl shrink-0 transition-transform ${
                      selectedTheme.id === theme.id
                        ? 'ring-2 ring-indigo-600 scale-110 shadow-xs'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ background: `linear-gradient(135deg, ${theme.colors.join(', ')})` }}
                  />
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBorder}
                  onChange={(e) => setIncludeBorder(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
                />
                <span>Marco y detalles decorativos</span>
              </label>

              <span className="text-[10px] text-slate-400 font-mono">
                PNG HD 1080px
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopyImageToClipboard}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
          >
            {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedImage ? '¡Imagen Copiada!' : 'Copiar Imagen'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleShareImage}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartir</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-indigo-600/25 transition-all active:scale-95"
            >
              {isExporting ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar PNG</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
