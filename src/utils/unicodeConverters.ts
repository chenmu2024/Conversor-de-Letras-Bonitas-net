import { FontGenerator, TabCategory } from '../types';

// Standard letter maps for Unicode blocks
const ALPHABET_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';

// Map utility for Spanish and European accents & special characters
const SPANISH_ACCENT_FALLBACK: Record<string, string> = {
  'á': 'a', 'à': 'a', 'ä': 'a', 'â': 'a', 'ã': 'a', 'å': 'a',
  'é': 'e', 'è': 'e', 'ë': 'e', 'ê': 'e',
  'í': 'i', 'ì': 'i', 'ï': 'i', 'î': 'i',
  'ó': 'o', 'ò': 'o', 'ö': 'o', 'ô': 'o', 'õ': 'o',
  'ú': 'u', 'ù': 'u', 'ü': 'u', 'û': 'u',
  'ñ': 'n', 'ç': 'c', 'ý': 'y', 'ÿ': 'y',
  'Á': 'A', 'À': 'A', 'Ä': 'A', 'Â': 'A', 'Ã': 'A', 'Å': 'A',
  'É': 'E', 'È': 'E', 'Ë': 'E', 'Ê': 'E',
  'Í': 'I', 'Ì': 'I', 'Ï': 'I', 'Î': 'I',
  'Ó': 'O', 'Ò': 'O', 'Ö': 'O', 'Ô': 'O', 'Õ': 'O',
  'Ú': 'U', 'Ù': 'U', 'Ü': 'U', 'Û': 'U',
  'Ñ': 'N', 'Ç': 'C', 'Ý': 'Y',
};

function createCharMap(
  upperMap: string[],
  lowerMap: string[],
  numberMap?: string[]
): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    if (upperMap[i]) map[ALPHABET_UPPER[i]] = upperMap[i];
    if (lowerMap[i]) map[ALPHABET_LOWER[i]] = lowerMap[i];
  }
  if (numberMap) {
    for (let i = 0; i < 10; i++) {
      if (numberMap[i]) map[NUMBERS[i]] = numberMap[i];
    }
  }
  return map;
}

// Clean broken surrogate pairs or replacement chars
export function sanitizeUnicode(text: string): string {
  if (!text) return '';
  return text
    .replace(/\uFFFD/g, '') // remove replacement chars if repairing
    .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, ''); // strip lone surrogates
}

function mapString(text: string, charMap: Record<string, string>): string {
  // Use Array.from to prevent breaking surrogate pairs (e.g., emojis or math symbols)
  return Array.from(text)
    .map((c) => {
      if (charMap[c]) return charMap[c];
      const base = SPANISH_ACCENT_FALLBACK[c];
      if (base && charMap[base]) return charMap[base];
      return c;
    })
    .join('');
}

// 1. Script Bold (𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭)
const SCRIPT_BOLD_UPPER = [
  '𝓐','𝓑','𝓒','𝓓','𝓔','𝓕','𝓖','𝓗','𝓘','𝓙','𝓚','𝓛','𝓜',
  '𝓝','𝓞','𝓟','𝓠','𝓡','𝓢','𝓣','𝓤','𝓥','𝓦','𝓧','𝓨','𝓩'
];
const SCRIPT_BOLD_LOWER = [
  '𝓪','𝓫','𝓬','𝓭','𝓮','𝓯','𝓰','𝓱','𝓲','𝓳','𝓴','𝓵','𝓶',
  '𝓷','𝓸','𝓹','𝓺','𝓻','𝓼','𝓽','𝓾','𝓿','𝔀','𝔁','𝔂','𝔃'
];
const scriptBoldMap = createCharMap(SCRIPT_BOLD_UPPER, SCRIPT_BOLD_LOWER);

// 2. Script Regular (𝒮𝒸𝓇𝒾𝓅𝓉 ℛℯℊ𝓊𝓁𝒶𝓇)
const SCRIPT_REGULAR_UPPER = [
  '𝒜','ℬ','𝒞','𝒟','ℰ','ℱ','𝒢','ℋ','ℐ','𝒥','𝒦','ℒ','ℳ',
  '𝒩','𝒪','𝒫','𝒬','ℛ','𝒮','𝒯','𝒰','𝒱','𝒲','𝒳','𝒴','𝒵'
];
const SCRIPT_REGULAR_LOWER = [
  '𝒶','𝒷','𝒸','𝒹','ℯ','𝒻','ℊ','𝒽','𝒾','𝒿','𝓀','𝓁','𝓂',
  '𝓃','ℴ','𝓅','𝓆','𝓇','𝓈','𝓉','𝓊','𝓋','𝓌','𝓍','𝓎','𝓏'
];
const scriptRegularMap = createCharMap(SCRIPT_REGULAR_UPPER, SCRIPT_REGULAR_LOWER);

// 3. Fraktur / Gótica Regular (𝔊ó𝔱𝔦𝔠𝔞)
const FRAKTUR_UPPER = [
  '𝔄','𝔅','ℭ','𝔇','𝔈','𝔉','𝔊','ℌ','ℑ','𝔍','𝔎','𝔏','𝔐',
  '𝔑','𝔒','𝔓','𝔔','ℜ','𝔖','𝔗','𝔘','𝔙','𝔚','𝔛','𝔜','ℨ'
];
const FRAKTUR_LOWER = [
  '𝔞','𝔟','𝔠','𝔡','𝔢','𝔣','𝔤','𝔥','𝔦','𝔧','𝔨','𝔩','𝔪',
  '𝔫','𝔬','𝔭','𝔮','𝔯','𝔰','𝔱','𝔲','𝔳','𝔴','𝔵','𝔶','𝔷'
];
const frakturMap = createCharMap(FRAKTUR_UPPER, FRAKTUR_LOWER);

// 4. Fraktur Bold (𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉)
const FRAKTUR_BOLD_UPPER = [
  '𝕬','𝕭','𝕮','𝕯','𝕰','𝕱','𝕲','𝕳','𝕴','𝕵','𝕶','𝕷','𝕸',
  '𝕹','𝕺','𝕻','𝕼','𝕽','𝕾','𝕿','𝖀','𝖁','𝖂','𝖃','𝖄','𝖅'
];
const FRAKTUR_BOLD_LOWER = [
  '𝖆','𝖇','𝖈','𝖉','𝖊','𝖋','𝖌','𝖍','𝖎','𝖏','𝖐','𝖑','𝖒',
  '𝖓','𝖔','𝖕','𝖖','𝖗','𝖘','𝖙','𝖚','𝖛','𝖜','𝖝','𝖞','𝖟'
];
const frakturBoldMap = createCharMap(FRAKTUR_BOLD_UPPER, FRAKTUR_BOLD_LOWER);

