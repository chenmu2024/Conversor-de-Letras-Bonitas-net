export type CompatibilityStatus =
  | 'verified'
  | 'reference'
  | 'partial'
  | 'unsupported'
  | 'unknown';

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
  lastChecked?: string;
}

export const UNICODE_COMPATIBILITY_DATA: UnicodeCompatibilityItem[] = [
  {
    id: 'script-bold',
    name: 'Script Bold (Cursiva Negrita)',
    unicodeRange: 'U+1D4D0..U+1D503',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝓣𝓮𝔁𝓉𝓸 𝓑𝓸𝓷𝓲𝓽𝓸',
    rawText: 'Texto Bonito',
    description: 'Glifos matemáticos en cursiva caligráfica con trazo grueso. Utilizados frecuentemente en firmas y biografías.',
    lastReviewed: 'Septiembre 2026',
    chrome: {
      status: 'reference',
      notes: 'El carácter pertenece al estándar Unicode. La representación visual depende de las fuentes del sistema y del motor de renderizado.'
    },
    safari: {
      status: 'reference',
      notes: 'El carácter pertenece al estándar Unicode. La representación visual depende de las fuentes del sistema y del motor de renderizado.'
    },
    android: {
      status: 'reference',
      notes: 'El carácter pertenece al estándar Unicode. La representación visual depende de las fuentes del sistema y del motor de renderizado.'
    },
    ios: {
      status: 'reference',
      notes: 'El carácter pertenece al estándar Unicode. La representación visual depende de las fuentes del sistema y del motor de renderizado.'
    },
    instagram: {
      status: 'unknown',
      notes: 'No disponemos de una comprobación manual documentada para este estilo en versiones recientes.'
    },
    whatsapp: {
      status: 'unknown',
      notes: 'No disponemos de una comprobación manual documentada para este estilo en versiones recientes.'
    },
    tiktok: {
      status: 'unknown',
      notes: 'No disponemos de una comprobación manual documentada para este estilo en versiones recientes.'
    },
    freeFire: {
      status: 'unknown',
      notes: 'No disponemos de una comprobación manual documentada para este estilo en versiones recientes.'
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
    chrome: { status: 'reference', notes: 'Basado en la especificación Unicode (Mathematical Alphanumeric Symbols).' },
    safari: { status: 'reference', notes: 'Basado en la especificación Unicode (Mathematical Alphanumeric Symbols).' },
    android: { status: 'reference', notes: 'Basado en la especificación Unicode (Mathematical Alphanumeric Symbols).' },
    ios: { status: 'reference', notes: 'Basado en la especificación Unicode (Mathematical Alphanumeric Symbols).' },
    instagram: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' },
    whatsapp: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' },
    tiktok: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' },
    freeFire: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' }
  },
  {
    id: 'bold-sans',
    name: 'Bold Sans (Negrita Sans-Serif)',
    unicodeRange: 'U+1D5D4..U+1D607',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝗧𝗲𝘅𝘁𝗼 𝗕𝗼𝗻𝗶𝘁𝗼',
    rawText: 'Texto Bonito',
    description: 'Caracteres sans-serif en negrita continua. Ampliamente utilizados para destacar fragmentos de texto en entornos digitales.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'reference', notes: 'Definido en el estándar Unicode. Renderizado sujeto a fuentes disponibles.' },
    safari: { status: 'reference', notes: 'Definido en el estándar Unicode. Renderizado sujeto a fuentes disponibles.' },
    android: { status: 'reference', notes: 'Definido en el estándar Unicode. Renderizado sujeto a fuentes disponibles.' },
    ios: { status: 'reference', notes: 'Definido en el estándar Unicode. Renderizado sujeto a fuentes disponibles.' },
    instagram: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' },
    whatsapp: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' },
    tiktok: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' },
    freeFire: { status: 'unknown', notes: 'No disponemos de una comprobación manual documentada.' }
  },
  {
    id: 'italic-sans',
    name: 'Italic Sans (Cursiva Sans-Serif)',
    unicodeRange: 'U+1D608..U+1D63B',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝙏𝙚𝙭𝙩𝙤 𝘽𝙤𝙣𝙞𝙩𝙤',
    rawText: 'Texto Bonito',
    description: 'Variante inclinada sans-serif con contraste visual marcado.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'reference', notes: 'Caracteres del bloque Mathematical Alphanumeric Symbols.' },
    safari: { status: 'reference', notes: 'Caracteres del bloque Mathematical Alphanumeric Symbols.' },
    android: { status: 'reference', notes: 'Caracteres del bloque Mathematical Alphanumeric Symbols.' },
    ios: { status: 'reference', notes: 'Caracteres del bloque Mathematical Alphanumeric Symbols.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
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
    chrome: { status: 'reference', notes: 'Caracteres estándar Unicode.' },
    safari: { status: 'reference', notes: 'Caracteres estándar Unicode.' },
    android: { status: 'reference', notes: 'Caracteres estándar Unicode.' },
    ios: { status: 'reference', notes: 'Caracteres estándar Unicode.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
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
    chrome: { status: 'reference', notes: 'Estándar Unicode Mathematical Alphanumeric Symbols.' },
    safari: { status: 'reference', notes: 'Estándar Unicode Mathematical Alphanumeric Symbols.' },
    android: { status: 'reference', notes: 'Estándar Unicode Mathematical Alphanumeric Symbols.' },
    ios: { status: 'reference', notes: 'Estándar Unicode Mathematical Alphanumeric Symbols.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
  },
  {
    id: 'fraktur',
    name: 'Fraktur (Gótica Clásica)',
    unicodeRange: 'U+1D504..U+1D537',
    blockName: 'Mathematical Alphanumeric Symbols',
    example: '𝔗𝔢𝔵𝔱𝔬 𝔅𝔬𝔫𝔦𝔱𝔬',
    rawText: 'Texto Bonito',
    description: 'Estilo gótico medieval tradicional alemán. Caracteres especiales como C, H, I, R, Z están mapeados a bloques complementarios de símbolos como letras.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'reference', notes: 'La representación depende de las fuentes instaladas en el sistema operativo.' },
    safari: { status: 'reference', notes: 'La representación depende de las fuentes instaladas en el sistema operativo.' },
    android: { status: 'reference', notes: 'La representación depende de las fuentes instaladas en el sistema operativo.' },
    ios: { status: 'reference', notes: 'La representación depende de las fuentes instaladas en el sistema operativo.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
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
    chrome: { status: 'reference', notes: 'La visualización final depende del motor tipográfico del dispositivo.' },
    safari: { status: 'reference', notes: 'La visualización final depende del motor tipográfico del dispositivo.' },
    android: { status: 'reference', notes: 'La visualización final depende del motor tipográfico del dispositivo.' },
    ios: { status: 'reference', notes: 'La visualización final depende del motor tipográfico del dispositivo.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
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
    chrome: { status: 'reference', notes: 'Caracteres estándar definidos en Unicode.' },
    safari: { status: 'reference', notes: 'Caracteres estándar definidos en Unicode.' },
    android: { status: 'reference', notes: 'Caracteres estándar definidos en Unicode.' },
    ios: { status: 'reference', notes: 'Caracteres estándar definidos en Unicode.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
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
    chrome: { status: 'reference', notes: 'Glifos dispersos en bloques fonéticos Unicode; la representación depende de las fuentes del sistema.' },
    safari: { status: 'reference', notes: 'Glifos dispersos en bloques fonéticos Unicode; la representación depende de las fuentes del sistema.' },
    android: { status: 'reference', notes: 'Glifos dispersos en bloques fonéticos Unicode; la representación depende de las fuentes del sistema.' },
    ios: { status: 'reference', notes: 'Glifos dispersos en bloques fonéticos Unicode; la representación depende de las fuentes del sistema.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
  },
  {
    id: 'circled',
    name: 'Circled (Letras en Círculos)',
    unicodeRange: 'U+24B6..U+24E9',
    blockName: 'Enclosed Alphanumerics',
    example: 'Ⓣⓔⓧⓣⓞ Ⓑⓞⓝⓘⓣⓞ',
    rawText: 'Texto Bonito',
    description: 'Caracteres alfanuméricos encerrados en una circunferencia continua (bloque Enclosed Alphanumerics).',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'reference', notes: 'Caracteres del bloque Enclosed Alphanumerics.' },
    safari: { status: 'reference', notes: 'Caracteres del bloque Enclosed Alphanumerics.' },
    android: { status: 'reference', notes: 'Caracteres del bloque Enclosed Alphanumerics.' },
    ios: { status: 'reference', notes: 'Caracteres del bloque Enclosed Alphanumerics.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
  },
  {
    id: 'squared',
    name: 'Squared (Letras en Cuadros)',
    unicodeRange: 'U+1F130..U+1F149',
    blockName: 'Enclosed Ideographic Supplement',
    example: '🅃🄴🅇🅃🄾',
    rawText: 'TEXTO',
    description: 'Caracteres latinos encuadrados en recuadros rectangulares o cuadrados dentro del plano suplementario.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'reference', notes: 'Pertenecen al plano suplementario Unicode (SMP).' },
    safari: { status: 'reference', notes: 'Pertenecen al plano suplementario Unicode (SMP).' },
    android: { status: 'reference', notes: 'Pertenecen al plano suplementario Unicode (SMP).' },
    ios: { status: 'reference', notes: 'Pertenecen al plano suplementario Unicode (SMP).' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
  },
  {
    id: 'fullwidth',
    name: 'Fullwidth (Ancho Completo Estilo Oriental)',
    unicodeRange: 'U+FF01..U+FF5E',
    blockName: 'Halfwidth and Fullwidth Forms',
    example: 'Ｔｅｘｔｏ　Ｂｏｎｉｔｏ',
    rawText: 'Texto Bonito',
    description: 'Caracteres de ancho estandarizado tradicionalmente utilizados en sistemas CJK (China, Japón, Corea) para alinear con caracteres ideográficos.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'reference', notes: 'Bloque estándar Halfwidth and Fullwidth Forms.' },
    safari: { status: 'reference', notes: 'Bloque estándar Halfwidth and Fullwidth Forms.' },
    android: { status: 'reference', notes: 'Bloque estándar Halfwidth and Fullwidth Forms.' },
    ios: { status: 'reference', notes: 'Bloque estándar Halfwidth and Fullwidth Forms.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' }
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
    chrome: { status: 'reference', notes: 'Mapeo heterogéneo de glifos fonéticos Unicode.' },
    safari: { status: 'reference', notes: 'Mapeo heterogéneo de glifos fonéticos Unicode.' },
    android: { status: 'reference', notes: 'Mapeo heterogéneo de glifos fonéticos Unicode.' },
    ios: { status: 'reference', notes: 'Mapeo heterogéneo de glifos fonéticos Unicode.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: {
      status: 'partial',
      notes: 'Al utilizar glifos procedentes de distintos bloques fonéticos, la alineación vertical puede variar según la fuente del juego.'
    }
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
    chrome: { status: 'reference', notes: 'Mecanismo combinatorio estándar de Unicode.' },
    safari: { status: 'reference', notes: 'Mecanismo combinatorio estándar de Unicode.' },
    android: { status: 'reference', notes: 'Mecanismo combinatorio estándar de Unicode.' },
    ios: { status: 'reference', notes: 'Mecanismo combinatorio estándar de Unicode.' },
    instagram: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    whatsapp: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    tiktok: { status: 'unknown', notes: 'Sin datos de comprobación manual reciente.' },
    freeFire: {
      status: 'partial',
      notes: 'Los caracteres combinatorios (U+0336) incrementan la longitud en bytes del texto, pudiendo alcanzar el límite de caracteres en campos cortos.'
    }
  },
  {
    id: 'zalgo',
    name: 'Zalgo / Glitch (Marcas Diacríticas Superpuestas)',
    unicodeRange: 'U+0300..U+036F',
    blockName: 'Combining Diacritical Marks',
    example: 'T̶e̷x̸t̴o̵ ̶B̷o̵n̶i̸t̵o̴',
    rawText: 'Texto Bonito',
    description: 'Acumulación de tildes, virgulillas y acentos combinatorios superiores e inferiores sobre las letras base.',
    lastReviewed: 'Septiembre 2026',
    chrome: { status: 'reference', notes: 'Renderiza marcas diacríticas según las reglas del motor tipográfico.' },
    safari: { status: 'reference', notes: 'Renderiza marcas diacríticas según las reglas del motor tipográfico.' },
    android: { status: 'partial', notes: 'En algunas interfaces el desbordamiento vertical puede ser recortado visualmente.' },
    ios: { status: 'partial', notes: 'En contenedores con altura de línea fija puede producirse recorte visual del desbordamiento vertical.' },
    instagram: {
      status: 'partial',
      notes: 'La acumulación excesiva de diacríticos combinatorios puede ser normalizada o truncada por filtros de moderación.'
    },
    whatsapp: {
      status: 'reference',
      notes: 'Los caracteres combinatorios se transmiten en mensajes, aunque niveles extremos pueden sobrepasar la caja de texto.'
    },
    tiktok: {
      status: 'partial',
      notes: 'Textos con sobrecarga de diacríticos pueden ser filtrados en comentarios o nombres de perfil.'
    },
    freeFire: {
      status: 'unsupported',
      notes: 'Los filtros y límites de buffer del juego restringen el uso de marcas diacríticas apiladas.'
    }
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
    typicalUse: 'Utilizado con frecuencia como carácter separador o espacio invisible en perfiles, mensajes y nicks donde se admite UTF-8.',
    limitations: 'Ocupa 3 bytes en codificación UTF-8 (0xE3 0x85 0xA4). En campos que solo admiten caracteres ASCII básicos o filtros específicos puede no ser aceptado.',
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
    typicalUse: 'Creación de arte ASCII/Braille, separación visual y saltos de línea en redes sociales y servicios de chat.',
    limitations: 'Ocupa 3 bytes en UTF-8 (0xE2 0xA0 0x80). Tiene un ancho fijo de celda braille en tipografías no monoespaciadas.',
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
    limitations: 'No ocupa ancho visible. La mayoría de juegos y redes sociales lo ignoran o eliminan mediante funciones de limpieza automática.',
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
    limitations: 'Al igual que U+200B, tiene ancho cero y suele ser descartado por sanitizadores de nombres de usuario.',
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
    category: 'unicode',
    lastChecked: '2026-09-19'
  },
  {
    id: 'ref-unicode-jamo',
    title: 'Hangul Compatibility Jamo (Range: 3130–318F)',
    organization: 'Unicode Consortium',
    url: 'https://www.unicode.org/charts/PDF/U3130.pdf',
    description: 'Documentación técnica del carácter U+3164 (Hangul Filler) dentro del estándar Unicode.',
    category: 'unicode',
    lastChecked: '2026-09-19'
  },
  {
    id: 'ref-instagram-help',
    title: 'Centro de Ayuda Oficial de Instagram',
    organization: 'Meta / Instagram Help Center',
    url: 'https://help.instagram.com/',
    description: 'Portal oficial de soporte de Instagram. Consulta aquí las políticas de perfil, nombres mostrados y normas de la comunidad.',
    category: 'social',
    lastChecked: '2026-09-19'
  },
  {
    id: 'ref-whatsapp-faq',
    title: 'Centro de Ayuda Oficial de WhatsApp',
    organization: 'WhatsApp FAQ',
    url: 'https://faq.whatsapp.com/',
    description: 'Portal oficial de soporte de WhatsApp. Información sobre formato de texto nativo y funciones de mensajería.',
    category: 'social',
    lastChecked: '2026-09-19'
  },
  {
    id: 'ref-tiktok-support',
    title: 'Centro de Asistencia de TikTok',
    organization: 'TikTok Support',
    url: 'https://support.tiktok.com/',
    description: 'Portal oficial de asistencia de TikTok sobre edición de perfil, nombres de usuario y normas comunitarias.',
    category: 'social',
    lastChecked: '2026-09-19'
  },
  {
    id: 'ref-freefire-support',
    title: 'Soporte al Jugador de Garena Free Fire',
    organization: 'Garena Free Fire Support',
    url: 'https://ffsupport.garena.com/',
    description: 'Centro oficial de soporte de Garena Free Fire. Consulta aquí las políticas de cuentas, apodos de jugador y notas de parches.',
    category: 'gaming',
    lastChecked: '2026-09-19'
  }
];
