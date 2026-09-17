import React, { useState } from 'react';
import { UserCheck, Copy, Check, Sparkles, Phone, ShieldCheck, Heart, Coffee, Dumbbell, Plane, Briefcase, Moon, Flame } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

const INFO_PRESETS = [
  { icon: '🌿', label: 'Paz & Zen', text: 'Viviendo un día a la vez y en paz mental ✨🕊️', font: 'italic-serif' },
  { icon: '💼', label: 'En el Trabajo', text: 'Solo mensajes de trabajo · Horario 9 a 18h 📊', font: 'sans-bold' },
  { icon: '✈️', label: 'Viajando', text: 'Modo avión activado 🌍✈️ | Respondo lento 🏖️', font: 'small-caps' },
  { icon: '💪', label: 'En el Gym', text: 'Entrenando duro · No disponible por ahora 🔥🏋️', font: 'sans-bold' },
  { icon: '🚫', label: 'Solo Urgencias', text: '📵 Ocupado. Si es urgente, por favor llama.', font: 'italic-bold-serif' },
  { icon: '🎧', label: 'Música & Vibe', text: 'Perdido en mi playlist favorita 🎧 ☁️', font: 'cursiva-bold' },
  { icon: '☕', label: 'Café & Calma', text: 'Días de café, buena vibra y desconexión ☕🌿', font: 'italic-serif' },
  { icon: '🌙', label: 'Durmiendo', text: 'Batería social agotada · Zzz 😴🌙', font: 'monospace' },
];

export const WhatsAppInfoDesigner: React.FC = () => {
  const [profileName, setProfileName] = useState('Camila Ruiz');
  const [nameFont, setNameFont] = useState('italic-bold-serif');
  const [infoText, setInfoText] = useState('Viviendo un día a la vez y en paz mental ✨🕊️');
  const [copiedInfo, setCopiedInfo] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  // WhatsApp Info character limit is strictly 139 characters
  const maxInfoChars = 139;
  const infoLength = Array.from(infoText).length;
  const isOver = infoLength > maxInfoChars;

  const formatWithFont = (str: string, genId: string) => {
    const gen = FONT_GENERATORS.find((g) => g.id === genId);
    return gen ? gen.transform(str) : str;
  };

  const formattedName = formatWithFont(profileName, nameFont);

  const handleCopyInfo = async () => {
    try {
      await navigator.clipboard.writeText(infoText);
      setCopiedInfo(true);
      setTimeout(() => setCopiedInfo(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCopyName = async () => {
    try {
      await navigator.clipboard.writeText(formattedName);
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Referencia de 139 Caracteres
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Acerca de / Info & Nombre de Perfil
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <UserCheck className="w-5 h-5 text-emerald-600" />
          <span>Diseñador de Info / Estado y Nombre de Perfil de WhatsApp</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Personaliza tu frase de "Info / Acerca de" con el contador de 139 caracteres y estiliza tu Nombre Visible de WhatsApp con letras elegantes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form & Presets */}
        <div className="lg:col-span-7 space-y-4">
          {/* Presets */}
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
              Plantillas Rápidas para tu Info de WhatsApp:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INFO_PRESETS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInfoText(item.text)}
                  className="p-2 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold transition-all text-left truncate shadow-2xs active:scale-95 flex items-center gap-1.5"
                >
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Name & Font */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Tu Nombre de Perfil:
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Tu Nombre"
                className="w-full px-3.5 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Tipografía del Nombre:
              </label>
              <select
                value={nameFont}
                onChange={(e) => setNameFont(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white"
              >
                {FONT_GENERATORS.slice(0, 15).map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.transform('Nombre')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Info Text Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                Frase de "Info / Acerca de" (Máx. 139 Caracteres):
              </label>
              <span className={`text-xs font-mono font-bold ${
                isOver ? 'text-rose-600 font-black' : 'text-slate-500'
              }`}>
                {infoLength} / {maxInfoChars}
              </span>
            </div>

            <textarea
              rows={3}
              value={infoText}
              onChange={(e) => setInfoText(e.target.value)}
              placeholder="Escribe tu estado o frase de Info..."
              className={`w-full px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all resize-none ${
                isOver
                  ? 'bg-rose-50 border-rose-300 text-rose-900 focus:ring-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCopyInfo}
              className={`py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                copiedInfo
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {copiedInfo ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Info Copiada! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Frase de Info</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyName}
              className={`py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 ${
                copiedName
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
              }`}
            >
              {copiedName ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Nombre Copiado! ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Nombre Estilizado</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live WhatsApp Profile Preview Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-[#111B21] text-slate-100 rounded-3xl border border-emerald-900/40 p-5 shadow-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold border-b border-zinc-800 pb-2.5">
              <span>WhatsApp · Perfil</span>
              <span className="text-[10px] text-zinc-400">Vista Previa</span>
            </div>

            {/* Avatar & Photo */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-[3px] mx-auto mb-3 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#1F2C34] flex items-center justify-center text-4xl">
                  🌸
                </div>
              </div>

              {/* Name Field */}
              <div className="text-base font-bold text-white tracking-wide">
                {formattedName || 'Tu Nombre'}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                +34 600 000 000
              </div>
            </div>

            {/* Info / Acerca de Card */}
            <div className="bg-[#1F2C34] p-3.5 rounded-2xl border border-zinc-700/60 space-y-1">
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Info / Acerca de
              </div>
              <div className="text-xs text-slate-100 font-medium whitespace-pre-wrap leading-relaxed">
                {infoText || 'Escribe tu frase de info arriba...'}
              </div>
            </div>

            <div className="text-center text-[10px] text-zinc-500 font-medium">
              Así es como tus contactos verán tu perfil en WhatsApp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
