import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { PLATFORM_LENGTH_REFERENCES } from '../data/platformLimitReferences';

interface PlatformLimitsProps {
  text: string;
}

export const PlatformLimits: React.FC<PlatformLimitsProps> = ({ text }) => {
  const charCount = text ? Array.from(text).length : 0;
  const isZalgoHeavy = /[\u0300-\u036f]{3,}/.test(text || '');

  return (
    <div className="mt-3 pt-3 border-t border-slate-100/90">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
          <span>Referencias de longitud:</span>
        </div>
        <div className="flex items-center gap-2">
          {isZalgoHeavy && (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              ⚠️ Zalgo extremo puede aumentar la longitud real
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            <Info className="w-3 h-3" />
            Valores orientativos; verifica reglas actuales
          </span>
          <span className="text-[11px] font-bold text-slate-700">
            <strong className="text-indigo-600 font-black">{charCount}</strong> caracteres
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {PLATFORM_LENGTH_REFERENCES.map((platform) => {
          const referenceMax = platform.referenceMax;
          const isOverReference = charCount > referenceMax;
          const isNearReference = charCount > referenceMax * 0.8 && !isOverReference;
          const percentage = Math.min(100, Math.round((charCount / referenceMax) * 100));

          return (
            <div
              key={platform.name}
              title={platform.status === 'verified'
                ? `Verificado el ${platform.lastVerified} para el alcance indicado`
                : 'Referencia histórica no verificada como límite oficial actual'}
              className={`p-2 rounded-xl border transition-all ${
                isOverReference
                  ? 'bg-rose-50/60 border-rose-200 text-rose-800'
                  : isNearReference
                  ? 'bg-amber-50/60 border-amber-200 text-amber-800'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="truncate">{platform.name}</span>
                <span className={`font-mono text-[10px] ${isOverReference ? 'text-rose-700 font-extrabold' : 'text-slate-700 font-semibold'}`}>
                  {charCount}/≈{referenceMax}
                </span>
              </div>

              <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverReference
                      ? 'bg-rose-500'
                      : isNearReference
                      ? 'bg-amber-500'
                      : 'bg-indigo-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {platform.status === 'verified' && platform.sourceUrl && (
                <a
                  href={platform.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex text-[10px] font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-2"
                  title={platform.scopeNote || platform.sourceTitle || 'Fuente oficial'}
                >
                  Fuente oficial · {platform.lastVerified}
                </a>
              )}

              {isOverReference && (
                <div className="flex items-center gap-1 mt-1 text-[10px] font-extrabold text-rose-600">
                  <ShieldAlert className="w-3 h-3 shrink-0" />
                  <span>Supera la referencia por {charCount - referenceMax}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
        Las cifras sin fuente se conservan como referencias históricas. Cuando una referencia tiene fuente oficial, mostramos también su fecha y alcance de verificación.
      </p>
    </div>
  );
};
