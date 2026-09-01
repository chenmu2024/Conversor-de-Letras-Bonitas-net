import React, { useState } from 'react';
import { Search, Home, ArrowRight, Compass, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';
import { PageRoute } from '../types';

interface NotFoundPageProps {
  onRouteChange: (route: PageRoute) => void;
  onSearchRedirect?: (term: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onRouteChange, onSearchRedirect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const quickLinks: { route: PageRoute; label: string; icon: string; desc: string }[] = [
    { route: 'inicio', label: 'Conversor Principal', icon: '✨', desc: 'Más de 120 fuentes bonitas' },
    { route: 'nicks-free-fire', label: 'Nicks Free Fire', icon: '亗', desc: 'Espacios invisibles y símbolos gamer' },
    { route: 'instagram', label: 'Letras para Instagram', icon: '📸', desc: 'Fuentes cursivas y estéticas para bio' },
    { route: 'letras-chidas', label: 'Letras Chidas', icon: '🔥', desc: 'Decoradores aesthetic y símbolos raros' },
    { route: 'cursiva', label: 'Letras Cursivas', icon: '🖋️', desc: 'Caligrafía elegante manuscrita' },
    { route: 'letras-tatuajes', label: 'Letras para Tatuajes', icon: '✒️', desc: 'Estilos góticos y caligrafía chicana' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (onSearchRedirect) {
      onSearchRedirect(searchTerm);
    } else {
      onRouteChange('inicio');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:py-16 text-center space-y-8">
      {/* 404 Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black shadow-xs">
        <AlertTriangle className="w-4 h-4 text-rose-500" />
        <span>Error 404 - Página No Encontrada</span>
      </div>

      <div className="space-y-3">
        <h1 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          404 - Página no encontrada
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          La dirección que buscas ha cambiado de ubicación o no existe en nuestra biblioteca tipográfica. Utiliza el buscador o explora nuestras secciones más populares.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca un estilo (ej. cursiva, free fire, gótica)..."
          className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 outline-hidden transition-all font-medium"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all active:scale-95 shadow-xs"
        >
          Buscar
        </button>
      </form>

      {/* Quick Navigation Cards */}
      <div className="pt-6">
        <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center justify-center gap-2">
          <Compass className="w-4 h-4 text-indigo-500" />
          <span>Rutas y Herramientas Recomendadas</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.route}
              type="button"
              onClick={() => onRouteChange(link.route)}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all group flex flex-col justify-between shadow-2xs active:scale-98"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{link.icon}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {link.label}
                </h3>
                <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{link.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Return Home Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => onRouteChange('inicio')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Volver a la Portada del Conversor</span>
        </button>
      </div>
    </div>
  );
};
