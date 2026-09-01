import React, { useState } from 'react';
import { Shield, Copy, Check, Sparkles, Trophy, Crown, Zap } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const CLAN_TAG_PRESETS = [
  { tag: 'ᵀᴱᴬᴹ', name: 'TEAM' },
  { tag: 'ᴳᴼᴰ', name: 'GOD' },
  { tag: 'ᴮᴼˢˢ', name: 'BOSS' },
  { tag: '𝖲𝖰𝖴𝖠𝖣', name: 'SQUAD' },
  { tag: '𝖪𝖨𝖭𝖦', name: 'KING' },
  { tag: '𝖪𝖨𝖫𝖫', name: 'KILL' },
  { tag: 'Ⓥ', name: 'V de Verificado' },
];

export const FreeFireClanNames: React.FC = () => {
  const [clanTag, setClanTag] = useState('TEAM');
  const [clanName, setClanName] = useState('INSANOS');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const smallCaps = FONT_GENERATORS.find((g) => g.id === 'small-caps') || FONT_GENERATORS[0];
  const transformedName = smallCaps.transform(clanName);

  const VARIATIONS = [
    `꧁༺ [${clanTag}] ${transformedName} ༻꧂`,
    `亗 [${clanTag}] ${transformedName} 亗`,
    `Ⓥ ${clanTag} · ${transformedName} ⚡`,
    `⚔️ «${clanTag}» ${transformedName} ⚔️`,
    `ᴮᴼˢˢ★ ${transformedName}`,
    `† ${clanTag} ︱ ${transformedName} †`,
    `✪ [${clanTag}] ${transformedName} ✪`,
    `☠️ ${clanTag} ✖ ${transformedName} ☠️`,
  ];

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedText(txt);
    setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block mb-1">
          Free Fire Clan & Squad Name Studio
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Generador de Nombres y Tags para Clanes de Free Fire</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Crea el nombre de tu clan o gremio con Tag inicial (TEAM, GOD, BOSS, V de Verificado) y símbolos compatibles.
        </p>
      </div>

      {/* Input Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-4">
          <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
            Tag de Clan:
          </label>
          <input
            type="text"
            value={clanTag}
            onChange={(e) => setClanTag(e.target.value)}
            placeholder="Ej: TEAM, GOD..."
            className="w-full px-3.5 py-2.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div className="sm:col-span-8">
          <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
            Nombre del Gremio / Clan:
          </label>
          <input
            type="text"
            value={clanName}
            onChange={(e) => setClanName(e.target.value)}
            placeholder="Ej: INSANOS, LEGENDARIOS..."
            className="w-full px-3.5 py-2.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Quick Tag Presets */}
      <div>
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
          Tags de Clan Populares:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {CLAN_TAG_PRESETS.map((p) => (
            <button
              key={p.tag}
              type="button"
              onClick={() => setClanTag(p.tag)}
              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-all border border-amber-200/60 active:scale-95"
            >
              {p.tag} ({p.name})
            </button>
          ))}
        </div>
      </div>

      {/* Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {VARIATIONS.map((varText, i) => {
          const isCopied = copiedText === varText;
          const charLen = Array.from(varText).length;

          return (
            <div
              key={i}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isCopied
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20'
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-slate-900 truncate font-mono">
                  {varText}
                </p>
                <span className="text-[10px] font-bold text-slate-400">
                  {charLen} caracteres
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(varText)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-black text-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Clan</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
