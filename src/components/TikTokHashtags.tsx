import React, { useState } from 'react';
import { Hash, Sparkles, Copy, Check, Flame, TrendingUp } from 'lucide-react';

const HASHTAG_PACKAGES = [
  {
    category: '🚀 FYP & Viral General',
    icon: '🔥',
    tags: ['#parati', '#fyp', '#viral', '#foryou', '#trending', '#foryoupage', '#tiktok viral', '#paratipage', '#espana'],
  },
  {
    category: '🌸 Aesthetic & Vlogs Daily',
    icon: '✨',
    tags: ['#aesthetic', '#vlog', '#dailyvlog', '#minivlog', '#cozy', '#lifestyle', '#soft', '#grwm', '#outfitinspo'],
  },
  {
    category: '⚡ POV & Humormemes',
    icon: '🎭',
    tags: ['#pov', '#humor', '#comedia', '#storytime', '#relatable', '#humortiktok', '#memes', '#risas'],
  },
  {
    category: '🎮 Gaming & Esports',
    icon: '🎮',
    tags: ['#gamer', '#freefire', '#gaming', '#streamer', '#clips', '#highlight', '#gameplay', '#fortnite', '#roblox'],
  },
  {
    category: '🎵 Dance & Música Viral',
    icon: '🎧',
    tags: ['#dance', '#baile', '#music', '#trend', '#song', '#choreo', '#viralsong', '#remix'],
  },
  {
    category: '🖤 Dark & Cyber Aesthetic',
    icon: '🥀',
    tags: ['#darkaesthetic', '#cyber', '#y2k', '#emo', '#grunge', '#alt', '#goth', '#outfit'],
  },
];

export const TikTokHashtags: React.FC = () => {
  const [copiedCategory, setCopiedCategory] = useState<string | null>(null);

  const handleCopyGroup = (category: string, tags: string[]) => {
    const textToCopy = tags.join(' ');
    navigator.clipboard.writeText(textToCopy);
    setCopiedCategory(category);
    setTimeout(() => setCopiedCategory(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
          Hashtag Studio FYP TikTok
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-pink-600" />
          <span>Hashtags Virales Organizados para el Algoritmo (#FYP / #Parati)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Copia paquetes completos de etiquetas optimizadas para posicionar tu contenido en el feed principal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HASHTAG_PACKAGES.map((pkg) => {
          const isCopied = copiedCategory === pkg.category;
          return (
            <div
              key={pkg.category}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3 hover:border-pink-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>{pkg.icon}</span>
                    <span>{pkg.category}</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {pkg.tags.length} tags
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 my-2">
                  {pkg.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyGroup(pkg.category, pkg.tags)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-black text-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Etiquetas Copiadas!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Todos los Hashtags ({pkg.tags.length})</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
