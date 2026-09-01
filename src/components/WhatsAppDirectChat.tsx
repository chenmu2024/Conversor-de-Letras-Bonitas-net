import React, { useState } from 'react';
import { Phone, ExternalLink, Copy, Check, Sparkles, MessageCircle, Send, Globe } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '34', country: 'España', flag: '🇪🇸', prefix: '+34' },
  { code: '52', country: 'México', flag: '🇲🇽', prefix: '+52' },
  { code: '54', country: 'Argentina', flag: '🇦🇷', prefix: '+54' },
  { code: '57', country: 'Colombia', flag: '🇨🇴', prefix: '+57' },
  { code: '56', country: 'Chile', flag: '🇨🇱', prefix: '+56' },
  { code: '51', country: 'Perú', flag: '🇵🇪', prefix: '+51' },
  { code: '1', country: 'Estados Unidos', flag: '🇺🇸', prefix: '+1' },
  { code: '593', country: 'Ecuador', flag: '🇪🇨', prefix: '+593' },
  { code: '58', country: 'Venezuela', flag: '🇻🇪', prefix: '+58' },
  { code: '502', country: 'Guatemala', flag: '🇬🇹', prefix: '+502' },
  { code: '591', country: 'Bolivia', flag: '🇧🇴', prefix: '+591' },
  { code: '1809', country: 'Rep. Dominicana', flag: '🇩🇴', prefix: '+1 809' },
  { code: '598', country: 'Uruguay', flag: '🇺🇾', prefix: '+598' },
  { code: '506', country: 'Costa Rica', flag: '🇨🇷', prefix: '+506' },
  { code: '507', country: 'Panamá', flag: '🇵🇦', prefix: '+507' },
  { code: '503', country: 'El Salvador', flag: '🇸🇻', prefix: '+503' },
  { code: '504', country: 'Honduras', flag: '🇭🇳', prefix: '+504' },
  { code: '595', country: 'Paraguay', flag: '🇵🇾', prefix: '+595' },
];

export const WhatsAppDirectChat: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('34');
  const [localNumber, setLocalNumber] = useState('');
  const [message, setMessage] = useState('¡Hola! Me comunico desde tu enlace de WhatsApp.');
  const [copiedLink, setCopiedLink] = useState(false);

  // Clean full international phone number
  const fullCleanPhone = `${selectedCountry}${localNumber.replace(/[^0-9]/g, '')}`;
  const encodedMsg = encodeURIComponent(message);
  const waUrl = fullCleanPhone ? `https://wa.me/${fullCleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}` : '';

  const handleOpenChat = () => {
    if (!waUrl) return;
    window.open(waUrl, '_blank');
  };

  const handleCopyLink = async () => {
    if (!waUrl) return;
    try {
      await navigator.clipboard.writeText(waUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Sin Agregar a la Agenda
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Generador de Enlaces Directos wa.me
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <Phone className="w-5 h-5 text-emerald-600" />
          <span>Generador de Chat Directo de WhatsApp y Enlaces wa.me</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Envía un mensaje o genera un link personalizado para que tus clientes te escriban con un solo clic sin necesidad de guardar el contacto en su teléfono.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Country Selector */}
            <div className="sm:col-span-5">
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                País / Código:
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.country} ({c.prefix})
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Input */}
            <div className="sm:col-span-7">
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Número de Teléfono:
              </label>
              <input
                type="tel"
                value={localNumber}
                onChange={(e) => setLocalNumber(e.target.value)}
                placeholder="612345678 (sin el + ni el código)"
                className="w-full px-3.5 py-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Pre-filled Message */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Mensaje Predefinido Opcional:
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe el mensaje que se abrirá en la conversación..."
              className="w-full px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Generated Link Display */}
          {waUrl && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-emerald-800 truncate flex items-center justify-between gap-2">
              <span className="truncate">{waUrl}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              disabled={!localNumber.trim()}
              onClick={handleOpenChat}
              className="py-3 px-4 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir Chat en WhatsApp</span>
            </button>

            <button
              type="button"
              disabled={!localNumber.trim()}
              onClick={handleCopyLink}
              className={`py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95 ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white hover:bg-emerald-50 text-emerald-800 border border-slate-200'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                  <span>¡Enlace wa.me Copiado! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Enlace wa.me</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Chat Bubble Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-[#EFEAE2] rounded-3xl border border-slate-300/80 p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-300 pb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                📱
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {fullCleanPhone ? `+${fullCleanPhone}` : '+34 600 000 000'}
                </div>
                <div className="text-[9px] text-emerald-600 font-bold">En línea</div>
              </div>
            </div>

            {/* Bubble */}
            <div className="space-y-2">
              <div className="bg-[#DCF8C6] text-slate-900 p-3 rounded-2xl rounded-tr-none text-xs font-medium shadow-2xs leading-relaxed break-words">
                {message || 'Tu mensaje predefinido aparecerá aquí...'}
                <div className="text-[9px] text-slate-500 text-right mt-1 font-sans">
                  12:00 ✓✓
                </div>
              </div>
            </div>

            <div className="text-[10px] text-center text-slate-500 font-medium pt-1">
              Al tocar el enlace, se abrirá esta conversación automáticamente sin guardar el número.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
