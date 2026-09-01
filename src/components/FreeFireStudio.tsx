import React, { useState } from 'react';
import { 
  Flame, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldAlert, 
  Palette, 
  Gamepad2, 
  Zap, 
  Crown, 
  Crosshair,
  UserCheck,
  AlertCircle,
  Trophy,
  Shield,
  Heart,
  Flag,
  EyeOff,
  Star,
  Swords,
  Layers
} from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { FreeFireClanNames } from './FreeFireClanNames';
import { FreeFireSymbols } from './FreeFireSymbols';
import { FreeFireCouples } from './FreeFireCouples';
import { FreeFireFlagsSignatures } from './FreeFireFlagsSignatures';
import { FreeFireInvisibleSpaces } from './FreeFireInvisibleSpaces';

interface FreeFireStudioProps {
  onApplyText?: (text: string) => void;
  initialNick?: string;
}

const FF_CLAN_DECORATIONS = [
  { id: '1', name: 'Alas Divinas', left: '꧁༺', right: '༻꧂', example: '꧁༺ ɴɪɴᴊᴀ ༻꧂' },
  { id: '2', name: 'Corona de Rey', left: '亗 ', right: ' 亗', example: '亗 ᴋɪɴɢ 亗' },
  { id: '3', name: 'Clan Boss', left: 'ᴮᴼˢˢ★', right: '', example: 'ᴮᴼˢˢ★ ᴛᴇᴀᴍ' },
  { id: '4', name: 'Rayos Insanos', left: '⚡ ', right: ' ⚡', example: '⚡ ɪɴsᴀɴᴏ ⚡' },
  { id: '5', name: 'Espadas Cruzadas', left: '⚔️ ', right: ' ⚔️', example: '⚔️ ᴅᴜᴇʟᴏ ⚔️' },
  { id: '6', name: 'Cruz Gótica', left: '† ', right: ' †', example: '† ꜱʜᴀᴅᴏᴡ †' },
  { id: '7', name: 'Estrellas VIP', left: '✪ ', right: ' ✪', example: '✪ ʟᴇɢᴇɴᴅ ✪' },
  { id: '8', name: 'Toxic Skull', left: '☠️ ', right: ' ☠️', example: '☠️ ᴛᴏxɪᴄ ☠️' },
  { id: '9', name: 'Corazón Árabe', left: 'ᥫ᭡ ', right: ' ✨', example: 'ᥫ᭡ ɴɪñᴏ ✨' },
  { id: '10', name: 'Flor Sakura', left: '🌸 ', right: ' 🌸', example: '🌸 ᴀɴɢᴇʟ 🌸' },
];

const FF_COLOR_CODES = [
  { name: 'Rojo Fuego', code: '[FF0000]', hex: '#EF4444' },
  { name: 'Verde Neón', code: '[00FF00]', hex: '#22C55E' },
  { name: 'Amarillo Oro', code: '[FFFF00]', hex: '#EAB308' },
  { name: 'Cian Diamante', code: '[00FFFF]', hex: '#06B6D4' },
  { name: 'Rosa Pasión', code: '[FF00FF]', hex: '#EC4899' },
  { name: 'Naranja Insano', code: '[FFA500]', hex: '#F97316' },
  { name: 'Morado Épico', code: '[800080]', hex: '#A855F7' },
  { name: 'Negrita Centrado', code: '[b][c]', hex: '#475569' },
];

