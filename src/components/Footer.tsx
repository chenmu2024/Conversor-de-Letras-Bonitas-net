import React from 'react';
import { PageRoute } from '../types';
import { ROUTE_CONFIGS } from '../data/routeConfigs';
import { Type, ArrowUp, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onRouteChange: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderLink = (route: PageRoute, label: string, className?: string) => {
    const path = ROUTE_CONFIGS[route]?.path || '/';
    return (
      <a
        href={path}
        onClick={(e) => {
          e.preventDefault();
          onRouteChange(route);
          scrollToTop();
        }}
        className={className || "hover:text-indigo-400 transition-colors text-left block"}
      >
        {label}
      </a>
    );
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4 text-white">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Type className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-white">
                Conversor de Letras Bonitas
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Conversor de Letras Bonitas y fuentes tipográficas Unicode online. Con el Conversor de Letras Bonitas accede a más de 80 tipos de letras bonitas para copiar y pegar gratis.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Gratis • Sin descargas • Copiar y Pegar</span>
            </div>
          </div>

          {/* Col 2: Redes Sociales Silos */}
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-4">
              Por Red Social
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>{renderLink('instagram', 'Letras para Instagram (/letras-para-instagram/)')}</li>
              <li>{renderLink('tiktok', 'Letras para TikTok (/letras-para-tiktok/)')}</li>
              <li>{renderLink('whatsapp', 'Letras para WhatsApp (/letras-para-whatsapp/)')}</li>
              <li>{renderLink('free-fire', 'Letras para Free Fire (/letras-para-free-fire/)', 'hover:text-amber-400 transition-colors text-left font-bold text-amber-300/90 block')}</li>
              <li>{renderLink('facebook', 'Letras para Facebook (/letras-para-facebook/)')}</li>
            </ul>
          </div>

          {/* Col 3: Estilos de Letras */}
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-4">
              Estilos de Tipografías
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>{renderLink('letras-chidas', 'Letras Chidas & Nicks (/letras-chidas/)', 'hover:text-amber-400 transition-colors text-left text-amber-300 font-bold block')}</li>
              <li>{renderLink('letras-tatuajes', 'Letras para Tatuajes (/letras-para-tatuajes/)', 'hover:text-amber-400 transition-colors text-left text-amber-200 font-bold block')}</li>
              <li>{renderLink('nicks-free-fire', 'Nicks Free Fire Insanos (/generador-de-nicks-free-fire/)', 'hover:text-red-400 transition-colors text-left text-red-300 font-bold block')}</li>
              <li>{renderLink('espacio-invisible', 'Espacio Invisible [ㅤ] (/espacio-invisible/)', 'hover:text-indigo-400 transition-colors text-left text-indigo-300 font-bold block')}</li>
              <li>{renderLink('nombres-parejas', 'Nombres para Parejas Dúos (/nombres-para-parejas/)', 'hover:text-rose-400 transition-colors text-left text-rose-300 font-bold block')}</li>
              <li>{renderLink('abecedario', 'Abecedario A-Z Completo (/abecedario-letras-bonitas/)', 'hover:text-amber-400 transition-colors text-left text-amber-300 font-bold block')}</li>
              <li>{renderLink('letras-chinas', 'Letras Chinas & Kanji (/letras-chinas/)', 'hover:text-rose-400 transition-colors text-left text-rose-300 font-bold block')}</li>
              <li>{renderLink('letras-elegantes', 'Letras Elegantes (/letras-elegantes/)', 'hover:text-indigo-400 transition-colors text-left text-indigo-300 font-bold block')}</li>
              <li>{renderLink('letras-raras', 'Letras Raras & Símbolos (/letras-raras/)', 'hover:text-purple-400 transition-colors text-left text-purple-300 font-bold block')}</li>
              <li>{renderLink('cursiva', 'Traductor a Cursiva (/traductor-cursiva/)')}</li>
              <li>{renderLink('goticas', 'Letras Góticas (/letras-goticas/)')}</li>
              <li>{renderLink('invertidas', 'Tachadas e Invertidas (/letras-tachadas-e-invertidas/)')}</li>
              <li>{renderLink('circulos', 'Círculos y Cuadros (/letras-en-circulos-y-cuadros/)')}</li>
              <li>{renderLink('glitch', 'Letras Glitch y Zalgo (/letras-glitch-zalgo/)')}</li>
            </ul>
          </div>

          {/* Col 4: Recursos */}
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-4">
              Recursos
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>{renderLink('contador-bio', 'Contador Caracteres Bio (/contador-de-caracteres-bio/)', 'hover:text-amber-400 transition-colors text-left text-amber-300/90 font-bold block')}</li>
              <li>{renderLink('simbolos', 'Símbolos y Emojis (/simbolos-y-emojis/)')}</li>
              <li>{renderLink('decorador', 'Decorador de Nicks Gamer (/decorador-de-nicks/)')}</li>
              <li>{renderLink('sobre-nosotros', 'Sobre Nosotros (/sobre-nosotros/)')}</li>
              <li>{renderLink('politica-de-privacidad', 'Política de Privacidad (/politica-de-privacidad/)')}</li>
              <li>{renderLink('politica-de-cookies', 'Política de Cookies (/politica-de-cookies/)')}</li>
              <li>{renderLink('terminos-y-condiciones', 'Términos y Condiciones (/terminos-y-condiciones/)')}</li>
              <li>{renderLink('contacto', 'Contacto y Reportes (/contacto/)')}</li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const win = window as unknown as { openCookiePreferences?: () => void };
                    if (win.openCookiePreferences) {
                      win.openCookiePreferences();
                    } else {
                      onRouteChange('politica-de-privacidad');
                      scrollToTop();
                    }
                  }}
                  className="hover:text-amber-400 text-amber-400/90 transition-colors text-left text-xs font-bold"
                >
                  ⚙️ Configurar Cookies & Privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Fair Use Trademark Disclaimer (Essential for Google AdSense & Intellectual Property Compliance) */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Aviso Legal y Exención de Responsabilidad de Marcas (Fair Use):</strong> Instagram™, TikTok™, WhatsApp™, Free Fire™ (Garena), Facebook™ y Twitter/X™ son marcas comerciales registradas propiedad de sus respectivas compañías. <span className="text-slate-400">Conversor de Letras Bonitas</span> es una herramienta de utilidad tipográfica independiente basada en los estándares abiertos del <em>Consorcio Unicode (ISO/IEC 10646)</em> y no mantiene relación comercial, patrocinio ni respaldo oficial por parte de dichas corporaciones.
          </p>
          <p className="text-[10px] text-slate-600">
            Consulta nuestra Política de Privacidad para conocer cómo tratamos los datos técnicos y las tecnologías utilizadas en el sitio.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500">
            <span>© {new Date().getFullYear()} Conversor de Letras Bonitas.</span>
            {renderLink('sobre-nosotros', 'Sobre Nosotros', 'hover:text-slate-300 underline inline')}
            {renderLink('politica-de-privacidad', 'Privacidad', 'hover:text-slate-300 underline inline')}
            {renderLink('politica-de-cookies', 'Política de Cookies', 'hover:text-slate-300 underline inline')}
            {renderLink('terminos-y-condiciones', 'Términos', 'hover:text-slate-300 underline inline')}
            {renderLink('contacto', 'Contacto', 'hover:text-slate-300 underline inline')}
            <button
              type="button"
              onClick={() => {
                const win = window as unknown as { openCookiePreferences?: () => void };
                if (win.openCookiePreferences) {
                  win.openCookiePreferences();
                } else {
                  onRouteChange('politica-de-cookies');
                  scrollToTop();
                }
              }}
              className="hover:text-slate-300 underline text-amber-400"
            >
              ⚙️ Configurar Cookies
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all font-semibold active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Volver arriba</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

