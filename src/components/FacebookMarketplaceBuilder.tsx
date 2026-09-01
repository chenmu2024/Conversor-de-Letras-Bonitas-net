import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Copy, 
  Check, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  MapPin, 
  Package, 
  Truck, 
  Send,
  HelpCircle
} from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

interface MarketplacePreset {
  id: string;
  category: string;
  name: string;
  price: string;
  oldPrice: string;
  condition: string;
  location: string;
  shipping: string;
  features: string[];
  cta: string;
}

const MARKETPLACE_PRESETS: MarketplacePreset[] = [
  {
    id: 'tech',
    category: '📱 Tecnología / Celulares',
    name: 'iPhone 14 Pro Max 256GB - Libre de Fábrica',
    price: '799€',
    oldPrice: '1.099€',
    condition: 'Como Nuevo (98% Batería)',
    location: 'Centro - Entrega en mano o envíos',
    shipping: 'Envíos asegurados 24h a toda España / País',
    features: [
      'Sin ningún rasguño ni detalle estético',
      'Incluye caja original, cable nuevo y 2 fundas de regalo',
      'Factura y garantía vigente',
      'Probado y 100% funcional con cualquier operador'
    ],
    cta: 'Escríbeme por mensaje directo (Inbox) para coordinar entrega hoy mismo 📲'
  },
  {
    id: 'fashion',
    category: '👟 Moda / Calzado & Ropa',
    name: 'Zapatillas Urbanas Edición Limitada (Talla 42)',
    price: '45€',
    oldPrice: '89€',
    condition: 'Totalmente Nuevas con Etiquetas',
    location: 'Envíos a todo el país',
    shipping: 'Envío gratis en compras de 2 o más pares',
    features: [
      'Material de primera calidad y máxima comodidad',
      'Disponibles en colores Negro, Blanco y Gris',
      'Tallas disponibles del 38 al 44',
      'Pago contra entrega disponible en zonas seleccionadas'
    ],
    cta: '¡Pocas unidades disponibles! Envía mensaje privado con tu talla 📦'
  },
  {
    id: 'car',
    category: '🚗 Autos & Motos',
    name: 'Volkswagen Golf 2.0 TDI - Único Dueño',
    price: '9.800€',
    oldPrice: '11.500€',
    condition: 'Excelente estado de motor y chapa',
    location: 'Madrid / Zona Norte',
    shipping: 'Prueba mecánica sin compromiso en tu taller de confianza',
    features: [
      'Año: 2019 | Kilometraje: 85.000 km reales comprobables',
      'Mantenimiento al día con libro de revisiones oficial',
      'ITV recién pasada, neumáticos al 90%',
      'Equipamiento full: Navegador GPS, Sensores y Cámara trasera'
    ],
    cta: 'Para más fotos, videos o coordinar prueba, escríbeme al Inbox o WhatsApp 📲'
  },
  {
    id: 'home',
    category: '🏠 Hogar & Muebles',
    name: 'Sofá Chaise Longue 3 Plazas Reclinable',
    price: '280€',
    oldPrice: '520€',
    condition: 'Poco uso, tejido antimanchas premium',
    location: 'Recogida local o flete económico',
    shipping: 'Ayuda para cargar en tu vehículo',
    features: [
      'Medidas: 240cm ancho x 160cm chaise longue',
      'Cojines desenfundables y lavables a máquina',
      'Estructura de madera maciza super resistente',
      'Color Gris Marengo moderno'
    ],
    cta: 'Se vende por mudanza urgente. Interesados enviar mensaje privado 🛋️'
  },
  {
    id: 'service',
    category: '🛠️ Servicios & Profesionales',
    name: 'Reformas Integrales, Pintura y Electricidad',
    price: 'Presupuesto GRATIS',
    oldPrice: '',
    condition: 'Garantía por escrito de 2 años',
    location: 'Atención en toda la ciudad y alrededores',
    shipping: 'Visita y asesoramiento sin costo',
    features: [
      'Más de 12 años de experiencia comprobada con referencias',
      'Materiales de primera calidad y máxima limpieza en obra',
      'Trabajos rápidos cumpliendo plazos estrictos',
      'Precios transparentes y sin sorpresas'
    ],
    cta: 'Solicita tu cotización gratuita hoy mismo enviando un mensaje directo 📩'
  }
];

interface FacebookMarketplaceBuilderProps {
  onApplyPost?: (text: string) => void;
}

