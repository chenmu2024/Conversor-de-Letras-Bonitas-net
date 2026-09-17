import React from 'react';
import { PageRoute } from '../types';
import { ROUTE_CONFIGS } from '../data/routeConfigs';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

interface BreadcrumbsProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentRoute, onRouteChange }) => {
  if (currentRoute === 'inicio') return null;

  const currentConfig = ROUTE_CONFIGS[currentRoute] || ROUTE_CONFIGS.inicio;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto py-1 whitespace-nowrap"
    >
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onRouteChange('inicio');
        }}
        className="inline-flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Inicio</span>
      </a>

      <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />

      {/* Category Group */}
      <span className="text-slate-400">
        {currentConfig.category === 'plataforma' && 'Redes Sociales & Apps'}
        {currentConfig.category === 'estilo' && 'Estilos Tipográficos'}
        {currentConfig.category === 'recursos' && 'Herramientas & Recursos'}
        {currentConfig.category === 'general' && 'General'}
      </span>

      <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />

      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
        {currentConfig.label}
      </span>
    </nav>
  );
};
