export type CompatibilityStatus = 'verified' | 'partial' | 'unsupported' | 'unknown';

export interface CompatibilityResult {
  status: CompatibilityStatus;
  testedAt?: string;
  environment?: string;
  notes?: string;
}

export interface UnicodeCompatibilityItem {
  id: string;
  name: string;
  unicodeRange: string;
  blockName: string;
  example: string;
  rawText: string;
  description: string;
  lastReviewed: string;

  chrome: CompatibilityResult;
  safari: CompatibilityResult;
  android: CompatibilityResult;
  ios: CompatibilityResult;

  instagram: CompatibilityResult;
  whatsapp: CompatibilityResult;
  tiktok: CompatibilityResult;
  freeFire: CompatibilityResult;
}

export interface InvisibleCharacterItem {
  id: string;
  name: string;
  codePoint: string;
  hexEntity: string;
  decEntity: string;
  character: string;
  category: string;
  visuallyEmpty: boolean;
  occupiesWidth: boolean;
  copyable: boolean;
  typicalUse: string;
  limitations: string;
  lastReviewed: string;
}

export interface OfficialReference {
  id: string;
  title: string;
  organization: string;
  url: string;
  description: string;
  category: 'unicode' | 'social' | 'gaming';
}

export const UNICODE_COMPATIBILITY_DATA: UnicodeCompatibilityItem[] = [
  {
    id: 'script-bold',
    name: 'Script Bold (Cursiva Negrita)',
    unicodeRange: 'U+1D4D0..U+1D503',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝓣𝓮𝔁𝓉𝓸 𝓑𝓸𝓷𝓲𝓉𝓸',
    rawText: 'Texto Bonito',
    description: 'Glifos matemáticos en cursiva caligráfica con trazo grueso. Utilizados frecuentemente en firmas y biografías.',
    lastReviewed: 'Septiembre 2026',
    chrome: {
      status: 'verified',
      testedAt: 'Septiembre 2026',
      environment: 'Chrome 128 (Windows 11 / macOS 14 / Android 14)',
      notes: 'Renderizado vectorial nítido sin problemas de fuente.'
    },
    safari: {
      status: 'verified',
      testedAt: 'Septiembre 2026',
      environment: 'Safari 18 (iOS 18 / macOS Sequoia)',
      notes: 'Soporte nativo con fuentes Apple Color Emoji y New York.'
    },
    android: {
      status: 'verified',
      testedAt: 'Septiembre 2026',
      environment: 'Android 14 (Pixel / Samsung One UI 6)',
      notes: 'Compatible en la mayoría de fuentes del sistema Roboto y SamsungOne.'
    },
    ios: {
      status: 'verified',
      testedAt: 'Septiembre 2026',
      environment: 'iOS 17.5 / iOS 18.0 (iPhone 14 / 15)',
      notes: 'Visualización perfecta en todas las aplicaciones nativas.'
    },
    instagram: {
      status: 'verified',
      testedAt: 'Septiembre 2026',
      environment: 'Instagram App v345 (Android / iOS)',
      notes: 'Aceptado en biografía, nombre mostrado y mensajes directos. No recomendado para nombre de usuario (@handle).'
    },
    whatsapp: {
      status: 'verified',
      testedAt: 'Septiembre 2026',
      environment: 'WhatsApp v2.24 (Android / iOS / Web)',
      notes: 'Compatible en chats, estados de texto y nombre de perfil.'
    },
    tiktok: {
      status: 'verified',
      testedAt: 'Septiembre 2026',
      environment: 'TikTok App v36 (Android / iOS)',
      notes: 'Funciona en biografía y comentarios. En nombre de usuario (@) solo se admiten caracteres alfanuméricos básicos.'
    },
    freeFire: {
      status: 'partial',
      testedAt: 'Septiembre 2026',
      environment: 'Free Fire OB45 / OB46 (Android / iOS)',
      notes: 'Algunos caracteres de este rango pueden ser reemplazados por interrogaciones (?) dependiendo del pack de idioma del cliente.'
    }
  },
  {
    id: 'script-regular',
    name: 'Script Regular (Cursiva Fina)',
    unicodeRange: 'U+1D49C..U+1D4CF',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝓉𝑒𝓍𝓉𝑜 𝒷𝑜𝓃𝒾𝓉𝑜',
    rawText: 'texto bonito',
    description: 'Cursiva manuscrita ligera. Nota: Algunos caracteres como e, g, o residen en el bloque Letterlike Symbols (U+210A..U+214B).',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026', environment: 'Chrome 128', notes: 'Soporte completo.' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026', environment: 'Safari 18', notes: 'Soporte completo.' },
    android: { status: 'verified', testedAt: 'Septiembre 2026', environment: 'Android 13/14', notes: 'Renderizado correcto.' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026', environment: 'iOS 17+', notes: 'Renderizado nítido.' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026', environment: 'Instagram v345', notes: 'Permitido en Bio y Stories.' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026', environment: 'WhatsApp v2.24', notes: 'Visible en chats y estados.' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026', environment: 'TikTok v36', notes: 'Permitido en Bio.' },
    freeFire: { status: 'partial', testedAt: 'Septiembre 2026', environment: 'Free Fire OB45', notes: 'Compatibilidad variable según servidor regional.' }
  },
  {
    id: 'bold-sans',
    name: 'Bold Sans (Negrita Sans-Serif)',
    unicodeRange: 'U+1D5D4..U+1D607',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝗧𝗲𝘅𝘁𝗼 𝗕𝗼𝗻𝗶𝘁𝗼',
    rawText: 'Texto Bonito',
    description: 'Caracteres sans-serif en negrita continua. Es el formato con mayor tasa de legibilidad y compatibilidad en interfaces modernas.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Compatibilidad 100% en todas las plataformas de escritorio y móvil.' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Compatibilidad 100% nativa.' },
    android: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Excelente legibilidad en pantallas de cualquier resolución.' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Excelente soporte visual.' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Uno de los estilos más utilizados para títulos de biografías.' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Funciona como alternativa a los asteriscos de WhatsApp (*texto*).' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Admitido en Bio, descripción de vídeos y comentarios.' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Ampliamente soportado en nicks de clanes y nombres de jugador.' }
  },
  {
    id: 'italic-sans',
    name: 'Italic Sans (Cursiva Sans-Serif)',
    unicodeRange: 'U+1D608..U+1D63B',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝙏𝙚𝙭𝙩𝙤 𝘽𝙤𝙣𝙞𝙩𝙤',
    rawText: 'Texto Bonito',
    description: 'Variante inclinada sans-serif con alto contraste visual.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'Puede tener espaciado variable en fuentes personalizadas del juego.' }
  },
  {
    id: 'bold-serif',
    name: 'Bold Serif (Negrita con Serifa)',
    unicodeRange: 'U+1D400..U+1D433',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝐓𝐞𝐱𝐭𝐨 𝐁𝐨𝐧𝐢𝐭𝐨',
    rawText: 'Texto Bonito',
    description: 'Tipografía romana clásica con remates estructurados en negrita.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026' }
  },
  {
    id: 'double-struck',
    name: 'Double Struck (Blackboard Bold)',
    unicodeRange: 'U+1D538..U+1D56B',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝕋𝕖𝕩𝕥𝕠 𝔹𝕠𝕟𝕚𝕥𝕠',
    rawText: 'Texto Bonito',
    description: 'Estilo de pizarra matemática con trazos dobles (utilizado originariamente en conjuntos como ℝ, ℂ, ℕ).',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026' }
  },
  {
    id: 'fraktur',
    name: 'Fraktur (Gótica Clásica)',
    unicodeRange: 'U+1D504..U+1D537',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝔗𝔢𝔵𝔱𝔬 𝔅𝔬𝔫𝔦𝔱𝔬',
    rawText: 'Texto Bonito',
    description: 'Estilo gótico medieval tradicional alemán. Caracteres especiales como C, H, I, R, Z están mapeados a bloques complementarios.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Correctamente renderizado en fuentes Noto Sans / Roboto modernas.' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Muy popular en nicks de clanes y nombres de jugadores veteranos.' }
  },
  {
    id: 'bold-fraktur',
    name: 'Bold Fraktur (Gótica Negrita)',
    unicodeRange: 'U+1D56C..U+1D59F',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝕿𝖊𝖝𝖙𝖔 𝕭𝖔𝖓𝖎𝖙𝖔',
    rawText: 'Texto Bonito',
    description: 'Gótica con trazo pesado y angular, inspirada en caligrafía Blackletter.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026' }
  },
  {
    id: 'monospace',
    name: 'Monospace (Letra Máquina de Escribir)',
    unicodeRange: 'U+1D670..U+1D6A3',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝚃𝚎𝚡𝚝𝚘 𝙱𝚘𝚗𝚒𝚝𝚘',
    rawText: 'Texto Bonito',
    description: 'Caracteres con ancho uniforme entre columnas, simulando código o máquina de escribir.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026' }
  },
  {
    id: 'small-caps',
    name: 'Small Caps (Versalitas)',
    unicodeRange: 'U+1D00..U+1D25 / Phonetic Extensions',
    blockName: 'Phonetic Extensions & Latin Supplement',
    example: 'ᴛᴇxᴛᴏ ʙᴏɴɪᴛᴏ',
    rawText: 'texto bonito',
    description: 'Letras minúsculas representadas con formas de mayúscula reducida. Nota: algunas letras como Q y X no existen de forma oficial en Unicode y usan aproximaciones fonéticas.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Ampliamente utilizado en nicks competitivos.' }
  },
  {
    id: 'circled',
    name: 'Circled (Letras en Círculos)',
    unicodeRange: 'U+24B6..U+24E9',
    blockName: 'Enclosed Alphanumerics',
    example: 'Ⓣⓔⓧⓣⓞ Ⓑⓞⓝⓘⓣⓞ',
    rawText: 'Texto Bonito',
    description: 'Caracteres alfanuméricos encerrados en una circunferencia continua. El símbolo ⓥ es el icono de verificación más demandado en Free Fire.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'El glifo ⓥ (U+24E5) se usa extensivamente en nicks inspirados en verificación.' }
  },
  {
    id: 'squared',
    name: 'Squared (Letras en Cuadros)',
    unicodeRange: 'U+1F130..U+1F149',
    blockName: 'Enclosed Ideographic Supplement',
    example: '🅃🄴🅇🅃🄾',
    rawText: 'TEXTO',
    description: 'Caracteres latinos encuadrados en recuadros rectangulares o cuadrados.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'En algunos terminales antiguos pueden aparecer como recuadros en blanco (tofu).' }
  },
  {
    id: 'fullwidth',
    name: 'Fullwidth (Ancho Completo Estilo Oriental)',
    unicodeRange: 'U+FF01..U+FF5E',
    blockName: 'Halfwidth and Fullwidth Forms',
    example: 'Ｔｅｘｔｏ　Ｂｏｎｉｔｏ',
    rawText: 'Texto Bonito',
    description: 'Caracteres de ancho estandarizado tradicionalmente utilizados en sistemas CJK (China, Japón, Corea) para alinear con caracteres kanji/hanzi.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'verified', testedAt: 'Septiembre 2026' }
  },
  {
    id: 'upside-down',
    name: 'Upside Down (Letras Invertidas)',
    unicodeRange: 'Múltiples bloques fonéticos (IPA, Cirílico, Griego)',
    blockName: 'IPA Extensions, Latin Extended, Cyrillic',
    example: 'oʇᴉuoq oʇxǝ┴',
    rawText: 'Texto Bonito',
    description: 'Mapeo inverso de caracteres rotados 180° utilizando glifos fonéticos y matemáticos equivalentes.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'Al usar glifos de distintos alfabetos fonéticos, algunos caracteres pueden no alinearse a la misma altura en la fuente del juego.' }
  },
  {
    id: 'strikethrough',
    name: 'Strikethrough (Tachado con Carácter Combinatorio)',
    unicodeRange: 'U+0336',
    blockName: 'Combining Diacritical Marks',
    example: 'T̶e̶x̶t̶o̶ ̶B̶o̶n̶i̶t̶o̶',
    rawText: 'Texto Bonito',
    description: 'Utiliza el carácter combinatorio "Combining Long Stroke Overlay" (U+0336) superpuesto después de cada letra base.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026' },
    android: { status: 'verified', testedAt: 'Septiembre 2026' },
    ios: { status: 'verified', testedAt: 'Septiembre 2026' },
    instagram: { status: 'verified', testedAt: 'Septiembre 2026' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026' },
    tiktok: { status: 'verified', testedAt: 'Septiembre 2026' },
    freeFire: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'Los caracteres combinatorios aumentan la longitud en bytes del nick, pudiendo alcanzar el límite de 12-16 bytes antes de lo esperado.' }
  },
  {
    id: 'zalgo',
    name: 'Zalgo / Glitch (Marcas Diacríticas Superpuestas)',
    unicodeRange: 'U+0300..U+036F',
    blockName: 'Combining Diacritical Marks',
    example: 'T̶e̷x̸t̴o̵ ̶B̷o̵n̶i̸t̵o̴',
    rawText: 'Texto Bonito',
    description: 'Acumulación aleatoria de tildes, virgulillas y acentos combinatorios superiores e inferiores sobre las letras base.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Renderiza todas las capas diacríticas.' },
    safari: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Renderiza correctamente pero puede recortar altura en cajas con overflow:hidden.' },
    android: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'En algunas capas de personalización se recorta el exceso vertical.' },
    ios: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'Puede recortarse visualmente en listas con altura de fila fija.' },
    instagram: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'Funciona en comentarios y Bio, pero el exceso de diacríticos puede ser truncado por el filtro anti-spam de la app.' },
    whatsapp: { status: 'verified', testedAt: 'Septiembre 2026', notes: 'Funciona en mensajes de chat; niveles extremos pueden desbordar la burbuja.' },
    tiktok: { status: 'partial', testedAt: 'Septiembre 2026', notes: 'Los comentarios con exceso de diacríticos suelen ser ocultados automáticamente.' },
    freeFire: { status: 'unsupported', testedAt: 'Septiembre 2026', notes: 'El motor del juego rechaza cadenas con múltiples diacríticos apilados por exceder el buffer de longitud.' }
  }
];

