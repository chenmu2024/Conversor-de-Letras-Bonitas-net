import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  BookOpen,
  Copy, 
  Check, 
  Layers, 
  Sparkles, 
  Info,
  Smartphone,
  Globe,
  Sliders,
  ShieldAlert
} from 'lucide-react';
import { 
  UNICODE_COMPATIBILITY_DATA, 
  INVISIBLE_CHARACTERS_DATA,
  CompatibilityStatus,
  UnicodeCompatibilityItem
} from '../data/unicodeCompatibility';
import { OfficialReferencesSection } from './OfficialReferencesSection';

interface UnicodeCompatibilityLabProps {
  onNavigate?: (path: string) => void;
}

export const UnicodeCompatibilityLab: React.FC<UnicodeCompatibilityLabProps> = ({ onNavigate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testInput, setTestInput] = useState<string>('Texto de Prueba');
  const [selectedItem, setSelectedItem] = useState<UnicodeCompatibilityItem | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInternalNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) return; // Native hash navigation
    if (onNavigate && path.startsWith('/')) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const renderStatusBadge = (status?: CompatibilityStatus) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>Comprobado</span>
          </span>
        );
      case 'reference':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>Referencia</span>
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>Variable</span>
          </span>
        );
      case 'unsupported':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
            <span>No compatible</span>
          </span>
        );
      case 'unknown':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span>Sin datos</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* 0. Header Banner with H1 */}
      <header className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black shadow-xs">
          <Layers className="w-4 h-4" />
          <span>Especificación Técnica & Estándares ISO/IEC 10646</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Laboratorio de Compatibilidad Unicode: Matriz Técnica y Referencias Multiplataforma
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Base de datos técnica y referencias estándar para comprender cómo se comportan los bloques de caracteres Unicode en diferentes sistemas operativos y aplicaciones, distinguiendo especificaciones teóricas de comprobaciones documentadas.
        </p>
      </header>

      {/* 1. Quick Navigation Hub */}
      <section 
        aria-label="Navegación del Laboratorio" 
        className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sliders className="w-4 h-4 text-blue-600" aria-hidden="true" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Índice de Secciones
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-medium">
          <a href="#metodologia" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors">
            Metodología de Referencias
          </a>
          <a href="#tabla-compatibilidad" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors">
            Tabla de Compatibilidad
          </a>
          <a href="#espacios-invisibles" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors">
            Caracteres Invisibles
          </a>
          <a href="#probador-en-vivo" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors">
            Probador en Vivo
          </a>
          <a href="#fuentes-oficiales" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors">
            Referencias Oficiales
          </a>
        </div>
      </section>

      {/* 2. Metodología de Comprobaciones (P0-7) */}
      <section 
        id="metodologia" 
        aria-labelledby="metodologia-title" 
        className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/90 rounded-2xl p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Info className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 id="metodologia-title" className="text-xl sm:text-2xl font-bold text-slate-900">
            Criterios de Datos y Metodología
          </h2>
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
          Los resultados de esta página combinan referencias del estándar Unicode, documentación oficial y comprobaciones manuales únicamente cuando estas han sido realizadas y documentadas. Los elementos marcados como &quot;Referencia&quot; no deben interpretarse como una garantía de compatibilidad en una aplicación concreta.
        </p>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
          La codificación Unicode define puntos de código universales, pero la visualización real depende de las fuentes instaladas en el sistema operativo, el motor de renderizado del navegador y las reglas de filtrado de nombres que aplica cada plataforma.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white/90 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">1</span>
              Estándar Unicode
            </h3>
            <p className="text-slate-600">
              Unicode define el código numérico y las propiedades de cada carácter, pero no contiene el dibujo tipográfico final.
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">2</span>
              Fuentes del Sistema Operativo
            </h3>
            <p className="text-slate-600">
              Si el sistema operativo carece de la fuente tipográfica adecuada para un bloque determinado, el glifo se mostrará como un recuadro vacío (tofu).
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">3</span>
              Filtros en Nombres de Usuario
            </h3>
            <p className="text-slate-600">
              Diversas aplicaciones y videojuegos limitan los caracteres admitidos en nombres de perfil aunque la pantalla pueda dibujarlos en mensajes de texto.
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">4</span>
              Actualizaciones Continuas
            </h3>
            <p className="text-slate-600">
              Mantenemos las referencias técnicas en revisión continua conforme se publican nuevas versiones del estándar Unicode y políticas de plataformas.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Tabla Principal de Compatibilidad (P0-8, P0-9) */}
      <section 
        id="tabla-compatibilidad" 
        aria-labelledby="tabla-title" 
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="pb-4 border-b border-slate-200">
          <h2 id="tabla-title" className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            Tabla de Compatibilidad por Plataforma
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Matriz técnica de 16 estilos tipográficos y sus bloques Unicode asociados.
          </p>
        </div>

        {/* Data Source Legend (P0-9) */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-2">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Leyenda de fuentes de datos:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-slate-600">
            <div className="flex items-start gap-1.5">
              <span className="font-semibold text-emerald-800 shrink-0">✅ Comprobado:</span>
              <span>resultado obtenido mediante una prueba manual documentada.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-semibold text-blue-800 shrink-0">📘 Referencia:</span>
              <span>información basada en Unicode o documentación oficial, sin validación manual específica en esa plataforma.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-semibold text-amber-800 shrink-0">⚠️ Variable:</span>
              <span>el resultado puede cambiar según versión, dispositivo o aplicación.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-semibold text-rose-800 shrink-0">❌ No compatible:</span>
              <span>confirmado que la plataforma restringe o no dibuja el carácter.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-semibold text-slate-700 shrink-0">— Sin datos:</span>
              <span>todavía no disponemos de evidencia suficiente.</span>
            </div>
          </div>
        </div>

        {/* Responsive Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="py-3.5 px-4 min-w-[160px]">Estilo</th>
                <th className="py-3.5 px-4 min-w-[130px]">Ejemplo</th>
                <th className="py-3.5 px-4 min-w-[120px]">Rango Unicode</th>
                <th className="py-3.5 px-3 text-center min-w-[85px]">Android</th>
                <th className="py-3.5 px-3 text-center min-w-[85px]">iOS</th>
                <th className="py-3.5 px-3 text-center min-w-[95px]">Instagram</th>
                <th className="py-3.5 px-3 text-center min-w-[95px]">WhatsApp</th>
                <th className="py-3.5 px-3 text-center min-w-[95px]">Free Fire</th>
                <th className="py-3.5 px-3 text-center min-w-[100px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {UNICODE_COMPATIBILITY_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div>{item.name}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{item.blockName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-base text-blue-900">
                    {item.example}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                    {item.unicodeRange}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {renderStatusBadge(item.android.status)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {renderStatusBadge(item.ios.status)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {renderStatusBadge(item.instagram.status)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {renderStatusBadge(item.whatsapp.status)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {renderStatusBadge(item.freeFire.status)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleCopy(item.example, `tab-${item.id}`)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors"
                        title="Copiar ejemplo"
                        aria-label={`Copiar ejemplo de ${item.name}`}
                      >
                        {copiedId === `tab-${item.id}` ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                          selectedItem?.id === item.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                        aria-expanded={selectedItem?.id === item.id}
                      >
                        Detalles
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Item Detail Inspector Modal / Drawer (P0-5: No fake fallback environments) */}
        {selectedItem && (
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Informe de Referencia Técnica
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedItem.name}</h3>
                <p className="text-xs text-slate-600">{selectedItem.description}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-xs px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Android</span>
                  {renderStatusBadge(selectedItem.android.status)}
                </div>
                {selectedItem.android.environment && (
                  <div className="text-slate-500 text-[11px]">{selectedItem.android.environment}</div>
                )}
                {selectedItem.android.notes && (
                  <div className="mt-1 text-slate-700 text-[11px]">{selectedItem.android.notes}</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                  <span>iOS (iPhone)</span>
                  {renderStatusBadge(selectedItem.ios.status)}
                </div>
                {selectedItem.ios.environment && (
                  <div className="text-slate-500 text-[11px]">{selectedItem.ios.environment}</div>
                )}
                {selectedItem.ios.notes && (
                  <div className="mt-1 text-slate-700 text-[11px]">{selectedItem.ios.notes}</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Instagram</span>
                  {renderStatusBadge(selectedItem.instagram.status)}
                </div>
                {selectedItem.instagram.environment && (
                  <div className="text-slate-500 text-[11px]">{selectedItem.instagram.environment}</div>
                )}
                {selectedItem.instagram.notes && (
                  <div className="mt-1 text-slate-700 text-[11px]">{selectedItem.instagram.notes}</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Free Fire</span>
                  {renderStatusBadge(selectedItem.freeFire.status)}
                </div>
                {selectedItem.freeFire.environment && (
                  <div className="text-slate-500 text-[11px]">{selectedItem.freeFire.environment}</div>
                )}
                {selectedItem.freeFire.notes && (
                  <div className="mt-1 text-slate-700 text-[11px]">{selectedItem.freeFire.notes}</div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Última revisión: {selectedItem.lastReviewed}</span>
              <span className="font-mono">Bloque: {selectedItem.unicodeRange}</span>
            </div>
          </div>
        )}

        {/* Compatibility Notice (P0-17) */}
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong>Aviso de compatibilidad:</strong> La compatibilidad mostrada no constituye una garantía permanente. Las plataformas y desarrolladores de aplicaciones pueden actualizar filtros, fuentes y reglas de nombres sin previo aviso.
          </p>
        </div>
      </section>

      {/* 4. Comparativa de Caracteres Invisibles */}
      <section 
        id="espacios-invisibles" 
        aria-labelledby="invisibles-title" 
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs"
      >
        <div className="mb-6 pb-4 border-b border-slate-200">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            Referencia Técnica
          </span>
          <h2 id="invisibles-title" className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            No Todos los Caracteres Invisibles son Iguales
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
            Existen múltiples caracteres en el estándar Unicode que carecen de glifo visible. Cada uno tiene comportamientos distintos respecto a si ocupa ancho tipográfico, si es admitido en formularios de registro y cómo lo procesan los sanitizadores de texto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INVISIBLE_CHARACTERS_DATA.map((char) => (
            <div 
              key={char.id} 
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{char.name}</h3>
                    <span className="text-xs text-slate-500 font-mono">{char.category}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-mono font-bold text-xs rounded-md">
                    {char.codePoint}
                  </span>
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-200 mb-4 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Muestra:</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-dashed border-slate-300 font-bold">
                      [{char.character}]
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">HTML Hex:</span>
                    <span className="text-slate-800">{char.hexEntity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">¿Ocupa espacio/ancho?:</span>
                    <span className={char.occupiesWidth ? 'text-emerald-700 font-semibold' : 'text-slate-600'}>
                      {char.occupiesWidth ? 'Sí (Ancho de columna)' : 'No (Ancho cero / 0px)'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 space-y-2 mb-4">
                  <div>
                    <strong className="text-slate-900 block">Uso habitual:</strong>
                    <span>{char.typicalUse}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Propiedades y limitaciones:</strong>
                    <span>{char.limitations}</span>
                  </div>
                </div>
              </div>

              {/* Copy Action Buttons */}
              <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCopy(char.character, `char-${char.id}`)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  {copiedId === `char-${char.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Carácter</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleCopy(char.codePoint, `code-${char.id}`)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                >
                  {copiedId === `code-${char.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Probador en Vivo de Renderizado */}
      <section 
        id="probador-en-vivo" 
        aria-labelledby="probador-title" 
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 id="probador-title" className="text-xl sm:text-2xl font-bold text-slate-900">
              Probador de Renderizado en tu Dispositivo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Comprueba en tiempo real cómo tu navegador actual dibuja los glifos matemáticos y combinatorios.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="lab-tester-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Texto de prueba:
          </label>
          <input
            id="lab-tester-input"
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Escribe aquí para comprobar el renderizado..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {UNICODE_COMPATIBILITY_DATA.slice(0, 6).map((item) => (
            <div key={`tester-${item.id}`} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-500 block truncate">
                  {item.name}
                </span>
                <div className="text-sm font-mono text-slate-900 truncate">
                  {item.example}
                </div>
              </div>
              <button
                onClick={() => handleCopy(item.example, `live-${item.id}`)}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors shrink-0"
                aria-label={`Copiar estilo ${item.name}`}
              >
                {copiedId === `live-${item.id}` ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contextual Topic Clusters Navigation Hub */}
      <section 
        aria-labelledby="clusters-title" 
        className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-blue-400" aria-hidden="true" />
          <h2 id="clusters-title" className="text-xl font-bold">
            Explora las Herramientas por Plataforma y Categoría
          </h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm mb-6 max-w-2xl">
          Aplica estos estilos tipográficos con nuestras herramientas especializadas optimizadas para cada red social y videojuego:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-2">
                <Globe className="w-4 h-4" />
                <span>Redes Sociales</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-none p-0 m-0">
                <li>
                  <a 
                    href="/letras-para-instagram/" 
                    onClick={(e) => handleInternalNavigate(e, '/letras-para-instagram/')}
                    className="hover:text-white hover:underline"
                  >
                    Letras para Instagram Bio
                  </a>
                </li>
                <li>
                  <a 
                    href="/letras-para-tiktok/" 
                    onClick={(e) => handleInternalNavigate(e, '/letras-para-tiktok/')}
                    className="hover:text-white hover:underline"
                  >
                    Letras para TikTok
                  </a>
                </li>
                <li>
                  <a 
                    href="/letras-para-whatsapp/" 
                    onClick={(e) => handleInternalNavigate(e, '/letras-para-whatsapp/')}
                    className="hover:text-white hover:underline"
                  >
                    Letras para WhatsApp
                  </a>
                </li>
                <li>
                  <a 
                    href="/contador-de-caracteres-bio/" 
                    onClick={(e) => handleInternalNavigate(e, '/contador-de-caracteres-bio/')}
                    className="hover:text-white hover:underline"
                  >
                    Contador de Caracteres Bio
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-2">
                <Smartphone className="w-4 h-4" />
                <span>Gaming & Free Fire</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-none p-0 m-0">
                <li>
                  <a 
                    href="/letras-para-free-fire/" 
                    onClick={(e) => handleInternalNavigate(e, '/letras-para-free-fire/')}
                    className="hover:text-white hover:underline"
                  >
                    Letras para Free Fire
                  </a>
                </li>
                <li>
                  <a 
                    href="/generador-de-nicks-free-fire/" 
                    onClick={(e) => handleInternalNavigate(e, '/generador-de-nicks-free-fire/')}
                    className="hover:text-white hover:underline"
                  >
                    Generador de Nicks con Alas
                  </a>
                </li>
                <li>
                  <a 
                    href="/espacio-invisible/" 
                    onClick={(e) => handleInternalNavigate(e, '/espacio-invisible/')}
                    className="hover:text-white hover:underline"
                  >
                    Espacio Invisible [ㅤ]
                  </a>
                </li>
                <li>
                  <a 
                    href="/decorador-de-nicks/" 
                    onClick={(e) => handleInternalNavigate(e, '/decorador-de-nicks/')}
                    className="hover:text-white hover:underline"
                  >
                    Decorador de Nicks Gamer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Tipografía & Estilos</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-none p-0 m-0">
                <li>
                  <a 
                    href="/traductor-cursiva/" 
                    onClick={(e) => handleInternalNavigate(e, '/traductor-cursiva/')}
                    className="hover:text-white hover:underline"
                  >
                    Traductor a Cursiva
                  </a>
                </li>
                <li>
                  <a 
                    href="/letras-goticas/" 
                    onClick={(e) => handleInternalNavigate(e, '/letras-goticas/')}
                    className="hover:text-white hover:underline"
                  >
                    Letras Góticas Fraktur
                  </a>
                </li>
                <li>
                  <a 
                    href="/abecedario-letras-bonitas/" 
                    onClick={(e) => handleInternalNavigate(e, '/abecedario-letras-bonitas/')}
                    className="hover:text-white hover:underline"
                  >
                    Abecedario Completo A-Z
                  </a>
                </li>
                <li>
                  <a 
                    href="/simbolos-y-emojis/" 
                    onClick={(e) => handleInternalNavigate(e, '/simbolos-y-emojis/')}
                    className="hover:text-white hover:underline"
                  >
                    Símbolos y Emojis
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Fuentes y Referencias Oficiales */}
      <OfficialReferencesSection />
    </div>
  );
};
