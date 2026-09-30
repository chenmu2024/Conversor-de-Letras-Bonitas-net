import React from 'react';
import { ArrowRight, MessageCircleQuestion } from 'lucide-react';
import { PageRoute } from '../types';
import { getQuickAnswerForRoute } from '../data/quickAnswers';

interface QuickAnswerSectionProps {
  currentRoute: PageRoute;
}

export const QuickAnswerSection: React.FC<QuickAnswerSectionProps> = ({ currentRoute }) => {
  const answer = getQuickAnswerForRoute(currentRoute);
  if (!answer) return null;

  return (
    <section
      id="quick-answer"
      aria-labelledby="quick-answer-title"
      className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-xl bg-white p-2 text-indigo-600 border border-indigo-100 shrink-0">
          <MessageCircleQuestion className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-1">
            Respuesta rápida
          </p>
          <h2 id="quick-answer-title" className="text-base sm:text-lg font-extrabold text-slate-900">
            {answer.question}
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700">
            {answer.answer}
          </p>
          {answer.relatedLink && (
            <a
              href={answer.relatedLink.href}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900"
            >
              <span>{answer.relatedLink.text}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
