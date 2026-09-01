import React, { useState } from 'react';
import { Heart, Copy, Check, Sparkles, Users, Flame, Crown, Zap, Shield } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface CouplePreset {
  id: string;
  name: string;
  p1: string;
  p2: string;
  tag: string;
}

const COUPLE_PRESETS: CouplePreset[] = [
  { id: '1', name: 'Rey & Reina Imperial', p1: '꧁ঔৣ☬ 𝓚𝓘𝓝𝓖 ☬ঔৣ꧂', p2: '꧁ঔৣ☬ 𝓠𝓤𝓔𝓔𝓝 ☬ঔৣ꧂', tag: 'Realeza' },
  { id: '2', name: 'Bonnie & Clyde (Clan 亗)', p1: '亗 ＢＯＮＮＩＥ 亗', p2: '亗 ＣＬＹＤＥ 亗', tag: 'Dúo Insano' },
  { id: '3', name: 'Joker & Harley ⚡', p1: '⚡ ᴊᴏᴋᴇʀ ⚡', p2: '⚡ ʜᴀʀʟᴇʏ ⚡', tag: 'Tóxicos' },
  { id: '4', name: 'Ángel & Demonio 🖤', p1: '🌸 𝒜𝓃𝑔𝑒𝓁 🌸', p2: '🖤 𝒟𝑒𝓋𝒾𝓁 🖤', tag: 'Aesthetic' },
  { id: '5', name: 'Sin Ti & Sin Mí 🥀', p1: '† Տɪɴ ᵀᴵ 🥀', p2: '† Տɪɴ ᴹᴵ 🥀', tag: 'Amor Sad' },
  { id: '6', name: 'Sol & Luna ✨', p1: '°• ѕυη ☀️ •°', p2: '°• мσση 🌙 •°', tag: 'Cósmico' },
  { id: '7', name: 'Insano & Insana 🔥', p1: '⚡ ɪɴsᴀɴᴏ ⚡', p2: '⚡ ɪɴsᴀɴᴀ ⚡', tag: 'Tryhard' },
  { id: '8', name: 'Mi Niño & Mi Niña ᥫ᭡', p1: 'ᥫ᭡ ᴍɪ ɴɪñᴏ ✨', p2: 'ᥫ᭡ ᴍɪ ɴɪñᴀ ✨', tag: 'Tierno' },
  { id: '9', name: 'Boss & Lady 👑', p1: 'ᴮᴼˢˢ★ ᴋɪɴɢ', p2: 'ᴮᴼˢˢ★ ʟᴀᴅʏ', tag: 'Clan VIP' },
  { id: '10', name: 'Toxic Boy & Toxic Girl ☠️', p1: '☠️ ᴛᴏxɪᴄ ʙᴏʏ', p2: '☠️ ᴛᴏxɪᴄ ɢɪʀʟ', tag: 'Dúo Tóxico' },
  { id: '11', name: 'Romeo & Julieta 🌹', p1: '🌹 ʀᴏᴍᴇᴏ 🌹', p2: '🌹 ᴊᴜʟɪᴇᴛᴀ 🌹', tag: 'Romántico' },
  { id: '12', name: 'Adán & Eva 🍎', p1: '亗 ᴀᴅᴀɴ 亗', p2: '亗 ᴇᴠᴀ 亗', tag: 'Clásico' },
];

const DUO_FRAMES = [
  { id: 'alas', label: 'Alas ꧁༺ ༻꧂', left: '꧁༺ ', right: ' ༻꧂' },
  { id: 'corona', label: 'Corona 亗', left: '亗 ', right: ' 亗' },
  { id: 'rayo', label: 'Rayo ⚡', left: '⚡ ', right: ' ⚡' },
  { id: 'cruz', label: 'Cruz †', left: '† ', right: ' †' },
  { id: 'corazon', label: 'Corazón ᥫ᭡', left: 'ᥫ᭡ ', right: ' ✨' },
  { id: 'estrella', label: 'Estrellas ✪', left: '✪ ', right: ' ✪' },
];

