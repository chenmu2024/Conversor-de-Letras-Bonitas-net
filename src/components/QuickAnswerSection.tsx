import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { RouteSeoData } from '../data/seoRouteData';

interface QuickAnswerSectionProps {
  seo: RouteSeoData;
  onNavigate?: (path: string) => void;
}

export const QuickAnswerSection: React.FC<QuickAnswerSectionProps> = ({ seo, onNavigate }) => {
  if (!seo.quickAnswer) return null;

  const { question, answer, relatedLink } = seo.quickAnswer;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) return; // let hash anchor jump natively
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <section 
      id="quick-answer"
      aria-labelledby="quick-answer-title"
      className="w-full max-w-5xl mx-auto mb-8 bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 sm:p-6 shadow-xs transition-colors"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mt-0.5">
          <HelpCircle className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
            Respuesta Rápida
          </span>
          <h2 id="quick-answer-title" className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2">
            {question}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {answer}
          </p>
          {relatedLink && (
            <div className="mt-3.5 pt-3 border-t border-blue-200/60">
              <a
                href={relatedLink.href}
                onClick={(e) => handleLinkClick(e, relatedLink.href)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors"
              >
                <span>{relatedLink.text}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
