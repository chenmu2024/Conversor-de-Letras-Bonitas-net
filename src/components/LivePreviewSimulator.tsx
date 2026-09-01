import React, { useState } from 'react';
import { Instagram, Flame, MessageSquare, Video, X, Copy, Check, Sparkles, UserCheck } from 'lucide-react';

interface LivePreviewSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
}

export const LivePreviewSimulator: React.FC<LivePreviewSimulatorProps> = ({
  isOpen,
  onClose,
  inputText,
}) => {
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'freefire' | 'tiktok' | 'whatsapp'>('instagram');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center border border-indigo-400/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-white">
                Simulador de Vista Previa Real
              </h3>
              <p className="text-[11px] text-slate-300">
                Así se verá tu texto en aplicaciones y juegos reales
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center gap-2 p-3 bg-slate-100/90 border-b border-slate-200 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActivePlatform('instagram')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activePlatform === 'instagram'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram Bio</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform('freefire')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activePlatform === 'freefire'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-900" />
            <span>Free Fire Nick</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform('tiktok')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activePlatform === 'tiktok'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>TikTok Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform('whatsapp')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activePlatform === 'whatsapp'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Chat</span>
          </button>
        </div>

        {/* Live Preview Container */}
        <div className="p-6 bg-slate-900 flex-1 overflow-y-auto flex items-center justify-center min-h-[260px]">
          {/* INSTAGRAM MOCKUP */}
          {activePlatform === 'instagram' && (
            <div className="w-full max-w-sm bg-black text-white rounded-2xl border border-slate-800 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-sm">
                      ✨
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-xs">tu_usuario_aesthetic</div>
                    <div className="text-[10px] text-slate-400">Creador de Contenido</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-sky-500 text-white text-[11px] font-bold rounded-lg flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  <span>Siguiendo</span>
                </div>
              </div>

              {/* Bio Preview Area */}
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-sm font-medium leading-relaxed my-2 text-pink-100 break-words">
                {inputText || 'Ejemplo de Bio bonitas en Instagram ✨'}
              </div>

              <div className="text-[10px] text-sky-400 font-semibold mt-2 truncate">
                🔗 linktr.ee/tu_perfil
              </div>
            </div>
          )}

          {/* FREE FIRE MOCKUP */}
          {activePlatform === 'freefire' && (
            <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 to-zinc-950 text-amber-100 rounded-2xl border-2 border-amber-500/40 p-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-bl-xl">
                RANKED HEROIC 亗
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-2xl shadow-inner">
                  👑
                </div>
                <div>
                  <div className="text-[10px] text-amber-400/90 font-bold tracking-wider">
                    FREE FIRE PLAYER ID: 8943201
                  </div>
                  <div className="text-lg font-black text-amber-300 break-all leading-tight font-mono">
                    {inputText || 'ㅤNICKㅤ'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Clan: [V.I.P] ELITE</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-amber-500/20 text-slate-300 font-mono">
                <span>Nivel: 78</span>
                <span>Likes: ❤️ 12,450</span>
              </div>
            </div>
          )}

          {/* TIKTOK MOCKUP */}
          {activePlatform === 'tiktok' && (
            <div className="w-full max-w-sm bg-black text-white rounded-2xl border border-slate-800 p-4 shadow-xl">
              <div className="text-center mb-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto mb-2 flex items-center justify-center text-2xl border-2 border-cyan-400">
                  🎵
                </div>
                <div className="font-extrabold text-sm">@tiktok_creator</div>
              </div>

              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-center text-slate-200 font-medium break-words">
                {inputText || 'Sigueme para más contenido tendencias ✨'}
              </div>

              <div className="flex items-center justify-around text-[10px] text-slate-400 mt-3 pt-2 border-t border-zinc-800">
                <div><span className="font-bold text-white">128</span> Siguiendo</div>
                <div><span className="font-bold text-white">45.2K</span> Seguidores</div>
                <div><span className="font-bold text-white">1.2M</span> Me gusta</div>
              </div>
            </div>
          )}

          {/* WHATSAPP MOCKUP */}
          {activePlatform === 'whatsapp' && (
            <div className="w-full max-w-sm bg-[#0b141a] text-white rounded-2xl border border-emerald-900/60 p-4 shadow-xl">
              <div className="flex items-center gap-3 p-2 bg-[#1f2c34] rounded-xl mb-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">
                  WA
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">Mi Estado de WhatsApp</div>
                  <div className="text-[10px] text-emerald-400">Info / About</div>
                </div>
              </div>

              <div className="p-3 bg-[#111b21] rounded-xl border border-emerald-800/40 text-sm text-emerald-100 font-medium break-words">
                {inputText || 'Hola Amigos, disponible en WhatsApp 💬'}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            ¿Te gusta cómo se ve? ¡Copia este texto ahora!
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/80 transition-colors"
            >
              Cerrar
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Texto Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Texto</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
