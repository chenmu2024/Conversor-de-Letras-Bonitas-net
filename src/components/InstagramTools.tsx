import React, { useState } from 'react';
import { 
  Instagram, 
  Sparkles, 
  Copy, 
  Check, 
  AlignCenter, 
  Layers, 
  Smile, 
  Smartphone, 
  Eye, 
  Flame, 
  Camera, 
  Heart, 
  Briefcase, 
  Plane, 
  Music, 
  Dumbbell, 
  Sparkle,
  Share2,
  ChevronRight,
  AtSign,
  Hash,
  Quote,
  Wand2,
  Sliders,
  BadgeCheck,
  Link,
  ShieldCheck
} from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { InstagramUsernameGenerator } from './InstagramUsernameGenerator';
import { InstagramCaptionIdeas } from './InstagramCaptionIdeas';
import { InstagramHashtagStudio } from './InstagramHashtagStudio';
import { InstagramDividers } from './InstagramDividers';
import { InstagramStoriesStudio } from './InstagramStoriesStudio';

interface InstagramToolsProps {
  onApplyText?: (text: string) => void;
}

const HIGHLIGHT_PAIRS = [
  { icon: '✈️', name: 'TRAVEL', id: 'hl-travel' },
  { icon: '💪', name: 'FITNESS', id: 'hl-fitness' },
  { icon: '☕', name: 'VLOGS', id: 'hl-vlogs' },
  { icon: '👗', name: 'OOTD', id: 'hl-ootd' },
  { icon: '🌸', name: 'LIFESTYLE', id: 'hl-life' },
  { icon: '💖', name: 'LOVE', id: 'hl-love' },
  { icon: '🐾', name: 'PETS', id: 'hl-pets' },
  { icon: '🍕', name: 'FOOD', id: 'hl-food' },
  { icon: '🎵', name: 'MUSIC', id: 'hl-music' },
  { icon: '📚', name: 'STUDY', id: 'hl-study' },
  { icon: '💼', name: 'WORK', id: 'hl-work' },
  { icon: '🎨', name: 'ART', id: 'hl-art' },
  { icon: '💌', name: 'Q&A', id: 'hl-qna' },
  { icon: '✨', name: 'MEMORIES', id: 'hl-memories' },
  { icon: '💄', name: 'BEAUTY', id: 'hl-beauty' },
  { icon: '🌿', name: 'SELF-CARE', id: 'hl-selfcare' },
];

const AESTHETIC_BULLETS = ['✨', '🌸', '✦', '🎀', '📍', '✈️', '💼', '📈', '🎬', '💌', '🎧', '📸', '☕', '🌿', '⚡', '🖤', 'ᥫ᭡', '🫧'];