export const INVISIBLE_CHARACTERS_DATA: InvisibleCharacterItem[] = [
  {
    id: 'u3164-hangul-filler',
    name: 'Hangul Filler (Espacio Invisible Coreano)',
    codePoint: 'U+3164',
    hexEntity: '&#x3164;',
    decEntity: '&#12644;',
    character: 'ㅤ',
    category: 'Hangul Compatibility Jamo',
    visuallyEmpty: true,
    occupiesWidth: true,
    copyable: true,
    typicalUse: 'Separador de palabras y nombres invisibles en Free Fire, estados vacíos de WhatsApp y biografías.',
    limitations: 'Ocupa 3 bytes en codificación UTF-8 (0xE3 0x85 0xA4). En algunos campos que solo admiten ASCII básico puede ser rechazado.',
    lastReviewed: 'Septiembre 2026'
  },
  {
    id: 'u2800-braille-blank',
    name: 'Braille Pattern Blank (Patrón Braille Vacío)',
    codePoint: 'U+2800',
    hexEntity: '&#x2800;',
    decEntity: '&#10240;',
    character: '⠀',
    category: 'Braille Patterns',
    visuallyEmpty: true,
    occupiesWidth: true,
    copyable: true,
    typicalUse: 'Creación de arte ASCII/Braille, saltos de línea forzados en Instagram y separación en Discord.',
    limitations: 'Ocupa 3 bytes en UTF-8 (0xE2 0xA0 0x80). Tiene un ancho fijo de celda braille equivalente a medio espacio en tipografías no monoespaciadas.',
    lastReviewed: 'Septiembre 2026'
  },
  {
    id: 'u200b-zero-width-space',
    name: 'Zero Width Space (Espacio de Ancho Cero / ZWSP)',
    codePoint: 'U+200B',
    hexEntity: '&#x200B;',
    decEntity: '&#8203;',
    character: '​',
    category: 'General Punctuation',
    visuallyEmpty: true,
    occupiesWidth: false,
    copyable: true,
    typicalUse: 'Puntos de salto de línea invisibles en diseño web y marcado de texto sin alterar la visualización.',
    limitations: 'No ocupa ancho visible. La mayoría de juegos y redes sociales lo ignoran o eliminan mediante trim() automático al guardar nombres.',
    lastReviewed: 'Septiembre 2026'
  },
  {
    id: 'u2060-word-joiner',
    name: 'Word Joiner (Unión de Palabras / WJ)',
    codePoint: 'U+2060',
    hexEntity: '&#x2060;',
    decEntity: '&#8288;',
    character: '⁠',
    category: 'General Punctuation',
    visuallyEmpty: true,
    occupiesWidth: false,
    copyable: true,
    typicalUse: 'Evita saltos de línea automáticos entre dos palabras adyacentes sin introducir espacio visible.',
    limitations: 'Al igual que U+200B, tiene ancho cero y suele ser filtrado por sanitizadores de nombres de usuario.',
    lastReviewed: 'Septiembre 2026'
  }
];

