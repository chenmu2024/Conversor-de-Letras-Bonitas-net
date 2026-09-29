import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp, Sparkles, HelpCircle, Layers, Link2, Type } from 'lucide-react';
import { PageRoute } from '../types';
import { ROUTE_MODULES } from '../data/routeModules';
import { SEO_ROUTE_DATA } from '../data/seoRouteData';

interface TocItem {
  id: string;
  label: string;
  badge?: string;
  icon: React.ReactNode;
}

interface TableOfContentsProps {
  currentRoute: PageRoute;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ currentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeModules = new Set(ROUTE_MODULES[currentRoute] || []);

  const sections: TocItem[] = [
    {
      id: 'conversor-principal',
      label: 'Conversor principal',
      badge: 'Herramienta',
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
    },
    {
      id: 'font-results-section',
      label: 'Resultados y estilos para copiar',
      badge: 'Resultados',
      icon: <Type className="w-4 h-4 text-indigo-500" />,
    },
    ...(SEO_ROUTE_DATA[currentRoute]?.quickAnswer
      ? [{
          id: 'quick-answer',
          label: 'Respuesta rápida',
          badge: 'Guía',
          icon: <HelpCircle className="w-4 h-4 text-blue-500" />,
        }]
      : []),
    ...(activeModules.has('invisibleSpace')
      ? [{
          id: 'espacio-invisible-seccion',
          label: 'Espacio invisible',
          badge: 'Herramienta',
          icon: <Layers className="w-4 h-4 text-emerald-500" />,
        }]
      : []),
    ...(activeModules.has('symbolsLibrary')
      ? [{
          id: 'simbolos-section',
          label: 'Símbolos y caracteres',
          badge: 'Biblioteca',
          icon: <Layers className="w-4 h-4 text-violet-500" />,
        }]
      : []),
    ...(activeModules.has('alphabetReference')
      ? [{
          id: 'abecedario-section',
          label: 'Referencia del abecedario',
          badge: 'A-Z',
          icon: <Type className="w-4 h-4 text-amber-500" />,
        }]
      : []),
    {
      id: 'faq-seccion-seo',
      label: 'Preguntas frecuentes',
      badge: 'FAQ',
      icon: <HelpCircle className="w-4 h-4 text-indigo-500" />,
    },
    {
      id: 'secciones-relacionadas',
      label: 'Herramientas relacionadas',
      badge: 'Explorar',
      icon: <Link2 className="w-4 h-4 text-slate-500" />,
    },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      id="tabla-de-contenidos-nav"
      aria-label="Índice de contenidos de la página"
      className="mb-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
            <List className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900">Índice de esta página</h2>
            <p className="text-xs text-slate-500">Solo muestra secciones disponibles en esta página.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors shrink-0"
          aria-expanded={isOpen}
          aria-controls="toc-list"
        >
          <span>{isOpen ? 'Ocultar' : 'Ver índice'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <ol id="toc-list" className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2.5 list-none">
          {sections.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                data-toc-target={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors group"
              >
                <span className="flex items-center gap-2 min-w-0">
                  {item.icon}
                  <span className="truncate group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                </span>
                {item.badge && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 ml-2">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
};
