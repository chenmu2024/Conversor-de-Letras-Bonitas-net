import React, { useState, useMemo } from 'react';
import {
  Skull,
  Zap,
  Terminal,
  RefreshCw,
  Copy,
  Check,
  Sparkles,
  Sliders,
  ShieldCheck,
  Binary,
  Flame,
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  Minimize2
} from 'lucide-react';

interface GlitchStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

// Zalgo Combining Character sets
const ZALGO_UP = ['̍','̎','̄','̅','̿','̑','̆','̐','͒','͗','͑','̇','̈','̊','͂','̓','̈́','͊','͋','͌','̃','̂','̌','͐','̀','́','̋'];
const ZALGO_MID = ['̕','̛','̀','́','͘','̡','̢','̧','̨','̴','̵','̶','͜','͝','͞','͟'];
const ZALGO_DOWN = ['̖','̗','̘','̙','̜','̝','̞','̟','̠','̤','̥','̦','̩','̪','̫','̬','̭','̮','̯','̰','̱','̲','̳'];

// Advanced Custom Zalgo Generator
function generateCustomZalgo(
  text: string,
  options: {
    intensity: number; // 1 to 4
    up: boolean;
    mid: boolean;
    down: boolean;
    seed: number;
  }
): string {
  if (!text) return '';
  const { intensity, up, mid, down } = options;
  const countPerChar = intensity === 1 ? 2 : intensity === 2 ? 4 : intensity === 3 ? 8 : 14;

  const validSets: string[][] = [];
  if (up) validSets.push(ZALGO_UP);
  if (mid) validSets.push(ZALGO_MID);
  if (down) validSets.push(ZALGO_DOWN);

  if (validSets.length === 0) return text;

  return Array.from(text)
    .map((char) => {
      if (char === ' ' || char === '\n') return char;
      let res = char;
      for (let i = 0; i < countPerChar; i++) {
        const chosenSet = validSets[Math.floor(Math.random() * validSets.length)];
        res += chosenSet[Math.floor(Math.random() * chosenSet.length)];
      }
      return res;
    })
    .join('');
}

// Hacker 1337 speak converter
function toLeetSpeak(text: string): string {
  const leetMap: Record<string, string> = {
    a: '4', A: '4',
    e: '3', E: '3',
    i: '1', I: '1',
    o: '0', O: '0',
    s: '5', S: '5',
    t: '7', T: '7',
    b: '8', B: '8',
    g: '9', G: '9',
  };
  return Array.from(text)
    .map((c) => leetMap[c] || c)
    .join('');
}

