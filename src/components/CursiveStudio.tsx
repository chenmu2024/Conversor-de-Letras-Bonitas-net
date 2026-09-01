import React, { useState } from 'react';
import { 
  Feather, 
  Sparkles, 
  Copy, 
  Check, 
  Heart, 
  Crown, 
  PenTool, 
  BookOpen, 
  Send,
  Sliders,
  Type,
  FileText
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface CursiveStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

const CURSIVE_TATTOO_IDEAS = [
  { word: 'Resiliencia', label: 'Superación' },
  { word: 'Familia', label: 'Amor & Hogar' },
  { word: 'Amor Fati', label: 'Filosofía' },
  { word: 'Gratitud', label: 'Paz Interior' },
  { word: 'Siempre Fuerte', label: 'Motivación' },
  { word: 'Blessed', label: 'Espiritual' },
  { word: 'Incondicional', label: 'Pareja/Hijos' },
  { word: 'Carpe Diem', label: 'Vivir el Hoy' },
  { word: 'Libertad', label: 'Espíritu Libre' },
  { word: 'Soltar & Fluir', label: 'Bienestar' },
];

const CURSIVE_LETTER_TEMPLATES = [
  {
    category: '💌 Carta de Amor / Romántica',
    text: `𝒬𝓊ℯ𝓇𝒾𝒹ℴ 𝒶𝓂ℴ𝓇,\n\n𝒢𝓇𝒶𝒸𝒾𝒶𝓈 𝓅ℴ𝓇 𝓁𝓁ℯ𝓃𝒶𝓇 𝓂𝒾 𝓋𝒾𝒹𝒶 𝒹ℯ 𝓂ℴ𝓂ℯ𝓃𝓉ℴ𝓈 𝒾𝓃ℴ𝓁𝓋𝒾𝒹𝒶𝒷𝓁ℯ𝓈.\n𝒞𝒶𝒹𝒶 𝒹í𝒶 𝒶 𝓉𝓊 𝓁𝒶𝒹ℴ ℯ𝓈 𝓊𝓃 𝓇ℯℊ𝒶𝓁ℴ 𝒾𝓃𝒸𝓇ℯí𝒷𝓁ℯ.\n\n𝒮𝒾ℯ𝓂𝓅𝓇ℯ 𝓉𝓊𝓎ℴ/𝒶, 𝒸ℴ𝓃 𝓉ℴ𝒹ℴ 𝓂𝒾 𝒸ℴ𝓇𝒶𝓏ó𝓃 ♡`,
  },
  {
    category: '🎂 Felicitación de Cumpleaños Elegante',
    text: `✨ ¡ℱℯ𝓁𝒾𝓏 𝒞𝓊𝓂𝓅𝓁ℯ𝒶ñℴ𝓈! ✨\n\n𝒬𝓊ℯ ℯ𝓈𝓉ℯ 𝓃𝓊ℯ𝓋ℴ 𝒶ñℴ 𝒹ℯ 𝓋𝒾𝒹𝒶 ℯ𝓈𝓉é 𝓁𝓁ℯ𝓃ℴ 𝒹ℯ é𝓍𝒾𝓉ℴ𝓈,\ns𝒶𝓁𝓊𝒹 𝓎 𝓈𝓊ℯñℴ𝓈 𝒸𝓊𝓂𝓅𝓁𝒾𝒹ℴ𝓈.\n\n¡𝒯ℯ 𝒹ℯ𝓈ℯℴ 𝓁ℴ 𝓂ℯ𝒿ℴ𝓇 𝒽ℴ𝓎 𝓎 𝓈𝒾ℯ𝓂𝓅𝓇ℯ! 🥂🎉`,
  },
  {
    category: '🕊️ Dedicatoria de Gratitud',
    text: `𝒰𝓃 𝓅ℯ𝓆𝓊ℯñℴ 𝒹ℯ𝓉𝒶𝓁𝓁ℯ 𝓅𝒶𝓇𝒶 𝒹𝒶𝓇𝓉ℯ 𝓁𝒶𝓈 ℊ𝓇𝒶𝒸𝒾𝒶𝓈 𝒹ℯ 𝒸ℴ𝓇𝒶𝓏ó𝓃.\n𝒯𝓊 𝒶𝓅ℴ𝓎ℴ 𝓎 𝒶𝓂𝒾𝓈𝓉𝒶𝒹 𝓈𝒾ℊ𝓃𝒾𝒻𝒾𝒸𝒶𝓃 ℯ𝓁 𝓂𝓊𝓃𝒹ℴ 𝓅𝒶𝓇𝒶 𝓂í. 🌿✨`,
  },
  {
    category: '💍 Invitación de Boda / Evento Especial',
    text: `𝒥𝓊𝓃𝓉ℴ𝓈 𝒸ℴ𝓂ℯ𝓃𝓏𝒶𝓂ℴ𝓈 𝓊𝓃 𝓃𝓊ℯ𝓋ℴ 𝒸𝒶𝓅í𝓉𝓊𝓁ℴ...\n\n𝒩ℴ𝓈 ℯ𝓃𝒸𝒶𝓃𝓉𝒶𝓇í𝒶 𝒸ℴ𝓃𝓉𝒶𝓇 𝒸ℴ𝓃 𝓉𝓊 𝓅𝓇ℯ𝓈ℯ𝓃𝒸𝒾𝒶\nℯ𝓃 ℯ𝓈𝓉ℯ 𝒹í𝒶 𝓉𝒶𝓃 ℯ𝓈𝓅ℯ𝒸𝒾𝒶𝓁 𝓅𝒶𝓇𝒶 𝓃ℴ𝓈ℴ𝓉𝓇ℴ𝓈. 🕊️💍`,
  },
];

const CURSIVE_STYLES = [
  { id: 'cursiva-bold', label: '𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭 (Script Grueso & Elegante)', deco: '' },
  { id: 'cursiva-regular', label: '𝒮𝒸𝓇𝒾𝓅𝓉 ℛℯℊ𝓊𝓁𝒶𝓇 (Manuscrita Fina Clásica)', deco: '' },
  { id: 'italic-serif', label: '𝐼𝓉𝒶𝓁𝒾𝒸 𝒮𝑒𝓇𝒾𝒻 (Itálica Editorial Tradicional)', deco: '' },
  { id: 'italic-sans', label: '𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴 (Itálica Moderna & Limpia)', deco: '' },
  { id: 'cursiva-sparkles', label: '✨ 𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓻𝓲𝓵𝓵𝓪𝓷𝓽𝓮 ✨ (Aesthetic con Destellos)', deco: 'sparkles' },
  { id: 'cursiva-queen', label: '♛ 𝒬𝓊ℯℯ𝓃 𝒮𝒸𝓇𝒾𝓅𝓉 ♛ (Con Coronas de Realeza)', deco: 'queen' },
  { id: 'cursiva-decorada-flores', label: '✿ 𝒞𝓊𝓇𝓈𝒾𝓋𝒶 𝐹𝓁𝑜𝓇𝒶𝓁 ✿ (Decorada con Flores)', deco: 'flower' },
];

export const CursiveStudio: React.FC<CursiveStudioProps> = ({
  onApplyText,
  initialText = 'Amor y Gratitud',
}) => {
  const [activeTab, setActiveTab] = useState<'signatures' | 'tattoo-sim' | 'letters' | 'alphabet'>('signatures');
  const [inputText, setInputText] = useState(initialText);
  const [tattooWord, setTattooWord] = useState('Resiliencia');
  const [tattooStyle, setTattooStyle] = useState<'bold' | 'fine' | 'serif'>('bold');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scriptBoldGen = FONT_GENERATORS.find((g) => g.id === 'cursiva-bold')!;
  const scriptRegGen = FONT_GENERATORS.find((g) => g.id === 'cursiva-regular')!;
  const italicSerifGen = FONT_GENERATORS.find((g) => g.id === 'italic-serif')!;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
    if (onApplyText) onApplyText(text);
  };

  const getTattooRender = (word: string, style: 'bold' | 'fine' | 'serif') => {
    if (style === 'bold') return scriptBoldGen.transform(word);
    if (style === 'fine') return scriptRegGen.transform(word);
    return italicSerifGen.transform(word);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Studio Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-white shrink-0 border border-white/20">
              <Feather className="w-6 h-6 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-500/30 text-[10px] font-black uppercase tracking-wider text-purple-200">
                  Caligrafía Pro
                </span>
                <span className="text-xs text-purple-100/80 font-bold">Script · Manuscrita · Tatuajes · Firmas</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5">
                Estudio de Letras Cursivas & Caligrafía Elegante
              </h2>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/10">
          {[
            { id: 'signatures', label: 'Generador de Cursivas & Firmas', icon: <PenTool className="w-3.5 h-3.5" /> },
            { id: 'tattoo-sim', label: 'Simulador de Tatuajes & Tattoos', icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" /> },
            { id: 'letters', label: 'Cartas de Amor & Dedicatorias', icon: <Heart className="w-3.5 h-3.5 text-rose-300" /> },
            { id: 'alphabet', label: 'Abecedario Cursivo A-Z', icon: <Type className="w-3.5 h-3.5 text-indigo-300" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-md scale-105'
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
        {/* TAB 1: SIGNATURES & CURSIVE STYLES */}
        {activeTab === 'signatures' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Escribe tu Nombre, Frase o Firma en Cursiva:
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe aquí tu texto..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Cursive Styles Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CURSIVE_STYLES.map((st) => {
                const gen = FONT_GENERATORS.find((g) => g.id === st.id) || scriptBoldGen;
                const converted = gen.transform(inputText || 'Tu Nombre');
                const isCopied = copiedId === st.id;

                return (
                  <div
                    key={st.id}
                    className="p-4 bg-slate-50 hover:bg-purple-50/40 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3 transition-colors shadow-2xs group"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 group-hover:text-purple-600 block uppercase tracking-wider">
                        {st.label}
                      </span>
                      <p className="text-xl sm:text-2xl font-normal text-slate-900 mt-2 break-words leading-relaxed select-all">
                        {converted}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] text-slate-400 font-medium">Unicode Compatible</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(converted, st.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-purple-600 hover:text-white text-slate-800 border border-slate-200 active:scale-95'
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
                            <span>Copiar Cursiva</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Suffixes and Aesthetics */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3">
              <span className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                Firmas Cursivas con Marcos & Decoraciones
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  `~ 𝓝𝓪𝓶𝓮 ~`.replace('𝓝𝓪𝓶𝓮', scriptBoldGen.transform(inputText || 'Firma')),
                  `♡ 𝒩𝒶𝓂ℯ ♡`.replace('𝒩𝒶𝓂ℯ', scriptRegGen.transform(inputText || 'Firma')),
                  `✨ 𝓝𝓪𝓶𝓮 ✨`.replace('𝓝𝓪𝓶𝓮', scriptBoldGen.transform(inputText || 'Firma')),
                  `♛ 𝓝𝓪𝓶𝓮 ♛`.replace('𝓝𝓪𝓶𝓮', scriptBoldGen.transform(inputText || 'Firma')),
                  `⊰ 𝒩𝒶𝓂ℯ ⊱`.replace('𝒩𝒶𝓂ℯ', scriptRegGen.transform(inputText || 'Firma')),
                  `✦ 𝓝𝓪𝓶𝓮 ✦`.replace('𝓝𝓪𝓶𝓮', scriptBoldGen.transform(inputText || 'Firma')),
                ].map((dec, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCopy(dec, `dec-${idx}`)}
                    className="p-3 bg-slate-800 hover:bg-purple-900/60 border border-slate-700 rounded-xl text-center text-sm font-medium transition-all truncate hover:border-purple-400"
                  >
                    {dec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TATTOO SIMULATOR & IDEAS */}
        {activeTab === 'tattoo-sim' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
              <div className="text-xs text-purple-900 leading-relaxed">
                <strong>Inspiración para Tatuajes:</strong> La tipografía cursiva (Script) es el estilo más solicitado en el mundo del tatuaje para plasmar nombres, fechas y palabras con significado. Usa este simulador para visualizar tu idea antes de tatuarte.
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Palabra o Nombre para Tatuaje:
              </label>
              <input
                type="text"
                value={tattooWord}
                onChange={(e) => setTattooWord(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>

            {/* Popular Tattoo Words 1-Click */}
            <div>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                Ideas & Palabras Populares para Tatuajes (Toca para probar):
              </span>
              <div className="flex flex-wrap gap-2">
                {CURSIVE_TATTOO_IDEAS.map((idea) => (
                  <button
                    key={idea.word}
                    type="button"
                    onClick={() => setTattooWord(idea.word)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      tattooWord === idea.word
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{idea.word}</span>
                    <span className="text-[9px] opacity-75 ml-1">({idea.label})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Grosor del Trazo:</span>
              {(['bold', 'fine', 'serif'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setTattooStyle(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-colors ${
                    tattooStyle === st ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {st === 'bold' ? 'Trazo Grueso (𝓒𝓾𝓻𝓼𝓲𝓿𝓪)' : st === 'fine' ? 'Trazo Fino (𝒮𝒸𝓇𝒾𝓅𝓉)' : 'Itálica (𝐼𝓉𝒶𝓁𝒾𝒸)'}
                </button>
              ))}
            </div>

            {/* Realistic Tattoo Canvas / Mockup */}
            <div className="p-8 sm:p-12 rounded-3xl bg-amber-50/50 border-2 border-amber-200/70 shadow-inner text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-amber-200/60 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                Simulación de Tatuaje en Piel
              </div>
              <div className="text-4xl sm:text-6xl font-normal text-slate-900 tracking-wide select-all py-4 font-serif">
                {getTattooRender(tattooWord || 'Resiliencia', tattooStyle)}
              </div>
              <p className="text-xs text-amber-900/70 font-medium">
                Diseño caligráfico vectorial compatible para llevar como plantilla a tu estudio de tatuajes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(getTattooRender(tattooWord, tattooStyle), 'tattoo-copy')}
              className="w-full py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar Diseño de Tatuaje: {getTattooRender(tattooWord, tattooStyle)}</span>
            </button>
          </div>
        )}

        {/* TAB 3: LOVE LETTERS & DEDICATIONS */}
        {activeTab === 'letters' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="font-extrabold text-base text-slate-900">
              Plantillas de Cartas, Dedicatorias y Felicitaciones en Cursiva
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mensajes completos formateados con caracteres manuscritos Unicode para enviar por WhatsApp, cartas digitales o tarjetas de regalo:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {CURSIVE_LETTER_TEMPLATES.map((tmpl, idx) => {
                const isCopied = copiedId === `tmpl-${idx}`;

                return (
                  <div
                    key={tmpl.category}
                    className="p-5 bg-purple-50/40 rounded-2xl border border-purple-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-purple-950">
                        {tmpl.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(tmpl.text, `tmpl-${idx}`)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-purple-600 hover:text-white text-slate-700 border border-slate-200 shadow-2xs'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? '¡Copiado!' : 'Copiar Carta'}</span>
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-purple-100 text-sm sm:text-base text-slate-800 font-medium whitespace-pre-line leading-relaxed select-all">
                      {tmpl.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE CURSIVE ALPHABET MATRIX */}
        {activeTab === 'alphabet' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Abecedario Cursivo Completo (Letra por Letra A - Z)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Toca cualquier letra mayúscula o minúscula para copiarla al instante al portapapeles:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {alphabet.map((letter) => {
                const lower = letter.toLowerCase();
                const boldUpper = scriptBoldGen.transform(letter);
                const boldLower = scriptBoldGen.transform(lower);
                const isCopied = copiedId === `alpha-${letter}`;

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleCopy(`${boldUpper}${boldLower}`, `alpha-${letter}`)}
                    className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 text-center transition-all hover:border-purple-300 hover:scale-105 active:scale-95 group"
                    title={`Copiar ${boldUpper}${boldLower}`}
                  >
                    <span className="text-[10px] text-slate-400 block font-sans">
                      {letter} {lower}
                    </span>
                    <span className="text-2xl text-slate-900 group-hover:text-purple-700 font-normal block my-1">
                      {boldUpper} {boldLower}
                    </span>
                    <span className="text-[9px] text-purple-600 font-bold block opacity-0 group-hover:opacity-100 transition-opacity">
                      {isCopied ? '¡Copiado!' : 'Copiar'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