// 5. Blackboard / Doble Trazo (𝔻𝕠𝕓𝕝𝕖 𝕋𝕣𝕒𝕫𝕠)
const DOUBLE_STRUCK_UPPER = [
  '𝔸','𝔹','ℂ','𝔻','𝔼','𝔽','𝔾','ℍ','𝕀','𝕁','𝕂','𝕃','𝕄',
  'ℕ','𝕆','ℙ','ℚ','ℝ','𝕊','𝕋','𝕌','𝕍','𝕎','𝕏','𝕐','ℤ'
];
const DOUBLE_STRUCK_LOWER = [
  '𝕒','𝕓','𝕔','𝕕','𝕖','𝕗','𝕘','𝕙','𝕚','𝕛','𝕜','𝕝','𝕞',
  '𝕟','𝕠','𝕡','𝕢','𝕣','𝕤','𝕥','𝕦','𝕧','𝕨','𝕩','𝕪','𝕫'
];
const DOUBLE_STRUCK_NUMS = ['𝟘','𝟙','𝟚','𝟛','𝟜','𝟝','𝟞','𝟟','𝟠','𝟡'];
const doubleStruckMap = createCharMap(DOUBLE_STRUCK_UPPER, DOUBLE_STRUCK_LOWER, DOUBLE_STRUCK_NUMS);

// 6. Bold Serif (𝐁𝐨𝐥𝐝 𝐒𝐞𝐫𝐢𝐟)
const BOLD_SERIF_UPPER = [
  '𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌',
  '𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙'
];
const BOLD_SERIF_LOWER = [
  '𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦',
  '𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳'
];
const BOLD_SERIF_NUMS = ['𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗'];
const boldSerifMap = createCharMap(BOLD_SERIF_UPPER, BOLD_SERIF_LOWER, BOLD_SERIF_NUMS);

// 7. Bold Sans (𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀)
const BOLD_SANS_UPPER = [
  '𝗔','𝗕','𝗖','𝗗','𝗘','𝗙','𝗚','𝗛','𝗜','𝗝','𝗞','𝗟','𝗠',
  '𝗡','𝗢','𝗣','𝗤','𝗥','𝗦','𝗧','𝗨','𝗩','𝗪','𝗫','𝗬','𝗭'
];
const BOLD_SANS_LOWER = [
  '𝗮','𝗯','𝗰','𝗱','𝗲','𝗳','𝗴','𝗵','𝗶','𝗷','𝗸','𝗹','𝗺',
  '𝗻','𝗼','𝗽','𝗾','𝗿','𝘀','𝘁','𝘂','𝘃','𝘄','𝘅','𝘆','𝘇'
];
const BOLD_SANS_NUMS = ['𝟬','𝟭','𝟮','𝟯','𝟰','𝟱','𝟲','𝟳','𝟴','𝟵'];
const boldSansMap = createCharMap(BOLD_SANS_UPPER, BOLD_SANS_LOWER, BOLD_SANS_NUMS);

// 8. Italic Serif (𝐼𝓉𝒶𝓁𝒾𝒸 𝒮𝑒𝓇𝒾𝒻)
const ITALIC_SERIF_UPPER = [
  '𝐴','𝐵','𝐶','𝐷','𝐸','𝐹','𝐺','𝐻','𝐼','𝐽','𝐾','𝐿','𝑀',
  '𝑁','𝑂','𝑃','𝑄','𝑅','𝑆','𝑇','𝑈','𝑉','𝑊','𝑋','𝑌','𝑍'
];
const ITALIC_SERIF_LOWER = [
  '𝑎','𝑏','𝑐','𝑑','𝑒','𝑓','𝑔','ℎ','𝑖','𝑗','𝑘','𝑙','𝑚',
  '𝑛','𝑜','𝑝','𝑞','𝑟','𝑠','𝑡','𝑢','𝑣','𝑤','𝑥','𝑦','𝑧'
];
const italicSerifMap = createCharMap(ITALIC_SERIF_UPPER, ITALIC_SERIF_LOWER);

// 9. Italic Sans (𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴)
const ITALIC_SANS_UPPER = [
  '𝘈','𝘉','𝘊','𝘋','𝘌','𝘍','𝘎','𝘏','𝘐','𝘑','𝘒','𝘓','𝘔',
  '𝘕','𝘖','𝘗','𝘘','𝘙','𝘚','𝘛','𝘜','𝘝','𝘞','𝘟','𝘠','𝘡'
];
const ITALIC_SANS_LOWER = [
  '𝘢','𝘣','𝘤','𝘥','𝘦','𝘧','𝘨','𝘩','𝘪','𝘫','𝘬','𝘭','𝘮',
  '𝘯','𝘰','𝘱','𝘲','𝘳','𝘴','𝘵','𝘶','𝘷','𝘸','𝘹','𝘺','𝘻'
];
const italicSansMap = createCharMap(ITALIC_SANS_UPPER, ITALIC_SANS_LOWER);

// 10. Bold Italic Serif (𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄 𝑺𝒆𝒓𝒊𝒇)
const BOLD_ITALIC_SERIF_UPPER = [
  '𝑨','𝑩','𝑪','𝑫','𝑬','𝑭','𝑮','𝑯','𝑰','𝑱','𝑲','𝑳','𝑴',
  '𝑵','𝑶','𝑷','𝑸','𝑹','𝑺','𝑻','𝑼','𝑽','𝑾','𝑿','𝒀','𝒁'
];
const BOLD_ITALIC_SERIF_LOWER = [
  '𝒂','𝒃','𝒄','𝒅','𝒆','𝒇','𝒈','𝒉','𝒊','𝒋','𝒌','𝒍','𝒎',
  '𝒏','𝒐','𝒑','𝒒','𝒓','𝒔','𝒕','𝒖','𝒗','𝒘','𝒙','𝒚','𝒛'
];
const boldItalicSerifMap = createCharMap(BOLD_ITALIC_SERIF_UPPER, BOLD_ITALIC_SERIF_LOWER);

// 11. Bold Italic Sans (𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘 𝙎𝙖𝙣𝙨)
const BOLD_ITALIC_SANS_UPPER = [
  '𝘼','𝘽','𝘾','𝘿','𝙀','𝙁','𝙂','𝙃','𝙄','𝙅','𝙆','𝙇','𝙈',
  '𝙉','𝙊','𝙋','𝙌','𝙍','𝙎','𝙏','𝙐','𝙑','𝙒','𝙓','𝙔','𝙕'
];
const BOLD_ITALIC_SANS_LOWER = [
  '𝙖','𝙗','𝙘','𝙙','𝙚','𝙛','𝙜','𝙝','𝙞','𝙟','𝙠','𝙡','𝙢',
  '𝙣','𝙤','𝙥','𝙦','𝙧','𝙨','𝙩','𝙪','𝙫','𝙬','𝙭','𝙮','𝙯'
];
const boldItalicSansMap = createCharMap(BOLD_ITALIC_SANS_UPPER, BOLD_ITALIC_SANS_LOWER);

