import React from 'react';
import { PageRoute } from '../types';
import { 
  Instagram, 
  Flame, 
  MessageSquare, 
  Video, 
  Feather, 
  Crown, 
  Sparkles,
  ArrowRight,
  Share2,
  Tv
} from 'lucide-react';

interface ScenarioShortcutGridProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
}

const SHORTCUTS = [
  {
    id: 'free-fire' as PageRoute,
    title: 'Free Fire Nicks',
    subtitle: 'Alas ꧁༺ ༻꧂, 亗 y espacio [ㅤ]',
    icon: <Flame className="w-5 h-5 text-amber-500" />,
    badge: 'Top Gamer',
    bg: 'from-amber-500/10 to-orange-500/5 hover:border-amber-400',
    border: 'border-amber-200/80',
  },
  {
    id: 'instagram' as PageRoute,
    title: 'Instagram Bio',
    subtitle: 'Fuentes aesthetic y cursivas para perfil',
    icon: <Instagram className="w-5 h-5 text-pink-500" />,
    badge: 'Social Bio',
    bg: 'from-pink-500/10 to-rose-500/5 hover:border-pink-400',
    border: 'border-pink-200/80',
  },
  {
    id: 'tiktok' as PageRoute,
    title: 'TikTok Viral',
    subtitle: 'Nicks aesthetic, emojis secretos y hooks',
    icon: <Tv className="w-5 h-5 text-indigo-900" />,
    badge: 'Viral Trends',
    bg: 'from-slate-900/10 to-indigo-900/5 hover:border-slate-400',
    border: 'border-slate-200/80',
  },
  {
    id: 'whatsapp' as PageRoute,
    title: 'WhatsApp Chats',
    subtitle: 'Negrita, cursiva, tachado y estados',
    icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
    badge: 'Chats & Bio',
    bg: 'from-emerald-500/10 to-teal-500/5 hover:border-emerald-400',
    border: 'border-emerald-200/80',
  },
  {
    id: 'facebook' as PageRoute,
    title: 'Facebook Posts',
    subtitle: 'Letras negrita y precios tachados',
    icon: <Share2 className="w-5 h-5 text-blue-600" />,
    badge: 'Marketplace',
    bg: 'from-blue-500/10 to-indigo-500/5 hover:border-blue-400',
    border: 'border-blue-200/80',
  },
  {
    id: 'cursiva' as PageRoute,
    title: 'Letras Cursivas',
    subtitle: '𝓒𝓾𝓻𝓼𝓲𝓿𝓪, 𝒮𝒸𝓇𝒾𝓅𝓉 y manuscrita elegante',
    icon: <Feather className="w-5 h-5 text-indigo-500" />,
    badge: 'Elegante',
    bg: 'from-indigo-500/10 to-violet-500/5 hover:border-indigo-400',
    border: 'border-indigo-200/80',
  },
  {
    id: 'goticas' as PageRoute,
    title: 'Letras Góticas',
    subtitle: '𝔊ó𝔱𝔦𝔠𝔞 Old English y Medieval Dark',
    icon: <Crown className="w-5 h-5 text-purple-500" />,
    badge: 'Medieval',
    bg: 'from-purple-500/10 to-indigo-500/5 hover:border-purple-400',
    border: 'border-purple-200/80',
  },
  {
    id: 'simbolos' as PageRoute,
    title: 'Símbolos & Alas',
    subtitle: '200+ adornos, corazones y kaomojis',
    icon: <Sparkles className="w-5 h-5 text-cyan-500" />,
    badge: '200+ Símbolos',
    bg: 'from-cyan-500/10 to-blue-500/5 hover:border-cyan-400',
    border: 'border-cyan-200/80',
  },
];

export const ScenarioShortcutGrid: React.FC<ScenarioShortcutGridProps> = ({
  currentRoute,
  onRouteChange,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span>⚡ Herramientas y Escenarios por Red Social:</span>
        </h2>
        <span className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer hidden sm:inline">
          Acceso Rápido con 1 Clic
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {SHORTCUTS.map((item) => {
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              type="button"
              id={`shortcut-btn-${item.id}`}
              onClick={() => onRouteChange(item.id)}
              className={`group relative text-left p-3.5 rounded-2xl border transition-all duration-200 bg-gradient-to-br ${item.bg} ${
                isActive
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-white shadow-md'
                  : `${item.border} bg-white shadow-2xs hover:shadow-xs hover:-translate-y-0.5`
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-white shadow-2xs group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/80 text-slate-600 border border-slate-200/60">
                  {item.badge}
                </span>
              </div>

              <div className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                <span>{item.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="text-[11px] text-slate-500 mt-0.5 truncate font-normal">
                {item.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
