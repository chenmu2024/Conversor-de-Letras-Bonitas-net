import React from 'react';
import { PageRoute } from '../types';
import { ROUTE_CONFIGS } from '../data/routeConfigs';
import { Sparkles, ArrowRight, Layers, Flame, Instagram, MessageCircle } from 'lucide-react';

interface RelatedSilosSectionProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
}

// Group routes by relevant silo relations
const RELATED_MAPPING: Record<PageRoute, PageRoute[]> = {
  inicio: ['letras-chidas', 'letras-tatuajes', 'nicks-free-fire', 'letras-chinas', 'letras-elegantes', 'instagram', 'free-fire', 'cursiva', 'letras-raras'],
  'letras-chidas': ['free-fire', 'nicks-free-fire', 'decorador', 'tiktok', 'letras-elegantes', 'simbolos', 'letras-raras'],
  'letras-elegantes': ['cursiva', 'letras-tatuajes', 'instagram', 'letras-chidas', 'contador-bio', 'circulos', 'goticas'],
  'letras-raras': ['letras-chinas', 'glitch', 'invertidas', 'letras-chidas', 'simbolos', 'goticas', 'decorador'],
  'letras-tatuajes': ['goticas', 'cursiva', 'letras-elegantes', 'simbolos', 'decorador', 'letras-raras'],
  'nicks-free-fire': ['free-fire', 'letras-chidas', 'decorador', 'simbolos', 'goticas', 'letras-raras'],
  'letras-chinas': ['letras-raras', 'simbolos', 'decorador', 'free-fire', 'tiktok', 'glitch'],
  'espacio-invisible': ['nicks-free-fire', 'free-fire', 'whatsapp', 'instagram', 'decorador', 'simbolos'],
  'nombres-parejas': ['nicks-free-fire', 'free-fire', 'letras-chidas', 'instagram', 'simbolos', 'decorador'],
  'abecedario': ['letras-elegantes', 'cursiva', 'goticas', 'letras-tatuajes', 'circulos', 'letras-chidas'],
  instagram: ['letras-elegantes', 'cursiva', 'contador-bio', 'tiktok', 'simbolos', 'circulos'],
  tiktok: ['letras-chidas', 'instagram', 'contador-bio', 'decorador', 'goticas', 'glitch'],
  whatsapp: ['letras-chidas', 'instagram', 'invertidas', 'circulos', 'contador-bio', 'simbolos'],
  'free-fire': ['letras-chidas', 'decorador', 'simbolos', 'goticas', 'glitch', 'letras-raras'],
  facebook: ['letras-chidas', 'instagram', 'whatsapp', 'cursiva', 'circulos', 'decorador'],
  cursiva: ['letras-elegantes', 'goticas', 'instagram', 'circulos', 'invertidas', 'contador-bio'],
  goticas: ['letras-chidas', 'cursiva', 'free-fire', 'glitch', 'decorador', 'simbolos'],
  invertidas: ['letras-raras', 'glitch', 'whatsapp', 'circulos', 'simbolos', 'cursiva'],
  circulos: ['letras-elegantes', 'invertidas', 'instagram', 'whatsapp', 'cursiva', 'contador-bio'],
  glitch: ['letras-raras', 'goticas', 'free-fire', 'decorador', 'invertidas', 'tiktok'],
  simbolos: ['letras-chidas', 'letras-raras', 'decorador', 'free-fire', 'instagram', 'whatsapp'],
  decorador: ['letras-chidas', 'free-fire', 'simbolos', 'tiktok', 'glitch', 'instagram'],
  'contador-bio': ['letras-elegantes', 'instagram', 'tiktok', 'whatsapp', 'cursiva', 'decorador'],
  'sobre-nosotros': ['politica-de-privacidad', 'politica-de-cookies', 'terminos-y-condiciones', 'contacto', 'inicio'],
  'politica-de-privacidad': ['politica-de-cookies', 'sobre-nosotros', 'terminos-y-condiciones', 'contacto', 'inicio'],
  'politica-de-cookies': ['politica-de-privacidad', 'terminos-y-condiciones', 'sobre-nosotros', 'contacto', 'inicio'],
  'terminos-y-condiciones': ['politica-de-privacidad', 'politica-de-cookies', 'sobre-nosotros', 'contacto', 'inicio'],
  contacto: ['sobre-nosotros', 'politica-de-privacidad', 'politica-de-cookies', 'terminos-y-condiciones', 'inicio'],
  '404': ['inicio', 'instagram', 'free-fire', 'letras-chidas', 'cursiva', 'sobre-nosotros'],
};

export const RelatedSilosSection: React.FC<RelatedSilosSectionProps> = ({
  currentRoute,
  onRouteChange,
}) => {
  const relatedKeys = RELATED_MAPPING[currentRoute] || RELATED_MAPPING.inicio;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mt-12 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Conversor de Letras Bonitas · Red de Herramientas
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
        Secciones del Conversor de Letras Bonitas y Tipografías Unicode
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-6 max-w-2xl">
        Descubre herramientas del Conversor de Letras Bonitas complementarias recomendadas para optimizar tus perfiles sociales y títulos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {relatedKeys.map((key) => {
          const cfg = ROUTE_CONFIGS[key];
          if (!cfg) return null;
          return (
            <button
              key={key}
              onClick={() => {
                onRouteChange(key);
                scrollToTop();
              }}
              className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200/70 hover:border-indigo-300 bg-slate-50/50 hover:bg-indigo-50/40 text-left transition-all hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cfg.label}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 font-mono">
                    {cfg.path}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {cfg.seoKeyword}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-bold text-indigo-600">
                <span>Abrir Conversor</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
