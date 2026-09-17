import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Globe, 
  Type, 
  FileText, 
  Users, 
  ShoppingBag, 
  Sliders,
  AlertCircle,
  Tag,
  ListOrdered,
  BadgeCheck,
  Send,
  Bold,
  Italic,
  Strikethrough,
  Code,
  CircleDot,
  RotateCcw,
  Smile,
  Shield,
  HelpCircle,
  Layers,
  Heart,
  Flame,
  ArrowRight
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { FacebookMarketplaceBuilder } from './FacebookMarketplaceBuilder';
import { FacebookPageNames } from './FacebookPageNames';
import { FacebookCommentsReactions } from './FacebookCommentsReactions';

interface FacebookStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

const FB_INTRO_PRESETS = [
  { label: '✨ Creador de Contenido', text: 'Creador Digital 🎬 | Compartiendo buenas vibras y contenido diario ✨' },
  { label: '💼 Negocio & Ventas', text: 'Envíos a todo el país 📦 | Atención personalizada 24/7 📲 Escríbenos al Inbox' },
  { label: '🌸 Aesthetic & Vlogs', text: 'Vive y deja vivir 🌿 | Coleccionando momentos mágicos 📸' },
  { label: '☕ Frase de Reflexión', text: 'Un día a la vez, disfrutando el proceso de la vida con gratitud ✨' },
  { label: '🎮 Gaming / Streamer', text: 'Streamer & Clips 🎮 | Partidas diarias, torneos y momentos épicos 🔥' },
  { label: '🏋️ Fitness & Salud', text: 'Entrenamiento & Motivación 💪 | Tu mejor versión empieza hoy 🥗' },
];

const FB_POST_STYLES = [
  { id: 'sans-bold', label: 'Negrita Sans (Titulares & Ofertas)', short: '𝗡 Negrita' },
  { id: 'sans-bold-italic', label: 'Negrita Cursiva (Énfasis Alto)', short: '𝙉𝙕 Cursiva Negrita' },
  { id: 'small-caps', label: 'Small Caps (Aesthetic & Moderno)', short: 'sᴍᴀʟʟ ᴄᴀᴘs' },
  { id: 'italic-serif', label: 'Cursiva Elegante (Reflexiones)', short: '𝘊𝘶𝘳𝘴𝘪𝘷𝘢' },
  { id: 'monospace', label: 'Máquina de Escribir (Vlogs)', short: '𝙼𝚘𝚗𝚘' },
  { id: 'circles-filled', label: 'Círculos Negros (Llamados de Acción)', short: '🅒 Círculos' },
  { id: 'double-struck', label: 'Doble Delineado (Avisos de Grupo)', short: '𝔻 Doble' },
  { id: 'strikethrough', label: 'Tachado (Precios Rebajados)', short: 'S̶ Tachado' },
];

const FB_POST_QUICK_HOOKS = [
  { label: '🔥 Oferta Limitada', text: '🔥 𝗔𝗧𝗘𝗡𝗖𝗜Ó𝗡: 𝗢𝗙𝗘𝗥𝗧𝗔 𝗘𝗫𝗖𝗟𝗨𝗦𝗜𝗩𝗔 𝗣𝗢𝗥 𝗧𝗜𝗘𝗠𝗣𝗢 𝗟𝗜𝗠𝗜𝗧𝗔𝗗𝗢 🔥\n\n📌 No te pierdas esta oportunidad única.\n👉 Escríbenos por mensaje privado para asegurar el tuyo.' },
  { label: '📢 Anuncio Importante', text: '📢 𝗖𝗢𝗠𝗨𝗡𝗜𝗖𝗔𝗗𝗢 𝗜𝗠𝗣𝗢𝗥𝗧𝗔𝗡𝗧𝗘 📢\n\nQuerida comunidad, hoy queremos compartir con todos ustedes una gran noticia que cambiará todo ✨' },
  { label: '❓ Pregunta Viral', text: '🤔 𝗣𝗥𝗘𝗚𝗨𝗡𝗧𝗔 𝗗𝗘𝗟 𝗗Í𝗔:\n\nSi pudieras viajar a cualquier lugar del mundo mañana mismo con todos los gastos pagados, ¿a dónde irías? ✈️\n\n👇 ¡Los leo en los comentarios!' },
  { label: '💡 Reflexión del Día', text: '✨ 𝗥𝗘𝗙𝗟𝗘𝗫𝗜Ó𝗡 𝗗𝗘 𝗛𝗢𝗬 ✨\n\n"El éxito no es la clave de la felicidad. La felicidad es la clave del éxito." Recuerda valorar cada pequeño paso que das hacia tus sueños 🌿' },
  { label: '🎁 Sorteo Semanal', text: '🎉 ¡𝗚𝗥𝗔𝗡 𝗦𝗢𝗥𝗧𝗘𝗢 𝗘𝗫𝗖𝗟𝗨𝗦𝗜𝗩𝗢! 🎉\n\n¿Quieres ganarte este premio especial? Participar es muy fácil:\n1️⃣ Dale Me Gusta a este post ❤️\n2️⃣ Etiqueta a 2 amigos 👥' }
];

