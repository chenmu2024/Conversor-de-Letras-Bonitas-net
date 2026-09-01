import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  Copy, 
  Check, 
  Skull, 
  Sword, 
  Cross, 
  Type, 
  Crown,
  Flame,
  Zap,
  Sliders
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface GothicStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

const GOTHIC_TATTOO_IDEAS = [
  { word: 'Memento Mori', label: 'Filosofía / Recuerda que morirás' },
  { word: 'Valhalla', label: 'Nórdico / Honor' },
  { word: 'Inmortal', label: 'Fuerza & Resistencia' },
  { word: 'Venganza', label: 'Clan / Gamer' },
  { word: 'Leyenda', label: 'Reputación' },
  { word: 'Oscuridad', label: 'Dark Aesthetic' },
  { word: 'Guerrero', label: 'Espíritu de Lucha' },
  { word: 'Familia Primero', label: 'Tatuaje Chicano' },
  { word: 'Sin Perdón', label: 'Gamer / Clan' },
  { word: 'Pecador', label: 'Rebeldía' },
];

const GOTHIC_SYMBOLS_LIST = [
  { label: 'Cruces Góticas', items: ['✞', '†', '♱', '♰', '✠', '✟', '‡', '✙'] },
  { label: 'Espadas & Combate', items: ['⚔️', '🗡️', '🛡️', '🏹', '𓊝', '⚔', '🩸'] },
  { label: 'Dark & Calaveras', items: ['☠️', '💀', '⛓️', '🕯️', '🦇', '🕷️', '🕸️', '🖤'] },
  { label: 'Coronas & Realeza Dark', items: ['👑', '♛', '♚', '☬', '꧁', '꧂', '༺', '༻'] },
];

const GOTHIC_STYLES_LIST = [
  { id: 'gotica-bold', label: '𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉 (Fraktur Gruesa / Chicano Heavy)', deco: '' },
  { id: 'gotica-fraktur', label: '𝔊ó𝔱𝔦𝔠𝔞 ℭ𝓁á𝔰𝔦𝒸𝒶 (Old English Medieval)', deco: '' },
  { id: 'gotica-cruz', label: '✞ 𝕲ó𝖙𝖎𝖈𝖆 𝕮𝖗𝖚𝖟 ✞ (Cruces Medievales)', deco: 'cross' },
  { id: 'gotica-espadas', label: '⚔️ 𝔊ó𝔱𝔦𝔠𝔞 ⚔️ (Guerrero & Clanes)', deco: 'sword' },
  { id: 'gotica-demon', label: '༺† 𝕲ó𝖙𝖎𝖈𝖆 †༻ (Dark & Demoníaco)', deco: 'demon' },
  { id: 'gotica-calaveras', label: '☠️ 𝕲ó𝖙𝖎𝖈𝖆 ☠️ (Calaveras & Heavy Metal)', deco: 'skull' },
  { id: 'gotica-cadenas', label: '⛓️ 𝔊ó𝔱𝔦𝔠𝔞 ⛓️ (Cadenas & Dark Trap)', deco: 'chains' },
  { id: 'gotica-alas-dark', label: '꧁༺ 𝕲ó𝖙𝖎𝖈𝖆 ༻꧂ (Alas & Ornamentos)', deco: 'wings' },
];

