import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, CheckCircle2, ListOrdered, Lightbulb } from 'lucide-react';
import { PageRoute } from '../types';
import { SEO_ROUTE_DATA } from '../data/seoRouteData';

interface FaqSectionProps {
  currentRoute?: PageRoute;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentRoute = 'inicio' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const routeData = SEO_ROUTE_DATA[currentRoute] || SEO_ROUTE_DATA.inicio;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 pt-10 border-t border-slate-200/80">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* 1. HOW-TO STEP BY STEP GUIDE (Triggers Google HowTo & Rich Snippets) */}
        <div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2.5 shadow-2xs">
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Tutorial Paso a Paso</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {routeData.guideTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {routeData.guideSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center mb-3 shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. PRO TIPS SECTION */}
        {routeData.proTips && routeData.proTips.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 shadow-2xs">
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-amber-800 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Consejos Pro de Formato y Viralidad:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-amber-900 leading-relaxed pl-1">
              {routeData.proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. FAQ ACCORDION (Matches Google FAQPage Schema) */}
        <div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-2.5 shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Dudas y Compatibilidad de Fuentes
            </h2>
          </div>

          <div className="space-y-3">
            {routeData.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-150"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/40 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. PLATFORM COMPATIBILITY FOOTER BANNER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/80 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-indigo-100">
                Compatible con Instagram, TikTok, WhatsApp, Free Fire, Discord y más.
              </div>
              <div className="text-[11px] text-slate-300">
                100% caracteres Unicode legales sin riesgo de baneo ni instalación de teclados extra.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

