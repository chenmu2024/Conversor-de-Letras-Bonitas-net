import React, { useState, useMemo } from 'react';
import { PageRoute } from '../types';
import { FONT_COUNT_PLUS } from '../constants/siteStats';
import { 
  Hash, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Instagram, 
  MessageCircle, 
  Flame, 
  AlertCircle,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface PlatformLimit {
  name: string;
  limit: number;
  icon: React.ReactNode;
  color: string;
  field: string;
}

const PLATFORM_LIMITS: PlatformLimit[] = [
  { name: 'Instagram Bio', limit: 150, icon: <Instagram className="w-4 h-4 text-pink-500" />, color: 'pink', field: 'Biografía' },
  { name: 'Instagram Nombre', limit: 30, icon: <Instagram className="w-4 h-4 text-pink-500" />, color: 'pink', field: 'Nombre en Perfil' },
  { name: 'TikTok Bio', limit: 80, icon: <span className="font-bold text-xs">TT</span>, color: 'slate', field: 'Descripción Perfil' },
  { name: 'Twitter / X', limit: 280, icon: <span className="font-bold text-xs text-blue-500">𝕏</span>, color: 'blue', field: 'Post / Tweet' },
  { name: 'WhatsApp Info', limit: 139, icon: <MessageCircle className="w-4 h-4 text-emerald-500" />, color: 'emerald', field: 'Información / Estado' },
  { name: 'Free Fire Nick', limit: 12, icon: <Flame className="w-4 h-4 text-amber-500" />, color: 'amber', field: 'Nickname Jugador' },
  { name: 'Discord Sobre Mí', limit: 190, icon: <span className="font-bold text-xs text-indigo-500">🎮</span>, color: 'indigo', field: 'Perfil' },
];

interface BioCharacterCounterProps {
  onApplyText?: (text: string) => void;
  onRouteChange?: (route: PageRoute) => void;
  initialText?: string;
}

export const BioCharacterCounter: React.FC<BioCharacterCounterProps> = ({
  onApplyText,
  onRouteChange,
  initialText = '✨ Creador de contenido & Diseñador 🎨\n📍 Madrid | Contacto por DM 📩',
}) => {
  const [text, setText] = useState(initialText);
  const [copied, setCopied] = useState(false);

  // Statistics calculation
  const stats = useMemo(() => {
    const rawLength = text.length;
    // Count real unicode glyphs / code points (handles surrogate pairs like emojis correctly)
    const codePoints = Array.from(text).length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const spaces = (text.match(/\s/g) || []).length;
    const noSpaces = text.replace(/\s/g, '').length;

    return {
      rawLength,
      codePoints,
      words,
      lines,
      spaces,
      noSpaces,
    };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black shadow-xs">
          <Hash className="w-4 h-4" />
          <span>Herramienta de Precisión para Biografías & Nicks</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contador de Caracteres para Redes Sociales
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Escribe o pega tu texto y visualiza en tiempo real una referencia de los límites habituales para Instagram, TikTok, WhatsApp, X y Free Fire.
        </p>
      </div>

      {/* Main Text Editor Area */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
        {/* Editor Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Editor de Biografía y Texto
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Texto</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe o pega aquí el texto de tu biografía, estado o apodo..."
          className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 outline-hidden transition-all resize-y font-sans leading-relaxed"
        ></textarea>

        {/* Numeric Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="font-heading font-black text-xl text-indigo-600">{stats.codePoints}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Caracteres</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="font-heading font-black text-xl text-slate-800">{stats.words}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Palabras</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="font-heading font-black text-xl text-slate-800">{stats.noSpaces}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Sin Espacios</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="font-heading font-black text-xl text-slate-800">{stats.lines}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Líneas</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="font-heading font-black text-xl text-slate-800">{stats.spaces}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Espacios</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="font-heading font-black text-xl text-purple-600">{stats.rawLength}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Unidades UTF-16</div>
          </div>
        </div>
      </div>

      {/* Social Media Limits Progress Grid */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="font-heading text-lg font-bold text-slate-900">
              Compatibilidad con Límites de Plataformas
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Los límites mostrados son referencias habituales y pueden cambiar según las actualizaciones de cada plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLATFORM_LIMITS.map((platform) => {
            const used = stats.codePoints;
            const remaining = platform.limit - used;
            const percentage = Math.min(100, Math.round((used / platform.limit) * 100));
            const isExceeded = used > platform.limit;

            return (
              <div
                key={platform.name}
                className={`p-4 rounded-2xl border transition-all ${
                  isExceeded
                    ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                      {platform.icon}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{platform.name}</div>
                      <div className="text-[10px] text-slate-500">{platform.field}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-black ${isExceeded ? 'text-rose-600' : 'text-slate-700'}`}>
                      {used} / {platform.limit}
                    </span>
                    <div className="text-[10px] font-bold">
                      {isExceeded ? (
                        <span className="text-rose-600 flex items-center gap-0.5 justify-end">
                          <AlertCircle className="w-3 h-3" /> Excede por {Math.abs(remaining)}
                        </span>
                      ) : (
                        <span className="text-emerald-600 flex items-center gap-0.5 justify-end">
                          <CheckCircle2 className="w-3 h-3" /> Quedan {remaining}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isExceeded
                        ? 'bg-rose-500'
                        : percentage > 85
                        ? 'bg-amber-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Banner to stylize bio text */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl border border-indigo-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">¿Quieres estilizar tu texto para tu biografía?</h3>
          <p className="text-xs text-slate-600 mt-0.5">Aplica {FONT_COUNT_PLUS} fuentes Unicode bonitas, símbolos y espaciado invisible con 1 clic.</p>
        </div>
        <a
          href="/letras-para-instagram/"
          onClick={(e) => {
            if (onRouteChange) {
              e.preventDefault();
              if (onApplyText && text) onApplyText(text);
              onRouteChange('instagram');
            }
          }}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all inline-block"
        >
          Ver Fuentes para Biografía →
        </a>
      </div>
    </div>
  );
};
