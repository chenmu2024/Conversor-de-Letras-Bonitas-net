import React, { useState } from 'react';
import { Sparkles, Flame, Copy, Check, Wand2, Shield, Swords, Gamepad2, Award, Zap } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

interface NicksFreeFireStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

export const NicksFreeFireStudio: React.FC<NicksFreeFireStudioProps> = ({
  onApplyText,
  initialText = 'Insano',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [customName, setCustomName] = useState(initialText);
  const [clanTag, setClanTag] = useState('亗');
  const [selectedBadge, setSelectedBadge] = useState('👑');

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

  const clanBadges = ['亗', '꧁༺', 'ᴮᴼˢˢ', '⚡', '☬', 'ⓥ', '👑', '★彡'];

  const heroicoPresets = [
    { title: 'El Patrón Heroico', nick: '꧁༺ 𝕰𝖑 𝕻𝖆𝖙𝖗ó𝖓 ༻꧂', desc: 'Alas Simétricas' },
    { title: 'V de Verificado', nick: 'ⓥ 𝕴𝕹𝕾𝕬𝕹𝕺 ⁹⁹⁹', desc: 'Símbolo Verificado' },
    { title: 'Rey Tóxico', nick: '亗 𝑻𝑶𝑿𝑰𝑪𝑶 亗', desc: 'Corona de Rey' },
    { title: 'Bélico Pesado PvP', nick: '︻╦╤─ 𝕭𝖊𝖑𝖎𝖈𝖔 亗', desc: 'Arma MP40 / Francotirador' },
    { title: 'Ghost Clan Leader', nick: 'ᴮᴼˢˢ★ 𝕲𝖍𝖔𝖘𝖙 亗', desc: 'Clan Tag Boss' },
    { title: 'Dúo Pareja Tóxica 1', nick: '『 𝓔𝓵 𝓡𝓮𝔂 』 ♡', desc: 'Pareja Match (Él)' },
    { title: 'Dúo Pareja Tóxica 2', nick: '『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』 ♡', desc: 'Pareja Match (Ella)' },
    { title: 'Espacio Invisible Oculto', nick: `亗${INVISIBLE_SPACE}𝕹𝕴𝕮𝕶${INVISIBLE_SPACE}亗`, desc: 'Espacio Invisible' },
    { title: 'Demonio Oscuro', nick: '꧁ঔৣ☬ 𝕯𝖊𝖒𝖔𝖓 ☬ঔৣ꧂', desc: 'Alas de Demonio' },
  ];

  const generatedCombinations = React.useMemo(() => {
    const base = customName.trim() || 'Insano';
    return [
      `꧁༺ ${base} ༻꧂`,
      `${clanTag} ${base.toUpperCase()} ${clanTag}`,
      `ⓥ ${base} ⁹⁹⁹`,
      `ᴮᴼˢˢ★ ${base} 亗`,
      `︻╦╤─ ${base} ─╤╦︻`,
      `★彡 ${base} 彡★`,
      `『 ${base} 』 ⚡`,
      `亗${INVISIBLE_SPACE}${base}${INVISIBLE_SPACE}亗`,
      `꧁☬ ${base} ☬꧂`,
    ];
  }, [customName, clanTag]);

  return (
    <section className="bg-gradient-to-br from-amber-500/10 via-red-500/5 to-slate-900 rounded-2xl border border-amber-500/30 p-6 sm:p-8 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/30 font-black">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                🎮 Especial Free Fire & Videojuegos
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Generador de Nicks para Free Fire (Alas, Insanos & ⓥ Verificado)
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(INVISIBLE_SPACE)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all active:scale-95"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Copiar Espacio Invisible [ㅤ]</span>
        </button>
      </div>

      {/* Nick Customizer Box */}
      <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 sm:p-6 mb-6 shadow-inner">
        <label className="block text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
          Escribe tu Nombre o Gamertag:
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Escribe tu apodo gamer..."
            maxLength={18}
            className="flex-1 min-w-[200px] px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={() => onApplyText(customName)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all active:scale-95 shadow-md shadow-amber-500/20"
          >
            Aplicar al Conversor
          </button>
        </div>

        {/* Clan Tag Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium text-slate-300">
          <span className="text-slate-400">Tag de Clan:</span>
          {clanBadges.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => setClanTag(badge)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-colors ${
                clanTag === badge
                  ? 'bg-amber-500 text-stone-950 border-amber-500'
                  : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-400'
              }`}
            >
              {badge}
            </button>
          ))}
        </div>

        {/* Realtime Nick Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {generatedCombinations.map((nick, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:border-amber-500/60 transition-all group"
            >
              <span className="font-bold text-xs text-white truncate pr-2">
                {nick}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(nick)}
                className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-stone-950 transition-colors shrink-0 shadow-2xs"
                title="Copiar nick"
              >
                {copiedItem === nick ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-made Heroic Nicks List */}
      <h3 className="text-sm font-black uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-2">
        <Flame className="w-4 h-4 text-amber-400" />
        <span>Nicks Heroicos & Tags de Clan Populares Listos para Copiar:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {heroicoPresets.map((preset, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 shadow-xs hover:border-amber-500/50 transition-all group"
          >
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                {preset.desc}
              </span>
              <span className="font-bold text-sm text-white tracking-wide">
                {preset.nick}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(preset.nick)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-bold text-xs transition-all active:scale-95"
            >
              {copiedItem === preset.nick ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
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
    </section>
  );
};
