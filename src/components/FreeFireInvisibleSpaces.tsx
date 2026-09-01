import React, { useState } from 'react';
import { EyeOff, Copy, Check, Sparkles, ShieldCheck, HelpCircle, Layers } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

// 3 types of invisible spaces used in Free Fire
const INVISIBLE_SPACE_TYPES = [
  {
    id: 'large',
    name: 'Espacio Invisible Grande (Estándar)',
    code: 'U+3164 (Hangul Filler)',
    char: INVISIBLE_SPACE,
    description: 'El espacio transparente más utilizado para separar el tag de clan y tu nombre en Free Fire.',
    width: 'Ancho Completo (1 Carácter Normal)',
    example: '亗ㅤɪɴsᴀɴᴏ',
  },
  {
    id: 'medium',
    name: 'Espacio Invisible Mediano',
    code: 'U+FFA0 (Halfwidth Hangul)',
    char: '\uFFA0',
    description: 'Espacio transparente de medio ancho. Ideal cuando tu nick casi llega al límite de 12 caracteres.',
    width: 'Medio Ancho (Medio espacio)',
    example: '⚡ﾠɴɪɴᴊᴀﾠ⚡',
  },
  {
    id: 'small',
    name: 'Espacio Invisible Pequeño (Fino)',
    code: 'U+2000 (En Quad / Thin)',
    char: '\u2000',
    description: 'Espacio fino y discreto para micro-separaciones entre símbolos y letras sin ocupar mucho espacio.',
    width: 'Micro Ancho (Espacio Fino)',
    example: '† ᴋɪɴɢ †',
  },
];

export const FreeFireInvisibleSpaces: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (char: string, id: string) => {
    try {
      await navigator.clipboard.writeText(char);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Códigos Invisibles Unicode
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Grande, Mediano y Pequeño para Nicks
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <EyeOff className="w-5 h-5 text-amber-500" />
          <span>Generador de Espacios Invisibles para Free Fire (3 Tamaños)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Garena Free Fire no permite la barra espaciadora normal en los nicks. Usa estos caracteres Unicode especiales para separar tu clan de tu nombre sin que el juego lo rechace.
        </p>
      </div>

      {/* 3 Space Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INVISIBLE_SPACE_TYPES.map((space) => {
          const isCopied = copiedId === space.id;
          return (
            <div
              key={space.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-400 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                  <span className="text-amber-700 font-extrabold">{space.code}</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-mono">
                    {space.width}
                  </span>
                </div>

                <h4 className="font-black text-sm text-slate-900 mt-1">
                  {space.name}
                </h4>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {space.description}
                </p>

                {/* Example box */}
                <div className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 mt-3 font-mono text-xs">
                  <span className="text-[10px] text-slate-400 block font-sans">Ejemplo en juego:</span>
                  <p className="text-amber-300 font-bold mt-0.5">{space.example}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(space.char, space.id)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                  isCopied
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡Espacio Copiado! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Este Espacio</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Guide Tips */}
      <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
        <h4 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>¿Cómo usar el espacio invisible en Free Fire?</span>
        </h4>
        <ul className="text-xs text-amber-800/90 space-y-1 list-disc pl-5">
          <li>Toca el botón <strong>"Copiar Este Espacio"</strong> en la tarjeta que prefieras.</li>
          <li>Abre el juego Free Fire y ve a tu <strong>Perfil &gt; Editar Nick</strong>.</li>
          <li>Pega el carácter copiado entre tu tag de clan y tu nombre (por ejemplo: <code>TAG[pegar]NICK</code>).</li>
          <li>¡Listo! Tu nombre aparecerá con una separación limpia y profesional sin errores de caracteres no permitidos.</li>
        </ul>
      </div>
    </div>
  );
};