// 12. Monospace / Máquina de Escribir (𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎)
const MONOSPACE_UPPER = [
  '𝙰','𝙱','𝙲','𝙳','𝙴','𝙵','𝙶','𝙷','𝙸','𝙹','𝙺','𝙻','𝙼',
  '𝙽','𝙾','𝙿','𝚀','𝚁','𝚂','𝚃','𝚄','𝚅','𝚆','𝚇','𝚈','𝚉'
];
const MONOSPACE_LOWER = [
  '𝚊','𝚋','𝚌','𝚍','𝚎','𝚏','𝚐','𝚑','𝚒','𝚓','𝚔','𝚕','𝚖',
  '𝚗','𝚘','𝚙','𝚚','𝚛','𝚜','𝚝','𝚞','𝚟','𝚠','𝚡','𝚢','𝚣'
];
const MONOSPACE_NUMS = ['𝟶','𝟷','𝟸','𝟹','𝟺','𝟻','𝟼','𝟽','𝟾','𝟿'];
const monospaceMap = createCharMap(MONOSPACE_UPPER, MONOSPACE_LOWER, MONOSPACE_NUMS);

// 13. Círculos Blancos (Ⓒⓘⓡⓒⓤⓛⓞⓢ)
const CIRCLED_UPPER = [
  'Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ',
  'Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ','Ⓢ','Ⓣ','Ⓤ','Ⓥ','Ⓦ','Ⓧ','Ⓨ','Ⓩ'
];
const CIRCLED_LOWER = [
  'ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ',
  'ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ'
];
const CIRCLED_NUMS = ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨'];
const circledMap = createCharMap(CIRCLED_UPPER, CIRCLED_LOWER, CIRCLED_NUMS);

// 14. Círculos Negros (🅒🅘🅡🅒🅤🅛🅞🅢 🅝🅔🅖🅡🅞🅢)
const CIRCLED_DARK_UPPER = [
  '🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜',
  '🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩'
];
const CIRCLED_DARK_LOWER = CIRCLED_DARK_UPPER;
const CIRCLED_DARK_NUMS = ['⓿','❶','❷','❸','❹','❺','❻','❼','❽','❾'];
const circledDarkMap = createCharMap(CIRCLED_DARK_UPPER, CIRCLED_DARK_LOWER, CIRCLED_DARK_NUMS);

// 15. Cuadros Blancos (🄲🅄🄰🄳🅁🄾🅂)
const SQUARED_UPPER = [
  '🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼',
  '🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉'
];
const SQUARED_LOWER = SQUARED_UPPER;
const squaredMap = createCharMap(SQUARED_UPPER, SQUARED_LOWER);

// 16. Cuadros Negros (🅲🆄🅰🅳🆁🅾🆂 🅽🅴🅶🆁🅾🆂)
const SQUARED_DARK_UPPER = [
  '🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼',
  '🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉'
];
const SQUARED_DARK_LOWER = SQUARED_DARK_UPPER;
const squaredDarkMap = createCharMap(SQUARED_DARK_UPPER, SQUARED_DARK_LOWER);

// 17. Small Caps (ᴛᴇxᴛᴏ sᴍᴀʟʟ ᴄᴀᴘs)
const SMALL_CAPS_MAP: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ',
  J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ',
  S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ',
};

// 18. Superscript / Minúsculas elevadas (ᵗᵉˣᵗᵒ)
const SUPERSCRIPT_MAP: Record<string, string> = {
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ',
  j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ',
  t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
  A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ',
  J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', T: 'ᵀ',
  U: 'ᵁ', V: 'ⱽ', W: 'ᵂ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
};

// 19. Subscript (ₜₑₓₜₒ)
const SUBSCRIPT_MAP: Record<string, string> = {
  a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ',
  o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
  A: 'ₐ', E: 'ₑ', H: 'ₕ', I: 'ᵢ', J: 'ⱼ', K: 'ₖ', L: 'ₗ', M: 'ₘ', N: 'ₙ',
  O: 'ₒ', P: 'ₚ', R: 'ᵣ', S: 'ₛ', T: 'ₜ', U: 'ᵤ', V: 'ᵥ', X: 'ₓ',
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎'
};

// 20. Upside Down / Invertido (ɐpıʇɹǝʌuI)
const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
  J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ',
  S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
  '.': '˙', ',': '\'', '\'': ',', '"': '„', '!': '¡', '?': '¿', '<': '>', '>': '<',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '&': '⅋', '_': '‾'
};

// 21. Fullwidth / Vaporwave (Ｗｉｄｅ)
const FULLWIDTH_UPPER = [
  'Ａ','Ｂ','Ｃ','Ｄ','Ｅ','Ｆ','Ｇ','Ｈ','Ｉ','Ｊ','Ｋ','Ｌ','Ｍ',
  'Ｎ','Ｏ','Ｐ','Ｑ','Ｒ','Ｓ','Ｔ','Ｕ','Ｖ','Ｗ','Ｘ','Ｙ','Ｚ'
];
const FULLWIDTH_LOWER = [
  'ａ','ｂ','ｃ','ｄ','ｅ','ｆ','ｇ','ｈ','ｉ','ｊ','ｋ','ｌ','ｍ',
  'ｎ','ｏ','ｐ','ｑ','ｒ','ｓ','ｔ','ｕ','ｖ','ｗ','ｘ','ｙ','ｚ'
];
const FULLWIDTH_NUMS = ['０','１','２','３','４','５','６','７','８','９'];
const fullwidthMap = createCharMap(FULLWIDTH_UPPER, FULLWIDTH_LOWER, FULLWIDTH_NUMS);

// Combining characters for text effects
const STRIKETHROUGH_COMB = '\u0336';
const DOUBLE_STRIKETHROUGH_COMB = '\u0337';
const UNDERLINE_COMB = '\u0332';
const DOUBLE_UNDERLINE_COMB = '\u0333';
const SLASH_COMB = '\u0338';
const DOT_ABOVE_COMB = '\u0307';
const DOT_BELOW_COMB = '\u0323';
const TILDE_COMB = '\u0303';
const ARROW_BELOW_COMB = '\u034E';
const CROSS_ABOVE_COMB = '\u033D';

// Zalgo generator
export function generateZalgo(text: string, intensity: 'low' | 'medium' | 'high' = 'medium'): string {
  const zalgoUp = ['̍','̎','̄','̅','̿','̑','̆','̐','͒','͗','͑','̇','̈','̊','͂','̓','̈́','͊','͋','͌','̃','̂','̌','͐','̀','́','̋'];
  const zalgoMid = ['̕','̛','̀','́','͘','̡','̢','̧','̨','̴','̵','̶','͜','͝','͞','͟'];
  const zalgoDown = ['̖','̗','̘','̙','̜','̝','̞','̟','̠','̤','̥','̦','̩','̪','̫','̬','̭','̮','̯','̰','̱','̲','̳'];

  const count = intensity === 'low' ? 2 : intensity === 'medium' ? 4 : 8;

  return Array.from(text)
    .map((char) => {
      if (char === ' ' || char === '\n') return char;
      let res = char;
      for (let i = 0; i < count; i++) {
        const randType = Math.floor(Math.random() * 3);
        if (randType === 0) res += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
        else if (randType === 1) res += zalgoMid[Math.floor(Math.random() * zalgoMid.length)];
        else res += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
      }
      return res;
    })
    .join('');
}

