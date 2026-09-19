import React from 'react';
import { BookOpen, Clock, Users, ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { PageRoute } from '../types';

interface AuthorEditorialBoxProps {
  onRouteChange?: (route: PageRoute) => void;
  lastUpdated?: string;
}

export const AuthorEditorialBox: React.FC<AuthorEditorialBoxProps> = ({
  onRouteChange,
  lastUpdated = 'Septiembre 2026',
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black text-lg">
            🔍
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              Cómo verificamos la compatibilidad
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluación basada en Unicode y comprobaciones manuales seleccionadas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Última revisión: <strong className="text-slate-200">{lastUpdated}</strong></span>
        </div>
      </div>

      {/* Verified Platforms & Systems */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Entornos utilizados como referencia:
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          {['Chrome', 'Safari', 'Android', 'iOS', 'Instagram', 'TikTok', 'WhatsApp', 'Free Fire'].map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
          La compatibilidad puede variar según la versión de la aplicación, el sistema operativo, el dispositivo y las fuentes disponibles.
        </p>
      </div>

      {/* Technical Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-indigo-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Estándares Unicode</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Utilizamos bloques alfanuméricos matemáticos estándar (U+1D400–U+1D7FF) y símbolos universales para evitar caracteres incompatibles.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pruebas en Móviles</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Evaluamos la visualización en pantallas de diversos fabricantes para detectar glifos no soportados o cajas vacías.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Users className="w-3.5 h-3.5" />
            <span>Pautas de Accesibilidad</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Recomendamos un uso moderado de caracteres estilizados en nombres y biografías para mantener la legibilidad.
          </p>
        </div>
      </div>

      {onRouteChange && (
        <div className="flex justify-end pt-1">
          <a
            href="/sobre-nosotros/"
            onClick={(e) => {
              e.preventDefault();
              onRouteChange('sobre-nosotros');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Más sobre nuestro proyecto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