export const FacebookStudio: React.FC<FacebookStudioProps> = ({
  onApplyText,
  initialText = 'Un día a la vez, disfrutando el proceso ✨',
}) => {
  const [activeTab, setActiveTab] = useState<
    'post-maker' | 'marketplace' | 'pages-groups' | 'comments-reactions' | 'intro-bio' | 'dividers'
  >('post-maker');

  const [postText, setPostText] = useState(initialText);
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedDivider, setCopiedDivider] = useState<string | null>(null);

  // Mockup Settings
  const [postContext, setPostContext] = useState<'profile' | 'page' | 'group' | 'marketplace'>('profile');
  const [authorName, setAuthorName] = useState('Tu Nombre / Perfil');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Facebook Bio Intro strictly 101 characters
  const maxIntroChars = 101;
  const introCharLen = Array.from(postText).length;
  const isIntroOver = introCharLen > maxIntroChars;

  const handleCopyPost = async () => {
    try {
      await navigator.clipboard.writeText(postText);
      setCopiedPost(true);
      setTimeout(() => setCopiedPost(false), 2000);
      if (onApplyText) onApplyText(postText);
    } catch (e) {
      console.warn('Copy post failed', e);
    }
  };

  const handleCopyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedDivider(txt);
    setTimeout(() => setCopiedDivider(null), 1800);
  };

  // Transform selected text or full text with a specific font
  const applyFontToSelection = (fontId: string) => {
    const gen = FONT_GENERATORS.find((g) => g.id === fontId);
    if (!gen) return;

    const textarea = textareaRef.current;
    if (!textarea) {
      setPostText((prev) => gen.transform(prev));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // If text is highlighted, only transform that selection
    if (start !== end && start >= 0 && end > start) {
      const selectedText = postText.substring(start, end);
      const transformed = gen.transform(selectedText);
      const newText = postText.substring(0, start) + transformed + postText.substring(end);
      setPostText(newText);

      // Restore selection after state update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(start, start + transformed.length);
        }
      }, 0);
    } else {
      // If nothing selected, transform the entire text
      setPostText(gen.transform(postText || 'Tu publicación aquí'));
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-white shrink-0 border border-white/20 shadow-md">
              <FileText className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/30 text-[10px] font-black uppercase tracking-wider text-blue-200">
                  Facebook Suite Pro
                </span>
                <span className="text-xs text-blue-100/80 font-bold hidden sm:inline">
                  Negritas · Marketplace · Nombres de Páginas · Comentarios · Bio (101 Chars)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5">
                Letras Bonitas & Diseñador de Publicaciones para Facebook
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/80 mt-1">
                Genera titulares en Negrita Sans, fichas de Marketplace con precios tachados, nombres para páginas y comentarios destacados.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyPost}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 shrink-0 ${
              copiedPost 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white text-blue-900 hover:bg-blue-50'
            }`}
            title="Copiar texto actual formateado"
          >
            {copiedPost ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>¡Copiado para Facebook!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Publicación</span>
              </>
            )}
          </button>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/10">
          {[
            { id: 'post-maker', label: 'Maquetador con Formato Selectivo', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'marketplace', label: 'Ventas & Marketplace', icon: <ShoppingBag className="w-3.5 h-3.5 text-amber-300" /> },
            { id: 'pages-groups', label: 'Nombres de Páginas & Grupos', icon: <Users className="w-3.5 h-3.5 text-cyan-300" /> },
            { id: 'comments-reactions', label: 'Comentarios & Sorteos', icon: <MessageSquare className="w-3.5 h-3.5 text-rose-300" /> },
            { id: 'intro-bio', label: 'Bio / Presentación (101 Chars)', icon: <Type className="w-3.5 h-3.5 text-blue-300" /> },
            { id: 'dividers', label: 'Separadores & Viñetas FB', icon: <Sliders className="w-3.5 h-3.5 text-indigo-300" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-fb-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-950 shadow-md scale-102 font-black'
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
        {/* TAB 1: POST MAKER WITH INLINE FORMATTING TOOLBAR & 1:1 SIMULATOR */}
        {activeTab === 'post-maker' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Post Editor */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                    Escribe tu Estado o Publicación para Facebook:
                  </label>
                  <span className="text-xs text-slate-500 font-bold">
                    {Array.from(postText).length} caracteres · {postText.trim() ? postText.trim().split(/\s+/).length : 0} palabras
                  </span>
                </div>

                {/* Inline Formatting Toolbar */}
                <div className="p-2 bg-slate-100/90 rounded-t-2xl border-t border-x border-slate-200 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase px-1 hidden sm:inline">
                    Formatear Selección:
                  </span>

                  {FB_POST_STYLES.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => applyFontToSelection(st.id)}
                      className="px-2 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg text-xs font-bold transition-all shadow-2xs active:scale-95"
                      title={`Aplicar ${st.label} al texto seleccionado`}
                    >
                      {st.short}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setPostText('')}
                    className="ml-auto p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors text-xs"
                    title="Limpiar texto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Text Area */}
                <textarea
                  ref={textareaRef}
                  rows={6}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Escribe aquí... Puedes seleccionar una frase y pulsar [𝗡 Negrita] en la barra superior para resaltar solo esa parte."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-b-2xl text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-y"
                />
                <p className="text-[10px] text-slate-400 mt-1 pl-1">
                  💡 <strong>Tip pro:</strong> Resalta con el ratón o dedo una palabra (como el precio o título) y toca cualquier botón de estilo para formatear solo esa parte.
                </p>
              </div>

              {/* Quick Hooks & Templates */}
              <div>
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Plantillas Rápidas con Formato (1-Clic para cargar):
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {FB_POST_QUICK_HOOKS.map((hook, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPostText(hook.text)}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold transition-all border border-slate-200 active:scale-95"
                    >
                      {hook.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy & Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyPost}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md ${
                    copiedPost ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                  }`}
                >
                  {copiedPost ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>¡Copiado para Facebook! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Publicación Completa</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right 5 Columns: 1:1 Live Facebook Feed Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              {/* Context Selector Buttons (Profile, Page, Group, Marketplace) */}
              <div className="w-full max-w-sm flex items-center justify-between gap-1 mb-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {[
                  { id: 'profile', label: '👤 Perfil' },
                  { id: 'page', label: '🏢 Página Oficial' },
                  { id: 'group', label: '👥 Grupo' },
                ].map((ctx) => (
                  <button
                    key={ctx.id}
                    type="button"
                    onClick={() => {
                      setPostContext(ctx.id as any);
                      if (ctx.id === 'page') setAuthorName('Tienda & Creador Oficial');
                      else if (ctx.id === 'group') setAuthorName('Admin en Grupo Oficial');
                      else setAuthorName('Tu Nombre / Perfil');
                    }}
                    className={`flex-1 py-1 rounded-lg text-[11px] font-extrabold transition-all text-center ${
                      postContext === ctx.id
                        ? 'bg-white text-blue-700 shadow-2xs font-black'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {ctx.label}
                  </button>
                ))}
              </div>

              {/* Live Facebook Post Card */}
              <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-4 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                      {postContext === 'page' ? '🏢' : postContext === 'group' ? '👥' : '👤'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <div className="font-extrabold text-xs text-slate-900 leading-none">
                          {authorName}
                        </div>
                        {postContext === 'page' && (
                          <span title="Página Verificada">
                            <BadgeCheck className="w-3.5 h-3.5 text-blue-600 inline" />
                          </span>
                        )}
                        {postContext === 'group' && (
                          <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-extrabold">
                            Admin
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-1">
                        <span>Hace un momento</span>
                        <span>·</span>
                        <Globe className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="text-sm font-medium text-slate-900 break-words leading-relaxed my-2 py-2 min-h-[90px] whitespace-pre-line select-all">
                  {postText || 'Escribe tu publicación para verla en vivo como se verá en el feed de Facebook...'}
                </div>

                {/* Reaction Simulation */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-[9px]">👍</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-rose-500 text-white rounded-full text-[9px]">❤️</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-amber-500 text-white rounded-full text-[9px]">🔥</span>
                    <span className="font-bold ml-1">248</span>
                  </div>
                  <div>
                    <span>32 comentarios · 14 compartidos</span>
                  </div>
                </div>

                {/* FB Action Bar */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600 font-bold">
                  <div className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-50">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Me gusta</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-50">
                    <MessageSquare className="w-4 h-4" />
                    <span>Comentar</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-50">
                    <Share2 className="w-4 h-4" />
                    <span>Compartir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MARKETPLACE BUILDER */}
        {activeTab === 'marketplace' && (
          <FacebookMarketplaceBuilder
            onApplyPost={(txt) => {
              setPostText(txt);
              setActiveTab('post-maker');
            }}
          />
        )}

        {/* TAB 3: PAGES & GROUPS NAMES */}
        {activeTab === 'pages-groups' && <FacebookPageNames />}

        {/* TAB 4: COMMENTS & REACTIONS */}
        {activeTab === 'comments-reactions' && <FacebookCommentsReactions />}

        {/* TAB 5: PROFILE INTRO / BIO (101 CHARACTERS) */}
        {activeTab === 'intro-bio' && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 leading-relaxed">
                <strong>Referencia de Facebook:</strong> La sección "Presentación / Información personal" de Facebook admite comúnmente hasta <strong>101 caracteres aproximados</strong>. Si excedes esta longitud, el texto puede cortarse en las vistas móviles.
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Tu Presentación de Facebook:
                </label>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  isIntroOver ? 'bg-rose-100 text-rose-700 font-extrabold' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {introCharLen}/{maxIntroChars} caracteres {isIntroOver && '(¡Límite de 101 excedido!)'}
                </span>
              </div>

              <textarea
                rows={3}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Escribe tu presentación o bio para Facebook..."
                className={`w-full px-4 py-3 rounded-2xl text-sm font-medium focus:outline-hidden focus:ring-2 resize-none ${
                  isIntroOver
                    ? 'bg-rose-50 border-rose-300 text-rose-900 focus:ring-rose-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-blue-500 focus:bg-white'
                }`}
              />
            </div>

            {/* Presets */}
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                Plantillas Rápidas para Bio Intro (1-Clic para cargar):
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {FB_INTRO_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPostText(p.text)}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-all border border-blue-200/60 active:scale-95"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyPost}
              className={`w-full py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md ${
                copiedPost ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-black text-white active:scale-95'
              }`}
            >
              {copiedPost ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Intro Copiada para Facebook!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Presentación (101 Chars)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* TAB 6: DIVIDERS & BULLETS FOR FB POSTS */}
        {activeTab === 'dividers' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Líneas de Separación Estéticas para Publicaciones Largas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1 mb-3">
                Organiza las publicaciones de tu Página o perfil con líneas divisoras estéticas para que tus seguidores lean el contenido fácilmente:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '━━━━━━━━━━━━━━━━━━━━',
                  '════════════════════',
                  '────────── ✦ ──────────',
                  '─── ⋆⋅☆⋅⋆ ───',
                  '• • • • • • • • • • • • • •',
                  '▪▫▪▫▪▫▪▫▪▫▪▫▪▫▪▫▪▫▪▫',
                  '✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧',
                  '— — — — — — — — — — — —',
                ].map((divLine, i) => {
                  const isCopied = copiedDivider === divLine;

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCopyText(divLine)}
                      className={`p-3 rounded-xl border font-mono text-xs font-bold transition-all flex items-center justify-between px-4 ${
                        isCopied
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 hover:bg-blue-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      <span>{divLine}</span>
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bullets and Symbols for Bullet Lists */}
            <div className="border-t border-slate-200 pt-5">
              <h3 className="font-extrabold text-sm text-slate-900 mb-2">
                Viñetas y Símbolos de Énfasis para Listas de Facebook
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['👉', '✔️', '✨', '🔥', '📍', '📦', '🏷️', '💰', '📌', '💡', '🌟', '✦', '★', '◆', '❶', '❷'].map((symbol, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCopyText(symbol)}
                    className="p-3 bg-slate-50 hover:bg-blue-100 rounded-xl text-lg font-bold text-center border border-slate-200 transition-transform active:scale-90"
                    title={`Copiar ${symbol}`}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
