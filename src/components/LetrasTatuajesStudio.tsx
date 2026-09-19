import React, { useState } from 'react';
import { Sparkles, Feather, Copy, Check, Shield, Calendar, Heart, Award } from 'lucide-react';
import { FONT_COUNT } from '../constants/siteStats';

interface LetrasTatuajesStudioProps {
  onApplyText: (text: string) => void;
  initialText?: string;
}

export const LetrasTatuajesStudio: React.FC<LetrasTatuajesStudioProps> = ({
  onApplyText,
  initialText = 'Amor Fati',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [customText, setCustomText] = useState(initialText);
  const [placement, setPlacement] = useState<'antebrazo' | 'clavicula' | 'costillas' | 'muneca'>('antebrazo');
  const [birthDate, setBirthDate] = useState('2002-08-15');

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(text);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(20);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  // Convert date to Roman Numerals (e.g. 15.08.2002 -> XV.VIII.MMII)
  const toRoman = (num: number): string => {
    const lookup: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let roman = '';
    for (const [val, char] of lookup) {
      while (num >= val) {
        roman += char;
        num -= val;
      }
    }
    return roman;
  };

  const romanDate = React.useMemo(() => {
    if (!birthDate) return 'XV · VIII · MMII';
    const [y, m, d] = birthDate.split('-').map(Number);
    if (!y || !m || !d) return 'XV · VIII · MMII';
    return `${toRoman(d)} · ${toRoman(m)} · ${toRoman(y)}`;
  }, [birthDate]);

  const tattooStyles = [
    { name: 'Gótica Chicana / Old English', text: `𝕱𝖆𝖒𝖎𝖑𝖎𝖆 𝕻𝖗𝖎𝖒𝖊𝖗𝖔`, fontDesc: 'Letra Gótica Negra Clásica' },
    { name: 'Caligrafía Fina Script', text: `𝒮𝒾𝑒𝓂𝓅𝓇𝑒 𝑒𝓃 𝓂𝒾 𝒸𝑜𝓇𝒶𝓏ó𝓃`, fontDesc: 'Script Suave y Fluido' },
    { name: 'Minimalista Sans Serif', text: `Ａ Ｍ Ｏ Ｒ   Ｆ Ａ Ｔ Ｉ`, fontDesc: 'Trazo Fino Espaciado' },
    { name: 'Doble Línea / Outline', text: `𝔽𝕖 𝕪 𝔽𝕦𝕖𝕣𝕫𝕒`, fontDesc: 'Líneas Geométricas' },
    { name: 'Small Caps Elegante', text: `ᴠᴇɴɪ · ᴠɪᴅɪ · ᴠɪᴄɪ`, fontDesc: 'Frase en Latín Clásica' },
    { name: 'Manuscrita Cursiva Bold', text: `𝓝𝓸 𝓽𝓮 𝓻𝓲𝓷𝓭𝓪𝓼 𝓳𝓪𝓶á𝓼`, fontDesc: 'Caligrafía Profunda' },
  ];

  const tattooQuotes = [
    { latin: 'Amor Fati', meaning: 'Amor al destino', styled: '✦ 𝒜𝓂𝑜𝓇 𝐹𝒶𝓉𝒾 ✦' },
    { latin: 'Memento Mori', meaning: 'Recuerda que eres mortal', styled: '† 𝕸𝖊𝖒𝖊𝖓𝖙𝖔 𝕸𝖔𝖗𝖎 †' },
    { latin: 'Veni Vidi Vici', meaning: 'Vine, vi y vencí', styled: '⚔️ ᴠᴇɴɪ · ᴠɪᴅɪ · ᴠɪᴄɪ ⚔️' },
    { latin: 'Per Aspera Ad Astra', meaning: 'A través de las dificultades hacia las estrellas', styled: '✧ 𝒫𝑒𝓇 𝒜𝓈𝓅𝑒𝓇𝒶 𝒜𝒹 𝒜𝓈𝓉𝓇𝒶 ✧' },
    { latin: 'Carpe Diem', meaning: 'Aprovecha el día', styled: '🌿 𝒞𝒶𝓇𝓅𝑒 𝒟𝒾𝑒𝓂 🌿' },
    { latin: 'Alis Volat Propriis', meaning: 'Vuela con sus propias alas', styled: '🕊️ 𝒱𝓊𝑒𝓁𝒶 𝒸𝑜𝓃 𝓉𝓊𝓈 𝓅𝓇𝑜𝓅𝒾𝒶𝓈 𝒶𝓁𝒶𝓈 🕊️' },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-stone-900 to-black rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl text-stone-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-stone-800 border border-stone-700 text-amber-400 flex items-center justify-center shadow-lg">
            <Feather className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                💉 Estudio de Tatuajes & Lettering
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Letras para Tatuajes (Góticas, Cursivas & Números Romanos)
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onApplyText(customText)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all active:scale-95 shadow-md shadow-amber-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ver Todas las {FONT_COUNT} Fuentes</span>
        </button>
      </div>

      {/* Interactive Simulator Card with Body Placement */}
      <div className="bg-stone-950/80 rounded-xl border border-stone-800 p-4 sm:p-6 mb-6 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <label className="text-xs font-black uppercase tracking-wider text-stone-300">
            Escribe tu Nombre, Frase o Lema para Tatuar:
          </label>
          <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-lg border border-stone-800 text-[11px] font-medium text-stone-400">
            <span>Ubicación:</span>
            {(['antebrazo', 'clavicula', 'costillas', 'muneca'] as const).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => setPlacement(pos)}
                className={`px-2 py-0.5 rounded capitalize transition-colors ${
                  placement === pos
                    ? 'bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40'
                    : 'hover:text-stone-200'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Escribe tu texto para tatuaje..."
            maxLength={40}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-900 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={() => onApplyText(customText)}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 font-bold text-xs transition-all active:scale-95"
          >
            Aplicar
          </button>
        </div>

        {/* Live Skin Preview Canvas Box */}
        <div className="relative overflow-hidden rounded-xl border border-stone-800/80 bg-stone-900/60 p-6 text-center">
          <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-2">
            Simulador de Piel ({placement.toUpperCase()})
          </div>
          <div className="py-4 px-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-100 tracking-wide select-all font-bold drop-shadow-md">
              {customText || 'Amor Fati'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => handleCopy(customText)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              {copiedItem === customText ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Copiado para plantilla!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Letra de Tatuaje</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Roman Numeral Date Converter */}
      <div className="bg-stone-950/80 rounded-xl border border-stone-800 p-4 sm:p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-200">
            Conversor de Fechas a Números Romanos para Tatuajes:
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="px-3 py-2 rounded-lg border border-stone-700 bg-stone-900 text-stone-100 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div className="flex-1 min-w-[200px] flex items-center justify-between p-2.5 rounded-lg bg-stone-900 border border-stone-700">
            <span className="font-serif text-sm font-bold text-amber-300 tracking-widest pl-2">
              {romanDate}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(romanDate)}
              className="p-1.5 rounded-md bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-colors"
              title="Copiar números romanos"
            >
              {copiedItem === romanDate ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Famous Tattoo Styles List */}
      <h3 className="text-sm font-black uppercase tracking-wider text-stone-200 mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Estilos de Tatuaje Más Populares para Copiar:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {tattooStyles.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-stone-800 bg-stone-950/60 shadow-xs hover:border-amber-500/50 transition-all group"
          >
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                {item.name}
              </span>
              <span className="font-bold text-sm text-stone-100 tracking-wide">
                {item.text}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(item.text)}
              className="p-2 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-all shrink-0"
              title="Copiar estilo"
            >
              {copiedItem === item.text ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Famous Latin & Meaningful Phrases for Tattoos */}
      <h3 className="text-sm font-black uppercase tracking-wider text-stone-200 mb-3 flex items-center gap-2">
        <Award className="w-4 h-4 text-amber-400" />
        <span>Frases en Latín & Significados Profundos para Tatuajes:</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tattooQuotes.map((q, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-3.5 rounded-xl border border-stone-800 bg-stone-950/80 shadow-xs hover:border-stone-700 transition-all"
          >
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-300">{q.latin}</span>
                <span className="text-[10px] text-stone-400 italic">{q.meaning}</span>
              </div>
              <p className="text-sm font-medium text-stone-200 mt-1">{q.styled}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(q.styled)}
              className="w-full inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 font-bold text-xs transition-all active:scale-95"
            >
              {copiedItem === q.styled ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Frase</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
