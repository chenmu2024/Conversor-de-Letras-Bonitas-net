import React, { useState } from 'react';
import { Sparkles, Copy, Check, Heart, ArrowRight } from 'lucide-react';

interface InstagramDividersProps {
  onInsertText?: (text: string) => void;
}

const DIVIDER_CATEGORIES = [
  {
    name: '🎀 Moños & Coquette Aesthetic',
    dividers: [
      '🎀 ִֶָ ୨୧ ִֶָ 🎀',
      '୨୧┈┈┈┈┈┈┈┈┈┈┈┈┈┈୨୧',
      '˙ᵕ˙ ──────── ˙ᵕ˙',
      '˗ˏˋ ★ ˎˊ˗ ┈┈┈┈┈┈ ˗ˏˋ ★ ˎˊ˗',
      '︶⊹︶︶୨୧︶︶⊹︶',
      'ִֶָ 𓂃 ࣪˖ ִֶָ 𓂃 ࣪˖ ִֶָ',
      '⋅˚₊‧ ୨୧ ‧₊˚ ⋅',
      '⋆˙⟡ ════════ ⟡˙⋆',
    ],
  },
  {
    name: '✨ Estrellas y Destellos',
    dividers: [
      '─── ⋆⋅☆⋅⋆ ───',
      '✦✧━━━━━━✧✦',
      '*+:｡.｡ ｡.｡:+*',
      '✧─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───✧',
      '════ ⋆★⋆ ════',
      '☆━━━━━━━━━━━━━━━☆',
      '┊┊┊┊ ➶ ❁۪ ｡˚ ✧',
      '⋆⁺₊⋆ ☾ ⋆⁺₊⋆ ☁︎ ⋆⁺₊⋆',
    ],
  },
  {
    name: '🌸 Flores y Naturaleza',
    dividers: [
      '────── 🌺 ──────',
      '❀•°•═════•°•❀',
      '🌿━━━━━•°•🌺•°•━━━━━🌿',
      '─── ✿ ─── ✿ ───',
      '════ ❀ ════',
      '┈─────── 𑁍 ───────┈',
      '· · ─────── ·𖥸· ─────── · ·',
      '🌸 ✧ ════════ ✧ 🌸',
    ],
  },
  {
    name: '┈➤ Flechas y Conectores de Bio',
    dividers: [
      '╰┈➤',
      '↳',
      '⤾',
      '───> ',
      '➳',
      '➔',
      '➶',
      '➲',
    ],
  },
  {
    name: '🖤 Estilo Minimalista y Gótico',
    dividers: [
      '──────────',
      '━━━━━━━ ★ ━━━━━━━',
      '┋ ┋ ┋ ┋ ┋',
      '▪▫▪▫▪▫▪▫▪▫▪▫',
      '═════════════',
      '─┉─¡!─┉─',
      '†━━━━━━━━━━━━†',
      '─── ⚔️ ───',
    ],
  },
];

const EMOJI_PALETTES = [
  { name: '🤎 Minimalist Beige', emojis: '🤎 ☕ 📜 🥐 ☁️ 🌿' },
  { name: '🌸 Pastel Soft Pink', emojis: '🌸 🍡 🧋 🎀 ✨ 🩰' },
  { name: '🕷️ Dark Cyber Gothic', emojis: '🕷️ ⛓️ 🖤 🥀 🔪 🩸' },
  { name: '☀️ Golden Hour Sun', emojis: '☀️ 🍹 🍯 🌻 🐝 💛' },
  { name: '🔮 Y2K Retro Vibe', emojis: '💿 ⚡ 🔮 👾 🎧 🌌' },
  { name: '🌿 Clean Earth & Nature', emojis: '🌿 🍃 🍵 🪴 🍏 🕊️' },
  { name: '🌊 Ocean Blue & Chill', emojis: '🌊 🧊 🐬 🐋 💙 🫧' },
  { name: '👑 Royal VIP Gold', emojis: '👑 🏆 💰 ⚡ ⚜️ 🥂' },
  { name: '🍓 Strawberry Milk', emojis: '🍓 🥛 🍰 🌷 🍼 💖' },
  { name: '🫧 Clean Girl Aesthetic', emojis: '🫧 🧴 🤍 🕯️ 🛁 🪞' },
];

export const InstagramDividers: React.FC<InstagramDividersProps> = ({ onInsertText }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedText(txt);
    if (onInsertText) onInsertText(txt);
    setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
          Separadores y Paletas Aesthetic para Instagram
        </span>
        <h3 className="font-extrabold text-lg text-slate-900">
          Líneas de Separación y Combos de Emojis para Bio & Captions
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Copia líneas divisoras y paquetes de emojis coordinados para organizar las frases de tu perfil de manera limpia y profesional.
        </p>
      </div>

      {/* Emoji Aesthetic Palettes */}
      <div>
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Paletas de Emojis Coordinados para Biografías:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {EMOJI_PALETTES.map((pal, idx) => {
            const isCopied = copiedText === pal.emojis;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-pink-300 transition-all flex flex-col justify-between space-y-2 shadow-2xs"
              >
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">{pal.name}</div>
                  <div className="text-base font-normal tracking-wide my-1 select-all">{pal.emojis}</div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(pal.emojis)}
                  className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-pink-50 text-pink-600 border border-slate-200'
                  }`}
                >
                  {isCopied ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dividers Catalog */}
      <div className="space-y-5 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          Líneas de Separación Estéticas para Pies de Foto & Perfil:
        </h4>

        <div className="space-y-4">
          {DIVIDER_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">{cat.name}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {cat.dividers.map((div, i) => {
                  const isCopied = copiedText === div;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCopy(div)}
                      className={`p-3 rounded-xl border text-xs font-medium font-mono text-center truncate transition-all flex items-center justify-between gap-2 active:scale-95 shadow-2xs ${
                        isCopied
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                          : 'bg-slate-50 hover:bg-white hover:border-pink-300 text-slate-800 border-slate-200'
                      }`}
                    >
                      <span className="truncate">{div}</span>
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