export const GothicStudio: React.FC<GothicStudioProps> = ({
  onApplyText,
  initialText = 'Memento Mori',
}) => {
  const [activeTab, setActiveTab] = useState<'styles' | 'tattoo-sim' | 'symbols' | 'alphabet'>('styles');
  const [inputText, setInputText] = useState(initialText);
  const [tattooWord, setTattooWord] = useState('Valhalla');
  const [tattooGothicType, setTattooGothicType] = useState<'bold' | 'classic' | 'wings'>('bold');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const frakturBoldGen = FONT_GENERATORS.find((g) => g.id === 'gotica-bold')!;
  const frakturClassicGen = FONT_GENERATORS.find((g) => g.id === 'gotica-fraktur')!;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
    if (onApplyText) onApplyText(text);
  };

  const getTattooRender = (word: string, type: 'bold' | 'classic' | 'wings') => {
    if (type === 'bold') return frakturBoldGen.transform(word);
    if (type === 'classic') return frakturClassicGen.transform(word);
    return `꧁༺ ${frakturBoldGen.transform(word)} ༻꧂`;
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Gothic Studio Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-zinc-900 to-neutral-950 text-white border-b border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800/90 flex items-center justify-center text-white shrink-0 border border-zinc-700 shadow-inner">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[10px] font-black uppercase tracking-wider text-amber-300 border border-amber-400/30">
                  Old English · Fraktur
                </span>
                <span className="text-xs text-zinc-400 font-bold">Medieval · Tatuajes Chicano · Nicks Dark</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5 text-zinc-100">
                Generador de Letras Góticas & Tipografía Medieval
              </h2>
            </div>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-zinc-800/80">
          {[
            { id: 'styles', label: 'Estilos Góticos & Old English', icon: <Skull className="w-3.5 h-3.5 text-zinc-300" /> },
            { id: 'tattoo-sim', label: 'Simulador de Tatuajes Chicano/Dark', icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" /> },
            { id: 'symbols', label: 'Cruces, Espadas & Símbolos Dark', icon: <Sword className="w-3.5 h-3.5 text-red-400" /> },
            { id: 'alphabet', label: 'Abecedario Gótico A-Z', icon: <Type className="w-3.5 h-3.5 text-indigo-300" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-zinc-950 shadow-md scale-105 font-black'
                  : 'bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700 hover:text-white'
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
        {/* TAB 1: GOTHIC STYLES & CONVERSION */}
        {activeTab === 'styles' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Escribe tu Nombre, Frase o Gamertag Gótico:
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe aquí tu texto (Ej: Memento Mori, Valhalla)..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Gothic Styles Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GOTHIC_STYLES_LIST.map((st) => {
                const gen = FONT_GENERATORS.find((g) => g.id === st.id) || frakturBoldGen;
                const converted = gen.transform(inputText || 'Memento Mori');
                const isCopied = copiedId === st.id;

                return (
                  <div
                    key={st.id}
                    className="p-4 bg-zinc-900 text-white rounded-2xl border border-zinc-800 hover:border-amber-500/50 flex flex-col justify-between gap-3 transition-colors shadow-2xs group"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold text-amber-400 group-hover:text-amber-300 block uppercase tracking-wider">
                        {st.label}
                      </span>
                      <p className="text-xl sm:text-2xl font-normal text-zinc-100 mt-2 break-words leading-relaxed select-all">
                        {converted}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                      <span className="text-[11px] text-zinc-400 font-medium font-mono">Unicode Fraktur</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(converted, st.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 active:scale-95'
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
                            <span>Copiar Gótica</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Clan & Gamertag Borders */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                Marcos & Diseños de Clanes Góticos para Free Fire / Juegos
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  `✞ 𝕹𝖆𝖒𝖊 ✞`.replace('𝕹𝖆𝖒𝖊', frakturBoldGen.transform(inputText || 'Clan')),
                  `⚔️ 𝔑𝔞𝔪𝔢 ⚔️`.replace('𝔑𝔞𝔪𝔢', frakturClassicGen.transform(inputText || 'Clan')),
                  `☠️ 𝕹𝖆𝖒𝖊 ☠️`.replace('𝕹𝖆𝖒𝖊', frakturBoldGen.transform(inputText || 'Clan')),
                  `꧁༺ 𝕹𝖆𝖒𝖊 ༻꧂`.replace('𝕹𝖆𝖒𝖊', frakturBoldGen.transform(inputText || 'Clan')),
                  `⛓️ 𝕹𝖆𝖒𝖊 ⛓️`.replace('𝕹𝖆𝖒𝖊', frakturBoldGen.transform(inputText || 'Clan')),
                  `†☬ 𝕹𝖆𝖒𝖊 ☬†`.replace('𝕹𝖆𝖒𝖊', frakturBoldGen.transform(inputText || 'Clan')),
                ].map((dec, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCopy(dec, `goth-dec-${idx}`)}
                    className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-amber-400 rounded-xl text-center text-sm font-medium transition-all truncate"
                  >
                    {dec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TATTOO SIMULATOR & IDEAS (CHICANO & DARK TATTOOS) */}
        {activeTab === 'tattoo-sim' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-2xl p-4 flex items-start gap-3">
              <Skull className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="text-amber-400">Tatuajes Estilo Chicano & Old English:</strong> La tipografía gótica (Fraktur / Blackletter) es el estilo más emblemático del tatuaje urbano, chicano y medieval. Diseña y visualiza tu frase antes de grabarla en tinta.
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                Palabra o Frase para Tatuaje Gótico:
              </label>
              <input
                type="text"
                value={tattooWord}
                onChange={(e) => setTattooWord(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-base focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            {/* Popular Gothic Tattoo Words */}
            <div>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                Frases & Palabras Clásicas para Tatuajes Góticos (Toca para cargar):
              </span>
              <div className="flex flex-wrap gap-2">
                {GOTHIC_TATTOO_IDEAS.map((idea) => (
                  <button
                    key={idea.word}
                    type="button"
                    onClick={() => setTattooWord(idea.word)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      tattooWord === idea.word
                        ? 'bg-zinc-950 text-amber-400 border-zinc-950 shadow-xs'
                        : 'bg-slate-50 hover:bg-zinc-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{idea.word}</span>
                    <span className="text-[9px] opacity-70 ml-1">({idea.label})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Estilo de Letra:</span>
              {(['bold', 'classic', 'wings'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setTattooGothicType(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-colors ${
                    tattooGothicType === st ? 'bg-zinc-900 text-amber-400' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {st === 'bold' ? 'Fraktur Heavy (𝕲ó𝖙𝖎𝖈𝖆)' : st === 'classic' ? 'Old English (𝔊ó𝔱𝔦𝔠𝔞)' : 'Alas / Dark (꧁༺ 𝕲ó𝖙𝖎𝖈𝖆 ༻꧂)'}
                </button>
              ))}
            </div>

            {/* Dark Gothic Tattoo Parchment Simulation */}
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border-2 border-zinc-800 shadow-2xl text-center space-y-4 relative overflow-hidden text-zinc-100">
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-zinc-800 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-zinc-700">
                Plantilla Vectorial Dark
              </div>
              <div className="text-3xl sm:text-5xl font-normal text-amber-400 tracking-wide select-all py-6">
                {getTattooRender(tattooWord || 'Valhalla', tattooGothicType)}
              </div>
              <p className="text-xs text-zinc-400 font-medium">
                Diseño tipográfico con caracteres medievales Unicode de alta resolución.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(getTattooRender(tattooWord, tattooGothicType), 'tattoo-goth-copy')}
              className="w-full py-3.5 rounded-2xl bg-zinc-950 hover:bg-black text-amber-400 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg border border-amber-400/30 active:scale-98"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar Tatuaje Gótico: {getTattooRender(tattooWord, tattooGothicType)}</span>
            </button>
          </div>
        )}

        {/* TAB 3: GOTHIC & MEDIEVAL SYMBOLS */}
        {activeTab === 'symbols' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Símbolos Góticos, Cruces Medievales & Adornos Dark
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Toca cualquier símbolo o cruz para copiarlo al instante a tu portapapeles:
              </p>
            </div>

            <div className="space-y-4">
              {GOTHIC_SYMBOLS_LIST.map((group) => (
                <div key={group.label} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    {group.label}
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {group.items.map((sym, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleCopy(sym, `sym-${sym}-${i}`)}
                        className="p-3 bg-white hover:bg-zinc-900 hover:text-amber-400 rounded-xl text-xl font-bold text-center border border-slate-200 transition-all hover:scale-110 active:scale-90 shadow-2xs"
                        title={`Copiar ${sym}`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE GOTHIC ALPHABET A-Z */}
        {activeTab === 'alphabet' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Abecedario Gótico Completo (Fraktur & Old English A - Z)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Toca cualquier letra gótica mayúscula o minúscula para copiarla al instante:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {alphabet.map((letter) => {
                const lower = letter.toLowerCase();
                const boldUpper = frakturBoldGen.transform(letter);
                const boldLower = frakturBoldGen.transform(lower);
                const isCopied = copiedId === `alpha-goth-${letter}`;

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => handleCopy(`${boldUpper}${boldLower}`, `alpha-goth-${letter}`)}
                    className="p-3 bg-zinc-900 text-white hover:bg-zinc-950 rounded-xl border border-zinc-800 text-center transition-all hover:border-amber-400 hover:scale-105 active:scale-95 group shadow-2xs"
                    title={`Copiar ${boldUpper}${boldLower}`}
                  >
                    <span className="text-[10px] text-zinc-400 block font-sans">
                      {letter} {lower}
                    </span>
                    <span className="text-2xl text-amber-400 group-hover:text-amber-300 font-normal block my-1">
                      {boldUpper} {boldLower}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-bold block opacity-0 group-hover:opacity-100 transition-opacity">
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
