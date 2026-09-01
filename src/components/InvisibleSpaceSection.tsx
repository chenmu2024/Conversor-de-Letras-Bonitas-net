import React, { useState } from 'react';
import { Ghost, Copy, Check, Info, ShieldCheck, Gamepad2, MessageSquare, AlertCircle } from 'lucide-react';

const INVISIBLE_CODES = [
  {
    id: 'hangul-filler',
    name: 'Espacio Invisible Hangul Filler (Recomendado Free Fire)',
    code: 'U+3164',
    char: 'ㅤ', // Hangul filler
    description: 'El carácter más compatible para Free Fire, nombres de clanes, TikTok y apodos en juegos.',
    badge: 'Popular Juegos',
  },
  {
    id: 'zero-width-space',
    name: 'Espacio de Ancho Cero (ZWSP)',
    code: 'U+200B',
    char: '​', // Zero-width space
    description: 'Espacio invisible sin ancho visual. Útil para saltos de línea y formateo de texto limpio.',
    badge: 'Formato Web',
  },
  {
    id: 'braille-blank',
    name: 'Espacio Braille Invisible',
    code: 'U+2800',
    char: '⠀', // Braille blank
    description: 'Espacio en blanco de patrón Braille. Excelente para biografías de Instagram y WhatsApp.',
    badge: 'Instagram & WA',
  },
  {
    id: 'en-quad',
    name: 'Espacio En Quad',
    code: 'U+2000',
    char: ' ', // En quad
    description: 'Espacio equivalente a medio eme de imprenta. Crea sangrías limpias en biografía.',
    badge: 'Sangrías',
  },
];

export const InvisibleSpaceSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testInput, setTestInput] = useState<string>('Mi NombreㅤInvisible');

  const handleCopy = (id: string, char: string) => {
    navigator.clipboard.writeText(char);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="espacio-invisible-seccion" className="mt-12 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/30">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-indigo-800/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-3">
            <Ghost className="w-3.5 h-3.5" />
            <span>Conversor de Letras Bonitas · Módulo Espacio U+3164</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Espacio Invisible en el Conversor de Letras Bonitas [ㅤ]
          </h2>
          <p className="text-sm text-indigo-200/80 mt-1 max-w-2xl">
            En el Conversor de Letras Bonitas puedes generar y copiar el código de espacio invisible (letra transparente) para poner tu nombre oculto en Free Fire, estados de WhatsApp, biografía de Instagram o mensajes en blanco.
          </p>
        </div>

        {/* Instant Giant Copy Button */}
        <button
          onClick={() => handleCopy('hangul-filler', 'ㅤ')}
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
        >
          {copiedId === 'hangul-filler' ? (
            <>
              <Check className="w-5 h-5 text-emerald-950" />
              <span>¡Espacio [ㅤ] Copiado!</span>
            </>
          ) : (
            <>
              <Ghost className="w-5 h-5" />
              <span>Copiar Espacio Principal [ㅤ]</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Invisible Characters */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INVISIBLE_CODES.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:bg-white/10 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200">
                  {item.code}
                </span>
                <span className="text-[10px] font-semibold text-amber-300">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                {item.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-300/70">
                Char: [ <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">ㅤ</span> ]
              </span>
              <button
                onClick={() => handleCopy(item.id, item.char)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-all ${
                  copiedId === item.id
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3 h-3" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Cards: Free Fire & WhatsApp */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Free Fire Tutorial */}
        <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-2 mb-3 text-amber-400">
            <Gamepad2 className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">¿Cómo poner Nombre Invisible en Free Fire?</h4>
          </div>
          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Haz clic en el botón superior <strong>"Copiar Espacio Principal [ㅤ]"</strong>.</li>
            <li>Abre <strong>Garena Free Fire</strong> y dirígete a tu perfil de jugador.</li>
            <li>Toca el icono de edición de Nickname / Nombre de jugador.</li>
            <li>Pega el espacio invisible. Si el juego te indica que el nombre ya está en uso, combina 2 o 3 espacios invisibles o añade un símbolo pequeño.</li>
            <li>Confirma los diamantes o la tarjeta de cambio de nombre y ¡listo!</li>
          </ol>
        </div>

        {/* WhatsApp & Instagram Tutorial */}
        <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-2 mb-3 text-emerald-400">
            <MessageSquare className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">¿Cómo mandar Mensajes Vacíos en WhatsApp?</h4>
          </div>
          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Copia el <strong>Espacio Invisible [ㅤ]</strong> desde esta página.</li>
            <li>Abre cualquier conversación o grupo en <strong>WhatsApp</strong>.</li>
            <li>Pega el carácter en el campo de texto de mensaje (WhatsApp detectará que hay un carácter y activará el botón verde de enviar).</li>
            <li>Pulsa <strong>Enviar</strong> y aparecerá un mensaje completamente en blanco y transparente.</li>
          </ol>
        </div>
      </div>
    </section>
  );
};
