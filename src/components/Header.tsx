import React, { useState } from 'react';
import { PageRoute } from '../types';
import { ROUTE_CONFIGS } from '../data/routeConfigs';
import { 
  Sparkles, 
  Instagram, 
  Flame, 
  MessageCircle, 
  Copy, 
  Check, 
  Star, 
  Menu, 
  X, 
  Type, 
  Layers, 
  Wand2, 
  Zap, 
  Download
} from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

interface HeaderProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenPwaInstall?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onRouteChange,
  favoritesCount,
  onOpenFavorites,
  onOpenPwaInstall,
}) => {
  const [copiedSpace, setCopiedSpace] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyInvisibleSpace = async () => {
    try {
      await navigator.clipboard.writeText(INVISIBLE_SPACE);
      setCopiedSpace(true);
      setTimeout(() => setCopiedSpace(false), 2000);
    } catch (e) {
      console.error('Failed to copy invisible space', e);
    }
  };

  const navItems: { route: PageRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    { route: 'inicio', label: 'Inicio', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { route: 'letras-chidas', label: 'Letras Chidas', icon: <Flame className="w-3.5 h-3.5 text-amber-500" />, badge: '🔥 MX' },
    { route: 'letras-tatuajes', label: 'Tatuajes', icon: <span className="font-serif font-bold text-xs text-amber-600">💉</span>, badge: 'Ink' },
    { route: 'nicks-free-fire', label: 'Nicks FF', icon: <Flame className="w-3.5 h-3.5 text-red-500" />, badge: '亗 999' },
    { route: 'espacio-invisible', label: 'Espacio Invisible', icon: <span className="font-bold text-xs text-indigo-400">👻</span>, badge: '[ㅤ]' },
    { route: 'nombres-parejas', label: 'Parejas / Dúos', icon: <span className="text-xs text-rose-500">♡</span>, badge: 'Dúos' },
    { route: 'abecedario', label: 'Abecedario A-Z', icon: <span className="font-bold text-xs text-amber-500">A-Z</span> },
    { route: 'letras-chinas', label: 'Chinas / Kanji', icon: <span className="font-bold text-xs text-rose-600">漢</span> },
    { route: 'letras-elegantes', label: 'Elegantes', icon: <span className="font-serif italic font-bold text-sm text-indigo-600">𝓔</span>, badge: 'Lujo' },
    { route: 'letras-raras', label: 'Letras Raras', icon: <span className="font-bold text-xs text-purple-600">尺</span> },
    { route: 'instagram', label: 'Instagram', icon: <Instagram className="w-3.5 h-3.5 text-pink-500" /> },
    { route: 'tiktok', label: 'TikTok', icon: <span className="font-bold text-[11px]">TT</span> },
    { route: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> },
    { route: 'free-fire', label: 'Free Fire', icon: <Flame className="w-3.5 h-3.5 text-amber-500" />, badge: 'PVP' },
    { route: 'facebook', label: 'Facebook', icon: <span className="font-black text-xs text-blue-600">f</span> },
    { route: 'cursiva', label: 'Cursiva', icon: <span className="font-serif italic font-bold text-sm">𝒯</span> },
    { route: 'goticas', label: 'Góticas', icon: <span className="font-bold font-serif text-sm">𝔊</span> },
    { route: 'invertidas', label: 'Invertidas', icon: <span className="font-mono font-bold text-xs">ɐ</span> },
    { route: 'circulos', label: 'Círculos', icon: <span className="font-bold text-xs">🅒</span> },
    { route: 'glitch', label: 'Glitch / Zalgo', icon: <span className="font-mono font-bold text-xs text-rose-500">Z̶</span> },
    { route: 'simbolos', label: 'Símbolos', icon: <Layers className="w-3.5 h-3.5 text-violet-500" /> },
    { route: 'decorador', label: 'Decorador Nicks', icon: <Wand2 className="w-3.5 h-3.5 text-amber-500" /> },
    { route: 'contador-bio', label: 'Contador Bio', icon: <span className="font-mono font-black text-xs text-indigo-600">#150</span>, badge: 'Nuevo' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Identity */}
          <a
            id="logo-button"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onRouteChange('inicio');
            }}
            className="flex items-center gap-3 text-left group transition-all"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-md shadow-indigo-600/25 group-hover:scale-105 group-hover:shadow-indigo-600/40 transition-all duration-200">
              <Type className="w-5 h-5" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Letras <span className="text-indigo-600">Bonitas</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                  <Zap className="w-2.5 h-2.5 text-indigo-600 fill-indigo-600" />
                  80+ Tipos
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                conversordeletrasbonitas.net
              </p>
            </div>
          </a>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Espacio Invisible Quick Tool Button */}
            <button
              id="header-invisible-space-btn"
              aria-label="Copiar espacio invisible para Free Fire, WhatsApp e Instagram"
              onClick={handleCopyInvisibleSpace}
              title="Copiar espacio invisible para Free Fire, WhatsApp e Instagram"
              className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                copiedSpace
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-slate-900/10 hover:shadow-indigo-600/25'
              }`}
            >
              {copiedSpace ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-pulse" />
                  <span>¡Espacio Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" />
                  <span className="hidden sm:inline">Espacio</span>
                  <span>Invisible [ㅤ]</span>
                </>
              )}
            </button>

            {/* PWA Install App Button */}
            {onOpenPwaInstall && (
              <button
                type="button"
                id="header-install-pwa-btn"
                aria-label="Instalar como App en tu teléfono o PC"
                onClick={onOpenPwaInstall}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 transition-all active:scale-95 shadow-2xs"
                title="Instalar como App en tu teléfono o PC"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>Instalar App</span>
              </button>
            )}

            {/* Favorites Button with Counter */}
            <button
              id="header-favorites-btn"
              aria-label="Ver fuentes favoritas guardadas"
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl text-slate-700 hover:text-amber-600 bg-slate-100/80 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-200 transition-all active:scale-95"
              title="Ver fuentes favoritas guardadas"
            >
              <Star className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-amber-400 text-amber-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              aria-label="Abrir menú de categorías"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Navigation Pills */}
      <div className="hidden lg:block border-t border-slate-100 bg-slate-50/60 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              const path = ROUTE_CONFIGS[item.route]?.path || '/';
              return (
                <a
                  key={item.route}
                  id={`nav-item-${item.route}`}
                  href={path}
                  onClick={(e) => {
                    e.preventDefault();
                    onRouteChange(item.route);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md uppercase ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">
            Categorías y Redes Sociales
          </p>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              const path = ROUTE_CONFIGS[item.route]?.path || '/';
              return (
                <a
                  key={item.route}
                  id={`mobile-nav-item-${item.route}`}
                  href={path}
                  onClick={(e) => {
                    e.preventDefault();
                    onRouteChange(item.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

