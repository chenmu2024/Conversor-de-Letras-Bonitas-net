import React from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PlatformLimitsProps {
  text: string;
}

interface PlatformLimit {
  name: string;
  max: number;
  iconName: string;
  description: string;
}

const LIMITS: PlatformLimit[] = [
  { name: 'Free Fire Nick', max: 12, iconName: 'FF', description: 'Máximo 12 caracteres en Garena Free Fire' },
  { name: 'TikTok Nombre', max: 30, iconName: 'TT', description: 'Máximo 30 caracteres en nombre de TikTok' },
  { name: 'WhatsApp Info', max: 139, iconName: 'WA', description: 'Máximo 139 caracteres en Info de WhatsApp' },
  { name: 'Instagram Bio', max: 150, iconName: 'IG', description: 'Máximo 150 caracteres en biografía de Instagram' },
  { name: 'Twitter / X Post', max: 280, iconName: 'X', description: 'Máximo 280 caracteres en publicación' },
];

export const PlatformLimits: React.FC<PlatformLimitsProps> = ({ text }) => {
  const charCount = text ? Array.from(text).length : 0;
  const isZalgoHeavy = /[\u0300-\u036f]{3,}/.test(text || '');

  return (
    <div className="mt-3 pt-3 border-t border-slate-100/90">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Límites de Redes y Compatibilidad:</span>
        </div>
        <div className="flex items-center gap-2">
          {isZalgoHeavy ? (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              ⚠️ Zalgo extremo (posible recorte en juegos)
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ✓ 100% Compatible en Juegos y Redes
            </span>
          )}
          <span className="text-[11px] font-bold text-slate-700">
            <strong className="text-indigo-600 font-black">{charCount}</strong> caracteres
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {LIMITS.map((platform) => {
          const isOver = charCount > platform.max;
          const isNear = charCount > platform.max * 0.8 && !isOver;
          const percentage = Math.min(100, Math.round((charCount / platform.max) * 100));

          return (
            <div
              key={platform.name}
              title={platform.description}
              className={`p-2 rounded-xl border transition-all ${
                isOver
                  ? 'bg-rose-50/60 border-rose-200 text-rose-800'
                  : isNear
                  ? 'bg-amber-50/60 border-amber-200 text-amber-800'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="truncate">{platform.name}</span>
                <span className={`font-mono text-[10px] ${isOver ? 'text-rose-600 font-extrabold' : ''}`}>
                  {charCount}/{platform.max}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOver
                      ? 'bg-rose-500'
                      : isNear
                      ? 'bg-amber-500'
                      : 'bg-indigo-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {isOver && (
                <div className="flex items-center gap-1 mt-1 text-[10px] font-extrabold text-rose-600">
                  <ShieldAlert className="w-3 h-3 shrink-0" />
                  <span>Excede por {charCount - platform.max}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
