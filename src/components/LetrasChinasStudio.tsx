import React, { useState } from 'react';
import { Sparkles, Copy, Check, Wand2, Star, Shield } from 'lucide-react';

interface LetrasChinasStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

export const LetrasChinasStudio: React.FC<LetrasChinasStudioProps> = ({
  onApplyText,
  initialText = 'Tokyo',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [customWord, setCustomWord] = useState(initialText);

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

  // Convert text to simulated Asian/Kanji/Katakana characters
  const toSimulatedAsian = (str: string): string => {
    const map: Record<string, string> = {
      a: '卂', b: '乃', c: '匚', d: '刀', e: '乇', f: '下', g: '厶',
      h: '卄', i: '工', j: '丁', k: '长', l: 'ㄥ', m: '爪', n: ' hostess ',
      o: 'ㄖ', p: '尸', q: 'ǫ', r: '尺', s: '丂', t: 'ㄒ', u: 'ㄩ',
      v: 'ᐯ', w: '山', x: '乂', y: 'ㄚ', z: '乙',
      A: '卂', B: '乃', C: '匚', D: '刀', E: '乇', F: '下', G: '厶',
      H: '卄', I: '工', J: '丁', K: '长', L: 'ㄥ', M: '爪', N: 'れ',
      O: 'ㄖ', P: '尸', Q: 'ǫ', R: '尺', S: '丂', T: 'ㄒ', U: 'ㄩ',
      V: 'ᐯ', W: '山', X: '乂', Y: 'ㄚ', Z: '乙',
    };
    return str.split('').map((char) => map[char] || char).join('');
  };

  const toJapaneseSim = (str: string): string => {
    const map: Record<string, string> = {
      a: 'ﾑ', b: '乃', c: 'ᄃ', d: 'Ð', e: '乇', f: 'ｷ', g: 'ム',
      h: 'ん', i: 'ﾉ', j: 'ﾌ', k: 'ズ', l: 'ﾚ', m: 'ᄊ', n: '刀',
      o: 'Ø', p: 'ｱ', q: 'φ', r: '尺', s: '丂', t: 'ｲ', u: 'Ц',
      v: 'V', w: 'W', x: 'ﾒ', y: 'ﾘ', z: '乙',
      A: 'ﾑ', B: '乃', C: 'ᄃ', D: 'Ð', E: '乇', F: 'ｷ', G: 'ム',
      H: 'ん', I: 'ﾉ', J: 'ﾌ', K: 'ズ', L: 'ﾚ', M: 'ᄊ', N: '刀',
      O: 'Ø', P: 'ｱ', Q: 'φ', R: '尺', S: '丂', T: 'ｲ', U: 'Ц',
      V: 'V', W: 'W', X: 'ﾒ', Y: 'ﾘ', Z: '乙',
    };
    return str.split('').map((char) => map[char] || char).join('');
  };

  const asianPresets = [
    { title: 'Estilo Kanji Falso', text: '尺卂尺ㄖ ﾘ 匚卄丨刀ㄖ', desc: 'Simulación de Caracteres' },
    { title: 'Katakana Anime', text: 'ﾑ刀ﾉᄊ乇 ズﾉ刀ム', desc: 'Estilo Japonés Anime' },
    { title: 'Dragón Legendario', text: '🐉 𓆩 龍 · 𝕯𝖗𝖆𝖌𝖔𝖓 𓆪 🐉', desc: 'Símbolo Dragón 龍' },
    { title: 'Samurái Guerrero', text: '⚔️ 侍 𝕾𝖆𝖒𝖚𝖗𝖆𝖎 侍 ⚔️', desc: 'Símbolo Samurái 侍' },
    { title: 'Flor de Cerezo Sakura', text: '🌸 𝒱𝒾𝒷𝑒𝓈 𝒮𝒶𝓀𝓊𝓇𝒶 桜 🌸', desc: 'Aesthetic Sakura 桜' },
    { title: 'Amor Eterno Kanji', text: '愛 𝓣𝓮 𝓐𝓶𝓸 愛', desc: 'Símbolo Amor 愛' },
    { title: 'Yin Yang Armonía', text: '☯️ 𝕻𝖆𝖟 & 𝕱𝖚𝖊𝖗𝖟𝖆 ☯️', desc: 'Equilibrio Taoísta' },
    { title: 'Fuerza & Honor', text: '力 𝓕𝓊𝑒𝓇𝓏𝒶 & 𝐻𝑜𝓃𝑜𝓇 力', desc: 'Símbolo Fuerza 力' },
  ];

  const simulatedVariations = React.useMemo(() => {
    const input = customWord.trim() || 'Tokyo';
    return [
      `卂${toSimulatedAsian(input)}丂`,
      `【 ${toJapaneseSim(input)} 】`,
      `🐉 龍 · ${toSimulatedAsian(input)} · 龍 🐉`,
      `🌸 桜 · ${toJapaneseSim(input)} · 桜 🌸`,
      `⚔️ 侍 ${input} 侍 ⚔️`,
      `愛 ${toSimulatedAsian(input)} 愛`,
    ];
  }, [customWord]);

  return (
    <section className="bg-gradient-to-br from-rose-950/40 via-slate-900 to-red-950/40 rounded-2xl border border-rose-800/40 p-6 sm:p-8 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 text-xl font-bold font-serif">
            漢字
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                🏮 Alfabetos Orientales & Kanji
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Letras Chinas, Japonesas & Kanji Simulados (Copiar y Pegar)
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onApplyText(toSimulatedAsian(customWord))}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all active:scale-95 shadow-md shadow-rose-600/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Aplicar al Conversor</span>
        </button>
      </div>

      {/* Asian Translator Box */}
      <div className="bg-slate-950/80 rounded-xl border border-rose-900/50 p-4 sm:p-6 mb-6 shadow-inner">
        <label className="block text-xs font-black uppercase tracking-wider text-rose-300 mb-2">
          Escribe cualquier palabra para traducir a Alfabeto Chino / Japonés Simulado:
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
            placeholder="Escribe aquí tu nombre..."
            maxLength={25}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-rose-900/60 bg-slate-900 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="button"
            onClick={() => onApplyText(customWord)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-rose-600/20"
          >
            Aplicar
          </button>
        </div>

        {/* Realtime Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {simulatedVariations.map((styled, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg border border-rose-950 bg-slate-900/90 hover:border-rose-500/60 transition-all group"
            >
              <span className="font-mono text-xs text-rose-200 truncate pr-2">
                {styled}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(styled)}
                className="p-1.5 rounded-md bg-rose-950 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors shrink-0 shadow-2xs"
                title="Copiar texto estilo chino"
              >
                {copiedItem === styled ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Asian Presets */}
      <h3 className="text-sm font-black uppercase tracking-wider text-rose-300 mb-3 flex items-center gap-2">
        <Star className="w-4 h-4 text-rose-400" />
        <span>Símbolos Kanji, Dragones & Letras Orientales Populares:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {asianPresets.map((preset, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-rose-900/40 bg-slate-950/70 shadow-xs hover:border-rose-500/50 transition-all group"
          >
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-0.5">
                {preset.desc}
              </span>
              <span className="font-bold text-sm text-white tracking-wide">
                {preset.text}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(preset.text)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs transition-all active:scale-95"
            >
              {copiedItem === preset.text ? (
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