export const InstagramTools: React.FC<InstagramToolsProps> = ({ onApplyText }) => {
  const [activeTab, setActiveTab] = useState<'bio-maker' | 'stories' | 'dividers' | 'quotes' | 'highlights' | 'centered' | 'captions' | 'usernames' | 'hashtags'>('bio-maker');

  // Bio Maker State
  const [nameLine, setNameLine] = useState('Sofia Morales');
  const [pronouns, setPronouns] = useState('ella / she');
  const [categoryLine, setCategoryLine] = useState('Creadora Digital · Moda & Viajes');
  const [line1, setLine1] = useState('Madrid, España ✈️');
  const [line2, setLine2] = useState('Amante del café y el estilo aesthetic ☕✨');
  const [line3, setLine3] = useState('Mis recomendaciones y presets gratis 👇');
  const [customLink, setCustomLink] = useState('mispicks.link/sofia');
  const [showVerified, setShowVerified] = useState(true);
  const [fontStyle, setFontStyle] = useState('italic-bold-serif');
  const [copiedBio, setCopiedBio] = useState(false);

  // Highlights Generator State
  const [customHighlight, setCustomHighlight] = useState('TRAVEL');
  const [copiedHighlight, setCopiedHighlight] = useState<string | null>(null);

  // Caption Spacer State
  const [captionText, setCaptionText] = useState(
    '¡Nuevo post en el feed! 🚀\n\nHoy te comparto 3 claves fundamentales para crear una presencia estética y profesional en redes sociales.\n\nGuarda este post para no perderlo 📌\n\n¿Cuál es tu tip favorito? Déjamelo en los comentarios 👇'
  );
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Centered Bio State
  const [rawCenterBio, setRawCenterBio] = useState('Bienvenida a mi espacio ✨\nFotografía & Estilo de Vida ☕\nMadrid ✈️\nContacto & Proyectos abajo 👇');
  const [centeredBioResult, setCenteredBioResult] = useState('');
  const [copiedCentered, setCopiedCentered] = useState(false);

  // Transform line using selected font
  const formatWithFont = (str: string, genId: string) => {
    const gen = FONT_GENERATORS.find((g) => g.id === genId);
    return gen ? gen.transform(str) : str;
  };

  // Compile full bio
  const compiledBio = `${formatWithFont(nameLine, fontStyle)}${pronouns ? ` (${pronouns})` : ''}\n${categoryLine}\n✦ ${line1}\n✦ ${line2}\n✦ ${line3}\n🔗 ${customLink}`;
  const totalBioChars = `${categoryLine}\n✦ ${line1}\n✦ ${line2}\n✦ ${line3}`.length;

  const handleCopyBio = async () => {
    try {
      await navigator.clipboard.writeText(compiledBio);
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
      if (onApplyText) onApplyText(compiledBio);
    } catch (e) {
      console.warn(e);
    }
  };

  // Centering logic using Unicode invisible spaces (ㅤ)
  const handleAutoCenter = () => {
    const lines = rawCenterBio.split('\n');
    const targetLength = 32; // Standard approx mobile center width
    const centeredLines = lines.map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      const spaceCount = Math.max(0, Math.floor((targetLength - trimmed.length) / 2));
      const spaces = INVISIBLE_SPACE.repeat(spaceCount);
      return `${spaces}${trimmed}`;
    });
    setCenteredBioResult(centeredLines.join('\n'));
  };

  const handleCopyCentered = async () => {
    const textToCopy = centeredBioResult || rawCenterBio;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedCentered(true);
      setTimeout(() => setCopiedCentered(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  // Caption with clean line breaks (replaces double enters with invisible spaces to avoid collapse)
  const handleCopyCleanCaption = async () => {
    const clean = captionText
      .split('\n')
      .map((l) => (l.trim() === '' ? `${INVISIBLE_SPACE}` : l))
      .join('\n');

    try {
      await navigator.clipboard.writeText(clean);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCopyHighlightWord = async (transformed: string, id: string) => {
    try {
      await navigator.clipboard.writeText(transformed);
      setCopiedHighlight(id);
      setTimeout(() => setCopiedHighlight(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div id="instagram-tools-section" className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 rounded-3xl border border-pink-200/80 p-5 sm:p-8 shadow-sm mb-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-pink-100/80">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-pink-500/20">
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                Instagram Studio VIP
              </span>
              <span className="text-xs text-pink-700 font-bold hidden sm:inline">
                Bio Aesthetic · Stories · Reels · Highlights
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight mt-0.5">
              Suite de Herramientas para Instagram: Bio, Stories y Posts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Diseña biografías estéticas, centra textos con espacio invisible y genera títulos para historias destacadas.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar">
          {[
            { id: 'bio-maker', label: 'Diseñador de Bio', icon: <Sparkles className="w-3.5 h-3.5 text-pink-500" /> },
            { id: 'stories', label: 'Stories & Reels Studio', icon: <Wand2 className="w-3.5 h-3.5 text-purple-500" /> },
            { id: 'dividers', label: 'Separadores & Emojis', icon: <Sliders className="w-3.5 h-3.5 text-rose-500" /> },
            { id: 'quotes', label: 'Frases & Captions', icon: <Quote className="w-3.5 h-3.5" /> },
            { id: 'highlights', label: 'Historias Destacadas', icon: <Camera className="w-3.5 h-3.5" /> },
            { id: 'usernames', label: 'Ideas de @Usuario', icon: <AtSign className="w-3.5 h-3.5" /> },
            { id: 'hashtags', label: 'Hashtags Virales', icon: <Hash className="w-3.5 h-3.5" /> },
            { id: 'centered', label: 'Centrar Bio (Invisible)', icon: <AlignCenter className="w-3.5 h-3.5" /> },
            { id: 'captions', label: 'Saltos en Pies de Foto', icon: <Layers className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-ig-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: BIO MAKER WITH LIVE MOCKUP */}
      {activeTab === 'bio-maker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Input Workbench */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Configura tu Biografía Aesthetic
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  totalBioChars > 150 ? 'bg-rose-100 text-rose-700 font-black' : 'bg-slate-100 text-slate-600'
                }`}>
                  Bio: {totalBioChars} / 150 caracteres
                </span>
              </div>
            </div>

            {/* Quick 1-Click Bio Template Presets */}
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                Plantillas Rápidas de Bio (1 Clic para Aplicar):
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  {
                    label: '🌸 Coquette / Soft',
                    name: 'Sofia Morales',
                    pronouns: 'ella / she',
                    cat: 'Creadora digital · Moda & Estilo 🎀',
                    l1: 'Madrid, España ✈️',
                    l2: 'Amante del café, libros y flores 🌷☕',
                    l3: 'Mis prendas favoritas y códigos 👇',
                    link: 'mispicks.link/sofia',
                    font: 'cursiva-bold'
                  },
                  {
                    label: '🖤 Dark Aesthetic',
                    name: 'Alex Rivera',
                    pronouns: 'él / he',
                    cat: 'Fotografía & Dirección de Arte 🎬',
                    l1: 'Barcelona · Berlín 📍',
                    l2: '35mm · Cinefilia · Arquitectura 🎞️',
                    l3: 'Portfolio & Galería Exclusiva 👇',
                    link: 'rivera.gallery',
                    font: 'gotica-fraktur'
                  },
                  {
                    label: '💼 Negocio & Emprendimiento',
                    name: 'Marketing Digital Pro',
                    pronouns: '',
                    cat: 'Consultoría & Estrategia Online 📈',
                    l1: '+500 marcas escaladas con éxito 🚀',
                    l2: 'Tips diarios de contenido viral 💡',
                    l3: 'Descarga tu Masterclass gratuita 👇',
                    link: 'marketingpro.com/guia',
                    font: 'bold-sans'
                  },
                  {
                    label: '🏋️ Fitness & Gym',
                    name: 'Lucas Fit Coach',
                    pronouns: 'él / he',
                    cat: 'Entrenador Personal & Nutrición 🔥',
                    l1: 'Transforma tu físico sin dietas locas 💪',
                    l2: 'Planes 100% personalizados 🥗',
                    l3: 'Agenda tu valoración gratis 👇',
                    link: 'lucasfit.com/asesoria',
                    font: 'bold-sans'
                  },
                  {
                    label: '✈️ Viajes & Nomad',
                    name: 'Nico Wanderlust',
                    pronouns: 'they / them',
                    cat: 'Viajero & Creador de Aventuras 🌍',
                    l1: '40 países y contando 🗺️',
                    l2: 'Guías mochileras & rutas secretas 🧭',
                    l3: 'Mira mi última guía de Japón 👇',
                    link: 'nicoviajes.blog',
                    font: 'small-caps'
                  },
                  {
                    label: '🛍️ Boutique & Joyería',
                    name: 'Lola Joyas & Accesorios',
                    pronouns: '',
                    cat: 'Joyería Artesanal en Plata 925 ✨',
                    l1: 'Diseños únicos hechos a mano 💍',
                    l2: 'Envíos gratis en compras +$50 📦',
                    l3: 'Compra en nuestra tienda online 👇',
                    link: 'lolajoyas.shop',
                    font: 'doble-trazo'
                  },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setNameLine(preset.name);
                      setPronouns(preset.pronouns);
                      setCategoryLine(preset.cat);
                      setLine1(preset.l1);
                      setLine2(preset.l2);
                      setLine3(preset.l3);
                      setCustomLink(preset.link);
                      setFontStyle(preset.font);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-all border border-pink-200/60 active:scale-95 shadow-2xs"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Style Selector for Name */}
            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Estilo de Letra para tu Nombre:
              </label>
              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
              >
                {FONT_GENERATORS.slice(0, 18).map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.transform('Tu Nombre')}
                  </option>
                ))}
              </select>
            </div>

            {/* Name input & Pronouns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Nombre de Perfil:
                  </label>
                  <span className={`text-[10px] font-mono ${nameLine.length > 30 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                    {nameLine.length}/30
                  </span>
                </div>
                <input
                  type="text"
                  value={nameLine}
                  onChange={(e) => setNameLine(e.target.value)}
                  placeholder="Ej: Sofia Morales"
                  className="w-full px-3.5 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Pronombres:
                </label>
                <input
                  type="text"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  placeholder="ella / she"
                  className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Categoría o Profesión:
              </label>
              <input
                type="text"
                value={categoryLine}
                onChange={(e) => setCategoryLine(e.target.value)}
                placeholder="Ej: Creador digital · Moda & Viajes"
                className="w-full px-3.5 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
              />
            </div>

            {/* Bullet points */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Líneas de la Descripción (Bio):
              </label>
              <input
                type="text"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                placeholder="Línea 1 (ej: Ubicación, pasatiempo)"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
              />
              <input
                type="text"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                placeholder="Línea 2 (ej: Frase inspiradora, pasión)"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
              />
              <input
                type="text"
                value={line3}
                onChange={(e) => setLine3(e.target.value)}
                placeholder="Línea 3 (ej: Llamado a la acción, enlace)"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
              />
            </div>

            {/* Link in bio */}
            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Enlace en la Bio (Link):
              </label>
              <div className="relative">
                <Link className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                  placeholder="tusitio.com o linktr.ee/tu_nombre"
                  className="w-full pl-8 pr-3.5 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
                />
              </div>
            </div>

            {/* Quick Aesthetic Symbols to insert */}
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                Insertar Símbolo Rápido en Línea 3:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {AESTHETIC_BULLETS.map((sym, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLine3((prev) => `${prev} ${sym}`)}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-pink-100 text-xs flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Copy Bio Button */}
            <button
              type="button"
              id="btn-copy-instagram-bio"
              onClick={handleCopyBio}
              className={`w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                copiedBio
                  ? 'bg-emerald-600 text-white shadow-emerald-600/25'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 text-white shadow-pink-500/25'
              }`}
            >
              {copiedBio ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Biografía Completa Copiada para Instagram! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Biografía Formateada para Instagram</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Realistic Instagram Mockup Preview */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xl p-5 overflow-hidden">
            {/* Header of Instagram Profile */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                  sofia_aesthetic
                </span>
                {showVerified && (
                  <BadgeCheck className="w-4 h-4 text-sky-500 fill-sky-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowVerified(!showVerified)}
                  className="text-[10px] text-slate-500 hover:text-pink-600 font-bold flex items-center gap-1"
                  title="Activar/Desactivar insignia de verificado"
                >
                  <ShieldCheck className="w-3 h-3 text-sky-500" />
                  <span>{showVerified ? 'Verificado ON' : 'Verificado OFF'}</span>
                </button>
              </div>
            </div>

            {/* Profile Avatar & Stats */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl font-black text-pink-600">
                    🌸
                  </div>
                </div>
              </div>

              <div className="flex-1 flex justify-around text-center">
                <div>
                  <span className="block font-black text-xs text-slate-900">48</span>
                  <span className="text-[10px] text-slate-500 font-medium">Posts</span>
                </div>
                <div>
                  <span className="block font-black text-xs text-slate-900">24.5k</span>
                  <span className="text-[10px] text-slate-500 font-medium">Seguidores</span>
                </div>
                <div>
                  <span className="block font-black text-xs text-slate-900">380</span>
                  <span className="text-[10px] text-slate-500 font-medium">Seguidos</span>
                </div>
              </div>
            </div>

            {/* Profile Bio Render */}
            <div className="space-y-1 mb-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-bold text-sm text-slate-900">
                  {formatWithFont(nameLine || 'Tu Nombre', fontStyle)}
                </h4>
                {pronouns && (
                  <span className="text-[11px] text-slate-400 font-medium">
                    ({pronouns})
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 block font-medium">
                {categoryLine || 'Creador de Contenido'}
              </span>

              <div className="text-xs text-slate-800 pt-1 leading-snug whitespace-pre-line font-sans space-y-0.5">
                {line1 && <div>✦ {line1}</div>}
                {line2 && <div>✦ {line2}</div>}
                {line3 && <div>✦ {line3}</div>}
              </div>

              {customLink && (
                <div className="pt-1.5 flex items-center gap-1 text-xs font-bold text-indigo-900">
                  <Link className="w-3 h-3 text-indigo-900 shrink-0" />
                  <span className="hover:underline truncate">{customLink}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="py-1.5 text-center text-xs font-extrabold bg-slate-100 rounded-xl text-slate-800 hover:bg-slate-200 transition-colors">
                Seguir
              </div>
              <div className="py-1.5 text-center text-xs font-extrabold bg-slate-100 rounded-xl text-slate-800 hover:bg-slate-200 transition-colors">
                Mensaje
              </div>
            </div>

            {/* Highlights Circles Mock */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-100">
              {[
                { icon: '✈️', name: 'ᴛʀᴀᴠᴇʟ' },
                { icon: '🎬', name: 'ᴠʟᴏɢs' },
                { icon: '👗', name: 'ᴏᴏᴛᴅ' },
                { icon: '☕', name: 'ᴄᴀꜰᴇ' },
                { icon: '💖', name: 'ʟᴏᴠᴇ' },
              ].map((h, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-xs shadow-2xs">
                    {h.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 tracking-tight">{h.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: STORIES & REELS STUDIO */}
      {activeTab === 'stories' && (
        <div>
          <InstagramStoriesStudio />
        </div>
      )}

      {/* TAB: DIVIDERS & EMOJI PALETTES */}
      {activeTab === 'dividers' && (
        <div>
          <InstagramDividers onInsertText={(t) => onApplyText && onApplyText(t)} />
        </div>
      )}

      {/* TAB: CAPTION & QUOTE IDEAS */}
      {activeTab === 'quotes' && (
        <div>
          <InstagramCaptionIdeas />
        </div>
      )}

      {/* TAB: USERNAMES IDEAS */}
      {activeTab === 'usernames' && (
        <div>
          <InstagramUsernameGenerator />
        </div>
      )}

      {/* TAB: HASHTAGS STUDIO */}
      {activeTab === 'hashtags' && (
        <div>
          <InstagramHashtagStudio />
        </div>
      )}

      {/* TAB: HIGHLIGHTS NAMES GENERATOR */}
      {activeTab === 'highlights' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
          <div>
            <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
              Historias Destacadas (Instagram Highlights)
            </span>
            <h3 className="font-extrabold text-lg text-slate-900">
              Generador de Títulos y Portadas para Historias Destacadas
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Los nombres cortos en Small Caps o Sans Negrita son la tendencia #1 para ordenar tus portadas de Instagram.
            </p>
          </div>

          {/* Custom Input */}
          <div className="max-w-md">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Escribe una palabra para tus Destacadas:
            </label>
            <input
              type="text"
              value={customHighlight}
              onChange={(e) => setCustomHighlight(e.target.value)}
              placeholder="Ej: TRAVEL, GYM, OOTD, RECETAS..."
              className="w-full px-4 py-2.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
            />
          </div>

          {/* Rendered Styles for the custom word */}
          <div>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              Estilos Recomendados para Portadas de Historias:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'small-caps', name: 'Small Caps (Tendencia #1)' },
                { id: 'bold-sans', name: 'Sans Negrita Limpia' },
                { id: 'italic-bold-serif', name: 'Cursiva Elegante' },
                { id: 'circles-filled', name: 'Círculo Negro' },
                { id: 'doble-trazo', name: 'Doble Trazo' },
                { id: 'burbujas-blancas', name: 'Círculo Blanco' },
              ].map((style) => {
                const gen = FONT_GENERATORS.find((g) => g.id === style.id) || FONT_GENERATORS[0];
                const transformed = gen.transform(customHighlight || 'HIGHLIGHT');
                const isCopied = copiedHighlight === style.id;

                return (
                  <div
                    key={style.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:border-pink-200 transition-all shadow-2xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{style.name}</div>
                      <div className="text-sm font-bold text-slate-900 truncate mt-0.5 font-mono">{transformed}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyHighlightWord(transformed, style.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all active:scale-95 shadow-2xs ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-pink-50 text-pink-600 border border-slate-200'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? '¡Listo!' : 'Copiar'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick preset words with Icons */}
          <div>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              Portadas Populares con Iconos Listas para Copiar (1 Clic):
            </span>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {HIGHLIGHT_PAIRS.map((item) => {
                const smallGen = FONT_GENERATORS.find((g) => g.id === 'small-caps');
                const textVal = smallGen ? smallGen.transform(item.name) : item.name;
                const fullCopy = `${item.icon} ${textVal}`;
                const isCopied = copiedHighlight === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCopyHighlightWord(fullCopy, item.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 shadow-2xs ${
                      isCopied
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white hover:bg-pink-50/50 text-slate-700 hover:text-pink-600 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-xs font-extrabold tracking-tight font-mono">{textVal}</span>
                    <span className="text-[9px] text-slate-400 mt-1">
                      {isCopied ? '¡Copiado!' : 'Tocar para copiar'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUTO CENTER BIO WITH INVISIBLE SPACE */}
      {activeTab === 'centered' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
          <div>
            <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
              Truco de Espacio Invisible [ㅤ]
            </span>
            <h3 className="font-extrabold text-lg text-slate-900">
              Centrador Automático de Biografía para Instagram
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Instagram no permite centrar textos con la barra espaciadora común porque la borra al guardar. Esta herramienta inserta la cantidad matemática exacta de <strong>espacios invisibles Unicode [ㅤ]</strong> para centrar cada línea en la app móvil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Input */}
            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                Escribe o pega tus líneas:
              </label>
              <textarea
                rows={5}
                value={rawCenterBio}
                onChange={(e) => setRawCenterBio(e.target.value)}
                placeholder="Escribe cada frase en una línea..."
                className="w-full p-3 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800"
              />
              <button
                type="button"
                onClick={handleAutoCenter}
                className="mt-2 w-full py-2 px-4 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
              >
                <AlignCenter className="w-4 h-4" />
                <span>Calcular y Aplicar Centrado Invisible</span>
              </button>
            </div>

            {/* Output Centered */}
            <div className="flex flex-col justify-between">
              <div>
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Resultado Centrado Listo para Pegar en tu Perfil:
                </label>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 min-h-[125px] font-sans text-xs text-slate-800 whitespace-pre leading-relaxed select-all">
                  {centeredBioResult || 'Haz clic en "Calcular y Aplicar Centrado" para ver el resultado.'}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyCentered}
                className={`mt-3 w-full py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                  copiedCentered
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-pink-500/25'
                }`}
              >
                {copiedCentered ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡Biografía Centrada Copiada! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Bio Centrada</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CAPTIONS & LINE BREAK SAVER */}
      {activeTab === 'captions' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
          <div>
            <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
              Conservador de Saltos de Línea (Line Break Fix)
            </span>
            <h3 className="font-extrabold text-lg text-slate-900">
              Formateador de Pies de Foto (Instagram Captions)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ¿Harto de que Instagram junte todos tus párrafos en un solo bloque feo e ilegible? Escribe aquí con saltos de línea y copia con espaciado protegido.
            </p>
          </div>

          <div className="space-y-4">
            <textarea
              rows={6}
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              placeholder="Escribe el texto de tu publicación con párrafos y saltos de línea..."
              className="w-full p-4 text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800 leading-relaxed"
            />

            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500 font-medium">
                {captionText.length} caracteres · Se preservarán todos los espacios en blanco
              </span>

              <button
                type="button"
                onClick={handleCopyCleanCaption}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 ${
                  copiedCaption
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-pink-500/25'
                }`}
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡Pie de Foto Copiado con Éxito! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar con Saltos Protegidos</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
