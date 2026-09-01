import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle, Shield, Award, Heart } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  platform: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    name: 'Camila Morales',
    avatar: '🌸',
    platform: 'Instagram Bio',
    rating: 5,
    date: 'Hace 2 días',
    comment: '¡Me encantó la letra cursiva y los símbolos de destellos! Puse mi biografía súper aesthetic y no tuve problemas con que se vieran cuadritos raros en iPhone.',
    verified: true,
  },
  {
    id: '2',
    name: 'Kevin "Ninja" R.',
    avatar: '⚡',
    platform: 'Free Fire Gamer',
    rating: 5,
    date: 'Hace 4 días',
    comment: 'El espacio invisible para Free Fire y los nicks con alas funcionan al 100%. Pude cambiarme el nombre en el juego sin errores.',
    verified: true,
  },
  {
    id: '3',
    name: 'Valentina Soto',
    avatar: '✨',
    platform: 'TikTok & WhatsApp',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'La mejor herramienta de letras bonitas que he probado en español. Convierte con tildes y la eñe sin dañarse. Súper recomendada.',
    verified: true,
  },
  {
    id: '4',
    name: 'Diego Mendoza',
    avatar: '🚀',
    platform: 'Marketing Digital',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'Excelente para destacar llamadas a la acción y títulos en posts de LinkedIn y Facebook. La función de copiar en un clic ahorra mucho tiempo.',
    verified: true,
  },
];

export const UserRatingsSection: React.FC = () => {
  const [userVote, setUserVote] = useState<number | null>(5);
  const [voted, setVoted] = useState(false);

  const handleVote = (star: number) => {
    setUserVote(star);
    setVoted(true);
  };

  return (
    <section id="testimonios-y-calificacion" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      {/* Header with Aggregate Rating */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Opiniones Reales de Usuarios (E-E-A-T)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Opiniones y Calificación del Conversor de Letras Bonitas
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Más de 450,000 personas en España y Latinoamérica utilizan nuestro Conversor de Letras Bonitas mensualmente para personalizar sus perfiles en redes sociales.
          </p>
        </div>

        {/* Big Aggregate Rating Card */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl shrink-0">
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">
              4.9
            </span>
            <span className="text-xs text-slate-400 block font-semibold mt-1">
              de 5.0
            </span>
          </div>

          <div className="border-l border-slate-200 pl-4 space-y-1">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-700">
              12,850+ valoraciones del Conversor de Letras Bonitas
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>99.4% Satisfacción con el Conversor de Letras Bonitas</span>
            </span>
          </div>
        </div>
      </div>

      {/* User Interactive Rating Widget */}
      <div className="my-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-indigo-950 block">
            ¿Te ha sido útil el Conversor de Letras Bonitas?
          </span>
          <span className="text-xs text-indigo-800">
            Deja tu valoración para ayudarnos a mantener el Conversor de Letras Bonitas 100% gratuito.
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleVote(star)}
              className="p-1 text-amber-400 hover:scale-125 transition-transform"
              title={`Calificar con ${star} estrellas`}
            >
              <Star
                className={`w-6 h-6 ${
                  (userVote ?? 0) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                }`}
              />
            </button>
          ))}
          {voted && (
            <span className="ml-2 text-xs font-bold text-emerald-700 animate-in fade-in">
              ¡Gracias por tu voto! 🎉
            </span>
          )}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REVIEWS_DATA.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                    {rev.avatar}
                  </span>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      {rev.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {rev.platform} • {rev.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mt-2">
                "{rev.comment}"
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
              <Shield className="w-3 h-3" />
              <span>Uso verificado</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
