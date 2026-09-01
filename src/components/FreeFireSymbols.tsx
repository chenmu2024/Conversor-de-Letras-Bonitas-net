import React, { useState } from 'react';
import { Sparkles, Copy, Check, Flame, ShieldAlert, Crosshair } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

const FF_SYMBOL_GROUPS = [
  {
    title: 'Ⓥ Verificado e Insignias de Influencer',
    symbols: ['Ⓥ', '🅅', 'ⓥ', '👑', '亗', '🏆', '⭐', '✪'],
  },
  {
    title: '꧁༺ Alas y Marcos de Nick ༻꧂',
    symbols: ['꧁༺', '༻꧂', '╰┈➤', '«', '»', '〈', '〉', '┊'],
  },
  {
    title: '⚡ Rayos, Armas y Combate ⚔️',
    symbols: ['⚡', '⚔️', '☠️', '🎯', '💥', '🔪', '†', '☣️'],
  },
  {
    title: '🌸 Japoneses y Letras Chinas FF',
    symbols: ['九', '竜', '鬼', '殺', '龍', '神', '王', '炎'],
  },
  {
    title: '♠️ Cartas de Póker y Figuras',
    symbols: ['♠️', '♣️', '♦️', '♥️', '♣', '♠', '♦', '♥'],
  },
];

export const FreeFireSymbols: React.FC = () => {
  const [copiedSym, setCopiedSym] = useState<string | null>(null);

  const handleCopy = (sym: string) => {
    navigator.clipboard.writeText(sym);
    setCopiedSym(sym);
    setTimeout(() => setCopiedSym(null), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block mb-1">
          Gamer Symbols Library for Free Fire
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-amber-500" />
          <span>Símbolos Insanos y "V de Verificado" Compatibles con Free Fire</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Toca cualquier símbolo para copiarlo al portapapeles y pegarlo en tu Nick de juego.
        </p>
      </div>

      {/* Invisible Space Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div>
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            Espacio Invisible [ㅤ] para Separar Nombres
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Copia el espacio transparente aceptado por Garena para separar palabras en tu nick.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(INVISIBLE_SPACE)}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
            copiedSym === INVISIBLE_SPACE
              ? 'bg-emerald-500 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
          }`}
        >
          {copiedSym === INVISIBLE_SPACE ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>¡Espacio [ㅤ] Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Espacio Invisible</span>
            </>
          )}
        </button>
      </div>

      {/* Symbol Groups */}
      <div className="space-y-5">
        {FF_SYMBOL_GROUPS.map((group) => (
          <div key={group.title} className="space-y-2">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {group.title}
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {group.symbols.map((sym, i) => {
                const isCopied = copiedSym === sym;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleCopy(sym)}
                    className={`p-3 rounded-xl border text-base font-black transition-all text-center flex flex-col items-center justify-center ${
                      isCopied
                        ? 'bg-emerald-600 text-white border-emerald-600 scale-105'
                        : 'bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-slate-900 border-slate-200'
                    }`}
                  >
                    <span>{sym}</span>
                    <span className="text-[9px] font-mono mt-1 opacity-60">
                      {isCopied ? '¡Copiado!' : 'Copiar'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
