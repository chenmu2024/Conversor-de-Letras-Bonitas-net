import React, { useState } from 'react';
import { Sparkles, Copy, Check, Quote, RefreshCw, MessageCircle } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface CaptionIdea {
  id: string;
  category: string;
  emoji: string;
  text: string;
}

const INSTAGRAM_CAPTIONS: CaptionIdea[] = [
  // Aesthetic & Chill
  { id: 'c1', category: 'Aesthetic & Chill', emoji: '✨', text: 'Coleccionando momentos que no se pueden comprar ☕🌿' },
  { id: 'c2', category: 'Aesthetic & Chill', emoji: '☁️', text: 'Menos perfección, más autenticidad y paz mental 🌸' },
  { id: 'c3', category: 'Aesthetic & Chill', emoji: '🫧', text: 'Fluyendo con la vida y encontrando magia en lo simple ✨' },
  { id: 'c4', category: 'Aesthetic & Chill', emoji: '☕', text: 'Días de café, buena música y calma interior 🥐' },

  // Motivación & Éxito
  { id: 'c5', category: 'Motivación & Éxito', emoji: '⚡', text: 'Trabaja en silencio y deja que tu éxito haga todo el ruido 💼' },
  { id: 'c6', category: 'Motivación & Éxito', emoji: '🚀', text: 'Un paso a la vez, pero siempre hacia adelante ✨' },
  { id: 'c7', category: 'Motivación & Éxito', emoji: '📈', text: 'El secreto no es la suerte, es la constancia diaria 🔥' },

  // Amor & Self-love
  { id: 'c8', category: 'Amor & Self-love', emoji: '💖', text: 'El amor propio es el mejor romance que puedes cultivar 🌷' },
  { id: 'c9', category: 'Amor & Self-love', emoji: '💌', text: 'Donde no puedas amar, no te demores ✨' },
  { id: 'c10', category: 'Amor & Self-love', emoji: '🎀', text: 'Floreciendo a mi propio ritmo 🌸' },

  // Viajes & Aventura
  { id: 'c11', category: 'Viajes & Aventura', emoji: '✈️', text: 'Viajar es lo único que compras y te hace más rico 🗺️' },
  { id: 'c12', category: 'Viajes & Aventura', emoji: '📍', text: 'Perderme para encontrarme en lugares mágicos 🌊' },
  { id: 'c13', category: 'Viajes & Aventura', emoji: '🌅', text: 'Atardeceres que recargan el alma 🏝️' },

  // Llamados a la acción (CTAs) para aumentar comentarios y guardados
  { id: 'c14', category: 'Llamados a la Acción (CTAs)', emoji: '💬', text: '¿Estás de acuerdo? Cuéntame tu opinión en los comentarios 👇' },
  { id: 'c15', category: 'Llamados a la Acción (CTAs)', emoji: '📌', text: 'Guarda este post para revisarlo siempre que lo necesites 💾' },
  { id: 'c16', category: 'Llamados a la Acción (CTAs)', emoji: '🚀', text: 'Comparte con esa persona que necesita leer esto hoy ✨' },
  { id: 'c17', category: 'Llamados a la Acción (CTAs)', emoji: '📩', text: 'Comenta "GUÍA" y te envío el recurso completo por privado 💌' },
];

export const InstagramCaptionIdeas: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState('italic-bold-serif');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    'all',
    'Aesthetic & Chill',
    'Motivación & Éxito',
    'Amor & Self-love',
    'Viajes & Aventura',
    'Llamados a la Acción (CTAs)',
  ];

  const filteredCaptions = filterCategory === 'all' 
    ? INSTAGRAM_CAPTIONS 
    : INSTAGRAM_CAPTIONS.filter(c => c.category === filterCategory);

  const formatText = (str: string) => {
    const gen = FONT_GENERATORS.find(g => g.id === selectedFont);
    return gen ? gen.transform(str) : str;
  };

  const handleCopy = async (str: string, id: string) => {
    const formatted = formatText(str);
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
            Frases & Pies de Foto Listos (Captions)
          </span>
          <h3 className="font-extrabold text-lg text-slate-900">
            Frases Aesthetic y Copys Virales para Posts, Reels & Stories
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Transforma cualquier frase con tipografías elegantes y cópiala lista para pegar en tus publicaciones.
          </p>
        </div>

        {/* Font Selector for Captions */}
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
            Tipografía:
          </label>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:bg-white"
          >
            {FONT_GENERATORS.slice(0, 12).map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-pink-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? '✨ Todas las Frases' : cat}
          </button>
        ))}
      </div>

      {/* Captions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredCaptions.map((item) => {
          const formatted = formatText(item.text);
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-pink-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                  <span>{item.category}</span>
                  <span>{item.emoji}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed font-sans">
                  {formatted}
                </p>
              </div>

              <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleCopy(item.text, item.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>¡Copiado! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Frase</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
