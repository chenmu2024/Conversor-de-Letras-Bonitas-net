import React from 'react';
import { PageRoute } from '../types';
import { Sparkles, Instagram, MessageCircle, Flame, Wand2 } from 'lucide-react';

export interface RouteHeaderInfo {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  gradient: string;
}

export const ROUTE_HEADERS: Record<PageRoute, RouteHeaderInfo> = {
  inicio: {
    title: 'Conversor de Letras Bonitas y Fuentes para Copiar y Pegar',
    subtitle: 'Bienvenido al Conversor de Letras Bonitas online: transforma cualquier texto en más de 80 fuentes de letras bonitas, cursivas y nicks gamer para copiar y pegar con un solo clic.',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    badge: 'Conversor de Letras Bonitas · 80+ Fuentes',
    gradient: 'from-indigo-600 to-violet-600',
  },
  instagram: {
    title: 'Letras Bonitas para Instagram (Bio, Stories y Posts)',
    subtitle: 'Convierte tus frases y nombres en tipografías elegantes, cursivas y llamativas para destacar tu perfil de Instagram.',
    icon: <Instagram className="w-4 h-4 text-pink-500" />,
    badge: 'Optimizado para IG Bio',
    gradient: 'from-pink-600 to-rose-600',
  },
  tiktok: {
    title: 'Letras Bonitas para TikTok - Nombres y Biografías Aesthetic',
    subtitle: 'Tipografías virales, nicks decorados y letras aesthetic para nombres de usuario y descripciones de TikTok.',
    icon: <span className="font-black text-xs text-slate-900">TT</span>,
    badge: 'Viral en TikTok',
    gradient: 'from-slate-900 to-indigo-900',
  },
  whatsapp: {
    title: 'Fuentes y Letras para WhatsApp (Estados, Nombres y Chats)',
    subtitle: 'Pon letras en negrita, cursiva, tachado, invertidas y círculos en tus mensajes de WhatsApp sin instalar apps.',
    icon: <MessageCircle className="w-4 h-4 text-emerald-500" />,
    badge: 'Compatible WhatsApp',
    gradient: 'from-emerald-600 to-teal-600',
  },
  facebook: {
    title: 'Letras Bonitas para Facebook - Negritas, Cursivas y Posts',
    subtitle: 'Destaca tus estados, publicaciones de grupos y comentarios de Facebook con fuentes en negrita, cursiva y decoradas.',
    icon: <span className="font-black text-xs text-blue-600">f</span>,
    badge: 'Optimizado Facebook',
    gradient: 'from-blue-600 to-indigo-700',
  },
  'letras-chidas': {
    title: 'Letras Chidas para Copiar y Pegar (Nicks, TikTok y Free Fire)',
    subtitle: 'Generador número 1 de letras chidas, fuentes aesthetic, nicks insanos con alas y tipografías perronas para México y LATAM.',
    icon: <Flame className="w-4 h-4 text-amber-500" />,
    badge: '🇲🇽 Top Letras Chidas',
    gradient: 'from-amber-600 via-orange-600 to-red-600',
  },
  'letras-elegantes': {
    title: 'Letras Elegantes para Copiar y Pegar (Caligrafía y Cursiva)',
    subtitle: 'Tipografías finas, manuscritas de lujo, firmas digitales y letras script elegantes para perfiles y dedicatorias.',
    icon: <span className="font-serif italic font-bold text-indigo-600">𝓔</span>,
    badge: '💎 Tipografía Fina',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
  },
  'letras-raras': {
    title: 'Letras Raras y Símbolos Extraños para Copiar y Pegar',
    subtitle: 'Caracteres Unicode ocultos, alfabetos estilo oriental, glitch zalgo, textos al revés y símbolos misteriosos.',
    icon: <span className="font-bold text-xs text-purple-600">尺</span>,
    badge: '🔮 Glifos Exóticos',
    gradient: 'from-purple-700 via-indigo-900 to-slate-900',
  },
  'letras-tatuajes': {
    title: 'Letras para Tatuajes (Góticas, Cursivas & Números Romanos)',
    subtitle: 'Simulador de tipografías tattoo, caligrafía fina para antebrazo, costillas y números romanos para fechas especiales.',
    icon: <span className="font-serif font-bold text-xs text-amber-600">💉</span>,
    badge: '💉 Especial Tatuajes',
    gradient: 'from-stone-900 via-stone-800 to-amber-900',
  },
  'nicks-free-fire': {
    title: 'Generador de Nicks para Free Fire (Alas, Insanos & ⓥ)',
    subtitle: 'Crea nombres con alas ꧁༺ ༻꧂, coronas de rey 亗, V de verificado ⓥ y el espacio invisible [ㅤ] para Free Fire.',
    icon: <Flame className="w-4 h-4 text-red-500" />,
    badge: '🎮 Nicks Gamer',
    gradient: 'from-red-600 via-orange-600 to-amber-600',
  },
  'letras-chinas': {
    title: 'Letras Chinas y Japonesas Kanji Simuladas (Copiar y Pegar)',
    subtitle: 'Transforma cualquier texto a caracteres orientales simulados (尺卂尺ㄖ), katakana anime y kanji auténticos (愛, 龍, 侍).',
    icon: <span className="font-bold text-xs text-rose-600">漢</span>,
    badge: '🏮 Alfabetos Orientales',
    gradient: 'from-rose-700 via-red-800 to-slate-900',
  },
  'espacio-invisible': {
    title: 'Espacio Invisible y Letra Invisible [ㅤ] para Copiar y Pegar',
    subtitle: 'Copia el espacio en blanco invisible (Hangul Filler U+3164) para Free Fire, WhatsApp, TikTok e Instagram.',
    icon: <span className="font-bold text-xs text-indigo-400">👻</span>,
    badge: '👻 U+3164 Invisible',
    gradient: 'from-indigo-900 via-slate-900 to-slate-950',
  },
  'nombres-parejas': {
    title: 'Generador de Nombres para Parejas y Dúos (Matching Nicks)',
    subtitle: 'Nicks combinados para novios, dúos tóxicos de Free Fire, coronas de rey/reina y perfiles aesthetic.',
    icon: <span className="text-xs text-rose-400">♡</span>,
    badge: '💑 Dúos Goals',
    gradient: 'from-rose-900 via-pink-950 to-slate-950',
  },
  abecedario: {
    title: 'Abecedario de Letras Bonitas (A-Z Completo)',
    subtitle: 'Catálogo de todas las letras del abecedario mayúsculas y minúsculas en cursiva, gótica, círculos y tatuajes.',
    icon: <span className="font-bold text-xs text-amber-400">A-Z</span>,
    badge: '📖 Directorio Maestro A-Z',
    gradient: 'from-amber-800 via-stone-900 to-slate-900',
  },
  'free-fire': {
    title: 'Conversor de Letras para Free Fire - Nicks con Alas y Símbolos',
    subtitle: 'Genera nombres insanos para Free Fire con alas ꧁༺ ༻꧂, coronas de rey 亗, espadas ⚔️ y el espacio invisible [ㅤ].',
    icon: <Flame className="w-4 h-4 text-amber-500" />,
    badge: 'Top Nicks FF',
    gradient: 'from-amber-600 to-orange-600',
  },
  cursiva: {
    title: 'Traductor de Letras Cursivas Online (Script & Manuscrita)',
    subtitle: 'Convierte cualquier texto normal a letra cursiva elegante (𝓒𝓾𝓻𝓼𝓲𝓿𝓪, 𝒮𝒸𝓇𝒾𝓅𝓉, 𝐼𝓉𝒶𝓁𝒾𝒸) para copiar y pegar.',
    icon: <span className="font-serif italic font-bold text-indigo-600">𝒯</span>,
    badge: 'Letra Cursiva Pura',
    gradient: 'from-indigo-600 to-purple-600',
  },
  goticas: {
    title: 'Letras Góticas para Copiar y Pegar (Old English & Fraktur)',
    subtitle: 'Generador de tipografía gótica medieval (𝔊ó𝔱𝔦𝔠𝔞, 𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉) para nombres dark, tatuajes y gamertags.',
    icon: <span className="font-serif font-bold text-slate-900">𝔊</span>,
    badge: 'Estilo Medieval',
    gradient: 'from-slate-900 to-zinc-800',
  },
  invertidas: {
    title: 'Letras Invertidas, Texto al Revés y Letras Tachadas',
    subtitle: 'Herramienta para voltear texto de cabeza (ɐpıʇɹǝʌuI), escribir en espejo y generar letras tachadas (t̶e̶x̶t̶o̶).',
    icon: <span className="font-mono font-bold text-indigo-600">ɐ</span>,
    badge: 'Inversor Online',
    gradient: 'from-indigo-600 to-blue-600',
  },
  circulos: {
    title: 'Letras en Círculos y Cuadros - Fuentes Burbuja Online',
    subtitle: 'Escribe letras encerradas en círculos negros 🅒🄸🅁, círculos blancos ⒸⒾⓇ y cajas cuadradas 🄲🅄🄰🄳🅁🄾🅂.',
    icon: <span className="font-bold text-xs text-indigo-600">🅒</span>,
    badge: 'Burbujas & Cuadros',
    gradient: 'from-indigo-600 to-cyan-600',
  },
  glitch: {
    title: 'Letras Glitch y Zalgo - Generador de Texto Maldito',
    subtitle: 'Crea textos tenebrosos y terroríficos con efectos glitch, corruptos y distorsión zalgo demoníaca (Z̷a̷l̷g̸o̸).',
    icon: <span className="font-mono font-bold text-rose-600">Z̶</span>,
    badge: 'Glitch / Zalgo',
    gradient: 'from-rose-700 to-slate-900',
  },
  simbolos: {
    title: 'Biblioteca de Símbolos, Emojis y Caracteres Especiales',
    subtitle: 'Más de 200 símbolos de alas, coronas, armas, corazones, flores y kaomojis listos para copiar con 1 clic.',
    icon: <Sparkles className="w-4 h-4 text-violet-600" />,
    badge: 'Catálogo de Símbolos',
    gradient: 'from-violet-600 to-fuchsia-600',
  },
  decorador: {
    title: 'Decorador de Textos y Creador de Nicks Personalizados',
    subtitle: 'Personaliza marcos a la izquierda y derecha, elige la tipografía central y crea tu propio gamertag legendario.',
    icon: <Wand2 className="w-4 h-4 text-amber-600" />,
    badge: 'Creador de Nicks',
    gradient: 'from-amber-600 to-pink-600',
  },
  'contador-bio': {
    title: 'Contador de Caracteres para Biografía de Instagram y TikTok',
    subtitle: 'Calcula caracteres y palabras en tiempo real verificando los límites habituales de biografía de Instagram (150), TikTok (80) y Twitter (280).',
    icon: <span className="font-mono font-bold text-xs text-indigo-600">#150</span>,
    badge: 'Contador de Biografía',
    gradient: 'from-indigo-600 to-pink-600',
  },
  'sobre-nosotros': {
    title: 'Sobre Nosotros - Conversor de Letras Bonitas',
    subtitle: 'Conoce la metodología de compatibilidad Unicode y estándares de desarrollo del conversor.',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    badge: 'Sobre Nosotros',
    gradient: 'from-indigo-600 to-slate-900',
  },
  'politica-de-privacidad': {
    title: 'Política de Privacidad y Procesamiento Seguro',
    subtitle: 'El texto introducido se procesa localmente en el navegador, sin almacenar tus frases en servidores.',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    badge: 'Privacidad y Seguridad',
    gradient: 'from-emerald-600 to-slate-900',
  },
  'politica-de-cookies': {
    title: 'Política de Cookies y Configuración de Privacidad',
    subtitle: 'Transparencia sobre almacenamiento local, cookies técnicas y preferencias de privacidad.',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    badge: 'Consentimiento de Cookies',
    gradient: 'from-amber-600 to-slate-900',
  },
  'terminos-y-condiciones': {
    title: 'Términos y Condiciones de Uso Legal',
    subtitle: 'Condiciones de servicio, normas de uso aceptable, propiedad intelectual Unicode y exención de responsabilidad de marcas.',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    badge: 'Aviso Legal',
    gradient: 'from-indigo-600 to-slate-900',
  },
  contacto: {
    title: 'Contacto, Soporte y Solicitud de Fuentes',
    subtitle: 'Envíanos tus dudas, solicitudes de nuevos estilos de letras o reporte de problemas en tu dispositivo.',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    badge: 'Soporte y Contacto',
    gradient: 'from-indigo-600 to-blue-600',
  },
  '404': {
    title: '404 - Página No Encontrada',
    subtitle: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
    icon: <Sparkles className="w-4 h-4 text-rose-600" />,
    badge: 'Error 404',
    gradient: 'from-rose-600 to-slate-900',
  },
};
