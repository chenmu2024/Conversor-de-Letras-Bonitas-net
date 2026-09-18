import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, Sliders, ExternalLink } from 'lucide-react';
import { PageRoute } from '../types';

interface CookieConsentBannerProps {
  onRouteChange: (route: PageRoute) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onRouteChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Environmental feature flags for third-party scripts (safeguarded for Node/SSR prerender)
  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});
  const analyticsAvailable = env.VITE_ENABLE_ANALYTICS === 'true';
  const adsAvailable = env.VITE_ENABLE_ADS === 'true';

  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [adsEnabled, setAdsEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('letras_cookie_consent');
    const savedAnalytics = localStorage.getItem('letras_cookies_analytics');
    const savedAds = localStorage.getItem('letras_cookies_ads');

    setAnalyticsEnabled(savedAnalytics === 'true');
    setAdsEnabled(savedAds === 'true');

    if (!consent) {
      // Delay slightly for smooth page load
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Expose opener globally so Footer can trigger it and re-sync states
  useEffect(() => {
    (window as unknown as { openCookiePreferences?: () => void }).openCookiePreferences = () => {
      const savedAnalytics = localStorage.getItem('letras_cookies_analytics');
      const savedAds = localStorage.getItem('letras_cookies_ads');

      setAnalyticsEnabled(savedAnalytics === 'true');
      setAdsEnabled(savedAds === 'true');

      setShowConfigModal(true);
      setIsOpen(true);
    };
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('letras_cookie_consent', 'all');

    localStorage.setItem('letras_cookies_analytics', analyticsAvailable ? 'true' : 'false');
    localStorage.setItem('letras_cookies_ads', adsAvailable ? 'true' : 'false');

    setAnalyticsEnabled(analyticsAvailable);
    setAdsEnabled(adsAvailable);

    setIsOpen(false);
    setShowConfigModal(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('letras_cookie_consent', 'essential');
    localStorage.setItem('letras_cookies_analytics', 'false');
    localStorage.setItem('letras_cookies_ads', 'false');
    setAnalyticsEnabled(false);
    setAdsEnabled(false);
    setIsOpen(false);
    setShowConfigModal(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('letras_cookie_consent', 'custom');
    if (analyticsAvailable) {
      localStorage.setItem('letras_cookies_analytics', analyticsEnabled ? 'true' : 'false');
    } else {
      localStorage.setItem('letras_cookies_analytics', 'false');
    }
    if (adsAvailable) {
      localStorage.setItem('letras_cookies_ads', adsEnabled ? 'true' : 'false');
    } else {
      localStorage.setItem('letras_cookies_ads', 'false');
    }
    setIsOpen(false);
    setShowConfigModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Consent Floating Banner */}
      {!showConfigModal && (
        <div
          id="cookie-consent-banner"
          className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-black text-sm text-white">
                  Valoramos tu Privacidad y Preferencias
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Este sitio utiliza almacenamiento local y cookies técnicas para recordar tus preferencias. Si en el futuro se habilitan servicios analíticos o publicitarios de terceros, podrás decidir si los aceptas desde este panel.{' '}
                  <button
                    onClick={() => {
                      onRouteChange('politica-de-privacidad');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-bold underline inline-flex items-center gap-1"
                  >
                    <span>Leer política</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfigModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configurar</span>
              </button>

              <button
                type="button"
                onClick={handleEssentialOnly}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 border border-slate-700"
              >
                <span>Solo esenciales</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 active:scale-95"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Aceptar todas</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Custom Preferences Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6 text-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-indigo-600" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Preferencias de Privacidad y Cookies
                </h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs">
              {/* Essential */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span>Cookies Técnicas y Esenciales</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-black uppercase">
                      Obligatorias
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Necesarias para la navegación básica, almacenamiento local de fuentes favoritas y recordar tu consentimiento.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="mt-1 w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-not-allowed opacity-80"
                />
              </div>

              {/* Analytics - only displayed if enabled via environment flag */}
              {analyticsAvailable && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900">Cookies de Rendimiento y Análisis</span>
                    <p className="text-slate-600 leading-relaxed">
                      Nos ayudan a entender de forma completamente anónima qué estilos de letras son más populares para mejorar la herramienta.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                  />
                </div>
              )}

              {/* Advertising - only displayed if enabled via environment flag */}
              {adsAvailable && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900">Cookies Publicitarias de Terceros</span>
                    <p className="text-slate-600 leading-relaxed">
                      Permiten mostrar publicidad relevante y financiar los servidores para mantener la web 100% gratuita.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={adsEnabled}
                    onChange={(e) => setAdsEnabled(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all text-center"
              >
                Rechazar no esenciales
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-sm transition-all text-center"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
