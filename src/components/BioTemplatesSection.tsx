import React, { useState } from 'react';
import { Sparkles, Copy, Check, Share2, Instagram, Heart, Dumbbell, Crown, Music, Flame } from 'lucide-react';

interface BioTemplate {
  id: string;
  category: 'Aesthetic' | 'Gamer' | 'Amor & Pareja' | 'Elegante' | 'Fitness';
  title: string;
  templateText: (name: string, city: string, hobby: string) => string;
}

const BIO_TEMPLATES: BioTemplate[] = [
  {
    id: 'aesthetic-vibes',
    category: 'Aesthetic',
    title: 'Aesthetic & Vainilla Soft',
    templateText: (name, city, hobby) =>
      `˚ ༘♡ ·˚ ₊˚ˑ༄ 𝓦𝓮𝓵𝓬𝓸𝓶𝓮
🧸 • ${name || 'Sofia'}
📍 • ${city || 'Madrid, ES'}
🕊️ • 𝐿𝒾𝓋𝒾𝓃𝑔 𝒾𝓃 𝓂𝓎 𝑜𝓌𝓃 𝒻𝒶𝒾𝓇𝓎𝓉𝒶𝓁𝑒
☁️ • ${hobby || 'Fotografía & Arte'}
─── ⋆⋅☆⋅⋆ ───`,
  },
  {
    id: 'gamer-ff-pro',
    category: 'Gamer',
    title: 'Free Fire / Gamer Insano 亗',
    templateText: (name, city, hobby) =>
      `亗 ᏦᎥᏁᏳ • ${name || 'Carlos'} 亗
⚡ • 𝑱𝒖𝒈𝒂𝒅𝒐𝒓 𝑽.𝑰.𝑷 | 𝑭𝒓𝒆𝒆 𝑭𝒊𝒓𝒆
🏆 • ᴮᴼˢˢ ᴅᴇʟ ᴄʟᴀɴ ʟᴇɢᴇɴᴅᴀʀɪᴏ
🎯 • ${hobby || 'Modo Insano Activo'}
📍 • ${city || 'México'}
• ───── ⚡ ───── •`,
  },
  {
    id: 'love-couple-goals',
    category: 'Amor & Pareja',
    title: 'Biografía Romántica & Pareja',
    templateText: (name, city, hobby) =>
      `♡ 𝒯𝓊 𝓎 𝒴ℴ 𝓅𝒶𝓇𝒶 𝓈𝒾𝑒𝓂𝓅𝓇𝑒 ♡
💍 • ${name || 'Carlos & Sofia'}
📅 • 𝟤𝟢𝟤𝟦 • 𝟣𝟤 • 𝟣𝟦 ♾️
🔐 • 𝓓𝓾𝓮ñ𝓸/𝓪 𝓭𝓮 𝓶𝓲 𝓬𝓸𝓻𝓪𝔃ó𝓷
📍 • ${city || 'Buenos Aires'}
•─ 𝒯𝓊 𝓂𝒾 𝓁𝓊𝓏 ─•`,
  },
  {
    id: 'minimal-luxury',
    category: 'Elegante',
    title: 'Minimalista & Creador Pro',
    templateText: (name, city, hobby) =>
      `« ${name || 'ALEX MORALES'} »
▫️ 𝘊𝘳𝘦𝘢𝘵𝘪𝘷𝘦 𝘋𝘪𝘳𝘦𝘤𝘵𝘰𝘳 & 𝘚𝘵𝘺𝘭𝘪𝘴𝘵
▫️ ${city || 'Barcelona'} ✈️ Worldwide
▫️ 𝘗𝘰𝘳𝘵𝘧𝘰𝘭𝘪𝘰 𝘺 𝘤𝘰𝘯𝘵𝘢𝘤𝘵𝘰 ⤵️
▫️ ${hobby || 'alex@creativestudio.com'}`,
  },
  {
    id: 'fitness-motivation',
    category: 'Fitness',
    title: 'Fitness & Disciplina Gym',
    templateText: (name, city, hobby) =>
      `⚡ 𝓓𝓲𝓼𝓬𝓲𝓹𝓵𝓲𝓷𝓪 > 𝓜𝓸𝓽𝓲𝓿𝓪𝓬𝓲ó𝓷
🏋️ • ${name || 'Marcos Fitness'}
🔥 • 𝘕𝘰 𝘦𝘹𝘤𝘶𝘴𝘦𝘴. 𝘑𝘶𝘴𝘵 𝘳𝘦𝘴𝘶𝘭𝘵𝘴.
🏆 • ${hobby || '100% Natural Gym Life'}
📍 • ${city || 'Bogotá, CO'}`,
  },
  {
    id: 'music-artist',
    category: 'Aesthetic',
    title: 'Melómano & Música Vibes',
    templateText: (name, city, hobby) =>
      `·.¸¸.·♩♪♫ 𝓥𝓲𝓫𝓮𝓼 ♫♪♩·.¸¸.·
🎧 • ${name || 'Lucía'}
🎵 • 𝐿𝑜𝓈𝓉 𝒾𝓃 𝓉𝒽𝑒 𝓂𝑒𝓁𝑜𝒹𝓎
✨ • ${hobby || 'Indie Rock & Lo-Fi'}
📍 • ${city || 'Santiago, CL'}
ılı.lıllılı.ıllı. 02:45`,
  },
];

interface BioTemplatesSectionProps {
  onApplyText?: (text: string) => void;
}

export const BioTemplatesSection: React.FC<BioTemplatesSectionProps> = ({ onApplyText }) => {
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userHobby, setUserHobby] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Aesthetic', 'Gamer', 'Amor & Pareja', 'Elegante', 'Fitness'];

  const filtered = activeCategory === 'Todos'
    ? BIO_TEMPLATES
    : BIO_TEMPLATES.filter((b) => b.category === activeCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleShareWhatsApp = (text: string) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="plantillas-biografias-instagram-tiktok" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200 text-purple-900 text-xs font-bold mb-2">
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>Plantillas del Conversor de Letras Bonitas para Instagram y TikTok</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Biografías del Conversor de Letras Bonitas con Símbolos
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Rellena tus datos o copia directamente estas biografías creadas con nuestro Conversor de Letras Bonitas para destacar tu perfil en redes sociales.
          </p>
        </div>

        {/* Quick customization inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Tu Nombre / Nick"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Ciudad / País"
            value={userCity}
            onChange={(e) => setUserCity(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Frase / Hobby"
            value={userHobby}
            onChange={(e) => setUserHobby(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Bios */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((bio) => {
          const formatted = bio.templateText(userName, userCity, userHobby);
          return (
            <div
              key={bio.id}
              className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-purple-300 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/50">
                  <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                    {bio.category}
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold truncate">
                    {bio.title}
                  </span>
                </div>

                <pre className="p-3 bg-white rounded-lg border border-slate-200/70 text-xs font-medium text-slate-800 whitespace-pre-wrap font-sans leading-relaxed min-h-[140px]">
                  {formatted}
                </pre>
              </div>

              <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-200/60">
                <button
                  onClick={() => handleShareWhatsApp(formatted)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors"
                  title="Compartir directo por WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {onApplyText && (
                    <button
                      onClick={() => onApplyText(formatted)}
                      className="text-[11px] font-bold text-slate-600 hover:text-purple-600 transition-colors"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleCopy(bio.id, formatted)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all shadow-2xs"
                  >
                    {copiedId === bio.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Bio</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
