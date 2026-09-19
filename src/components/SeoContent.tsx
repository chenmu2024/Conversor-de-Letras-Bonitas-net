import React, { useState } from 'react';
import { PageRoute } from '../types';
import { 
  CheckCircle2, 
  HelpCircle, 
  Cpu, 
  Smartphone, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Instagram,
  Flame,
  MessageCircle,
  Sparkles,
  Zap
} from 'lucide-react';

interface SeoContentProps {
  currentRoute: PageRoute;
}

export const SeoContent: React.FC<SeoContentProps> = ({ currentRoute }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Specific content blocks based on user route
  const specializedContent: Record<
    PageRoute,
    { title: string; subtitle: string; description: string; tips: string[]; examples: string[] }
  > = {
    inicio: {
      title: 'Conversor de Letras Bonitas y Fuentes para Redes Sociales',
      subtitle: 'El Conversor de Letras Bonitas y generador de tipografías estéticas más completo en español.',
      description:
        'El Conversor de Letras Bonitas online convierte cualquier frase ordinaria en 90+ variaciones de letras bonitas con caracteres Unicode universales. Con este conversor de letras bonitas obtienes tipografías aesthetic, cursivas y nicks gamer al instante sin instalar programas en tu móvil o PC.',
      tips: [
        'Usa el Conversor de Letras Bonitas para crear biografías elegantes en cursiva para Instagram.',
        'En el Conversor de Letras Bonitas combina símbolos de alas ꧁ ꧂ y coronas 亗 para nicks de Free Fire.',
        'Aplica letras en círculos con el Conversor de Letras Bonitas para resaltar títulos en WhatsApp o Facebook.',
        'El Conversor de Letras Bonitas incluye el Espacio Invisible [ㅤ] para ocultar nombres o separar líneas.',
      ],
      examples: ['𝓕𝓻𝓪𝓼𝓮 𝓔𝓵𝓮𝓰𝓪𝓷𝓽𝓮', '𝕭𝖔𝖑𝖉 𝕲𝖔𝖙𝖍𝖎𝖈', '꧁༺ 𝕻𝕽𝕺 ༻꧂', '『 𝔸𝕖𝕤𝕥𝕙𝕖𝕥𝕚𝕔 』'],
    },
    instagram: {
      title: 'Letras para Instagram - Tipografías Bonitas para Bio, Stories y Reels',
      subtitle: 'Haz que tu perfil de Instagram destaque entre millones de usuarios con tipografías únicas.',
      description:
        'Instagram utiliza la tipografía estándar del sistema por defecto. Con este conversor de letras para Instagram, puedes pegar nombres en cursiva (𝓝𝓸𝓶𝓫𝓻𝓮), descripciones con tipografía aesthetic y pies de foto con negritas directamente en tu biografía, historias destacadas y comentarios.',
      tips: [
        'Mantén la biografía legible: combina una frase en cursiva con viñetas estéticas.',
        'Usa el espacio invisible para centrar el texto de tu biografía de Instagram.',
        'Añade tipografías sans-serif en negrita para resaltar tu profesión o enlace de contacto.',
      ],
      examples: ['𝓘𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶 𝓑𝓲𝓸 ✨', '𝒞𝓇𝑒𝒶𝓉𝑜𝓇 · 𝒱𝒾𝒹𝑒𝑜𝓈 🎬', '𝗕𝘂𝘀𝗶𝗻𝗲𝘀𝘀 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 💼'],
    },
    tiktok: {
      title: 'Letras para TikTok - Nombres Aesthetic, Emojis Secretos y Biografías',
      subtitle: 'Personaliza tu perfil con nombres llamativos, emojis ocultos y textos de video en TikTok.',
      description:
        'En TikTok, tener un nombre de perfil con estilo, una biografía organizada dentro de la longitud mostrada de 80 caracteres y textos claros para videos ayuda a destacar tu contenido. Usa letras aesthetic con moños 🎀, estrellas ★, minúsculas estilizadas (Small Caps) y los códigos de emojis ocultos [código].',
      tips: [
        'En TikTok, usa las letras bonitas en tu "Nombre de Perfil" (permite Unicode) y mantén tu @usuario alfanumérico limpio.',
        'La biografía de TikTok suele admitir hasta 80 caracteres: usa nuestro contador en tiempo real para verificar la longitud.',
        'Aprovecha los Emojis Ocultos escribiendo códigos como [wicked], [yummy], [loveface] o [cry] en tus comentarios.',
        'Formatea los textos en pantalla de tus videos y portadas de CapCut con Negrita Sans o Small Caps para mejorar la legibilidad en los primeros segundos.',
      ],
      examples: ['₊˚⊹ 𝒯𝒾𝓀𝒯𝑜𝓀 𝒱𝒾𝒷𝑒𝓈 ⊹˚₊', '🎀 𝒜𝑒𝓈𝓉𝒽𝑒𝓉𝒾𝒸 𝒢𝒾𝓇𝓁 🎀', 'ᴠɪʀᴀʟ ᴄᴏɴᴛᴇɴᴛ 🔥', '[wicked] 😈', 'POV: 𝘕𝘶𝘦𝘷𝘰 𝘛𝘳ེ𝘯𝘥 ✨'],
    },
    whatsapp: {
      title: 'Letras para WhatsApp - Fuentes, Estados, Mensajes Pro y Chat Directo',
      subtitle: 'Personaliza tus mensajes y perfil con letras cursivas, negritas nativas y enlaces de contacto directo.',
      description:
        'WhatsApp admite de forma nativa formatos mediante símbolos (*negrita*, _cursiva_, ~tachado~, ```monospaciado```, > cita y listas). Además, con nuestro generador de fuentes seguras Unicode puedes escribir en tu Info / Acerca de (referencia habitual de 139 caracteres), diseñar nombres de grupos llamativos y crear enlaces wa.me directos sin necesidad de guardar el contacto en la agenda.',
      tips: [
        'Aprovecha el código monospaciado (```código```) para enviar números de cuenta o referencias y que tus contactos los copien con 1 toque.',
        'La sección "Info / Acerca de" de WhatsApp suele tener un límite de 139 caracteres: usa nuestro diseñador en tiempo real con vista previa.',
        'Envía mensajes a números sin registrar usando enlaces wa.me sin tener que agregarlos a tu lista de contactos de teléfono.',
        'Usa el espacio invisible [ㅤ] (Hangul Filler) para enviar mensajes en blanco en chats o publicar un Estado sin texto.',
      ],
      examples: ['*¡Pedido Confirmado!* 📦', '```TIENDA.PAGO``` 💳', '𝓔𝓼𝓽𝓪𝓭𝓸 𝓭𝓮 𝓦𝓱𝓪𝓽𝓼𝓐𝓹𝓹 💬', '> Cita Importante 📌', '• Lista de Precios 🔥'],
    },
    'free-fire': {
      title: 'Letras para Free Fire - Nicks con Alas, Coronas 亗, Dúos y Espacio Invisible',
      subtitle: 'Crea nombres para Free Fire, Dúo Dinámico, Banderas de Países, Clanes PvP y Códigos de Color.',
      description:
        'El generador de letras para Free Fire te permite crear nicks personalizados con alas ꧁༺ ༻꧂, símbolos de rey 亗, rayos ⚡, nicks de parejas para Dúos Dinámicos, banderas de países con bloques de colores [███] y los 3 tamaños de espacios invisibles (Grande, Mediano y Pequeño) para ajustarse a la longitud habitual de los nombres de jugador.',
      tips: [
        'Free Fire suele aplicar como referencia un límite de 12 caracteres: nuestro contador te ayuda a verificar si tu combinación sobrepasa la longitud habitual.',
        'Para nicks de Dúo Dinámico (parejas), usa marcos simétricos como (꧁ঔৣ☬ KING ☬ঔৣ꧂ / ꧁ঔৣ☬ QUEEN ☬ঔৣ꧂ o 亗 BONNIE 亗 / 亗 CLYDE 亗).',
        'Usa el formato [008000]█[FFFFFF]█[FF0000]█ en tu firma para lucir la bandera de tu país con bloques de colores.',
        'Si tu nick con clan tag está muy ajustado a las 12 letras, usa el "Espacio Invisible Mediano" o "Pequeño" para que quepa todo.',
      ],
      examples: ['꧁༺ 𝕯𝕰𝕾𝕿𝕽𝖀𝖄𝕰 ༻꧂', '亗 ＢＯＮＮＩＥ 亗', 'ᴮᴼˢˢ★ 𝕹𝕴𝕮𝕶 ⚔️', '[b][c][ffd319]Ⓥ JUGADOR', '亗ㅤɪɴsᴀɴᴏ'],
    },
    facebook: {
      title: 'Letras para Facebook - Negritas, Cursivas, Marketplace y Títulos de Páginas',
      subtitle: 'Haz que tus posts de Facebook, Marketplace y comentarios reciban más clics con tipografías que captan la atención.',
      description:
        'Facebook no ofrece botones de formato nativos para perfiles personales, comentarios o Marketplace. Con nuestro conversor inteligente puedes redactar publicaciones con formato selectivo en Negrita Matemática (Sans Bold), titulares llamativos, fichas de producto con precios rebajados tachados (S̶t̶r̶i̶k̶e̶), nombres estéticos para páginas y presentaciones de perfil optimizadas para la longitud habitual de 101 caracteres.',
      tips: [
        'Aplica Negrita Sans en la primera línea o titular de tu post para que actúe como un gancho en el feed de noticias.',
        'En Facebook Marketplace, coloca el precio anterior en tachado (A̶n̶t̶e̶s̶:̶ ̶$̶9̶9̶) y el precio de oferta en negrita para destacar tus ofertas.',
        'La sección "Presentación / Bio" de Facebook suele admitir hasta 101 caracteres: utiliza nuestro contador en vivo para evitar cortes de texto.',
        'Usa viñetas numéricas estilizadas (❶, ❷, ❸) para publicar las reglas de tu Grupo de Facebook de manera legible y ordenada.',
      ],
      examples: ['🔥 𝗢𝗙𝗘𝗥𝗧𝗔 𝗘𝗫𝗖𝗟𝗨𝗦𝗜𝗩𝗔 🔥', '💰 𝗣𝗥𝗘𝗖𝗜𝗢: 29.99€ (A̶n̶t̶e̶s̶:̶ ̶4̶9̶.̶9̶9̶€̶)', '👉 𝗧𝗢𝗗𝗔 𝗟𝗔 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜Ó𝗡 𝗔𝗤𝗨Í 👇', '❶ 𝗥𝗲𝘀𝗽𝗲𝘁𝗼 𝗺𝘂𝘁𝘂𝗼', '【 𝔸𝕍𝕀𝕊𝕆 𝕀𝕄ℙ𝕆ℝ𝕋𝔸ℕ𝕋𝔼 】'],
    },
    'letras-chidas': {
      title: 'Letras Chidas - Fuentes Aesthetic, Nicks Insanos y Frases Perronas',
      subtitle: 'Repertorio completo de letras chidas, nicks con alas y fuentes para redes sociales.',
      description:
        'Encuentra letras chidas para personalizar tu perfil en Free Fire, TikTok, Instagram y WhatsApp. Contamos con combinaciones de alas ꧁༺ ༻꧂, coronas 亗, tipografías gamer y espacio invisible para que tu nombre resalte al instante.',
      tips: [
        'En Free Fire, añade las alas ꧁ ꧂ alrededor de tu nombre en letras góticas o cursivas.',
        'Copia nuestro botón de Espacio Invisible [ㅤ] para ocultar tu nombre o separar palabras en juegos móviles.',
        'Combina letras chidas en negrita con viñetas estéticas para tus estados y biografías.',
      ],
      examples: ['꧁༺ 𝕰𝖑 𝕻𝖆𝖙𝖗ó𝖓 ༻꧂', '亗 𝑳𝑨 𝑻Ó𝑿𝑰𝑪𝑨 亗', '⚡ ᴵᴺˢᴬᴺᴼ ⚡', '『 𝓒𝓱𝓲𝓭𝓸 & 𝓤𝓷𝓲𝓬𝓸 』', '亗ㅤ𝑭𝑳𝑶𝑾ㅤ亗'],
    },
    'letras-elegantes': {
      title: 'Letras Elegantes - Caligrafía Fina, Firmas Digitales y Script de Lujo',
      subtitle: 'Transforma tus nombres y biografías con tipografías elegantes de alta distinción.',
      description:
        'Las letras elegantes aportan sofisticación y profesionalismo a cualquier biografía, firma de correo, presentación de Instagram o dedicatoria. Nuestro generador incluye caligrafía manuscrita fina, script italiano, serif clásico y Small Caps editoriales.',
      tips: [
        'Usa Cursiva Fina (𝒮𝒸𝓇𝒾𝓅𝓉) para nombres propios y firmas de perfil.',
        'Aplica Small Caps (ᴠᴀʟᴇɴᴛɪɴᴀ · ᴀʀᴛ ᴅɪʀᴇᴄᴛᴏʀ) para cargos y profesiones.',
        'Combina con símbolos sutiles como ✧, ✦ o ⚜️ para un acabado de lujo minimalista.',
      ],
      examples: ['𝒥𝑜𝓈é ℳ𝒶𝓇í𝒶 𝒮𝒾𝓁𝓋𝒶 ✧', '✦ 𝐴 𝑁 𝐷 𝑅 𝐸 𝐴 ✦', '⚜️ 𝓒𝓪𝓻𝓵𝓸𝓼 𝓜𝓮𝓷𝓭𝓸𝔃𝓪 ⚜️', '𝒮𝒾𝑒𝓂𝓅𝓇𝑒 𝒯𝓊𝓎𝒶 ♡'],
    },
    'letras-raras': {
      title: 'Letras Raras y Símbolos Extraños - Alfabetos Exóticos y Unicode Oculto',
      subtitle: 'Generador de letras raras, zalgo corrupto, caracteres orientales y textos al revés.',
      description:
        'Crea combinaciones únicas con letras raras basadas en bloques Unicode exóticos: alfabetos simulados en estilo oriental (尺卂尺ㄖ), runas nórdicas, texto zalgo maldito, caracteres invertidos y símbolos de difícil acceso en teclados estándar.',
      tips: [
        'Usa alfabetos exóticos para crear gamertags únicos y difíciles de imitar en Discord o Steam.',
        'Aplica el efecto Zalgo moderado para títulos misteriosos o temáticas de terror.',
        'Copia caracteres especiales invisibles o jeroglíficos para personalizar tus nicks.',
      ],
      examples: ['尺卂尺卂丂 ﾘ ㄥㄖ匚卂丂', 'ᚱᚢᚾᚨᛊ ᛗᛁᛊᛏᛁᚲᚨᛊ', 'R̶a̷r̸a̷s̴ ̸M̸a̸l̸d̶i̸t̵a̷s̴', 'sɐɹɐᴚ sɐɹʇǝꞀ', '👁️ 𓁹 𓁺 𓁻 𓁼 𓁹 👁️'],
    },
    'letras-tatuajes': {
      title: 'Letras para Tatuajes - Góticas Old English, Caligrafía Fina & Números Romanos',
      subtitle: 'Diseña y prueba bocetos de letras para tatuar en antebrazo, clavícula, costillas y muñeca.',
      description:
        'El generador de letras para tatuajes te permite visualizar frases célebres en latín, nombres de familiares y lemas de vida en tipografías Old English medievales, caligrafía fina cursiva y números romanos para fechas de nacimiento.',
      tips: [
        'Prueba el simulador de piel para ver cómo luce la tipografía en el antebrazo o clavícula.',
        'Usa el conversor de fechas a números romanos (ej: XV · VIII · MMII) para tatuajes conmemorativos.',
        'Copia las frases en latín con significado profundo como Amor Fati o Memento Mori.',
      ],
      examples: ['𝕱𝖆𝖒𝖎𝖑𝖎𝖆 𝕻𝖗𝖎𝖒𝖊𝖗𝖔', '✦ 𝒜𝓂𝑜𝓇 𝐹𝒶𝓉𝒾 ✦', '† 𝕸𝖊𝖒𝖊𝖓𝖙𝖔 𝕸𝖔𝖗𝖎 †', 'XV · VIII · MMII', 'ᴠᴇɴɪ · ᴠɪᴅɪ · ᴠɪᴄɪ'],
    },
    'nicks-free-fire': {
      title: 'Generador de Nicks para Free Fire - Alas, Coronas 亗, ⓥ y Espacio Invisible',
      subtitle: 'Crea nombres insanos para Garena Free Fire con símbolos de armas y tags de clan.',
      description:
        'Personaliza tu gamertag con alas ꧁༺ ༻꧂, el símbolo de estilo verificado ⓥ, coronas de rey 亗, armas francotirador ︻╦╤─ y el espacio invisible [ㅤ] probado para Free Fire en Android e iOS.',
      tips: [
        'Copia el Espacio Invisible [ㅤ] con un solo toque para separar palabras en tu nick.',
        'Añade tags de clan como ᴮᴼˢˢ★ o 亗 para que tu escuadra resalte en el lobby.',
        'Usa combinaciones de dúos como 『 𝓔𝓵 𝓡𝓮𝔂 』 y 『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』.',
      ],
      examples: ['꧁༺ 𝕰𝖑 𝕻𝖆𝖙𝖗ó𝖓 ༻꧂', 'ⓥ 𝕴𝕹𝕾𝕬𝕹𝕺 ⁹⁹⁹', '亗 𝑻𝑶𝑿𝑰𝑪𝑶 亗', '︻╦╤─ 𝕭𝖊𝖑𝖎𝖈𝖔 亗', '亗ㅤ𝑭𝑳𝑶𝑾ㅤ亗'],
    },
    'letras-chinas': {
      title: 'Letras Chinas y Japonesas Kanji - Caracteres Simulados y Nicks Anime',
      subtitle: 'Convierte tus palabras a alfabetos orientales simulados y símbolos kanji de dragones.',
      description:
        'Transforma cualquier texto a caracteres kanji simulados (尺卂尺ㄖ), katakana anime (ﾑ乃ᄃ) o adorna tus perfiles con kanji auténticos como 愛 (Amor), 龍 (Dragón), 侍 (Samurái) y 桜 (Sakura).',
      tips: [
        'Crea biografías aesthetic con temática oriental y flores de cerezo 🌸.',
        'Usa símbolos de dragón y espadas para nicks de batalla en Discord o juegos.',
        'Combina caracteres simulados para nombres visualmente impactantes.',
      ],
      examples: ['尺卂尺ㄖ ﾘ 匚卄丨刀ㄖ', '🐉 𓆩 龍 · 𝕯𝖗𝖆𝖌𝖔𝖓 𓆪 🐉', '愛 𝓣𝓮 𝓐𝓶𝓸 愛', '🌸 𝒱𝒾𝒷𝑒𝓈 𝒮𝒶𝓀𝓊𝓇𝒶 桜 🌸', '⚔️ 侍 𝕾𝖆𝖒𝖚𝖗𝖆𝖎 侍 ⚔️'],
    },
    'espacio-invisible': {
      title: 'Espacio Invisible y Letra Invisible [ㅤ] - Carácter Hangul Filler U+3164',
      subtitle: 'El truco definitivo para nombres invisibles, mensajes vacíos y separadores gamer.',
      description:
        'El espacio invisible [ㅤ] (Hangul Filler U+3164) es un carácter Unicode especial reconocido por los videojuegos y redes sociales como un caracter válido pero que se visualiza como un espacio transparente.',
      tips: [
        'Copia el espacio invisible para saltar restricciones de nombres en Free Fire y PUBG.',
        'En WhatsApp, te permite enviar mensajes completamente en blanco y dejar el nombre vacío.',
        'Ideal para separar nicks en clanes gamer sin que aparezcan barras o guiones.',
      ],
      examples: ['[ㅤ]', '亗ㅤFL𝑶𝑾ㅤ亗', '𝕭𝖊𝖑𝖎𝖈𝖔ㅤ⁹⁹⁹', 'ⓥㅤ𝕴𝕹𝕾𝕬𝕹𝕺', 'ᴮᴼˢˢㅤ★ㅤ亗'],
    },
    'nombres-parejas': {
      title: 'Nombres para Parejas y Dúos - Nicks Matching para Free Fire y Redes',
      subtitle: 'Combina gamertags con tu novio, novia o mejor amigo con coronas y alas simétricas.',
      description:
        'Crea nicks a juego inspirados en reyes, parejas legendarias de películas y mitología. Diseñados para que ambos miembros del dúo resalten en el marcador con coronas y estilos idénticos.',
      tips: [
        'Usen el mismo símbolo de clan o corona al inicio (ej: 亗) para verse organizados.',
        'Prueben combinaciones románticas como 『 𝓔𝓵 𝓡𝓮𝔂 』 ♡ 『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』.',
        'Copien ambos nombres con el botón dedicado para no perder el formato.',
      ],
      examples: ['『 𝓔𝓵 𝓡𝓮𝔂 』 亗 ♡ 『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』 亗', '亗 𝑩𝑶𝑵𝑵𝑰𝑬 亗 ♡ 亗 𝑪𝑳𝒀𝑫𝑬 亗', '⚡ 𝕬𝖉𝖆𝖓 ♡ 𝕰𝖛𝖆 ⚡', '☀️ 𝒮𝑜𝓁 ♡ 🌙 𝐿𝓊𝓃𝒶', '꧁༺ 𝕿ó𝖝𝖎𝖈𝖔 ༻꧂ ♡ ꧁༺ 𝕿ó𝖝𝖎𝖈𝖆 ༻꧂'],
    },
    'abecedario': {
      title: 'Abecedario Completo de Letras Bonitas (A-Z) - Mayúsculas y Minúsculas',
      subtitle: 'Explora y copia todas las letras del abecedario en más de 20 alfabetos Unicode.',
      description:
        'Directorio completo con todas las letras de la A a la Z en tipografías cursivas, góticas medievales, letras en círculos, small caps y caracteres para tatuajes con copiado en 1 clic.',
      tips: [
        'Haz clic en cualquier letra individual para copiarla rápidamente.',
        'Usa los botones de copiado masivo para obtener el abecedario completo en tu portapapeles.',
        'Ideal para diseñadores, lettering y creación de firmas digitales.',
      ],
      examples: ['𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊', '𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖', 'Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ', 'ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ', '丹 乃 匚 口 巳 下 厶'],
    },
    cursiva: {
      title: 'Traductor a Cursiva - Conversor de Letras Cursivas y Manuscritas',
      subtitle: 'Transforma cualquier texto a letra cursiva elegante (Script, Italic y Caligrafía).',
      description:
        'El traductor de letra cursiva online transforma cada letra de tu abecedario en hermosas caligrafías manuscritas basadas en caracteres matemáticos Script y cursiva inglesa. Ideal para firmas, dedicatorias, cartas de amor y bios.',
      tips: [
        'Dispones de cursiva fina (𝒮𝒸𝓇𝒾𝓅𝓉), cursiva negrita (𝓒𝓾𝓻𝓼𝓲𝓿𝓪) e itálica clásica (𝐼𝓉𝒶𝓁𝒾𝒸).',
        'Copia el abecedario completo en cursiva si deseas componer títulos personalizados.',
        'Perfecto para nombres artísticos, tatuajes y dedicatorias románticas.',
      ],
      examples: ['𝓣𝓮 𝓪𝓶𝓸 𝓬𝓸𝓷 𝓽𝓸𝓭𝓸 𝓶𝓲 𝓬𝓸𝓻𝓪𝔃ó𝓷', '𝒮𝒾𝑒𝓂𝓅𝓇𝑒 𝒥𝓊𝓃𝓉𝑜𝓈 ♥', '𝓕𝓪𝓶𝓲𝓵𝓲𝓪 & 𝓐𝓶𝓸𝓻'],
    },
    goticas: {
      title: 'Letras Góticas - Generador Old English, Fraktur y Medieval',
      subtitle: 'Convierte tus textos a fuentes góticas clásicas para nicks dark y tatuajes.',
      description:
        'Las letras góticas (conocidas como Fraktur o Blackletter) evocan la caligrafía medieval europea del siglo XII. Nuestro conversor te ofrece variantes en trazo fino (𝔊ó𝔱𝔦𝔠𝔞) y trazo grueso en negrita (𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉).',
      tips: [
        'Muy populares para gamertags de clanes oscuros, heavy metal y bandas de rock.',
        'Ideales para diseñar bocetos de tatuajes con nombres y fechas.',
        'Se combinan a la perfección con símbolos de espadas ⚔️ y cruces ✞.',
      ],
      examples: ['𝕲𝖔𝖙𝖍𝖎𝖈 𝕶𝖎𝖓𝖌𝖉𝖔𝖒', '𝔏𝔞 𝔐𝔲𝔢𝔯𝔱𝔢 𝔶 𝔢𝔩 𝔇𝔢𝔰𝔱𝔦𝔫𝔬', '⚔️ 𝕲𝖚𝖊𝖗𝖗𝖊𝖗𝖔 ⚔️'],
    },
    invertidas: {
      title: 'Letras Invertidas y Tachadas - Inversor de Texto al Revés',
      subtitle: 'Voltea tu texto de cabeza, en efecto espejo o con línea de tachado central.',
      description:
        'El inversor de texto rota los caracteres 180 grados utilizando caracteres Unicode volteados (Upside Down) y aplica diacríticos de tachado superpuesto para crear textos tachados y efectos divertidos.',
      tips: [
        'Escribe acertijos o spoilers volteados para que la gente tenga que girar el teléfono.',
        'Usa letras tachadas (t̶e̶x̶t̶o̶) para corregir frases con humor en Twitter y WhatsApp.',
        'Combina el texto espejo con fuentes aesthetic para un estilo futurista.',
      ],
      examples: ['ɐpıʇɹǝʌuI ɐɹʇǝꞀ', 't̶e̶x̶t̶o̶ ̶t̶a̶c̶h̶a̶d̶o̶', 'oʇxǝʇ ןǝ ɐǝʇןoΛ'],
    },
    circulos: {
      title: 'Letras en Círculos y Cuadros - Fuentes Burbuja y Cuadradas',
      subtitle: 'Encierra cada letra en círculos negros, círculos blancos o cajas cuadradas.',
      description:
        'Las letras en círculos (circulares o burbujas) y letras en cajas cuadradas son caracteres tipográficos de ancho completo que otorgan un marco visual limpio y ordenado a cualquier palabra o número.',
      tips: [
        'Usa números en círculos (① ② ③) para enumerar pasos o reglas de un sorteo.',
        'Los círculos negros 🅒🄸🅁 son perfectos para botones o títulos que deben saltar a la vista.',
        'Las cajas cuadradas 🄲🅄🄰🄳🅁🄰🄳🄰🅂 quedan espectaculares para nombres de marcas.',
      ],
      examples: ['🅑🅘🅔🅝🅥🅔🅝🅘🅓🅞🅢', 'ⒸⒾⓇⒸⓊⓁⓄⓈ', '🄽🄾🄼🄱🅁🄴'],
    },
    glitch: {
      title: 'Letras Glitch y Zalgo - Texto Maldito, Terrorífico y Corrupto',
      subtitle: 'Generador de texto corrupto con diacríticos apilados y estética de terror.',
      description:
        'El efecto Zalgo combina decenas de marcas diacríticas Unicode por encima y por debajo de cada letra, provocando que el texto se "desborde" visualmente simulando un glitch de pantalla o texto maldito.',
      tips: [
        'Perfecto para historias de terror, creepypastas, Halloween y roles de villanos en juegos.',
        'Usa niveles moderados de zalgo para asegurar legibilidad en redes sociales.',
        'Excelente para nombres de clanes de rol oscuro en Discord y Reddit.',
      ],
      examples: ['Z̷a̷l̷g̸o̸ ̴C̴o̴r̴r̴u̴p̴t̴o̴', 'M̶u̶e̶r̶t̶e̶ ̶y̶ ̶T̶e̶r̶r̶o̶r̶', 'G̶l̶i̶t̶c̶h̶ ̶E̶f̶f̶e̶c̶t̶'],
    },
    simbolos: {
      title: 'Símbolos y Emojis para Copiar y Pegar - Alas, Coronas y Estrellas',
      subtitle: 'Catálogo de más de 200 símbolos especiales clasificados por temáticas.',
      description:
        'Encuentra y copia con un solo clic los símbolos más buscados de internet: alas para nicks de Free Fire (꧁ ꧂), coronas de rey (亗, 👑), armas (︻デ═一), corazones estéticos (♥, ♡, ❦) y kaomojis japoneses ((◕‿◕)).',
      tips: [
        'Haz clic sobre cualquier símbolo para copiarlo inmediatamente a tu portapapeles.',
        'Combina símbolos de alas con tu nombre en letra cursiva para un nick inolvidable.',
        'Utiliza los separadores y flechas para organizar la descripción de tus perfiles.',
      ],
      examples: ['꧁༺ 𝕹𝖎𝖈𝖐 ༻꧂', '亗 ᴋɪɴɢ 亗', '🌸 ˚₊· 𝒮𝒶𝓀𝓊𝓇𝒶 ·₊˚ 🌸', '⚔️ 𝕻𝖁𝕻 ⚔️'],
    },
    decorador: {
      title: 'Decorador de Nicks y Gamertags Personalizados',
      subtitle: 'Personaliza marcos, alas y tipografías para crear tu propio nick legendario.',
      description:
        'El decorador de nicks te permite seleccionar marcos decorativos para la izquierda y la derecha de tu texto, transformando automáticamente el centro con tu estilo de letra favorito.',
      tips: [
        'Prueba las combinaciones de alas gamer, marcos coquette o coronas de clanes.',
        'Guarda tus creaciones favoritas en el panel de favoritos para tenerlas siempre a mano.',
        'Copia el resultado listo para pegar en cualquier videojuego o red social.',
      ],
      examples: ['꧁༺ 𝕹𝖔𝖒𝖇𝖗𝖊 ༻꧂', '『 𝓝𝓸𝓶𝓫𝓻𝓮 』', '【 𝕹𝖔𝖒𝖇𝖗𝖊 】', '⚡ 𝗡𝗶𝗰𝗸 ⚡'],
    },
    'contador-bio': {
      title: 'Contador de Caracteres para Biografía de Redes Sociales',
      subtitle: 'Calcula caracteres, palabras y límites habituales de Instagram, TikTok, Twitter y WhatsApp.',
      description:
        'Cada red social maneja límites de caracteres en su biografía. Nuestro contador analiza en tiempo real la longitud en puntos de código Unicode para ayudarte a evitar que tu descripción sea cortada.',
      tips: [
        'Instagram permite habitualmente 150 caracteres en la biografía y 30 en el nombre.',
        'TikTok limita comúnmente la descripción del perfil a 80 caracteres.',
        'Twitter / X permite hasta 280 caracteres por publicación.',
        'WhatsApp admite habitualmente hasta 139 caracteres en la información de perfil.',
      ],
      examples: ['150 Caracteres IG', '80 Caracteres TT', '280 Caracteres X', '139 Caracteres WA'],
    },
    'sobre-nosotros': {
      title: 'Sobre Nosotros - Conversor de Letras Bonitas',
      subtitle: 'Nuestra metodología, funcionamiento técnico y compatibilidad Unicode.',
      description:
        'Somos un proyecto enfocado en la investigación tipográfica digital y la difusión de fuentes Unicode en español, procurando que cada símbolo y estilo funcione correctamente en dispositivos modernos.',
      tips: [
        'Basado en el estándar Unicode internacional.',
        'Procesamiento en el navegador sin almacenamiento de textos.',
        'Diseño responsive optimizado para teléfonos móviles.',
      ],
      examples: ['Calidad Tipográfica', 'Unicode 15.1', 'Compatibilidad Universal'],
    },
    'politica-de-privacidad': {
      title: 'Política de Privacidad y Protección de Datos',
      subtitle: 'Transparencia y procesamiento en el lado del cliente (Client-Side Privacy).',
      description:
        'Respetamos tu privacidad. Todo el procesamiento de conversión tipográfica se realiza localmente en tu propio dispositivo utilizando JavaScript. Ningún texto que ingresas es enviado a servidores.',
      tips: [
        'Cero almacenamiento de textos personales en servidores.',
        'Almacenamiento local (localStorage) únicamente para tus favoritos guardados.',
        'Conformidad con estándares RGPD, CCPA y buenas prácticas web.',
      ],
      examples: ['Seguro y Directo', 'Sin Registro', 'Privacidad en Navegador'],
    },
    'politica-de-cookies': {
      title: 'Política de Cookies y Consentimiento Informado',
      subtitle: 'Transparencia en el uso de cookies técnicas y publicitarias de Google AdSense.',
      description:
        'Explicamos detalladamente los tipos de cookies que utilizamos, los plazos de conservación, el uso de la cookie de DoubleClick por parte de Google AdSense y cómo puedes gestionar o revocar tu consentimiento en cualquier momento.',
      tips: [
        'Panel de preferencias de cookies accesible desde el pie de página.',
        'Inhabilitación directa de publicidad personalizada mediante Configuración de Anuncios de Google.',
        'Conforme a la Directiva de Privacidad Electrónica (ePrivacy) y el RGPD.',
      ],
      examples: ['Cookies Técnicas', 'Google AdSense', 'Control RGPD'],
    },
    'terminos-y-condiciones': {
      title: 'Términos y Condiciones de Uso Legal',
      subtitle: 'Condiciones de servicio, normas de uso aceptable, propiedad intelectual y exención de marcas.',
      description:
        'Conoce el marco legal y las condiciones que rigen el uso libre de nuestras herramientas tipográficas. Los caracteres Unicode son estándar público y libre para cualquier uso creativo.',
      tips: [
        'Uso libre, ilimitado y gratuito de fuentes para proyectos personales y comerciales.',
        'Los glifos Unicode pertenecen a la especificación pública internacional ISO/IEC 10646.',
        'Marcas de terceros mencionadas únicamente con fines de compatibilidad descriptiva.',
      ],
      examples: ['Uso Libre', 'Estándar Unicode', 'Marco Legal'],
    },
    contacto: {
      title: 'Centro de Contacto y Soporte al Usuario',
      subtitle: 'Comunícate con nosotros para sugerir fuentes, reportar errores o solicitar colaboraciones.',
      description:
        'Si encuentras un símbolo que no se muestra correctamente en tu dispositivo o deseas sugerir una nueva fuente, contáctanos.',
      tips: [
        'Revisión periódica de mensajes recibidos.',
        'Abiertos a sugerencias de nuevos alfabetos y símbolos gamer.',
        'Soporte técnico para problemas de visualización en Android e iOS.',
      ],
      examples: ['Soporte Directo', 'Solicitudes de Fuentes', 'Reporte de Bugs'],
    },
    '404': {
      title: 'Página no encontrada (Error 404)',
      subtitle: 'La URL ingresada no corresponde a ninguna de nuestras herramientas activas.',
      description:
        'Por favor utiliza la barra de búsqueda o los enlaces directos para navegar hacia nuestro conversor de letras bonitas, nicks de Free Fire o herramientas para Instagram.',
      tips: [
        'Revisa la ortografía de la dirección web.',
        'Explora las categorías disponibles en el menú principal.',
        'Haz clic en Volver al Inicio para acceder a todas las fuentes.',
      ],
      examples: ['Error 404', 'Navegación', 'Inicio'],
    },
  };

  const currentSpecialized = specializedContent[currentRoute] || specializedContent.inicio;

  const faqs = [
    {
      q: '¿El Conversor de Letras Bonitas es gratis?',
      a: 'Sí, todas las fuentes, símbolos, letras cursivas y decoraciones del Conversor de Letras Bonitas son completamente gratis e ilimitadas. No necesitas registrarte ni descargar ningún programa o aplicación.',
    },
    {
      q: '¿Por qué se pueden copiar y pegar estas fuentes desde el Conversor de Letras Bonitas?',
      a: 'A diferencia de los archivos de fuentes tradicionales (.ttf o .otf), el Conversor de Letras Bonitas utiliza caracteres del estándar internacional Unicode. Son símbolos universales que ya están preinstalados en todos los sistemas operativos modernos como iOS, Android, Windows y macOS.',
    },
    {
      q: '¿Por qué algunas letras del Conversor de Letras Bonitas se ven como cuadros blancos (□)?',
      a: 'Esto solo ocurre en teléfonos móviles o navegadores muy antiguos que no han actualizado su tabla Unicode. Más del 99% de los dispositivos modernos soportan todos los caracteres del Conversor de Letras Bonitas sin ningún problema.',
    },
    {
      q: '¿Cómo poner letras en cursiva o negrita en Instagram con el Conversor de Letras Bonitas?',
      a: '1. Escribe tu frase en la caja de texto superior del Conversor de Letras Bonitas.\n2. Elige el estilo "Cursiva Bold" o "Negrita Sans" en el Conversor de Letras Bonitas.\n3. Haz clic en el botón "Copiar".\n4. Abre Instagram, ve a tu perfil, pulsa en "Editar perfil" y pega el texto en el campo "Presentación / Bio".',
    },
    {
      q: '¿Cómo centrar la biografía de Instagram con el Conversor de Letras Bonitas?',
      a: 'Instagram borra los espacios normales al guardar tu perfil. Para centrar tu biografía, utiliza en el Conversor de Letras Bonitas el botón "Espacio Invisible [ㅤ]". Añade de 4 a 6 espacios invisibles al inicio de cada línea para lograr un centrado perfecto y simétrico en Instagram.',
    },
    {
      q: '¿Cómo cambiar la letra de las Historias de Instagram con el Conversor de Letras Bonitas?',
      a: 'Para usar estas tipografías en tus Instagram Stories: escribe y copia tu texto en el Conversor de Letras Bonitas, ve a Instagram Stories, pulsa en la herramienta de texto "Aa" y pega directamente tu texto copiado desde el Conversor de Letras Bonitas.',
    },
    {
      q: '¿Cómo hacer saltos de línea limpios en los pies de foto con el Conversor de Letras Bonitas?',
      a: 'Instagram suele comprimir párrafos. Al usar el Conversor de Letras Bonitas e insertar caracteres invisibles de separación entre cada párrafo, puedes ayudar a mantener un espaciado más ordenado y legible.',
    },
    {
      q: '¿Cómo tener un nombre invisible en Free Fire con el Conversor de Letras Bonitas?',
      a: 'En el Conversor de Letras Bonitas haz clic en el botón de "Copiar Espacio Invisible [ㅤ]". Este carácter especial (Hangul Filler U+3164) del Conversor de Letras Bonitas es validado por el juego como texto real sin mostrar nada en pantalla.',
    },
    {
      q: '¿Cómo poner letras en negrita en Facebook con el Conversor de Letras Bonitas?',
      a: 'Facebook no incluye botones nativos de negrita. Para publicar en negrita:\n1. Escribe tu texto en el Conversor de Letras Bonitas.\n2. Elige el estilo "Negrita Sans (Bold)" en el Conversor de Letras Bonitas.\n3. Haz clic en "Copiar".\n4. Pégalo directamente en tu estado o publicación de Facebook.',
    },
    {
      q: '¿Por qué usar el Conversor de Letras Bonitas para nicks de Free Fire y clanes?',
      a: 'El Conversor de Letras Bonitas ofrece generadores de apodos con alas ꧁༺ ༻꧂, coronas de rey 亗, cruces y letras góticas compatibles con la mayoría de juegos móviles.',
    },
    {
      q: '¿Cómo funciona el traductor a letra cursiva en el Conversor de Letras Bonitas?',
      a: 'El Conversor de Letras Bonitas mapea cada letra que introduces con caracteres matemáticos de caligrafía inglesa (Mathematical Script Unicode) como 𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭 y 𝒮𝒸𝓇𝒾𝓅𝓉 ℛℯℊ𝓊𝓁𝒶𝓇 para que se lean en cualquier red social sin instalar fuentes.',
    },
    {
      q: '¿Puedo diseñar tatuajes y firmas con el Conversor de Letras Bonitas?',
      a: '¡Sí! En el Conversor de Letras Bonitas puedes generar caligrafías manuscritas fluidas, firmas digitales y dedicatorias de alta distinción listas para copiar.',
    },
    {
      q: '¿Qué estilos góticos ofrece el Conversor de Letras Bonitas?',
      a: 'El Conversor de Letras Bonitas incluye estilos Medieval Fraktur (𝔊ó𝔱𝔦𝔠𝔞 y 𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉), ideales para nicks oscuros, clanes y estética dark.',
    },
    {
      q: '¿Cómo copiar letras góticas con símbolos de cruces (✞), espadas (⚔️) y calaveras (☠️)?',
      a: 'En nuestro Estudio Gótico puedes seleccionar estilos decorados como "Gótica con Cruces" (✞ 𝕹𝖔𝖒𝖇𝖗𝖊 ✞), "Gótica Guerrera" (⚔️ 𝔑𝔬𝔪𝔟𝔯𝔢 ⚔️) o "Gótica Demon" (༺† 𝕹𝖔𝖒𝖇𝖗𝖊 †༻), o bien combinar cualquier texto con los símbolos dark de la biblioteca con un solo clic.',
    },
    {
      q: '¿Cómo funciona el generador de texto de cabeza (Upside Down 180°) y al revés?',
      a: 'El volteador de texto mapea cada letra con su correspondiente carácter Unicode invertido (por ejemplo: a ➔ ɐ, e ➔ ǝ, t ➔ ʇ, m ➔ ɯ) e invierte simultáneamente el orden de las letras y signos de puntuación (! ➔ ¡, ? ➔ ¿). De esta forma se genera una frase que se lee perfectamente al voltear la pantalla de tu móvil.',
    },
    {
      q: '¿Cómo escribir texto tachado (̶t̶a̶c̶h̶a̶d̶o̶) para WhatsApp, Instagram y ofertas comerciales?',
      a: 'Para tachar texto se utilizan los caracteres diacríticos combinantes de Unicode (U+0336 para tachado simple o U+0336+U+0335 para doble tachado). A diferencia del formato markdown nativo (~texto~ de WhatsApp que solo funciona dentro de su chat), nuestro texto tachado Unicode funciona en cualquier lugar: biografías de Instagram, nombres de perfil, comentarios de TikTok, publicaciones de Facebook y estados de WhatsApp.',
    },
    {
      q: '¿Cómo usar el tachador para ofertas y descuentos de marketing?',
      a: 'En nuestra pestaña "Tachador de Precios & Ofertas" puedes ingresar el precio original y el precio promocional para generar frases llamativas como "🔥 OFERTA: A̶n̶t̶e̶s̶:̶ ̶$̶9̶9̶ ➔ ¡AHORA: $39!". Esto aumenta la tasa de clics y conversiones en catálogos y mensajes de venta.',
    },
    {
      q: '¿Cómo usar números en círculos (①, ❶, ⑴, ⒈) para listas y rankings?',
      a: 'En nuestro Estudio de Círculos y Cuadros puedes generar automáticamente listas numeradas utilizando caracteres Unicode del bloque "Enclosed Alphanumerics". Dispones de círculos negros rellenos (❶ ❷ ❸), círculos blancos (① ② ③), doble círculo (⓵ ⓶ ⓷) y números del 0 al 50 para enumerar reglas de grupos de WhatsApp, pasos de tutoriales o rankings Top 5 en Instagram.',
    },
    {
      q: '¿Por qué algunas letras en círculos negros se ven como emojis o cuadrados en ciertos móviles?',
      a: 'Las letras en círculos blancos (Ⓒⓘⓡⓒⓤⓛⓞⓢ) y negros (🅒🅘🅡🅒🅤🅛🅞🅢) forman parte del estándar Unicode. La inmensa mayoría de dispositivos modernos (iOS 12+, Android 9+, Windows 10/11) los soportan nativamente. Si deseas máxima compatibilidad visual en cualquier pantalla, los círculos blancos (Ⓐ-Ⓩ, ⓐ-ⓩ) y los números encerrados (①-⑳) ofrecen un soporte muy extendido.',
    },
    {
      q: '¿Qué es el texto Zalgo (Texto Maldito / Cursed Text) y cómo se genera?',
      a: 'El texto Zalgo o texto maldito se crea apilando múltiples caracteres diacríticos combinantes de Unicode (marcas que se colocan encima, en medio o debajo de cada letra). Al acumular decenas de estas marcas sin espaciado, los navegadores y aplicaciones dibujan "tentáculos" y distorsiones que se desbordan visualmente fuera de la línea de texto.',
    },
    {
      q: '¿Cómo limpiar o eliminar el texto Zalgo de un mensaje distorsionado?',
      a: 'En nuestro Laboratorio Glitch incluimos una herramienta gratuita de "Sanitizador & Limpiador de Zalgo". Al pegar cualquier texto corrupto o indescifrable, el sanitizador remueve automáticamente todos los diacríticos superpuestos (Unicode U+0300 a U+036F) y te devuelve el texto legible y limpio.',
    },
    {
      q: '¿Puedo usar letras Glitch en nombres de Free Fire, Discord y TikTok?',
      a: '¡Sí! Los estilos como Hacker 1337 Leet Speak, bloques sombreados (░▒▓), tachado diagonal (̷) y glitch moderado son muy populares en nicks de Free Fire, servidores de Discord, canales de Twitch y bios de TikTok.',
    },
    {
      q: '¿Cómo copiar símbolos como alas de Free Fire (꧁ ꧂), coronas (亗) y espadas (⚔️)?',
      a: 'En nuestra "Biblioteca de Símbolos y Emojis" solo necesitas hacer clic sobre el botón "Copiar" de cualquier símbolo para guardarlo en tu portapapeles. También puedes hacer clic sobre el símbolo para sumarlo a la barra "Combinador de Símbolos", donde puedes armar nicks y decoraciones complejas para copiarlas todas juntas con 1 solo clic.',
    },
    {
      q: '¿Por qué algunos símbolos aparecen como cuadros o signos de interrogación ()?',
      a: 'Los cuadros con signos de interrogación ocurren cuando la versión del sistema operativo de un móvil antiguo no incluye el glifo de ese carácter Unicode reciente. No obstante, los símbolos más utilizados de nuestra biblioteca (alas, espadas, corazones, estrellas, kanji y kaomojis) ofrecen una amplia compatibilidad en dispositivos modernos (Android, iOS, Windows y macOS).',
    },
    {
      q: '¿Cómo se usa el carácter de Espacio Invisible (ㅤ)?',
      a: 'El espacio invisible (Hangul Filler Unicode U+3164) es un carácter en blanco transparente que los juegos y redes sociales reconocen como texto válido. Puedes copiarlo con 1 clic desde el botón superior de nuestra biblioteca para crear nombres invisibles en Free Fire, saltos de línea en biografías de Instagram o enviar mensajes vacíos en WhatsApp.',
    },
    {
      q: '¿Cómo decorar un nombre para Free Fire con alas y símbolos insanos?',
      a: 'En nuestro "Decorador de Textos y Nicks", escribe tu nombre o apodo en el campo superior, selecciona el adorno izquierdo (como alas tibetanas ꧁༺ o corona 亗), el adorno derecho (༻꧂) y elige una tipografía interior como Gótica o Cursiva Bold. La herramienta te indicará si superas la longitud habitual de 12 caracteres de Free Fire para ayudarte a que tu nick encaje dentro de los límites del juego.',
    },
    {
      q: '¿Puedo combinar decoraciones con letras aesthetic para TikTok e Instagram?',
      a: '¡Sí! Puedes elegir plantillas como Coquette Moño (🎀 ִֶָ), Nube & Destellos (☁️ ˚ ༘♡), Flor Sakura (🌸 ✧) o Corazón Árabe (ᥫ᭡) para crear nombres de usuario y títulos destacados en tus biografías de redes sociales con 1 solo clic.',
    },
    {
      q: '¿Cómo activar los emojis secretos y ocultos de TikTok con códigos entre corchetes ([código])?',
      a: 'TikTok cuenta con emojis animados con códigos especiales entre corchetes. Para usarlos, solo escribe el código con corchetes en tus comentarios o descripción (por ejemplo: [wicked] para el diablillo, [yummy] para el emoji con lengua afuera, [loveface] para el beso enamorado o [cry] para lágrimas). Al publicar, TikTok lo convierte en el emoji correspondiente.',
    },
    {
      q: '¿Cuántos caracteres permite la biografía de TikTok y cómo poner letras bonitas en el Nombre Visible?',
      a: 'La biografía de TikTok suele admitir hasta 80 caracteres. Por otro lado, TikTok divide la identidad en campos: el @usuario alfanumérico y el "Nombre Visible / Nombre de Perfil" (frecuentemente hasta 30 caracteres). Puedes pegar cualquier tipografía artística (Cursiva, Negrita Sans, Gótica) en tu Nombre Visible y en tu Biografía.',
    },
    {
      q: '¿Cómo usar letras aesthetic en textos de pantalla para videos de TikTok y CapCut?',
      a: 'En nuestro "Convertidor de Letras para Video & CapCut", puedes ingresar tus subtítulos, títulos o ganchos ("POV:", "3 Errores...") y convertirlos a estilos como Small Caps o Negrita Sans. Al copiar y pegar el texto en la herramienta de texto de CapCut o TikTok, mantendrá la tipografía estilizada.',
    },
    {
      q: '¿Cómo escribir en negrita, cursiva, tachado y monospaciado en WhatsApp?',
      a: 'WhatsApp cuenta con formato nativo: escribe *texto* para Negrita, _texto_ para Cursiva, ~texto~ para Tachado, ```texto``` para Monospaciado, > texto para Citas y • texto para Listas. Además, en nuestro conversor puedes generar tipografías Unicode especiales (como Small Caps o Cursiva Manuscrita) que se ven automáticamente sin códigos adicionales.',
    },
    {
      q: '¿Cuántos caracteres permite la sección "Info / Acerca de" de WhatsApp?',
      a: 'WhatsApp suele admitir hasta 139 caracteres para el estado de texto de tu perfil ("Info / Acerca de"). Nuestro Diseñador de Info incluye un contador en vivo y una vista previa interactiva con modo oscuro para ayudarte a evitar cortes.',
    },
    {
      q: '¿Cómo enviar un mensaje por WhatsApp sin guardar el número en la agenda?',
      a: 'Usa nuestra herramienta de "Chat Directo (wa.me)": selecciona el país (ej: +34 España, +52 México, +54 Argentina), ingresa el número de teléfono y tu mensaje. Se generará un enlace https://wa.me/ que abrirá la conversación directamente en la aplicación.',
    },
    {
      q: '¿Cómo enviar un mensaje invisible o transparente en blanco por WhatsApp?',
      a: 'WhatsApp no permite enviar espacios normales vacíos. Para enviar un mensaje o estado totalmente en blanco, debes usar el carácter Unicode Hangul Filler [ㅤ] que puedes copiar con 1 solo clic desde nuestra pestaña "Mensaje Invisible".',
    },
    {
      q: '¿Cómo poner el espacio invisible en Free Fire y cuántos caracteres permite el juego?',
      a: 'Free Fire suele aplicar como referencia hasta 12 caracteres para el nick de jugador. Como el juego no acepta la barra espaciadora normal, se suele usar el carácter Unicode transparente (Hangul Filler U+3164 [ㅤ]). Contamos con 3 tamaños (Grande, Mediano y Pequeño) para que puedas separar palabras procurando no superar la longitud del juego.',
    },
    {
      q: '¿Cómo poner banderas de países en la firma de Free Fire con códigos de colores?',
      a: 'Para lucir la bandera de tu país en tu perfil de Free Fire, solo debes copiar los bloques de color HEX de nuestro generador de banderas (por ejemplo, México: [008000]█[FFFFFF]█[FF0000]█, Argentina: [75AADB]█[FFFFFF]█[75AADB]█ o Colombia: [FFCD00]██[003087]█[C8102E]█) y pegarlos en la casilla de Firma de tu perfil en el juego.',
    },
    {
      q: '¿Cómo crear nombres combinados para Dúo Dinámico en Free Fire?',
      a: 'En nuestra pestaña "Dúos Dinámicos", puedes ingresar los dos nombres de la pareja y aplicar marcos simétricos como Alas Divinas (꧁༺ ༻꧂), Coronas 亗 o Rayos ⚡ combinados con letras Small Caps, o copiar combinaciones clásicas como KING & QUEEN, BONNIE & CLYDE o JOKER & HARLEY.',
    },
    {
      q: '¿Cómo poner negrita, cursiva o tachado en Facebook (Posts, Comentarios y Marketplace)?',
      a: 'Facebook no incluye botones de negrita para publicaciones personales ni Marketplace. Para escribir en negrita o cursiva, solo escribe tu texto en nuestro Maquetador de Facebook, selecciona la palabra o frase deseada y pulsa el botón [𝗡 Negrita], [𝘐 Cursiva] o [S̶ Tachado]. Luego copia y pega directamente en Facebook: el texto mantendrá el formato en la app y web.',
    },
    {
      q: '¿Cuántos caracteres permite la biografía / presentación de Facebook?',
      a: 'La sección "Presentación" (Bio de perfil) de Facebook suele admitir un límite mostrado de aproximadamente 101 caracteres. Nuestra pestaña "Bio / Presentación" incluye un contador en tiempo real con alerta visual si sobrepasas esa longitud para ayudarte a evitar que el texto supere el límite mostrado.',
    },
    {
      q: '¿Cómo destacar precios y ofertas en Facebook Marketplace?',
      a: 'En nuestro "Generador de Marketplace", introduce el nombre del producto, el precio actual y el precio anterior. La herramienta convertirá el precio viejo a texto tachado (A̶n̶t̶e̶s̶:̶ ̶$̶9̶9̶) y el nuevo a Negrita Sans (💰 𝗣𝗥𝗘𝗖𝗜𝗢: $49), generando una ficha lista para copiar que capta la atención inmediata de los compradores.',
    },
    {
      q: '¿Puedo usar estas tipografías para TikTok, WhatsApp y Facebook?',
      a: '¡Por supuesto! Puedes utilizarlas en estados de WhatsApp, comentarios de TikTok, descripciones de videos, nombres de clanes de Free Fire, tweets en X y publicaciones de Facebook.',
    },
  ];

  return (
    <section className="mt-14 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-800">
      {/* 0. Dynamic SEO Category Banner & Platform Guide */}
      <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/50 border border-indigo-100/90 shadow-2xs">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3 h-3 fill-white" />
            Guía y Consejos Especializados
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tracking-tight mb-2">
            {currentSpecialized.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
            {currentSpecialized.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            {currentSpecialized.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-white/90 p-3 rounded-2xl border border-indigo-100/70 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-indigo-100/60 text-xs">
            <span className="font-extrabold text-slate-500 text-[11px] uppercase tracking-wider">Ejemplos Populares:</span>
            {currentSpecialized.examples.map((ex, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl bg-white text-indigo-700 font-bold border border-indigo-200/80 shadow-2xs">
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 1. ¿Cómo usar el conversor? 3-Step Guide */}
      <div className="mb-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider mb-2 border border-indigo-100">
            <Zap className="w-3.5 h-3.5" />
            Tutorial del Conversor de Letras Bonitas
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            ¿Cómo usar el Conversor de Letras Bonitas?
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-normal">
            Aprende a transformar cualquier texto en tipografías aesthetic con el Conversor de Letras Bonitas en 3 simples pasos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-7 rounded-3xl bg-indigo-50/40 border border-indigo-100/80 transition-all hover:bg-indigo-50/70">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/25">
              1
            </div>
            <h3 className="font-heading font-extrabold text-base text-slate-900 mb-2">
              Escribe tu Texto en el Conversor de Letras Bonitas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Introduce tu nombre, apodo, frase o biografía en el cuadro de texto del Conversor de Letras Bonitas. La herramienta transformará tu texto en tiempo real.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-7 rounded-3xl bg-purple-50/40 border border-purple-100/80 transition-all hover:bg-purple-50/70">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-purple-600/25">
              2
            </div>
            <h3 className="font-heading font-extrabold text-base text-slate-900 mb-2">
              Elige tu Estilo en el Conversor de Letras Bonitas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Explora en el Conversor de Letras Bonitas 90+ tipos de letras bonitas: cursivas, góticas, letras en círculos, invertidas y decoradas con alas.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-7 rounded-3xl bg-emerald-50/40 border border-emerald-100/80 transition-all hover:bg-emerald-50/70">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-600/25">
              3
            </div>
            <h3 className="font-heading font-extrabold text-base text-slate-900 mb-2">
              Copia con 1 Clic desde el Conversor de Letras Bonitas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Haz clic en el botón <strong>[Copiar]</strong> del Conversor de Letras Bonitas y pégalo directamente en Instagram, TikTok, WhatsApp, Free Fire o Facebook.
            </p>
          </div>
        </div>
      </div>

      {/* 2. ¿Cómo funciona la tecnología Unicode? */}
      <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-50/70 rounded-3xl p-7 sm:p-9 border border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Tecnología del Conversor de Letras Bonitas
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 mb-3 tracking-tight">
            ¿Cómo funciona la tecnología de este Conversor de Letras Bonitas?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 font-normal">
            Cuando escribes una letra en el Conversor de Letras Bonitas como la <code className="bg-white px-1.5 py-0.5 rounded-md text-indigo-700 font-bold font-mono border border-slate-200">A</code> (código ASCII 65), nuestro sistema del Conversor de Letras Bonitas mapea ese carácter a sus equivalentes matemáticos y tipográficos en la tabla <strong>Unicode</strong>, tales como <code className="bg-white px-1.5 py-0.5 rounded-md text-indigo-700 font-mono border border-slate-200">𝓐</code>, <code className="bg-white px-1.5 py-0.5 rounded-md text-indigo-700 font-mono border border-slate-200">𝔄</code>, <code className="bg-white px-1.5 py-0.5 rounded-md text-indigo-700 font-mono border border-slate-200">𝔸</code> o <code className="bg-white px-1.5 py-0.5 rounded-md text-indigo-700 font-mono border border-slate-200">Ⓐ</code>.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Al procesarse mediante el Conversor de Letras Bonitas como símbolos universales, las redes sociales reconocen estos caracteres como texto plano puro, permitiendo que cualquier usuario vea tus letras decoradas sin instalar fuentes adicionales.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3.5 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Conversor de Letras Bonitas Multiplataforma</h3>
              <p className="text-[11px] text-slate-600 mt-0.5">El Conversor de Letras Bonitas funciona perfectamente en iPhone, iPad, Android, Windows, Mac y Linux.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Conversor de Letras Bonitas Seguro y Privado</h3>
              <p className="text-[11px] text-slate-600 mt-0.5">En el Conversor de Letras Bonitas la conversión se ejecuta localmente en tu navegador sin almacenar tus textos en servidores.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <Smartphone className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Conversor de Letras Bonitas para Redes Sociales</h3>
              <p className="text-[11px] text-slate-600 mt-0.5">El Conversor de Letras Bonitas está adaptado a las longitudes habituales de Instagram, Free Fire y WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ¿Dónde puedes usar estas fuentes y formatos de letras? */}
      <div className="mb-14">
        <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 mb-6 text-center tracking-tight">
          ¿Dónde puedes usar las fuentes del Conversor de Letras Bonitas?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/letras-para-instagram/" className="block p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-pink-300 hover:shadow-md transition-all group text-inherit no-underline">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3.5 border border-pink-100 group-hover:scale-110 transition-transform">
              <Instagram className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 group-hover:text-pink-600 transition-colors mb-1.5 flex items-center justify-between">
              <span>Conversor de Letras Bonitas para Instagram</span>
              <span className="text-[10px] font-bold text-pink-500">Ver →</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Usa el Conversor de Letras Bonitas para destacar tu biografía con letra cursiva elegante (𝓒𝓾𝓻𝓼𝓲𝓿𝓪), frases en negrita y títulos llamativos para stories y reels.
            </p>
          </a>

          <a href="/letras-para-free-fire/" className="block p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-amber-300 hover:shadow-md transition-all group text-inherit no-underline">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3.5 border border-amber-100 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition-colors mb-1.5 flex items-center justify-between">
              <span>Conversor de Letras Bonitas para Free Fire</span>
              <span className="text-[10px] font-bold text-amber-600">Ver →</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              El Conversor de Letras Bonitas te permite crear nicks legendarios con alas ꧁༺ ༻꧂, coronas de rey 亗, espadas ⚔️ y el espacio invisible para clanes.
            </p>
          </a>

          <a href="/letras-para-whatsapp/" className="block p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-emerald-300 hover:shadow-md transition-all group text-inherit no-underline">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5 border border-emerald-100 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors mb-1.5 flex items-center justify-between">
              <span>Conversor de Letras Bonitas para WhatsApp</span>
              <span className="text-[10px] font-bold text-emerald-600">Ver →</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Con el Conversor de Letras Bonitas escribe mensajes con tachado, subrayado, burbujas o letras góticas que sorprenderán a tus contactos en cualquier chat.
            </p>
          </a>

          <a href="/letras-para-tiktok/" className="block p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-purple-300 hover:shadow-md transition-all group text-inherit no-underline">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3.5 border border-purple-100 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 group-hover:text-purple-600 transition-colors mb-1.5 flex items-center justify-between">
              <span>Conversor de Letras Bonitas para TikTok</span>
              <span className="text-[10px] font-bold text-purple-600">Ver →</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              En el Conversor de Letras Bonitas genera nombres de perfil aesthetic con moños coquette 🎀, nubes ☁️ y destellos ✧ para aumentar tus visualizaciones.
            </p>
          </a>
        </div>
      </div>

      {/* 4. Preguntas Frecuentes (FAQ) */}
      <div id="faq-seccion-seo">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-black uppercase tracking-wider mb-2 border border-purple-100">
            <HelpCircle className="w-3.5 h-3.5" />
            Preguntas Frecuentes del Conversor de Letras Bonitas
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Preguntas Frecuentes sobre el Conversor de Letras Bonitas
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40 transition-colors"
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4.5 text-left flex items-center justify-between font-extrabold text-sm text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4.5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-3.5 leading-relaxed whitespace-pre-line bg-white font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

