import React, { useState } from 'react';
import { 
  Trash2, 
  ClipboardPaste, 
  Sparkles, 
  ArrowDownUp, 
  CaseUpper, 
  CaseLower, 
  Type, 
  Share2, 
  Download, 
  Check, 
  RotateCcw, 
  SpellCheck,
  HelpCircle,
  Wrench,
  AlertTriangle,
  Undo2,
  Send
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface QuickActionBarProps {
  text: string;
  onTextChange: (newText: string) => void;
  onClear: () => void;
  onPaste: () => void;
  onRandomExample: () => void;
  onOpenFixerModal?: () => void;
  onOpenImageExport?: () => void;
  onOpenShareModal?: () => void;
  lastDeletedText?: string | null;
  onUndoClear?: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({
  text,
  onTextChange,
  onClear,
  onPaste,
  onRandomExample,
  onOpenFixerModal,
  onOpenImageExport,
  onOpenShareModal,
  lastDeletedText,
  onUndoClear,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const hasBrokenChars = text.includes('\uFFFD') || text.includes('');

  const toUpperCase = () => {
    onTextChange(text.toUpperCase());
  };

  const toLowerCase = () => {
    onTextChange(text.toLowerCase());
  };

  const toTitleCase = () => {
    const formatted = text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    onTextChange(formatted);
  };

  const toInvertedCase = () => {
    const formatted = (Array.from(text) as string[])
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join('');
    onTextChange(formatted);
  };

  const removeAccents = () => {
    const normalized = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    onTextChange(normalized);
  };

  const cleanBrokenChars = () => {
    const cleaned = text
      .replace(/\uFFFD/gu, '')
      .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '')
      .trim();
    onTextChange(cleaned);
  };

  const reverseText = () => {
    const reversed = Array.from(text).reverse().join('');
    onTextChange(reversed);
  };

  const handleShareLink = async () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('text', text);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl.toString());
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDownloadTxt = () => {
    if (!text) return;
    let content = `========================================================\n`;
    content += ` CONVERSOR DE LETRAS BONITAS - conversordeletrasbonitas.net\n`;
    content += ` Texto original: ${text}\n`;
    content += `========================================================\n\n`;

    FONT_GENERATORS.forEach((gen, index) => {
      content += `${index + 1}. [${gen.name}]:\n`;
      content += `${gen.transform(text)}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `letras-bonitas-${text.slice(0, 15).replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="space-y-3 pt-3 border-t border-slate-100">
      {/* Broken characters detector alert */}
      {hasBrokenChars && (
        <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-amber-950 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Detectamos signos de rombo negro () en tu texto.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cleanBrokenChars}
              className="px-3 py-1 bg-amber-800 hover:bg-amber-900 text-white font-extrabold rounded-xl text-xs transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Wrench className="w-3 h-3" />
              <span>Reparar</span>
            </button>
            {onOpenFixerModal && (
              <button
                type="button"
                onClick={onOpenFixerModal}
                className="px-2 py-1 text-amber-950 hover:bg-amber-100 rounded-lg text-xs font-bold"
              >
                ¿Por qué pasa?
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upper row: Case formatting & transformations */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-[11px] font-extrabold text-slate-700 mr-1 hidden sm:inline uppercase tracking-wider">
            Formato:
          </span>
          
          <button
            type="button"
            id="btn-case-upper"
            onClick={toUpperCase}
            disabled={!text}
            title="Convertir todo a MAYÚSCULAS"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <CaseUpper className="w-3.5 h-3.5" />
            <span>MAYÚS</span>
          </button>

          <button
            type="button"
            id="btn-case-lower"
            onClick={toLowerCase}
            disabled={!text}
            title="Convertir todo a minúsculas"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <CaseLower className="w-3.5 h-3.5" />
            <span>minús</span>
          </button>

          <button
            type="button"
            id="btn-case-title"
            onClick={toTitleCase}
            disabled={!text}
            title="Tipo Título (Primera Letra Mayúscula)"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Título</span>
          </button>

          <button
            type="button"
            id="btn-case-alternate"
            onClick={toInvertedCase}
            disabled={!text}
            title="aLtErNaR mAyÚsCuLaS y MiNúScUlAs"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>aLtErNaR</span>
          </button>

          <button
            type="button"
            id="btn-remove-accents"
            onClick={removeAccents}
            disabled={!text}
            title="Quitar tildes y acentos (á->a, é->e) para juegos que no aceptan acentos"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <SpellCheck className="w-3.5 h-3.5" />
            <span>Sin Tildes</span>
          </button>

          <button
            type="button"
            id="btn-reverse-text"
            onClick={reverseText}
            disabled={!text}
            title="Invertir orden de los caracteres"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Invertir</span>
          </button>
        </div>

        {/* Action utility buttons */}
        <div className="flex items-center gap-2 ml-auto">
          {onOpenFixerModal && (
            <button
              type="button"
              id="btn-why-diamonds"
              onClick={onOpenFixerModal}
              title="¿Por qué salen signos de interrogación  y cómo evitarlo?"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200/80 transition-all active:scale-95 shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>¿Signos ?</span>
            </button>
          )}

          <button
            type="button"
            id="btn-random-example"
            onClick={onRandomExample}
            title="Generar una combinación sorpresa con fuentes y decoraciones aleatorias"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 rounded-xl transition-all active:scale-95 shadow-xs hover:shadow-md hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            <span>🎲 Sorpréndeme</span>
          </button>

          <button
            type="button"
            id="btn-paste-clipboard"
            onClick={onPaste}
            title="Pegar texto desde el portapapeles"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200/70 transition-all active:scale-95 shadow-2xs"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pegar</span>
          </button>

          {text && (
            <button
              type="button"
              id="btn-clear-text"
              onClick={onClear}
              title="Borrar todo el texto escrito"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200/70 transition-all active:scale-95 shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Limpiar</span>
            </button>
          )}

          {!text && lastDeletedText && onUndoClear && (
            <button
              type="button"
              id="btn-undo-clear"
              onClick={onUndoClear}
              title="Deshacer borrado y recuperar el texto anterior"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-300 transition-all active:scale-95 shadow-2xs animate-bounce"
            >
              <Undo2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Deshacer Borrado</span>
            </button>
          )}
        </div>
      </div>

      {/* Lower row: Export and sharing helpers */}
      {text && (
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100/80 text-xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{FONT_GENERATORS.length} fuentes listas para copiar con 1 clic</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenImageExport && (
              <button
                type="button"
                id="btn-quick-export-image"
                onClick={onOpenImageExport}
                title="Generar tarjeta de imagen HD (PNG) para Instagram Story o WhatsApp"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-all active:scale-95 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                <span>📸 Crear Imagen HD</span>
              </button>
            )}

            {onOpenShareModal ? (
              <button
                type="button"
                id="btn-quick-viral-share"
                onClick={onOpenShareModal}
                title="Compartir este texto con amigos en WhatsApp, Telegram o redes sociales"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all active:scale-95 shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Compartir</span>
              </button>
            ) : (
              <button
                type="button"
                id="btn-share-whatsapp"
                onClick={() => {
                  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                  window.open(url, '_blank');
                }}
                title="Enviar texto directo por WhatsApp"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/90 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            )}

            <button
              type="button"
              id="btn-share-link"
              onClick={handleShareLink}
              title="Copiar enlace con este texto para compartir"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all active:scale-95 ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100/90 hover:bg-slate-200/90 text-slate-700'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copiar Enlace</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="btn-download-txt"
              onClick={handleDownloadTxt}
              title="Descargar todas las 80+ versiones en un archivo de texto .txt"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all active:scale-95 ${
                downloaded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100/90 hover:bg-slate-200/90 text-slate-700'
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>¡Descargado!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Descargar .TXT</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



