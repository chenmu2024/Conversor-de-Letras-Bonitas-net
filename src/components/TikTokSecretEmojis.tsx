import React, { useState } from 'react';
import { Smile, Copy, Check, Sparkles, Flame, Heart, MessageSquare } from 'lucide-react';

interface SecretEmoji {
  code: string;
  name: string;
  preview: string;
  category: 'emociones' | 'reacciones' | 'amor' | 'divertidos';
  description: string;
}

const TIKTOK_SECRET_EMOJIS: SecretEmoji[] = [
  // Emociones & Caras
  { code: '[smile]', name: 'Sonrisa Clásica', preview: '🙂', category: 'emociones', description: 'Sonrisa pequeña y tímida' },
  { code: '[happy]', name: 'Felicidad Total', preview: '😄', category: 'emociones', description: 'Boca abierta sonriente' },
  { code: '[angry]', name: 'Enfadado Rojo', preview: '😡', category: 'emociones', description: 'Cara roja de furia' },
  { code: '[cry]', name: 'Llorando a Mares', preview: '😭', category: 'emociones', description: 'Ojos con lágrimas celestes' },
  { code: '[embarrassed]', name: 'Avergonzado / Pena', preview: '😳', category: 'emociones', description: 'Mejillas sonrojadas tímidas' },
  { code: '[surprised]', name: 'Sorprendido', preview: '😲', category: 'emociones', description: 'Ojos bien abiertos' },
  { code: '[wronged]', name: 'Inocente / Puchero', preview: '🥺', category: 'emociones', description: 'Puchero de súplica o culpa' },
  { code: '[shout]', name: 'Gritando', preview: '😱', category: 'emociones', description: 'Boca abierta gritando' },
  { code: '[flushed]', name: 'Ruborizado', preview: '☺️', category: 'emociones', description: 'Carita tierna y tímida' },
  { code: '[weep]', name: 'Sollozo Triste', preview: '😿', category: 'emociones', description: 'Lágrima cayendo suave' },

  // Reacciones Virales
  { code: '[yummy]', name: 'Delicioso / Ñam', preview: '😋', category: 'reacciones', description: 'Lengua afuera saboreando' },
  { code: '[complacent]', name: 'Confiado / Fachero', preview: '😏', category: 'reacciones', description: 'Sonrisa de satisfacción' },
  { code: '[drool]', name: 'Babeando', preview: '🤤', category: 'reacciones', description: 'Babeando por comida o crush' },
  { code: '[scream]', name: 'Grito de Terror', preview: '🙀', category: 'reacciones', description: 'Manos en la cara asustado' },
  { code: '[speechless]', name: 'Sin Palabras / Tieso', preview: '😐', category: 'reacciones', description: 'Gota de sudor helado' },
  { code: '[funnyface]', name: 'Cara Chistosa / Bizco', preview: '🤪', category: 'reacciones', description: 'Mueca loca y divertida' },
  { code: '[laughwithtears]', name: 'Muerto de Risa', preview: '😂', category: 'reacciones', description: 'Risa incontrolable con lágrimas' },
  { code: '[wicked]', name: 'Diablillo Malvado', preview: '😈', category: 'reacciones', description: 'Sonrisa pícara de travesura' },
  { code: '[facewithrollingeyes]', name: 'Ojos en Blanco', preview: '🙄', category: 'reacciones', description: 'Mirada al techo de fastidio' },
  { code: '[sulk]', name: 'Enojado Cruzado', preview: '😤', category: 'reacciones', description: 'Indignación total' },
  { code: '[thinking]', name: 'Pensativo / Dudando', preview: '🤔', category: 'reacciones', description: 'Mano en la barbilla pensando' },
  { code: '[shock]', name: 'Shock Eléctrico', preview: '🤯', category: 'reacciones', description: 'Impactado y congelado' },

  // Amor & Ternura
  { code: '[lovely]', name: 'Enamorado Total', preview: '🥰', category: 'amor', description: 'Corazoncitos alrededor' },
  { code: '[loveface]', name: 'Beso con Amor', preview: '😘', category: 'amor', description: 'Lanzando beso tierno' },
  { code: '[cute]', name: 'Ultra Tierno / Kawaii', preview: '✨', category: 'amor', description: 'Ojos gigantes brillantes' },
  { code: '[angel]', name: 'Ángel Inocente', preview: '😇', category: 'amor', description: 'Aureola dorada celestial' },
  { code: '[proud]', name: 'Orgulloso de Ti', preview: '😌', category: 'amor', description: 'Sonrisa de satisfacción y calma' },

  // Divertidos & Especiales
  { code: '[cool]', name: 'Con Gafas de Sol', preview: '😎', category: 'divertidos', description: 'El más fachero del feed' },
  { code: '[greedy]', name: 'Ojos de Dinero', preview: '🤑', category: 'divertidos', description: 'Símbolos de dólares en ojos' },
  { code: '[evil]', name: 'Demonio Púrpura', preview: '👾', category: 'divertidos', description: 'Maldad graciosa' },
  { code: '[slap]', name: 'Cachetada / Bofetada', preview: '👋', category: 'divertidos', description: 'Mano dando palmada' },
  { code: '[nap]', name: 'Durmiendo / Zzz', preview: '😴', category: 'divertidos', description: 'Burbuja de sueño Zzz' },
  { code: '[wow]', name: 'Asombro WOW', preview: '😮', category: 'divertidos', description: 'Exclamación de impacto' },
  { code: '[joyful]', name: 'Ultra Feliz', preview: '🥳', category: 'divertidos', description: 'Fiesta y celebración' },
  { code: '[hehe]', name: 'Risa Secreta', preview: '🤭', category: 'divertidos', description: 'Mano tapando la risa' },
];

