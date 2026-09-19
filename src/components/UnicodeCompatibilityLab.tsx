import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Copy, 
  Check, 
  Layers, 
  Sparkles, 
  ArrowRight,
  Info,
  Smartphone,
  Globe,
  Sliders
} from 'lucide-react';
import { 
  UNICODE_COMPATIBILITY_DATA, 
  INVISIBLE_CHARACTERS_DATA,
  CompatibilityStatus,
  UnicodeCompatibilityItem,
  InvisibleCharacterItem
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
          Laboratorio de Compatibilidad Unicode: Matriz y Pruebas Multiplataforma
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Base de datos técnica y laboratorio interactivo para verificar qué estilos tipográficos y caracteres especiales (como el Hangul Filler U+3164) son soportados en cada sistema operativo y red social sin mostrar caracteres rotos o tofu (□).
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
            Metodología de Pruebas
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

      {/* 2. Metodología de Comprobaciones (P0-5) */}
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
            Cómo Realizamos las Comprobaciones Técnicas
          </h2>
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
          La codificación Unicode no garantiza que todos los caracteres se visualicen de la misma forma en todas las plataformas.
          La apariencia real depende de las fuentes instaladas en el sistema operativo, el navegador y los filtros de cada aplicación.
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
              Si Android, iOS o Windows carecen de la fuente correspondiente para un bloque, el glifo se mostrará como un recuadro vacío (tofu).
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">3</span>
              Filtros en Nombres de Usuario
            </h3>
            <p className="text-slate-600">
              Redes sociales como TikTok o juegos como Free Fire limitan los caracteres admitidos en nombres de perfil aunque el móvil pueda dibujarlos.
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">4</span>
              Actualizaciones Continuas
            </h3>
            <p className="text-slate-600">
              Los resultados reflejan pruebas reales realizadas en entornos controlados y se actualizan periódicamente ante nuevos parches de software.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Tabla Principal de Compatibilidad (P0-6) */}
      <section 
        id="tabla-compatibilidad" 
        aria-labelledby="tabla-title" 
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h2 id="tabla-title" className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              Tabla de Compatibilidad por Plataforma
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pruebas empíricas sobre 16 estilos tipográficos clave y sus bloques Unicode asociados.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Comprobado
            </span>
            <span className="inline-flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Variable
            </span>
            <span className="inline-flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-rose-600" /> No compatible
            </span>
          </div>
        </div>

        {/* Responsive Table Container with Horizontal Scroll (P2-8) */}
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

        {/* Selected Item Detail Inspector Modal / Drawer (P0-4) */}
        {selectedItem && (
          <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Informe de Prueba Técnica
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
                <div className="text-slate-500">{selectedItem.android.environment || 'Android 14 (Pixel / Samsung)'}</div>
                {selectedItem.android.notes && (
                  <div className="mt-1 text-slate-700 text-[11px]">{selectedItem.android.notes}</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                  <span>iOS (iPhone)</span>
                  {renderStatusBadge(selectedItem.ios.status)}
                </div>
                <div className="text-slate-500">{selectedItem.ios.environment || 'iOS 18 (Safari 18)'}</div>
                {selectedItem.ios.notes && (
                  <div className="mt-1 text-slate-700 text-[11px]">{selectedItem.ios.notes}</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Instagram</span>
                  {renderStatusBadge(selectedItem.instagram.status)}
                </div>
                <div className="text-slate-500">{selectedItem.instagram.environment || 'Instagram v345'}</div>
                {selectedItem.instagram.notes && (
                  <div className="mt-1 text-slate-700 text-[11px]">{selectedItem.instagram.notes}</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Free Fire</span>
                  {renderStatusBadge(selectedItem.freeFire.status)}
                </div>
                <div className="text-slate-500">{selectedItem.freeFire.environment || 'Free Fire OB45/OB46'}</div>
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
      </section>

      {/* 4. Comparativa de Caracteres Invisibles (P0-7, P0-10, P0-11) */}
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
                    <strong className="text-slate-900 block">Limitaciones técnicas:</strong>
                    <span>{char.limitations}</span>
                  </div>
                </div>
              </div>

              {/* Copy Action Buttons (P0-11) */}
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

      {/* 6. Contextual Topic Clusters Navigation Hub (P1-12, P1-23) */}
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

      {/* 7. Fuentes y Referencias Oficiales (P1-6, P1-7) */}
      <OfficialReferencesSection />
    </div>
  );
};
