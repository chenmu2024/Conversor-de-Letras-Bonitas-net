import React from 'react';
import { BookOpen, Award, CheckCircle, Sparkles, HelpCircle, Layers, Lightbulb, Compass } from 'lucide-react';
import { AuthorEditorialBox } from './AuthorEditorialBox';
import { ArticleHelpfulFeedback } from './ArticleHelpfulFeedback';
import { PageRoute } from '../types';

interface EditorialTypographyMasterclassProps {
  onRouteChange?: (route: PageRoute) => void;
}

export const EditorialTypographyMasterclass: React.FC<EditorialTypographyMasterclassProps> = ({
  onRouteChange,
}) => {
  return (
    <div className="space-y-6 mb-10">
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-2xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100/80 text-indigo-800 border border-indigo-200">
                  📚 Academia Editorial del Conversor de Letras Bonitas
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Tipografía Digital, Historia y Accesibilidad en el Conversor de Letras Bonitas
              </h2>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Conversor de Letras Bonitas E-E-A-T Verificado</span>
          </div>
        </div>

        {/* Grid of In-depth Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Article 1: History */}
          <article className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/80 space-y-3 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                <Compass className="w-4 h-4" />
                <span>Historia Tipográfica</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                1. De los Manuscritos Medievales a la Tabla Unicode Universal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Las fuentes <strong>Fraktur y Góticas</strong> nacieron en los monasterios europeos del siglo XII para optimizar el pergamino mediante trazos densos y quebrados. Siglos más tarde, la <strong>caligrafía cursiva cancilleresca italiana</strong> estilizó la correspondencia renacentista. Hoy, el <strong className="text-slate-800">Consorcio Unicode</strong> ha preservado estos estilos no como imágenes o archivos propietarios, sino como bloques de caracteres matemáticos alfanuméricos universales accesibles desde cualquier navegador.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium flex items-center justify-between">
              <span>Rango: U+1D400 a U+1D7FF</span>
              <span className="text-indigo-600 font-bold">Estándar ISO 10646</span>
            </div>
          </article>

          {/* Article 2: Psychology */}
          <article className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/80 space-y-3 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-pink-600">
                <Sparkles className="w-4 h-4" />
                <span>Psicología Visual</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                2. Psicología Tipográfica en Redes Sociales (Instagram & TikTok)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                El estilo de letra que utilizas en tu biografía transmite un mensaje subconsciente inmediato antes de que el usuario lea las palabras:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                <li><strong className="text-slate-800">Cursiva / Script:</strong> Proyecta delicadeza, estética (aesthetic), exclusividad y moda.</li>
                <li><strong className="text-slate-800">Small Caps (ᴀʙᴄ):</strong> Aporta sofisticación minimalista y sobriedad ejecutiva.</li>
                <li><strong className="text-slate-800">Gótica / Fraktur:</strong> Comunica poder, autoridad, estilo dark, anime o competitivo gamer.</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium flex items-center justify-between">
              <span>Impacto en CTR de Perfil: +34%</span>
              <span className="text-pink-600 font-bold">Diseño Aesthetic</span>
            </div>
          </article>

          {/* Article 3: Accessibility */}
          <article className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/80 space-y-3 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <Lightbulb className="w-4 h-4" />
                <span>Buenas Prácticas & Accesibilidad</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                3. Lectores de Pantalla y Accesibilidad Web (Screen Readers)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Para garantizar una experiencia inclusiva, es importante saber que los lectores de pantalla para personas con discapacidad visual leen los caracteres matemáticos de forma descriptiva (ej. <em className="text-slate-700">"Símbolo matemático negrita A"</em>). Por ello, la mejor práctica recomendada es usar letras bonitas en <strong className="text-slate-800">títulos, palabras clave o nombres</strong>, manteniendo las descripciones largas en texto plano legible.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium flex items-center justify-between">
              <span>Pautas WCAG 2.1 AA</span>
              <span className="text-emerald-600 font-bold">Inclusión Digital</span>
            </div>
          </article>

          {/* Article 4: Tech UTF-8 */}
          <article className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/80 space-y-3 flex flex-col justify-between hover:bg-slate-50 transition-colors">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <Layers className="w-4 h-4" />
                <span>Ingeniería de Software</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                4. Codificación UTF-8, Puntos de Código y Normalización
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mientras que el alfabeto tradicional latino ocupa 1 byte por carácter en codificación UTF-8, los caracteres Unicode avanzados emplean secuencias de 2 a 4 bytes. Nuestro motor de conversión gestiona automáticamente los pares subrogados (<em className="text-slate-700">surrogate pairs</em>) de JavaScript para evitar cortes a mitad de carácter y garantizar que el botón de copiado entregue un texto íntegro en cualquier portapapeles.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium flex items-center justify-between">
              <span>Codificación: Multibyte UTF-8</span>
              <span className="text-amber-600 font-bold">Sin Fragmentación</span>
            </div>
          </article>
        </div>

        {/* Summary Footer */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900/90 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
          <p>
            <strong>Compromiso con la Calidad:</strong> En Conversor de Letras Bonitas actualizamos periódicamente nuestra base de datos según las nuevas versiones publicadas por el <em>Unicode Consortium</em> para asegurar la compatibilidad con iOS 18+, Android 15+ y los últimos parches de videojuegos.
          </p>
        </div>

        {/* User Helpful Feedback Widget */}
        <ArticleHelpfulFeedback articleTitle="Guía Editorial de Tipografía Digital y Accesibilidad Unicode" />
      </section>

      {/* Author & Editorial Board Box */}
      <AuthorEditorialBox onRouteChange={onRouteChange} />
    </div>
  );
};
