import React, { useState } from 'react';
import { Sparkles, Copy, Check, Flame, Heart, Gamepad2, Feather, ArrowUpRight, Award } from 'lucide-react';

interface PresetCategory {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  items: { text: string; label: string }[];
}

const READY_NICKNAMES_DATA: PresetCategory[] = [
  {
    id: 'freefire-insanos',
    name: 'Nombres Insanos para Free Fire & Gamer',
    badge: 'Top Gamer',
    icon: <Flame className="w-4 h-4 text-orange-500" />,
    items: [
      { text: '꧁༺ ₦Ї₦ℑ₳ ༻꧂', label: 'Ninja Clásico' },
      { text: '⚡ 𝕯𝖆𝖗𝖐 𝕶𝖎𝖓𝖌 ⚡', label: 'Dark King' },
      { text: '『 𝕿𝕺𝖃𝕴𝕮 』★', label: 'Toxic Pro' },
      { text: '亗 ᏦᏆᏞᏞᎬᏒ 亗', label: 'Killer 777' },
      { text: '☬ 𝕾𝖍𝖆𝖉𝖔𝖜 ☬', label: 'Shadow FF' },
      { text: '꧁༒☬ 𝕸𝖆𝖋𝖎𝖆 ☬༒꧂', label: 'Mafia Clan' },
      { text: '〖 𝕲𝕺𝕯 〗⚡ 777', label: 'God 777' },
      { text: 'ᶦᶰᵈ᭄ 𝕯𝖊𝖒𝖔𝖓 ᴮᴼˢˢ', label: 'Demon Boss' },
      { text: '☠ 𝕲𝖍𝖔𝖘𝖙 ☠', label: 'Ghost Rider' },
      { text: '꧁★ 𝓥𝓮𝓷𝓸𝓶 ★꧂', label: 'Venom Venom' },
    ],
  },
  {
    id: 'aesthetic-bios',
    name: 'Biografías Aesthetic para Instagram & TikTok',
    badge: 'Viral IG & TT',
    icon: <Sparkles className="w-4 h-4 text-pink-500" />,
    items: [
      { text: '✦ viviendo mi propia historia ✦', label: 'Historia Propia' },
      { text: '✨ 𝓥𝓲𝓿𝓮, 𝓼𝓾𝓮ñ𝓪, 𝓿𝓲𝓪𝓳𝓪 🌿', label: 'Sueña y Viaja' },
      { text: '☕ Café, libros y días bonitos 📖', label: 'Café & Libros' },
      { text: '☾ creando mi propia magia ☽', label: 'Magia Lunar' },
      { text: '🤍 Coleccionando momentos, no cosas ✨', label: 'Momentos' },
      { text: '📍 En algún lugar del mundo ✈️', label: 'Viajero' },
      { text: '𝒢𝓇𝒶𝒸𝒾𝒶𝓈 𝓅𝑜𝓇 𝑒𝓈𝓉𝒶𝓇 𝒶𝓆𝓊í 🌷', label: 'Agradecimiento' },
      { text: '☁️ 𝒱𝒾𝒷𝓇𝒶𝓈 𝒷𝑜𝓃𝒾𝓉𝒶𝓈 𝓈𝒾𝑒𝓂𝓅𝓇𝑒 🌸', label: 'Vibras Bonitas' },
    ],
  },
  {
    id: 'duos-parejas',
    name: 'Apodos para Parejas & Dúos Gamer',
    badge: 'Dúos & Parejas',
    icon: <Heart className="w-4 h-4 text-rose-500" />,
    items: [
      { text: '👑 𝓡𝓮𝔂  |  🌹 𝓡𝓮𝓲𝓷𝓪', label: 'Rey & Reina' },
      { text: '☯ 𝓨𝓲𝓷  |  ☯ 𝓨𝓪𝓷𝓰', label: 'Yin & Yang' },
      { text: '☾ 𝓛𝓾𝓷𝓪  |  ☀ 𝓢𝓸𝓵', label: 'Luna & Sol' },
      { text: '🏹 𝕬𝖗𝖈𝖍𝖊𝖗  |  🛡 𝕾𝖍𝖎𝖊𝖑𝖉', label: 'Arquero & Escudo' },
      { text: '🍓 𝓕𝓻𝓮𝓼𝓪  |  🍫 𝓒𝓱𝓸𝓬𝓸𝓵𝓪𝓽𝓮', label: 'Fresa & Chocolate' },
      { text: '🧸 𝕺𝖘𝖎𝖙𝖔  |  🍯 𝕸𝖎𝖊𝖑', label: 'Osito & Miel' },
    ],
  },
  {
    id: 'frases-whatsapp',
    name: 'Frases Cortas para Estados de WhatsApp',
    badge: 'Estados WA',
    icon: <Feather className="w-4 h-4 text-emerald-500" />,
    items: [
      { text: '🎯 𝗘𝗻𝗳𝗼𝗰𝗮𝗱𝗼 𝗲𝗻 𝗺𝗶𝘀 𝗺𝗲𝘁𝗮𝘀 🚀', label: 'Enfocado' },
      { text: '⏳ El tiempo de Dios es perfecto ✨', label: 'Fe & Tiempo' },
      { text: '🔇 Menos palabras, más resultados 📈', label: 'Resultados' },
      { text: '🔋 Batería baja, no molestar 💤', label: 'No molestar' },
      { text: '🌊 Fluyendo con la vida 🍃', label: 'Fluyendo' },
      { text: '💎 𝕭𝖗𝖎𝖑𝖑𝖆𝖓𝖉𝖔 𝖈𝖔𝖓 𝖑𝖚𝖟 𝖕𝖗𝖔𝖕𝖎𝖆 🌟', label: 'Luz Propia' },
    ],
  },
];

interface ReadyNicknamesSectionProps {
  onApplyText: (text: string) => void;
}

export const ReadyNicknamesSection: React.FC<ReadyNicknamesSectionProps> = ({ onApplyText }) => {
  const [activeTab, setActiveTab] = useState<string>('freefire-insanos');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const activeCategory = READY_NICKNAMES_DATA.find((c) => c.id === activeTab) || READY_NICKNAMES_DATA[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(text);
    setTimeout(() => setCopiedItem(null), 1800);
  };

  const handleUseInConverter = (text: string) => {
    onApplyText(text);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <section id="nombres-listos-para-copiar" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Colección de Nombres y Frases 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Nombres, Biografías y Frases Listas para Copiar y Pegar
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Selecciona cualquier apodo o biografía prediseñada para copiarla directamente o cargarla en el conversor de letras para personalizarla.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-1.5">
          {READY_NICKNAMES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.name.split(' ')[0]} {cat.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Ready-made Cards */}
      <div className="mt-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-900">{activeCategory.name}</span>
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[11px] font-bold">
              {activeCategory.badge}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {activeCategory.items.length} sugerencias disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeCategory.items.map((item, idx) => (
            <div
              key={`${activeCategory.id}-${idx}`}
              className="flex flex-col justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:bg-white transition-all shadow-2xs group"
            >
              <div className="mb-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  {item.label}
                </span>
                <p className="text-sm font-bold text-slate-800 break-words leading-relaxed group-hover:text-indigo-900 transition-colors">
                  {item.text}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleUseInConverter(item.text)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                  title="Editar este texto en el conversor superior"
                >
                  <span>Editar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleCopy(item.text)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    copiedItem === item.text
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
                  }`}
                >
                  {copiedItem === item.text ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
