import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  Copy, 
  Check, 
  Share2, 
  Smartphone, 
  Type, 
  Layers, 
  ShieldCheck, 
  Keyboard, 
  Flame, 
  Zap,
  Globe
} from 'lucide-react';

export const AdvancedGuideAndTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'instagram' | 'freefire' | 'whatsapp' | 'tiktok'>('instagram');
  const [copiedBio, setCopiedBio] = useState<string | null>(null);

  const handleCopyBio = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBio(id);
      setTimeout(() => setCopiedBio(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const bioTemplates = {
    instagram: [
      {
        id: 'ig-1',
        title: 'Aesthetic Minimalista',
        text: `✨ 𝓒𝓻𝓮𝓪𝓭𝓸𝓻 𝓭𝓮 𝓒𝓸𝓷𝓽𝓮𝓷𝓲𝓭𝓸\n📍 Madrid · España ✈️\n🌸 𝓥𝓲𝓿𝓮 𝓵𝓪 𝓿𝓲𝓭𝓪 𝓪𝓵 𝓶á𝔁𝓲𝓶𝓸\n👇 𝓜𝓲 𝓝𝓾𝓮𝓿𝓸 𝓥𝓲𝓭𝓮𝓸:`,
      },
      {
        id: 'ig-2',
        title: 'Emprendimiento & Negocios',
        text: `💼 𝗘𝗺𝗽𝗿𝗲𝗻𝗱𝗲𝗱𝗼𝗿 & 𝗠𝗲𝗻𝘁𝗼𝗿\n📈 𝗧𝗲 𝗮𝘆𝘂𝗱𝗼 𝗮 𝗲𝘀𝗰𝗮𝗹𝗮𝗿 𝘁𝘂 𝗺𝗮𝗿𝗰𝗮\n🚀 +𝟭𝟬𝗸 𝗲𝘀𝘁𝘂𝗱𝗶𝗮𝗻𝘁𝗲𝘀 𝗳𝗲𝗹𝗶𝗰𝗲𝘀\n🔗 𝗥𝗲𝘀𝗲𝗿𝘃𝗮 𝘁𝘂 𝗰𝗹𝗮𝘀𝗲 𝗴𝗿𝗮𝘁𝗶𝘀 👇`,
      },
    ],
    freefire: [
      {
        id: 'ff-1',
        title: 'Nick Competitivo PvP',
        text: `꧁༺ 亗 𝕯𝕰𝕾𝕿𝕽𝖀𝖄𝕰 亗 ༻꧂`,
      },
      {
        id: 'ff-2',
        title: 'Firma de Clan Heroico',
        text: `[b][c][ffd700]★ ℂ𝕃𝔸ℕ 𝕃𝔼𝔾𝔼ℕ𝔻𝕊 ★\n[ffffff]⚔️ 𝕾𝖔𝖑𝖔 𝕵𝖚𝖌𝖆𝖉𝖔𝖗𝖊𝖘 𝕴𝖓𝖘𝖆𝖓𝖔𝖘 ⚔️\n[00ff00]👑 𝓡𝓪𝓷𝓰𝓸 𝓗𝓮𝓻𝓸𝓲𝓬𝓸 👑`,
      },
    ],
    whatsapp: [
      {
        id: 'wa-1',
        title: 'Estado Romántico & Poético',
        text: `𝓔𝓻𝓮𝓼 𝓶𝓲 𝓵𝓾𝓰𝓪𝓻 𝓯𝓪𝓿𝓸𝓻𝓲𝓽𝓸 𝓮𝓷 𝓮𝓵 𝓶𝓾𝓷𝓭𝓸 ♥ 𝒮𝒾𝑒𝓂𝓅𝓇𝑒 𝒿𝓊𝓃𝓉𝑜𝓈`,
      },
      {
        id: 'wa-2',
        title: 'Aviso Importante / Trabajo',
        text: `【 𝔸𝕍𝕀𝕊𝕆 】🅝🅞 🅓🅘🅢🅟🅞🅝🅘🅑🅛🅔\n⚡ 𝓡𝓮𝓼𝓹𝓸𝓷𝓭𝓮𝓻é 𝓮𝓷 𝓬𝓾𝓪𝓷𝓽𝓸 𝓶𝓮 𝓭𝓮𝓼𝓸𝓬𝓾𝓹𝓮 ⚡`,
      },
    ],
    tiktok: [
      {
        id: 'tt-1',
        title: 'Aesthetic Girl Vibes',
        text: `₊˚⊹ 🌸 𝒯𝒾𝓀𝒯𝑜𝓀 𝒱𝒾𝒷𝑒𝓈 🌸 ⊹˚₊\n🎀 𝓁𝒾𝒻𝑒𝓈𝓉𝓎𝓁𝑒 & 𝒻𝒶𝓈𝒽𝒾𝑜𝓃 ✨\n💌 𝒸𝑜𝓃𝓉𝒶𝒸𝓉𝑜: 𝓂𝓎𝓂𝒶𝒾𝓁@𝓉𝓉.𝒸𝑜𝓂`,
      },
      {
        id: 'tt-2',
        title: 'Gamer Streamer',
        text: `🎮 ᴛɪᴋᴛᴏᴋ ɢᴀᴍᴇʀ & ᴄʟɪᴘꜱ 🔥\n📺 ᴅɪʀᴇᴄᴛᴏꜱ ᴛᴏᴅᴏꜱ ʟᴏꜱ ᴅíᴀꜱ\n👇 úɴᴇᴛᴇ ᴀ ʟᴀ ᴄᴏᴍᴜɴɪᴅᴀᴅ`,
      },
    ],
  };

  return (
    <div className="space-y-8 my-10">
      {/* SECTION 1: READY-TO-USE BIO TEMPLATES */}
      <div className="bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl border border-indigo-100/80 p-6 sm:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" />
              Plantillas Listas para Usar
            </span>
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              Biografías y Nicks Aesthetic Listos para Copiar
            </h3>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs">
            {(
              [
                { id: 'instagram', label: 'Instagram' },
                { id: 'freefire', label: 'Free Fire' },
                { id: 'whatsapp', label: 'WhatsApp' },
                { id: 'tiktok', label: 'TikTok' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bioTemplates[activeTab].map((template) => {
            const isCopied = copiedBio === template.id;
            return (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {template.title}
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 font-sans text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed selection:bg-indigo-600 selection:text-white">
                    {template.text}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyBio(template.text, template.id)}
                  className={`w-full py-2 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 border border-indigo-200/80'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>¡Plantilla Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Plantilla Completa</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: UNICODE EXPLANATION & COMPATIBILITY CHECKLIST */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              ¿Cómo Funciona la Tecnología?
            </span>
            <h3 className="font-heading font-extrabold text-lg text-slate-900">
              ¿Por qué funcionan estas letras en cualquier app?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No estás instalando archivos de fuentes (.ttf o .otf) en tu teléfono. El conversor sustituye los caracteres alfanuméricos ASCII estándar por <strong>símbolos Unicode universales</strong> (como los bloques matemáticos alfanuméricos).
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Esto permite que la gran mayoría de dispositivos Android, iPhone, iPad, Windows o Mac puedan interpretar el texto de forma consistente.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                ✓
              </div>
              <div className="text-xs font-extrabold text-slate-900">Alta Compatibilidad con Redes</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Pega sin errores en Instagram Bio, Historias, TikTok, WhatsApp, Facebook, Discord, Twitter / X y Telegram.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                ⚡
              </div>
              <div className="text-xs font-extrabold text-slate-900">Sin Registro ni Descargas</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Herramienta instantánea 100% gratuita para navegador móvil y de escritorio. Sin publicidad intrusiva.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs">
                🛡️
              </div>
              <div className="text-xs font-extrabold text-slate-900">Seguro para Cuentas & Juegos</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Totalmente permitido en Garena Free Fire, Roblox, Brawl Stars y PUBG. No genera riesgo de baneo ni sanciones.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-black text-xs">
                ♥
              </div>
              <div className="text-xs font-extrabold text-slate-900">Decoraciones & Símbolos VIP</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Incluye alas ꧁ ꧂, coronas 亗, moños 🎀, espadas ⚔️ y el espacio invisible [ㅤ] listo para usar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
