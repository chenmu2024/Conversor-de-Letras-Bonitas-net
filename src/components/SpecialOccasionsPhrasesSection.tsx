import React, { useState } from 'react';
import { Gift, Heart, Sun, Sparkles, Copy, Check, Send, PartyPopper, Dumbbell } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface SpecialOccasionsPhrasesSectionProps {
  onApplyText?: (text: string) => void;
}

interface PhraseItem {
  id: string;
  category: 'Cumpleaños' | 'Amor & Pareja' | 'Buenos Días' | 'Motivación' | 'Festividades';
  title: string;
  text: string;
  fontStyleId: string;
}

const PHRASES_DATA: PhraseItem[] = [
  {
    id: 'bday-1',
    category: 'Cumpleaños',
    title: 'Feliz Cumpleaños Aesthetic',
    text: '🎂 𝐹𝑒𝓁𝒾𝓏 𝒞𝓊𝓂𝓅𝓁𝑒𝒶ñ𝑜𝓈 𝓂𝒾 𝓋𝒾𝒹𝒶! 𝒬𝓊𝑒 𝓉𝑜𝒹𝑜𝓈 𝓉𝓊𝓈 𝒹𝑒𝓈𝑒𝑜𝓈 𝓈𝑒 𝒽𝒶𝑔𝒶𝓃 𝓇𝑒𝒶𝓁𝒾𝒹𝒶𝒹 ✨',
    fontStyleId: 'cursive',
  },
  {
    id: 'bday-2',
    category: 'Cumpleaños',
    title: 'Cumpleaños Divertido con Destellos',
    text: '🎉 ¡𝓕𝓮𝓵𝓲𝔃 𝓿𝓾𝓮𝓵𝓽𝓪 𝓪𝓵 𝓼𝓸𝓵! ☀️ 𝓠𝓾𝓮 𝓷𝓾𝓷𝓬𝓪 𝓽𝓮 𝓯𝓪𝓵𝓽𝓮 𝓪𝓶𝓸𝓻, 𝓼𝓪𝓵𝓾𝓭 𝔂 𝓻𝓲𝓼𝓪𝓼 💖',
    fontStyleId: 'bold-script',
  },
  {
    id: 'love-1',
    category: 'Amor & Pareja',
    title: 'Declaración de Amor Infinito',
    text: '♡ 𝒯𝑒 𝒶𝓂𝑜 𝓂á𝓈 𝒹𝑒 𝓁𝑜 𝓆𝓊𝑒 𝓁𝒶𝓈 𝓅𝒶𝓁𝒶𝒷𝓇𝒶𝓈 𝓅𝓊𝑒𝒹𝑒𝓃 𝑒𝓍𝓅𝓁𝒾𝒸𝒶𝓇 ♡ ♾️',
    fontStyleId: 'cursive',
  },
  {
    id: 'love-2',
    category: 'Amor & Pareja',
    title: 'Mi Lugar Favorito en el Mundo',
    text: '✨ 𝓔𝓻𝓮𝓼 𝓶𝓲 𝓹𝓮𝓻𝓼𝓸𝓷𝓪 𝓯𝓪𝓿𝓸𝓻𝓲𝓽𝓪 𝓮𝓷 𝓽𝓸𝓭𝓸 𝓮𝓵 𝓾𝓷𝓲𝓿𝓮𝓻𝓼𝓸 🪐 𝓣𝓮 𝓪𝓶𝓸',
    fontStyleId: 'bold-script',
  },
  {
    id: 'morning-1',
    category: 'Buenos Días',
    title: 'Buenos Días con Buena Vibra',
    text: '☀️ ¡𝐵𝓊𝑒𝓃𝑜𝓈 𝒹í𝒶𝓈! 𝒬𝓊𝑒 𝒽𝑜𝓎 𝓈𝑒𝒶 𝓊𝓃 𝒹í𝒶 𝓁𝓁𝑒𝓃𝑜 𝒹𝑒 𝓅𝒶𝓏 𝓎 𝒷𝑒𝓃𝒹𝒾𝒸𝒾𝑜𝓃𝑒𝓈 🌸',
    fontStyleId: 'cursive',
  },
  {
    id: 'morning-2',
    category: 'Buenos Días',
    title: 'Café & Energía Positiva',
    text: '☕ 𝓠𝓾𝓮 𝓽𝓾 𝓭í𝓪 𝓼𝓮𝓪 𝓽𝓪𝓷 𝓵𝓲𝓷𝓭𝓸 𝓬𝓸𝓶𝓸 𝓽𝓾 𝓼𝓸𝓷𝓻𝓲𝓼𝓪 🌿 𝓑𝓾𝓮𝓷𝓸𝓼 𝓭í𝓪𝓼',
    fontStyleId: 'bold-script',
  },
  {
    id: 'moti-1',
    category: 'Motivación',
    title: 'Cree en Ti Mismo',
    text: '⚡ 𝐍𝐨 𝐭𝐞 𝐝𝐞𝐭𝐞𝐧𝐠𝐚𝐬 𝐡𝐚𝐬𝐭𝐚 𝐞𝐬𝐭𝐚𝐫 𝐨𝐫𝐠𝐮𝐥𝐥𝐨𝐬𝐨. 𝐓ú 𝐩𝐮𝐞𝐝𝐞𝐬 𝐜𝐨𝐧 𝐭𝐨𝐝𝐨 💪',
    fontStyleId: 'bold',
  },
  {
    id: 'moti-2',
    category: 'Motivación',
    title: 'Disciplina y Metas',
    text: '🔥 𝘓𝘢 𝘥𝘪𝘴𝘤𝘪𝘱𝘭𝘪𝘯𝘢 𝘦𝘴 𝘦𝘭 𝘱𝘶𝘦𝘯𝘵𝘦 𝘦𝘯𝘵𝘳𝘦 𝘵𝘶𝘴 𝘮𝘦𝘵𝘢𝘴 𝘺 𝘵𝘶𝘴 𝘭𝘰𝘨𝘳𝘰𝘴 🏆',
    fontStyleId: 'italic',
  },
  {
    id: 'fest-1',
    category: 'Festividades',
    title: 'Feliz Año Nuevo & Deseos',
    text: '🎆 ¡𝐹𝑒𝓁𝒾𝓏 𝒜ñ𝑜 𝒩𝓊𝑒𝓋𝑜! 𝒬𝓊𝑒 𝑒𝓈𝓉𝑒 𝒶ñ𝑜 𝓁𝓁𝑒𝑔𝓊𝑒 𝓁𝓁𝑒𝓃𝑜 𝒹𝑒 𝑒𝓍𝒾𝓉𝑜𝓈 𝓎 𝓅𝒶𝓏 🥂',
    fontStyleId: 'cursive',
  },
  {
    id: 'fest-2',
    category: 'Festividades',
    title: 'Feliz Navidad en Familia',
    text: '🎄 𝓕𝓮𝓵𝓲𝔃 𝓝𝓪𝓿𝓲𝓭𝓪𝓭 ✨ 𝓠𝓾𝓮 𝓵𝓪 𝓹𝓪𝔃 𝔂 𝓵𝓪 𝓾𝓷𝓲ó𝓷 𝓻𝓮𝓲𝓷𝓮𝓷 𝓮𝓷 𝓽𝓾 𝓱𝓸𝓰𝓪𝓻 🎁',
    fontStyleId: 'bold-script',
  },
];

