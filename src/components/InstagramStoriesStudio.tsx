import React, { useState } from 'react';
import { Sparkles, Copy, Check, Video, Type, Flame, Lightbulb, RefreshCw, Zap } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const VIRAL_HOOKS = [
  { id: 'h1', tag: 'Curiosidad', text: 'POV: Cuando por fin descubres el truco definitivo ✨' },
  { id: 'h2', tag: 'Alerta', text: '🛑 STOP SCROLLING: Tienes que ver esto antes de que termine el día' },
  { id: 'h3', tag: 'Secreto', text: 'Lo que nadie te cuenta sobre cómo crecer en redes 🤫' },
  { id: 'h4', tag: 'Valor', text: '3 Errores comunes que arruinan tu contenido (y cómo evitarlos) 📌' },
  { id: 'h5', tag: 'Llamado', text: 'Guarda este Reel antes de que se te olvide 💾' },
  { id: 'h6', tag: 'Viral', text: 'No puedo creer que esto realmente funcione tan bien 😱⚡' },
];

export const InstagramStoriesStudio: React.FC = () => {
  const [inputText, setInputText] = useState('NUEVO REEL EN EL PERFIL ✨');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedHook, setCopiedHook] = useState<string | null>(null);

  const STYLES = [
    {
      title: 'Neon Glow Dark (Historias Relevantes)',
      fontId: 'sans-bold',
      containerClass: 'bg-zinc-950 text-emerald-400 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      tag: 'NEON'
    },
    {
      title: 'Box Negro Semitransparente (Clásico Stories)',
      fontId: 'sans-bold',
      containerClass: 'bg-black/90 text-white border border-zinc-800 shadow-xl',
      tag: 'MINIMAL'
    },
    {
      title: 'Typewriter Vintage (Estilo Máquina de Escribir)',
      fontId: 'monospace',
      containerClass: 'bg-amber-100 text-amber-950 border border-amber-300 font-mono shadow-md',
      tag: 'VINTAGE'
    },
    {
      title: 'Cursiva Elegante (Estilo Luxury & Moda)',
      fontId: 'italic-bold-serif',
      containerClass: 'bg-gradient-to-tr from-purple-900 to-pink-900 text-pink-100 border border-pink-500/30 shadow-lg',
      tag: 'LUXURY'
    },
    {
      title: 'Small Caps Aesthetic (Portada de Highlight / Reel)',
      fontId: 'small-caps',
      containerClass: 'bg-slate-900 text-cyan-300 border border-cyan-500/40 shadow-lg',
      tag: 'AESTHETIC'
    },
    {
      title: 'Texto Encerrado en Círculos (Titulares)',
      fontId: 'circles-filled',
      containerClass: 'bg-rose-950 text-rose-200 border border-rose-500/40 shadow-lg',
      tag: 'CREATIVO'
    },
    {
      title: 'Lavender Dream (Pastel Aesthetic)',
      fontId: 'cursiva-bold',
      containerClass: 'bg-purple-100 text-purple-950 border border-purple-300 shadow-md',
      tag: 'COQUETTE'
    },
    {
      title: 'Cyber Sunset (Gradiente Intenso)',
      fontId: 'bold-sans',
      containerClass: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white shadow-lg',
      tag: 'TRENDING'
    }
  ];

  const handleCopy = (txt: string, index: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const handleCopyHook = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedHook(id);
    setTimeout(() => setCopiedHook(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
          Stories & Reels Text Style Studio
        </span>
        <h3 className="font-extrabold text-lg text-slate-900">
          Diseñador de Títulos y Pegatinas para Historias y Reels
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Escribe tu frase para previsualizar y copiar tipografías optimizadas para las pegatinas e historias de Instagram.
        </p>
      </div>

      {/* Input */}
      <div className="max-w-xl">
        <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
          Escribe tu frase para Stories / Reels:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ej: NUEVO POST DISPONIBLE, Q&A TIME..."
          className="w-full px-4 py-2.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
        />
      </div>

      {/* Live Card Style Grid */}
      <div>
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
          Estilos de Stickers y Títulos Disponibles:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STYLES.map((st, i) => {
            const gen = FONT_GENERATORS.find((g) => g.id === st.fontId) || FONT_GENERATORS[0];
            const transformed = gen.transform(inputText || 'TU TEXTO AQUÍ');
            const isCopied = copiedIndex === i;

            return (
              <div
                key={i}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3 hover:border-pink-300 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase truncate max-w-[140px]">
                      {st.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-[9px] font-black text-slate-700">
                      {st.tag}
                    </span>
                  </div>

                  {/* Sticker Mockup Card */}
                  <div className={`p-4 rounded-xl text-center text-xs font-extrabold leading-snug break-words my-1 ${st.containerClass}`}>
                    {transformed}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(transformed, i)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-black text-white'
                  }`}
                >
                  {isCopied ? (
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
            );
          })}
        </div>
      </div>

      {/* Viral Hooks Section for Stories & Reels */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Ganchos Virales (Hooks) para Stories y Reels:
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {VIRAL_HOOKS.map((h) => {
            const isCopied = copiedHook === h.id;
            return (
              <div
                key={h.id}
                className="p-3.5 rounded-2xl bg-pink-50/40 border border-pink-100 flex flex-col justify-between gap-2.5"
              >
                <div>
                  <span className="text-[9px] font-black text-pink-700 uppercase px-2 py-0.5 rounded-md bg-pink-100 inline-block mb-1.5">
                    {h.tag}
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {h.text}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyHook(h.text, h.id)}
                  className={`w-full py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-pink-100 text-pink-700 border border-pink-200/80'
                  }`}
                >
                  {isCopied ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? '¡Gancho Copiado!' : 'Copiar Gancho'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
