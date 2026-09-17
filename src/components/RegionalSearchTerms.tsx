import React, { useState } from 'react';
import { Globe2, Sparkles, Copy, Check, Search } from 'lucide-react';

interface RegionalTerm {
  country: string;
  flag: string;
  localTerm: string;
  searchVolume: string;
  description: string;
  examples: string[];
}

interface RegionalSearchTermsProps {
  onApplyText: (text: string) => void;
}

export const RegionalSearchTerms: React.FC<RegionalSearchTermsProps> = ({ onApplyText }) => {
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<string>('all');

  const regionalData: RegionalTerm[] = [
    {
      country: 'México & Centroamérica',
      flag: '🇲🇽',
      localTerm: 'Letras Chidas',
      searchVolume: '+850,000 búsquedas/mes',
      description: 'Término popular mexicano para referirse a fuentes elegantes, letras aesthetic y nicks insanos para Free Fire.',
      examples: ['Letras chidas para bio', 'Fuentes chidas para Instagram', 'Letras para nick insano', 'Letras padres chidas'],
    },
    {
      country: 'España',
      flag: '🇪🇸',
      localTerm: 'Tipografías Chulas',
      searchVolume: '+420,000 búsquedas/mes',
      description: 'Expresión estándar en España para tipos de letras bonitas, cursivas para firmas y estilos visuales para Word y Canva.',
      examples: ['Letras chulas copiar y pegar', 'Tipografías bonitas para bio', 'Letras guapas para WhatsApp', 'Letras molonas online'],
    },
    {
      country: 'Argentina & Uruguay',
      flag: '🇦🇷',
      localTerm: 'Letras Copadas y Piolas',
      searchVolume: '+310,000 búsquedas/mes',
      description: 'Jerga rioplatense utilizada para buscar fuentes llamativas, letras facheras y caracteres especiales para perfiles.',
      examples: ['Letras copadas para Instagram', 'Fuentes piolas para nicks', 'Letras chetas para bio', 'Tipografías facheras'],
    },
    {
      country: 'Colombia & Venezuela',
      flag: '🇨🇴',
      localTerm: 'Letras Bacanas y Chéveres',
      searchVolume: '+290,000 búsquedas/mes',
      description: 'Vocablo utilizado en Colombia y el Caribe para fuentes estilizadas, estados llamativos y nicks gamer con alas.',
      examples: ['Letras bacanas para Free Fire', 'Fuentes chéveres para estados', 'Letras chimba para TikTok', 'Letras bonitas para WhatsApp'],
    },
    {
      country: 'Chile',
      flag: '🇨🇱',
      localTerm: 'Letras Bacanes y Pulentas',
      searchVolume: '+180,000 búsquedas/mes',
      description: 'Término chileno para buscar estilos de texto destacados, nombres bknes y letras invertidas.',
      examples: ['Letras bacanes para bio', 'Fuentes pulentas para nombres', 'Letras bknes para Insta', 'Nombres brigidos Free Fire'],
    },
    {
      country: 'Perú & Ecuador',
      flag: '🇵🇪',
      localTerm: 'Letras Bravazas y Chéveres',
      searchVolume: '+160,000 búsquedas/mes',
      description: 'Expresiones populares en los Andes para fuentes personalizadas, letras en círculos y decoraciones de nombres.',
      examples: ['Letras mostras para bio', 'Fuentes bravazas para nicks', 'Letras bonitas para Facebook', 'Letras con alas peruanas'],
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(text);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  const handleApply = (text: string) => {
    onApplyText(text);
    const converter = document.getElementById('conversor-principal');
    if (converter) {
      converter.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredData = activeCountry === 'all' 
    ? regionalData 
    : regionalData.filter(d => d.country.toLowerCase().includes(activeCountry.toLowerCase()));

  return (
    <section
      id="busquedas-regionales-seccion"
      className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            Conversor de Letras Bonitas · Términos Regionales
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Conversor de Letras Bonitas en Cada País
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Descubre cómo buscan el Conversor de Letras Bonitas en tu país: desde <strong>"letras chidas"</strong> en México hasta <strong>"fuentes chulas"</strong> en España y <strong>"letras copadas"</strong> en Argentina. Haz clic en cualquier término para convertirlo en el Conversor de Letras Bonitas al instante.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveCountry('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCountry === 'all'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🌎 Todos
          </button>
          {regionalData.map((r) => (
            <button
              key={r.country}
              type="button"
              onClick={() => setActiveCountry(r.country.split(' ')[0])}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeCountry === r.country.split(' ')[0]
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{r.flag}</span>
              <span className="hidden sm:inline">{r.country.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredData.map((item) => (
          <div
            key={item.country}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-2xl">{item.flag}</span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  {item.searchVolume}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {item.localTerm}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({item.country})</span>
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                Búsquedas Frecuentes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.examples.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => handleApply(ex)}
                    className="group text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1"
                    title={`Convertir "${ex}"`}
                  >
                    <Search className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-500" />
                    <span>{ex}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-900 dark:text-indigo-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>
            <strong>Consejo SEO & Usabilidad:</strong> Todas las variaciones regionales son procesadas mediante el mismo algoritmo universal Unicode para favorecer la compatibilidad en cualquier país.
          </span>
        </div>
      </div>
    </section>
  );
};