export const FreeFireStudio: React.FC<FreeFireStudioProps> = ({
  onApplyText,
  initialNick = 'insano',
}) => {
  const [activeTab, setActiveTab] = useState<
    'nick-generator' | 'couples' | 'clans' | 'flags-signatures' | 'symbols' | 'spaces' | 'bio-colors'
  >('nick-generator');

  const [nickName, setNickName] = useState(initialNick);
  const [selectedDeco, setSelectedDeco] = useState(FF_CLAN_DECORATIONS[0]);
  const [useSmallCaps, setUseSmallCaps] = useState(true);
  const [clanTag, setClanTag] = useState('亗');
  const [includeSpace, setIncludeSpace] = useState(true);
  const [copiedNick, setCopiedNick] = useState(false);
  const [copiedSpace, setCopiedSpace] = useState(false);

  // Bio Signature Color State
  const [signatureText, setSignatureText] = useState('Solo clasificatoria heroico');
  const [selectedColor, setSelectedColor] = useState(FF_COLOR_CODES[0]);
  const [copiedSignature, setCopiedSignature] = useState(false);

  // Transform Nickname with Small Caps helper
  const smallCapsGen = FONT_GENERATORS.find((g) => g.id === 'small-caps') || FONT_GENERATORS[0];
  const transformedCore = useSmallCaps ? smallCapsGen.transform(nickName) : nickName;
  const separator = includeSpace ? INVISIBLE_SPACE : '';
  
  const fullNick = `${selectedDeco.left}${separator}${transformedCore}${separator}${selectedDeco.right}`.trim();
  
  // Real Character Count for Free Fire (Limit 12 chars in game)
  const ffCharLength = Array.from(fullNick).length;
  const isTooLong = ffCharLength > 12;

  // Bio signature result with color tags
  const fullSignature = `${selectedColor.code}${signatureText}`;

  const handleCopyNick = async () => {
    try {
      await navigator.clipboard.writeText(fullNick);
      setCopiedNick(true);
      setTimeout(() => setCopiedNick(false), 2000);
      if (onApplyText) onApplyText(fullNick);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handleCopySpace = async () => {
    try {
      await navigator.clipboard.writeText(INVISIBLE_SPACE);
      setCopiedSpace(true);
      setTimeout(() => setCopiedSpace(false), 2000);
    } catch (e) {
      console.warn('Copy space failed', e);
    }
  };

  const handleCopySignature = async () => {
    try {
      await navigator.clipboard.writeText(fullSignature);
      setCopiedSignature(true);
      setTimeout(() => setCopiedSignature(false), 2000);
    } catch (e) {
      console.warn('Copy signature failed', e);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 border border-white/30 shadow-lg">
              <Flame className="w-6 h-6 text-amber-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-black/30 text-[10px] font-black uppercase tracking-wider text-amber-200">
                  Gaming Studio Pro
                </span>
                <span className="text-xs text-white/80 font-bold hidden sm:inline">
                  Free Fire · 12 Chars Safe · Dúos · Banderas · Espacio [ㅤ]
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5">
                Creador de Nicks Insanos & Letras para Free Fire
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Genera nombres para clanes, parejas (dúo dinámico), banderas de países, códigos de color y espacios invisibles de 12 caracteres.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopySpace}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 shrink-0 ${
              copiedSpace 
                ? 'bg-emerald-500 text-white' 
                : 'bg-slate-900/95 hover:bg-black text-amber-300 border border-amber-400/40'
            }`}
            title="Copiar espacio invisible para separar nombres en Free Fire"
          >
            {copiedSpace ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>¡Espacio [ㅤ] Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Espacio Invisible [ㅤ]</span>
              </>
            )}
          </button>
        </div>

        {/* Studio Tabs */}
        <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/20">
          {[
            { id: 'nick-generator', label: 'Creador de Nick Insano', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
            { id: 'couples', label: 'Dúos Dinámicos (Parejas)', icon: <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200" /> },
            { id: 'clans', label: 'Nombres de Clanes & Squads', icon: <Trophy className="w-3.5 h-3.5 text-amber-200" /> },
            { id: 'flags-signatures', label: 'Banderas & Firmas Pro', icon: <Flag className="w-3.5 h-3.5 text-cyan-200" /> },
            { id: 'symbols', label: 'Símbolos & V de Verificado', icon: <Crosshair className="w-3.5 h-3.5" /> },
            { id: 'spaces', label: 'Espacio Invisible (3 Tipos)', icon: <EyeOff className="w-3.5 h-3.5 text-amber-200" /> },
            { id: 'bio-colors', label: 'Códigos de Color HEX', icon: <Palette className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-ff-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white text-slate-950 shadow-md scale-102 font-black'
                  : 'bg-black/20 text-white/90 hover:bg-black/30'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-7">
        {activeTab === 'nick-generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Nick Generator */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-amber-500" />
                    Escribe tu Nick Base:
                  </span>
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                    isTooLong ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {ffCharLength}/12 letras {isTooLong && '(¡Máximo 12 en Free Fire!)'}
                  </span>
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    placeholder="Ej: insano, rey, boss"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Quick Small Caps & Invisible Space Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">
                        Letras Small Caps
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {smallCapsGen.transform(nickName || 'nick')} (100% Pro)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseSmallCaps(!useSmallCaps)}
                    className={`px-3 py-1 rounded-xl font-bold text-xs transition-colors ${
                      useSmallCaps ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {useSmallCaps ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                  <div className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">
                        Espacio Invisible [ㅤ]
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Separación limpia
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeSpace(!includeSpace)}
                    className={`px-3 py-1 rounded-xl font-bold text-xs transition-colors ${
                      includeSpace ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {includeSpace ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Clan Wings & Symbols Selector */}
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                  Elige el Marco / Alas de tu Clan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {FF_CLAN_DECORATIONS.map((deco) => {
                    const isSelected = selectedDeco.id === deco.id;
                    return (
                      <button
                        key={deco.id}
                        type="button"
                        onClick={() => setSelectedDeco(deco)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs scale-102 font-black'
                            : 'bg-slate-50 hover:bg-amber-50/50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-black truncate">{deco.left}...{deco.right}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                          {deco.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nick Result Card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                <div className="w-full text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Resultado para tu Nick en Free Fire:
                  </span>
                  <div className="text-lg sm:text-xl font-black text-white font-mono tracking-wider truncate mt-0.5">
                    {fullNick}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyNick}
                  className={`w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                    copiedNick ? 'bg-emerald-500 text-white' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  }`}
                >
                  {copiedNick ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>¡Nick Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Nick</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right 5 Columns: In-Game Profile Simulator Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm bg-[#121820] text-slate-100 rounded-3xl border border-amber-500/30 p-5 shadow-2xl space-y-4 relative overflow-hidden">
                {/* Gold Glow Top */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Free Fire Profile Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-black tracking-wider text-amber-400 uppercase">
                      Free Fire · Tarjeta de Jugador
                    </span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-400/30">
                    NIVEL 75
                  </span>
                </div>

                {/* Avatar & Rank */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 p-[2px] shadow-lg">
                      <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-2xl">
                        🥷
                      </div>
                    </div>
                    <span className="absolute -bottom-1.5 -right-1.5 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow">
                      亗
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-base font-black text-white font-mono truncate tracking-wide">
                      {fullNick || '亗 ɪɴsᴀɴᴏ 亗'}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-medium">
                      <span>UID: 123456789</span>
                      <span>·</span>
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> 9999+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rank & Stats */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">BR - Clasificatoria</span>
                    <span className="text-xs font-black text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                      <Crown className="w-3.5 h-3.5 text-amber-400" /> Gran Maestro
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">DE - Clasificatoria</span>
                    <span className="text-xs font-black text-rose-400 flex items-center justify-center gap-1 mt-0.5">
                      <Flame className="w-3.5 h-3.5 text-rose-500" /> Heroico ⭐ 85
                    </span>
                  </div>
                </div>

                {/* Bio / Signature */}
                <div className="bg-black/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block">
                    Firma de Perfil:
                  </span>
                  <div className="text-xs font-bold text-slate-200 font-sans truncate">
                    [b][c][FF0000]亗 [FFFF00]HEROICO [FF0000]亗
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-500 font-medium">
                  Así lucirá tu Nick dentro de la sala de espera y perfil de Free Fire.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COUPLES & DÚOS */}
        {activeTab === 'couples' && <FreeFireCouples />}

        {/* TAB 3: CLAN & SQUAD NAMES */}
        {activeTab === 'clans' && <FreeFireClanNames />}

        {/* TAB 4: FLAGS & PRO SIGNATURES */}
        {activeTab === 'flags-signatures' && <FreeFireFlagsSignatures />}

        {/* TAB 5: SYMBOLS & V DE VERIFICADO */}
        {activeTab === 'symbols' && <FreeFireSymbols />}

        {/* TAB 6: INVISIBLE SPACES (3 SIZES) */}
        {activeTab === 'spaces' && <FreeFireInvisibleSpaces />}

        {/* TAB 7: BIO COLORS */}
        {activeTab === 'bio-colors' && (
          <div className="max-w-xl mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-base text-slate-900">
                Generador de Códigos de Color para la Bio y Firma de Free Fire
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pega este código al inicio de tu mensaje en la firma de tu perfil para cambiar el color de tu texto en el juego.
            </p>

            <label className="text-[11px] font-bold text-slate-700 block">
              Texto de tu Firma:
            </label>
            <input
              type="text"
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
            />

            <label className="text-[11px] font-bold text-slate-700 block">
              Selecciona Color:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FF_COLOR_CODES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`p-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                    selectedColor.code === c.code ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                Resultado para Copiar a la Bio:
              </span>
              <div className="font-mono text-sm font-bold select-all bg-slate-800 p-2.5 rounded-xl">
                {fullSignature}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopySignature}
              className={`w-full py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md ${
                copiedSignature ? 'bg-emerald-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              }`}
            >
              {copiedSignature ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Código de Firma</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
