import React, { useState } from 'react';
import { Sparkles, Copy, Check, AtSign, Hash, RefreshCw, UserCheck } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface InstagramUsernameGeneratorProps {
  onSelectUsername?: (username: string) => void;
}

export const InstagramUsernameGenerator: React.FC<InstagramUsernameGeneratorProps> = ({ onSelectUsername }) => {
  const [baseWord, setBaseWord] = useState('sofia');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const cleanBase = baseWord.trim().toLowerCase().replace(/[^a-z0-9_.]/g, '') || 'sofia';

  // Generate creative Instagram Handle Ideas
  const ideas = [
    { id: 'u1', handle: `${cleanBase}.aesthetic`, tag: 'Aesthetic' },
    { id: 'u2', handle: `its.${cleanBase}`, tag: 'Minimalista' },
    { id: 'u3', handle: `${cleanBase}_diary`, tag: 'Blog / Diario' },
    { id: 'u4', handle: `the${cleanBase}club`, tag: 'Comunidad' },
    { id: 'u5', handle: `${cleanBase}.vibe`, tag: 'Chill' },
    { id: 'u6', handle: `soy.${cleanBase}`, tag: 'Personal' },
    { id: 'u7', handle: `${cleanBase}studio_`, tag: 'Creador' },
    { id: 'u8', handle: `hey.${cleanBase}x`, tag: 'Moderno' },
    { id: 'u9', handle: `${cleanBase}.archive`, tag: 'Fotografía' },
    { id: 'u10', handle: `real${cleanBase}_`, tag: 'Oficial' },
    { id: 'u11', handle: `${cleanBase}core_`, tag: 'Tendencia' },
    { id: 'u12', handle: `dear.${cleanBase}`, tag: 'Poético' },
    { id: 'u13', handle: `soft.${cleanBase}`, tag: 'Coquette' },
    { id: 'u14', handle: `by.${cleanBase}`, tag: 'Marca Personal' },
    { id: 'u15', handle: `${cleanBase}.inspo`, tag: 'Inspiración' },
    { id: 'u16', handle: `${cleanBase}raw`, tag: 'Auténtico' },
  ];

  const handleCopy = async (handle: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`@${handle}`);
      setCopiedName(id);
      setTimeout(() => setCopiedName(null), 2000);
      if (onSelectUsername) {
        onSelectUsername(handle);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-pink-600 uppercase tracking-wider block mb-1">
          Ideas de Handles Únicos (@usuario)
        </span>
        <h3 className="font-extrabold text-lg text-slate-900">
          Generador de Nombres de Usuario Aesthetic para Instagram
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Instagram solo permite caracteres alfanuméricos, puntos y guiones bajos en el @nombre_de_usuario (handle). Aquí te sugerimos combinaciones estéticas y profesionales.
        </p>
      </div>

      {/* Input */}
      <div className="max-w-md">
        <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
          Tu Nombre o Apodo Base:
        </label>
        <div className="relative">
          <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={baseWord}
            onChange={(e) => setBaseWord(e.target.value)}
            placeholder="sofia, camila, nico..."
            className="w-full pl-9 pr-4 py-2.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ideas.map((item) => {
          const isCopied = copiedName === item.id;
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-pink-300 transition-all flex items-center justify-between gap-2 shadow-2xs"
            >
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-bold text-pink-600 uppercase block">{item.tag}</span>
                <span className="text-xs font-black text-slate-900 truncate block mt-0.5">
                  @{item.handle}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(item.handle, item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all active:scale-95 shadow-2xs ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-pink-50 text-pink-600 border border-slate-200'
                }`}
              >
                {isCopied ? <Check className="w-3 h-3 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? '¡Listo!' : 'Copiar'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
