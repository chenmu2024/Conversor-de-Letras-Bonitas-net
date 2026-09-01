import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Flame, 
  AtSign, 
  Smile, 
  Music, 
  TrendingUp, 
  Heart,
  Video,
  UserCheck,
  Hash,
  Sliders,
  Type,
  BadgeCheck,
  ShieldCheck,
  Link,
  Layers,
  Zap,
  MessageSquare
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { TikTokHashtags } from './TikTokHashtags';
import { TikTokVideoText } from './TikTokVideoText';
import { TikTokViralHooks } from './TikTokViralHooks';
import { TikTokSecretEmojis } from './TikTokSecretEmojis';
import { TikTokCaptionStudio } from './TikTokCaptionStudio';

interface TikTokStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

const TIKTOK_KAOMOJIS = [
  { label: 'Feliz / Kawaii', text: '(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤' },
  { label: 'Aesthetic Sparkle', text: '✧⁠◝⁠(⁠⁰⁠▿⁠⁰⁠)⁠◜⁠✧' },
  { label: 'Paz & Amor', text: '(⁠人⁠ ⁠•͈⁠ᴗ⁠•͈⁠)' },
  { label: 'Sad Boy / Emo', text: '(⁠´⁠;⁠︵⁠;⁠`⁠)' },
  { label: 'Gamer / Guiño', text: '(⁠◠⁠‿⁠◕⁠)' },
  { label: 'Chill / Relax', text: '(⁠◡⁠ ⁠ω⁠ ⁠◡⁠)' },
  { label: 'Amor Enamorado', text: '(⁠灬⁠º⁠‿⁠º⁠灬⁠)⁠♡' },
  { label: 'Misterioso', text: '(⁠⌐⁠■⁠-⁠■⁠)' },
];

const TIKTOK_BIO_PRESETS = [
  {
    label: '🌸 Soft / Aesthetic',
    name: 'Valeria Morales',
    font: 'cursiva-bold',
    text: 'Aesthetic girl · Dance & Vlogs ✨\nMadrid 📍 | Presets gratis abajo 👇',
    handle: 'valeria.aesthetic',
  },
  {
    label: '🎮 Gamer / Streamer',
    name: 'Alex PvP Insano',
    font: 'gotica-fraktur',
    text: 'Directos todos los días 🎮 | Clips & Highlights 🔥\n1vs1 salas abiertas ⚔️',
    handle: 'alex_gamer_ff',
  },
  {
    label: '💃 Dance / Trends',
    name: 'Camila Dance',
    font: 'sans-bold',
    text: 'Bailando y creando contenido 🎧 💖\nNuevos trends cada semana ✨',
    handle: 'its.camidance',
  },
  {
    label: '🖤 Dark / Cyber Y2K',
    name: 'Dante Noir',
    font: 'small-caps',
    text: 'Cyber vibe 🕷️ | No acepto críticas ☕\n35mm & Visual Arts 🎬',
    handle: 'dante.archive',
  },
  {
    label: '✈️ Travel / Vlogs',
    name: 'Nico Rutas',
    font: 'doble-trazo',
    text: 'Viajando por el mundo 🌍 | Capturando historias 📸\nPróximo destino: Japón ✈️',
    handle: 'nicoviajes_vlog',
  },
  {
    label: '💼 Negocios & Creador',
    name: 'Emprende Conmigo',
    font: 'bold-sans',
    text: 'Tips diarios para escalar tu marca 📈\n+100k alumnos formados 🚀\nGuía gratis 👇',
    handle: 'emprende.digital',
  },
];

