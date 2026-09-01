import React, { useState } from 'react';
import { INVISIBLE_SPACE, INVISIBLE_SPACE_BRAILLE } from '../data/symbols';
import { Copy, Check, Space, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const InvisibleSpaceCard: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [testInput, setTestInput] = useState<string>('');

  const copySpace = async (type: 'single' | 'double' | 'braille', textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div id="espacio-invisible-seccion" className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 text-slate-800 shadow-xs border border-slate-200/90 mb-8 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Space className="w-4 h-4" />
            </span>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
              Espacio Invisible para Free Fire, Instagram & WhatsApp
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              100% Funcional
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Copia el carácter invisible <code className="bg-slate-100 px-2 py-0.5 rounded-md text-indigo-600 font-mono font-bold border border-slate-200">[ㅤ]</code> (Hangul Filler <span className="text-slate-500">U+3164</span>) para nombres invisibles en Free Fire, saltos de línea limpios en Instagram Bio y mensajes vacíos de WhatsApp.
          </p>
        </div>

        {/* Quick Action Copy Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Single Space */}
          <button
            id="btn-copy-single-space"
            onClick={() => copySpace('single', INVISIBLE_SPACE)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-sm active:scale-95 ${
              copiedType === 'single'
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
            }`}
          >
            {copiedType === 'single' ? (
              <>
                <Check className="w-4 h-4 stroke-[3] animate-pulse" />
                <span>¡Copiado (1x)!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar 1 Espacio</span>
              </>
            )}
          </button>

          {/* Double Space */}
          <button
            id="btn-copy-double-space"
            onClick={() => copySpace('double', INVISIBLE_SPACE + INVISIBLE_SPACE)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 active:scale-95 ${
              copiedType === 'double'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'text-slate-700'
            }`}
          >
            {copiedType === 'double' ? (
              <>
                <Check className="w-4 h-4 stroke-[3] animate-pulse" />
                <span>¡Copiado (2x)!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Doble [ㅤㅤ]</span>
              </>
            )}
          </button>

          {/* Braille Blank Space */}
          <button
            id="btn-copy-braille-space"
            onClick={() => copySpace('braille', INVISIBLE_SPACE_BRAILLE)}
            title="Espacio invisible alternativo (Braille U+2800) si el juego bloquea el Hangul Filler"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 active:scale-95 ${
              copiedType === 'braille'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'text-slate-700'
            }`}
          >
            {copiedType === 'braille' ? (
              <>
                <Check className="w-4 h-4 stroke-[3] animate-pulse" />
                <span>¡Copiado Braille!</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Braille [⠀]</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive test scratchpad */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <input
            id="invisible-space-test-input"
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Pega aquí (Ctrl+V o Mantén presionado) para probar tu espacio invisible..."
            className="w-full px-4 py-2.5 text-xs font-mono bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        {testInput && (
          <div className="flex items-center gap-3 text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
            <span>Longitud detectada: {testInput.length} caracteres invisibles</span>
            <button
              onClick={() => setTestInput('')}
              className="text-slate-500 hover:text-rose-600 underline text-[11px]"
            >
              Borrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

