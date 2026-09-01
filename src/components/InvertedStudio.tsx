import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Scissors,
  Sparkles,
  Copy,
  Check,
  Zap,
  Tag,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { generateZalgo } from '../utils/unicodeConverters';

interface InvertedStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
  J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ',
  S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
  '.': '˙', ',': '\'', '\'': ',', '"': '„', '!': '¡', '?': '¿', '¡': '!', '¿': '?', '<': '>', '>': '<',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '&': '⅋', '_': '‾'
};

const REVERSE_UPSIDE_DOWN_MAP: Record<string, string> = {};
Object.entries(UPSIDE_DOWN_MAP).forEach(([k, v]) => {
  REVERSE_UPSIDE_DOWN_MAP[v] = k;
});

function flipText(text: string, reverseChars: boolean = true, flipPunctuation: boolean = true): string {
  let chars = Array.from(text);
  if (reverseChars) {
    chars = chars.reverse();
  }
  return chars
    .map((c) => {
      if (UPSIDE_DOWN_MAP[c]) {
        if (!flipPunctuation && ['.', ',', '!', '?', '¡', '¿', '(', ')'].includes(c)) return c;
        return UPSIDE_DOWN_MAP[c];
      }
      return c;
    })
    .join('');
}

function decodeFlippedText(text: string): string {
  return Array.from(text)
    .reverse()
    .map((c) => REVERSE_UPSIDE_DOWN_MAP[c] || c)
    .join('');
}

function applyStrikethrough(text: string, type: 'single' | 'double' | 'slash' | 'underline' | 'double-underline' | 'tilde' | 'wave-below' | 'cross'): string {
  const codeMap = {
    single: '\u0336',
    double: '\u0336\u0335',
    slash: '\u0338',
    underline: '\u0332',
    'double-underline': '\u0333',
    tilde: '\u0303',
    'wave-below': '\u0330',
    cross: '\u033D',
  };
  const comb = codeMap[type] || '\u0336';
  return Array.from(text)
    .map((c) => (c === ' ' || c === '\n' ? c : c + comb))
    .join('');
}

