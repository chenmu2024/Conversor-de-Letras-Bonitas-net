import React, { useState } from 'react';
import { BookOpen, Code, Copy, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  unicodeRange: string;
  definition: string;
  exampleOriginal: string;
  exampleTransformed: string;
  useCase: string;
}

export const UnicodeGlossarySection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const glossaryTerms: GlossaryTerm[] = [
    {
      term: 'Hangul Filler (Espacio Invisible)',
      unicodeRange: 'U+3164 (ㅤ)',
      definition: 'Carácter tipográfico coreano diseñado originalmente para representar consonantes o vocales aisladas en el sistema Hangul. Como los navegadores y apps móviles lo procesan como un carácter imprimible con anchura pero sin tinta visible, es el estándar utilizado para nicks invisibles en Free Fire y saltos de línea limpios en biografías de Instagram.',
      exampleOriginal: 'Gamer Pro',
      exampleTransformed: 'GamerㅤPro',
      useCase: 'Nombres invisibles de Free Fire, ocultar nombre en WhatsApp, espacios en blanco en bio.',
    },
    {
      term: 'Mathematical Alphanumeric Symbols (Cursivas y Negritas)',
      unicodeRange: 'U+1D400 - U+1D7FF',
      definition: 'Bloque oficial del Consorcio Unicode que contiene caracteres alfanuméricos en estilos cursiva (Script), negrita (Bold), doble trazo (Double-Struck / Blackboard Bold) y monospace. Creados para notación matemática y fórmulas científicas, hoy son la base de los conversores de letras bonitas para redes sociales.',
      exampleOriginal: 'Letras Bonitas',
      exampleTransformed: '𝓛𝓮𝓽𝓻𝓪𝓼 𝓑𝓸𝓷𝓲𝓽𝓪𝓼 / 𝕃𝕖𝕥𝕣𝕒𝕤 𝔹𝕠𝕟𝕚𝕥𝕒𝕤',
      useCase: 'Biografías aesthetic, firmas de correos, nombres de marcas en Instagram y TikTok.',
    },
    {
      term: 'Letras Góticas y Fraktur Medieval',
      unicodeRange: 'U+1D504 - U+1D537',
      definition: 'Glifos basados en la caligrafía alemana medieval Fraktur y Textura Quadrata empleada en los primeros libros impresos de Europa (como la Biblia de Gutenberg). Al estar codificados en Unicode, permiten imitar tipografías clásicas sin necesidad de instalar archivos .TTF o .OTF.',
      exampleOriginal: 'Gothic Font',
      exampleTransformed: '𝕲𝖔𝖙𝖍𝖎𝖈 𝕱𝖔𝖓𝖙',
      useCase: 'Nicks de clanes de Free Fire, tatuajes textuales, estética dark/punk en Twitter y Discord.',
    },
    {
      term: 'Combining Diacritical Marks (Texto Glitch & Zalgo)',
      unicodeRange: 'U+0300 - U+036F',
      definition: 'Marcas diacríticas combinables (acentos, tildes, virgulillas, puntos superiores e inferiores) que se superponen verticalmente sobre el carácter base anterior. Al concatenar múltiples marcas sobre una sola letra, se produce el efecto visual distorsionado conocido como texto Zalgo o Glitch.',
      exampleOriginal: 'Terror Glitch',
      exampleTransformed: 'T̷e̷r̷r̷o̷r̷ ̷G̷l̷i̷t̷c̷h̷',
      useCase: 'Efectos de terror, estética hacker, nombres intimidantes en juegos competitivos.',
    },
    {
      term: 'Enclosed Alphanumerics (Letras en Círculos y Cuadros)',
      unicodeRange: 'U+2460 - U+24FF & U+1F100 - U+1F1FF',
      definition: 'Caracteres alfanuméricos encerrados dentro de círculos blancos, círculos negros sólidos, cuadrados y paréntesis. Muy utilizados en listas numeradas, viñetas visuales y para destacar iniciales de nombres de usuario.',
      exampleOriginal: 'Circulo',
      exampleTransformed: '🅒🅘🅡🅒🅤🅛🅞 / Ⓒⓘⓡⓒⓤⓛⓞ',
      useCase: 'Nombres de canales de WhatsApp, listas organizadas en Instagram y títulos llamativos en Facebook.',
    },
    {
      term: 'Small Capital Letters (Small Caps / Versalitas)',
      unicodeRange: 'U+1D00 - U+1D7F & Extensiones Fonéticas',
      definition: 'Caracteres en minúscula que reproducen la forma geométrica de las letras mayúsculas con la altura de x (x-height). Proceden del Alfabeto Fonético Internacional (IPA) y aportan un toque sobrio y minimalista al texto.',
      exampleOriginal: 'Minimalist Bio',
      exampleTransformed: 'ᴍɪɴɪᴍᴀʟɪsᴛ ʙɪᴏ',
      useCase: 'Estética clean girl en Instagram, descripciones profesionales en LinkedIn y bio en TikTok.',
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section
      id="glosario-unicode-seccion"
      className="mb-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Conversor de Letras Bonitas · Glosario Técnico
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Glosario Técnico del Conversor de Letras Bonitas y Unicode
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Aprende cómo funciona internamente el Conversor de Letras Bonitas mediante el estándar universal <strong>Unicode ISO/IEC 10646</strong> y por qué puedes copiarlas y pegarlas en múltiples aplicaciones y redes sociales.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Plegar Glosario' : 'Desplegar Glosario Completo'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {glossaryTerms.map((item, idx) => (
            <li
              key={item.term}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-rose-300 transition-colors list-none"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {idx + 1}. {item.term}
                  </h3>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 shrink-0">
                    {item.unicodeRange}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mt-2">
                  {item.definition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="truncate mr-2">
                    <span className="text-[11px] text-slate-600 font-semibold block">Ejemplo Convertido:</span>
                    <span className="font-semibold text-slate-900">{item.exampleTransformed}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.exampleTransformed)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition-colors shrink-0"
                    title="Copiar ejemplo"
                    aria-label={`Copiar ejemplo de ${item.term}`}
                  >
                    {copiedCode === item.exampleTransformed ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Uso principal:</span> {item.useCase}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
