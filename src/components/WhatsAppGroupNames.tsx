import React, { useState } from 'react';
import { Users, Copy, Check, Sparkles, Shield, Heart } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const GROUP_TEMPLATES = [
  { category: '👨‍👩‍👧‍👦 Familia & Hogar', name: 'Familia Unida' },
  { category: '👯‍♀️ Amigas / Besties', name: 'Las Inseparables' },
  { category: '⚽ Deportes & Equipo', name: 'Equipo Campeón' },
  { category: '📚 Colegio & Universidad', name: 'Estudio y Tareas' },
  { category: '🎉 Fiestas & Eventos', name: 'Modo Fiesta' },
  { category: '💼 Trabajo & Negocios', name: 'Proyectos 2026' },
  { category: '🎮 Gaming & Squad', name: 'Los Insanos Squad' },
];

const STYLES = [
  { id: 'sans-bold', label: 'Negrita Pro' },
  { id: 'small-caps', label: 'Small Caps' },
  { id: 'circles-filled', label: 'Círculos' },
  { id: 'italic-bold-serif', label: 'Cursiva Elegante' },
  { id: 'double-struck', label: 'Doble Delineado' },
];

export const WhatsAppGroupNames: React.FC = () => {
  const [groupName, setGroupName] = useState('Grupo Familiar 2026');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedText(txt);
    setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block mb-1">
          Generador de Nombres para Grupos de WhatsApp
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600" />
          <span>Diseñador de Títulos Decorados para Grupos y Chats</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Personaliza el nombre de tu grupo de WhatsApp con tipografías compatibles y símbolos decorativos que no se rompen.
        </p>
      </div>

      {/* Input */}
      <div className="max-w-xl">
        <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
          Escribe el nombre de tu grupo:
        </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Ej: Familia Unida, Amigas Forever..."
          className="w-full px-4 py-2.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
      </div>

      {/* Quick Presets */}
      <div>
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
          Sugerencias Rápidas de Grupos:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {GROUP_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.name}
              type="button"
              onClick={() => setGroupName(tmpl.name)}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-200/60 active:scale-95"
            >
              {tmpl.category}: {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Styled Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {STYLES.map((st) => {
          const gen = FONT_GENERATORS.find((g) => g.id === st.id) || FONT_GENERATORS[0];
          const styled = gen.transform(groupName || 'Nombre de Grupo');

          const decoratedVariants = [
            `⚡️ ${styled} ⚡️`,
            `🌸 ${styled} 🌸`,
            `✦ ${styled} ✦`,
            `👑 ${styled} 👑`,
          ];

          return decoratedVariants.map((variant, idx) => {
            const isCopied = copiedText === variant;
            return (
              <div
                key={`${st.id}-${idx}`}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isCopied
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase block">
                    {st.label}
                  </span>
                  <p className="text-sm font-bold text-slate-900 truncate mt-0.5">
                    {variant}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(variant)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200'
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
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
