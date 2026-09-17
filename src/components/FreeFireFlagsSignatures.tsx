import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, Flag, ShieldCheck, Flame, Crown, Award, Star } from 'lucide-react';

interface FlagPreset {
  id: string;
  country: string;
  emoji: string;
  code: string;
  previewColors: string[];
}

const COUNTRY_FLAGS: FlagPreset[] = [
  {
    id: 'mx',
    country: 'México',
    emoji: '🇲🇽',
    code: '[008000]█[FFFFFF]█[FF0000]█',
    previewColors: ['#008000', '#FFFFFF', '#FF0000'],
  },
  {
    id: 'ar',
    country: 'Argentina',
    emoji: '🇦🇷',
    code: '[75AADB]█[FFFFFF]█[75AADB]█',
    previewColors: ['#75AADB', '#FFFFFF', '#75AADB'],
  },
  {
    id: 'co',
    country: 'Colombia',
    emoji: '🇨🇴',
    code: '[FFCD00]██[003087]█[C8102E]█',
    previewColors: ['#FFCD00', '#FFCD00', '#003087', '#C8102E'],
  },
  {
    id: 'es',
    country: 'España',
    emoji: '🇪🇸',
    code: '[AA151B]█[F1BF00]██[AA151B]█',
    previewColors: ['#AA151B', '#F1BF00', '#F1BF00', '#AA151B'],
  },
  {
    id: 'cl',
    country: 'Chile',
    emoji: '🇨🇱',
    code: '[0039A6]█[FFFFFF]█[D52B1E]█',
    previewColors: ['#0039A6', '#FFFFFF', '#D52B1E'],
  },
  {
    id: 'pe',
    country: 'Perú',
    emoji: '🇵🇪',
    code: '[D91023]█[FFFFFF]█[D91023]█',
    previewColors: ['#D91023', '#FFFFFF', '#D91023'],
  },
  {
    id: 'br',
    country: 'Brasil',
    emoji: '🇧🇷',
    code: '[009739]█[FEDD00]◆[009739]█',
    previewColors: ['#009739', '#FEDD00', '#009739'],
  },
  {
    id: 've',
    country: 'Venezuela',
    emoji: '🇻🇪',
    code: '[FFCC00]█[00247D]█[CF142B]█',
    previewColors: ['#FFCC00', '#00247D', '#CF142B'],
  },
  {
    id: 'ec',
    country: 'Ecuador',
    emoji: '🇪🇨',
    code: '[FFDD00]██[034EA2]█[ED1C24]█',
    previewColors: ['#FFDD00', '#FFDD00', '#034EA2', '#ED1C24'],
  },
  {
    id: 'gt',
    country: 'Guatemala',
    emoji: '🇬🇹',
    code: '[4997D0]█[FFFFFF]█[4997D0]█',
    previewColors: ['#4997D0', '#FFFFFF', '#4997D0'],
  },
  {
    id: 'us',
    country: 'Estados Unidos',
    emoji: '🇺🇸',
    code: '[B22234]█[3C3B6E]█[FFFFFF]█',
    previewColors: ['#B22234', '#3C3B6E', '#FFFFFF'],
  },
  {
    id: 'bo',
    country: 'Bolivia',
    emoji: '🇧🇴',
    code: '[D52B1E]█[FCD116]█[007934]█',
    previewColors: ['#D52B1E', '#FCD116', '#007934'],
  },
];

interface ProSignaturePreset {
  id: string;
  title: string;
  code: string;
  preview: string;
  tag: string;
}

