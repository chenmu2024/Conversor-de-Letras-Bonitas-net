import React from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

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
  const textToWrap = currentText.trim() || 'Tu Texto';

  return (
    <div className="bg-slate-50/90 rounded-2xl p-2.5 border border-slate-200/80 mb-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Decoradores y Marcos de Texto (1-Click):</span>
        </span>
        <span className="text-[10px] text-slate-400 font-semibold hidden sm:inline">
          Encuadra tu texto con 1 clic
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {DECORATOR_PRESETS.map((preset) => {
          const preview = preset.wrap(textToWrap);
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onApplyDecoration(preset.wrap(currentText || 'Tu Texto'))}
              title={`Aplicar estilo: ${preset.name}`}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 border border-slate-200 text-xs font-bold text-slate-800 transition-all active:scale-95 whitespace-nowrap shadow-2xs shrink-0"
            >
              <span className="text-[10px] text-slate-400 mr-1 font-semibold">[{preset.name}]</span>
              <span className="font-mono">{preview}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
