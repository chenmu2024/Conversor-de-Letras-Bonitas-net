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
      className="w-full max-w-5xl mx-auto my-6 bg-blue-50/50 border border-blue-200/70 rounded-xl p-4 sm:p-5 transition-colors"
    >
      <div className="flex items-start gap-3 sm:gap-3.5">
        <div className="shrink-0 w-7 h-7 rounded-lg bg-blue-600/90 text-white flex items-center justify-center mt-0.5">
          <HelpCircle className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide block mb-1">
            Respuesta Rápida
          </span>
          <h2 id="quick-answer-title" className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-1.5">
            {question}
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
            {answer}
          </p>
          {relatedLink && (
            <div className="mt-3 pt-2.5 border-t border-blue-200/60">
              <a
                href={relatedLink.href}
                onClick={(e) => handleLinkClick(e, relatedLink.href)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors"
              >
                <span>{relatedLink.text}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