const PRO_SIGNATURES: ProSignaturePreset[] = [
  {
    id: 'sig-1',
    title: 'Ⓥ Estilo Influencer Verificado',
    code: '[b][c][ffd319]Ⓥ [ffffff]JUGADOR PRO',
    preview: 'Ⓥ JUGADOR PRO',
    tag: 'Influencer',
  },
  {
    id: 'sig-2',
    title: '👑 Heroico / Top Global Insano',
    code: '[b][c][ff0000]亗 [ffff00]HEROICO [ff0000]亗',
    preview: '亗 HEROICO 亗',
    tag: 'Rango',
  },
  {
    id: 'sig-3',
    title: 'ᥫ᭡ Dúo Dinámico Nivel 5',
    code: '[b][c][ff007f]ᥫ᭡ [ffffff]DÚO DINÁMICO NIVEL 5 💍',
    preview: 'ᥫ᭡ DÚO DINÁMICO NIVEL 5 💍',
    tag: 'Amor',
  },
  {
    id: 'sig-4',
    title: '⚡ Clan Líder & Capitán',
    code: '[b][c][00ffff]⚡ [ffffff]LÍDER DE CLAN [00ffff]⚡',
    preview: '⚡ LÍDER DE CLAN ⚡',
    tag: 'Competitivo',
  },
  {
    id: 'sig-5',
    title: '💎 Diamantes & Pase Élite',
    code: '[b][c][00ffff]💎 [ffd700]PASE ÉLITE VIP 💎',
    preview: '💎 PASE ÉLITE VIP 💎',
    tag: 'VIP',
  },
  {
    id: 'sig-6',
    title: '💀 Solo Tiro a la Cabeza (100% HS)',
    code: '[b][c][ff0000]☠️ [ffffff]SOLO ROJOS / 100% HS 🎯',
    preview: '☠️ SOLO ROJOS / 100% HS 🎯',
    tag: 'Tryhard',
  },
];

export const FreeFireFlagsSignatures: React.FC = () => {
  const [selectedFlag, setSelectedFlag] = useState(COUNTRY_FLAGS[0]);
  const [flagCustomText, setFlagCustomText] = useState('Heroico');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Full Flag Code
  const fullFlagResult = `${selectedFlag.code} ${flagCustomText}`.trim();

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
          <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Banderas & Firmas Pro FF
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Códigos HEX y Banderas con Bloques de Color [███]
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <Flag className="w-5 h-5 text-amber-500" />
          <span>Generador de Banderas de Países y Firmas Pro para Free Fire</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Pega estos códigos en tu perfil / firma de Free Fire para lucir la bandera de tu país con bloques de colores o las insignias Ⓥ de jugador verificado.
        </p>
      </div>

      {/* Flag Generator Section */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <Flag className="w-4 h-4" />
            <span>Creador de Banderas de Países:</span>
          </span>
          <span className="text-[10px] text-slate-400">Códigos de color HEX</span>
        </div>

        {/* Flag Selector */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {COUNTRY_FLAGS.map((flag) => {
            const isSelected = selectedFlag.id === flag.id;
            return (
              <button
                key={flag.id}
                type="button"
                onClick={() => setSelectedFlag(flag)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm scale-102 font-black'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                }`}
              >
                <span className="text-base">{flag.emoji}</span>
                <span className="text-[10px] truncate">{flag.country}</span>
              </button>
            );
          })}
        </div>

        {/* Custom text next to flag */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-8">
            <label className="text-[11px] font-bold text-slate-300 block mb-1">
              Texto al lado de la bandera:
            </label>
            <input
              type="text"
              value={flagCustomText}
              onChange={(e) => setFlagCustomText(e.target.value)}
              placeholder="Ej: Heroico / Mi Clan"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-400 font-bold"
            />
          </div>

          <div className="sm:col-span-4 flex flex-col justify-end">
            <button
              type="button"
              onClick={() => handleCopy(fullFlagResult, 'flag-code')}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                copiedId === 'flag-code'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              }`}
            >
              {copiedId === 'flag-code' ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Bandera</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-3 bg-black/50 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">
            Código generado (Listo para pegar en la Firma):
          </span>
          <div className="font-mono text-xs text-amber-300 break-all select-all">
            {fullFlagResult}
          </div>
        </div>
      </div>

      {/* Pro Signatures & Verified Creator Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Firmas con "V de Verificado" e Insignias Especiales FF:</span>
          </h4>
          <span className="text-xs text-slate-500 font-bold">Listas para Copiar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PRO_SIGNATURES.map((sig) => {
            const isCopied = copiedId === sig.id;
            return (
              <div
                key={sig.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span className="text-slate-900 font-black truncate">{sig.title}</span>
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200 font-bold uppercase">
                      {sig.tag}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                    <span className="text-[10px] text-slate-400 block font-sans">Vista previa en juego:</span>
                    <p className="text-amber-400 font-bold">{sig.preview}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(sig.code, sig.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-black text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>¡Código Copiado! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código de Firma</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
