import React, { useState } from 'react';
import { 
  MessageCircle, 
  Copy, 
  Check, 
  Send, 
  Phone, 
  ShieldCheck, 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  Quote, 
  List, 
  Sparkles,
  ExternalLink,
  Users,
  EyeOff,
  Briefcase,
  UserCheck,
  Repeat,
  Layers,
  HelpCircle
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { INVISIBLE_SPACE } from '../data/symbols';
import { WhatsAppGroupNames } from './WhatsAppGroupNames';
import { WhatsAppStatusQuotes } from './WhatsAppStatusQuotes';
import { WhatsAppBusinessTemplates } from './WhatsAppBusinessTemplates';
import { WhatsAppInfoDesigner } from './WhatsAppInfoDesigner';
import { WhatsAppDirectChat } from './WhatsAppDirectChat';
import { WhatsAppTextRepeater } from './WhatsAppTextRepeater';

interface WhatsAppStudioProps {
  onApplyText?: (text: string) => void;
  initialText?: string;
}

export const WhatsAppStudio: React.FC<WhatsAppStudioProps> = ({
  onApplyText,
  initialText = 'Hola, ¿cómo estás? Te escribo para coordinar.',
}) => {
  const [activeTab, setActiveTab] = useState<
    'editor' | 'info-status' | 'business' | 'direct-chat' | 'groups' | 'quotes' | 'repeater' | 'blank'
  >('editor');
  const [inputText, setInputText] = useState(initialText);
  const [copiedFormatted, setCopiedFormatted] = useState(false);
  const [copiedBlank, setCopiedBlank] = useState(false);

  // Markdown format actions
  const applyMarkdown = (prefix: string, suffix: string = prefix) => {
    setInputText((prev) => `${prefix}${prev}${suffix}`);
    if (onApplyText) onApplyText(`${prefix}${inputText}${suffix}`);
  };

  const handleCopyFormatted = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopiedFormatted(true);
      setTimeout(() => setCopiedFormatted(false), 2000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handleCopyBlankMessage = async () => {
    try {
      await navigator.clipboard.writeText(INVISIBLE_SPACE);
      setCopiedBlank(true);
      setTimeout(() => setCopiedBlank(false), 2000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handleDirectShare = () => {
    const encoded = encodeURIComponent(inputText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Safe fonts for WhatsApp (tested 100% universal on iOS and Android)
  const safeFontIds = ['sans-negrita', 'serif-negrita', 'small-caps', 'monoespaciado', 'circulos-blancos', 'cursiva-bold'];
  const safeFonts = FONT_GENERATORS.filter((g) => safeFontIds.includes(g.id));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white shrink-0 border border-white/25 shadow-lg">
              <MessageCircle className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-black/25 text-[10px] font-black uppercase tracking-wider text-emerald-200">
                  WhatsApp Suite Pro
                </span>
                <span className="text-xs text-white/80 font-bold hidden sm:inline">
                  Formato Oficial · Negocios · Info 139 Chars · wa.me
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight mt-0.5">
                Generador de Letras, Formato y Mensajes para WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Escribe en negrita, cursiva, monospaciado, diseña tu Info (139 letras), genera enlaces wa.me y envía mensajes directos sin guardar el contacto.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDirectShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-white text-emerald-900 hover:bg-emerald-50 transition-all shadow-md active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4 text-emerald-700" />
            <span>Compartir en WhatsApp</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/20">
          {[
            { id: 'editor', label: 'Formateador de Mensajes', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'info-status', label: 'Info / Perfil (139 Chars)', icon: <UserCheck className="w-3.5 h-3.5 text-emerald-200" /> },
            { id: 'business', label: 'Negocios & Ventas', icon: <Briefcase className="w-3.5 h-3.5 text-amber-200" /> },
            { id: 'direct-chat', label: 'Chat Directo (wa.me)', icon: <Phone className="w-3.5 h-3.5 text-cyan-200" /> },
            { id: 'groups', label: 'Nombres de Grupos', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'quotes', label: 'Frases para Estados', icon: <Quote className="w-3.5 h-3.5" /> },
            { id: 'repeater', label: 'Repetidor Divertido', icon: <Repeat className="w-3.5 h-3.5 text-pink-200" /> },
            { id: 'blank', label: 'Mensaje Invisible [ㅤ]', icon: <EyeOff className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-whatsapp-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white text-emerald-950 shadow-md scale-102 font-black'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-7">
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Markdown & Universal Safe Generator */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Escribe tu mensaje para WhatsApp:
                  </label>
                  <span className="text-xs text-slate-500 font-semibold">
                    {Array.from(inputText).length} caracteres
                  </span>
                </div>

                <textarea
                  rows={3}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe aquí tu estado o mensaje..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* WhatsApp Markdown Quick Formats */}
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                  Formato Nativo Oficial de WhatsApp (Toca para aplicar):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => applyMarkdown('*')}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                  >
                    <Bold className="w-3.5 h-3.5 text-emerald-600" />
                    <span>*Negrita*</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyMarkdown('_')}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold italic flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                  >
                    <Italic className="w-3.5 h-3.5 text-emerald-600" />
                    <span>_Cursiva_</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyMarkdown('~')}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold line-through flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                  >
                    <Strikethrough className="w-3.5 h-3.5 text-emerald-600" />
                    <span>~Tachado~</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyMarkdown('```')}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                  >
                    <Code className="w-3.5 h-3.5 text-emerald-600" />
                    <span>```Mono```</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyMarkdown('> ')}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                  >
                    <Quote className="w-3.5 h-3.5 text-emerald-600" />
                    <span>&gt; Cita</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyMarkdown('• ')}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                  >
                    <List className="w-3.5 h-3.5 text-emerald-600" />
                    <span>• Lista</span>
                  </button>
                </div>
              </div>

              {/* 100% Universal Safe Unicode Styles */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Fuentes Unicode Seguras (Sin Rombos) para Estados y Nicks:
                  </label>
                </div>
                <div className="space-y-2">
                  {safeFonts.map((f) => {
                    const transformed = f.transform(inputText || 'Texto de Prueba');
                    return (
                      <div
                        key={f.id}
                        className="p-3 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 transition-colors shadow-2xs"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{f.name}</span>
                          <p className="text-sm font-medium text-slate-900 truncate mt-0.5">{transformed}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(transformed);
                          }}
                          className="px-3 py-1.5 bg-white hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors shrink-0 flex items-center gap-1 shadow-2xs"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: WhatsApp Live Chat Simulation */}
            <div className="lg:col-span-5 bg-[#EFEAE2] rounded-3xl p-5 border border-slate-300 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-300/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white text-sm font-bold shadow-xs">
                    💬
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Conversación de WhatsApp</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">En línea</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full">
                  Vista Previa
                </span>
              </div>

              {/* Message Bubbles */}
              <div className="space-y-3 min-h-[140px] flex flex-col justify-end">
                <div className="bg-white text-slate-800 p-2.5 rounded-2xl rounded-tl-none text-xs font-medium max-w-[85%] shadow-2xs self-start">
                  ¡Hola! ¿Cómo se verá mi mensaje con formato? 👇
                  <div className="text-[9px] text-slate-400 text-right mt-0.5">12:30 PM</div>
                </div>

                <div className="bg-[#DCF8C6] text-slate-900 p-3 rounded-2xl rounded-tr-none text-xs font-medium max-w-[90%] shadow-2xs self-end leading-relaxed whitespace-pre-wrap break-words">
                  {inputText || 'Tu mensaje formateado aparecerá aquí...'}
                  <div className="text-[9px] text-slate-500 text-right mt-1 font-sans flex items-center justify-end gap-1">
                    <span>12:31 PM</span>
                    <span className="text-cyan-600 font-black">✓✓</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-300/60">
                <button
                  type="button"
                  onClick={handleCopyFormatted}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                    copiedFormatted
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
                  }`}
                >
                  {copiedFormatted ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>¡Mensaje Copiado! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Mensaje Formateado</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: INFO & PROFILE DESIGNER */}
        {activeTab === 'info-status' && <WhatsAppInfoDesigner />}

        {/* TAB: BUSINESS TEMPLATES */}
        {activeTab === 'business' && <WhatsAppBusinessTemplates />}

        {/* TAB: DIRECT CHAT (WA.ME) */}
        {activeTab === 'direct-chat' && <WhatsAppDirectChat />}

        {/* TAB: GROUPS */}
        {activeTab === 'groups' && <WhatsAppGroupNames />}

        {/* TAB: STATUS QUOTES */}
        {activeTab === 'quotes' && <WhatsAppStatusQuotes />}

        {/* TAB: REPEATER */}
        {activeTab === 'repeater' && <WhatsAppTextRepeater />}

        {/* TAB: BLANK INVISIBLE MESSAGE */}
        {activeTab === 'blank' && (
          <div className="max-w-xl mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">
              Generador de Mensajes y Estados en Blanco [ㅤ]
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Copia el carácter Unicode invisible transparente (Hangul Filler) para enviar mensajes totalmente vacíos en chats o publicar un Estado sin texto visible en WhatsApp.
            </p>

            <div className="p-4 bg-white rounded-xl border border-slate-200 font-mono text-sm text-slate-400 select-all my-2">
              [ㅤ]
            </div>

            <button
              type="button"
              onClick={handleCopyBlankMessage}
              className={`w-full py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                copiedBlank ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-slate-900 hover:bg-black text-white'
              }`}
            >
              {copiedBlank ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Espacio Invisible Copiado! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Mensaje Vacío para WhatsApp</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
