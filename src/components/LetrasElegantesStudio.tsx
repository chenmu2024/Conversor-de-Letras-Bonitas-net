import React, { useState } from 'react';
import { Sparkles, Crown, Copy, Check, Feather, Star, Heart, Bookmark } from 'lucide-react';

interface LetrasElegantesStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

export const LetrasElegantesStudio: React.FC<LetrasElegantesStudioProps> = ({
  onApplyText,
  initialText = 'Letras Elegantes',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [customText, setCustomText] = useState(initialText);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(text);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(20);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const elegantSignatures = [
    { name: 'Firma Script Real', text: '𝒥𝑜𝓈é ℳ𝒶𝓇í𝒶 𝒮𝒾𝓁𝓋𝒶 ✧', desc: 'Caligrafía Clásica' },
    { name: 'Lujo Minimalista', text: '✦ 𝐴 𝑁 𝐷 𝑅 𝐸 𝐴   𝑉 𝐴 𝐿 𝐸 𝑁 𝑇 𝐼 𝑁 𝐴 ✦', desc: 'Espaciado Serif' },
    { name: 'Monograma Real', text: '⚜️ 𝓒𝓪𝓻𝓵𝓸𝓼 𝓜𝓮𝓷𝓭𝓸𝔃𝓪 ⚜️', desc: 'Flor de Lis' },
    { name: 'Estética Editorial', text: 'ᴠᴀʟᴇɴᴛɪɴᴀ ɢóᴍᴇᴢ · ᴀʀᴛ ᴅɪʀᴇᴄᴛᴏʀ', desc: 'Small Caps Finas' },
    { name: 'Cursiva Doble Trazo', text: '𝕄𝕒𝕣í𝕒 𝔽𝕖𝕣𝕟𝕒𝕟𝕕𝕒 ✨', desc: 'Doble Línea' },
    { name: 'Firma Romántica', text: '𝒮𝒾𝑒𝓂𝓅𝓇𝑒 𝒯𝓊𝓎𝒶 ♡', desc: 'Script Romántico' },
  ];

  const bioTemplates = [
    '✨ 𝒱𝒾𝓋𝒾𝓇 𝒸𝑜𝓃 𝓅𝓇𝑜𝓅ó𝓈𝒾𝓉𝑜 & 𝒶𝓇𝓉𝑒 ✨\n📍 𝑀𝒶𝒹𝓇𝒾𝒹 | 𝒞𝓇𝑒𝒶𝓉𝒾𝓋𝑒 𝒟𝒾𝓇𝑒𝒸𝓉𝑜𝓇\n✉️ 𝒸𝑜𝓃𝓉𝒶𝒸𝓉𝑜@𝓂𝒾𝑒𝓂𝒶𝒾𝓁.𝒸𝑜𝓂',
    '🕊️ 𝓔𝓵𝓮𝓰𝓪𝓷𝓬𝓲𝓪 𝓮𝓷 𝓵𝓸 𝓼𝓲𝓶𝓹𝓵𝓮\n📖 𝒜𝓂𝒶𝓃𝓉𝑒 𝒹𝑒 𝓁𝑜𝓈 𝓁𝒾𝒷𝓇𝑜𝓈 & 𝓋𝒾𝒶𝒿𝑒𝓈 ✈️\n💫 𝒟𝒾𝓈𝑒ñ𝒶𝓃𝒹𝑜 𝓈𝓊𝑒ñ𝑜𝓈',
    '💎 𝐿𝓊𝓍𝓊𝓇𝓎 & 𝒮𝓉𝓎𝓁𝑒\n☕ 𝒞𝑜𝒻𝒻𝑒𝑒, 𝒶𝓇𝓉 & 𝓂𝒾𝓃𝒾𝓂𝒶𝓁𝒾𝓈𝓂\n🔗 𝒟𝑒𝓈𝒸𝓊𝒷𝓇𝑒 𝓂𝒾 𝓊𝓁𝓉𝒾𝓂𝒶 𝒸𝑜𝓁𝑒𝒸𝒸𝒾ó𝓃 👇',
  ];

  const elegantStylesForText = (str: string) => [
    `𝒮𝒸𝓇𝒾𝓅𝓉 𝐹𝒾𝓃𝑜: ${str}`,
    `𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭: ${str}`,
    `𝕊𝕖𝕣𝕚𝕗 𝕄𝕒𝕥𝕖𝕞á𝕥𝕚𝕔𝕠: ${str}`,
    `𝑀𝒶𝓃𝓊𝓈𝒸𝓇𝒾𝓉𝒶 ℰ𝓁ℯℊ𝒶𝓃𝓉ℯ: ${str}`,
    `ʟᴜᴊᴏ sᴍᴀʟʟ ᴄᴀᴘs: ${str}`,
    `『 𝓔𝓵𝓮𝓰𝓪𝓷𝓬𝓲𝓪 』 ${str}`,
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/40 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Feather className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                💎 Caligrafía & Lujo
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Estudio de Letras Elegantes & Firmas Artísticas
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onApplyText('𝓔𝓵𝓮𝓰𝓪𝓷𝓬𝓲𝓪 & 𝓔𝓼𝓽𝓲𝓵𝓸')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Probar Texto Demo</span>
        </button>
      </div>

      {/* Interactive Custom Text Box */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-indigo-200/90 dark:border-slate-800 p-4 sm:p-5 mb-6 shadow-xs">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          Escribe tu Frase o Nombre para Estilizar en Modo Elegante:
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Escribe aquí tu nombre, marca o dedicatoria..."
            maxLength={35}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => onApplyText(customText)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-indigo-600/20"
          >
            Aplicar al Conversor
          </button>
        </div>

        {/* Variations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {elegantStylesForText(customText || 'Elegante').map((styled, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/70 hover:border-indigo-300 transition-all group"
            >
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate pr-2">
                {styled}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(styled)}
                className="p-1.5 rounded-md bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-indigo-600 hover:text-white transition-colors shrink-0 shadow-2xs"
                title="Copiar texto elegante"
              >
                {copiedItem === styled ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Signatures & Luxury Brand Templates */}
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
        <Crown className="w-4 h-4 text-amber-500" />
        <span>Firmas Digitales & Monogramas Elegantes Listos para Copiar:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {elegantSignatures.map((sig, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition-all group"
          >
            <div>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-0.5">
                {sig.desc}
              </span>
              <span className="font-bold text-sm text-slate-900 dark:text-white tracking-wide">
                {sig.text}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(sig.text)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white dark:bg-slate-800 dark:text-indigo-300 dark:hover:bg-indigo-600 font-bold text-xs transition-all active:scale-95"
            >
              {copiedItem === sig.text ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Elegant Bio Templates */}
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
        <Bookmark className="w-4 h-4 text-indigo-500" />
        <span>Plantillas de Biografía Elegante para Instagram & Perfiles:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {bioTemplates.map((template, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-indigo-300 transition-all"
          >
            <pre className="text-xs font-serif text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed mb-3">
              {template}
            </pre>
            <button
              type="button"
              onClick={() => handleCopy(template)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white dark:bg-slate-800 dark:text-indigo-300 dark:hover:bg-indigo-600 font-bold text-xs transition-all active:scale-95"
            >
              {copiedItem === template ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>¡Plantilla Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Biografía Completa</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
