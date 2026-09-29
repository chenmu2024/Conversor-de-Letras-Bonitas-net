import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react';

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
};

export const UserRatingsSection: React.FC = () => {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('conversor_feedback');
      if (saved === 'yes' || saved === 'no') {
        setFeedback(saved);
      }

      const consented = localStorage.getItem('letras_cookies_analytics') === 'true';
      const analyticsWindow = window as AnalyticsWindow;
      const providerReady =
        typeof analyticsWindow.gtag === 'function' ||
        typeof analyticsWindow.plausible === 'function';

      setAnalyticsReady(consented && providerReady);
    } catch {
      setAnalyticsReady(false);
    }
  }, []);

  const handleFeedback = (val: 'yes' | 'no') => {
    setFeedback(val);

    try {
      localStorage.setItem('conversor_feedback', val);
    } catch {
      // localStorage may not be available or permitted
    }

    const analyticsWindow = window as AnalyticsWindow;
    if (typeof analyticsWindow.gtag === 'function') {
      analyticsWindow.gtag('event', 'tool_feedback', {
        value: val,
        page_path: window.location.pathname,
      });
    } else if (typeof analyticsWindow.plausible === 'function') {
      analyticsWindow.plausible('Tool Feedback', {
        props: {
          value: val,
          page: window.location.pathname,
        },
      });
    }
  };

  // Do not ask for feedback if the response cannot actually reach the site owner.
  if (!analyticsReady) return null;

  return (
    <section id="feedback-herramienta" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            ¿Te resultó útil esta herramienta?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Con tu consentimiento de analítica, esta valoración anónima nos ayuda a priorizar mejoras.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {feedback ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>¡Gracias por tu valoración!</span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleFeedback('yes')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 border border-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                <span>👍 Sí</span>
              </button>
              <button
                type="button"
                onClick={() => handleFeedback('no')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 border border-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                <ThumbsDown className="w-4 h-4 text-rose-600" />
                <span>👎 No</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
