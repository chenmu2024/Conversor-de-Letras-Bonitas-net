import React, { useState } from 'react';
import { Copy, Check, Sparkles, BookOpen, Layers, Zap } from 'lucide-react';

interface AlphabetStyle {
  id: string;
  name: string;
  category: string;
  badge: string;
  sampleUpper: string;
  sampleLower: string;
  sampleDigits: string;
  uppercase: string[];
  lowercase: string[];
  digits?: string[];
}

const ALPHABET_STYLES: AlphabetStyle[] = [
  {
    id: 'cursiva-script',
    name: 'Cursiva Clásica (Script / Italics)',
    category: 'Cursivas',
    badge: 'Popular IG',
    sampleUpper: '𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖 𝓗 𝓘 𝓙 𝓚 𝓛 𝓜 𝓝 𝓞 𝓟 𝓠 𝓡 𝓢 𝓣 𝓤 𝓥 𝓦 𝓧 𝓨 𝓩',
    sampleLower: '𝓪 𝓫 𝓬 𝓭 𝓮 𝓯 𝓰 𝓱 𝓲 𝓳 𝓴 𝓵 𝓶 𝓷 𝓸 𝓹 𝓺 𝓻 𝓼 𝓽 𝓾 𝓿 𝔀 𝔁 𝔂 𝔃',
    sampleDigits: '0 1 2 3 4 5 6 7 8 9',
    uppercase: '𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖 𝓗 𝓘 𝓙 𝓚 𝓛 𝓜 𝓝 𝓞 𝓟 𝓠 𝓡 𝓢 𝓣 𝓤 𝓥 𝓦 𝓧 𝓨 𝓩'.split(' '),
    lowercase: '𝓪 𝓫 𝓬 𝓭 𝓮 𝓯 𝓰 𝓱 𝓲 𝓳 𝓴 𝓵 𝓶 𝓷 𝓸 𝓹 𝓺 𝓻 𝓼 𝓽 𝓾 𝓿 𝔀 𝔁 𝔂 𝔃'.split(' '),
  },
  {
    id: 'gotica-fraktur',
    name: 'Gótica Medieval (Fraktur Bold)',
    category: 'Góticas',
    badge: 'Medieval',
    sampleUpper: '𝕬 𝕭 𝕮 𝕯 𝕰 𝕱 𝕲 𝕳 𝕴 𝕵 𝕶 𝕷 𝕸 𝕹 𝕺 𝕻 𝕼 𝕽 𝕾 𝕿 𝖀 𝖁 𝖂 𝖃 𝖄 𝖅',
    sampleLower: '𝖆 𝖇 𝖈 𝖉 𝖊 𝖋 𝖌 𝖍 𝖎 𝖏 𝖐 𝖑 𝖒 𝖓 𝖔 𝖕 𝖖 𝖗 𝖘 𝖙 𝖚 𝖛 𝖜 𝖝 𝖞 𝖟',
    sampleDigits: '0 1 2 3 4 5 6 7 8 9',
    uppercase: '𝕬 𝕭 𝕮 𝕯 𝕰 𝕱 𝕲 𝕳 𝕴 𝕵 𝕶 𝕷 𝕸 𝕹 𝕺 𝕻 𝕼 𝕽 𝕾 𝕿 𝖀 𝖁 𝖂 𝖃 𝖄 𝖅'.split(' '),
    lowercase: '𝖆 𝖇 𝖈 𝖉 𝖊 𝖋 𝖌 𝖍 𝖎 𝖏 𝖐 𝖑 𝖒 𝖓 𝖔 𝖕 𝖖 𝖗 𝖘 𝖙 𝖚 𝖛 𝖜 𝖝 𝖞 𝖟'.split(' '),
  },
  {
    id: 'circulos-negros',
    name: 'Círculos Negros Rellenos',
    category: 'Círculos',
    badge: 'Estilo Bubble',
    sampleUpper: '🅮 🅯 🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇',
    sampleLower: '🅐 🅑 🅒 🅓 🅔 🅕 🅖 🅗 🅘 🅙 🅚 🅛 🅜 🅝 🅞 🅟 🅠 🅡 🅢 🅣 🅤 🅥 🅦 🅧 🅨 🅩',
    sampleDigits: '⓿ ➊ ➋ ➌ ➍ ➎ ➏ ➐ ➑ ➒',
    uppercase: '🅐 🅑 🅒 🅓 🅔 🅕 🅖 🅗 🅘 🅙 🅚 🅛 🅜 🅝 🅞 🅟 🅠 🅡 🅢 🅣 🅤 🅥 🅦 🅧 🅨 🅩'.split(' '),
    lowercase: '🅐 🅑 🅒 🅓 🅔 🅕 🅖 🅗 🅘 🅙 🅚 🅛 🅜 🅝 🅞 🅟 🅠 🅡 🅢 🅣 🅤 🅥 🅦 🅧 🅨 🅩'.split(' '),
    digits: '⓿ ➊ ➋ ➌ ➍ ➎ ➏ ➐ ➑ ➒'.split(' '),
  },
  {
    id: 'circulos-blancos',
    name: 'Círculos Blancos (Enclosed Alphanumerics)',
    category: 'Círculos',
    badge: 'Limpio',
    sampleUpper: 'Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ',
    sampleLower: 'ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ',
    sampleDigits: '⓪ ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨',
    uppercase: 'Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ'.split(' '),
    lowercase: 'ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ'.split(' '),
    digits: '⓪ ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨'.split(' '),
  },
  {
    id: 'doble-trazo',
    name: 'Doble Trazo (Double Struck / Blackboard)',
    category: 'Matemático',
    badge: 'Aesthetic',
    sampleUpper: '𝔸 𝔹 ℂ 𝔻 𝔼 𝔽 𝔾 ℍ 𝕀 𝕁 𝕂 𝕃 𝕄 ℕ 𝕆 ℙ ℚ ℝ 𝕊 𝕋 𝕌 𝕍 𝕎 𝕏 𝕐 ℤ',
    sampleLower: '𝕒 𝕓 𝕔 𝕕 𝕖 𝕗 𝕘 𝕙 𝕚 𝕛 𝕜 𝕝 𝕞 𝕟 𝕠 𝕡 𝕢 𝕣 𝕤 𝕥 𝕦 𝕧 𝕨 𝕩 𝕪 𝕫',
    sampleDigits: '𝟘 𝟙 𝟚 𝟛 𝟜 𝟝 𝟞 𝟟 𝟠 𝟡',
    uppercase: '𝔸 𝔹 ℂ 𝔻 𝔼 𝔽 𝔾 ℍ 𝕀 𝕁 𝕂 𝕃 𝕄 ℕ 𝕆 ℙ ℚ ℝ 𝕊 𝕋 𝕌 𝕍 𝕎 𝕏 𝕐 ℤ'.split(' '),
    lowercase: '𝕒 𝕓 𝕔 𝕕 𝕖 𝕗 𝕘 𝕙 𝕚 𝕛 𝕜 𝕝 𝕞 𝕟 𝕠 𝕡 𝕢 𝕣 𝕤 𝕥 𝕦 𝕧 𝕨 𝕩 𝕪 𝕫'.split(' '),
    digits: '𝟘 𝟙 𝟚 𝟛 𝟜 𝟝 𝟞 𝟟 𝟠 𝟡'.split(' '),
  },
  {
    id: 'negrita-sans',
    name: 'Negrita Sans Serif (Bold)',
    category: 'Negritas',
    badge: 'WhatsApp & IG',
    sampleUpper: '𝗔 𝗕 𝗖 𝗗 𝗘 𝗙 𝗚 𝗛 𝗜 𝗝 𝗞 𝗟 𝗠 𝗡 𝗢 𝗣 𝗤 𝗥 𝗦 𝗧 𝗨 𝗩 𝗪 𝗫 𝗬 𝗭',
    sampleLower: '𝗮 𝗯 𝗰 𝗱 𝗲 𝗳 𝗴 𝗵 𝗶 𝗷 𝗸 𝗹 𝗺 𝗻 𝗼 𝗽 𝗾 𝗿 𝘀 𝘁 𝘂 𝘃 𝘄 𝘅 𝘆 𝘇',
    sampleDigits: '𝟬 𝟭 𝟮 𝟯 𝟰 𝟱 𝟲 𝟳 𝟴 𝟵',
    uppercase: '𝗔 𝗕 𝗖 𝗗 𝗘 𝗙 𝗚 𝗛 𝗜 𝗝 𝗞 𝗟 𝗠 𝗡 𝗢 𝗣 𝗤 𝗥 𝗦 𝗧 𝗨 𝗩 𝗪 𝗫 𝗬 𝗭'.split(' '),
    lowercase: '𝗮 𝗯 𝗰 𝗱 𝗲 𝗳 𝗴 𝗵 𝗶 𝗷 𝗸 𝗹 𝗺 𝗻 𝗼 𝗽 𝗾 𝗿 𝘀 𝘁 𝘂 𝘃 𝘄 𝘅 𝘆 𝘇'.split(' '),
    digits: '𝟬 𝟭 𝟮 𝟯 𝟰 𝟱 𝟲 𝟳 𝟴 𝟵'.split(' '),
  },
  {
    id: 'cuadros-negros',
    name: 'Cuadrados Negros (Square Black)',
    category: 'Cuadros',
    badge: 'Llamativo',
    sampleUpper: '🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉',
    sampleLower: '🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉',
    sampleDigits: '0 1 2 3 4 5 6 7 8 9',
    uppercase: '🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉'.split(' '),
    lowercase: '🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉'.split(' '),
  },
  {
    id: 'monoespaciado',
    name: 'Monoespaciado / Código (Monospace)',
    category: 'Técnico',
    badge: 'Retro Code',
    sampleUpper: '𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝚀 𝚁 𝚂 𝚃 𝚄 𝚅 𝚆 𝚇 𝚈 𝚉',
    sampleLower: '𝚊 𝚋 𝚌 𝚍 𝚎 𝚏 𝚐 𝚑 𝚒 𝚓 𝚔 𝚕 𝚖 𝚗 𝚘 𝚙 𝚚 𝚛 𝚜 𝚝 𝚞 𝚟 𝚠 𝚡 𝚢 𝚣',
    sampleDigits: '𝟶 𝟷 𝟸 𝟹 𝟺 𝟻 𝟼 𝟽 𝟾 𝟿',
    uppercase: '𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝚀 𝚁 𝚂 𝚃 𝚄 𝚅 𝚆 𝚇 𝚈 𝚉'.split(' '),
    lowercase: '𝚊 𝚋 𝚌 𝚍 𝚎 𝚏 𝚐 𝚑 𝚒 𝚓 𝚔 𝚕 𝚖 𝚗 𝚘 𝚙 𝚚 𝚛 𝚜 𝚝 𝚞 𝚟 𝚠 𝚡 𝚢 𝚣'.split(' '),
    digits: '𝟶 𝟷 𝟸 𝟹 𝟺 𝟻 𝟼 𝟽 𝟾 𝟿'.split(' '),
  },
  {
    id: 'tatuajes-old-english',
    name: 'Letras para Tatuajes (Old English / Fraktur)',
    category: 'Tatuajes',
    badge: '💉 Especial Ink',
    sampleUpper: '𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊 ℌ ℑ 𝔍 𝔎 𝔏 𝔐 𝔑 𝔒 𝔓 𝔔 ℜ 𝔖 𝔗 𝔘 𝔙 𝔚 𝔛 𝔜 ℨ',
    sampleLower: '𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝔭 𝔮 𝔯 𝔰 𝔱 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷',
    sampleDigits: '0 1 2 3 4 5 6 7 8 9',
    uppercase: '𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊 ℌ ℑ 𝔍 𝔎 𝔏 𝔐 𝔑 𝔒 𝔓 𝔔 ℜ 𝔖 𝔗 𝔘 𝔙 𝔚 𝔛 𝔜 ℨ'.split(' '),
    lowercase: '𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝔭 𝔮 𝔯 𝔰 𝔱 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷'.split(' '),
  },
  {
    id: 'chinas-simuladas',
    name: 'Letras Chinas y Kanji Simuladas',
    category: 'Orientales',
    badge: '🏮 Kanji Anime',
    sampleUpper: '丹 乃 匚 口 巳 下 厶 卄 工 丁 长 乚 从 冂 口 尸 尺 丂 丅 凵 ∨ 山 乂 丫 乙',
    sampleLower: 'ﾑ 乃 ᄃ Ꭰ 乇 F Ꮆ H ﾉ J K L M N 口 P Q R Ƨ ｲ U V W X Y Z',
    sampleDigits: '0 1 2 3 4 5 6 7 8 9',
    uppercase: '丹 乃 匚 口 巳 下 厶 卄 工 丁 长 乚 从 冂 口 尸 尺 丂 丅 凵 ∨ 山 乂 丫 乙'.split(' '),
    lowercase: 'ﾑ 乃 ᄃ Ꭰ 乇 F Ꮆ H ﾉ J K L M N 口 P Q R Ƨ ｲ U V W X Y Z'.split(' '),
  },
  {
    id: 'small-caps',
    name: 'Small Caps (Minúsculas Altas Aesthetic)',
    category: 'Aesthetic',
    badge: 'Viral TikTok',
    sampleUpper: 'ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ ǫ ʀ s ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ',
    sampleLower: 'ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ ǫ ʀ s ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ',
    sampleDigits: '₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉',
    uppercase: 'ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ ǫ ʀ s ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ'.split(' '),
    lowercase: 'ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ ǫ ʀ s ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ'.split(' '),
    digits: '₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉'.split(' '),
  },
];

