import React, { useState, useMemo } from 'react';
import { User, Copy, Check, Search, ArrowUpRight, Flame, Sparkles, Crown } from 'lucide-react';
import { FONT_COUNT_PLUS } from '../constants/siteStats';

interface PopularNameItem {
  name: string;
  gender: 'femenino' | 'masculino' | 'gamer' | 'aesthetic';
  cursiva: string;
  gotica: string;
  circulos: string;
  gamerAlas: string;
}

const POPULAR_NAMES: PopularNameItem[] = [
  // Femenino
  {
    name: 'Sofía',
    gender: 'femenino',
    cursiva: '𝓢𝓸𝓯í𝓪',
    gotica: '𝕾𝖔𝖋í𝖆',
    circulos: '🅢🅞🅕Í🅐',
    gamerAlas: '꧁༺ 𝓢𝓸𝓯í𝓪 ༻꧂',
  },
  {
    name: 'Valentina',
    gender: 'femenino',
    cursiva: '𝓥𝓪𝓵𝓮𝓷𝓽𝓲𝓷𝓪',
    gotica: '𝖁𝖆𝖑𝖊𝖓𝖙𝖎𝖓𝖆',
    circulos: '🅥🅐🅛🅔🅝🅣🅘🅝🅐',
    gamerAlas: '🌸 𝓥𝓪𝓵𝓮𝓷𝓽𝓲𝓷𝓪 🌸',
  },
  {
    name: 'Camila',
    gender: 'femenino',
    cursiva: '𝓒𝓪𝓶𝓲𝓵𝓪',
    gotica: '𝕮𝖆𝖒𝖎𝖑𝖆',
    circulos: '🅒🅐🅜🅘🅛🅐',
    gamerAlas: '✦ 𝓒𝓪𝓶𝓲𝓵𝓪 ✦',
  },
  {
    name: 'Isabella',
    gender: 'femenino',
    cursiva: '𝓘𝓼𝓪𝓫𝓮𝓵𝓵𝓪',
    gotica: '𝕴𝖘𝖆𝖇𝖊𝖑𝖑𝖆',
    circulos: '🅘🅢🅐🅑🅔🅛🅛🅐',
    gamerAlas: '☾ 𝓘𝓼𝓪𝓫𝓮𝓵𝓵𝓪 ☽',
  },
  {
    name: 'Lucía',
    gender: 'femenino',
    cursiva: '𝓛𝓾𝓬í𝓪',
    gotica: '𝕷𝖚𝖈í𝖆',
    circulos: '🅛🅤🅒Í🅐',
    gamerAlas: '✨ 𝓛𝓾𝓬í𝓪 ✨',
  },
  {
    name: 'Valeria',
    gender: 'femenino',
    cursiva: '𝓥𝓪𝓵𝓮𝓻𝓲𝓪',
    gotica: '𝖁𝖆𝖑𝖊𝖗𝖎𝖆',
    circulos: '🅥🅐🅛🅔🅡🅘🅐',
    gamerAlas: '🌹 𝓥𝓪𝓵𝓮𝓻𝓲𝓪 🌹',
  },
  {
    name: 'Emma',
    gender: 'femenino',
    cursiva: '𝓔𝓶𝓶𝓪',
    gotica: '𝕰𝖒𝖒𝖆',
    circulos: '🅔🅜🅜🅐',
    gamerAlas: 'ʚ 𝓔𝓶𝓶𝓪 ɞ ✧',
  },
  {
    name: 'Martina',
    gender: 'femenino',
    cursiva: '𝓜𝓪𝓻𝓽𝓲𝓷𝓪',
    gotica: '𝕸𝖆𝖗𝖙𝖎𝖓𝖆',
    circulos: '🅜🅐🅡🅣🅘🅝🅐',
    gamerAlas: '👑 𝓜𝓪𝓻𝓽𝓲𝓷𝓪 👑',
  },
  {
    name: 'Elena',
    gender: 'femenino',
    cursiva: '𝓔𝓵𝓮𝓷𝓪',
    gotica: '𝕰𝖑𝖊𝖓𝖆',
    circulos: '🅔🅛🅔🅝🅐',
    gamerAlas: '｡･:*:･ 𝓔𝓵𝓮𝓷𝓪 ･:*:･',
  },
  {
    name: 'Victoria',
    gender: 'femenino',
    cursiva: '𝓥𝓲𝓬𝓽𝓸𝓻𝓲𝓪',
    gotica: '𝖁𝖎𝖈𝖙𝖔𝖗𝖎𝖆',
    circulos: '🅥🅘🅒🅣🅞🅡🅘🅐',
    gamerAlas: '♛ 𝓥𝓲𝓬𝓽𝓸𝓻𝓲𝓪 ♛',
  },
  {
    name: 'Mia',
    gender: 'femenino',
    cursiva: '𝓜𝓲𝓪',
    gotica: '𝕸𝖎𝖆',
    circulos: '🅜🅘🅐',
    gamerAlas: '𐙚 𝓜𝓲𝓪 𐙚',
  },
  {
    name: 'Emilia',
    gender: 'femenino',
    cursiva: '𝓔𝓶𝓲𝓵𝓲𝓪',
    gotica: '𝕰𝖒𝖎𝖑𝖎𝖆',
    circulos: '🅔🅜🅘🅛🅘🅐',
    gamerAlas: '♥ 𝓔𝓶𝓲𝓵𝓲𝓪 ♥',
  },
  {
    name: 'Julieta',
    gender: 'femenino',
    cursiva: '𝓙𝓾𝓵𝓲𝓮𝓽𝓪',
    gotica: '𝕵𝖚𝖑𝖎𝖊𝖙𝖆',
    circulos: '🅙🅤🅛🅘🅔🅣🅐',
    gamerAlas: 'ʚ 𝓙𝓾𝓵𝓲𝓮𝓽𝓪 ɞ',
  },
  {
    name: 'Sara',
    gender: 'femenino',
    cursiva: '𝓢𝓪𝓻𝓪',
    gotica: '𝕾𝖆𝖗𝖆',
    circulos: '🅢🅐🅡🅐',
    gamerAlas: '★ 𝓢𝓪𝓻𝓪 ★',
  },

  // Masculino
  {
    name: 'Mateo',
    gender: 'masculino',
    cursiva: '𝓜𝓪𝓽𝓮𝓸',
    gotica: '𝕸𝖆𝖙𝖊𝖔',
    circulos: '🅜🅐🅣🅔🅞',
    gamerAlas: '⚡ 𝕸𝖆𝖙𝖊𝖔 ⚡',
  },
  {
    name: 'Lucas',
    gender: 'masculino',
    cursiva: '𝓛𝓾𝓬𝓪𝓼',
    gotica: '𝕷𝖚𝖈𝖆𝓼',
    circulos: '🅛🅤🅒🅐🅢',
    gamerAlas: '『 𝕷𝖚𝖈𝖆𝖘 』★',
  },
  {
    name: 'Santiago',
    gender: 'masculino',
    cursiva: '𝓢𝓪𝓷𝓽𝓲𝓪𝓰𝓸',
    gotica: '𝕾𝖆𝖓𝖙𝖎𝖆𝓰𝖔',
    circulos: '🅢🅐🅝🅣🅘🅐🅖🅞',
    gamerAlas: '亗 𝕾𝖆𝖓𝖙𝖎𝖆𝓰𝖔 亗',
  },
  {
    name: 'Alejandro',
    gender: 'masculino',
    cursiva: '𝓐𝓵𝓮𝓳𝓪𝓷𝓭𝓻𝓸',
    gotica: '𝕬𝖑𝖊𝖏𝖆𝖓𝖉𝖗𝖔',
    circulos: '🅐🅛🅔🅙🅐🅝🅓🅡🅞',
    gamerAlas: '☬ 𝕬𝖑𝖊𝖏𝖆𝖓𝖉𝖗𝖔 ☬',
  },
  {
    name: 'Sebastián',
    gender: 'masculino',
    cursiva: '𝓢𝓮𝓫𝓪𝓼𝓽𝓲á𝓷',
    gotica: '𝕾𝖊𝖇𝖆𝖘𝖙𝖎á𝖓',
    circulos: '🅢🅔🅑🅐🅢🅣🅘Á🅝',
    gamerAlas: '꧁ 𝕾𝖊𝖇𝖆𝖘𝖙𝖎á𝖓 ꧂',
  },
  {
    name: 'Diego',
    gender: 'masculino',
    cursiva: '𝓓𝓲𝓮𝓰𝓸',
    gotica: '𝕯𝖎𝖊𝖌𝖔',
    circulos: '🅓🅘🅔🅖🅞',
    gamerAlas: '⚔ 𝕯𝖎𝖊𝖌𝖔 ⚔',
  },
  {
    name: 'Daniel',
    gender: 'masculino',
    cursiva: '𝓓𝓪𝓷𝓲𝓮𝓵',
    gotica: '𝕯𝖆𝖓𝖎𝖊𝖑',
    circulos: '🅓🅐🅝🅘🅔🅛',
    gamerAlas: '⚡ 𝕯𝖆𝖓𝖎𝖊𝖑 ⚡',
  },
  {
    name: 'Leonardo',
    gender: 'masculino',
    cursiva: '𝓛𝓮𝓸𝓷𝓪𝓻𝓭𝓸',
    gotica: '𝕷𝖊𝖔𝖓𝖆𝖗𝖉𝖔',
    circulos: '🅛🅔🅞🅝🅐🅡🅓🅞',
    gamerAlas: '亗 𝕷𝖊𝖔𝖓𝖆𝖗𝖉𝖔 亗',
  },
  {
    name: 'Gabriel',
    gender: 'masculino',
    cursiva: '𝓖𝓪𝓫𝓻𝓲𝓮𝓵',
    gotica: '𝕲𝖆𝖇𝖗𝖎𝖊𝖑',
    circulos: '🅖🅐🅑🅡🅘🅔🅛',
    gamerAlas: '† 𝕲𝖆𝖇𝖗𝖎𝖊𝖑 †',
  },
  {
    name: 'Samuel',
    gender: 'masculino',
    cursiva: '𝓢𝓪𝓶𝓾𝓮𝓵',
    gotica: '𝕾𝖆𝖒𝖚𝖊𝖑',
    circulos: '🅢🅐🅜🅤🅔🅛',
    gamerAlas: '⚔ 𝕾𝖆𝖒𝖚𝖊𝖑 ⚔',
  },
  {
    name: 'Joaquín',
    gender: 'masculino',
    cursiva: '𝓙𝓸𝓪𝓺𝓾í𝓷',
    gotica: '𝕵𝖔𝖆𝖖𝖚í𝖓',
    circulos: '🅙🅞🅐🅠🅤Í🅝',
    gamerAlas: '☬ 𝕵𝖔𝖆𝖖𝖚í𝖓 ☬',
  },
  {
    name: 'Matías',
    gender: 'masculino',
    cursiva: '𝓜𝓪𝓽í𝓪𝓼',
    gotica: '𝕸𝖆𝖙í𝖆𝖘',
    circulos: '🅜🅐🅣Í🅐🅢',
    gamerAlas: '꧁༺ 𝕸𝖆𝖙í𝖆𝖘 ༻꧂',
  },
  {
    name: 'Tomás',
    gender: 'masculino',
    cursiva: '𝓣𝓸𝓶á𝓼',
    gotica: '𝕿𝖔𝖒á𝖘',
    circulos: '🅣🅞🅜Á🅢',
    gamerAlas: '亗 𝕿𝖔𝖒á𝖘 亗',
  },
  {
    name: 'Nicolás',
    gender: 'masculino',
    cursiva: '𝓝𝓲𝓬𝓸𝓵á𝓼',
    gotica: '𝕹𝖎𝖈𝖔𝖑á𝖘',
    circulos: '🅝🅘🅒🅞🅛Á🅢',
    gamerAlas: '👑 𝕹𝖎𝖈𝖔𝖑á𝖘 👑',
  },

  // Gamer / Clanes
  {
    name: 'Insano',
    gender: 'gamer',
    cursiva: '𝓘𝓷𝓼𝓪𝓷𝓸',
    gotica: '𝕴𝖓𝖘𝖆𝖓𝖔',
    circulos: '🅘🅝🅢🅐🅝🅞',
    gamerAlas: '亗 𝕴𝖓𝖘𝖆𝖓𝖔 亗 999',
  },
  {
    name: 'Ghost',
    gender: 'gamer',
    cursiva: '𝓖𝓱𝓸𝓼𝓽',
    gotica: '𝕲𝖍𝖔𝖘𝖙',
    circulos: '🅖🅗🅞🅢🅣',
    gamerAlas: '☬ 𝕲𝖍𝖔𝖘𝖙 • 𝕶𝖎𝖑𝖑 ☬',
  },
  {
    name: 'Legend',
    gender: 'gamer',
    cursiva: '𝓛𝓮𝓰𝓮𝓷𝓭',
    gotica: '𝕷𝖊𝖌𝖊𝖓𝖉',
    circulos: '🅛🅔🅖🅔🅝🅓',
    gamerAlas: '⚔ 𝕷𝖊𝖌𝖊𝖓𝖉 • 𝕻𝖗𝖔 ⚔',
  },
  {
    name: 'Shadow',
    gender: 'gamer',
    cursiva: '𝓢𝓱𝓪𝓭𝓸𝔀',
    gotica: '𝕾𝖍𝖆𝖉𝖔𝔀',
    circulos: '🅢🅗🅐🅓🅞🅦',
    gamerAlas: '† 𝕾𝖍𝖆𝖉𝖔𝔀 ☠ †',
  },
  {
    name: 'Patrón',
    gender: 'gamer',
    cursiva: '𝓟𝓪𝓽𝓻ó𝓷',
    gotica: '𝕻𝖆𝖙𝖗ó𝖓',
    circulos: '🅟🅐🅣🅡Ó🅝',
    gamerAlas: '꧁༺ 𝕻𝖆𝖙𝖗ó𝖓 ༻꧂',
  },
];

