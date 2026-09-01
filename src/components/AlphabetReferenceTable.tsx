import React, { useState } from 'react';
import { Copy, Check, Table, Sparkles } from 'lucide-react';

interface AlphabetSample {
  styleName: string;
  category: string;
  alphabet: string;
  samplePhrase: string;
}

const ALPHABET_SAMPLES: AlphabetSample[] = [
  {
    styleName: 'Cursiva Clásica (Script)',
    category: 'Cursiva',
    alphabet: '𝒶 𝒷 𝒸 𝒹 ℯ 𝒻 ℊ 𝒽 𝒾 𝒿 𝓀 𝓁 𝓂 𝓃 ℴ 𝓅 𝓆 𝓇 𝓈 𝓉 𝓊 𝓋 𝓌 𝓍 𝓎 𝓏',
    samplePhrase: 'ℒℯ𝓉𝓇𝒶𝓈 ℬℴ𝓃𝒾𝓉𝒶𝓈 𝓎 ℰ𝓁ℯℊ𝒶𝓃𝓉ℯ𝓈',
  },
  {
    styleName: 'Cursiva Negrita (Bold Script)',
    category: 'Cursiva',
    alphabet: '𝓪 𝓫 𝓬 𝓭 𝓮 𝓯 𝓰 𝓱 𝓲 𝓳 𝓴 𝓵 𝓶 𝓷 𝓸 𝓹 𝓺 𝓻 𝓼 𝓽 𝓾 𝓿 𝔀 𝔁 𝔂 𝔃',
    samplePhrase: '𝓛𝓮𝓽𝓻𝓪𝓼 𝓑𝓸𝓷𝓲𝓽𝓪𝓼 𝔂 𝓔𝓵𝓮𝓰𝓪𝓷𝓽𝓮𝓼',
  },
  {
    styleName: 'Gótica Medieval (Fraktur)',
    category: 'Gótica',
    alphabet: '𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝔭 𝔮 𝔯 𝔰 𝔱 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷',
    samplePhrase: '𝔏𝔢𝔱𝔯𝔞𝔰 𝔊ó𝔱𝔦𝔠𝔞𝔰 𝔐𝔢𝔡𝔦𝔢𝔳𝔞𝔩𝔢𝔰',
  },
  {
    styleName: 'Gótica Negrita (Bold Fraktur)',
    category: 'Gótica',
    alphabet: '𝖆 𝖇 𝖈 𝖉 𝖊 𝖋 𝖌 𝖍 𝖎 𝖏 𝖐 𝖑 𝖒 𝖓 𝖔 𝖕 𝖖 𝖗 𝖘 𝖙 𝖚 𝖛 𝖜 𝖝 𝖞 𝖟',
    samplePhrase: '𝕷𝖊𝖙𝖗𝖆𝖘 𝕲ó𝖙𝖎𝖈𝖆𝖘 𝕯𝖆𝖗𝖐',
  },
  {
    styleName: 'Negrita Sans Serif',
    category: 'Negrita',
    alphabet: '𝗮 𝗯 𝗰 𝗱 𝗲 𝗳 𝗴 𝗵 𝗶 𝗷 𝗸 𝗹 𝗺 𝗻 𝗼 𝗽 𝗾 𝗿 𝘀 𝘁 𝘂 𝘃 𝘄 𝘅 𝘆 𝘇',
    samplePhrase: '𝗟𝗲𝘁𝗿𝗮𝘀 𝗲𝗻 𝗡𝗲𝗴𝗿𝗶𝘁𝗮 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺',
  },
  {
    styleName: 'Negrita con Serif',
    category: 'Negrita',
    alphabet: '𝐚 𝐛 𝐜 𝐝 𝐞 𝐟 𝐠 𝐡 𝐢 𝐣 𝐤 𝐥 𝐦 𝐧 𝐨 𝐩 𝐪 𝐫 𝐬 𝐭 𝐮 𝐯 𝐰 𝐱 𝐲 𝐳',
    samplePhrase: '𝐋𝐞𝐭𝐫𝐚𝐬 𝐍𝐞𝐠𝐫𝐢𝐭𝐚 𝐂𝐥á𝐬𝐢𝐜𝐚',
  },
  {
    styleName: 'Small Caps (Mayúsculas Pequeñas)',
    category: 'Gaming',
    alphabet: 'ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ ǫ ʀ s ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ',
    samplePhrase: 'ɴɪᴄᴋs ɪɴsᴀɴᴏs ғʀᴇᴇ ғɪʀᴇ',
  },
  {
    styleName: 'Círculos Blancos (Burbujas)',
    category: 'Círculos',
    alphabet: 'ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ',
    samplePhrase: 'ⓛⓔⓣⓡⓐⓢ ⓑⓤⓡⓑⓤⓙⓐ',
  },
  {
    styleName: 'Círculos Negros (Inversos)',
    category: 'Círculos',
    alphabet: '🅐 🅑 🅒 🅓 🅔 🅕 🅖 🅗 🅘 🅙 🅚 🅛 🅜 🅝 🅞 🅟 🅠 🅡 🅢 🅣 🅤 🅥 🅦 🅧 🅨 🅩',
    samplePhrase: '🅣🅘🅣🅤🅛🅞🅢 🅝🅔🅖🅡🅞🅢',
  },
  {
    styleName: 'Monoespaciado (Código / Typewriter)',
    category: 'Moderno',
    alphabet: '𝚊 𝚋 𝚌 𝚍 𝚎 𝚏 𝚐 𝚑 𝚒 𝚓 𝚔 𝚕 𝚖 𝚗 𝚘 𝚙 𝚚 𝚛 𝚜 𝚝 𝚞 𝚟 𝚠 𝚡 𝚢 𝚣',
    samplePhrase: '𝚝𝚎𝚡𝚝𝚘 𝚝𝚢𝚙𝚎𝚠𝚛𝚒𝚝𝚎𝚛',
  },
  {
    styleName: 'Doble Trazo (Blackboard Bold)',
    category: 'Elegante',
    alphabet: '𝕒 𝕓 𝕔 𝕕 𝕖 𝕗 𝕘 𝕙 𝕚 𝕛 𝕜 𝕝 𝕞 𝕟 𝕠 𝕡 𝕢 𝕣 𝕤 𝕥 𝕦 𝕧 𝕨 𝕩 𝕪 𝕫',
    samplePhrase: '𝕕𝕠𝕓𝕝𝕖 𝕥𝕣𝕒𝕫𝕠 𝕖𝕝𝕖𝕘𝕒𝕟𝕥𝕖',
  },
  {
    styleName: 'Cuadrados con Borde',
    category: 'Cuadros',
    alphabet: '🄰 🄱 🄲 🄳 🄴 🄵 🄶 🄷 🄸 🄹 🄺 🄻 🄼 🄽 🄾 🄿 🅀 🅁 🅂 🅃 🅄 🅅 🅆 🅇 🅈 🅉',
    samplePhrase: '🄻🄴🅃🅁🄰🅂 🄴🄽 🄲🅄🄰🄳🅁🄾🅂',
  },
];

