import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { RouteMeta } from '../types';

interface VisibleBreadcrumbProps {
  currentConfig: RouteMeta;
  onNavigate?: (path: string) => void;
}

export const VisibleBreadcrumb: React.FC<VisibleBreadcrumbProps> = ({ currentConfig, onNavigate }) => {
  if (currentConfig.route === 'inicio') return null;

  const handleClickHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/');
    }
  };

  return (
    <nav 
      aria-label="Breadcrumb"
      className="w-full max-w-5xl mx-auto px-4 py-2.5 mb-4 text-xs sm:text-sm text-slate-500 font-medium"
    >
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="flex items-center">
          <a
            href="/"
            onClick={handleClickHome}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Inicio</span>
          </a>
        </li>
        <li className="flex items-center text-slate-400" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="flex items-center text-slate-800 font-semibold truncate max-w-xs sm:max-w-md" aria-current="page">
          <span>{currentConfig.label}</span>
        </li>
      </ol>
    </nav>
  );
};
