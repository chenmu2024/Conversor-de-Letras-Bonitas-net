import React, { useState } from 'react';
import { Sparkles, Copy, Check, LayoutTemplate, Flame, Heart, Crown, Quote, Smartphone, Gamepad2, Feather } from 'lucide-react';

interface BioTemplate {
  id: string;
  category: string;
  title: string;
  template: string;
  badge: string;
  platform: 'Instagram' | 'TikTok' | 'Free Fire' | 'WhatsApp';
}

const TEMPLATES: BioTemplate[] = [
  {
    id: 'bio_ig_1',
    category: 'Aesthetic / Minimalista',
    platform: 'Instagram',
    badge: 'Trending IG',
    title: 'Vibes & Lifestyle Minimalista',
    template: `✨ 𝒲𝑒𝓁𝒸𝑜𝓂𝑒 𝓉𝑜 𝓂𝓎 𝓌𝑜𝓇𝓁𝒹\n📍 𝑴é𝒙𝒊𝒄𝒐 · 𝑪𝑫𝑴𝑿\n🕊️ 𝒱𝒾𝓋𝒾𝑒𝓃𝒹𝑜 𝓊𝓃 𝒹í𝒶 𝒶 𝓁𝒶 𝓋𝑒𝓏\n💌 𝒸𝑜𝓃𝓉𝒶𝒸𝓉𝑜@𝑒𝓂𝒶𝒾𝓁.𝒸𝑜𝓂`,
  },
  {
    id: 'bio_ig_2',
    category: 'Aesthetic / Minimalista',
    platform: 'Instagram',
    badge: 'Soft Glow',
    title: 'Frase Poética & Mood',
    template: `🌙 𝒩𝑜𝓉𝒶𝓈 𝒹𝑒𝓁 𝒶𝓁𝓂𝒶 𓆩♡𓆪\n🎨 𝒜𝓇𝓉𝑒 · 𝐹𝑜𝓉𝑜𝑔𝓇𝒶𝒻í𝒶 · 𝒞𝒶𝒻é\n⏳ 𝒞𝓇𝑒𝒶𝓃𝒹𝑜 𝓂𝒾 𝓂𝑒𝒿𝑜𝓇 𝓋𝑒𝓇𝓈𝒾ó𝓃\n⚡ 𝟤𝟢𝟤𝟨 𝒱𝒾𝒷𝑒𝓈`,
  },
  {
    id: 'bio_ff_1',
    category: 'Gamer & Free Fire Insano',
    platform: 'Free Fire',
    badge: '亗 Heroico 999',
    title: 'Perfil PvP Insano con Alas',
    template: `꧁༺ 亗 𝕶𝕴𝕹𝕲 𝕻𝖁𝕻 亗 ༻꧂\nⓥ 𝕍𝕖𝕣𝕚𝕗𝕚𝕔𝕒𝕕𝕠 𝕆𝕗𝕚𝕔𝕚𝕒𝕝\n⚔️ 𝕾𝖔𝖑𝖔 𝖗𝖔𝖏𝖔𝖘 🎯 𝟡𝟡.𝟡%\n👑 𝕷í𝖉𝖊𝖗 𝖉𝖊𝖑 𝕮𝖑𝖆𝖓 · 𝕽𝖊𝖈𝖑𝖚𝖙𝖆𝖓𝖉𝖔`,
  },
  {
    id: 'bio_ff_2',
    category: 'Gamer & Free Fire Insano',
    platform: 'Free Fire',
    badge: 'Toxic PvP',
    title: 'Dúo Tóxico & Espadas',
    template: `ᴮᴼˢˢ 亗 𝕿ó𝖝𝖎𝖈𝖔 亗\n💔 𝕮𝖔𝖗𝖆𝖟ó𝖓 𝕱𝖗í𝖔 ❄️\n🎯 𝕬𝖐-𝟜𝟟 𝔼𝕧𝕠𝕝𝕦𝕥𝕚𝕧𝕒\n🏆 𝕲𝖗𝖆𝖓 𝕸𝖆𝖊𝖘𝖙𝖗𝖔 𝕾𝟛𝟠`,
  },
  {
    id: 'bio_love_1',
    category: 'Parejas & Amor Goals',
    platform: 'Instagram',
    badge: '💑 Dúo Goals',
    title: 'Biografía Compartida con Pareja',
    template: `🔐 𝒯𝓊 𝓂𝒾 𝓁𝓊𝑔𝒶𝓇 𝒻𝒶𝓋𝑜𝓇𝒾𝓉𝑜 💍\n✨ 𝟤𝟣.𝟢𝟫.𝟤𝟢𝟤𝟥 · 𝒫𝒶𝓇𝒶 𝓈𝒾𝑒𝓂𝓅𝓇𝑒\n👑 𝒫𝓇𝑜𝓅𝒾𝑒𝒹𝒶𝒹 𝒹𝑒 @𝒯𝓊𝒜𝓂𝑜𝓇 ♡\n🕊️ 𝒥𝓊𝓃𝓉𝑜𝓈 𝑒𝓈 𝓂𝑒𝒿𝑜𝓇`,
  },
  {
    id: 'bio_latin_1',
    category: 'Gótico & Frases en Latín',
    platform: 'TikTok',
    badge: 'Old English',
    title: 'Frase Filosófica Dark',
    template: `✞ 𝔐𝔢𝔪𝔢𝔫𝔱𝔬 𝔐𝔬𝔯𝔦 ✞\n⚔️ 𝔄𝔲𝔡𝔞𝔠𝔢𝔰 𝔣𝔬𝔯𝔱𝔲𝔫𝔞 𝔦𝔲𝔳𝔞𝔱\n🥀 𝔇𝔢 𝔩𝔞𝔰 𝔠𝔢𝔫𝔦𝔷𝔞𝔰 𝔞𝔩 𝔱𝔯𝔦𝔲𝔫𝔣𝔬\n🛡️ 𝕹𝖔 𝖋𝖊𝖆𝖗 · 𝕹𝖔 𝖑𝖎𝖒𝖎𝖙𝖘`,
  },
  {
    id: 'bio_tiktok_1',
    category: 'TikTok & Creadores',
    platform: 'TikTok',
    badge: 'Viral Boost',
    title: 'Creador de Contenido & Humor',
    template: `🎬 𝓝𝓾𝓮𝓿𝓸 𝓿𝓲𝓭𝓮𝓸 𝓬𝓪𝓭𝓪 𝓭í𝓪\n🍿 𝓗𝓾𝓶𝓸𝓻 · 𝓖𝓪𝓶𝓲𝓷𝓰 · 𝓥𝓵𝓸𝓰𝓼\n👇 𝓜𝓲 𝓬𝓪𝓷𝓪𝓵 𝓭𝓮 𝓨𝓸𝓾𝓣𝓾𝓫𝓮\n🚀 𝟣𝟢𝟢𝓀 𝒢𝑜𝒶𝓁𝓈 ✨`,
  },
  {
    id: 'bio_wa_1',
    category: 'WhatsApp Info & Estados',
    platform: 'WhatsApp',
    badge: 'Info Status',
    title: 'Estado de WhatsApp Elegante',
    template: `🍃 𝒪𝒸𝓊𝓅𝒶𝒹𝑜 𝒸𝓇𝑒𝒶𝓃𝒹𝑜 𝓂𝒾 𝒻𝓊𝓉𝓊𝓇𝑜...\n📵 𝒮𝑜𝓁𝑜 𝓂𝑒𝓃𝓈𝒶𝒿𝑒𝓈 𝒾𝓂𝓅𝑜𝓇𝓉𝒶𝓃𝓉𝑒𝓈\n⚡ 𝟤𝟦/𝟩 𝑒𝓃 𝓂𝑜𝒹𝑜 𝒻𝑜𝒸𝑜`,
  },
];

export const ReadyBioTemplates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todos', 'Aesthetic / Minimalista', 'Gamer & Free Fire Insano', 'Parejas & Amor Goals', 'Gótico & Frases en Latín', 'TikTok & Creadores', 'WhatsApp Info & Estados'];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(25);
      }
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error('Failed to copy template', e);
    }
  };

  const filteredTemplates = selectedCategory === 'Todos'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-xs">
            <LayoutTemplate className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100/80 text-indigo-800 border border-indigo-200">
                📋 Plantillas del Conversor de Letras Bonitas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Biografías en el Conversor de Letras Bonitas
            </h2>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="mb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {item.platform}
                </span>
                <span className="text-[10px] font-bold text-amber-600">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-800 mb-2">{item.title}</h3>
              <pre className="p-3 rounded-lg bg-white border border-slate-200 font-sans text-xs text-slate-700 leading-relaxed whitespace-pre-wrap select-all overflow-x-auto">
                {item.template}
              </pre>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(item.template, item.id)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs transition-all shadow-xs"
            >
              {copiedId === item.id ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Plantilla Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Biografía Completa</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
