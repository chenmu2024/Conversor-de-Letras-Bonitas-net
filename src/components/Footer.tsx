import React from 'react';
import { PageRoute } from '../types';
import { Type, ArrowUp, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onRouteChange: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <li>
                <button
                  onClick={() => { onRouteChange('instagram'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Letras para Instagram (/letras-para-instagram/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('tiktok'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Letras para TikTok (/letras-para-tiktok/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('whatsapp'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Letras para WhatsApp (/letras-para-whatsapp/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('free-fire'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors text-left font-bold text-amber-300/90"
                >
                  Letras para Free Fire (/letras-para-free-fire/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('facebook'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Letras para Facebook (/letras-para-facebook/)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Estilos de Letras */}
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-4">
              Estilos de Tipografías
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => { onRouteChange('letras-chidas'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-bold"
                >
                  Letras Chidas & Nicks (/letras-chidas/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('letras-tatuajes'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors text-left text-amber-200 font-bold"
                >
                  Letras para Tatuajes (/letras-para-tatuajes/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('nicks-free-fire'); scrollToTop(); }}
                  className="hover:text-red-400 transition-colors text-left text-red-300 font-bold"
                >
                  Nicks Free Fire Insanos (/generador-de-nicks-free-fire/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('espacio-invisible'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left text-indigo-300 font-bold"
                >
                  Espacio Invisible [ㅤ] (/espacio-invisible/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('nombres-parejas'); scrollToTop(); }}
                  className="hover:text-rose-400 transition-colors text-left text-rose-300 font-bold"
                >
                  Nombres para Parejas Dúos (/nombres-para-parejas/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('abecedario'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-bold"
                >
                  Abecedario A-Z Completo (/abecedario-letras-bonitas/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('letras-chinas'); scrollToTop(); }}
                  className="hover:text-rose-400 transition-colors text-left text-rose-300 font-bold"
                >
                  Letras Chinas & Kanji (/letras-chinas/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('letras-elegantes'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left text-indigo-300 font-bold"
                >
                  Letras Elegantes (/letras-elegantes/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('letras-raras'); scrollToTop(); }}
                  className="hover:text-purple-400 transition-colors text-left text-purple-300 font-bold"
                >
                  Letras Raras & Símbolos (/letras-raras/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('cursiva'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Traductor a Cursiva (/traductor-cursiva/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('goticas'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Letras Góticas (/letras-goticas/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('invertidas'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Tachadas e Invertidas (/letras-tachadas-e-invertidas/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('circulos'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Círculos y Cuadros (/letras-en-circulos-y-cuadros/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('glitch'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Letras Glitch y Zalgo (/letras-glitch-zalgo/)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Recursos y E-E-A-T */}
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-4">
              Recursos & E-E-A-T
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => { onRouteChange('contador-bio'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300/90 font-bold"
                >
                  Contador Caracteres Bio (/contador-de-caracteres-bio/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('simbolos'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Símbolos y Emojis (/simbolos-y-emojis/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('decorador'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Decorador de Nicks Gamer (/decorador-de-nicks/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('sobre-nosotros'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Sobre Nosotros (/sobre-nosotros/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('politica-de-privacidad'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Política de Privacidad (/politica-de-privacidad/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('politica-de-cookies'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Política de Cookies (/politica-de-cookies/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('terminos-y-condiciones'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Términos y Condiciones (/terminos-y-condiciones/)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onRouteChange('contacto'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Contacto y Reportes (/contacto/)
                </button>
              </li>
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
            Cumplimiento regulatorio internacional: RGPD (UE 2016/679), CCPA/CPRA (California), LGPD (Brasil), Ley 25.326 (Argentina), Ley Federal de Protección de Datos Personales (México INAI) y Ley 1581 (Colombia SIC).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500">
            <span>© {new Date().getFullYear()} Conversor de Letras Bonitas.</span>
            <button onClick={() => { onRouteChange('sobre-nosotros'); scrollToTop(); }} className="hover:text-slate-300 underline">Sobre Nosotros</button>
            <button onClick={() => { onRouteChange('politica-de-privacidad'); scrollToTop(); }} className="hover:text-slate-300 underline">Privacidad</button>
            <button onClick={() => { onRouteChange('politica-de-cookies'); scrollToTop(); }} className="hover:text-slate-300 underline">Política de Cookies</button>
            <button onClick={() => { onRouteChange('terminos-y-condiciones'); scrollToTop(); }} className="hover:text-slate-300 underline">Términos</button>
            <button onClick={() => { onRouteChange('contacto'); scrollToTop(); }} className="hover:text-slate-300 underline">Contacto</button>
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