export const SpecialOccasionsPhrasesSection: React.FC<SpecialOccasionsPhrasesSectionProps> = ({
  onApplyText,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todos', 'Cumpleaños', 'Amor & Pareja', 'Buenos Días', 'Motivación', 'Festividades'];

  const filtered = selectedCategory === 'Todos'
    ? PHRASES_DATA
    : PHRASES_DATA.filter((p) => p.category === selectedCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleShareWhatsApp = (text: string) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="frases-fechas-especiales" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold mb-2">
            <Gift className="w-3.5 h-3.5 text-rose-600" />
            <span>Colección del Conversor de Letras Bonitas para Fechas Especiales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Frases del Conversor de Letras Bonitas para WhatsApp y Amor
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Copia con el Conversor de Letras Bonitas dedicatorias de amor, felicitaciones de cumpleaños y mensajes con tipografías elegantes listas para enviar.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Phrases */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-rose-300 hover:bg-white transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/50">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-600 font-semibold truncate">
                  {item.title}
                </span>
              </div>

              <p className="p-3 bg-white rounded-lg border border-slate-200/70 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed min-h-[72px] flex items-center">
                {item.text}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-200/60">
              <button
                onClick={() => handleShareWhatsApp(item.text)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors"
                title="Enviar directo por WhatsApp"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <div className="flex items-center gap-1.5">
                {onApplyText && (
                  <button
                    onClick={() => onApplyText(item.text)}
                    className="text-[11px] font-bold text-slate-600 hover:text-rose-600 transition-colors"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => handleCopy(item.id, item.text)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all shadow-2xs"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