export const TikTokSecretEmojis: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmojis = TIKTOK_SECRET_EMOJIS.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch = item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1800);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Exclusivo de TikTok
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            46 Códigos Oficiales
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <Smile className="w-5 h-5 text-pink-600" />
          <span>Emojis Secretos y Ocultos de TikTok (Códigos entre Corchetes)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          TikTok cuenta con emojis secretos oficiales en 3D que solo aparecen cuando escribes el código exacto entre corchetes <code>[código]</code> en comentarios, videos y biografías. ¡Toca cualquier código para copiarlo al portapapeles!
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'todos', label: '✨ Todos los Emojis' },
            { id: 'emociones', label: '😄 Emociones' },
            { id: 'reacciones', label: '🔥 Reacciones Virales' },
            { id: 'amor', label: '💖 Amor & Ternura' },
            { id: 'divertidos', label: '🎉 Divertidos' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-pink-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-56">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar emoji (ej: love, cry)..."
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pink-500/20"
          />
        </div>
      </div>

      {/* Grid of Emojis */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {filteredEmojis.map((emoji) => {
          const isCopied = copiedCode === emoji.code;
          return (
            <button
              key={emoji.code}
              type="button"
              onClick={() => handleCopy(emoji.code)}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-between gap-1.5 active:scale-95 shadow-2xs text-center group ${
                isCopied
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-slate-50 hover:bg-white hover:border-pink-300 text-slate-800 border-slate-200'
              }`}
            >
              <div className="text-2xl transition-transform group-hover:scale-110 mb-0.5">
                {emoji.preview}
              </div>

              <div className="w-full">
                <span className="font-mono text-xs font-black text-pink-600 block truncate">
                  {emoji.code}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block truncate">
                  {emoji.name}
                </span>
              </div>

              <div className="text-[9px] font-bold mt-1 px-2 py-0.5 rounded-md bg-white border border-slate-100 flex items-center gap-1 shadow-2xs">
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 font-black">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-2.5 h-2.5 text-slate-400" />
                    <span className="text-slate-500">Copiar</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pro Tip Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-200/80 text-xs text-slate-700 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900">¿Cómo usar los emojis secretos en TikTok?</strong>
          <p className="mt-0.5 text-slate-600 leading-relaxed">
            Solo copia el código con corchetes (por ejemplo <code>[wicked]</code> o <code>[yummy]</code>) y pégalo en un comentario o en la descripción de tu video de TikTok. En cuanto se publique, la app de TikTok lo transformará automáticamente en el sticker exclusivo oficial.
          </p>
        </div>
      </div>
    </div>
  );
};
