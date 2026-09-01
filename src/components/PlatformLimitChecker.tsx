import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

interface PlatformLimitCheckerProps {
  text: string;
}

interface PlatformLimit {
  name: string;
  limit: number;
  unit: string;
  target: 'Nick / Nombre' | 'Biografía' | 'Estado / Tweet';
}

const PLATFORM_LIMITS: PlatformLimit[] = [
  { name: 'Free Fire Nick', limit: 12, unit: 'caracteres', target: 'Nick / Nombre' },
  { name: 'TikTok Nombre', limit: 30, unit: 'caracteres', target: 'Nick / Nombre' },
  { name: 'Instagram Bio', limit: 150, unit: 'caracteres', target: 'Biografía' },
  { name: 'WhatsApp Info', limit: 139, unit: 'caracteres', target: 'Estado / Tweet' },
  { name: 'Twitter / X', limit: 280, unit: 'caracteres', target: 'Estado / Tweet' },
];

export const PlatformLimitChecker: React.FC<PlatformLimitCheckerProps> = ({ text }) => {
  const charCount = text ? Array.from(text).length : 0;

  // Check compatibility (e.g. invalid control chars or extremely heavy zalgo)
  const isZalgoHeavy = /[\u0300-\u036f]{3,}/.test(text);

  return (
    <div className="w-full bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Verificador de Límites de Redes Sociales y Compatibilidad</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
            {charCount} caracteres
          </span>
          {isZalgoHeavy ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <AlertTriangle className="w-3 h-3" /> Zalgo intenso (podría no caber en juegos)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> 100% Compatible en Juegos & Apps
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {PLATFORM_LIMITS.map((p) => {
          const isOver = charCount > p.limit;
          const isClose = charCount >= p.limit * 0.8 && !isOver;
          const remaining = p.limit - charCount;

          return (
            <div
              key={p.name}
              className={`p-2 rounded-lg border text-xs flex flex-col justify-between transition-colors ${
                isOver
                  ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                  : isClose
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                  : 'bg-white border-slate-200/80 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold truncate text-[11px]">{p.name}</span>
                {isOver ? (
                  <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] font-medium pt-1 border-t border-slate-100">
                <span className="text-slate-500">{charCount}/{p.limit}</span>
                <span className={`font-bold ${isOver ? 'text-rose-600 font-black' : isClose ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {isOver ? `+${charCount - p.limit} excede` : `${remaining} libres`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
