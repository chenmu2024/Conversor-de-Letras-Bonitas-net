import React, { useState } from 'react';
import { Quote, Copy, Check, Sparkles, Heart, Smile, Flame } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const STATUS_CATEGORIES = [
  {
    category: '✨ Reflexión & Motivación',
    icon: '🌟',
    quotes: [
      'Un día a la vez, disfrutando el camino. ✨',
      'Cree en ti y todo será posible. 🚀',
      'La paz mental es la verdadera riqueza. 🌿',
      'Hazlo con pasión o no lo hagas. 🔥',
    ],
  },
  {
    category: '💖 Amor & Sentimientos',
    icon: '💕',
    quotes: [
      'Donde hay amor, sobra todo lo demás. ❤️',
      'Tu sonrisa es mi lugar favorito. 🌸',
      'Juntos es mi palabra favorita. 👩‍❤️‍👨',
      'Amar es cuidar en los detalles. ✨',
    ],
  },
  {
    category: '😌 Indirectas & Humor',
    icon: '☕',
    quotes: [
      'En silencio se vive más tranquilo. ☕',
      'Menos explicaciones, más acciones. 🤐',
      'Ocupado construyendo mi versión favorita. 💼',
      'No respondo mensajes rápidos, respondo bien. 📱',
    ],
  },
  {
    category: '✈️ Viajes & Libertad',
    icon: '🌍',
    quotes: [
      'Coleccionando momentos, no cosas. ✈️',
      'Cualquier lugar es especial con buena compañía. 🗺️',
      'Libre como el viento, sereno como el mar. 🌊',
      'Modo avión activado para la mente. 🎧',
    ],
  },
];

export const WhatsAppStatusQuotes: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState('italic-serif');
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const generator = FONT_GENERATORS.find((g) => g.id === selectedFont) || FONT_GENERATORS[0];

  const handleCopy = (txt: string) => {
    const transformed = generator.transform(txt);
    navigator.clipboard.writeText(transformed);
    setCopiedQuote(txt);
    setTimeout(() => setCopiedQuote(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block mb-1">
          Frases e Ideas para Estados de WhatsApp
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Quote className="w-5 h-5 text-emerald-600" />
          <span>Frases Elegantes Formateadas para tu Estado / Info</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Elige el estilo de letra y copia directamente frases inspiradoras compatibles con la app de WhatsApp.
        </p>
      </div>

      {/* Font Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100 pb-3">
        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Estilo de Letra:
        </span>
        {[
          { id: 'italic-serif', label: 'Cursiva Elegante' },
          { id: 'small-caps', label: 'Small Caps' },
          { id: 'sans-bold', label: 'Negrita Sans' },
          { id: 'monospace', label: 'Máquina Vintage' },
          { id: 'circles-filled', label: 'Círculos' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedFont(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedFont === f.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="space-y-6">
        {STATUS_CATEGORIES.map((cat) => (
          <div key={cat.category} className="space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>{cat.icon}</span>
              <span>{cat.category}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.quotes.map((q, i) => {
                const transformed = generator.transform(q);
                const isCopied = copiedQuote === q;

                return (
                  <div
                    key={i}
                    onClick={() => handleCopy(q)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      isCopied
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900 leading-snug my-1">
                      {transformed}
                    </div>

                    <div className="mt-2 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-extrabold ${
                          isCopied ? 'text-emerald-700' : 'text-emerald-600 group-hover:underline'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Copiado para Estado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Frase Formateada</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
