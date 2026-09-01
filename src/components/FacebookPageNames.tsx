import React, { useState } from 'react';
import { 
  Users, 
  Copy, 
  Check, 
  Sparkles, 
  BadgeCheck, 
  Crown, 
  Store, 
  Heart, 
  Flame, 
  ListOrdered,
  Layers,
  Star,
  Zap,
  Globe
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface PageCategoryPreset {
  category: string;
  icon: string;
  examples: string[];
}

const PAGE_CATEGORY_IDEAS: PageCategoryPreset[] = [
  {
    category: '💼 Negocios & Tiendas Online',
    icon: '🛍️',
    examples: [
      'Boutique Moda Chic',
      'Tecno Express Oficial',
      'Dulce Tentación Bakery',
      'Zapatería & Calzado Pro',
      'Cosméticos & Belleza Natural',
      'Inmobiliaria Premier',
    ],
  },
  {
    category: '🎬 Creadores Digitales & Vlogs',
    icon: '✨',
    examples: [
      'Alex Vlogs & Viajes',
      'Cocina con Amor y Sabor',
      'Humor Diario Oficial',
      'Consejos & Motivación Hoy',
      'El Rincón del Cine y Series',
      'Mundo Curioso & Datos',
    ],
  },
  {
    category: '👥 Grupos Comunitarios & Compra/Venta',
    icon: '🏙️',
    examples: [
      'Compra y Venta Oficial 2026',
      'Vecinos Unidos Centro',
      'Emprendedores & Negocios',
      'Alquileres Directos Sin Comisión',
      'Adopción Responsable de Mascotas',
      'Ofertas & Chollos Exclusivos',
    ],
  },
  {
    category: '🎮 Gaming & Streamers',
    icon: '🔥',
    examples: [
      'Clan Insano Gaming',
      'Zona PvP & Torneos',
      'Clips Virales & Mejores Jugadas',
      'Directos Nocturnos Oficial',
      'Master Gamer Team',
      'El Refugio del Streamer',
    ],
  },
];

const FB_GROUP_RULES = [
  { num: '❶', title: 'Respeto mutuo y cero discriminación', desc: 'No se tolerarán insultos, acoso, faltas de respeto ni mensajes de odio de ningún tipo hacia los miembros o administradores.' },
  { num: '❷', title: 'Cero Spam y enlaces no autorizados', desc: 'Queda estrictamente prohibido compartir enlaces a grupos externos, cadenas de mensajes o publicidad sin permiso de los moderadores.' },
  { num: '❸', title: 'Mantener la temática del grupo', desc: 'Todas las publicaciones deben estar directamente relacionadas con el objetivo y tema principal de la comunidad.' },
  { num: '❹', title: 'Precio obligatorio en publicaciones de venta', desc: 'Si publicas un artículo o servicio, debes incluir obligatoriamente el precio, estado y fotografías reales.' },
  { num: '❺', title: 'Reportar antes de responder a provocaciones', desc: 'Si detectas a un usuario incumpliendo las normas, utiliza el botón de reporte para que los administradores actúen rápidamente.' },
];

export const FacebookPageNames: React.FC = () => {
  const [baseName, setBaseName] = useState('Emprendedores Digitales');
  const [selectedDecoration, setSelectedDecoration] = useState('none');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Font styles suited for Facebook Page Names
  const pageFontStyles = [
    { id: 'sans-bold', label: 'Negrita Sans (Recomendada para Páginas Oficiales)', tag: 'Oficial' },
    { id: 'small-caps', label: 'Small Caps (Aesthetic & Minimalista)', tag: 'Aesthetic' },
    { id: 'sans-bold-italic', label: 'Negrita Cursiva (Dinámica y Enérgica)', tag: 'Moderna' },
    { id: 'double-struck', label: 'Doble Trazo / Serif (Prestigio & Club)', tag: 'Elegante' },
    { id: 'monospace', label: 'Monospace / Máquina (Tech & Blog)', tag: 'Tech' },
    { id: 'bold-serif', label: 'Serif Clásica en Negrita (Formal & Noticias)', tag: 'Clásica' },
    { id: 'circles-filled', label: 'Círculos Rellenos (Llamativa)', tag: 'Destacada' },
  ];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const applyDecoration = (formattedText: string, decoType: string): string => {
    switch (decoType) {
      case 'badge':
        return `${formattedText} ✓`;
      case 'crown':
        return `👑 ${formattedText}`;
      case 'sparkles':
        return `✨ ${formattedText} ✨`;
      case 'fire':
        return `🔥 ${formattedText} 🔥`;
      case 'brackets':
        return `【 ${formattedText} 】`;
      case 'heart':
        return `🌸 ${formattedText} 🌸`;
      default:
        return formattedText;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Páginas & Grupos FB
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Nombres de Marcas, Creadores y Reglas Comunitarias
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <Users className="w-5 h-5 text-blue-600" />
          <span>Generador de Nombres con Estilo para Páginas y Grupos de Facebook</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Crea un nombre memorable y profesional para tu Página de empresa, canal de creador digital o Grupo comunitario que destaque en los resultados de búsqueda de Facebook.
        </p>
      </div>

      {/* Input & Badge Controls */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-slate-50 border border-blue-200/70 space-y-4">
        <div>
          <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
            Escribe el Nombre Base de tu Página o Grupo:
          </label>
          <input
            type="text"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            placeholder="Ej: Boutique Moda, Alex Vlogs, Vecinos Unidos..."
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Decoration Badges */}
        <div>
          <label className="text-[11px] font-extrabold text-slate-700 block mb-1.5">
            Añadir Insignia o Decoración Opcional:
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'none', label: 'Sin Decoración' },
              { id: 'badge', label: 'Insignia Verificado (✓)' },
              { id: 'crown', label: 'Corona VIP (👑)' },
              { id: 'sparkles', label: 'Destellos (✨)' },
              { id: 'fire', label: 'Fuego (🔥)' },
              { id: 'brackets', label: 'Corchetes 【 】' },
              { id: 'heart', label: 'Flores (🌸)' },
            ].map((deco) => (
              <button
                key={deco.id}
                type="button"
                onClick={() => setSelectedDecoration(deco.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedDecoration === deco.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                {deco.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Names List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Opciones de Nombres Formateados para Facebook:</span>
          </h4>
          <span className="text-xs text-slate-500 font-bold">{pageFontStyles.length} Variaciones</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pageFontStyles.map((st) => {
            const gen = FONT_GENERATORS.find((g) => g.id === st.id) || FONT_GENERATORS[0];
            const raw = gen.transform(baseName || 'Página Oficial');
            const decorated = applyDecoration(raw, selectedDecoration);
            const isCopied = copiedId === st.id;

            return (
              <div
                key={st.id}
                className="p-3.5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-300 rounded-2xl transition-all shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-extrabold uppercase">
                    <span>{st.label}</span>
                    <span className="bg-blue-100/60 text-blue-700 px-1.5 py-0.2 rounded text-[9px]">
                      {st.tag}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 truncate mt-1 font-mono">
                    {decorated}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(decorated, st.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-2xs ${
                    isCopied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspiration by Category */}
      <div className="pt-2">
        <h4 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <Store className="w-4 h-4 text-blue-600" />
          <span>Ideas de Nombres por Nicho & Temática (Toca para probar):</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PAGE_CATEGORY_IDEAS.map((cat, idx) => (
            <div key={idx} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <span>{cat.icon}</span>
                <span className="truncate">{cat.category}</span>
              </div>
              <div className="space-y-1">
                {cat.examples.map((ex, exIdx) => (
                  <button
                    key={exIdx}
                    type="button"
                    onClick={() => setBaseName(ex)}
                    className="block w-full text-left px-2 py-1 text-xs text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors truncate font-medium"
                  >
                    • {ex}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Rules Formatter with Numbers */}
      <div className="border-t border-slate-200 pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-blue-600" />
            <span>Reglas Oficiales para Grupos de Facebook (Listas para Copiar):</span>
          </h4>
          <span className="text-xs text-slate-500 font-bold">5 Normas Esenciales</span>
        </div>

        <div className="space-y-2.5">
          {FB_GROUP_RULES.map((rule, idx) => {
            const boldGen = FONT_GENERATORS.find((g) => g.id === 'sans-bold') || FONT_GENERATORS[0];
            const fullRuleText = `${rule.num} ${boldGen.transform(rule.title)}: ${rule.desc}`;
            const isCopied = copiedId === `rule-${idx}`;

            return (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="text-xs leading-relaxed text-slate-800">
                  <span className="font-black text-blue-600 text-sm mr-1.5">{rule.num}</span>
                  <strong>{boldGen.transform(rule.title)}:</strong> {rule.desc}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(fullRuleText, `rule-${idx}`)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 self-end sm:self-auto ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-blue-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copiado' : 'Copiar Regla'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
