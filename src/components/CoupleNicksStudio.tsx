import React, { useState } from 'react';
import { Heart, Sparkles, Copy, Check, Crown, Flame, Zap, Shield, Users, RefreshCw } from 'lucide-react';

interface CoupleNicksStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

interface CouplePair {
  id: string;
  category: string;
  p1: string;
  p2: string;
  desc: string;
}

const PRESET_COUPLES: CouplePair[] = [
  {
    id: 'c1',
    category: 'Realeza & Coronas',
    p1: '『 𝓔𝓵 𝓡𝓮𝔂 』 亗',
    p2: '『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』 亗',
    desc: 'El clásico dúo de reyes con coronas simétricas',
  },
  {
    id: 'c2',
    category: 'Películas & Leyendas',
    p1: '亗 𝑩𝑶𝑵𝑵𝑰𝑬 亗',
    p2: '亗 𝑪𝑳𝒀𝑫𝑬 亗',
    desc: 'La pareja de forajidos más famosa',
  },
  {
    id: 'c3',
    category: 'Míticos & Dioses',
    p1: '⚡ 𝕬𝖉𝖆𝖓 ⚡',
    p2: '⚡ 𝕰𝖛𝖆 ⚡',
    desc: 'El dúo legendario con rayos de poder',
  },
  {
    id: 'c4',
    category: 'Sol & Luna Aesthetic',
    p1: '☀️ 𝒮𝑜𝓁 · 𝒱𝒾𝒷𝑒𝓈 𓆩♡𓆪',
    p2: '🌙 𝐿𝓊𝓃𝒶 · 𝒱𝒾𝒷𝑒𝓈 𓆩♡𓆪',
    desc: 'Perfecto para Instagram y biografías compartidas',
  },
  {
    id: 'c5',
    category: 'Dúos Tóxicos Free Fire',
    p1: '꧁༺ 𝕿ó𝖝𝖎𝖈𝖔 ༻꧂ ⓥ',
    p2: '꧁༺ 𝕿ó𝖝𝖎𝖈𝖆 ༻꧂ ⓥ',
    desc: 'Alas simétricas y verificado insano',
  },
  {
    id: 'c6',
    category: 'Ángel & Demonio',
    p1: '𓆩 𝕬𝖓𝖌𝖊𝖑 𓆪 ✞',
    p2: '𓆩 𝕯𝖊𝖒𝖔𝖓 𓆪 ✞',
    desc: 'Estilo gótico oscuro para PvP',
  },
  {
    id: 'c7',
    category: 'Belleza & Bestia',
    p1: '🌹 𝓑𝓮𝓼𝓽𝓲𝓪 ⚔️',
    p2: '🌹 𝓑𝓮𝓵𝓵𝓪 💖',
    desc: 'El clásico cuento romántico estilizado',
  },
  {
    id: 'c8',
    category: 'Joker & Harley',
    p1: '🃏 𝕵𝕺𝕶𝕰𝕽 亗',
    p2: '💎 𝕳𝕬𝕽𝕷𝕰𝖄 亗',
    desc: 'El dúo criminal de Gotham',
  },
];

export const CoupleNicksStudio: React.FC<CoupleNicksStudioProps> = ({
  onApplyText,
}) => {
  const [name1, setName1] = useState('Carlos');
  const [name2, setName2] = useState('Sofia');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState('Todos');

  const categories = ['Todos', 'Realeza & Coronas', 'Películas & Leyendas', 'Míticos & Dioses', 'Sol & Luna Aesthetic', 'Dúos Tóxicos Free Fire'];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(id);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(25);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleCopyBoth = async (p1: string, p2: string, id: string) => {
    try {
      const combined = `${p1} ♡ ${p2}`;
      await navigator.clipboard.writeText(combined);
      setCopiedItem(`both-${id}`);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(25);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const filteredCouples = selectedTag === 'Todos'
    ? PRESET_COUPLES
    : PRESET_COUPLES.filter((c) => c.category === selectedTag);

  // Custom generated couple matching with input names
  const customPairs = [
    {
      p1: `꧁༺ ${name1} ༻꧂ 亗`,
      p2: `꧁༺ ${name2} ༻꧂ 亗`,
      desc: 'Alas insanas y corona de rey/reina',
    },
    {
      p1: `『 𝓔𝓵 𝓡𝓮𝔂 𝓭𝓮 ${name2} 』 ♡`,
      p2: `『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 𝓭𝓮 ${name1} 』 ♡`,
      desc: 'Nicks personalizados con el nombre de tu pareja',
    },
    {
      p1: `亗 𝕯ú𝖔 · ${name1} 亗`,
      p2: `亗 𝕯ú𝖔 · ${name2} 亗`,
      desc: 'Tag de clan dúo coordinado',
    },
    {
      p1: `✨ ${name1} · 𝒱𝒾𝒷𝑒𝓈 𓆩♡𓆪`,
      p2: `✨ ${name2} · 𝒱𝒾𝒷𝑒𝓈 𓆩♡𓆪`,
      desc: 'Aesthetic minimalista para Instagram',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 rounded-2xl border border-rose-500/30 p-6 sm:p-8 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Heart className="w-6 h-6 animate-pulse text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                💑 Nicks Matching Dúos & Parejas Goals
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Generador de Nombres para Parejas Free Fire y Dúos
            </h2>
          </div>
        </div>
      </div>

      {/* Input names for custom generation */}
      <div className="p-5 rounded-xl bg-slate-950/80 border border-rose-900/50 mb-6 shadow-inner">
        <h3 className="text-xs font-black uppercase tracking-wider text-rose-300 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-rose-400" />
          <span>Escribe los Nombres de Ambos para Nicks Combinados:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Nombre / Apodo 1 (Novio / Dúo 1):</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Ej: Carlos"
              maxLength={12}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Nombre / Apodo 2 (Novia / Dúo 2):</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Ej: Sofia"
              maxLength={12}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {customPairs.map((pair, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/20 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 mb-2">{pair.desc}</span>
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-xs text-rose-300 truncate">{pair.p1}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(pair.p1, `cp1-${idx}`)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copiar parte 1"
                  >
                    {copiedItem === `cp1-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-xs text-pink-300 truncate">{pair.p2}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(pair.p2, `cp2-${idx}`)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copiar parte 2"
                  >
                    {copiedItem === `cp2-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopyBoth(pair.p1, pair.p2, `both-custom-${idx}`)}
                className="w-full py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white font-bold text-xs border border-rose-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                {copiedItem === `both-custom-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Heart className="w-3.5 h-3.5 text-rose-400" />}
                <span>Copiar Ambos (Dúo)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedTag(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTag === cat
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Preset Pairs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredCouples.map((c) => (
          <div
            key={c.id}
            className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between"
          >
            <div className="mb-2">
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-2 inline-block">
                {c.category}
              </span>
              <p className="text-[11px] text-slate-400 mb-2">{c.desc}</p>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center justify-between bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <span className="font-bold text-xs text-rose-200 truncate">{c.p1}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(c.p1, `p1-${c.id}`)}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copiar nick 1"
                >
                  {copiedItem === `p1-${c.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center justify-between bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <span className="font-bold text-xs text-pink-200 truncate">{c.p2}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(c.p2, `p2-${c.id}`)}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copiar nick 2"
                >
                  {copiedItem === `p2-${c.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopyBoth(c.p1, c.p2, c.id)}
              className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white font-bold text-xs border border-slate-800 transition-all flex items-center justify-center gap-1.5"
            >
              {copiedItem === `both-${c.id}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Dúo Copiado!</span>
                </>
              ) : (
                <>
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Copiar Dúo Completo</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
