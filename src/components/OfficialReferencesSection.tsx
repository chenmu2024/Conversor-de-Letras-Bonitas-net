import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';
import { OFFICIAL_REFERENCES } from '../data/unicodeCompatibility';

export const OfficialReferencesSection: React.FC = () => {
  return (
    <section 
      id="fuentes-oficiales"
      aria-labelledby="references-title"
      className="w-full max-w-5xl mx-auto my-12 bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-blue-600" aria-hidden="true" />
          <h2 id="references-title" className="text-xl font-bold text-slate-900">
            Fuentes y Referencias Oficiales
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          <span>Última revisión técnica: Septiembre 2026</span>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
        Las especificaciones y comprobaciones de este laboratorio se basan en los estándares internacionales del 
        <strong> Consorcio Unicode</strong> y en las directrices de soporte oficiales de cada plataforma:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OFFICIAL_REFERENCES.map((ref) => (
          <a
            key={ref.id}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                {ref.organization}
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
              {ref.title}
            </h3>
            <p className="text-xs text-slate-600 line-clamp-2 leading-normal">
              {ref.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};
