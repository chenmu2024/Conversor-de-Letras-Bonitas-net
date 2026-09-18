import React, { useState } from 'react';
import { Sparkles, Ghost, Copy, Check, EyeOff, Shield, Smartphone, MessageSquare, Gamepad2, Info } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

interface InvisibleSpaceStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

export const InvisibleSpaceStudio: React.FC<InvisibleSpaceStudioProps> = ({
  onApplyText,
  initialText = 'MiNick',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [customWord, setCustomWord] = useState(initialText);

  // Different Unicode Invisible and Zero-Width characters
  const HANGUL_FILLER = '\u3164'; // U+3164 (Free Fire standard)
  const ZERO_WIDTH_SPACE = '\u200B'; // U+200B
  const ZERO_WIDTH_JOINER = '\u200D'; // U+200D
  const BRAILLE_BLANK = '⠀'; // U+2800

  const handleCopy = async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label || text);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(25);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const generatedSpaces = [
    {
      title: 'Espacio Invisible Simple (U+3164)',
      code: HANGUL_FILLER,
      desc: 'El más usado para Free Fire & WhatsApp',
      tag: '⭐ Alta Compatibilidad',
    },
    {
      title: 'Espacio Invisible Doble (2x)',
      code: `${HANGUL_FILLER}${HANGUL_FILLER}`,
      desc: 'Separación amplia para tags de clan',
      tag: 'Gamer Clan',
    },
    {
      title: 'Espacio Invisible Quíntuple (5x)',
      code: `${HANGUL_FILLER}${HANGUL_FILLER}${HANGUL_FILLER}${HANGUL_FILLER}${HANGUL_FILLER}`,
      desc: 'Para biografías y saltos invisibles',
      tag: 'Instagram Bio',
    },
    {
      title: 'Espacio Braille Vacío (U+2800)',
      code: BRAILLE_BLANK,
      desc: 'Ideal para Discord, Twitter y TikTok',
      tag: 'Social Media',
    },
    {
      title: 'Zero-Width Space (U+200B)',
      code: ZERO_WIDTH_SPACE,
      desc: 'Espacio de ancho cero para saltar filtros',
      tag: 'Anti-Filter',
    },
  ];

  const separatedNick = `${customWord}${HANGUL_FILLER}${HANGUL_FILLER}亗`;

  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 rounded-2xl border border-indigo-500/30 p-6 sm:p-8 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Ghost className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                👻 Carácter Hangul Filler U+3164
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Espacio Invisible y Letra Invisible [ㅤ] (Copiar y Pegar 1 Clic)
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(HANGUL_FILLER, 'simple')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition-all active:scale-95 shadow-lg shadow-indigo-500/25"
        >
          {copiedItem === 'simple' ? (
            <>
              <Check className="w-4 h-4 text-slate-950" />
              <span>¡Espacio Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Espacio Invisible [ㅤ]</span>
            </>
          )}
        </button>
      </div>

      {/* Main Copy Box */}
      <div className="bg-slate-950/90 rounded-xl border border-indigo-900/60 p-5 sm:p-6 mb-6 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-indigo-300 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-indigo-400" />
            <span>Zona de Prueba & Copiado Rápido de Caracteres Invisibles:</span>
          </h3>
          <span className="text-[11px] text-slate-400">
            Haz clic en el botón para copiar el espacio seleccionado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {generatedSpaces.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/50 transition-all"
            >
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-white">{item.title}</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.code, item.title)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-500 hover:text-slate-950 text-indigo-200 border border-indigo-500/30 font-bold text-xs transition-all active:scale-95"
              >
                {copiedItem === item.title ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>¡Copiado con Éxito!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Carácter</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Separator Simulator */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <label className="block text-xs font-bold text-slate-300 mb-2">
            Separador Automático para Nicks con Espacio Invisible:
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              placeholder="Tu nick de Free Fire..."
              maxLength={15}
              className="flex-1 min-w-[200px] px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => handleCopy(separatedNick, 'custom-sep')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-indigo-600/30"
            >
              {copiedItem === 'custom-sep' ? '¡Nick Copiado!' : 'Copiar Nick con Espacio [ ' + separatedNick + ' ]'}
            </button>
          </div>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex gap-3">
          <Gamepad2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-1">Para Free Fire</h4>
            <p className="text-slate-400 leading-relaxed">
              Pégalo en el campo de cambio de nombre para separar palabras o tener un nick completamente invisible.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex gap-3">
          <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-1">Para WhatsApp</h4>
            <p className="text-slate-400 leading-relaxed">
              Envía mensajes completamente en blanco a tus amigos o deja tu nombre e información de perfil invisible.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex gap-3">
          <Smartphone className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-1">Para Instagram & TikTok</h4>
            <p className="text-slate-400 leading-relaxed">
              Crea saltos de línea limpios en tu biografía sin puntos antiestéticos ni guiones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
