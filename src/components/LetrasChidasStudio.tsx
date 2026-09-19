import React, { useState } from 'react';
import { Sparkles, Flame, Copy, Check, Wand2, Shield, Heart, Zap, Award } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

interface LetrasChidasStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

export const LetrasChidasStudio: React.FC<LetrasChidasStudioProps> = ({
  onApplyText,
  initialText = 'Letras Chidas',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [customNick, setCustomNick] = useState(initialText);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(text);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(20);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const chidoPresets = [
    { title: 'El Patrón Insano', text: '꧁༺ 𝕰𝖑 𝕻𝖆𝖙𝖗ó𝖓 ༻꧂', tag: 'Top Free Fire' },
    { title: 'La Tóxica Real', text: '亗 𝑳𝑨 𝑻Ó𝑿𝑰𝑪𝑨 亗', tag: 'Popular TikTok' },
    { title: 'Insano PvP', text: '⚡ ᴵᴺˢᴬᴺᴼ ⁹⁹⁹ ⚡', tag: 'Gamer' },
    { title: 'Bélico Pesado', text: '⚔️ 𝕭𝖊𝖑𝖎𝖈𝖔 𝕻𝖗𝖔 ⚔️', tag: 'Bélico' },
    { title: 'Boss Clan', text: 'ᴮᴼˢˢ★ 𝕹𝕴𝕮𝕶 亗', tag: 'Clan Tag' },
    { title: 'Rey / Reina 亗', text: '👑 𝓚𝓘𝓝𝓖 亗 👑', tag: 'Corona' },
    { title: 'Chido Aesthetic', text: '『 𝓒𝓱𝓲𝓭𝓸 & 𝓤𝓷𝓲𝓬𝓸 』', tag: 'Aesthetic' },
    { title: 'Alas Legendarias', text: '꧁ঔৣ☬ 𝕯𝖊𝖘𝖙𝖗𝖚𝖞𝖊 ☬ঔৣ꧂', tag: 'Alas Heroicas' },
    { title: 'Flow Pesado', text: '亗ㅤ𝑭𝑳𝑶𝑾ㅤ亗', tag: 'Espacio Invisible' },
  ];

  const mexicanPhrases = [
    '✦ 𝒱𝒾𝓋𝒾𝑒𝓃𝒹𝑜 𝒶 𝓂𝒾 𝓂𝒶𝓃𝑒𝓇𝒶, 𝓈𝒾𝓃 𝓅𝓇𝒾𝓈𝒶𝓈 ✦',
    '⚡ 𝕾𝖎𝖓 𝖒𝖎𝖊𝖉𝖔 𝖆𝖑 𝖊𝖝𝖎𝖙𝖔, 𝖕𝖆𝖕𝖆 ⚡',
    '🥀 𝒫𝑜𝒸𝑜𝓈 𝒶𝓂𝒾𝑔𝑜𝓈 𝓅𝑒𝓇𝑜 𝟣𝟢𝟢% 𝓁𝑒𝒶𝓁𝑒𝓈 🥀',
    '👑 𝓝𝓪𝓬𝓲𝓭𝓸 𝓹𝓪𝓻𝓪 𝓫𝓻𝓲𝓵𝓵𝓪𝓻, 𝓷𝓸 𝓹𝓪𝓻𝓪 𝓮𝓷𝓬𝓪𝓳𝓪𝓻 👑',
    '🔥 𝕰𝖑 𝖖𝖚𝖊 𝖓𝖔 𝖆𝖗𝖗𝖎𝖊𝖘𝖌𝖆, 𝖓𝖔 𝖌𝖆𝖓𝖆 🔥',
    '✨ 𝒯𝓇𝒶𝒷𝒶𝒿𝒶𝓃𝒹𝑜 𝑒𝓃 𝓈𝒾𝓁𝑒𝓃𝒸𝒾𝑜 𝓎 𝒸𝓇𝑒𝒸𝒾𝑒𝓃𝒹𝑜 ✨',
  ];

  const quickStylesForNick = (nick: string) => [
    `꧁༺ ${nick} ༻꧂`,
    `亗 ${nick.toUpperCase()} 亗`,
    `⚡ ${nick} ⚡`,
    `『 ${nick} 』`,
    `★彡 ${nick} 彡★`,
    `👑 ${nick} 👑`,
  ];

  return (
    <section className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-indigo-500/10 rounded-2xl border border-amber-200/80 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                🇲🇽 Especial México & LATAM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Estudio de Letras Chidas & Nicks Insanos
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(INVISIBLE_SPACE)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/80 transition-all active:scale-95"
          title="Copiar Espacio Invisible para nicks chidos"
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-700" />
          <span>Copiar Espacio Invisible [ㅤ]</span>
        </button>
      </div>

      {/* Interactive Custom Nick Generator */}
      <div className="bg-white rounded-xl border border-amber-200/90 p-4 sm:p-5 mb-6 shadow-xs">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          Personaliza tu Nick Chido al Instante:
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customNick}
            onChange={(e) => setCustomNick(e.target.value)}
            placeholder="Escribe tu nombre o apodo..."
            maxLength={25}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={() => onApplyText(customNick)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-amber-500/20"
          >
            Aplicar al Conversor
          </button>
        </div>

        {/* Realtime Variations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {quickStylesForNick(customNick || 'Chido').map((styleText, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:border-amber-300 transition-all group"
            >
              <span className="font-semibold text-xs text-slate-800 truncate pr-2">
                {styleText}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(styleText)}
                className="p-1.5 rounded-md bg-white text-slate-600 hover:bg-amber-500 hover:text-white transition-colors shrink-0 shadow-2xs"
                title="Copiar nick"
              >
                {copiedItem === styleText ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Famous LATAM Nicks & Presets */}
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span>Nicks Legendarios & Letras Chidas Listas para Copiar:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {chidoPresets.map((preset, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 bg-white shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all group"
          >
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-0.5">
                {preset.tag}
              </span>
              <span className="font-bold text-sm text-slate-900 tracking-wide">
                {preset.text}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(preset.text)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white font-bold text-xs transition-all active:scale-95"
            >
              {copiedItem === preset.text ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
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
        ))}
      </div>

      {/* Frases Chidas para Estados & Biografías */}
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-orange-500" />
        <span>Frases Chidas para Biografías & Estados de WhatsApp:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {mexicanPhrases.map((phrase, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-orange-300 transition-all"
          >
            <p className="text-xs sm:text-sm font-medium text-slate-800 pr-2">
              {phrase}
            </p>
            <button
              type="button"
              onClick={() => handleCopy(phrase)}
              className="p-2 rounded-lg bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white transition-all shrink-0"
              title="Copiar frase"
            >
              {copiedItem === phrase ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
