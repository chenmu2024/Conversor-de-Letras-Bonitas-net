import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, MessageSquareHeart } from 'lucide-react';

interface ArticleHelpfulFeedbackProps {
  articleTitle?: string;
}

export const ArticleHelpfulFeedback: React.FC<ArticleHelpfulFeedbackProps> = ({
  articleTitle = 'esta guía técnica de tipografía y estándares Unicode',
}) => {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (localStorage.getItem(`feedback_${articleTitle}`) as 'yes' | 'no' | null) || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const handleVote = (type: 'yes' | 'no') => {
    if (feedback !== null) return;
    setFeedback(type);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`feedback_${articleTitle}`, type);
      } catch {
        // ignore localStorage errors
      }
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
      <div className="flex items-center gap-3 text-left">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
          <MessageSquareHeart className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-800">
            ¿Te ha resultado útil esta información?
          </h4>
          <p className="text-[11px] text-slate-500">
            Tu opinión nos ayuda a mantener y mejorar la calidad de nuestras guías tipográficas.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {feedback === null ? (
          <>
            <button
              type="button"
              onClick={() => handleVote('yes')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>👍 Sí, me ayudó</span>
            </button>
            <button
              type="button"
              onClick={() => handleVote('no')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300 text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
              <span>👎 No del todo</span>
            </button>
          </>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>¡Gracias por tu valoración!</span>
          </div>
        )}
      </div>
    </div>
  );
};