export const FacebookMarketplaceBuilder: React.FC<FacebookMarketplaceBuilderProps> = ({ onApplyPost }) => {
  const [productTitle, setProductTitle] = useState('Zapatillas Deportivas Edición Limitada');
  const [price, setPrice] = useState('39.99€');
  const [oldPrice, setOldPrice] = useState('69.99€');
  const [condition, setCondition] = useState('Totalmente Nuevo en Caja con Etiquetas');
  const [location, setLocation] = useState('Envíos a todo el país o entrega personal');
  const [shipping, setShipping] = useState('Envío rápido 24/48h garantizado');
  const [feature1, setFeature1] = useState('Calidad Premium con acabados de alta durabilidad');
  const [feature2, setFeature2] = useState('Disponible en varias tallas y colores');
  const [feature3, setFeature3] = useState('Garantía de devolución si no quedas satisfecho');
  const [cta, setCta] = useState('¡Últimas unidades en stock! Envía mensaje privado (Inbox) para ordenar 📲');
  const [copied, setCopied] = useState(false);

  // Math Bold & Strikethrough generators
  const boldGen = FONT_GENERATORS.find((g) => g.id === 'sans-bold') || FONT_GENERATORS[0];
  const strikeGen = FONT_GENERATORS.find((g) => g.id === 'strikethrough') || FONT_GENERATORS[0];

  const formattedTitle = `🔥 ${boldGen.transform(productTitle.toUpperCase())} 🔥`;
  const strikeOldPrice = oldPrice.trim() ? ` (${strikeGen.transform(`Antes: ${oldPrice}`)})` : '';
  const formattedPrice = `💰 ${boldGen.transform('PRECIO')}: ${price}${strikeOldPrice}`;
  const formattedCondition = `✨ ${boldGen.transform('ESTADO')}: ${condition}`;
  const formattedLocation = `📍 ${boldGen.transform('UBICACIÓN')}: ${location}`;
  const formattedShipping = shipping.trim() ? `📦 ${boldGen.transform('ENVÍOS')}: ${shipping}` : '';

  const featuresList = [feature1, feature2, feature3].filter((f) => f.trim().length > 0);
  const formattedFeatures = featuresList.length > 0 
    ? `\n📋 ${boldGen.transform('CARACTERÍSTICAS')}:\n` + featuresList.map((f) => `✔️ ${f}`).join('\n')
    : '';

  const formattedCta = `\n👉 ${cta}`;

  const fullListing = `${formattedTitle}\n\n${formattedPrice}\n${formattedCondition}\n${formattedLocation}${formattedShipping ? '\n' + formattedShipping : ''}${formattedFeatures}\n${formattedCta}`.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullListing);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleApplyToPost = () => {
    if (onApplyPost) {
      onApplyPost(fullListing);
    }
  };

  const loadPreset = (p: MarketplacePreset) => {
    setProductTitle(p.name);
    setPrice(p.price);
    setOldPrice(p.oldPrice);
    setCondition(p.condition);
    setLocation(p.location);
    setShipping(p.shipping);
    setFeature1(p.features[0] || '');
    setFeature2(p.features[1] || '');
    setFeature3(p.features[2] || '');
    setCta(p.cta);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Facebook Marketplace & Grupos de Venta
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Titulares en Negrita Sans + Precios Rebajados Tachados
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <span>Generador de Publicaciones de Alto Rendimiento para Marketplace</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Completa los campos o carga una plantilla probada. El sistema formateará automáticamente el título en <strong>Negrita Matemática (Sans Bold)</strong> y el precio anterior en <strong>Tachado (S̶t̶r̶i̶k̶e̶)</strong> para multiplicar los clics y mensajes en tus ventas.
        </p>
      </div>

      {/* Presets Row */}
      <div>
        <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
          Plantillas Rápidas por Categoría (Toca para cargar):
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {MARKETPLACE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => loadPreset(preset)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold transition-all border border-slate-200 shrink-0 active:scale-95"
            >
              {preset.category}
            </button>
          ))}
        </div>
      </div>

      {/* Two Columns: Form Editor vs Formatted Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Nombre del Producto o Servicio:
            </label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="Ej: iPhone 14 Pro Max 256GB"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Precio Actual (Oferta):
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ej: 39.99€ o $45"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Precio Anterior (Aparecerá Tachado):
              </label>
              <input
                type="text"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="Ej: 69.99€ (Opcional)"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Estado del Producto:
              </label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Ej: Nuevo en caja, Como nuevo"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
                Ubicación / Entrega:
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Madrid Centro o Envíos"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Envíos & Garantía:
            </label>
            <input
              type="text"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              placeholder="Ej: Envíos 24h a toda España"
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
            />
          </div>

          {/* Features Bullets */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Puntos Fuertes / Características (3 Viñetas):
            </label>
            <div className="space-y-1.5">
              <input
                type="text"
                value={feature1}
                onChange={(e) => setFeature1(e.target.value)}
                placeholder="Característica 1"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
              />
              <input
                type="text"
                value={feature2}
                onChange={(e) => setFeature2(e.target.value)}
                placeholder="Característica 2"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
              />
              <input
                type="text"
                value={feature3}
                onChange={(e) => setFeature3(e.target.value)}
                placeholder="Característica 3"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Llamada a la Acción (CTA):
            </label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="Ej: Enviar mensaje privado (Inbox) para ordenar"
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* Right: Live Formatted Result Box (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Vista Previa del Anuncio para Marketplace:</span>
              </span>
              <span className="text-[10px] text-slate-400">Listo para copiar</span>
            </div>

            <div className="font-mono text-xs text-slate-100 whitespace-pre-line bg-black/40 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed select-all max-h-[300px] overflow-y-auto">
              {fullListing}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>¡Anuncio Copiado! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Publicación</span>
                  </>
                )}
              </button>

              {onApplyPost && (
                <button
                  type="button"
                  onClick={handleApplyToPost}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 active:scale-95"
                >
                  <span>Ver en Maquetador</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200/80 text-xs text-blue-900 space-y-1">
            <h4 className="font-extrabold flex items-center gap-1 text-blue-950">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              ¿Por qué usar letras formateadas en Marketplace?
            </h4>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              El algoritmo de Facebook Marketplace premia las publicaciones con descripciones estructuradas y precios claros. Al usar <strong>Negrita Sans</strong> y <strong>Tachados</strong>, tus productos se leen más rápido y captan la atención de los compradores en el feed móvil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
