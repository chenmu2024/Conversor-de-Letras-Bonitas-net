import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Bug, Sparkles, HelpCircle, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [topic, setTopic] = useState<'sugerencia' | 'error' | 'duda'>('sugerencia');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot field for spam prevention
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Honeypot check - silent discard for bots
    if (website.trim() !== '') {
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          name: name.trim().slice(0, 100),
          email: email.trim().slice(0, 254),
          message: message.trim().slice(0, 5000),
          website: website.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        setTicketId(data.ticketId || null);
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(30);
        }
      } else {
        setIsSubmitting(false);
        setErrorMessage(
          data?.error ||
          'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.'
        );
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage(
        'No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe directamente a soporte@conversordeletrasbonitas.net.'
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black shadow-xs">
          <Mail className="w-4 h-4" />
          <span>Contacto y soporte</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Centro de Contacto y Sugerencias de Caracteres
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          ¿Encontraste una letra que no se ve en tu dispositivo o quieres sugerir un nuevo estilo para Free Fire, Instagram o WhatsApp? Revisamos los mensajes enviados para detectar errores y nuevas sugerencias.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Mensaje enviado correctamente.</h2>
            {ticketId && (
              <p className="text-xs font-mono font-bold text-indigo-600">ID de Referencia: {ticketId}</p>
            )}
          </div>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Muchas gracias por tu mensaje. Si has proporcionado un correo electrónico válido, podremos utilizarlo para responder a tu consulta cuando sea necesario.
          </p>
          
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
                setName('');
                setEmail('');
                setWebsite('');
                setTicketId(null);
                setErrorMessage(null);
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Error al enviar el formulario</p>
                <p className="leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Honeypot field hidden from legitimate users */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Topic Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider">
              Motivo del Mensaje
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setTopic('sugerencia')}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  topic === 'sugerencia'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Sugerir Nueva Fuente</span>
              </button>

              <button
                type="button"
                onClick={() => setTopic('error')}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  topic === 'error'
                    ? 'border-rose-600 bg-rose-50/70 text-rose-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                <Bug className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Reportar Glifo o Error</span>
              </button>

              <button
                type="button"
                onClick={() => setTopic('duda')}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                  topic === 'duda'
                    ? 'border-amber-600 bg-amber-50/70 text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Consulta General</span>
              </button>
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700">
                Tu Nombre o Nick
              </label>
              <input
                id="contact-name"
                type="text"
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Alex / ProGamer"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 outline-hidden transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700">
                Correo Electrónico (Para recibir respuesta)
              </label>
              <input
                id="contact-email"
                type="email"
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@ejemplo.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700">
              Detalle del Mensaje <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                topic === 'error'
                  ? 'Indica qué letra se ve mal (cuadrado blanco o interrogación), en qué juego o red social y qué modelo de móvil tienes (ej. Samsung Galaxy / iPhone 14)...'
                  : topic === 'sugerencia'
                  ? 'Describe el estilo de letra o adorno que te gustaría que agreguemos a la biblioteca...'
                  : 'Escribe tu consulta o duda sobre el funcionamiento del conversor...'
              }
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 outline-hidden transition-all resize-y"
            ></textarea>
          </div>

          {/* Privacy note */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Los datos enviados mediante este formulario se utilizan para gestionar tu consulta y pueden ser procesados por los proveedores técnicos necesarios para prestar el servicio de correo. Consulta nuestra <a href="/politica-de-privacidad/" className="text-indigo-600 hover:underline font-semibold">Política de Privacidad</a> para más información.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="contact-submit-btn"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando mensaje al servidor...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje de Soporte</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Direct Contact Info */}
      <div className="text-center text-xs text-slate-500 space-y-1">
        <p>También puedes contactar por correo electrónico en:</p>
        <p className="font-mono font-bold text-indigo-600" dangerouslySetInnerHTML={{ __html: '<!--email_off-->soporte@conversordeletrasbonitas.net<!--/email_off-->' }} />
      </div>
    </div>
  );
};