// Combining decorator helper (Safe with surrogate pairs)
function applyCombiningChar(text: string, char: string): string {
  return Array.from(text)
    .map((c) => (c === ' ' || c === '\n' ? c : c + char))
    .join('');
}

// Spacing helper
function spaceText(text: string): string {
  return Array.from(text).join(' ');
}

// Intercalated helper
function intercalate(text: string, symbol: string): string {
  return Array.from(text)
    .map((c) => (c === ' ' ? ' ' : `${symbol}${c}`))
    .join('') + (text.length > 0 ? symbol : '');
}

// 90+ Master Font Generators
export const FONT_GENERATORS: FontGenerator[] = [
  // ================= CURSIVA / SCRIPT =================
  {
    id: 'cursiva-bold',
    name: 'Cursiva Negrita (Script Bold)',
    category: 'cursiva',
    isPopular: true,
    tags: ['cursiva', 'instagram', 'bio', 'elegante', 'script', 'letra bonitas'],
    description: 'La tipografía cursiva más elegante y legible para biografías de Instagram y TikTok.',
    transform: (t) => mapString(t, scriptBoldMap),
  },
  {
    id: 'cursiva-regular',
    name: 'Cursiva Fina (Script Clásico)',
    category: 'cursiva',
    isPopular: true,
    tags: ['cursiva', 'caligrafia', 'fina', 'elegante'],
    description: 'Estilo manuscrito suave y fluido, ideal para nombres y firmas en redes sociales.',
    transform: (t) => mapString(t, scriptRegularMap),
  },
  {
    id: 'italic-serif',
    name: 'Itálica Serif Tradicional',
    category: 'cursiva',
    tags: ['italica', 'serif', 'cursiva', 'elegante'],
    transform: (t) => mapString(t, italicSerifMap),
  },
  {
    id: 'italic-sans',
    name: 'Itálica Sans Moderna',
    category: 'cursiva',
    tags: ['italica', 'sans', 'moderna', 'limpia'],
    transform: (t) => mapString(t, italicSansMap),
  },
  {
    id: 'bold-italic-serif',
    name: 'Negrita Itálica Serif',
    category: 'cursiva',
    tags: ['negrita', 'italica', 'serif', 'titular'],
    transform: (t) => mapString(t, boldItalicSerifMap),
  },
  {
    id: 'bold-italic-sans',
    name: 'Negrita Itálica Sans',
    category: 'cursiva',
    isPopular: true,
    tags: ['negrita', 'italica', 'sans', 'destacado'],
    transform: (t) => mapString(t, boldItalicSansMap),
  },
  {
    id: 'cursiva-decorada-flores',
    name: 'Cursiva con Flores ✿',
    category: 'cursiva',
    tags: ['cursiva', 'flores', 'aesthetic', 'chicas'],
    transform: (t) => `✿ 𝒞𝓊𝓇𝓈𝒾𝓋𝒶: ${mapString(t, scriptRegularMap)} ✿`,
  },
  {
    id: 'cursiva-queen',
    name: 'Reina / Queen Script 𝒬𝓊ℯℯ𝓃',
    category: 'cursiva',
    tags: ['cursiva', 'queen', 'reina', 'corona'],
    transform: (t) => `♛ ${mapString(t, scriptBoldMap)} ♛`,
  },
  {
    id: 'cursiva-sparkles',
    name: 'Cursiva Brillante ✨',
    category: 'cursiva',
    tags: ['cursiva', 'brillos', 'destellos'],
    transform: (t) => `✨ ${mapString(t, scriptBoldMap)} ✨`,
  },
  {
    id: 'cursiva-corazones',
    name: 'Cursiva Romántica con Corazones ♡',
    category: 'cursiva',
    tags: ['cursiva', 'amor', 'corazon', 'romantica'],
    description: 'Estilo manuscrito enmarcado con corazones estéticos.',
    transform: (t) => `♡ ${mapString(t, scriptRegularMap)} ♡`,
  },
  {
    id: 'cursiva-vintage',
    name: 'Manuscrita Vintage Caligráfica ⊰ ⊱',
    category: 'cursiva',
    tags: ['cursiva', 'vintage', 'manuscrita', 'caligrafia'],
    transform: (t) => `⊰ ${mapString(t, scriptRegularMap)} ⊱`,
  },
  {
    id: 'cursiva-estrellas-enlazadas',
    name: 'Cursiva Constelación ⋆⋅☆⋅⋆',
    category: 'cursiva',
    tags: ['cursiva', 'estrellas', 'aesthetic', 'tatuajes'],
    transform: (t) => `⋆⋅☆⋅⋆ ${mapString(t, scriptBoldMap)} ⋆⋅☆⋅⋆`,
  },
  {
    id: 'cursiva-subrayada',
    name: 'Cursiva Subrayada Elegante',
    category: 'cursiva',
    tags: ['cursiva', 'subrayado', 'firma'],
    transform: (t) => applyCombiningChar(mapString(t, scriptRegularMap), UNDERLINE_COMB),
  },

  // ================= GÓTICA / FRAKTUR =================
  {
    id: 'gotica-fraktur',
    name: 'Gótica Clásica (Old English)',
    category: 'gotica',
    isPopular: true,
    tags: ['gotica', 'medieval', 'fraktur', 'dark', 'free fire'],
    description: 'Letra medieval y gótica estilo tatuaje antiguo, perfecta para nombres de clanes y juegos.',
    transform: (t) => mapString(t, frakturMap),
  },
  {
    id: 'gotica-bold',
    name: 'Gótica Negrita (Fraktur Bold)',
    category: 'gotica',
    isPopular: true,
    tags: ['gotica', 'negrita', 'dark', 'pesada', 'free fire'],
    transform: (t) => mapString(t, frakturBoldMap),
  },
  {
    id: 'gotica-cruz',
    name: 'Gótica con Cruces ✞',
    category: 'gotica',
    tags: ['gotica', 'cruz', 'dark', 'tatuaje'],
    transform: (t) => `✞ ${mapString(t, frakturBoldMap)} ✞`,
  },
  {
    id: 'gotica-espadas',
    name: 'Gótica Guerrera ⚔️',
    category: 'gotica',
    tags: ['gotica', 'espadas', 'clan', 'guerrero'],
    transform: (t) => `⚔️ ${mapString(t, frakturMap)} ⚔️`,
  },
  {
    id: 'gotica-demon',
    name: 'Gótica Demoníaca 𝕯𝖊𝖒𝖔𝖓',
    category: 'gotica',
    tags: ['gotica', 'demon', 'fuego', 'free fire'],
    transform: (t) => `༺† ${mapString(t, frakturBoldMap)} †༻`,
  },
  {
    id: 'gotica-calaveras',
    name: 'Gótica Calaveras ☠️',
    category: 'gotica',
    tags: ['gotica', 'calavera', 'heavy metal', 'dark'],
    transform: (t) => `☠️ ${mapString(t, frakturBoldMap)} ☠️`,
  },
  {
    id: 'gotica-cadenas',
    name: 'Gótica Cadenas ⛓️',
    category: 'gotica',
    tags: ['gotica', 'cadenas', 'dark', 'trap'],
    transform: (t) => `⛓️ ${mapString(t, frakturMap)} ⛓️`,
  },
  {
    id: 'gotica-alas-dark',
    name: 'Gótica con Alas Dark ꧁༺ ༻꧂',
    category: 'gotica',
    tags: ['gotica', 'alas', 'clan', 'free fire'],
    transform: (t) => `꧁༺ ${mapString(t, frakturBoldMap)} ༻꧂`,
  },
  {
    id: 'gotica-chicano-vintage',
    name: 'Gótica Chicano Vintage †',
    category: 'gotica',
    tags: ['gotica', 'tatuajes', 'chicano', 'vintage'],
    transform: (t) => `† ${mapString(t, frakturBoldMap)} †`,
  },

  // ================= NEGRITA / BOLD =================
  {
    id: 'bold-sans',
    name: 'Negrita Sans (Clean Bold)',
    category: 'bold',
    isPopular: true,
    tags: ['negrita', 'bold', 'whatsapp', 'facebook', 'instagram'],
    description: 'La tipografía en negrita más limpia y compatible para resaltar palabras en WhatsApp y Facebook.',
    transform: (t) => mapString(t, boldSansMap),
  },
  {
    id: 'bold-serif',
    name: 'Negrita Serif Editorial',
    category: 'bold',
    tags: ['negrita', 'serif', 'titular', 'editorial'],
    transform: (t) => mapString(t, boldSerifMap),
  },
  {
    id: 'doble-trazo',
    name: 'Doble Trazo (Blackboard Bold)',
    category: 'bold',
    isPopular: true,
    tags: ['doble trazo', 'matematicas', 'aesthetic', 'outline'],
    description: 'Estilo pizarra universitaria con doble línea en cada carácter.',
    transform: (t) => mapString(t, doubleStruckMap),
  },
  {
    id: 'negrita-espaciada',
    name: 'Negrita Espaciada (Wide Bold)',
    category: 'bold',
    tags: ['negrita', 'espaciada', 'destacada'],
    transform: (t) => spaceText(mapString(t, boldSansMap)),
  },
  {
    id: 'negrita-corchetes',
    name: 'Negrita con Corchetes 【 】',
    category: 'bold',
    tags: ['negrita', 'corchetes', 'destacado'],
    transform: (t) => `【${mapString(t, boldSansMap)}】`,
  },

  // ================= CÍRCULOS Y CUADROS =================
  {
    id: 'circulos-claros',
    name: 'Círculos Blancos (Bubble)',
    category: 'circulos',
    isPopular: true,
    tags: ['circulos', 'burbujas', 'redondo', 'aesthetic'],
    description: 'Letras encerradas dentro de círculos blancos.',
    transform: (t) => mapString(t, circledMap),
  },
  {
    id: 'circulos-oscuros',
    name: 'Círculos Negros (Dark Bubbles)',
    category: 'circulos',
    isPopular: true,
    tags: ['circulos', 'negros', 'botones', 'destacado'],
    description: 'Círculos negros rellenos con letras blancas en contraste.',
    transform: (t) => mapString(t, circledDarkMap),
  },
  {
    id: 'cuadros-claros',
    name: 'Cuadros Blancos (Square)',
    category: 'circulos',
    tags: ['cuadros', 'cuadrado', 'cajas'],
    transform: (t) => mapString(t, squaredMap),
  },
  {
    id: 'cuadros-oscuros',
    name: 'Cuadros Negros (Dark Squares)',
    category: 'circulos',
    tags: ['cuadros', 'negros', 'botones'],
    transform: (t) => mapString(t, squaredDarkMap),
  },
  {
    id: 'parentesis-caracteres',
    name: 'Letras Entre Paréntesis ⒜⒝⒞',
    category: 'circulos',
    tags: ['parentesis', 'letras', 'orden'],
    transform: (t) =>
      Array.from(t)
        .map((c) => {
          const lower = c.toLowerCase();
          const base = SPANISH_ACCENT_FALLBACK[lower] || lower;
          const code = base.charCodeAt(0);
          if (code >= 97 && code <= 122) {
            // Unicode parenthesized letters ⒜ starts at 0x249C
            return String.fromCodePoint(0x249c + (code - 97));
          }
          return c;
        })
        .join(''),
  },
  {
    id: 'circulos-corchetes-japoneses',
    name: 'Círculos con Corchetes Japoneses 〖 〗',
    category: 'circulos',
    tags: ['circulos', 'corchetes', 'aesthetic', 'japon'],
    transform: (t) => `〖 ${mapString(t, circledMap)} 〗`,
  },
  {
    id: 'circulos-estrellas-dark',
    name: 'Círculos Negros con Estrellas ★ 🅒',
    category: 'circulos',
    tags: ['circulos', 'estrellas', 'dark', 'botones'],
    transform: (t) => `★ ${mapString(t, circledDarkMap)} ★`,
  },
  {
    id: 'cuadros-espaciados',
    name: 'Cuadros Espaciados 🄲 🅄 🄰',
    category: 'circulos',
    tags: ['cuadros', 'espacio', 'instagram', 'bio'],
    transform: (t) => Array.from(mapString(t, squaredMap)).join(' '),
  },

  // ================= INVERTIDAS, ESPEJO Y TACHADAS =================
  {
    id: 'invertida-upside-down',
    name: 'Texto Invertido / De Cabeza (Upside Down)',
    category: 'invertidas',
    isPopular: true,
    tags: ['invertido', 'al reves', 'de cabeza', 'volteado', 'flip'],
    description: 'Voltea las letras 180 grados de cabeza.',
    transform: (t) =>
      Array.from(t)
        .reverse()
        .map((c) => {
          if (UPSIDE_DOWN_MAP[c]) return UPSIDE_DOWN_MAP[c];
          const base = SPANISH_ACCENT_FALLBACK[c];
          if (base && UPSIDE_DOWN_MAP[base]) return UPSIDE_DOWN_MAP[base];
          return c;
        })
        .join(''),
  },
  {
    id: 'espejo-reverso',
    name: 'Texto Espejo (Reverse / Hacia Atrás)',
    category: 'invertidas',
    tags: ['espejo', 'reversa', 'hacia atras', 'secret'],
    description: 'Escribe tu texto en orden inverso de derecha a izquierda.',
    transform: (t) => Array.from(t).reverse().join(''),
  },
  {
    id: 'tachado-simple',
    name: 'Tachado Simple (Strikethrough)',
    category: 'invertidas',
    isPopular: true,
    tags: ['tachado', 'strike', 'linea', 'whatsapp'],
    description: 'Añade una línea horizontal en el centro de todas las letras.',
    transform: (t) => applyCombiningChar(t, STRIKETHROUGH_COMB),
  },
  {
    id: 'tachado-diagonal',
    name: 'Tachado Diagonal / Slash (̷)',
    category: 'invertidas',
    tags: ['tachado', 'diagonal', 'slash'],
    transform: (t) => applyCombiningChar(t, SLASH_COMB),
  },
  {
    id: 'subrayado-simple',
    name: 'Subrayado Simple (Underline)',
    category: 'invertidas',
    isPopular: true,
    tags: ['subrayado', 'linea abajo', 'underline'],
    transform: (t) => applyCombiningChar(t, UNDERLINE_COMB),
  },
  {
    id: 'subrayado-doble',
    name: 'Subrayado Doble (Double Underline)',
    category: 'invertidas',
    tags: ['subrayado', 'doble', 'enfasis'],
    transform: (t) => applyCombiningChar(t, DOUBLE_UNDERLINE_COMB),
  },
  {
    id: 'onda-superior',
    name: 'Onda Superior Tilde (̃)',
    category: 'invertidas',
    tags: ['onda', 'tilde', 'decoracion'],
    transform: (t) => applyCombiningChar(t, TILDE_COMB),
  },
  {
    id: 'puntos-abajo',
    name: 'Punteado Inferior (̣)',
    category: 'invertidas',
    tags: ['puntos', 'punteado', 'delicado'],
    transform: (t) => applyCombiningChar(t, DOT_BELOW_COMB),
  },
  {
    id: 'flechas-arriba',
    name: 'Flechas Indicadoras (͎)',
    category: 'invertidas',
    tags: ['flechas', 'arriba', 'glitch'],
    transform: (t) => applyCombiningChar(t, ARROW_BELOW_COMB),
  },
  {
    id: 'tachado-doble-cruzado',
    name: 'Doble Tachado Cruzado (̶̵)',
    category: 'invertidas',
    tags: ['tachado', 'doble', 'strike', 'descuento'],
    transform: (t) => applyCombiningChar(t, '\u0336\u0335'),
  },
  {
    id: 'onda-inferior-ondulada',
    name: 'Subrayado de Onda Ondulada (̰)',
    category: 'invertidas',
    tags: ['subrayado', 'onda', 'decoracion', 'aesthetic'],
    transform: (t) => applyCombiningChar(t, '\u0330'),
  },
  {
    id: 'tachado-corchetes',
    name: 'Tachado con Corchetes 【t̶e̶x̶t̶o̶】',
    category: 'invertidas',
    tags: ['tachado', 'corchetes', 'destacado'],
    transform: (t) => `【${applyCombiningChar(t, STRIKETHROUGH_COMB)}】`,
  },
  {
    id: 'zalgo-glitch-caos',
    name: 'Glitch Zalgo Caos (Cursed Text)',
    category: 'invertidas',
    tags: ['zalgo', 'glitch', 'caos', 'corrupto', 'terror'],
    transform: (t) => generateZalgo(t, 'medium'),
  },
  {
    id: 'zalgo-extremo-void',
    name: 'Zalgo Extremo Void (Tentáculos Máximos)',
    category: 'invertidas',
    tags: ['zalgo', 'glitch', 'void', 'extremo', 'maldito'],
    transform: (t) => generateZalgo(t, 'high'),
  },
  {
    id: 'hacker-leet-matrix',
    name: 'Hacker 1337 Leet Speak (H4CK3R)',
    category: 'invertidas',
    tags: ['hacker', '1337', 'leet', 'matrix', 'gamer'],
    transform: (t) => {
      const leet: Record<string, string> = {
        a: '4', A: '4', e: '3', E: '3', i: '1', I: '1', o: '0', O: '0', s: '5', S: '5', t: '7', T: '7', b: '8', B: '8'
      };
      return Array.from(t).map((c) => leet[c] || c).join('');
    },
  },
  {
    id: 'glitch-shaded-blocks',
    name: 'Glitch con Bloques ▓▒░ Texto ░▒▓',
    category: 'invertidas',
    tags: ['glitch', 'bloques', 'ascii', 'gamer', 'matrix'],
    transform: (t) => `▓▒░ ${t.toUpperCase()} ░▒▓`,
  },

  // ================= SMALL CAPS & SUPER/SUB =================
  {
    id: 'small-caps',
    name: 'Mayúsculas Pequeñas (Small Caps)',
    category: 'smallcaps',
    isPopular: true,
    tags: ['small caps', 'mayusculas pequeñas', 'aesthetic', 'elegante', 'free fire'],
    description: 'Convierte todas las letras a elegantes mayúsculas en miniatura.',
    transform: (t) =>
      Array.from(t)
        .map((c) => {
          if (SMALL_CAPS_MAP[c]) return SMALL_CAPS_MAP[c];
          const base = SPANISH_ACCENT_FALLBACK[c];
          if (base && SMALL_CAPS_MAP[base]) return SMALL_CAPS_MAP[base];
          return c;
        })
        .join(''),
  },
  {
    id: 'superindice-tiny',
    name: 'Superíndice / Texto Diminuto (Tiny Text)',
    category: 'smallcaps',
    isPopular: true,
    tags: ['superindice', 'chico', 'diminuto', 'elevado', 'nick'],
    description: 'Letras en superíndice elevadas para nicks de clanes y tags.',
    transform: (t) =>
      Array.from(t)
        .map((c) => {
          if (SUPERSCRIPT_MAP[c]) return SUPERSCRIPT_MAP[c];
          const base = SPANISH_ACCENT_FALLBACK[c];
          if (base && SUPERSCRIPT_MAP[base]) return SUPERSCRIPT_MAP[base];
          return c;
        })
        .join(''),
  },
  {
    id: 'subindice',
    name: 'Subíndice Inferior (Subscript)',
    category: 'smallcaps',
    tags: ['subindice', 'abajo', 'quimica'],
    transform: (t) =>
      Array.from(t)
        .map((c) => {
          if (SUBSCRIPT_MAP[c]) return SUBSCRIPT_MAP[c];
          const base = SPANISH_ACCENT_FALLBACK[c];
          if (base && SUBSCRIPT_MAP[base]) return SUBSCRIPT_MAP[base];
          return c;
        })
        .join(''),
  },
  {
    id: 'monospace-code',
    name: 'Monoespacio / Máquina de Escribir',
    category: 'smallcaps',
    isPopular: true,
    tags: ['monospace', 'codigo', 'retro', 'typewriter'],
    transform: (t) => mapString(t, monospaceMap),
  },
  {
    id: 'wide-vaporwave',
    name: 'Vaporwave / Texto Ancho (Ｗｉｄｅ)',
    category: 'smallcaps',
    isPopular: true,
    tags: ['vaporwave', 'wide', 'ancho', 'japones', 'aesthetic'],
    description: 'Estilo estético con espaciado completo japonés de los 90s.',
    transform: (t) => mapString(t, fullwidthMap),
  },
  {
    id: 'espaciado-letras',
    name: 'E s p a c i a d o  A e s t h e t i c',
    category: 'smallcaps',
    tags: ['espaciado', 'aesthetic', 'minimalista'],
    transform: (t) => spaceText(t),
  },

  // ================= GLITCH / ZALGO =================
  {
    id: 'zalgo-medio',
    name: 'Glitch / Zalgo Maldito (Intensidad Media)',
    category: 'glitch',
    isPopular: true,
    tags: ['zalgo', 'glitch', 'maldito', 'terror', 'hacker', 'creepy'],
    description: 'Texto corrupto y con fallas dimensionales con caracteres combinados.',
    transform: (t) => generateZalgo(t, 'medium'),
  },
  {
    id: 'zalgo-suave',
    name: 'Glitch Suave / Cyberpunk',
    category: 'glitch',
    tags: ['glitch', 'cyberpunk', 'tech', 'hacker'],
    transform: (t) => generateZalgo(t, 'low'),
  },
  {
    id: 'zalgo-extremo',
    name: 'Zalgo Extremo / Caos Total ⚠️',
    category: 'glitch',
    tags: ['zalgo', 'extremo', 'caos', 'demonio', 'destruccion'],
    transform: (t) => generateZalgo(t, 'high'),
  },

  // ================= FREE FIRE & GAMING NICKS =================
  {
    id: 'ff-alas-clasicas',
    name: 'Free Fire: Alas Legendarias ꧁༺ ༻꧂',
    category: 'free-fire',
    isPopular: true,
    tags: ['free fire', 'alas', 'nick', 'legendario', 'gaming'],
    description: 'El formato de nick más buscado y prestigioso de Free Fire.',
    transform: (t) => `꧁༺${mapString(t, scriptBoldMap)}༻꧂`,
  },
  {
    id: 'ff-alas-goticas',
    name: 'Free Fire: Alas Góticas ꧁༒☬ ☬༒꧂',
    category: 'free-fire',
    isPopular: true,
    tags: ['free fire', 'gotico', 'alas', 'clan'],
    transform: (t) => `꧁༒☬${mapString(t, frakturBoldMap)}☬༒꧂`,
  },
  {
    id: 'ff-clan-espadas',
    name: 'Free Fire: Espadas Cruzadas ⚔️ 乂',
    category: 'free-fire',
    tags: ['free fire', 'espadas', 'clan', 'pvp'],
    transform: (t) => `乂 ⚔️ ${smallCapsMapHelper(t)} ⚔️ 乂`,
  },
  {
    id: 'ff-coronas-rey',
    name: 'Free Fire: Corona de Rey 亗 👑',
    category: 'free-fire',
    isPopular: true,
    tags: ['free fire', 'corona', 'rey', 'insano', 'heroico'],
    transform: (t) => `亗『${mapString(t, boldSansMap)}』亗`,
  },
  {
    id: 'ff-insano-rayo',
    name: 'Free Fire: Insano Rayo ⚡',
    category: 'free-fire',
    isPopular: true,
    tags: ['free fire', 'insano', 'rayo', 'heroico', 'pvp'],
    transform: (t) => `⚡┊${mapString(t, scriptBoldMap)}┊⚡`,
  },
  {
    id: 'ff-sniper-arma',
    name: 'Free Fire: Sniper AWM ︻╦̵̵͇̿̿̿̿',
    category: 'free-fire',
    tags: ['free fire', 'sniper', 'arma', 'awm', 'gamer'],
    transform: (t) => `︻╦̵̵͇̿̿̿̿══╤─ ${mapString(t, boldSansMap)}`,
  },
  {
    id: 'ff-boss-clan',
    name: 'Free Fire: Líder de Clan ᴮᴼˢˢ',
    category: 'free-fire',
    tags: ['free fire', 'boss', 'clan', 'lider'],
    transform: (t) => `ᴮᴼˢˢ★${mapString(t, scriptBoldMap)}★`,
  },
  {
    id: 'ff-sad-boy',
    name: 'Free Fire: Sad Boy ˢᴬᴰ 💔',
    category: 'free-fire',
    tags: ['free fire', 'sad', 'triste', 'chico'],
    transform: (t) => `ˢᴬᴰ💔${smallCapsMapHelper(t)}💔`,
  },
  {
    id: 'ff-japon-flor',
    name: 'Free Fire: Flor Sakura ✿ 么',
    category: 'free-fire',
    isPopular: true,
    tags: ['free fire', 'sakura', 'flor', 'japones', 'chicas'],
    transform: (t) => `✿ 么 ${mapString(t, scriptRegularMap)} 么 ✿`,
  },
  {
    id: 'ff-diablo-evil',
    name: 'Free Fire: Diablo / Evil ╰‿╯',
    category: 'free-fire',
    tags: ['free fire', 'diablo', 'evil', 'cara', 'pvp'],
    transform: (t) => `╰‿╯ ${mapString(t, frakturBoldMap)} ╰‿╯`,
  },
  {
    id: 'ff-verificado-pro',
    name: 'Free Fire: Verificado V 🅥',
    category: 'free-fire',
    isPopular: true,
    tags: ['free fire', 'verificado', 'influencer', 'insano'],
    transform: (t) => `🅥 ${mapString(t, boldSansMap)} 亗`,
  },
  {
    id: 'ff-alas-angel',
    name: 'Free Fire: Alas de Ángel ༒꧂',
    category: 'free-fire',
    tags: ['free fire', 'angel', 'alas', 'blanco'],
    transform: (t) => `◥꧁ ${mapString(t, scriptBoldMap)} ꧂◤`,
  },

  // ================= AESTHETIC & REDES SOCIALES =================
  {
    id: 'aesthetic-corazones',
    name: 'Aesthetic: Corazones Dulces (っ◔◡◔)っ ♥',
    category: 'aesthetic',
    isPopular: true,
    tags: ['aesthetic', 'corazones', 'lindo', 'instagram', 'tiktok'],
    description: 'Encuadre tierno con caritas kaomoji y corazones.',
    transform: (t) => `(っ◔◡◔)っ ♥ ${mapString(t, scriptBoldMap)} ♥`,
  },
  {
    id: 'aesthetic-estrellas-cielo',
    name: 'Aesthetic: Noche Estrellada ｡･:*:･ﾟ★',
    category: 'aesthetic',
    isPopular: true,
    tags: ['aesthetic', 'estrellas', 'brillos', 'magia'],
    transform: (t) => `｡･:*:･ﾟ★ ${mapString(t, scriptRegularMap)} ★ﾟ･:*:･｡`,
  },
  {
    id: 'aesthetic-corazon-intercalado',
    name: 'Letras con Corazones ♥',
    category: 'aesthetic',
    tags: ['corazon', 'amor', 'parejas', 'tiktok'],
    transform: (t) => intercalate(t, '♥'),
  },
  {
    id: 'aesthetic-estrellas-intercaladas',
    name: 'Letras con Estrellas ★',
    category: 'aesthetic',
    tags: ['estrellas', 'destellos', 'brillos'],
    transform: (t) => intercalate(t, '★'),
  },
  {
    id: 'aesthetic-flores-mariposas',
    name: 'Aesthetic: Mariposa y Flor ʚĭɞ 🌸',
    category: 'aesthetic',
    tags: ['mariposa', 'flor', 'aesthetic', 'coquette'],
    transform: (t) => `ʚĭɞ ${mapString(t, scriptRegularMap)} 🌸`,
  },
  {
    id: 'aesthetic-coquette-lazo',
    name: 'Aesthetic Coquette con Moño 🎀',
    category: 'aesthetic',
    isPopular: true,
    tags: ['coquette', 'lazo', 'rosa', 'tiktok'],
    transform: (t) => `🎀 ִֶָ ${mapString(t, scriptBoldMap)} ִֶָ 🎀`,
  },
  {
    id: 'aesthetic-nube-cielo',
    name: 'Aesthetic: Nube Celestial ☁️ ˚ ༘♡',
    category: 'aesthetic',
    tags: ['nube', 'cielo', 'suave', 'kpop'],
    transform: (t) => `☁️ ˚ ༘♡ ·˚ ${mapString(t, scriptRegularMap)} ₊˚ˑ༄`,
  },
  {
    id: 'aesthetic-luna-mistica',
    name: 'Aesthetic: Luna Mística ‧͙⁺˚*･༓☾ ☽༓･*˚⁺‧͙',
    category: 'aesthetic',
    tags: ['luna', 'mistico', 'witchy', 'magia'],
    transform: (t) => `☾˚*･ ${mapString(t, doubleStruckMap)} ･*˚☽`,
  },
  {
    id: 'aesthetic-ositos',
    name: 'Aesthetic: Ositos Tiernos ʕ•́ᴥ•̀ʔっ 🧸',
    category: 'aesthetic',
    tags: ['oso', 'kaomoji', 'tierno', 'cute'],
    transform: (t) => `ʕ•́ᴥ•̀ʔっ♡ ${mapString(t, scriptRegularMap)} ♡`,
  },
  {
    id: 'aesthetic-flechas-citas',
    name: 'Aesthetic: Citas y Apuntes ✎ ❝ ❞',
    category: 'aesthetic',
    tags: ['apuntes', 'notas', 'frases', 'libros'],
    transform: (t) => `✎... ❝ ${mapString(t, scriptBoldMap)} ❞`,
  },
  {
    id: 'aesthetic-destellos-sparkle',
    name: 'Aesthetic: Destellos Mágicos ✧･ﾟ: *✧',
    category: 'aesthetic',
    tags: ['destellos', 'sparkles', 'brillo'],
    transform: (t) => `✧･ﾟ: *✧･ﾟ:* ${mapString(t, scriptBoldMap)} *:･ﾟ✧*:･ﾟ✧`,
  },
  {
    id: 'aesthetic-planeta-saturno',
    name: 'Aesthetic: Galaxia y Saturno 🪐 ⋆˙⟡',
    category: 'aesthetic',
    tags: ['espacio', 'saturno', 'galaxia', 'universo'],
    transform: (t) => `🪐 ⋆˙⟡ ${mapString(t, doubleStruckMap)} ⟡˙⋆ 🪐`,
  },
  {
    id: 'aesthetic-mariposa-dual',
    name: 'Aesthetic: Mariposas Azules 🦋',
    category: 'aesthetic',
    isPopular: true,
    tags: ['mariposa', 'azul', 'princesa', 'tiktok', 'bio'],
    transform: (t) => `🦋 ₊˚⊹ ${mapString(t, scriptBoldMap)} ⊹˚₊ 🦋`,
  },
  {
    id: 'aesthetic-flor-sakura',
    name: 'Aesthetic: Cerezo Sakura 🌸 ✧',
    category: 'aesthetic',
    tags: ['sakura', 'flor', 'cerezo', 'japon', 'cute'],
    transform: (t) => `🌸 ˚₊· ${mapString(t, scriptRegularMap)} ·₊˚ 🌸`,
  },
  {
    id: 'aesthetic-brackets-kanji',
    name: 'Estilo Japonés: Corchetes Gruesos 【 】',
    category: 'aesthetic',
    isPopular: true,
    tags: ['japon', 'corchetes', 'kanji', 'anime'],
    transform: (t) => `【 ${mapString(t, scriptBoldMap)} 】`,
  },
  {
    id: 'aesthetic-brackets-corner',
    name: 'Estilo Anime: Esquinas Asiáticas 『 』',
    category: 'aesthetic',
    tags: ['anime', 'esquinas', 'manga', 'japon'],
    transform: (t) => `『 ${mapString(t, doubleStruckMap)} 』`,
  },
  {
    id: 'aesthetic-cyberpunk-neon',
    name: 'Cyberpunk & Tech Brackets ⟦ ⟧',
    category: 'bold',
    tags: ['cyberpunk', 'futurista', 'tech', 'neon'],
    transform: (t) => `⟦ ${mapString(t, doubleStruckMap)} ⟧`,
  },
  {
    id: 'ff-espadas-duelo',
    name: 'Free Fire: Espadas de Duelo PvP ⚔️',
    category: 'free-fire',
    isPopular: true,
    tags: ['espadas', 'duelo', 'pvp', 'freefire', 'nick'],
    transform: (t) => `⚔️ 𝕯𝖚𝖊𝖑𝖔 | ${mapString(t, frakturBoldMap)} ⚔️`,
  },
  {
    id: 'ff-corona-rey-insano',
    name: 'Free Fire: Corona Rey Insano 亗',
    category: 'free-fire',
    isPopular: true,
    tags: ['rey', 'corona', 'insano', 'freefire'],
    transform: (t) => `亗 ${mapString(t, boldSansMap)} 亗`,
  },
  {
    id: 'aesthetic-sparkle-aura',
    name: 'Aura Brillante ✨ 𝓝𝓸𝓶𝓫𝓻𝓮 ✨',
    category: 'cursiva',
    isPopular: true,
    tags: ['aura', 'brillo', 'destello', 'instagram', 'bio'],
    transform: (t) => `✨ ${mapString(t, scriptBoldMap)} ✨`,
  },
  {
    id: 'aesthetic-corazon-aura',
    name: 'Marco de Corazones Dulces ♡ 𝓝𝓪𝓶𝓮 ♡',
    category: 'cursiva',
    isPopular: true,
    tags: ['corazon', 'amor', 'tierno', 'parejas'],
    transform: (t) => `♡ ˗ˏˋ ${mapString(t, scriptBoldMap)} ˎˊ˗ ♡`,
  },
];

function smallCapsMapHelper(text: string): string {
  return Array.from(text)
    .map((c) => {
      if (SMALL_CAPS_MAP[c]) return SMALL_CAPS_MAP[c];
      const base = SPANISH_ACCENT_FALLBACK[c];
      if (base && SMALL_CAPS_MAP[base]) return SMALL_CAPS_MAP[base];
      return c;
    })
    .join('');
}
