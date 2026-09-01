import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp, Sparkles, BookOpen, Layers, HelpCircle, Globe2, ShieldCheck } from 'lucide-react';

interface TocItem {
  id: string;
  label: string;
  badge?: string;
  icon: React.ReactNode;
}

export const TableOfContents: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sections: TocItem[] = [
    {
      id: 'conversor-principal',
      label: '1. Conversor y Generador de Letras en Vivo',
      badge: '80+ Fuentes',
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
    },
    {
      id: 'espacio-invisible-seccion',
      label: '2. Espacio Invisible (Hangul Filler U+3164)',
      badge: 'Copiar',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: 'preview-simulator-section',
      label: '3. Simulador de Biografía en Vivo (Instagram/TikTok/FF)',
      badge: 'Preview',
      icon: <Globe2 className="w-4 h-4 text-blue-500" />,
    },
    {
      id: 'busquedas-regionales-seccion',
      label: '4. Términos Populares y Búsquedas por País (México, España, Argentina...)',
      badge: 'LSI',
      icon: <Globe2 className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'abecedario-completo-seccion',
      label: '5. Abecedario Completo A-Z de Letras Bonitas',
      badge: 'Tabla',
      icon: <BookOpen className="w-4 h-4 text-purple-500" />,
    },
    {
      id: 'glosario-unicode-seccion',
      label: '6. Glosario Enciclopédico de Tipografía Unicode',
      badge: 'Técnico',
      icon: <BookOpen className="w-4 h-4 text-rose-500" />,
    },
    {
      id: 'compatibilidad-seccion',
      label: '7. Tabla de Compatibilidad con Android, iOS y Redes',
      badge: '100%',
      icon: <ShieldCheck className="w-4 h-4 text-teal-500" />,
    },
    {
      id: 'faq-seccion-seo',
      label: '8. Preguntas Frecuentes (FAQ) sobre Fuentes y Nicks',
      badge: 'Dudas',
      icon: <HelpCircle className="w-4 h-4 text-indigo-500" />,
    },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      id="tabla-de-contenidos-nav"
      aria-label="Índice de contenidos de la página"
      className="mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
            <List className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Índice Rápido de Contenidos
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Guía Rápida
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Navega directamente a las herramientas, tablas del abecedario y preguntas frecuentes
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-colors"
          aria-expanded={isOpen}
          aria-controls="toc-list"
        >
          <span>{isOpen ? 'Ocultar' : 'Ver Índice'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <ol id="toc-list" className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-2.5 list-none">
          {sections.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              >
                <span className="flex items-center gap-2 truncate">
                  {item.icon}
                  <span className="truncate group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                </span>
                {item.badge && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0 ml-2">
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
