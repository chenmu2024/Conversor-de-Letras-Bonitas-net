import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { PageRoute } from '../types';
import { 
  Instagram, 
  Flame, 
  MessageCircle, 
  Copy, 
  Check, 
  Sparkles,
  MoreVertical,
  ArrowLeft,
  Phone,
  Video,
  Send,
  Smartphone,
  ThumbsUp,
  MessageSquare,
  Share2,
  Globe
} from 'lucide-react';

interface PlatformPreviewProps {
  text: string;
  fontName?: string;
  onClose?: () => void;
  currentRoute?: PageRoute;
}

export const PlatformPreview: React.FC<PlatformPreviewProps> = ({
  text,
  fontName = 'Fuente Seleccionada',
  onClose,
  currentRoute,
}) => {
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'tiktok' | 'whatsapp' | 'freefire' | 'facebook'>('instagram');
  const [copied, setCopied] = useState(false);

  // Sync active platform preview tab based on currentRoute
  useEffect(() => {
    if (currentRoute === 'instagram') setActivePlatform('instagram');
    else if (currentRoute === 'tiktok') setActivePlatform('tiktok');
    else if (currentRoute === 'whatsapp') setActivePlatform('whatsapp');
    else if (currentRoute === 'free-fire' || currentRoute === 'nicks-free-fire') setActivePlatform('freefire');
    else if (currentRoute === 'facebook') setActivePlatform('facebook');
  }, [currentRoute]);

  const displayText = text || 'Tu Texto Bonito Aquí ✨';

  const PLATFORM_CONFIGS = {
    instagram: { name: 'Instagram Bio', limit: 150, tip: 'Límite oficial de biografía en Instagram: 150 caracteres.' },
    tiktok: { name: 'TikTok Bio', limit: 80, tip: 'Límite oficial de biografía en TikTok: 80 caracteres.' },
    whatsapp: { name: 'WhatsApp Info', limit: 139, tip: 'Límite oficial de estado/info en WhatsApp: 139 caracteres.' },
    freefire: { name: 'Free Fire Nick', limit: 12, tip: 'Garena Free Fire corta nombres de más de 12 caracteres.' },
    facebook: { name: 'Facebook Post', limit: 500, tip: 'Recomendado hasta 500 caracteres para publicaciones legibles.' },
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(displayText, `${PLATFORM_CONFIGS[activePlatform].name} (${fontName})`);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentConfig = PLATFORM_CONFIGS[activePlatform];
  const charsCount = Array.from(displayText).length;
  const isExceeded = charsCount > currentConfig.limit;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Smartphone className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
              Simulador en Vivo: ¿Cómo se verá tu texto en cada app?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
            Comprueba en tiempo real la compatibilidad y estética en Instagram Bio, TikTok, WhatsApp y Free Fire.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs self-start sm:self-auto active:scale-95 ${
            copied ? 'bg-emerald-600 text-white shadow-emerald-600/30' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 stroke-[3] animate-pulse" />
              <span>¡Texto Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar para esta App</span>
            </>
          )}
        </button>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActivePlatform('instagram')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'instagram'
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-md shadow-pink-500/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
          }`}
        >
          <Instagram className="w-4 h-4" />
          <span>Instagram Bio</span>
        </button>

        <button
          onClick={() => setActivePlatform('tiktok')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'tiktok'
              ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
          }`}
        >
          <span className="font-black text-xs">TT</span>
          <span>TikTok Profile</span>
        </button>

        <button
          onClick={() => setActivePlatform('whatsapp')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'whatsapp'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Chat</span>
        </button>

        <button
          onClick={() => setActivePlatform('freefire')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'freefire'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Free Fire Nick</span>
        </button>

        <button
          onClick={() => setActivePlatform('facebook')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activePlatform === 'facebook'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Facebook Post</span>
        </button>
      </div>

      {/* Character Limit & Compatibility Banner */}
      <div className={`mb-6 p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isExceeded
          ? 'bg-rose-50 border-rose-200 text-rose-800'
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-2.5">
          <span className={`p-1.5 rounded-lg text-xs font-black ${
            isExceeded ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'
          }`}>
            {isExceeded ? '⚠️ Límite Excedido' : '✓ Longitud Compatible'}
          </span>
          <span className="text-xs font-medium">
            {currentConfig.tip}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
            isExceeded
              ? 'bg-rose-200 text-rose-900'
              : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
          }`}>
            {charsCount} / {currentConfig.limit} caracteres
          </span>
        </div>
      </div>

      {/* Simulator Frame Container */}
      <div className="flex justify-center">
        {/* ================= 1. INSTAGRAM SIMULATOR ================= */}
        {activePlatform === 'instagram' && (
          <div className="w-full max-w-sm rounded-3xl bg-white border-2 border-slate-200 shadow-xl overflow-hidden text-slate-900 font-sans">
            {/* Top Bar */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-sm tracking-tight">mi_perfil_oficial</span>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold">+</span>
                <span className="text-lg">☰</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-lg border-2 border-white">
                      📷
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <div className="font-bold text-sm">48</div>
                    <div className="text-[11px] text-slate-500">posts</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">12.4K</div>
                    <div className="text-[11px] text-slate-500">followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">380</div>
                    <div className="text-[11px] text-slate-500">following</div>
                  </div>
                </div>
              </div>

              {/* Converted Bio Content */}
              <div className="space-y-1">
                <div className="font-bold text-sm">Perfil Estético</div>
                <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed py-1">
                  {displayText}
                </div>
                <div className="text-xs text-indigo-600 font-medium">
                  🔗 conversordeletrasbonitas.net
                </div>
              </div>

              {/* Bio Character Limit Indicator */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Límite de Bio de Instagram:</span>
                <span className={`font-bold ${isExceeded ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {charsCount} / 150 caracteres {isExceeded && '(¡Excede el límite!)'}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-800 text-center">
                  Editar perfil
                </button>
                <button className="flex-1 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-800 text-center">
                  Compartir perfil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. TIKTOK SIMULATOR ================= */}
        {activePlatform === 'tiktok' && (
          <div className="w-full max-w-sm rounded-3xl bg-slate-950 text-white border-2 border-slate-800 shadow-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs text-slate-400">Perfil</span>
              <span className="font-bold text-sm">@creadortiktok</span>
              <span>⋮</span>
            </div>

            <div className="p-4 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-pink-500 mx-auto mb-2 flex items-center justify-center text-2xl">
                ✨
              </div>

              {/* Converted Nickname on TikTok */}
              <div className="font-bold text-base text-white mb-0.5 tracking-wide">
                {displayText}
              </div>
              <div className="text-xs text-slate-400 mb-3">@creadortiktok</div>

              <div className="flex justify-center gap-6 text-center my-3">
                <div>
                  <div className="font-bold text-sm">180</div>
                  <div className="text-[10px] text-slate-400">Siguiendo</div>
                </div>
                <div>
                  <div className="font-bold text-sm">95.2K</div>
                  <div className="text-[10px] text-slate-400">Seguidores</div>
                </div>
                <div>
                  <div className="font-bold text-sm">1.8M</div>
                  <div className="text-[10px] text-slate-400">Me gusta</div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-3">
                <button className="px-6 py-2 bg-pink-600 rounded-md text-xs font-bold text-white">
                  Seguir
                </button>
                <button className="px-4 py-2 bg-slate-800 rounded-md text-xs font-semibold text-slate-300">
                  Mensaje
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. WHATSAPP SIMULATOR ================= */}
        {activePlatform === 'whatsapp' && (
          <div className="w-full max-w-sm rounded-3xl bg-[#0b141a] text-white border-2 border-slate-800 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#202c33] px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-slate-300" />
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">
                  WA
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Amigo / Grupo VIP</div>
                  <div className="text-[10px] text-emerald-400">en línea</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Video className="w-4 h-4" />
                <Phone className="w-4 h-4" />
                <MoreVertical className="w-4 h-4" />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 min-h-[200px] bg-[#0b141a] flex flex-col justify-end space-y-3">
              <div className="self-start max-w-[80%] bg-[#202c33] rounded-lg rounded-tl-none p-2.5 text-xs text-slate-200">
                ¡Oye! ¿Qué fuente bonita estás usando para escribir? 😍
                <div className="text-[9px] text-slate-400 text-right mt-1">10:42 PM</div>
              </div>

              {/* Converted Outgoing WhatsApp message */}
              <div className="self-end max-w-[85%] bg-[#005c4b] rounded-lg rounded-tr-none p-3 text-xs text-white shadow-md">
                <p className="text-sm font-normal leading-relaxed break-words">
                  {displayText}
                </p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200 mt-1">
                  <span>10:43 PM</span>
                  <span className="text-sky-400 font-bold">✓✓</span>
                </div>
              </div>
            </div>

            {/* Chat bar */}
            <div className="bg-[#202c33] p-2 flex items-center gap-2">
              <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-xs text-slate-400">
                Mensaje
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. FREE FIRE SIMULATOR ================= */}
        {activePlatform === 'freefire' && (
          <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900 via-amber-950/40 to-slate-900 text-white border-2 border-amber-500/40 shadow-2xl overflow-hidden p-4">
            <div className="border border-amber-500/30 rounded-2xl bg-black/60 p-4 relative">
              {/* Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                  HEROICO ★ MASTER
                </span>
                <span className="text-xs font-mono text-amber-400">
                  LVL. 78
                </span>
              </div>

              {/* Avatar + Nickname */}
              <div className="flex items-center gap-3 my-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 p-[2px] shadow-lg shadow-amber-500/20">
                  <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-xl">
                    👑
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">
                    Nick en Juego
                  </div>
                  {/* Converted FF Nickname */}
                  <div className="text-base sm:text-lg font-bold text-amber-300 truncate drop-shadow-md">
                    {displayText}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ID: 289471920 • Región: Sudamérica
                  </div>
                </div>
              </div>

              {/* Clan & Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-amber-500/20 text-center">
                <div className="bg-white/5 rounded-lg p-1.5">
                  <div className="text-xs font-bold text-white">4.85</div>
                  <div className="text-[9px] text-slate-400">K/D Rate</div>
                </div>
                <div className="bg-white/5 rounded-lg p-1.5">
                  <div className="text-xs font-bold text-amber-400">68.4%</div>
                  <div className="text-[9px] text-slate-400">Headshots</div>
                </div>
                <div className="bg-white/5 rounded-lg p-1.5">
                  <div className="text-xs font-bold text-white">1,420</div>
                  <div className="text-[9px] text-slate-400">Victorias</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. FACEBOOK SIMULATOR ================= */}
        {activePlatform === 'facebook' && (
          <div className="w-full max-w-sm rounded-3xl bg-white border-2 border-slate-200 shadow-xl overflow-hidden text-slate-900 font-sans p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  👤
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 leading-none">
                    Mi Perfil / Página
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-1">
                    <span>Hace un momento</span>
                    <span>·</span>
                    <Globe className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-slate-400" />
            </div>

            {/* Post content */}
            <div className="text-sm font-medium text-slate-900 break-words leading-relaxed py-2 min-h-[60px] whitespace-pre-line">
              {displayText}
            </div>

            {/* Reactions preview */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-[9px]">👍</span>
                <span className="inline-flex items-center justify-center w-4 h-4 bg-rose-500 text-white rounded-full text-[9px]">❤️</span>
                <span className="font-bold ml-1">245</span>
              </div>
              <div>
                <span>18 comentarios · 9 compartidos</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600 font-bold">
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer py-1">
                <ThumbsUp className="w-4 h-4" />
                <span>Me gusta</span>
              </div>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer py-1">
                <MessageSquare className="w-4 h-4" />
                <span>Comentar</span>
              </div>
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer py-1">
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

