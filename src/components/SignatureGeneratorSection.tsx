import React, { useState, useMemo } from 'react';
import { Feather, Copy, Check, Sparkles, RefreshCw, PenTool } from 'lucide-react';

interface SignatureGeneratorSectionProps {
  currentText?: string;
  onApplyText: (text: string) => void;
}

interface SignatureTemplate {
  id: string;
  name: string;
  category: 'Elegante' | 'Minimalista' | 'Gamer' | 'Artística';
  render: (name: string) => string;
}

const SIGNATURE_TEMPLATES: SignatureTemplate[] = [
  {
    id: 'script-flourish',
    name: 'Rúbrica Clásica con Destellos',
    category: 'Elegante',
    render: (name) => `✍ 𝓢𝓲𝓰𝓷𝓮𝓭: 𝓡𝓾𝓫𝓻𝓲𝓬𝓪 • ${name} 𝒳𝒪 • 𝟤𝟢𝟤𝟨`,
  },
  {
    id: 'luxury-initials',
    name: 'Monograma Minimalista',
    category: 'Minimalista',
    render: (name) => `« ${name.toUpperCase().split(' ').map(w => w[0]).join('.')} » • ℳ𝒶𝒹ℯ 𝒷𝓎 ${name}`,
  },
  {
    id: 'aesthetic-stars',
    name: 'Firma Aesthetic con Estrellas',
    category: 'Artística',
    render: (name) => `˚₊· ͟͟͞͞➳❥ 𝓕𝓲𝓻𝓶𝓪: ${name} ✧*。`,
  },
  {
    id: 'photographer-watermark',
    name: 'Sello de Fotografía / Creador',
    category: 'Minimalista',
    render: (name) => `📷 𝑷𝒉𝒐𝒕𝒐𝒈𝒓𝒂𝒑𝒉𝒚 𝒃𝒚 ${name} © 𝐴𝑙𝑙 𝑅𝑖𝑔ℎ𝑡𝑠 𝑅𝑒𝑠𝑒𝑟𝑣𝑒𝑑`,
  },
  {
    id: 'gamer-tag-signature',
    name: 'Firma de Jugador Insano',
    category: 'Gamer',
    render: (name) => `亗 ⦓ ${name} ⦔ ⚡ 𝓥.𝓘.𝓟 亗`,
  },
  {
    id: 'fraktur-seal',
    name: 'Sello Gótico Medieval',
    category: 'Elegante',
    render: (name) => `⚔ 𝕬𝖚𝖙𝖍𝖊𝖓𝖙𝖎𝖈 • 𝕯𝖊𝖘𝖎𝖌𝖓 𝖇𝖞 ${name} ⚔`,
  },
];

export const SignatureGeneratorSection: React.FC<SignatureGeneratorSectionProps> = ({
  currentText = 'Sofia Morales',
  onApplyText,
}) => {
  const [nameInput, setNameInput] = useState(currentText || 'Sofia Morales');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generatedSignatures = useMemo(() => {
    const safeName = nameInput.trim() || 'Tu Nombre';
    return SIGNATURE_TEMPLATES.map((tmpl) => ({
      ...tmpl,
      result: tmpl.render(safeName),
    }));
  }, [nameInput]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section id="generador-de-firmas-elegantes" className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold mb-2">
            <PenTool className="w-3.5 h-3.5 text-violet-600" />
            <span>Módulo de Firmas del Conversor de Letras Bonitas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Firmas Digitales en el Conversor de Letras Bonitas
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Crea una firma personalizada con el Conversor de Letras Bonitas para el pie de tus correos, marcas de agua de fotos, descripciones de Instagram o biografías.
          </p>
        </div>

        {/* Name input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Escribe tu nombre..."
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-violet-500 focus:bg-white w-48 sm:w-60"
          />
          <button
            onClick={() => setNameInput('Sofia Morales')}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl transition-colors"
            title="Restablecer ejemplo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Signatures */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {generatedSignatures.map((sig) => (
          <div
            key={sig.id}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-violet-300 hover:bg-white transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/50">
                <span className="text-[11px] font-bold text-violet-700 uppercase tracking-wider">
                  {sig.category}
                </span>
                <span className="text-[10px] text-slate-600 font-semibold">
                  {sig.name}
                </span>
              </div>

              <div className="py-2.5 my-1 bg-white rounded-lg px-3 border border-slate-200/60 flex items-center min-h-[52px]">
                <p className="text-xs sm:text-sm font-bold text-slate-800 break-words w-full">
                  {sig.result}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-3 pt-2">
              <button
                onClick={() => onApplyText(sig.result)}
                className="text-[11px] font-bold text-slate-600 hover:text-violet-600 transition-colors"
              >
                Cargar en Conversor
              </button>

              <button
                onClick={() => handleCopy(sig.id, sig.result)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-all shadow-2xs"
              >
                {copiedId === sig.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Firma</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