export const InvertedStudio: React.FC<InvertedStudioProps> = ({
  onApplyText,
  initialText = 'Texto al Revés',
}) => {
  const [activeTab, setActiveTab] = useState<'flip' | 'strike' | 'offers' | 'zalgo' | 'decoder'>('flip');
  const [inputText, setInputText] = useState(initialText);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Flip options
  const [reverseOrder, setReverseOrder] = useState(true);
  const [flipPunctuation, setFlipPunctuation] = useState(true);

  // Offer generator state
  const [oldPrice, setOldPrice] = useState('$99.99');
  const [newPrice, setNewPrice] = useState('$39.99');
  const [offerTag, setOfferTag] = useState('¡OFERTA FLASH!');

  // Zalgo intensity
  const [zalgoIntensity, setZalgoIntensity] = useState<'low' | 'medium' | 'high'>('medium');

  // Decoder input
  const [decodeInput, setDecodeInput] = useState('˙sǝʌǝɹ lɐ oʇxǝʇ ǝʇsǝ ɐıdoɔ');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
    if (onApplyText) onApplyText(text);
  };

  const flippedResult = useMemo(() => {
    return flipText(inputText || 'Texto al Revés', reverseOrder, flipPunctuation);
  }, [inputText, reverseOrder, flipPunctuation]);

  const reverseOnlyResult = useMemo(() => {
    return Array.from(inputText || 'Texto al Revés').reverse().join('');
  }, [inputText]);

  const palindromeCheck = useMemo(() => {
    const clean = inputText.toLowerCase().replace(/[^a-záéíóúñ0-9]/gi, '');
    if (clean.length < 2) return null;
    const rev = Array.from(clean).reverse().join('');
    return clean === rev;
  }, [inputText]);

  const decodedResult = useMemo(() => {
    if (!decodeInput) return '';
    return decodeFlippedText(decodeInput);
  }, [decodeInput]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Studio Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white border-b border-indigo-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 flex items-center justify-center text-indigo-300 shrink-0 border border-indigo-500/30 shadow-inner">
              <RotateCcw className="w-6 h-6 text-indigo-300 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-[10px] font-black uppercase tracking-wider text-indigo-300 border border-indigo-400/30">
                  ɐpıʇɹǝʌuI · ̶T̶a̶c̶h̶a̶d̶o̶
                </span>
                <span className="text-xs text-indigo-200 font-bold">180° Flip · Espejo · Precios de Oferta · Zalgo</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5 text-white">
                Generador de Letras Invertidas, Texto al Revés & Tachadas
              </h2>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-indigo-900/50">
          {[
            { id: 'flip', label: 'Volteador 180° & Espejo', icon: <FlipVertical className="w-3.5 h-3.5 text-indigo-300" /> },
            { id: 'strike', label: 'Letras Tachadas & Líneas', icon: <Scissors className="w-3.5 h-3.5 text-rose-300" /> },
            { id: 'offers', label: 'Tachador de Precios & Ofertas', icon: <Tag className="w-3.5 h-3.5 text-amber-300" /> },
            { id: 'zalgo', label: 'Texto Glitch & Zalgo Caos', icon: <Zap className="w-3.5 h-3.5 text-emerald-300" /> },
            { id: 'decoder', label: 'Decodificador & Palíndromos', icon: <Search className="w-3.5 h-3.5 text-cyan-300" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white shadow-md scale-105 font-black'
                  : 'bg-indigo-950/70 text-indigo-200 hover:bg-indigo-900/80 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="p-5 sm:p-7">
        {/* TAB 1: UPSIDE DOWN & MIRROR */}
        {activeTab === 'flip' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  Escribe tu Texto para Invertir o Voltear:
                </label>
                {palindromeCheck !== null && (
                  <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                    palindromeCheck ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {palindromeCheck ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : null}
                    {palindromeCheck ? '¡Es un Palíndromo!' : 'No es palíndromo'}
                  </span>
                )}
              </div>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe algo aquí (ej: Hola amigos, ¿Cómo están?)..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Quick Option Toggles */}
            <div className="flex flex-wrap items-center gap-3 p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs">
              <span className="font-extrabold text-indigo-900">Ajustes de Inversión:</span>
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={reverseOrder}
                  onChange={(e) => setReverseOrder(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Invertir orden de caracteres (Reverso)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={flipPunctuation}
                  onChange={(e) => setFlipPunctuation(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Voltear signos de puntuación (!?()[])</span>
              </label>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Upside Down 180 */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col justify-between gap-4 shadow-sm group">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FlipVertical className="w-3.5 h-3.5 text-indigo-400" />
                      Texto de Cabeza (180° Upside Down)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ɐpıʇɹǝʌuI</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-normal text-white mt-3 break-words select-all leading-relaxed">
                    {flippedResult}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Ideal para BIOS, TikTok y WhatsApp</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(flippedResult, 'flip-180')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                      copiedId === 'flip-180'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95'
                    }`}
                  >
                    {copiedId === 'flip-180' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Invertido</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card 2: Reverse Backwards */}
              <div className="p-5 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4 shadow-2xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <FlipHorizontal className="w-3.5 h-3.5 text-slate-600" />
                      Texto al Revés (Orden Inverso)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">espejo</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 break-words select-all leading-relaxed">
                    {reverseOnlyResult}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Mensajes secretos & acertijos</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(reverseOnlyResult, 'rev-order')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      copiedId === 'rev-order'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
                    }`}
                  >
                    {copiedId === 'rev-order' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar al Revés</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STRIKETHROUGH & LINES */}
        {activeTab === 'strike' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Texto para Tachado & Decoración con Líneas:
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu texto tachado..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'single', name: 'Tachado Simple (Strikethrough)', desc: 'Línea continua en el centro', fn: () => applyStrikethrough(inputText || 'Texto Tachado', 'single') },
                { id: 'double', name: 'Doble Tachado Cruzado', desc: 'Doble raya de tachado intenso', fn: () => applyStrikethrough(inputText || 'Texto Tachado', 'double') },
                { id: 'slash', name: 'Tachado Diagonal / Slash (̷)', desc: 'Líneas oblicuas en cada letra', fn: () => applyStrikethrough(inputText || 'Texto Tachado', 'slash') },
                { id: 'underline', name: 'Subrayado Simple (Underline)', desc: 'Línea inferior continua', fn: () => applyStrikethrough(inputText || 'Texto Subrayado', 'underline') },
                { id: 'double-underline', name: 'Subrayado Doble', desc: 'Doble línea inferior de énfasis', fn: () => applyStrikethrough(inputText || 'Texto Subrayado', 'double-underline') },
                { id: 'tilde', name: 'Onda Superior Tilde (̃)', desc: 'Efecto decorativo con tildes', fn: () => applyStrikethrough(inputText || 'Onda Superior', 'tilde') },
                { id: 'wave-below', name: 'Onda Ondulada Inferior (̰)', desc: 'Línea ondulante bajo el texto', fn: () => applyStrikethrough(inputText || 'Onda Inferior', 'wave-below') },
                { id: 'cross', name: 'Cruz Superior (̽)', desc: 'Cruces sobre cada carácter', fn: () => applyStrikethrough(inputText || 'Cruz Superior', 'cross') },
              ].map((st) => {
                const textResult = st.fn();
                const isCopied = copiedId === `strike-${st.id}`;

                return (
                  <div
                    key={st.id}
                    className="p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <span className="text-[11px] font-black text-slate-600 block uppercase tracking-wider">
                        {st.name}
                      </span>
                      <p className="text-xl font-bold text-slate-900 mt-2 break-words select-all">
                        {textResult}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{st.desc}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(textResult, `strike-${st.id}`)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-indigo-600 text-slate-800 hover:text-white border border-slate-300 active:scale-98'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Este Estilo</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MARKETING PRICE TACHATOR */}
        {activeTab === 'offers' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="text-amber-950 font-black">Potencia tus Ventas en WhatsApp e Instagram:</strong> El texto tachado en precios de antes crea un fuerte impacto psicológico de ahorro y urgencia en historias, estados y catálogos de productos.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Precio Anterior:
                </label>
                <input
                  type="text"
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Nuevo Precio / Oferta:
                </label>
                <input
                  type="text"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Etiqueta / Llamado a la Acción:
                </label>
                <input
                  type="text"
                  value={offerTag}
                  onChange={(e) => setOfferTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Generated Price Formats */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                Plantillas de Precios Tachados Listas para Copiar:
              </span>

              {[
                `🔥 ${offerTag}: ${applyStrikethrough(`Antes: ${oldPrice}`, 'single')} ➔ ¡AHORA: ${newPrice}! 🎉`,
                `🏷️ De ${applyStrikethrough(oldPrice, 'single')} a solo 👉 ${newPrice} ⏳ (Envío Gratis)`,
                `💥 ${applyStrikethrough(oldPrice, 'double')} ➔ ${newPrice} | ${offerTag}`,
                `🛍️ SUPER OFERTA: ${applyStrikethrough(`PVP ${oldPrice}`, 'single')} » HOY: ${newPrice} 🚀`,
              ].map((template, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <p className="text-sm sm:text-base font-bold text-amber-300 break-words select-all">
                    {template}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(template, `offer-${idx}`)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      copiedId === `offer-${idx}`
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-95'
                    }`}
                  >
                    {copiedId === `offer-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Oferta</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GLITCH & ZALGO CAOS */}
        {activeTab === 'zalgo' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Texto para Efecto Glitch / Zalgo Corrupto:
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe texto para corromper..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Intensity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Nivel de Caos Glitch:</span>
              {(['low', 'medium', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setZalgoIntensity(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    zalgoIntensity === lvl
                      ? 'bg-slate-950 text-emerald-400 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl === 'low' ? 'Bajo (Leve)' : lvl === 'medium' ? 'Medio (Recomendado)' : 'Extremo (Caos Total)'}
                </button>
              ))}
            </div>

            {/* Glitch Output Canvas */}
            {(() => {
              const zalgoText = generateZalgo(inputText || 'Glitch Corrupto', zalgoIntensity);
              return (
                <div className="p-8 bg-zinc-950 text-emerald-400 rounded-3xl border border-zinc-800 text-center space-y-4 shadow-xl overflow-x-auto">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">
                    Render de Caracteres Diacríticos Unicode
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono break-words select-all py-4 leading-loose text-zinc-100">
                    {zalgoText}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(zalgoText, 'zalgo-copy')}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copiar Texto Glitch Zalgo</span>
                  </button>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 5: DECODER & PALINDROMES */}
        {activeTab === 'decoder' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-cyan-50 border border-cyan-200 text-cyan-950 rounded-2xl p-4 flex items-start gap-3">
              <Search className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="text-cyan-950 font-black">Decodificador Inverso Instantáneo:</strong> ¿Recibiste un mensaje escrito de cabeza o al revés en WhatsApp o redes? Pégalo aquí abajo para leerlo al derecho inmediatamente.
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Pega aquí el Texto Invertido o de Cabeza:
              </label>
              <textarea
                rows={3}
                value={decodeInput}
                onChange={(e) => setDecodeInput(e.target.value)}
                placeholder="Pega texto como '˙ɐloH' o 'séveR lA'..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Decoded Output */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Texto Decodificado / Al Derecho:
                </span>
                <span className="text-[11px] text-slate-400">100% Legible</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-white break-words select-all">
                {decodedResult || 'Escribe o pega un texto invertido arriba para ver su traducción...'}
              </p>
              {decodedResult && (
                <button
                  type="button"
                  onClick={() => handleCopy(decodedResult, 'decoded-copy')}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Texto Decodificado</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
