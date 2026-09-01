import React, { useState } from 'react';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  Sparkles, 
  Pin, 
  ShieldCheck, 
  ThumbsUp, 
  Gift, 
  HelpCircle,
  Flame,
  AlertTriangle,
  Send
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface CommentPreset {
  id: string;
  type: string;
  badge: string;
  badgeColor: string;
  author: string;
  text: string;
  likes: number;
}

const COMMENT_PRESETS: CommentPreset[] = [
  {
    id: 'c1',
    type: '📌 Comentario Fijado / Enlace Clave',
    badge: 'Fijado por el Autor',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    author: 'Página Oficial',
    text: `👉 𝗧𝗢𝗗𝗔 𝗟𝗔 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜Ó𝗡 𝗔𝗤𝗨Í 👇\n\n📌 Para consultas sobre pedidos y envíos, escríbenos directamente por mensaje privado (Inbox).\n📲 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗢𝗳𝗶𝗰𝗶𝗮𝗹: +34 600 000 000\n✨ ¡Gracias por su enorme apoyo en este post!`,
    likes: 342,
  },
  {
    id: 'c2',
    type: '🎁 Dinámica de Sorteo / Giveaway',
    badge: 'Concurso',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    author: 'Organizador',
    text: `🎉 ¡𝗦𝗢𝗥𝗧𝗘𝗢 𝗘𝗫𝗖𝗟𝗨𝗦𝗜𝗩𝗢 𝗗𝗘 𝗟𝗔 𝗦𝗘𝗠𝗔𝗡𝗔! 🎉\n\nPasos para participar:\n❶ Dale "𝗠𝗲 𝗚𝘂𝘀𝘁𝗮" a esta publicación ❤️\n❷ Etiqueta a 𝟮 𝗮𝗺𝗶𝗴𝗼𝘀 en los comentarios 👥\n❸ Comparte en modo público 🔄\n\n🏆 ɢᴀɴᴀᴅᴏʀ anunciado este domingo en historias. ¡Mucha suerte a todos!`,
    likes: 819,
  },
  {
    id: 'c3',
    type: '🛡️ Aviso de Administrador de Grupo',
    badge: 'Administrador',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    author: 'Admin del Grupo',
    text: `⚠️ 𝗡𝗢𝗧𝗔 𝗗𝗘 𝗠𝗢𝗗𝗘𝗥𝗔𝗖𝗜Ó𝗡 ⚠️\n\nRecordamos a todos los miembros que los comentarios con enlaces de spam o ventas no autorizadas serán eliminados de inmediato. Mantengamos un ambiente respetuoso y constructivo.`,
    likes: 156,
  },
  {
    id: 'c4',
    type: '💬 Opinión Destacada / Reseña Cliente',
    badge: 'Comprador Top',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    author: 'Cliente Verificado',
    text: `⭐⭐⭐⭐⭐ ¡𝗘𝘅𝗰𝗲𝗹𝗲𝗻𝘁𝗲 𝘀𝗲𝗿𝘃𝗶𝗰𝗶𝗼! Pedí mi paquete el martes y llegó en menos de 24 horas perfectamente embalado. 100% recomendados, ¡volveré a comprar seguro! 👏`,
    likes: 94,
  },
  {
    id: 'c5',
    type: '🔥 Llamado a la Interacción / Debate',
    badge: 'Pregunta Viral',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    author: 'Creador de Contenido',
    text: `👇 𝗗É𝗝𝗔𝗠𝗘 𝗧𝗨 𝗢𝗣𝗜𝗡𝗜Ó𝗡 𝗘𝗡 𝗟𝗢𝗦 𝗖𝗢𝗠𝗘𝗡𝗧𝗔𝗥𝗜𝗢𝗦 👇\n\n¿Estás de acuerdo con el punto número 3 o cambiarías algo? Los leo a todos y respondo a los 50 primeros comentarios ☕💬`,
    likes: 215,
  },
];

export const FacebookCommentsReactions: React.FC = () => {
  const [customComment, setCustomComment] = useState('¡Escribe tu opinión aquí! Estaremos respondiendo a todos.');
  const [selectedStyle, setSelectedStyle] = useState('sans-bold');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentGen = FONT_GENERATORS.find((g) => g.id === selectedStyle) || FONT_GENERATORS[0];
  const transformedComment = currentGen.transform(customComment);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
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
          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Comentarios & Moderación FB
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Comentarios Fijados, Sorteos y Avisos de Admin
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>Generador de Comentarios Destacados & Plantillas para Facebook</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          En publicaciones con cientos de respuestas, los comentarios formateados con <strong>Negrita Matemática</strong> y <strong>Viñetas</strong> se leen primero y reciben más reacciones y respuestas.
        </p>
      </div>

      {/* Quick Custom Comment Formatter */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-blue-300 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Formateador Rápido de Comentarios:</span>
          </span>
          <span className="text-[10px] text-slate-400">Transformación en 1 clic</span>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-300 block mb-1">
            Texto de tu comentario:
          </label>
          <input
            type="text"
            value={customComment}
            onChange={(e) => setCustomComment(e.target.value)}
            placeholder="Escribe tu comentario o respuesta..."
            className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-400 font-medium"
          />
        </div>

        {/* Font Quick Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'sans-bold', label: 'Negrita Sans (Titulares)' },
            { id: 'sans-bold-italic', label: 'Negrita Cursiva' },
            { id: 'small-caps', label: 'Small Caps' },
            { id: 'double-struck', label: 'Doble Trazo' },
            { id: 'monospace', label: 'Máquina / Monospace' },
            { id: 'circles-filled', label: 'Círculos Rellenos' },
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedStyle(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                selectedStyle === st.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Live Formatted Output */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-black/40 rounded-xl border border-slate-800">
          <div className="font-mono text-xs text-blue-200 select-all truncate w-full">
            {transformedComment}
          </div>
          <button
            type="button"
            onClick={() => handleCopy(transformedComment, 'custom-comment')}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
              copiedId === 'custom-comment'
                ? 'bg-emerald-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {copiedId === 'custom-comment' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Comentario</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comment Templates Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Pin className="w-4 h-4 text-blue-600" />
            <span>Plantillas de Comentarios Fijados & Avisos Virales:</span>
          </h4>
          <span className="text-xs text-slate-500 font-bold">5 Modelos Optimizados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMENT_PRESETS.map((preset) => {
            const isCopied = copiedId === preset.id;
            return (
              <div
                key={preset.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-slate-900 font-black">{preset.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold ${preset.badgeColor}`}>
                      {preset.badge}
                    </span>
                  </div>

                  {/* Facebook Comment Bubble Mockup */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                        👤
                      </div>
                      <span className="font-extrabold text-xs text-slate-900">{preset.author}</span>
                    </div>
                    <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                      {preset.text}
                    </div>
                  </div>

                  {/* Reaction preview */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-blue-600 text-white rounded-full text-[8px]">👍</span>
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[8px]">❤️</span>
                      <span className="font-bold ml-1">{preset.likes}</span>
                    </div>
                    <span className="font-bold text-blue-600">Responder</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(preset.text, preset.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-black text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>¡Comentario Copiado! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto Completo</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