export const TikTokStudio: React.FC<TikTokStudioProps> = ({
  onApplyText,
  initialText = 'Aesthetic girl · Dance & Vlogs ✨\nMadrid 📍 | Presets abajo 👇',
}) => {
  const [activeTab, setActiveTab] = useState<'bio-maker' | 'secret-emojis' | 'viral-hooks' | 'video-text' | 'captions' | 'hashtags' | 'usernames'>('bio-maker');

  // Bio state
  const [profileName, setProfileName] = useState('Valeria Morales');
  const [nameFont, setNameFont] = useState('cursiva-bold');
  const [bioText, setBioText] = useState(initialText);
  const [customLink, setCustomLink] = useState('linktr.ee/valeria_aesthetic');
  const [showVerified, setShowVerified] = useState(true);
  const [copiedBio, setCopiedBio] = useState(false);

  // Username generator state
  const [usernameSeed, setUsernameSeed] = useState('valeria');
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  // TikTok Bio strictly 80 characters
  const maxChars = 80;
  const charLength = Array.from(bioText).length;
  const isOver = charLength > maxChars;

  // Format visible name with font
  const formatNameWithFont = (str: string, genId: string) => {
    const gen = FONT_GENERATORS.find((g) => g.id === genId);
    return gen ? gen.transform(str) : str;
  };

  const handleCopyBio = async () => {
    try {
      await navigator.clipboard.writeText(bioText);
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
      if (onApplyText) onApplyText(bioText);
    } catch (e) {
      console.warn('Copy bio failed', e);
    }
  };

  const handleInsertKaomoji = (k: string) => {
    setBioText((prev) => `${prev} ${k}`.trim());
  };

  // Generate aesthetic usernames for TikTok categorized
  const usernameVariants = [
    { handle: `${usernameSeed.toLowerCase()}.aesthetic`, tag: 'Aesthetic' },
    { handle: `its.${usernameSeed.toLowerCase()}_`, tag: 'Minimalista' },
    { handle: `${usernameSeed.toLowerCase()}vibes`, tag: 'Chill' },
    { handle: `${usernameSeed.toLowerCase()}.pov`, tag: 'POV Creator' },
    { handle: `${usernameSeed.toLowerCase()}official_`, tag: 'Oficial' },
    { handle: `sad.${usernameSeed.toLowerCase()}x`, tag: 'Dark / Emo' },
    { handle: `${usernameSeed.toLowerCase()}.clips`, tag: 'Clips / Edits' },
    { handle: `${usernameSeed.toLowerCase()}dance_`, tag: 'Baile' },
    { handle: `by.${usernameSeed.toLowerCase()}`, tag: 'Marca' },
    { handle: `the${usernameSeed.toLowerCase()}club`, tag: 'Comunidad' },
    { handle: `${usernameSeed.toLowerCase()}core_`, tag: 'Tendencia' },
    { handle: `${usernameSeed.toLowerCase()}.diary`, tag: 'Diario' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-white shrink-0 border border-white/20 shadow-lg">
              <Video className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-pink-500/30 text-[10px] font-black uppercase tracking-wider text-pink-300">
                  TikTok Viral Suite Pro
                </span>
                <span className="text-xs text-white/70 font-bold hidden sm:inline">
                  Bio 80 Letras · Emojis Secretos · Ganchos FYP · CapCut
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5">
                Generador de Biografías, Emojis Secretos y Textos para TikTok
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Personaliza tu nombre con letras bonitas, controla el límite estricto de 80 caracteres y usa los emojis secretos de TikTok.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${
              isOver ? 'bg-rose-500 text-white shadow-rose-500/30 shadow-md' : 'bg-white/10 text-emerald-300 border border-white/20'
            }`}>
              Bio: {charLength}/{maxChars} letras
            </span>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/10">
          {[
            { id: 'bio-maker', label: 'Diseñador de Bio (80 Caracteres)', icon: <Sparkles className="w-3.5 h-3.5 text-pink-400" /> },
            { id: 'secret-emojis', label: 'Emojis Secretos [códigos]', icon: <Smile className="w-3.5 h-3.5 text-amber-400" /> },
            { id: 'viral-hooks', label: 'Ganchos Virales (3s Hooks)', icon: <Zap className="w-3.5 h-3.5 text-yellow-400" /> },
            { id: 'video-text', label: 'Texto de Video & CapCut', icon: <Type className="w-3.5 h-3.5 text-pink-400" /> },
            { id: 'captions', label: 'Descripciones & Saltos', icon: <Layers className="w-3.5 h-3.5 text-purple-400" /> },
            { id: 'hashtags', label: 'Hashtags Virales FYP', icon: <Hash className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'usernames', label: 'Ideas de @Usuario', icon: <AtSign className="w-3.5 h-3.5 text-emerald-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-tiktok-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-md scale-102'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
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
        {/* TAB 1: BIO MAKER WITH LIVE TIKTOK MOCKUP */}
        {activeTab === 'bio-maker' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Bio Styler & Presets */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  Configurador de Perfil y Biografía de TikTok
                </h3>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  isOver ? 'bg-rose-100 text-rose-700 font-black' : 'bg-slate-100 text-slate-600'
                }`}>
                  {isOver ? `Exceso: +${charLength - maxChars}` : `Restan: ${maxChars - charLength}`}
                </span>
              </div>

              {/* Quick 1-Click Bio Presets */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Plantillas de Perfil Populares (1-Clic para Aplicar):
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {TIKTOK_BIO_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setProfileName(preset.name);
                        setNameFont(preset.font);
                        setBioText(preset.text);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-all border border-pink-200/60 active:scale-95 shadow-2xs"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Name & Font Styler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                    Nombre Visible en TikTok:
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Tu Nombre Visible"
                    className="w-full px-3.5 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                    Estilo de Letra para tu Nombre:
                  </label>
                  <select
                    value={nameFont}
                    onChange={(e) => setNameFont(e.target.value)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white"
                  >
                    {FONT_GENERATORS.slice(0, 16).map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} — {g.transform('Nombre')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio Text Area */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Texto de la Biografía (Máximo 80 Caracteres):
                  </label>
                  <span className={`text-[10px] font-mono ${isOver ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                    {charLength}/80
                  </span>
                </div>

                <textarea
                  rows={3}
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  placeholder="Escribe tu biografía..."
                  className={`w-full px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm focus:outline-hidden focus:ring-2 transition-all resize-none ${
                    isOver 
                      ? 'bg-rose-50 border-rose-300 text-rose-900 focus:ring-rose-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-pink-500/20 focus:bg-white focus:border-pink-500'
                  }`}
                />
              </div>

              {/* Link Input */}
              <div>
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Enlace de Perfil (Link):
                </label>
                <div className="relative">
                  <Link className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customLink}
                    onChange={(e) => setCustomLink(e.target.value)}
                    placeholder="linktr.ee/tu_usuario"
                    className="w-full pl-8 pr-3.5 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              {/* Quick Kaomoji Inserter */}
              <div>
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Smile className="w-3.5 h-3.5 text-pink-500" />
                  <span>Símbolos y Kaomojis Virales (Toca para insertar):</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIKTOK_KAOMOJIS.map((k, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleInsertKaomoji(k.text)}
                      className="p-2 bg-slate-50 hover:bg-pink-50 hover:border-pink-300 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold transition-all text-center truncate shadow-2xs active:scale-95"
                    >
                      <div className="text-xs font-mono">{k.text}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">{k.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy Bio Button */}
              <button
                type="button"
                id="btn-copy-tiktok-bio"
                onClick={handleCopyBio}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                  copiedBio 
                    ? 'bg-emerald-600 text-white shadow-emerald-600/25' 
                    : 'bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-pink-500/25'
                }`}
              >
                {copiedBio ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡Biografía Copiada para TikTok! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Biografía Completa</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Live TikTok Dark Profile Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm bg-black text-white rounded-3xl border border-zinc-800 p-5 shadow-2xl relative overflow-hidden">
                {/* TikTok Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-zinc-800 pb-2.5">
                  <span className="font-bold text-white flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-pink-500" />
                    TikTok Perfil
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowVerified(!showVerified)}
                    className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-cyan-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 transition-colors"
                    title="Activar/Desactivar insignia de verificado"
                  >
                    <BadgeCheck className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                    <span>{showVerified ? 'Verificado ON' : 'Verificado OFF'}</span>
                  </button>
                </div>

                {/* Avatar & Username */}
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-[2.5px] mx-auto mb-2.5 shadow-lg">
                    <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-3xl">
                      🌸
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    <div className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                      {formatNameWithFont(profileName || 'Tu Nombre', nameFont)}
                    </div>
                    {showVerified && (
                      <BadgeCheck className="w-4 h-4 text-cyan-400 fill-cyan-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    @{usernameSeed.toLowerCase() || 'usuario'}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-around text-center my-3 py-2 border-y border-zinc-800/80 text-xs">
                  <div>
                    <div className="font-black text-white text-sm">248</div>
                    <div className="text-[10px] text-slate-400">Siguiendo</div>
                  </div>
                  <div>
                    <div className="font-black text-white text-sm">85.4K</div>
                    <div className="text-[10px] text-slate-400">Seguidores</div>
                  </div>
                  <div>
                    <div className="font-black text-white text-sm">2.1M</div>
                    <div className="text-[10px] text-slate-400">Me gusta</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 my-3">
                  <div className="flex-1 py-2 rounded-xl bg-pink-600 text-center font-extrabold text-xs text-white shadow-xs">
                    Seguir
                  </div>
                  <div className="p-2 px-3 rounded-xl bg-zinc-800 text-center font-bold text-xs text-slate-300">
                    ✉️
                  </div>
                </div>

                {/* Live Bio Preview Area */}
                <div className="p-3 bg-zinc-900/90 rounded-2xl border border-zinc-800 text-xs text-center text-slate-200 font-medium whitespace-pre-line leading-relaxed break-words my-2 min-h-[50px] flex items-center justify-center">
                  {bioText || 'Escribe tu bio arriba para verla aquí ✨'}
                </div>

                {customLink && (
                  <div className="text-[11px] text-center text-cyan-400 font-bold mt-2 truncate flex items-center justify-center gap-1">
                    <Link className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{customLink}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SECRET EMOJIS */}
        {activeTab === 'secret-emojis' && <TikTokSecretEmojis />}

        {/* TAB 3: VIRAL HOOKS */}
        {activeTab === 'viral-hooks' && <TikTokViralHooks />}

        {/* TAB 4: VIDEO OVERLAY TEXT */}
        {activeTab === 'video-text' && <TikTokVideoText />}

        {/* TAB 5: CAPTIONS & LINE BREAKS */}
        {activeTab === 'captions' && <TikTokCaptionStudio />}

        {/* TAB 6: HASHTAGS VIRALES FYP */}
        {activeTab === 'hashtags' && <TikTokHashtags />}

        {/* TAB 7: USERNAMES GENERATOR */}
        {activeTab === 'usernames' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2">
              <AtSign className="w-5 h-5 text-pink-600" />
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  Generador de Ideas para @Nombre de Usuario en TikTok
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Genera combinaciones disponibles y memorables para tu cuenta según tu nicho.
                </p>
              </div>
            </div>

            <div className="max-w-md">
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Palabra clave o apodo:
              </label>
              <input
                type="text"
                value={usernameSeed}
                onChange={(e) => setUsernameSeed(e.target.value.replace(/[^a-zA-Z0-9._]/g, ''))}
                placeholder="Ej: valeria, sofia, gamer"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {usernameVariants.map((item, i) => {
                const isCopied = copiedTag === item.handle;
                return (
                  <div
                    key={i}
                    className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 flex items-center justify-between gap-2 text-xs font-mono font-bold text-slate-800 hover:border-pink-300 transition-all shadow-2xs"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold text-pink-600 uppercase block">{item.tag}</span>
                      <span className="truncate block mt-0.5">@{item.handle}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(item.handle);
                        setCopiedTag(item.handle);
                        setTimeout(() => setCopiedTag(null), 2000);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 transition-all active:scale-95 shadow-2xs ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-pink-50 text-pink-600 border border-slate-200'
                      }`}
                    >
                      {isCopied ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? '¡Listo!' : 'Copiar'}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200/80 text-xs text-pink-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Diferencia clave en TikTok:</strong> El <em>@nombre_de_usuario</em> (handle) solo admite letras simples, números y puntos. Las <strong>letras bonitas y tipografías artísticas</strong> deben usarse en el <em>Nombre Visible de Perfil</em> (arriba en la pestaña "Diseñador de Bio") y en la <em>Biografía</em>.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
