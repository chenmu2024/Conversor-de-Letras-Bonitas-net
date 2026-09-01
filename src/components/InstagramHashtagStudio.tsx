import React, { useState } from 'react';
import { Hash, Sparkles, Copy, Check, TrendingUp, Layers, Tag } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const HASHTAG_CLUSTERS = [
  {
    category: 'Aesthetic & Lifestyle',
    icon: '🌸',
    tags: [
      '#aesthetic', '#aestheticvibes', '#softaesthetic', '#lifestyleblogger', 
      '#parati', '#feedgoals', '#minimalismo', '#aestheticfeed', '#vintagevibes'
    ],
  },
  {
    category: 'Instagram Growth & Creators',
    icon: '🚀',
    tags: [
      '#creadoresdecontenido', '#instagramtips', '#emprendedores', '#marcapersonal',
      '#marketingdigital', '#redessociales', '#tipsinstagram', '#comunidad'
    ],
  },
  {
    category: 'Quotes & Frases Bonitas',
    icon: '✨',
    tags: [
      '#frasesbonitas', '#frasesdelavida', '#pensamientospositivos', '#letrasbonitas',
      '#motivacion', '#amorpropio', '#reflexiones', '#poesia'
    ],
  },
  {
    category: 'Fotografía & Reels',
    icon: '📸',
    tags: [
      '#reelsinstagram', '#fotografia', '#fotodeldia', '#photodump',
      '#instamoment', '#reelviral', '#explorepage', '#tendencia'
    ],
  },
];

export const InstagramHashtagStudio: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(HASHTAG_CLUSTERS[0].tags.slice(0, 6));
  const [fontStyle, setFontStyle] = useState<string>('none');
  const [copied, setCopied] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const selectAllInCluster = (tags: string[]) => {
    setSelectedTags((prev) => {
      const merged = Array.from(new Set([...prev, ...tags]));
      return merged.slice(0, 30); // Max 30 hashtags per Instagram rule
    });
  };

  const formatTag = (tag: string) => {
    if (fontStyle === 'none') return tag;
    const gen = FONT_GENERATORS.find((g) => g.id === fontStyle);
    if (!gen) return tag;
    const body = tag.replace('#', '');
    return `#${gen.transform(body)}`;
  };

  const compiledHashtags = selectedTags.map(formatTag).join(' ');

  const handleCopy = async () => {
    if (!compiledHashtags) return;
    try {
      await navigator.clipboard.writeText(compiledHashtags);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
            Hashtags Virales & Formato
          </span>
          <h3 className="font-extrabold text-lg text-slate-900">
            Generador y Agrupador de Hashtags para Instagram
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Selecciona hashtags de alta visibilidad para tus publicaciones y aplica formato de tipografía para destacar.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
            {selectedTags.length} / 30 Tags
          </span>
        </div>
      </div>

      {/* Selected Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50/60 to-purple-50/50 border border-pink-100/90 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            Hashtags Seleccionados Listos para Pegar:
          </span>

          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="text-[11px] font-bold text-rose-600 hover:underline"
            >
              Limpiar Selección
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm font-medium text-slate-800 break-words leading-relaxed min-h-[36px]">
          {compiledHashtags || <span className="text-slate-400">Selecciona hashtags abajo para agregarlos...</span>}
        </p>

        <button
          type="button"
          onClick={handleCopy}
          disabled={selectedTags.length === 0}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-pink-500/25 disabled:opacity-50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>¡Hashtags Copiados!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Todos los Hashtags ({selectedTags.length})</span>
            </>
          )}
        </button>
      </div>

      {/* Hashtag Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HASHTAG_CLUSTERS.map((cluster, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <span>{cluster.icon}</span>
                <span>{cluster.category}</span>
              </span>

              <button
                type="button"
                onClick={() => selectAllInCluster(cluster.tags)}
                className="text-[10px] font-extrabold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-2 py-0.5 rounded-lg transition-colors"
              >
                + Añadir Todos
              </button>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {cluster.tags.map((t) => {
                const isSelected = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
