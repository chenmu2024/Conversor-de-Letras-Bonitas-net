import React, { useState } from 'react';
import { Type, Copy, Check, Video, Sparkles } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

export const TikTokVideoText: React.FC = () => {
  const [inputText, setInputText] = useState('POV: Cuando abres el paquete 📦✨');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const TIKTOK_TEXT_STYLES = [
    {
      title: 'Small Caps Aesthetic (Muy Popular en CapCut)',
      fontId: 'small-caps',
      bgClass: 'bg-zinc-950 text-amber-300 border border-amber-500/30',
      badge: 'CAPCUT TREND'
    },
    {
      title: 'Negrita Sans Impact (Para Hooks y Textos Principales)',
      fontId: 'sans-bold',
      bgClass: 'bg-black text-white border-2 border-white',
      badge: 'POPULAR'
    },
    {
      title: 'Máquina de Escribir Monospace (Aesthetic Vlog)',
      fontId: 'monospace',
      bgClass: 'bg-amber-100 text-slate-900 font-mono border border-amber-300',
      badge: 'VLOG'
    },
    {
      title: 'Cursiva Cursiva Bonita (Stories / Soft Edits)',
      fontId: 'italic-serif',
      bgClass: 'bg-gradient-to-r from-purple-900 to-pink-900 text-pink-100 border border-pink-400/30',
      badge: 'SOFT'
    },
    {
      title: 'Texto entre Círculos (Titulares Llamativos)',
      fontId: 'circles-filled',
      bgClass: 'bg-slate-900 text-emerald-300 border border-emerald-500/30',
      badge: 'DESTACADO'
    },
    {
      title: 'Gótico Cyber (Trends Oscuros / Edits Gamer)',
      fontId: 'gothic-bold',
      bgClass: 'bg-red-950 text-rose-200 border border-rose-500/40',
      badge: 'EDGY'
    }
  ];

  const handleCopy = (txt: string, index: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
          Video Overlay & CapCut Text Styler
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Video className="w-5 h-5 text-pink-600" />
          <span>Convertidor de Letras para Pantalla de Video & CapCut</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Escribe el texto de tu video para aplicarle tipografías virales de TikTok y pegarlo directamente en tu editor.
        </p>
      </div>

      {/* Input Field */}
      <div className="max-w-xl">
        <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
          Texto para la pantalla de tu video:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu frase de video..."
          className="w-full px-4 py-2.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
        />
      </div>

      {/* Grid of Overlay Text Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TIKTOK_TEXT_STYLES.map((st, i) => {
          const gen = FONT_GENERATORS.find((g) => g.id === st.fontId) || FONT_GENERATORS[0];
          const transformed = gen.transform(inputText || 'Escribe tu texto');
          const isCopied = copiedIndex === i;

          return (
            <div
              key={i}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4 hover:border-pink-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase">
                    {st.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[9px] font-black">
                    {st.badge}
                  </span>
                </div>

                {/* Video Screen Overlay Mockup Card */}
                <div className={`p-4 rounded-xl text-center text-sm font-black leading-snug break-words my-2 shadow-sm ${st.bgClass}`}>
                  {transformed}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(transformed, i)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-black text-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado para Video!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Estilo de Video</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
