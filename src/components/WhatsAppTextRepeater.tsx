import React, { useState } from 'react';
import { Repeat, Copy, Check, Sparkles, Flame, Heart, Smile } from 'lucide-react';

const REPEATER_PRESETS = [
  { label: '🎉 Cumpleaños', text: '¡Feliz Cumpleaños! 🎂🥳✨', count: 10, sep: '\n' },
  { label: '❤️ Te Amo', text: 'Te amo muchísimo ❤️✨', count: 20, sep: '\n' },
  { label: '⚽ Gol', text: '¡¡¡GOOOOOOL!!! ⚽🔥', count: 15, sep: ' ' },
  { label: '🚨 Urgente', text: '¡Responde rápido por favor! 📱👀', count: 5, sep: '\n' },
  { label: '👏 Aplausos', text: '👏👏👏', count: 30, sep: ' ' },
];

export const WhatsAppTextRepeater: React.FC = () => {
  const [baseText, setBaseText] = useState('¡Feliz Cumpleaños! 🎂🥳');
  const [count, setCount] = useState<number>(10);
  const [separator, setSeparator] = useState<string>('\n');
  const [copied, setCopied] = useState(false);

  // Generate repeated text
  const safeCount = Math.min(Math.max(1, count || 1), 200);
  const repeatedText = Array(safeCount).fill(baseText).join(separator);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(repeatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Bomba de Texto & Repetidor
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Divertido para Chats y Felicitaciones
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <Repeat className="w-5 h-5 text-emerald-600" />
          <span>Repetidor y Multiplicador de Texto para WhatsApp</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Multiplica cualquier frase o felicitación hasta 200 veces con saltos de línea o espacios para enviar mensajes divertidos en tus grupos de WhatsApp.
        </p>
      </div>

      {/* Quick Presets */}
      <div>
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
          Plantillas Rápidas:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {REPEATER_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setBaseText(p.text);
                setCount(p.count);
                setSeparator(p.sep);
              }}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold transition-all border border-slate-200 active:scale-95 shadow-2xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6">
          <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
            Texto a Repetir:
          </label>
          <input
            type="text"
            value={baseText}
            onChange={(e) => setBaseText(e.target.value)}
            placeholder="Escribe tu frase o emoji..."
            className="w-full px-3.5 py-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
            Veces a Repetir ({safeCount}x):
          </label>
          <div className="flex items-center gap-1">
            {[5, 10, 20, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCount(num)}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  count === num
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {num}x
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
            Separador:
          </label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white"
          >
            <option value={'\n'}>Salto de línea (Enter)</option>
            <option value=" ">Espacio simple</option>
            <option value=", ">Coma y espacio (, )</option>
            <option value=" · ">Punto medio ( · )</option>
          </select>
        </div>
      </div>

      {/* Result Box */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Resultado Listo para Enviar ({repeatedText.length} caracteres):
          </label>
        </div>
        <textarea
          rows={5}
          readOnly
          value={repeatedText}
          className="w-full p-4 rounded-2xl text-xs font-mono bg-slate-50 border border-slate-200 text-slate-900 leading-relaxed resize-none select-all"
        />
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleCopy}
        className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
          copied
            ? 'bg-emerald-600 text-white shadow-emerald-600/20'
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/25'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>¡Texto Repetido Copiado al Portapapeles! ✓</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copiar Todo el Texto Repetido</span>
          </>
        )}
      </button>
    </div>
  );
};
