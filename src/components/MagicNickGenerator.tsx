import React, { useState } from 'react';
import { Sparkles, Copy, Check, Wand2, Flame, Heart, Crown, Skull, RefreshCw, ArrowUpRight } from 'lucide-react';
import { FONT_COUNT_PLUS } from '../constants/siteStats';

interface MagicNickGeneratorProps {
  currentText: string;
  onApplyText: (text: string) => void;
}

interface MagicNickTemplate {
  category: 'gamer' | 'aesthetic' | 'crown' | 'love' | 'dark' | 'kawaii';
  name: string;
  badge: string;
  generate: (text: string) => string;
}

const NICK_TEMPLATES: MagicNickTemplate[] = [
  // 1. Gamer & Insano
  {
    category: 'gamer',
    name: 'Alas Gamer Insano',
    badge: '🔥 Free Fire',
    generate: (t) => `꧁༺ ${t || 'Gamer'} ༻꧂`,
  },
  {
    category: 'gamer',
    name: 'Rey Insano 亗',
    badge: '⚡ Competitivo',
    generate: (t) => `亗 ${t || 'Insano'} 亗 999`,
  },
  {
    category: 'gamer',
    name: 'Espada Ninja',
    badge: '⚔️ Clan Pro',
    generate: (t) => `⚔ 𝕷𝖊𝖌𝖊𝖓𝖉 • ${t || 'Pro'} ⚔`,
  },
  {
    category: 'gamer',
    name: 'Sello Fantasma',
    badge: '☬ Mítico',
    generate: (t) => `☬ 𝓝𝓲𝓷𝓳𝓪 • ${t || 'Ghost'} ☬`,
  },

  // 2. Aesthetic & Minimalista
  {
    category: 'aesthetic',
    name: 'Estrellas Cósmicas',
    badge: '✨ Aesthetic',
    generate: (t) => `｡･:*:･ﾟ★ ${t || 'Aesthetic'} ★｡･:*:･ﾟ`,
  },
  {
    category: 'aesthetic',
    name: 'Alas de Mariposa',
    badge: 'ʚɞ Delicado',
    generate: (t) => `ʚ ${t || 'Mariposa'} ɞ ✧`,
  },
  {
    category: 'aesthetic',
    name: 'Coquette Ribbon',
    badge: '𐙚 Viral',
    generate: (t) => `𐙚 𝒫𝓇𝒾𝓃𝒸𝑒𝓈𝓈 • ${t || 'Girl'} 𐙚`,
  },
  {
    category: 'aesthetic',
    name: 'Destello Astral',
    badge: '✧ Minimal',
    generate: (t) => `✧*。${t || 'Luz'} ｡:*✧`,
  },

  // 3. Realeza & Coronas
  {
    category: 'crown',
    name: 'Corona Imperial',
    badge: '👑 Realeza',
    generate: (t) => `👑 𝒬𝓊𝑒𝑒𝓃 • ${t || 'Queen'} ♛`,
  },
  {
    category: 'crown',
    name: 'Rey Supremo',
    badge: '♔ King',
    generate: (t) => `♔ 𝓚𝓲𝓷𝓰 • ${t || 'Master'} ♚`,
  },
  {
    category: 'crown',
    name: 'Flor de Lis Imperial',
    badge: '⚜️ VIP',
    generate: (t) => `⚜️ 𝕷𝖔𝖗𝖉 • ${t || 'Supreme'} ⚜️`,
  },

  // 4. Amor & Parejas
  {
    category: 'love',
    name: 'Línea de Amor Infinito',
    badge: '♡ Enamorados',
    generate: (t) => `•─ 𝒯𝓊 𝓎 ${t || 'Yo'} ♡ ─•`,
  },
  {
    category: 'love',
    name: 'Anillo & Corazón',
    badge: '💍 Pareja',
    generate: (t) => `💍 ${t || 'Amor Eterno'} 💍`,
  },

  // 5. Dark Gothic & Punk
  {
    category: 'dark',
    name: 'Calavera Gótica',
    badge: '☠ Dark',
    generate: (t) => `☠ 𝕯𝖆𝖗𝖐 • ${t || 'Soul'} ☠`,
  },
  {
    category: 'dark',
    name: 'Cruz Medieval',
    badge: '† Shadow',
    generate: (t) => `† 𝕾𝖍𝖆𝖉𝖔𝖜 • ${t || 'Demon'} †`,
  },

  // 6. Kawaii
  {
    category: 'kawaii',
    name: 'Carita Kawaii Enamorada',
    badge: '♥ Cute',
    generate: (t) => `(｡♥‿♥｡) ${t || 'Dulzura'}`,
  },
];

export const MagicNickGenerator: React.FC<MagicNickGeneratorProps> = ({ currentText, onApplyText }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNick, setCopiedNick] = useState<string | null>(null);

  const cleanInput = (currentText || 'Nombre')
    .replace(/[꧁༺༻꧂亗★彡ʚɞ✧👑♛•─♡*。⚔«»⚡☠☬†💍𐙚]/g, '')
    .trim() || 'Nombre';

  const categories = [
    { id: 'all', label: 'Todos los Nicks', icon: <Wand2 className="w-3.5 h-3.5" /> },
    { id: 'gamer', label: 'Gamer & FF', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'aesthetic', label: 'Aesthetic', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'crown', label: 'Realeza 👑', icon: <Crown className="w-3.5 h-3.5" /> },
    { id: 'love', label: 'Parejas ♡', icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'dark', label: 'Dark ☠', icon: <Skull className="w-3.5 h-3.5" /> },
  ];

  const filtered = selectedCategory === 'all'
    ? NICK_TEMPLATES
    : NICK_TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleCopy = async (nickText: string) => {
    try {
      await navigator.clipboard.writeText(nickText);
      setCopiedNick(nickText);

      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(35);
        } catch {}
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('font-copied', {
            detail: { text: nickText, fontName: 'Combinación Mágica' },
          })
        );
      }

      setTimeout(() => setCopiedNick(null), 2000);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  const handleLoadInEditor = (nickText: string) => {
    onApplyText(nickText);
    const editor = document.getElementById('main-text-input');
    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      editor.focus();
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-indigo-500/20 mb-8 relative overflow-hidden">
      {/* Glow aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            1 Clic Magic Nick
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Combinaciones Mágicas de Nicks en 1 Clic
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Tu texto <strong>"{cleanInput}"</strong> decorado instantáneamente con alas, símbolos de clan, coronas y marcos aesthetic.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 relative z-10">
        {filtered.map((item, idx) => {
          const formattedNick = item.generate(cleanInput);
          const isCopied = copiedNick === formattedNick;

          return (
            <div
              key={`${item.name}-${idx}`}
              className="group bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/70 hover:border-indigo-400/60 rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-indigo-950/50"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1 truncate">
                  {item.name}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 shrink-0">
                  {item.badge}
                </span>
              </div>

              {/* Nick Text Display */}
              <div className="py-2 px-3 my-1 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-center text-center">
                <span className="font-bold text-sm sm:text-base text-white tracking-wide truncate select-all">
                  {formattedNick}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={() => handleCopy(formattedNick)}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-900/30 active:scale-95'
                  }`}
                  title="Copiar nick listo para pegar en Free Fire, Instagram o WhatsApp"
                >
                  {isCopied ? (
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

                <button
                  type="button"
                  onClick={() => handleLoadInEditor(formattedNick)}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                  title={`Cargar este diseño en el conversor de ${FONT_COUNT_PLUS} fuentes`}
                >
                  <span>Probar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
