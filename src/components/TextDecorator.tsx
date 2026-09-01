import React, { useState, useMemo } from 'react';
import { NICK_DECORATIONS } from '../data/decorations';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { INVISIBLE_SPACE } from '../data/symbols';
import {
  Copy,
  Check,
  Sparkles,
  Wand2,
  Shuffle,
  Flame,
  Space,
  Gamepad2,
  Heart,
  Crown,
  Layers,
  ArrowRightLeft,
  Trash2,
  Tags,
  Zap,
  Sliders
} from 'lucide-react';

interface TextDecoratorProps {
  initialText?: string;
  onApplyGlobalText?: (text: string) => void;
}

export const TextDecorator: React.FC<TextDecoratorProps> = ({
  initialText = '',
  onApplyGlobalText,
}) => {
  const [inputText, setInputText] = useState(initialText || 'Mi Nick');
  const [selectedLeft, setSelectedLeft] = useState('꧁༺ ');
  const [selectedRight, setSelectedRight] = useState(' ༻꧂');
  const [selectedFontId, setSelectedFontId] = useState('cursiva-bold');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [copiedSpace, setCopiedSpace] = useState(false);
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);

  // Ornaments Categorized
  const LEFT_ORNAMENTS = [
    { cat: 'free-fire', label: 'Alas Insanas', val: '꧁༺ ' },
    { cat: 'free-fire', label: 'Alas Góticas', val: '꧁༒☬ ' },
    { cat: 'free-fire', label: 'Corona 亗', val: '亗『 ' },
    { cat: 'free-fire', label: 'Verificado V', val: '🅥 ' },
    { cat: 'free-fire', label: 'Rayo FF', val: '⚡┊ ' },
    { cat: 'free-fire', label: 'Cruz Dark', val: '✞ 𓊈 ' },
    { cat: 'free-fire', label: 'Ninja PvP', val: '乂 ⚔️ ' },
    { cat: 'free-fire', label: 'Diablo Tóxico', val: '╰‿╯ ' },
    { cat: 'free-fire', label: 'Boss Clan', val: 'ᴮᴼˢˢ★ ' },
    { cat: 'free-fire', label: 'Clan Xiang', val: '乡 ' },
    { cat: 'free-fire', label: 'Dead Smile', val: '×͜× ' },
    { cat: 'aesthetic', label: 'Coquette Moño', val: '🎀 ִֶָ ' },
    { cat: 'aesthetic', label: 'Destello Estelar', val: '✦✧ ' },
    { cat: 'aesthetic', label: 'Estrellas Mágicas', val: '★彡 ' },
    { cat: 'aesthetic', label: 'Nube & Brillo', val: '☁️ ˚ ༘♡ ·˚ ' },
    { cat: 'aesthetic', label: 'Luna Noche', val: '‧͙⁺˚*･༓☾ ' },
    { cat: 'aesthetic', label: 'Sakura Flor', val: '🌸 ✧ ' },
    { cat: 'aesthetic', label: 'Marcos Japoneses', val: '『 ' },
    { cat: 'aesthetic', label: 'Ondas Retro', val: '˜”*°•. ' },
    { cat: 'love', label: 'Abrazo Love', val: '(っ◔◡◔)っ ♥ ' },
    { cat: 'love', label: 'Corazón Dulce', val: 'ʚ♡⃛ɞ ' },
    { cat: 'love', label: 'Osito Cariñoso', val: 'ʕ•́ᴥ•̀ʔっ♡ ' },
    { cat: 'love', label: 'Alas con Corazón', val: '𓆩♡𓆪 ' },
    { cat: 'love', label: 'Flecha Amor', val: '🏹 💖 ' },
    { cat: 'symbols', label: 'Corchete Grueso', val: '【 ' },
    { cat: 'symbols', label: 'Doble Corchete', val: '〖 ' },
    { cat: 'symbols', label: 'Escudos', val: '⫷ ' },
    { cat: 'symbols', label: 'Líneas Punteadas', val: '┊ ' },
    { cat: 'symbols', label: 'Flecha Bio', val: '╰┈➤ ' },
  ];

  const RIGHT_ORNAMENTS = [
    { cat: 'free-fire', label: 'Alas Der', val: ' ༻꧂' },
    { cat: 'free-fire', label: 'Alas Góticas Der', val: ' ☬༒꧂' },
    { cat: 'free-fire', label: 'Corona Der', val: ' 』亗' },
    { cat: 'free-fire', label: 'Corona Solitaria', val: ' 亗' },
    { cat: 'free-fire', label: 'Rayo Der', val: ' ┊⚡' },
    { cat: 'free-fire', label: 'Cruz Der', val: ' 𓊉 ✞' },
    { cat: 'free-fire', label: 'Espada Ninja Der', val: ' ⚔️ 乂' },
    { cat: 'free-fire', label: 'Diablo Der', val: ' ╰‿╯' },
    { cat: 'free-fire', label: 'Estrella Boss', val: ' ★' },
    { cat: 'free-fire', label: 'Xiang Der', val: ' 乡' },
    { cat: 'free-fire', label: 'Dead Smile Der', val: ' ×͜×' },
    { cat: 'aesthetic', label: 'Moño Der', val: ' ִֶָ 🎀' },
    { cat: 'aesthetic', label: 'Destello Der', val: ' ✧✦' },
    { cat: 'aesthetic', label: 'Estrellas Der', val: ' 彡★' },
    { cat: 'aesthetic', label: 'Nube Der', val: ' ₊˚ˑ༄ؘ' },
    { cat: 'aesthetic', label: 'Luna Der', val: ' ☽༓･*˚⁺‧͙' },
    { cat: 'aesthetic', label: 'Sakura Der', val: ' ✧ 🌸' },
    { cat: 'aesthetic', label: 'Marco Japonés Der', val: ' 』' },
    { cat: 'aesthetic', label: 'Ondas Der', val: ' .•°*”˜' },
    { cat: 'love', label: 'Corazón Der', val: ' ♥' },
    { cat: 'love', label: 'Corazón Dulce Der', val: ' ʚ♡⃛ɞ' },
    { cat: 'love', label: 'Love Der', val: ' ♡' },
    { cat: 'love', label: 'Alas Corazón Der', val: ' 𓆪♡𓆩' },
    { cat: 'love', label: 'Amor Der', val: ' 💖 🏹' },
    { cat: 'symbols', label: 'Corchete Grueso Der', val: ' 】' },
    { cat: 'symbols', label: 'Doble Corchete Der', val: ' 〗' },
    { cat: 'symbols', label: 'Escudo Der', val: ' ⫸' },
    { cat: 'symbols', label: 'Línea Der', val: ' ┊' },
    { cat: 'symbols', label: 'Puntero Der', val: ' ↵' },
  ];

  const currentFontGen =
    FONT_GENERATORS.find((f) => f.id === selectedFontId) || FONT_GENERATORS[0];

  const innerConvertedText = useMemo(() => {
    return currentFontGen.transform(inputText || 'Mi Nick');
  }, [currentFontGen, inputText]);

  const finalDecoratedText = `${selectedLeft}${innerConvertedText}${selectedRight}`;

  // Quick insertion of symbols into input
  const insertSymbolToInput = (char: string) => {
    setInputText((prev) => prev + char);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalDecoratedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onApplyGlobalText) onApplyGlobalText(finalDecoratedText);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleCopyInvisibleSpace = async () => {
    try {
      await navigator.clipboard.writeText(INVISIBLE_SPACE);
      setCopiedSpace(true);
      setTimeout(() => setCopiedSpace(false), 1800);
    } catch (e) {
      console.error('Failed to copy space', e);
    }
  };

  const handleRandomize = () => {
    const randomDec = NICK_DECORATIONS[Math.floor(Math.random() * NICK_DECORATIONS.length)];
    setSelectedLeft(randomDec.left);
    setSelectedRight(randomDec.right);
    const candidateFonts = [
      'cursiva-bold',
      'gotica-fraktur',
      'gotica-bold',
      'small-caps',
      'doble-trazo',
      'bold-sans',
      'burbujas-negras',
      'cuadrados-negros',
    ];
    setSelectedFontId(candidateFonts[Math.floor(Math.random() * candidateFonts.length)]);
  };

  const applyPreset = (left: string, right: string, fontId?: string) => {
    setSelectedLeft(left);
    setSelectedRight(right);
    if (fontId) setSelectedFontId(fontId);
  };

  const handleCopyPreset = async (fullText: string, presetId: string) => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedPresetId(presetId);
      setTimeout(() => setCopiedPresetId(null), 1800);
      if (onApplyGlobalText) onApplyGlobalText(fullText);
    } catch (e) {
      console.error('Failed to copy preset', e);
    }
  };

  // Filtered decorations
  const filteredPresets = useMemo(() => {
    if (selectedCategory === 'all') return NICK_DECORATIONS;
    return NICK_DECORATIONS.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div id="decorador-section" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-12">
      {/* Studio Header Banner */}
      <div className="p-6 sm:p-7 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white border-b border-purple-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0 border border-purple-400/30 shadow-inner">
              <Wand2 className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-500/30 text-[10px] font-black uppercase tracking-wider text-purple-200 border border-purple-400/30">
                  CONVERSOR DE LETRAS BONITAS · NICKS
                </span>
                <span className="text-xs text-purple-200 font-bold hidden sm:inline">
                  Free Fire · TikTok · Discord · Instagram
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5 text-white">
                Decorador de Textos en el Conversor de Letras Bonitas
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Invisible Space */}
            <button
              type="button"
              onClick={handleCopyInvisibleSpace}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm ${
                copiedSpace
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/50 active:scale-95'
              }`}
              title="Copiar Hangul Filler U+3164 para espacio invisible en Free Fire"
            >
              <Space className="w-4 h-4" />
              <span>{copiedSpace ? '¡Espacio Copiado!' : 'Espacio Invisible [ㅤ]'}</span>
            </button>

            {/* Randomizer */}
            <button
              id="btn-random-decorator"
              type="button"
              onClick={handleRandomize}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-purple-500 hover:bg-purple-400 text-slate-950 transition-all active:scale-95 shadow-sm"
              title="Generar combinación aleatoria"
            >
              <Shuffle className="w-4 h-4" />
              <span>Aleatorio</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Main Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Column: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Input Text */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  1. Escribe tu Nombre o Gamertag
                </label>
                {inputText && (
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center gap-1 font-bold transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Borrar</span>
                  </button>
                )}
              </div>
              <input
                id="decorator-input-text"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu apodo aquí..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 font-bold focus:outline-hidden focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white transition-all text-base"
              />

              {/* Quick symbol inserter */}
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                  Insertar rápido:
                </span>
                {['亗', '🅥', '⚡', '✞', '⚔️', '╰‿╯', '🌸', '★', '🎀', 'ᥫ᭡', '文', '™'].map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => insertSymbolToInput(sym)}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg text-xs font-bold text-slate-700 transition-colors shrink-0"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interior Font Selection */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                2. Elige el estilo de letra interior
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'cursiva-bold', name: '𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭' },
                  { id: 'gotica-bold', name: '𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉' },
                  { id: 'gotica-fraktur', name: '𝔊ó𝔱𝔦𝔠𝔞 𝔒𝔩𝔡' },
                  { id: 'small-caps', name: 'sᴍᴀʟʟ ᴄᴀᴘs' },
                  { id: 'doble-trazo', name: '𝔻𝕠𝕓𝕝𝕖 𝕋𝕣𝕒𝕫𝕠' },
                  { id: 'bold-sans', name: '𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀' },
                  { id: 'burbujas-negras', name: '🅝🅔🅖🅡🅐🅢' },
                  { id: 'cuadrados-negros', name: '🄽🄴🄶🅁🄾🅂' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    id={`decorator-font-${f.id}`}
                    onClick={() => setSelectedFontId(f.id)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      selectedFontId === f.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs shadow-purple-600/20'
                        : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Left & Right Ornaments Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Left Ornament */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    3. Adorno Izquierdo
                  </label>
                  {selectedLeft && (
                    <button
                      type="button"
                      onClick={() => setSelectedLeft('')}
                      className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Sin adorno
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 custom-scrollbar">
                  {LEFT_ORNAMENTS.map((orn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedLeft(orn.val)}
                      title={orn.label}
                      className={`px-2 py-1 text-xs rounded-lg border font-mono transition-colors ${
                        selectedLeft === orn.val
                          ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {orn.val.trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Ornament */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    4. Adorno Derecho
                  </label>
                  {selectedRight && (
                    <button
                      type="button"
                      onClick={() => setSelectedRight('')}
                      className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Sin adorno
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 custom-scrollbar">
                  {RIGHT_ORNAMENTS.map((orn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedRight(orn.val)}
                      title={orn.label}
                      className={`px-2 py-1 text-xs rounded-lg border font-mono transition-colors ${
                        selectedRight === orn.val
                          ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {orn.val.trim()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Master Preview Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white border border-purple-800/40 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Resultado Final en Vivo
                </span>
                <span className="text-[11px] text-purple-200 font-mono font-bold bg-purple-900/60 px-2 py-0.5 rounded-md border border-purple-700/50">
                  {finalDecoratedText.length} caracteres
                </span>
              </div>

              {/* Display Box */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-inner min-h-[140px] flex items-center justify-center text-center">
                <p className="text-xl sm:text-2xl font-bold text-white break-all tracking-wide select-all leading-relaxed font-mono">
                  {finalDecoratedText}
                </p>
              </div>

              {/* Free Fire character limit counter alert */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-purple-300">
                <span>Límite Free Fire (12 caracteres):</span>
                <span
                  className={`font-bold font-mono px-2 py-0.5 rounded-md ${
                    finalDecoratedText.length <= 12
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-700/50'
                  }`}
                >
                  {finalDecoratedText.length <= 12
                    ? '✓ Compatible Free Fire'
                    : `⚠️ ${finalDecoratedText.length}/12 (Puede requerir acortar)`}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-800/50 relative z-10 space-y-2.5">
              <button
                type="button"
                id="btn-copy-decorated-result"
                onClick={handleCopy}
                className={`w-full py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                  copied
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                    : 'bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-purple-500/25'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3] animate-pulse" />
                    <span>¡Nick Copiado al Portapapeles! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copiar Nick Decorado</span>
                  </>
                )}
              </button>

              {onApplyGlobalText && (
                <button
                  type="button"
                  onClick={() => onApplyGlobalText(finalDecoratedText)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Probar en el Simulador de WhatsApp / IG</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Presets Gallery with Category Tabs */}
        <div className="mt-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                Catálogo de Plantillas de Nicks Listas para Usar
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Haz clic en cualquier diseño para aplicarlo o copiarlo de inmediato con tu texto.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'free-fire', label: 'Free Fire / PvP' },
                { id: 'clan', label: 'Clanes & Guerreros' },
                { id: 'aesthetic', label: 'Aesthetic & Coquette' },
                { id: 'hearts', label: 'Amor & Parejas' },
                { id: 'stars', label: 'Estrellas & Magia' },
                { id: 'faces', label: 'Kaomoji & Caritas' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-purple-600 text-white shadow-xs shadow-purple-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Preset Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredPresets.map((dec) => {
              const preview = `${dec.left}${currentFontGen.transform(inputText || 'Nick')}${dec.right}`;
              const isCopied = copiedPresetId === dec.id;
              return (
                <div
                  key={dec.id}
                  onClick={() => applyPreset(dec.left, dec.right)}
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-slate-50/80 hover:bg-purple-50/70 border border-slate-200 hover:border-purple-300 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-purple-600 uppercase tracking-wider truncate">
                      {dec.name}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {dec.category}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-950 truncate my-2 font-mono">
                    {preview}
                  </p>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/60">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyPreset(dec.left, dec.right);
                      }}
                      className="flex-1 py-1.5 text-xs font-bold text-purple-700 bg-white border border-purple-200 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all text-center"
                    >
                      Personalizar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPreset(preview, dec.id);
                      }}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 shadow-2xs ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-purple-100 hover:bg-purple-200 text-purple-900'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