// Convert string to Binary
function toBinary(text: string): string {
  return Array.from(text)
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

// Convert string to Hexadecimal
function toHex(text: string): string {
  return Array.from(text)
    .map((c) => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
    .join(' ');
}

// Strip Zalgo / Combining Characters
function cleanZalgo(text: string): string {
  // Removes all Unicode combining diacritical marks
  return text.normalize('NFD').replace(/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/g, '');
}

const GLITCH_PRESETS = [
  { name: '☠️ V̸O̸I̸D̸ ̸K̸I̸N̸G̸', text: 'V̸O̸I̸D̸ ̸K̸I̸N̸G̸', desc: 'Nick Gamer Maldito' },
  { name: '⚠️ [ S Y S T E M _ E R R O R ]', text: '░E░R░R░O░R░4░0░4░', desc: 'Glitch Hacker Bloques' },
  { name: '👁️ H̸E̸ ̸C̸O̸M̸E̸S̸ ̸6̸6̸6̸', text: '⛧ H̸E̸ ̸C̸O̸M̸E̸S̸ ⛧', desc: 'Creepypasta Cursed' },
  { name: '⚡ C̷Y̷B̷E̷R̷P̷U̷N̷K̷', text: '【 C̷Y̷B̷E̷R̷P̷U̷N̷K̷ 】', desc: 'Cyber Matrix Estilizado' },
  { name: '🔥 G̸L̸I̸T̸C̸H̸_G̸O̸D̸', text: '꧁༺ G̸L̸I̸T̸C̸H̸ ༻꧂', desc: 'Clan Free Fire Glitch' },
  { name: '💻 404_N̷O̷T̷_F̷O̷U̷N̷D̷', text: '▓▒░ 404_N̷O̷T̷_F̷O̷U̷N̷D̷ ░▒▓', desc: 'Matrix Shaded Bar' },
];

export const GlitchStudio: React.FC<GlitchStudioProps> = ({
  onApplyText,
  initialText = 'Cyber Matrix',
}) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'styles' | 'presets' | 'cleaner'>('custom');
  const [inputText, setInputText] = useState(initialText);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom Zalgo State
  const [intensity, setIntensity] = useState<number>(2);
  const [dirUp, setDirUp] = useState<boolean>(true);
  const [dirMid, setDirMid] = useState<boolean>(true);
  const [dirDown, setDirDown] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(0);

  // Cleaner State
  const [dirtyText, setDirtyText] = useState('H̸̭̥̮̖̗́̌͌̀́̀́͊̀̚͜͝ͅȩ̸̯̂́͆̐̅̉̀̀͌͗̂l̵̩͉͈͓̦͈̈́̄̒͐̾̏͗̏͆̓͝l̴̤̭͓̈́̈́͆̈́́̎̑̇̆͠o̷̬͈̰͛́̂̿̎̉̐͑͑͝͝');

  const customZalgoOutput = useMemo(() => {
    return generateCustomZalgo(inputText || 'Glitch', {
      intensity,
      up: dirUp,
      mid: dirMid,
      down: dirDown,
      seed,
    });
  }, [inputText, intensity, dirUp, dirMid, dirDown, seed]);

  const cleanedText = useMemo(() => {
    return cleanZalgo(dirtyText);
  }, [dirtyText]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
    if (onApplyText) onApplyText(text);
  };

  return (
    <div className="bg-slate-950 rounded-3xl border border-red-950/60 shadow-xl overflow-hidden mb-8 text-slate-100">
      {/* Studio Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-red-950 via-slate-950 to-neutral-950 border-b border-red-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-400 shrink-0 border border-red-500/40 shadow-inner">
              <Skull className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-[10px] font-black uppercase tracking-wider text-red-300 border border-red-500/30">
                  ZALGO · GLITCH · CURSED
                </span>
                <span className="text-xs text-red-300 font-bold">Hacker 1337 · Matrix · Void · Sanitizador</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5 text-white">
                Generador de Texto Glitch, Zalgo & Letras Malditas
              </h2>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-red-900/40">
          {[
            { id: 'custom', label: 'Laboratorio de Zalgo Caos', icon: <Sliders className="w-3.5 h-3.5 text-red-400" /> },
            { id: 'styles', label: 'Estilos Cyberpunk & Hacker', icon: <Terminal className="w-3.5 h-3.5 text-emerald-400" /> },
            { id: 'presets', label: 'Frases & Nicks Malditos ☠️', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
            { id: 'cleaner', label: 'Limpiador de Zalgo (Decodificador)', icon: <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/50 scale-105 font-black'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="p-5 sm:p-7">
        {/* TAB 1: CUSTOM ZALGO LAB */}
        {activeTab === 'custom' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <label className="text-xs font-extrabold text-red-400 uppercase tracking-wider block mb-2">
                Escribe tu Texto a Corromper:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe tu texto maldito aquí (Ej: Cyber Matrix, Error, Void)..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white font-bold text-base focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:outline-hidden transition-all placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setSeed((prev) => prev + 1)}
                  className="px-4 py-3 bg-slate-900 hover:bg-red-950 text-red-400 border border-red-900/50 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0"
                  title="Regenerar patrón de caos aleatorio"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Regenerar Caos</span>
                </button>
              </div>
            </div>

            {/* Customization Controls Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-900/80 rounded-2xl border border-slate-800">
              {/* Intensity Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Intensidad de la Corrupción:</span>
                  <span className="text-xs font-black text-red-400">
                    {intensity === 1 ? '1 - Sutil' : intensity === 2 ? '2 - Moderado' : intensity === 3 ? '3 - Maldito' : '4 - Void Extremo'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={1}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Cyber</span>
                  <span>Distorsión</span>
                  <span>Maldito</span>
                  <span>Caos Total</span>
                </div>
              </div>

              {/* Directional Toggles */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Dirección de los Tentáculos Zalgo:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDirUp((prev) => !prev)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                      dirUp
                        ? 'bg-red-600/30 border-red-500 text-red-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Arriba</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirMid((prev) => !prev)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                      dirMid
                        ? 'bg-red-600/30 border-red-500 text-red-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Centro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirDown((prev) => !prev)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                      dirDown
                        ? 'bg-red-600/30 border-red-500 text-red-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>Abajo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Result Preview Box */}
            <div className="p-6 bg-black rounded-2xl border border-red-900/60 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  Resultado Zalgo Cursed:
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(customZalgoOutput, 'custom-zalgo')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    copiedId === 'custom-zalgo'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950'
                  }`}
                >
                  {copiedId === 'custom-zalgo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'custom-zalgo' ? '¡Copiado!' : 'Copiar Texto Maldito'}</span>
                </button>
              </div>

              <div className="p-5 bg-slate-950/90 rounded-xl border border-slate-800/80 min-h-[110px] flex items-center justify-center text-center">
                <p className="text-2xl sm:text-3xl font-mono text-red-300 break-words leading-loose select-all tracking-wide">
                  {customZalgoOutput || 'Escribe tu texto arriba para corromper...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CYBERPUNK & HACKER MATRIX STYLES */}
        {activeTab === 'styles' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                Texto a Transformar en Estilo Hacker & Cyber:
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu texto..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white font-bold text-base focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 'leet-hacker',
                  name: 'Hacker 1337 Leet Speak',
                  fn: (t: string) => toLeetSpeak(t.toUpperCase()),
                  desc: 'Reemplaza vocales por números estilo cracker (A->4, E->3, I->1, O->0)',
                },
                {
                  id: 'matrix-shaded',
                  name: 'Matrix Shaded Blocks ░▒▓',
                  fn: (t: string) => `▓▒░ ${t.toUpperCase()} ░▒▓`,
                  desc: 'Bloques de sombreado ASCII para nicks gamer',
                },
                {
                  id: 'system-error',
                  name: 'System Error Alert [404]',
                  fn: (t: string) => `[ SYSTEM_ALERT: ${t.toUpperCase()} ]`,
                  desc: 'Formato de consola de advertencia crítica',
                },
                {
                  id: 'slash-glitch',
                  name: 'Slash Diagonal Glitch (̷)',
                  fn: (t: string) => Array.from(t).map((c) => (c === ' ' ? ' ' : c + '\u0337')).join(''),
                  desc: 'Tachado diagonal rápido tipo distorsión digital',
                },
                {
                  id: 'arrows-glitch',
                  name: 'Flechas Indicadoras Glitch (͎)',
                  fn: (t: string) => Array.from(t).map((c) => (c === ' ' ? ' ' : c + '\u034E')).join(''),
                  desc: 'Flechas subyacentes de señal corrupta',
                },
                {
                  id: 'cross-glitch',
                  name: 'Cruces Superiores Glitch (̽)',
                  fn: (t: string) => Array.from(t).map((c) => (c === ' ' ? ' ' : c + '\u033D')).join(''),
                  desc: 'Efecto de pequeñas x flotantes sobre las letras',
                },
                {
                  id: 'binary-code',
                  name: 'Código Binario (01000011...)',
                  fn: (t: string) => toBinary(t),
                  desc: 'Traducción exacta en bytes binarios de 8 bits',
                },
                {
                  id: 'hex-code',
                  name: 'Código Hexadecimal (HEX)',
                  fn: (t: string) => toHex(t),
                  desc: 'Traducción a valores hexadecimales de memoria',
                },
              ].map((item) => {
                const result = item.fn(inputText || 'Cyber');
                const isCopied = copiedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-900 hover:bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between gap-3 shadow-md group"
                  >
                    <div>
                      <span className="text-[11px] font-black text-emerald-400 block uppercase tracking-wider">
                        {item.name}
                      </span>
                      <p className="text-lg sm:text-xl font-mono text-white mt-2 break-words select-all leading-relaxed">
                        {result}
                      </p>
                      <span className="text-[10px] text-slate-500 mt-1 block">{item.desc}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-mono">Cyber Tech</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(result, item.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PRESETS & CURSED PHRASES */}
        {activeTab === 'presets' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-extrabold text-base text-white">
                Plantillas & Nicks Malditos Listos para Usar
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                Toca cualquier diseño para copiarlo de inmediato a tu portapapeles:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GLITCH_PRESETS.map((preset) => {
                const isCopied = copiedId === `preset-${preset.name}`;
                return (
                  <div
                    key={preset.name}
                    className="p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-red-500/60 transition-all flex flex-col justify-between gap-3 shadow-md"
                  >
                    <div>
                      <span className="text-xs font-bold text-red-400 block">{preset.desc}</span>
                      <p className="text-lg font-mono text-white mt-1 select-all">{preset.text}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(preset.text, `preset-${preset.name}`)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-red-600 text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? '¡Copiado!' : 'Copiar Plantilla'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ZALGO CLEANER / SANITIZER */}
        {activeTab === 'cleaner' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                Sanitizador & Limpiador de Texto Maldito (Zalgo Remover)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                ¿Te enviaron un mensaje ilegible con tentáculos y glitch? Pégalo aquí para eliminar todas las marcas de corrupción y leer el texto original limpio:
              </p>
            </div>

            <div>
              <label className="text-xs font-extrabold text-sky-400 uppercase tracking-wider block mb-1.5">
                Pega el Texto Zalgo a Limpiar:
              </label>
              <textarea
                rows={3}
                value={dirtyText}
                onChange={(e) => setDirtyText(e.target.value)}
                placeholder="Pega aquí el texto maldito o corrupto..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white font-mono text-sm focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-sky-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider">
                  Texto Desinfectado y Limpio:
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(cleanedText, 'clean-copy')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    copiedId === 'clean-copy'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                  }`}
                >
                  {copiedId === 'clean-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'clean-copy' ? '¡Copiado!' : 'Copiar Texto Limpio'}</span>
                </button>
              </div>

              <div className="p-4 bg-black rounded-xl border border-slate-800 text-base font-bold text-white select-all">
                {cleanedText || 'Pega un texto arriba para sanitizarlo...'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
