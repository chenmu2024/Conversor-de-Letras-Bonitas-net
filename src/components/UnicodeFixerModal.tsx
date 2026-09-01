import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Wrench, 
  Smartphone, 
  ShieldCheck, 
  Info, 
  X,
  ExternalLink
} from 'lucide-react';

interface UnicodeFixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onRepair: (fixedText: string) => void;
}

export const UnicodeFixerModal: React.FC<UnicodeFixerModalProps> = ({
  isOpen,
  onClose,
  text,
  onRepair,
}) => {
  if (!isOpen) return null;

  const hasReplacementChar = text.includes('\uFFFD') || text.includes('');
  
  const handleRepairText = () => {
    // Strip replacement chars and lone surrogates
    const cleaned = text
      .replace(/\uFFFD/gu, '')
      .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '')
      .trim();
    onRepair(cleaned);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              
            </div>
            <div>
              <h3 className="font-extrabold font-heading text-lg text-slate-900 flex items-center gap-2">
                <span>¿Por qué salen rombos negros con signo de interrogación ()?</span>
              </h3>
              <p className="text-xs text-slate-600">
                Diagnóstico de caracteres rotos y guía de compatibilidad universal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors border border-slate-200/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-700 text-xs sm:text-sm">
          {/* Active Repair Card if text has broken characters */}
          {hasReplacementChar && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Tu texto actual contiene símbolos dañados ()</span>
                </p>
                <p className="text-xs text-rose-700 mt-0.5">
                  Podemos limpiar y reparar el texto automáticamente eliminando las partes corruptas.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRepairText}
                className="shrink-0 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Reparar Ahora</span>
              </button>
            </div>
          )}

          {/* 4 Causes Explanation */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>Las 4 causas principales de este problema:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                  <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-black">1</span>
                  <span>Dispositivo o celular antiguo</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Las letras bonitas son caracteres <strong>Unicode de planos matemáticos</strong>. Teléfonos con versiones muy viejas de Android o Windows básico no tienen instaladas esas fuentes y muestran  en su lugar.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                  <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-black">2</span>
                  <span>Pegado en @Nombre de Usuario</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Los campos de <strong>@usuario (Handle)</strong> de Instagram, TikTok o Twitter prohíben caracteres especiales. <em>Solo deben pegarse en la Biografía (Bio), Nombre o Publicaciones</em>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                  <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-black">3</span>
                  <span>Corte de texto a la mitad</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cada letra especial ocupa 2 o 4 bytes. Si una app corta el texto bruscamente por límite de caracteres, el carácter queda dividido en 2 mitades rotas (Surrogate pair roto) y se transforma en .
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs mb-1">
                  <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-black">4</span>
                  <span>Juegos con filtro estricto</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Algunos juegos guardan los nicks en bases de datos antiguas (ASCII). Si no aceptan símbolos góticos o zalgo, rechazan el texto. Para ellos, usa <strong>Small Caps</strong> o <strong>Sans Negrita</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* 100% Safe Recommendations */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
            <h5 className="font-extrabold text-emerald-950 text-xs sm:text-sm flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Tipografías con 100% de Compatibilidad Universal:</span>
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-white rounded-xl border border-emerald-100 text-center font-bold text-slate-800">
                𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀
              </div>
              <div className="p-2 bg-white rounded-xl border border-emerald-100 text-center font-serif font-bold text-slate-800">
                𝐁𝐨𝐥𝐝 𝐒𝐞𝐫𝐢𝐟
              </div>
              <div className="p-2 bg-white rounded-xl border border-emerald-100 text-center font-medium text-slate-800">
                ᴛᴇxᴛ sᴍᴀʟʟ ᴄᴀᴘs
              </div>
              <div className="p-2 bg-white rounded-xl border border-emerald-100 text-center italic text-slate-800">
                𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴
              </div>
            </div>
            <p className="text-[11px] text-emerald-800 mt-2.5">
              💡 Estos estilos se ven de forma idéntica y perfecta en el 99.9% de iPhones, teléfonos Android (incluso modelos viejos), iPads y computadoras sin rombos ni errores.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Conversor de Letras Bonitas • Motor Unicode Seguro
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
