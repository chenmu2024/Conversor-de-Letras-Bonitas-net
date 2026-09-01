import React, { useState } from 'react';
import { Layers, Copy, Check, Sparkles, MessageCircle, Hash, HelpCircle, ArrowRight } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const CAPTION_PRESETS = [
  {
    label: '✨ Storytime / Chisme',
    text: 'Parte 1 | No van a creer lo que me pasó hoy... 😱👀\n\n¿Quieren que les cuente la segunda parte? Déjamelo saber en los comentarios 👇\n\n#storytime #chisme #viral #parati #fyp #anecdotas',
  },
  {
    label: '🌸 GRWM / Outfits',
    text: 'Acompáñame a arreglarme para una cena especial ✨🎀\n\nTodo el outfit es de segunda mano y joyería artesanal 💍\n\n¿Cuál fue tu prenda favorita? Los leo 🌷\n\n#grwm #outfitinspo #fashiontiktok #aesthetic #coquette #ootd',
  },
  {
    label: '💡 Tutorial / Hacks',
    text: 'El truco definitivo que ojalá hubiera aprendido antes 🚀📌\n\nGuarda este video para no perderlo y compártelo con tu mejor amigo/a ✨\n\n¿Ya lo conocías? 👇\n\n#trucostiktok #lifehacks #tutorial #aprendeentiktok #tips',
  },
  {
    label: '☕ Mini Vlog / Daily',
    text: 'Un día productivo conmigo en Madrid ☕🌿\n\nCafé matutino, trabajo remoto y paseo al atardecer 🌅\n\nQue tengan una semana increíble ✨\n\n#minivlog #dailyvlog #rutina #aesthetic #lifestyle #vlog',
  },
  {
    label: '🎮 Gaming / Clips',
    text: 'La jugada más insana de la partida 🔥🎯\n\n¿Quién se anima a un 1vs1? Deja tu ID en los comentarios ⚔️\n\n#freefire #gamer #clips #gaming #highlight #pvp #insano',
  },
];

export const TikTokCaptionStudio: React.FC = () => {
  const [caption, setCaption] = useState(
    'POV: Descubres el truco para que tus videos de TikTok se vean 100x más aesthetic ✨\n\nGuarda este video para tu próxima publicación 📌\n\n¿Qué tipo de contenido te gustaría ver en el próximo video? Déjamelo en los comentarios 👇\n\n#parati #fyp #aesthetic #creadores #viral'
  );
  const [copied, setCopied] = useState(false);
  const [selectedFont, setSelectedFont] = useState('sans-bold');

  const maxChars = 2200; // TikTok Caption Limit
  const charLength = caption.length;
  const isOver = charLength > maxChars;

  // Handle protected copy with invisible spaces for clean paragraph breaks
  const handleCopyFormatted = async () => {
    const clean = caption
      .split('\n')
      .map((line) => (line.trim() === '' ? `${INVISIBLE_SPACE}` : line))
      .join('\n');

    try {
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const insertQuickText = (snippet: string) => {
    setCaption((prev) => `${prev}\n\n${snippet}`.trim());
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
          Pies de Video & Descripciones con Saltos de Línea
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-pink-600" />
          <span>Editor de Descripciones y Captions para TikTok (Sin Saltos Rotos)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          TikTok tiende a juntar todos los párrafos de tu descripción en un bloque compacto. Este formateador conserva los saltos de línea y cuenta tus caracteres hasta el límite de 2,200 letras.
        </p>
      </div>

      {/* Quick Presets */}
      <div>
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
          Plantillas Rápidas para Descripciones de TikTok:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {CAPTION_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setCaption(preset.text)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-pink-700 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95 shadow-2xs"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Texto de tu Descripción:
          </label>
          <span className={`text-xs font-mono font-bold ${
            isOver ? 'text-rose-600 font-black' : 'text-slate-500'
          }`}>
            {charLength} / {maxChars} caracteres
          </span>
        </div>

        <textarea
          rows={6}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Escribe la descripción de tu video con párrafos..."
          className={`w-full p-4 rounded-2xl text-xs sm:text-sm font-medium border leading-relaxed transition-all resize-none ${
            isOver
              ? 'bg-rose-50 border-rose-300 text-rose-900 focus:ring-rose-500'
              : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500'
          }`}
        />
      </div>

      {/* Quick CTAs and Snippets Bar */}
      <div className="pt-2">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
          Preguntas de Cierre (CTAs) para Disparar Comentarios y Guardados:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {[
            '¿Qué opinas tú? Déjamelo en los comentarios 👇',
            'Guarda este video para verlo cuando lo necesites 💾📌',
            'Comparte este TikTok con alguien que necesite verlo ✨',
            'Comenta "PARTE 2" para subir el desenlace 🍿👀',
            'Comenta tu país con una bandera 🌎👇',
            '¿Del 1 al 10 cuánto le das a este resultado? ✨',
          ].map((cta, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => insertQuickText(cta)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-700 border border-slate-200 text-xs font-medium text-left truncate transition-all shadow-2xs"
            >
              + {cta}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleCopyFormatted}
          className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-pink-500/25'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>¡Descripción Copiada con Saltos de Línea Protegidos! ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Descripción Formateada para TikTok</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