export const AlphabetReferenceTable: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAlphabet = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <section className="mt-14 pt-10 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-3 shadow-2xs">
            <Table className="w-3.5 h-3.5" />
            <span>Guía E-E-A-T & Tabla de Caracteres Unicode</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Abecedario de Letras Bonitas (A-Z) para Copiar y Pegar
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
            Consulta la tabla de correspondencias del alfabeto estándar frente a sus glifos Unicode estilizados.
          </p>
        </div>

        {/* Semantic Responsive Reference Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                  <th className="py-3.5 px-4 sm:px-5">Estilo Tipográfico</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Categoría</th>
                  <th className="py-3.5 px-4 sm:px-5">Alfabeto Completo (A - Z)</th>
                  <th className="py-3.5 px-4 sm:px-5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {ALPHABET_SAMPLES.map((item, idx) => (
                  <tr
                    key={item.styleName}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="py-3 px-4 sm:px-5 font-bold text-slate-800 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{item.styleName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5 md:hidden">
                        {item.category}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-semibold">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 sm:px-5 font-mono text-slate-700 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-md break-words">
                      {item.alphabet}
                    </td>
                    <td className="py-3 px-4 sm:px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleCopyAlphabet(item.alphabet, idx)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-2xs ${
                          copiedIndex === idx
                            ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50'
                        }`}
                        title="Copiar abecedario completo"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar A-Z</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* E-E-A-T Technical Specification Accordion/Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-sm border border-slate-800">
          <h3 className="font-extrabold text-sm sm:text-base text-indigo-100 flex items-center gap-2">
            <span>ℹ️ ¿Por Qué el Sistema Unicode Permite Estas Letras?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
            El estándar <strong>Unicode (ISO/IEC 10646)</strong> asigna un código numérico único a cada símbolo tipográfico del mundo. Al usar este conversor, tus palabras son transformadas a símbolos matemáticos alfanuméricos de alta compatibilidad que cualquier plataforma web (Instagram, TikTok, WhatsApp, Discord o Free Fire) interpreta de forma nativa sin necesidad de cargar tipografías externas.
          </p>
        </div>
      </div>
    </section>
  );
};
