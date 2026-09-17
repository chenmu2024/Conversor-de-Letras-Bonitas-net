import React, { useState } from 'react';
import { Briefcase, Copy, Check, Sparkles, ShoppingBag, CreditCard, Clock, MessageSquare, Truck, AlertCircle } from 'lucide-react';
import { INVISIBLE_SPACE } from '../data/symbols';

interface BusinessTemplate {
  id: string;
  category: string;
  title: string;
  icon: string;
  content: string;
}

const BUSINESS_TEMPLATES: BusinessTemplate[] = [
  {
    id: 'b1',
    category: 'Bienvenida & Horarios',
    title: '👋 Mensaje de Bienvenida Oficial',
    icon: '🏢',
    content: `*¡Hola! Gracias por comunicarte con [Nombre de tu Negocio] ✨*

¿En qué podemos ayudarte hoy?
• 📦 Consultar catálogo de productos
• 💰 Precios y promociones vigentes
• 🚚 Estado de tu envío o pedido
• 💬 Hablar con un asesor

_⏰ Nuestro horario de atención es de Lunes a Sábado de 9:00 a 19:00 hs._`,
  },
  {
    id: 'b2',
    category: 'Pagos & Transferencias',
    title: '💳 Datos para Transferencia Bancaria',
    icon: '💵',
    content: `*💳 DATOS PARA REALIZAR TU PAGO*

Por favor transfiere el monto acordado a la siguiente cuenta:

• *Banco:* Santander / BBVA
• *Titular:* [Tu Nombre o Empresa]
• *IBAN / CBU:* \`\`\`0123456789012345678901\`\`\`
• *Alias:* \`\`\`TIENDA.PAGO.OFICIAL\`\`\`
• *Concepto:* Pedido #[NÚMERO]

_⚠️ Una vez realizada la transferencia, envíanos el comprobante por este chat para procesar tu pedido de inmediato._`,
  },
  {
    id: 'b3',
    category: 'Pedidos & Envíos',
    title: '🚚 Confirmación y Seguimiento de Envío',
    icon: '📦',
    content: `*🎉 ¡Tu pedido está en camino!*

Hola *[Nombre del Cliente]*, te confirmamos que tu paquete ya fue despachado:

• *Nº de Seguimiento:* \`\`\`AR123456789ES\`\`\`
• *Empresa de Transporte:* Correo / Mensajería
• *Tiempo estimado de entrega:* 24 a 48 horas hábiles
• *Dirección:* [Dirección del Cliente]

_Cualquier duda con tu entrega, estamos a tu disposición por este medio. ¡Muchas gracias por tu compra!_ ✨`,
  },
  {
    id: 'b4',
    category: 'Catálogos & Precios',
    title: '🛍️ Lista de Precios y Ofertas',
    icon: '🏷️',
    content: `*🔥 PROMOCIONES Y PRECIOS ESPECIALES DE LA SEMANA*

Aprovecha nuestras ofertas por tiempo limitado:

1. *Combo Clásico:* ~$45.00~ ➔ *$35.00*
2. *Combo Premium:* ~$75.00~ ➔ *$59.99* ✨
3. *Pack Mayorista (3 unidades):* *$99.00* (Envío Gratis)

_📦 Envío express en el día a toda la ciudad._
_¿Te gustaría apartar alguna de estas opciones?_ 👇`,
  },
  {
    id: 'b5',
    category: 'Citas & Turnos',
    title: '📅 Recordatorio de Cita o Turno',
    icon: '⏰',
    content: `*⏰ RECORDATORIO DE TU TURNO*

Hola *[Nombre]*, te recordamos tu cita programada:

• *Servicio:* [Tratamiento / Consulta]
• *Fecha:* [Día de la Cita]
• *Hora:* [Hora exacta]
• *Ubicación:* [Dirección del Local]

_⚠️ Por favor responde con un *SI* para confirmar tu asistencia o avísanos con 24h de anticipación si necesitas reprogramar._ ¡Te esperamos!`,
  },
  {
    id: 'b6',
    category: 'Ausencia & Vacaciones',
    title: '🏖️ Mensaje de Ausencia / Fuera de Horario',
    icon: '🌙',
    content: `*¡Hola! Gracias por escribirnos a [Nombre del Negocio] 🌙*

En este momento nos encontramos *fuera de nuestro horario de atención*. 

• *Horarios:* Lunes a Viernes de 9:00 a 18:00 hs.
• Tu mensaje quedó registrado y te responderemos con prioridad a primera hora del siguiente día hábil.

_Si es una urgencia, puedes visitar nuestra web oficial: [www.tunegocio.com]_`,
  },
];

export const WhatsAppBusinessTemplates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todas', 'Bienvenida & Horarios', 'Pagos & Transferencias', 'Pedidos & Envíos', 'Catálogos & Precios', 'Citas & Turnos', 'Ausencia & Vacaciones'];

  const filtered = selectedCategory === 'Todas' 
    ? BUSINESS_TEMPLATES 
    : BUSINESS_TEMPLATES.filter(b => b.category === selectedCategory);

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            WhatsApp Business & Ventas
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Formato con Negritas, Monospaciado y Listas Nativas
          </span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2 mt-1">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <span>Plantillas Profesionales de Negocios y Atención al Cliente</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Copia mensajes estructurados con sintaxis de WhatsApp (negritas <code>*texto*</code>, códigos monospaciados <code>```código```</code> para CBU/Alias y viñetas ordenadas).
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-emerald-700 font-bold uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="p-3 bg-[#EFEAE2] rounded-xl border border-emerald-100/80 font-sans text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {item.content}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleCopy(item.content, item.id)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>¡Plantilla Copiada! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Plantilla para WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
