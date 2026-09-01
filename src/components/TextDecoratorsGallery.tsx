import React, { useState } from 'react';
import { Sparkles, Copy, Check, LayoutGrid, ArrowRight, Wand2 } from 'lucide-react';

interface TextDecoratorsGalleryProps {
  currentText: string;
  onApplyText: (text: string) => void;
}

interface FrameItem {
  id: string;
  name: string;
  category: 'Separadores' | 'Marcos' | 'Alas & Coronas' | 'Gamer & Insano';
  wrap: (t: string) => string;
}

const DECORATION_ITEMS: FrameItem[] = [
  // Separadores
  {
    id: 'sep-stars',
    name: 'Separador de Estrellas',
    category: 'Separadores',
    wrap: (t) => `─── ⋆⋅☆⋅⋆ ───\n${t}\n─── ⋆⋅☆⋅⋆ ───`,
  },
  {
    id: 'sep-sparkle-line',
    name: 'Línea de Destellos',
    category: 'Separadores',
    wrap: (t) => `✧*。*•.¸¸.•*´¨\`*•.¸¸.•*´¨\`*•.¸¸.•*✧\n${t}`,
  },
  {
    id: 'sep-aesthetic-dots',
    name: 'Puntos y Flechas Aesthetic',
    category: 'Separadores',
    wrap: (t) => `·.̩₊̣.̩✧*̣̩˚̣̣⁺̣‧.₊̣̇.‧⁺̣˚̣̣*̣̩✧·.̩₊̣.̩\n${t}\n·.̩₊̣.̩✧*̣̩˚̣̣⁺̣‧.₊̣̇.‧⁺̣˚̣̣*̣̩✧·.̩₊̣.̩`,
  },
  {
    id: 'sep-music-bar',
    name: 'Barra de Reproductor Musical',
    category: 'Separadores',
    wrap: (t) => `ılı.lıllılı.ıllı.\n${t}\n⏮️  ⏸️  ⏭️ 02:45 ───○── 04:12`,
  },

  // Marcos & Borders
  {
    id: 'frame-box-corners',
    name: 'Caja con Esquinas Japonesas',
    category: 'Marcos',
    wrap: (t) => `╔══════ ≪ °❈° ≫ ══════╗\n  ${t}  \n╚══════ ≪ °❈° ≫ ══════╝`,
  },
  {
    id: 'frame-floral-ribbon',
    name: 'Marco de Flores y Lazo',
    category: 'Marcos',
    wrap: (t) => `｡ﾟ•┈୨♡୧┈•ﾟ｡\n  ${t}  \n｡ﾟ•┈୨♡୧┈•ﾟ｡`,
  },
  {
    id: 'frame-double-classic',
    name: 'Borde Clásico Elegante',
    category: 'Marcos',
    wrap: (t) => `┏━━━━━━━━━━━━━━━┓\n  ${t}  \n┗━━━━━━━━━━━━━━━┛`,
  },
  {
    id: 'frame-clouds',
    name: 'Marco de Nubes y Destellos',
    category: 'Marcos',
    wrap: (t) => `☁️ ﾟ•┈୨ ✦ ୧┈•ﾟ ☁️\n    ${t}    \n☁️ ﾟ•┈୨ ✦ ୧┈•ﾟ ☁️`,
  },

  // Alas & Coronas
  {
    id: 'wings-angel',
    name: 'Alas de Ángel Simétricas',
    category: 'Alas & Coronas',
    wrap: (t) => `ʚ ${t} ɞ`,
  },
  {
    id: 'crown-royal',
    name: 'Corona Real y Joyas',
    category: 'Alas & Coronas',
    wrap: (t) => `👑 ${t} ♛`,
  },
  {
    id: 'butterfly-fairy',
    name: 'Hada y Mariposa Aesthetic',
    category: 'Alas & Coronas',
    wrap: (t) => `𓆩♡𓆪 ${t} 𓆩♡𓆪`,
  },
  {
    id: 'swords-legend',
    name: 'Espadas Cruzadas Legendarias',
    category: 'Alas & Coronas',
    wrap: (t) => `⚔️ ${t} ⚔️`,
  },

  // Gamer & Insano
  {
    id: 'ff-insane-box',
    name: 'Placa de Jugador Insano',
    category: 'Gamer & Insano',
    wrap: (t) => `亗 ⦓ ${t} ⦔ 亗`,
  },
  {
    id: 'gamer-cross-banner',
    name: 'Calavera & Cruz Gamer',
    category: 'Gamer & Insano',
    wrap: (t) => `꧁ঔৣ☬✞ ${t} ✞☬ঔৣ꧂`,
  },
  {
    id: 'vip-thunder',
    name: 'Sello Trueno V.I.P',
    category: 'Gamer & Insano',
    wrap: (t) => `⚡【 ${t} 】⚡`,
  },
  {
    id: 'target-sniper',
    name: 'Mira de Francotirador',
    category: 'Gamer & Insano',
    wrap: (t) => `🎯︻デ═一 ${t}`,
  },
];

export const TextDecoratorsGallery: React.FC<TextDecoratorsGalleryProps> = ({
  currentText = 'Sofia',
  onApplyText,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todos', 'Separadores', 'Marcos', 'Alas & Coronas', 'Gamer & Insano'];
  const sample = currentText.trim() || 'Tu Texto';

  const filtered = selectedCat === 'Todos'
    ? DECORATION_ITEMS
    : DECORATION_ITEMS.filter((item) => item.category === selectedCat);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <section id="marcos-separadores-texto" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-2">
            <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Galería de Marcos del Conversor de Letras Bonitas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Bordes y Marcos en el Conversor de Letras Bonitas
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Aplica en el Conversor de Letras Bonitas bordes japoneses, cajas de texto, alas y líneas divisorias a tu frase o nombre con un solo clic.
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === c
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Decorated Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => {
          const rendered = item.wrap(sample);
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-indigo-300 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/50">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold truncate">
                    {item.name}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200/70 text-xs font-bold text-slate-800 whitespace-pre-wrap text-center flex items-center justify-center min-h-[76px] leading-relaxed">
                  {rendered}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-3 pt-2">
                <button
                  onClick={() => onApplyText(rendered)}
                  className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Cargar
                </button>

                <button
                  onClick={() => handleCopy(item.id, rendered)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-2xs"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>¡Listo!</span>
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
          );
        })}
      </div>
    </section>
  );
};