export const FreeFireCouples: React.FC = () => {
  const [customP1, setCustomP1] = useState('Alex');
  const [customP2, setCustomP2] = useState('Valen');
  const [selectedFrame, setSelectedFrame] = useState(DUO_FRAMES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const smallCapsGen = FONT_GENERATORS.find((g) => g.id === 'small-caps') || FONT_GENERATORS[0];

  const transformedP1 = `${selectedFrame.left}${smallCapsGen.transform(customP1)}${selectedFrame.right}`.trim();
  const transformedP2 = `${selectedFrame.left}${smallCapsGen.transform(customP2)}${selectedFrame.right}`.trim();

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Dúo Dinámico FF
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Nicks Combinados para Parejas y Mejores Amigos
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span>Nicks para Parejas y Dúo Dinámico en Free Fire</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Personaliza los nombres de tu Dúo Dinámico con marcos simétricos (Alas, Coronas 亗, Rayos ⚡ y Letras Small Caps) o copia combinaciones virales ya listas.
        </p>
      </div>

      {/* Custom Duo Generator */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/70 via-orange-50/50 to-amber-50/50 border border-rose-200/70 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-600" />
          <h4 className="font-extrabold text-sm text-slate-900">
            Creador Personalizado de Nicks para tu Dúo:
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Jugador 1 / Él / Dúo 1:
            </label>
            <input
              type="text"
              value={customP1}
              onChange={(e) => setCustomP1(e.target.value)}
              placeholder="Ej: Alex"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Jugador 2 / Ella / Dúo 2:
            </label>
            <input
              type="text"
              value={customP2}
              onChange={(e) => setCustomP2(e.target.value)}
              placeholder="Ej: Valen"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
        </div>

        {/* Frames Selection */}
        <div>
          <label className="text-[11px] font-extrabold text-slate-700 block mb-1.5">
            Elige el Marco o Símbolo Combinado:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {DUO_FRAMES.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFrame(f)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                  selectedFrame.id === f.id
                    ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                    : 'bg-white hover:bg-rose-50/50 text-slate-700 border-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Live Pair */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Card P1 */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 flex items-center justify-between gap-2 shadow-inner">
            <div className="min-w-0">
              <span className="text-[10px] text-rose-400 font-bold uppercase block">Jugador 1:</span>
              <div className="font-mono text-sm font-black truncate text-white">{transformedP1}</div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(transformedP1, 'custom-p1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                copiedId === 'custom-p1' ? 'bg-emerald-500 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              {copiedId === 'custom-p1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar 1</span>
            </button>
          </div>

          {/* Card P2 */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 flex items-center justify-between gap-2 shadow-inner">
            <div className="min-w-0">
              <span className="text-[10px] text-rose-400 font-bold uppercase block">Jugador 2:</span>
              <div className="font-mono text-sm font-black truncate text-white">{transformedP2}</div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(transformedP2, 'custom-p2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                copiedId === 'custom-p2' ? 'bg-emerald-500 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              {copiedId === 'custom-p2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar 2</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Couples List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Nicks Virales para Dúos Dinámicos (Listos para Copiar):</span>
          </h4>
          <span className="text-xs text-slate-500 font-bold">12 Combinaciones</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {COUPLE_PRESETS.map((pair) => {
            const isCopied1 = copiedId === `p1-${pair.id}`;
            const isCopied2 = copiedId === `p2-${pair.id}`;
            const isCopiedBoth = copiedId === `both-${pair.id}`;

            return (
              <div
                key={pair.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-rose-300 transition-all shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 font-black flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>{pair.name}</span>
                  </span>
                  <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200 font-bold uppercase">
                    {pair.tag}
                  </span>
                </div>

                {/* Nick 1 */}
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {pair.p1}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(pair.p1, `p1-${pair.id}`)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                      isCopied1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700'
                    }`}
                  >
                    {isCopied1 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied1 ? 'Copiado' : 'Copiar 1'}</span>
                  </button>
                </div>

                {/* Nick 2 */}
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {pair.p2}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(pair.p2, `p2-${pair.id}`)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                      isCopied2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700'
                    }`}
                  >
                    {isCopied2 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied2 ? 'Copiado' : 'Copiar 2'}</span>
                  </button>
                </div>

                {/* Copy Both */}
                <button
                  type="button"
                  onClick={() => handleCopy(`${pair.p1} & ${pair.p2}`, `both-${pair.id}`)}
                  className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isCopiedBoth ? 'bg-emerald-600 text-white' : 'bg-slate-200/80 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  {isCopiedBoth ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopiedBoth ? '¡Ambos Copiados!' : 'Copiar Ambos Nicks'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
