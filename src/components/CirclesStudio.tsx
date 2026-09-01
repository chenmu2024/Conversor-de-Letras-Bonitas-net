import React, { useState, useMemo } from 'react';
import {
  Circle,
  Square,
  ListOrdered,
  Sparkles,
  Copy,
  Check,
  Hash,
  Type,
  Layers,
  Crown,
  CheckCircle2,
  FileText,
  Boxes
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface CirclesStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

const CIRCLE_WHITE_NUMBERS = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳'];
const CIRCLE_BLACK_NUMBERS = ['⓿', '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿', '⓫', '⓬', '⓭', '⓮', '⓯', '⓰', '⓱', '⓲', '⓳', '⓴'];
const PARENTHESIS_NUMBERS = ['⑴', '⑵', '⑶', '⑷', '⑸', '⑹', '⑺', '⑻', '⑼', '⑽', '⑾', '⑿', '⒀', '⒁', '⒂', '⒃', '⒄', '⒅', '⒆', '⒇'];
const PERIOD_NUMBERS = ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒', '⒓', '⒔', '⒕', '⒖', '⒗', '⒘', '⒙', '⒚', '⒛'];
const DOUBLE_CIRCLE_NUMBERS = ['⓵', '⓶', '⓷', '⓸', '⓹', '⓺', '⓻', '⓼', '⓽', '⓾'];
const EXTENDED_CIRCLE_NUMBERS = ['㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿'];

const LIST_PRESETS = [
  {
    name: '🏆 Top 5 Ranking / Favoritos',
    items: [
      'Primer Lugar (El Mejor)',
      'Segundo Lugar Destacado',
      'Tercer Lugar Medalla de Bronce',
      'Cuarto Puesto Honorífico',
      'Quinto Puesto Mención Especial',
    ],
  },
  {
    name: '📜 Reglas de Grupo (WhatsApp / FB)',
    items: [
      'Respeto mutuo y buen trato entre todos',
      'Prohibido el spam y enlaces sospechosos',
      'Compartir solo contenido del tema del grupo',
      'Horario de mensajes de 9:00 a 21:00',
    ],
  },
  {
    name: '🚀 Pasos a Seguir (Tutorial / Guía)',
    items: [
      'Copia tu texto en el conversor',
      'Elige tu estilo de círculos o cuadros favorito',
      'Haz clic en el botón Copiar',
      'Pégalo directamente en tu biografía o post',
    ],
  },
  {
    name: '💡 Puntos Clave de Venta / Beneficios',
    items: [
      'Calidad 100% garantizada y certificada',
      'Envíos rápidos a todo el país',
      'Soporte y atención 24/7 personalizada',
      'Garantía de devolución de 30 días',
    ],
  },
];

function generateUnicodeBox(text: string, style: 'double' | 'single' | 'round' | 'bold'): string {
  const line = text.trim();
  const len = line.length + 2;

  if (style === 'double') {
    const top = `╔${'═'.repeat(len)}╗`;
    const mid = `║ ${line} ║`;
    const bot = `╚${'═'.repeat(len)}╝`;
    return `${top}\n${mid}\n${bot}`;
  }
  if (style === 'round') {
    const top = `╭${'─'.repeat(len)}╮`;
    const mid = `│ ${line} │`;
    const bot = `╰${'─'.repeat(len)}╯`;
    return `${top}\n${mid}\n${bot}`;
  }
  if (style === 'bold') {
    const top = `┏${'━'.repeat(len)}┓`;
    const mid = `┃ ${line} ┃`;
    const bot = `┗${'━'.repeat(len)}┛`;
    return `${top}\n${mid}\n${bot}`;
  }
  const top = `┌${'─'.repeat(len)}┐`;
  const mid = `│ ${line} │`;
  const bot = `└${'─'.repeat(len)}┘`;
  return `${top}\n${mid}\n${bot}`;
}

export const CirclesStudio: React.FC<CirclesStudioProps> = ({
  onApplyText,
  initialText = 'Numero 1',
}) => {
  const [activeTab, setActiveTab] = useState<'styles' | 'numbers' | 'lists' | 'boxes' | 'alphabet'>('styles');
  const [inputText, setInputText] = useState(initialText);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // List Generator State
  const [bulletStyle, setBulletStyle] = useState<'black-circle' | 'white-circle' | 'parenthesis' | 'double' | 'period'>('black-circle');
  const [listLines, setListLines] = useState<string>(
    'Primer Punto Destacado\nSegundo Punto Importante\nTercer Punto de Interés\nCuarto Punto de Conclusión'
  );

  // Box generator state
  const [boxText, setBoxText] = useState('TITULO DESTACADO');
  const [boxStyle, setBoxStyle] = useState<'double' | 'round' | 'bold' | 'single'>('double');

  const circleWhiteGen = FONT_GENERATORS.find((g) => g.id === 'circulos-claros')!;
  const circleBlackGen = FONT_GENERATORS.find((g) => g.id === 'circulos-oscuros')!;
  const squareWhiteGen = FONT_GENERATORS.find((g) => g.id === 'cuadros-claros')!;
  const squareBlackGen = FONT_GENERATORS.find((g) => g.id === 'cuadros-oscuros')!;
  const parenthesisGen = FONT_GENERATORS.find((g) => g.id === 'parentesis-caracteres')!;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
    if (onApplyText) onApplyText(text);
  };

  // Formatted List Output
  const formattedListResult = useMemo(() => {
    const lines = listLines.split('\n').filter((l) => l.trim().length > 0);
    return lines
      .map((line, idx) => {
        let numSym = '';
        if (bulletStyle === 'black-circle') {
          numSym = CIRCLE_BLACK_NUMBERS[idx + 1] || `[${idx + 1}]`;
        } else if (bulletStyle === 'white-circle') {
          numSym = CIRCLE_WHITE_NUMBERS[idx + 1] || `(${idx + 1})`;
        } else if (bulletStyle === 'parenthesis') {
          numSym = PARENTHESIS_NUMBERS[idx] || `(${idx + 1})`;
        } else if (bulletStyle === 'double') {
          numSym = DOUBLE_CIRCLE_NUMBERS[idx] || `${idx + 1}`;
        } else {
          numSym = PERIOD_NUMBERS[idx] || `${idx + 1}.`;
        }
        return `${numSym} ${line.trim()}`;
      })
      .join('\n');
  }, [listLines, bulletStyle]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Studio Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-sky-950 to-slate-900 text-white border-b border-sky-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-300 shrink-0 border border-sky-400/30 shadow-inner">
              <Boxes className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-sky-500/30 text-[10px] font-black uppercase tracking-wider text-sky-200 border border-sky-400/30">
                  Ⓒⓘⓡⓒⓤⓛⓞⓢ · 🅲🆄🅰🅳🆁🅾🆂
                </span>
                <span className="text-xs text-sky-200 font-bold">Burbujas · Números ①-⑳ · Listas ❶ ❷ ❸ · Cajas</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5 text-white">
                Generador de Letras en Círculos, Cuadros & Números
              </h2>
            </div>
          </div>
        </div>

        {/* Studio Tab Navigation */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-sky-900/50">
          {[
            { id: 'styles', label: 'Estilos en Círculos & Cuadros', icon: <Circle className="w-3.5 h-3.5 text-sky-300" /> },
            { id: 'numbers', label: 'Matriz de Números ①-⑳ y ❶-⓴', icon: <Hash className="w-3.5 h-3.5 text-amber-300" /> },
            { id: 'lists', label: 'Creador de Listas & Rankings ❶ ❷ ❸', icon: <ListOrdered className="w-3.5 h-3.5 text-emerald-300" /> },
            { id: 'boxes', label: 'Cajas & Marcos Unicode ╔═╗', icon: <Square className="w-3.5 h-3.5 text-indigo-300" /> },
            { id: 'alphabet', label: 'Abecedario de Círculos A-Z', icon: <Type className="w-3.5 h-3.5 text-rose-300" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-md scale-105 font-black'
                  : 'bg-sky-950/70 text-sky-200 hover:bg-sky-900/80 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 sm:p-7">
        {/* TAB 1: CIRCLES & SQUARES STYLES */}
        {activeTab === 'styles' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Escribe tu Texto, Título o Nombre:
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu texto aquí (Ej: Titulo 1, Ganador, VIP)..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Grid of Styles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'c-white', name: 'Ⓒⓘⓡⓒⓤⓛⓞⓢ Ⓑⓛⓐⓝⓒⓞⓢ (Bubble White)', gen: circleWhiteGen, desc: 'Letras mayúsculas y minúsculas en círculos claros' },
                { id: 'c-black', name: '🅒🅘🅡🅒🅤🅛🅞🅢 🅝🅔🅖🅡🅞🅢 (Dark Bubbles)', gen: circleBlackGen, desc: 'Círculos oscuros rellenos con alto contraste' },
                { id: 's-white', name: '🄲🅄🄰🄳🅁🄾🅂 🄱🄻🄰🄽🄲🄾🅂 (Square Outline)', gen: squareWhiteGen, desc: 'Letras cuadradas con contorno nítido' },
                { id: 's-black', name: '🅲🆄🅰🅳🆁🅾🆂 🅽🅴🅶🆁🅾🆂 (Dark Square Buttons)', gen: squareBlackGen, desc: 'Botones cuadrados negros rellenos' },
                { id: 'p-round', name: '⒜⒝⒞ Letras Entre Paréntesis', gen: parenthesisGen, desc: 'Caracteres encerrados entre paréntesis' },
                { id: 'c-japanese', name: '〖 Ⓒⓘⓡⓒⓤⓛⓞⓢ 〗 Con Corchetes Japoneses', fn: (t: string) => `〖 ${circleWhiteGen.transform(t)} 〗`, desc: 'Enmarcado aesthetic oriental' },
                { id: 'c-stars', name: '★ 🅒🅘🅡🅒🅤🅛🅞🅢 ★ Con Estrellas Negras', fn: (t: string) => `★ ${circleBlackGen.transform(t)} ★`, desc: 'Ideal para rangos, títulos y gamertags' },
                { id: 's-spaced', name: '🄲 🅄 🄰 🄳 🅁 🄾 🅂 (Cuadros Espaciados)', fn: (t: string) => Array.from(squareWhiteGen.transform(t)).join(' '), desc: 'Espaciado amplio para bios de Instagram' },
              ].map((item) => {
                const textResult = item.fn ? item.fn(inputText || 'Texto 1') : item.gen.transform(inputText || 'Texto 1');
                const isCopied = copiedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between gap-3 shadow-2xs group"
                  >
                    <div>
                      <span className="text-[11px] font-black text-slate-600 group-hover:text-sky-700 block uppercase tracking-wider">
                        {item.name}
                      </span>
                      <p className="text-xl sm:text-2xl font-normal text-slate-900 mt-2 break-words select-all leading-relaxed">
                        {textResult}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{item.desc}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">Unicode Enclosed</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(textResult, item.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-sky-600 text-slate-800 hover:text-white border border-slate-300 active:scale-95'
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
                            <span>Copiar Estilo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CIRCLED NUMBERS MATRIX (0 to 50+) */}
        {activeTab === 'numbers' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Matriz de Números en Círculos & Listas Unicode (Toca para Copiar)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Haz clic en cualquier número circular o entre paréntesis para copiarlo al instante a tu portapapeles:
              </p>
            </div>

            {/* Category 1: Black Circles */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider block">
                ❶ ❷ ❸ Números en Círculos Negros Rellenos (Del ⓿ al ⓴)
              </span>
              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-11 gap-2">
                {CIRCLE_BLACK_NUMBERS.map((num, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCopy(num, `num-b-${i}`)}
                    className="p-2.5 bg-slate-800 hover:bg-sky-500 hover:text-white rounded-xl text-xl font-bold text-center border border-slate-700 transition-all hover:scale-110 active:scale-90"
                    title={`Copiar ${num}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Category 2: White Circles */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                ① ② ③ Números en Círculos Blancos Clásicos (Del ⓪ al ⑳)
              </span>
              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-11 gap-2">
                {CIRCLE_WHITE_NUMBERS.map((num, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCopy(num, `num-w-${i}`)}
                    className="p-2.5 bg-white hover:bg-slate-900 hover:text-white rounded-xl text-xl font-bold text-center border border-slate-300 transition-all hover:scale-110 active:scale-90 shadow-2xs"
                    title={`Copiar ${num}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Category 3: Double Circles & Parentheses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  ⓵ ⓶ ⓷ Números en Doble Círculo (1 al 10)
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {DOUBLE_CIRCLE_NUMBERS.map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCopy(num, `num-d-${i}`)}
                      className="p-2 bg-white hover:bg-sky-600 hover:text-white rounded-xl text-xl font-bold text-center border border-slate-300 transition-all hover:scale-110"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  ⑴ ⑵ ⑶ Números Entre Paréntesis (1 al 10)
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {PARENTHESIS_NUMBERS.slice(0, 10).map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCopy(num, `num-p-${i}`)}
                      className="p-2 bg-white hover:bg-sky-600 hover:text-white rounded-xl text-xl font-bold text-center border border-slate-300 transition-all hover:scale-110"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category 4: Extended 21 to 50 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                ㉑ ㉒ ㉓ Números Extendidos en Círculo (Del 21 al 50)
              </span>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {EXTENDED_CIRCLE_NUMBERS.map((num, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCopy(num, `num-ext-${i}`)}
                    className="p-2 bg-white hover:bg-slate-900 hover:text-white rounded-xl text-lg font-bold text-center border border-slate-300 transition-all hover:scale-110"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIST & RANKING CREATOR */}
        {activeTab === 'lists' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Creador Automático de Listas & Rankings con Círculos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Escribe tus elementos línea por línea o elige una plantilla predefinida:
              </p>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Plantillas Rápidas (Toca para cargar):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LIST_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setListLines(preset.items.join('\n'))}
                    className="p-3 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-left text-xs font-bold text-slate-800 transition-all"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Estilo de Viñeta Numérica:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'black-circle', label: '❶ ❷ ❸ Círculo Negro' },
                  { id: 'white-circle', label: '① ② ③ Círculo Blanco' },
                  { id: 'parenthesis', label: '⑴ ⑵ ⑶ Paréntesis' },
                  { id: 'double', label: '⓵ ⓶ ⓷ Doble Círculo' },
                  { id: 'period', label: '⒈ ⒉ ⒊ Con Punto' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setBulletStyle(st.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      bulletStyle === st.id
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea Input */}
            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1.5">
                Elementos de tu Lista (Uno por cada salto de línea):
              </label>
              <textarea
                rows={5}
                value={listLines}
                onChange={(e) => setListLines(e.target.value)}
                placeholder="Escribe cada elemento en una línea separada..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Formatted Output Box */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider">
                  Resultado de Lista Formateada:
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(formattedListResult, 'list-result-copy')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    copiedId === 'list-result-copy'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                  }`}
                >
                  {copiedId === 'list-result-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'list-result-copy' ? '¡Lista Copiada!' : 'Copiar Lista Completa'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm font-medium text-slate-200 whitespace-pre-line leading-relaxed select-all">
                {formattedListResult || 'Escribe elementos arriba para generar tu lista numerada...'}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BOXES & BORDERS GENERATOR */}
        {activeTab === 'boxes' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Generador de Cajas & Marcos de Texto Unicode (╔═╗ ╭─╮ ┏━┓)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Enmarca tus títulos y mensajes de WhatsApp/Facebook con bordes y esquinas ASCII y Unicode:
              </p>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Texto a Enmarcar en Caja:
              </label>
              <input
                type="text"
                value={boxText}
                onChange={(e) => setBoxText(e.target.value)}
                placeholder="Escribe el título de tu caja..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            {/* Box Styles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'double', name: 'Marco Doble Imperial ╔═╗', fn: () => generateUnicodeBox(boxText || 'TITULO', 'double') },
                { id: 'round', name: 'Borde Redondeado ╭─╮', fn: () => generateUnicodeBox(boxText || 'TITULO', 'round') },
                { id: 'bold', name: 'Borde Grueso ┏━┓', fn: () => generateUnicodeBox(boxText || 'TITULO', 'bold') },
                { id: 'single', name: 'Borde Fino Clásico ┌─┐', fn: () => generateUnicodeBox(boxText || 'TITULO', 'single') },
              ].map((b) => {
                const boxOutput = b.fn();
                const isCopied = copiedId === `box-${b.id}`;

                return (
                  <div
                    key={b.id}
                    className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col justify-between gap-4 shadow-sm"
                  >
                    <div>
                      <span className="text-xs font-bold text-indigo-400 block uppercase tracking-wider">
                        {b.name}
                      </span>
                      <pre className="mt-3 p-3 bg-black/60 rounded-xl font-mono text-sm sm:text-base text-indigo-200 overflow-x-auto select-all leading-tight">
                        {boxOutput}
                      </pre>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(boxOutput, `box-${b.id}`)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? '¡Caja Copiada!' : 'Copiar Caja'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: ALPHABET A-Z IN CIRCLES & SQUARES */}
        {activeTab === 'alphabet' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Abecedario Completo en Círculos & Cuadros (A - Z)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Toca cualquier letra para copiarla individualmente:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {alphabet.map((letter) => {
                const lower = letter.toLowerCase();
                const circW = circleWhiteGen.transform(letter);
                const circB = circleBlackGen.transform(letter);
                const sqW = squareWhiteGen.transform(letter);
                const isCopied = copiedId === `alpha-circ-${letter}`;

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleCopy(`${circW} ${circB} ${sqW}`, `alpha-circ-${letter}`)}
                    className="p-3 bg-slate-50 hover:bg-sky-50 rounded-xl border border-slate-200 text-center transition-all hover:border-sky-300 hover:scale-105 active:scale-95 group shadow-2xs"
                    title={`Copiar ${circW} ${circB} ${sqW}`}
                  >
                    <span className="text-[10px] text-slate-400 block font-sans">
                      {letter} {lower}
                    </span>
                    <div className="flex items-center justify-center gap-1.5 my-1 text-xl text-slate-900 group-hover:text-sky-700">
                      <span>{circW}</span>
                      <span>{circB}</span>
                      <span>{sqW}</span>
                    </div>
                    <span className="text-[9px] text-sky-600 font-bold block opacity-0 group-hover:opacity-100 transition-opacity">
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
