import React, { useState, useRef } from 'react';
import { Download, Sparkles, Image as ImageIcon, Check, Copy, Palette, Type, RefreshCw, Smartphone } from 'lucide-react';

interface PosterGeneratorModalProps {
  initialText?: string;
  initialFontName?: string;
  isOpen: boolean;
  onClose: () => void;
}

const BACKGROUND_GRADIENTS = [
  { id: 'sunset', name: 'Atardecer Violeta', bg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', textColor: '#ffffff' },
  { id: 'dark-luxury', name: 'Negro Obsidian', bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', textColor: '#f8fafc' },
  { id: 'neon-emerald', name: 'Aurora Esmeralda', bg: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)', textColor: '#ffffff' },
  { id: 'rose-gold', name: 'Rosa Pastel Aesthetic', bg: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 50%, #db2777 100%)', textColor: '#ffffff' },
  { id: 'ocean-blue', name: 'Océano Cósmico', bg: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)', textColor: '#ffffff' },
  { id: 'golden-amber', name: 'Dorado Luxury', bg: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #fbbf24 100%)', textColor: '#ffffff' },
  { id: 'lavender-dream', name: 'Lavanda Dream', bg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #c084fc 100%)', textColor: '#ffffff' },
  { id: 'clean-light', name: 'Minimalista Blanco', bg: '#ffffff', textColor: '#0f172a', border: '1px solid #e2e8f0' },
];

export const PosterGeneratorModal: React.FC<PosterGeneratorModalProps> = ({
  initialText = '𝓥𝓲𝓿𝓮, 𝓼𝓾𝓮ñ𝓪, 𝓿𝓲𝓪𝓳𝓪 ✨',
  initialFontName = 'Cursiva Elegante',
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState(initialText);
  const [subtitle, setSubtitle] = useState('@tu_usuario');
  const [selectedBg, setSelectedBg] = useState(BACKGROUND_GRADIENTS[0]);
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story'>('square');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const renderCanvasAndExport = (mode: 'download' | 'copy') => {
    const canvas = canvasRef.current || document.createElement('canvas');
    const width = aspectRatio === 'story' ? 1080 : 1080;
    const height = aspectRatio === 'story' ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    if (selectedBg.bg.startsWith('linear-gradient')) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      if (selectedBg.id === 'sunset') {
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(0.5, '#a855f7');
        gradient.addColorStop(1, '#ec4899');
      } else if (selectedBg.id === 'dark-luxury') {
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e1b4b');
      } else if (selectedBg.id === 'neon-emerald') {
        gradient.addColorStop(0, '#064e3b');
        gradient.addColorStop(0.5, '#059669');
        gradient.addColorStop(1, '#10b981');
      } else if (selectedBg.id === 'rose-gold') {
        gradient.addColorStop(0, '#fbcfe8');
        gradient.addColorStop(0.5, '#f472b6');
        gradient.addColorStop(1, '#db2777');
      } else if (selectedBg.id === 'ocean-blue') {
        gradient.addColorStop(0, '#0284c7');
        gradient.addColorStop(0.5, '#2563eb');
        gradient.addColorStop(1, '#4f46e5');
      } else if (selectedBg.id === 'golden-amber') {
        gradient.addColorStop(0, '#78350f');
        gradient.addColorStop(0.5, '#d97706');
        gradient.addColorStop(1, '#fbbf24');
      } else if (selectedBg.id === 'lavender-dream') {
        gradient.addColorStop(0, '#4c1d95');
        gradient.addColorStop(0.5, '#7c3aed');
        gradient.addColorStop(1, '#c084fc');
      }
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = selectedBg.bg;
    }
    ctx.fillRect(0, 0, width, height);

    // Decorative frame
    ctx.strokeStyle = selectedBg.textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    // Watermark tag top
    ctx.fillStyle = selectedBg.textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ CONVERSOR DE LETRAS BONITAS ✦', width / 2, 140);

    // Main typography
    ctx.fillStyle = selectedBg.textColor;
    ctx.font = 'bold 64px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Wrap main text
    const words = text.split(' ');
    let line = '';
    const lines: string[] = [];
    const maxWidth = width - 200;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const lineHeight = 90;
    const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((l, i) => {
      ctx.fillText(l.trim(), width / 2, startY + i * lineHeight);
    });

    // Subtitle / User handle
    if (subtitle) {
      ctx.fillStyle = selectedBg.textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.7)';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(subtitle, width / 2, height - 140);
    }

    if (mode === 'download') {
      const link = document.createElement('a');
      link.download = `letras-bonitas-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      canvas.toBlob((blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopiedStatus(true);
          setTimeout(() => setCopiedStatus(null as any), 2000);
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-400" />
            <h3 className="font-extrabold text-base sm:text-lg">
              Generador de Tarjetas de Imagen en HD (PNG)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Live Preview Stage */}
          <div className="flex justify-center bg-slate-100 p-4 rounded-xl border border-slate-200">
            <div
              style={{
                background: selectedBg.bg,
                color: selectedBg.textColor,
                border: (selectedBg as any).border || 'none',
              }}
              className={`rounded-xl shadow-lg p-6 flex flex-col justify-between items-center text-center transition-all duration-300 ${
                aspectRatio === 'story' ? 'w-56 h-80' : 'w-64 h-64'
              }`}
            >
              <span className="text-[10px] font-bold opacity-75 uppercase tracking-widest">
                ✦ Letras Bonitas ✦
              </span>

              <p className="text-base sm:text-lg font-black my-auto leading-snug break-words px-2">
                {text || 'Escribe tu texto...'}
              </p>

              <span className="text-xs font-bold opacity-85">
                {subtitle || '@usuario'}
              </span>
            </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Texto en la Imagen
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe la frase..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Firma / Usuario (Opcional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="@tu_nombre"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Formato de Red Social
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAspectRatio('square')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                      aspectRatio === 'square'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    1:1 Cuadrado (Post)
                  </button>
                  <button
                    onClick={() => setAspectRatio('story')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                      aspectRatio === 'story'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    9:16 Historia / Estado
                  </button>
                </div>
              </div>
            </div>

            {/* Gradient Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Fondo y Estilo de Color
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BACKGROUND_GRADIENTS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBg(bg)}
                    className={`h-10 rounded-lg border-2 transition-all flex items-center justify-center ${
                      selectedBg.id === bg.id
                        ? 'border-indigo-600 scale-105 shadow-sm'
                        : 'border-transparent opacity-85 hover:opacity-100'
                    }`}
                    style={{ background: bg.bg }}
                    title={bg.name}
                  >
                    {selectedBg.id === bg.id && (
                      <Check
                        className={`w-4 h-4 ${
                          bg.textColor === '#ffffff' ? 'text-white' : 'text-slate-900'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => renderCanvasAndExport('copy')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
          >
            {copiedStatus ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedStatus ? '¡Imagen Copiada!' : 'Copiar Imagen al Portapapeles'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => renderCanvasAndExport('download')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar PNG HD Gratis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
