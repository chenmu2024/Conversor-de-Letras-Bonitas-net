import React from 'react';
import { ShieldCheck, Cpu, Globe, HeartHandshake, FileCode2, CheckCircle2, Layers, BookOpen } from 'lucide-react';
import { COMPATIBILITY_TEST_LOG } from '../data/compatibilityTestLog';
import { PageRoute } from '../types';
import { ROUTE_LAST_SIGNIFICANT_UPDATE } from '../data/routeFreshness';
import { formatIsoDateEs } from '../utils/formatIsoDateEs';

interface AboutUsPageProps {
  onRouteChange?: (route: PageRoute) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onRouteChange }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black shadow-xs">
          <Layers className="w-4 h-4" />
          <span>Proyecto de Tipografía Digital & Estándares Unicode</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Sobre Nosotros & Conversor de Letras Bonitas
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Nuestra misión es facilitar el uso de caracteres Unicode y estilos tipográficos en español de forma accesible, rápida y gratuita.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 mb-2">Ingeniería Unicode Estándar</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No generamos imágenes pesadas ni archivos .ttf propietarios. Mapeamos cada letra contra los bloques matemáticos y símbolos suplementarios de la <strong>Unicode Consortium Specification</strong>.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-indigo-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Estándar Unicode Internacional</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 mb-2">Privacidad en el Navegador</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El texto introducido normalmente en el conversor se procesa localmente en el navegador y no se envía automáticamente a nuestro servidor.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Procesamiento Local</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 mb-2">Comunidad en Español</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Desarrollado y optimizado para el idioma español (soporte para acentos, virgulilla de la ñ y signos dobles de interrogación/exclamación).
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Multiplataforma</span>
          </div>
        </div>
      </div>

      {/* Editorial Standards and Testing Process */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white p-8 sm:p-10 shadow-md border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <FileCode2 className="w-6 h-6 text-indigo-400" />
            <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
              Metodología y Verificación Técnica
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
            Última auditoría: {formatIsoDateEs(ROUTE_LAST_SIGNIFICANT_UPDATE['sobre-nosotros'])}
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Nuestra metodología separa las referencias del estándar Unicode de las comprobaciones manuales. Solo marcamos un resultado como comprobado cuando existe una prueba documentada en el registro del proyecto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <a
            href="https://www.unicode.org/ucd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors"
          >
            <div className="font-black text-white mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
              Unicode Character Database
            </div>
            <div className="text-slate-400">Fuente oficial para propiedades y datos de los caracteres Unicode.</div>
          </a>
          <a
            href="https://www.unicode.org/charts/nameslist/n_1D400.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors"
          >
            <div className="font-black text-white mb-1">Mathematical Alphanumeric Symbols</div>
            <div className="text-slate-400">Referencia oficial del bloque U+1D400–U+1D7FF utilizado por varios estilos matemáticos.</div>
          </a>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-black text-white mb-1">Registro de pruebas manuales</div>
            <div className="text-slate-400">
              Pruebas manuales documentadas actualmente: <strong className="text-white">{COMPATIBILITY_TEST_LOG.length}</strong>. Sin registro, el estado se mantiene como referencia o sin datos.
            </div>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="/compatibilidad-unicode/"
            onClick={(e) => {
              if (onRouteChange) {
                e.preventDefault();
                onRouteChange('compatibilidad-unicode');
              }
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 underline"
          >
            <span>Consultar la base de datos completa en el Laboratorio de Compatibilidad Unicode</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Contact Link */}
      <div className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-6 h-6 text-indigo-600 shrink-0" />
          <div>
            <div className="font-bold text-sm text-slate-900">¿Tienes sugerencias o quieres proponer un estilo?</div>
            <div className="text-xs text-slate-500">Agradecemos cualquier comentario para continuar ampliando la biblioteca.</div>
          </div>
        </div>
        <a
          href="/contacto/"
          onClick={(e) => {
            if (onRouteChange) {
              e.preventDefault();
              onRouteChange('contacto');
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
        >
          Contáctanos
        </a>
      </div>
    </div>
  );
};
