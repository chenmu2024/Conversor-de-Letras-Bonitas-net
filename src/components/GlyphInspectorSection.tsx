import React, { useState } from 'react';
import { Search, Code2, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface GlyphInspectorSectionProps {
  currentText?: string;
}

export const GlyphInspectorSection: React.FC<GlyphInspectorSectionProps> = ({ currentText = '𝓛' }) => {
  const [inspectChar, setInspectChar] = useState<string>(currentText[0] || '𝓛');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Compute Unicode metrics
  const char = inspectChar || 'A';
  const codePoint = char.codePointAt(0) || 0;
  const hex = codePoint.toString(16).toUpperCase().padStart(4, '0');
  const unicodeUPlus = `U+${hex}`;
  const htmlDecimal = `&#${codePoint};`;
  const htmlHex = `&#x${hex};`;
  const jsEscape = `\\u{${hex}}`;

  const handleCopy = (field: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1600);
  };

  const SAMPLE_GLYPHS = ['𝓛', '𝕱', '🅐', '𝔐', '𝕏', '꧁', '亗', '★', 'ツ', '✿', 'ㅤ'];

  return (
    <section id="inspector-unicode-letras" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold mb-2">
            <Terminal className="w-3.5 h-3.5 text-slate-700" />
            <span>Conversor de Letras Bonitas · Inspector de Glifos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Inspector de Glifos en el Conversor de Letras Bonitas
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Inspecciona en el Conversor de Letras Bonitas el punto de código hexadecimal, entidad HTML y escape de JavaScript de cualquier letra bonita o símbolo.
          </p>
        </div>

        {/* Preset quick test glyphs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-600 mr-1">Probar:</span>
          {SAMPLE_GLYPHS.map((g, idx) => (
            <button
              key={idx}
              onClick={() => setInspectChar(g)}
              className={`w-7 h-7 rounded-lg text-xs font-bold border transition-all flex items-center justify-center ${
                inspectChar === g
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {g === 'ㅤ' ? '␣' : g}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Giant Display Box */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Glifo Seleccionado
          </span>
          <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center text-5xl font-black mb-4 border border-white/20">
            {char === 'ㅤ' ? <span className="text-xs text-amber-300 font-mono">[Espacio U+3164]</span> : char}
          </div>

          <input
            type="text"
            maxLength={2}
            value={inspectChar}
            onChange={(e) => setInspectChar(e.target.value)}
            className="w-28 text-center py-1.5 px-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white font-bold focus:outline-none focus:bg-white/20"
            placeholder="Pegar..."
          />
          <span className="text-[11px] text-slate-400 mt-2">Pega o escribe un caracter</span>
        </div>

        {/* Right: Technical Table */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Unicode Point */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Punto de Código Unicode
              </span>
              <code className="text-sm font-black text-indigo-700 font-mono">{unicodeUPlus}</code>
            </div>
            <button
              onClick={() => handleCopy('uplus', unicodeUPlus)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="Copiar"
            >
              {copiedField === 'uplus' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* HTML Decimal Entity */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Entidad HTML Decimal
              </span>
              <code className="text-sm font-black text-slate-900 font-mono">{htmlDecimal}</code>
            </div>
            <button
              onClick={() => handleCopy('dec', htmlDecimal)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="Copiar"
            >
              {copiedField === 'dec' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* HTML Hex Entity */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Entidad HTML Hexadecimal
              </span>
              <code className="text-sm font-black text-slate-900 font-mono">{htmlHex}</code>
            </div>
            <button
              onClick={() => handleCopy('hex', htmlHex)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="Copiar"
            >
              {copiedField === 'hex' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* JavaScript Unicode Escape */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Escape JavaScript / ES6
              </span>
              <code className="text-sm font-black text-emerald-700 font-mono">{jsEscape}</code>
            </div>
            <button
              onClick={() => handleCopy('js', jsEscape)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              title="Copiar"
            >
              {copiedField === 'js' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