const STANDARD_LETTERS = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');

export const AlphabetTableSection: React.FC = () => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>('cursiva-script');
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<string | null>(null);

  const activeStyle = ALPHABET_STYLES.find((s) => s.id === selectedStyleId) || ALPHABET_STYLES[0];

  const handleCopy = (char: string) => {
    navigator.clipboard.writeText(char);
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 1500);
  };

  const handleCopyFullAlphabet = (type: 'upper' | 'lower' | 'digits') => {
    let str = '';
    if (type === 'upper') str = activeStyle.uppercase.join(' ');
    if (type === 'lower') str = activeStyle.lowercase.join(' ');
    if (type === 'digits' && activeStyle.digits) str = activeStyle.digits.join(' ');

    navigator.clipboard.writeText(str);
    setCopiedAll(type);
    setTimeout(() => setCopiedAll(null), 1800);
  };

  return (
    <section id="abecedario-completo" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Conversor de Letras Bonitas · Abecedarios A-Z</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Abecedarios en el Conversor de Letras Bonitas (A a la Z)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explora en el Conversor de Letras Bonitas cada letra individual para copiarla al instante en tu portapapeles o copia el abecedario completo con un solo clic.
          </p>
        </div>

        {/* Style Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {ALPHABET_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyleId(style.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedStyleId === style.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {style.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Active Style Details */}
      <div className="mt-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-slate-900">{activeStyle.name}</span>
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold">
              {activeStyle.badge}
            </span>
          </div>
        </div>

        {/* 1. Mayúsculas Table */}
        <div className="mb-6 bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Mayúsculas (A - Z)
            </h3>
            <button
              onClick={() => handleCopyFullAlphabet('upper')}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-2xs"
            >
              {copiedAll === 'upper' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Mayúsculas</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-1.5">
            {activeStyle.uppercase.map((char, idx) => (
              <button
                key={`up-${idx}`}
                onClick={() => handleCopy(char)}
                title={`Copiar ${STANDARD_LETTERS[idx]}: ${char}`}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg bg-white border transition-all hover:scale-105 ${
                  copiedChar === char
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                    : 'border-slate-200 text-slate-800 hover:border-indigo-300 hover:shadow-2xs'
                }`}
              >
                <span className="text-xs text-slate-400 font-mono font-medium">{STANDARD_LETTERS[idx]}</span>
                <span className="text-lg font-bold my-0.5">{char}</span>
                {copiedChar === char && (
                  <span className="absolute -top-2 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded shadow">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Minúsculas Table */}
        <div className="mb-6 bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Minúsculas (a - z)
            </h3>
            <button
              onClick={() => handleCopyFullAlphabet('lower')}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-2xs"
            >
              {copiedAll === 'lower' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Minúsculas</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-1.5">
            {activeStyle.lowercase.map((char, idx) => (
              <button
                key={`low-${idx}`}
                onClick={() => handleCopy(char)}
                title={`Copiar ${STANDARD_LETTERS[idx].toLowerCase()}: ${char}`}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg bg-white border transition-all hover:scale-105 ${
                  copiedChar === char
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                    : 'border-slate-200 text-slate-800 hover:border-indigo-300 hover:shadow-2xs'
                }`}
              >
                <span className="text-xs text-slate-400 font-mono font-medium">{STANDARD_LETTERS[idx].toLowerCase()}</span>
                <span className="text-lg font-bold my-0.5">{char}</span>
                {copiedChar === char && (
                  <span className="absolute -top-2 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded shadow">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Números (Si aplica) */}
        {activeStyle.digits && (
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Números (0 - 9)
              </h3>
              <button
                onClick={() => handleCopyFullAlphabet('digits')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-2xs"
              >
                {copiedAll === 'digits' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Números</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {activeStyle.digits.map((digit, idx) => (
                <button
                  key={`dig-${idx}`}
                  onClick={() => handleCopy(digit)}
                  title={`Copiar número ${idx}: ${digit}`}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-lg bg-white border transition-all hover:scale-105 ${
                    copiedChar === digit
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                      : 'border-slate-200 text-slate-800 hover:border-indigo-300 hover:shadow-2xs'
                  }`}
                >
                  <span className="text-xs text-slate-400 font-mono font-medium">{idx}</span>
                  <span className="text-lg font-bold my-0.5">{digit}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SEO Table Rich Snippet Fallback HTML Table */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
        <p className="font-semibold text-slate-700 mb-2">
          Tabla de Equivalencia Unicode para Motores de Búsqueda:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px] bg-slate-50 rounded border border-slate-200">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-700">
                <th className="p-2">Estilo Tipográfico</th>
                <th className="p-2">Ejemplo A - Z</th>
                <th className="p-2">Ejemplo a - z</th>
                <th className="p-2">Compatibilidad</th>
              </tr>
            </thead>
            <tbody>
              {ALPHABET_STYLES.map((st) => (
                <tr key={`tbl-${st.id}`} className="border-b border-slate-100 hover:bg-slate-100/50">
                  <td className="p-2 font-bold text-slate-800">{st.name}</td>
                  <td className="p-2 font-mono">{st.sampleUpper.slice(0, 19)}...</td>
                  <td className="p-2 font-mono">{st.sampleLower.slice(0, 19)}...</td>
                  <td className="p-2 text-emerald-600 font-semibold">100% Universal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