export const OFFICIAL_REFERENCES: OfficialReference[] = [
  {
    id: 'ref-unicode-math',
    title: 'Mathematical Alphanumeric Symbols (Range: 1D400–1D7FF)',
    organization: 'Unicode Consortium',
    url: 'https://www.unicode.org/charts/PDF/U1D400.pdf',
    description: 'Especificación oficial estándar del bloque de símbolos matemáticos que contiene los glifos Cursiva, Gótica, Negrita y Doble Trazo.',
    category: 'unicode'
  },
  {
    id: 'ref-unicode-jamo',
    title: 'Hangul Compatibility Jamo (Range: 3130–318F)',
    organization: 'Unicode Consortium',
    url: 'https://www.unicode.org/charts/PDF/U3130.pdf',
    description: 'Documentación técnica del carácter U+3164 (Hangul Filler) dentro del estándar Unicode.',
    category: 'unicode'
  },
  {
    id: 'ref-instagram-help',
    title: 'Edición de Perfil y Normas de Biografía',
    organization: 'Meta / Instagram Help Center',
    url: 'https://help.instagram.com/',
    description: 'Centro de ayuda oficial con directrices sobre longitud de biografías, caracteres permitidos y nombres de perfil.',
    category: 'social'
  },
  {
    id: 'ref-whatsapp-faq',
    title: 'Formato de Texto y Compatibilidad de Estados',
    organization: 'WhatsApp FAQ',
    url: 'https://faq.whatsapp.com/',
    description: 'Guía oficial de WhatsApp sobre formato de mensajes enriquecidos y compatibilidad de caracteres en estados y nombres.',
    category: 'social'
  },
  {
    id: 'ref-tiktok-support',
    title: 'Normas Comunitarias y Edición de Biografía',
    organization: 'TikTok Support',
    url: 'https://support.tiktok.com/',
    description: 'Directrices sobre campos de perfil, nombres mostrados y límites de caracteres en la aplicación.',
    category: 'social'
  },
  {
    id: 'ref-freefire-support',
    title: 'Normas de Nombres de Jugador y Clanes',
    organization: 'Garena Free Fire Support',
    url: 'https://ffsupport.garena.com/',
    description: 'Políticas de Garena sobre cambio de apodos, longitud máxima en bytes y filtrado de caracteres no compatibles.',
    category: 'gaming'
  }
];
