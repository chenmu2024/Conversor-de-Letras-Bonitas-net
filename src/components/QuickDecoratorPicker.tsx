import React from 'react';
import { Sparkles, Wand2, RotateCcw } from 'lucide-react';

interface QuickDecoratorPickerProps {
  currentText: string;
  onApplyDecoration: (decoratedText: string) => void;
}

const DECORATOR_PRESETS = [
  { name: 'Alas Gamer', wrap: (t: string) => `꧁༺ ${t} ༻꧂` },
  { name: 'Corona VIP', wrap: (t: string) => `👑 ${t} 👑` },
  { name: 'Estrellas', wrap: (t: string) => `✦✧ ${t} ✧✦` },
  { name: 'Corazones', wrap: (t: string) => `♥ ${t} ♥` },
  { name: 'Rayos FF', wrap: (t: string) => `⚡ ${t} ⚡` },
  { name: 'Flores', wrap: (t: string) => `✿ ${t} ✿` },
  { name: 'Líneas Pro', wrap: (t: string) => `┊ ${t} ┊` },
  { name: 'Flecha Bio', wrap: (t: string) => `╰┈➤ ${t}` },
];

export const QuickDecoratorPicker: React.FC<QuickDecoratorPickerProps> = ({
  currentText,
  onApplyDecoration,
}) => {
  // Strip previous common frame symbols so decorators do not endlessly nest like ꧁༺ ꧁༺ Texto ༻꧂ ༻꧂
  const stripExistingDecorators = (text: string) => {
    return text.replace(/[꧁༺༻꧂👑✦✧♥⚡✿┊╰┈➤]/g, '').trim();
  };

  const rawBase = stripExistingDecorators(currentText) || 'Tu Texto';
  const hasDecorators = /[꧁༺༻꧂👑✦✧♥⚡✿┊╰┈➤]/.test(currentText);

  return (
    <div className="bg-slate-50/90 rounded-2xl p-2.5 border border-slate-200/80 mb-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Decoradores y Marcos de Texto (1-Click):</span>
        </span>
        <div className="flex items-center gap-2">
          {hasDecorators && (
            <button
              type="button"
              onClick={() => onApplyDecoration(rawBase === 'Tu Texto' ? '' : rawBase)}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 hover:text-rose-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 transition-colors"
              title="Quitar marcos y dejar solo el texto original"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Quitar marcos</span>
            </button>
          )}
          <span className="text-[10px] text-slate-600 font-semibold hidden sm:inline">
            Reemplaza el marco sin anidar
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {DECORATOR_PRESETS.map((preset) => {
          const preview = preset.wrap(rawBase);
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                const baseToWrap = stripExistingDecorators(currentText) || currentText || 'Tu Texto';
                onApplyDecoration(preset.wrap(baseToWrap));
              }}
              title={`Aplicar estilo: ${preset.name}`}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 border border-slate-200 text-xs font-bold text-slate-800 transition-all active:scale-95 whitespace-nowrap shadow-2xs shrink-0"
            >
              <span className="text-[10px] text-slate-600 mr-1 font-bold">[{preset.name}]</span>
              <span className="font-mono">{preview}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
