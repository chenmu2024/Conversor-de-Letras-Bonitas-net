import React, { useState } from 'react';
import { Flame, Copy, Check, Sparkles, Zap, MessageCircle } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const HOOK_CATEGORIES = [
  {
    name: '🔥 POV Virales (Alta Retención)',
    hooks: [
      'POV: Descubres las mejores letras bonitas para tu Bio ✨',
      'POV: Nadie te dijo que podías cambiar tu letra en TikTok 🤫',
      'POV: Cuando encuentras la tipografía estética perfecta 🌸',
      'POV: Tu perfil de TikTok después de usar estas fuentes 📈',
    ]
  },
  {
    name: '🧠 Trucos & Secretos ("Nadie te cuenta")',
    hooks: [
      '3 Trucos de TikTok que el 99% NO conoce 🤫',
      'Guarda este video antes de que lo borren 📌',
      'La web secreta que usan las influencers para sus Bios ✨',
      'Cómo poner letras cursivas en TikTok en 10 segundos ⏱️',
    ]
  },
  {
    name: '💖 Aesthetic & Lifestyle Vlogs',
    hooks: [
      'Acompáñame a remodelar mi perfil de TikTok 🎧',
      'GRWM: Organizando mi Bio con letras aesthetics 🌷',
      'Cosas que hacen que tu perfil se vea 100x más aesthetic ☕',
      'Mi secreto para tener una Bio limpia y organizada ✨',
    ]
  },
  {
    name: '🎮 Gamer & Free Fire Highlights',
    hooks: [
      'Símbolos invisibles que los pros usan en su Nick ⚔️',
      'Cómo poner espacios invisibles en tu nombre de juego 🎮',
      'El secreto para tener un Nick único en Free Fire 🔥',
      'Nombres épicos con letras góticas que debes probar 👑',
    ]
  }
];

export const TikTokViralHooks: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState('small-caps');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const generator = FONT_GENERATORS.find((g) => g.id === selectedFont) || FONT_GENERATORS[0];

  const handleCopy = (hookText: string) => {
    const transformed = generator.transform(hookText);
    navigator.clipboard.writeText(transformed);
    setCopiedText(hookText);
    setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
          TikTok Retention & Viral Hook Generator
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span>Ganchos Virales de 3 Segundos con Fuentes Aesthetics</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Los primeros 3 segundos de tu video deciden si se vuelve viral. Usa estos ganchos formateados para la pantalla de tu video o portada de CapCut.
        </p>
      </div>

      {/* Font Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100 pb-3">
        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Estilo de Letra:
        </span>
        {[
          { id: 'small-caps', label: 'Small Caps (CapCut)' },
          { id: 'sans-bold', label: 'Negrita Sans' },
          { id: 'monospace', label: 'Máquina Vintage' },
          { id: 'italic-serif', label: 'Cursiva Aesthetic' },
          { id: 'circles-filled', label: 'Círculos' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedFont(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedFont === f.id
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Category Grid */}
      <div className="space-y-6">
        {HOOK_CATEGORIES.map((cat) => (
          <div key={cat.name} className="space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>{cat.name}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.hooks.map((hook, i) => {
                const formatted = generator.transform(hook);
                const isCopied = copiedText === hook;

                return (
                  <div
                    key={i}
                    onClick={() => handleCopy(hook)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      isCopied
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200/80 hover:border-pink-300 hover:bg-pink-50/20'
                    }`}
                  >
                    <div className="text-sm font-extrabold text-slate-900 leading-snug my-1">
                      {formatted}
                    </div>

                    <div className="mt-2 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-extrabold ${
                          isCopied ? 'text-emerald-700' : 'text-pink-600 group-hover:underline'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Copiado para Video!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Hook Formateado</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