interface PopularNamesSectionProps {
  onSelectName: (name: string) => void;
}

export const PopularNamesSection: React.FC<PopularNamesSectionProps> = ({ onSelectName }) => {
  const [filterGender, setFilterGender] = useState<'todos' | 'femenino' | 'masculino' | 'gamer'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filteredNames = useMemo(() => {
    return POPULAR_NAMES.filter((item) => {
      const matchGender = filterGender === 'todos' || item.gender === filterGender;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchGender && matchSearch;
    });
  }, [filterGender, searchQuery]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(35);
      } catch {}
    }
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1600);
  };

  const handleLoadInConverter = (name: string) => {
    onSelectName(name);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <section id="nombres-populares-letras-bonitas" className="mt-12 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>Conversor de Letras Bonitas · Nombres y Nicks Populares</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Nombres en el Conversor de Letras Bonitas (A - Z)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Descubre cómo se escribe tu nombre en el Conversor de Letras Bonitas en tipografía Cursiva, Gótica medieval, Círculos o estilo Gamer con alas, listo para copiar con un clic a tu biografía o Free Fire.
          </p>
        </div>

        {/* Search & Gender Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white w-36 sm:w-44 transition-all"
            />
          </div>

          <div className="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterGender('todos')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterGender === 'todos' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterGender('femenino')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterGender === 'femenino' ? 'bg-white text-pink-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mujer
            </button>
            <button
              onClick={() => setFilterGender('masculino')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterGender === 'masculino' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hombre
            </button>
            <button
              onClick={() => setFilterGender('gamer')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterGender === 'gamer' ? 'bg-white text-amber-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gamer 🔥
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Names */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredNames.map((item) => (
          <div
            key={item.name}
            className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:bg-white transition-all shadow-2xs group"
          >
            <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-slate-200/60">
              <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <span>{item.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    item.gender === 'femenino'
                      ? 'bg-pink-100 text-pink-700'
                      : item.gender === 'masculino'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.gender === 'femenino'
                    ? 'Femenino'
                    : item.gender === 'masculino'
                    ? 'Masculino'
                    : 'Gamer'}
                </span>
              </span>

              <button
                onClick={() => handleLoadInConverter(item.name)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 group-hover:translate-x-0.5 transition-all"
                title="Personalizar este nombre en el conversor"
              >
                <span>Generar {FONT_COUNT_PLUS}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* Variations */}
            <div className="space-y-1.5">
              {/* 1. Cursiva */}
              <div className="flex items-center justify-between gap-2 py-1 px-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-xs font-bold text-slate-800 truncate">{item.cursiva}</span>
                <button
                  onClick={() => handleCopy(item.cursiva)}
                  className="p-1 text-slate-500 hover:text-indigo-600 transition-colors shrink-0"
                  title="Copiar Cursiva"
                >
                  {copiedText === item.cursiva ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* 2. Gótica */}
              <div className="flex items-center justify-between gap-2 py-1 px-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-xs font-bold text-slate-800 truncate">{item.gotica}</span>
                <button
                  onClick={() => handleCopy(item.gotica)}
                  className="p-1 text-slate-500 hover:text-indigo-600 transition-colors shrink-0"
                  title="Copiar Gótica"
                >
                  {copiedText === item.gotica ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* 3. Gamer Alas */}
              <div className="flex items-center justify-between gap-2 py-1 px-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-xs font-bold text-indigo-900 truncate">{item.gamerAlas}</span>
                <button
                  onClick={() => handleCopy(item.gamerAlas)}
                  className="p-1 text-slate-500 hover:text-indigo-600 transition-colors shrink-0"
                  title="Copiar Gamer"
                >
                  {copiedText === item.gamerAlas ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
