import React from 'react';
import { Award, ShieldCheck, CheckCircle2, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface AuthorEditorialBoxProps {
  onRouteChange?: (route: PageRoute) => void;
  lastUpdated?: string;
  reviewer?: string;
}

export const AuthorEditorialBox: React.FC<AuthorEditorialBoxProps> = ({
  onRouteChange,
  lastUpdated = 'Agosto 2026',
  reviewer = 'Comité Editorial de Tipografía Digital & Estándares Unicode',
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black text-lg">
            ✍️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800/60">
                E-E-A-T Autoridad Editorial
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                <CheckCircle2 className="w-3 h-3" />
                Verificado
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Escrito y Auditado por el Equipo Editorial de Conversor de Letras Bonitas
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Última revisión: <strong className="text-slate-200">{lastUpdated}</strong></span>
        </div>
      </div>

      {/* Editorial Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-indigo-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Investigación Unicode</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Especialistas en bloques alfanuméricos matemáticos (U+1D400–U+1D7FF), alfabetos fonéticos y glifos de puntuación histórica.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Garantía de Compatibilidad</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Pruebas periódicas en motores de renderizado WebKit, Blink y Gecko en iOS 18+, Android 15+, Instagram, TikTok y Free Fire.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Users className="w-3.5 h-3.5" />
            <span>Accesibilidad Web (WCAG)</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Compromiso con el uso responsable de caracteres especiales para no perjudicar la lectura en software de asistencia para invidentes.
          </p>
        </div>
      </div>

      {/* Reviewer signature */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Revisión Técnica y Fact-Checking: <strong className="text-slate-200">{reviewer}</strong></span>
        </div>

        {onRouteChange && (
          <button
            type="button"
            onClick={() => onRouteChange('sobre-nosotros')}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Conoce a nuestro equipo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
