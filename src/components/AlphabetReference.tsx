import React, { useState } from 'react';
import { Table } from 'lucide-react';
import { FONT_GENERATORS } from '../utils/unicodeConverters';

export const AlphabetReference: React.FC = () => {
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const scriptBold = FONT_GENERATORS.find((f) => f.id === 'cursiva-bold')!;
  const scriptRegular = FONT_GENERATORS.find((f) => f.id === 'cursiva-regular')!;
  const goticaFraktur = FONT_GENERATORS.find((f) => f.id === 'gotica-fraktur')!;
  const goticaBold = FONT_GENERATORS.find((f) => f.id === 'gotica-bold')!;
  const doubleStruck = FONT_GENERATORS.find((f) => f.id === 'doble-trazo')!;
  const circled = FONT_GENERATORS.find((f) => f.id === 'circulos-claros')!;

  const handleCopy = async (char: string) => {
    try {
      await navigator.clipboard.writeText(char);
      setCopiedChar(char);
      setTimeout(() => setCopiedChar(null), 1500);
    } catch (e) {
      console.error('Failed to copy character', e);
    }
  };

  return (
    <div id="abecedario-section" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Table className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
              Abecedario del Conversor de Letras Bonitas de la A a la Z
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
            En el Conversor de Letras Bonitas puedes hacer clic en cualquier letra individual en cursiva, gótica o círculos para copiarla al instante.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
        <table className="w-full text-left text-xs border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 font-extrabold uppercase tracking-wider">
              <th className="py-3.5 px-4">Letra</th>
              <th className="py-3.5 px-4 font-normal text-base">𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭</th>
              <th className="py-3.5 px-4 font-normal text-base">𝒮𝒸𝓇𝒾𝓅𝓉</th>
              <th className="py-3.5 px-4 font-normal text-base">𝔊ó𝔱𝔦𝔠𝔞 𝔉𝔯𝔞𝔨𝔱𝔲𝔯</th>
              <th className="py-3.5 px-4 font-normal text-base">𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉</th>
              <th className="py-3.5 px-4 font-normal text-base">𝔻𝕠𝕓𝕝𝕖 𝕋𝕣𝕒𝕫𝕠</th>
              <th className="py-3.5 px-4 font-normal text-base">Ⓒⓘⓡⓒⓤⓛⓞⓢ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {letters.map((letter) => {
              const lower = letter.toLowerCase();
              const pair = `${letter} ${lower}`;

              const sb = scriptBold.transform(pair);
              const sr = scriptRegular.transform(pair);
              const gf = goticaFraktur.transform(pair);
              const gb = goticaBold.transform(pair);
              const ds = doubleStruck.transform(pair);
              const cir = circled.transform(pair);

              return (
                <tr key={letter} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="py-3 px-4 font-black text-slate-900 bg-slate-50/40">
                    {letter} {lower}
                  </td>
                  <td
                    onClick={() => handleCopy(sb)}
                    className="py-3 px-4 text-lg text-indigo-950 cursor-pointer hover:text-indigo-600 transition-colors active:scale-95"
                    title={`Copiar ${sb}`}
                  >
                    {sb} {copiedChar === sb && <span className="text-[10px] text-emerald-600 font-bold ml-1.5 animate-pulse">✓ Copiado</span>}
                  </td>
                  <td
                    onClick={() => handleCopy(sr)}
                    className="py-3 px-4 text-lg text-indigo-950 cursor-pointer hover:text-indigo-600 transition-colors active:scale-95"
                    title={`Copiar ${sr}`}
                  >
                    {sr} {copiedChar === sr && <span className="text-[10px] text-emerald-600 font-bold ml-1.5 animate-pulse">✓ Copiado</span>}
                  </td>
                  <td
                    onClick={() => handleCopy(gf)}
                    className="py-3 px-4 text-lg text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors active:scale-95"
                    title={`Copiar ${gf}`}
                  >
                    {gf} {copiedChar === gf && <span className="text-[10px] text-emerald-600 font-bold ml-1.5 animate-pulse">✓ Copiado</span>}
                  </td>
                  <td
                    onClick={() => handleCopy(gb)}
                    className="py-3 px-4 text-lg text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors active:scale-95"
                    title={`Copiar ${gb}`}
                  >
                    {gb} {copiedChar === gb && <span className="text-[10px] text-emerald-600 font-bold ml-1.5 animate-pulse">✓ Copiado</span>}
                  </td>
                  <td
                    onClick={() => handleCopy(ds)}
                    className="py-3 px-4 text-lg text-purple-950 cursor-pointer hover:text-indigo-600 transition-colors active:scale-95"
                    title={`Copiar ${ds}`}
                  >
                    {ds} {copiedChar === ds && <span className="text-[10px] text-emerald-600 font-bold ml-1.5 animate-pulse">✓ Copiado</span>}
                  </td>
                  <td
                    onClick={() => handleCopy(cir)}
                    className="py-3 px-4 text-lg text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors active:scale-95"
                    title={`Copiar ${cir}`}
                  >
                    {cir} {copiedChar === cir && <span className="text-[10px] text-emerald-600 font-bold ml-1.5 animate-pulse">✓ Copiado</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

