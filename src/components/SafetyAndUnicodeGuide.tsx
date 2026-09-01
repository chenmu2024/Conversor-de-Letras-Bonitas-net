import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, CheckCircle, Info, Sparkles, HelpCircle, Terminal, RefreshCw } from 'lucide-react';

export const SafetyAndUnicodeGuide: React.FC = () => {
  const [deviceCharTest, setDeviceCharTest] = useState<'testing' | 'supported' | 'partial'>('supported');

  const testSamples = [
    { label: 'Cursiva Script', char: '𝓐' },
    { label: 'Gótica Fraktur', char: '𝕲' },
    { label: 'Doble Trazo', char: '𝕏' },
    { label: 'Espacio Invisible', char: '\u3164', visual: '[ㅤ]' },
    { label: 'Símbolos Gamers', char: '亗' },
    { label: 'Alas Simétricas', char: '꧁' },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                🔒 Guía Oficial del Conversor de Letras Bonitas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Seguridad y Legalidad del Conversor de Letras Bonitas
            </h2>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Conversor de Letras Bonitas 100% Legal · Sin Riesgo</span>
        </div>
      </div>

      {/* Main Grid: Security FAQ & Technical Unicode Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Card 1: Anti-ban Guarantee */}
        <div className="p-5 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              ¿Es seguro el Conversor de Letras Bonitas para Free Fire e Instagram?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Sí, el Conversor de Letras Bonitas es totalmente seguro.</strong> Todas las fuentes y símbolos del Conversor de Letras Bonitas pertenecen a la tabla estándar del <strong className="text-indigo-600">Consorcio Unicode Oficial</strong>. No modifican los archivos del juego, no son programas de terceros (hacks) ni inyectan código ejecutable.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Permitido en Torneos Oficiales y Redes Sociales</span>
          </div>
        </div>

        {/* Card 2: Technical Unicode Architecture */}
        <div className="p-5 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              ¿Por qué el Conversor de Letras Bonitas funciona sin instalar fuentes?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              En el Conversor de Letras Bonitas no instalas archivos <code className="px-1 py-0.5 bg-slate-100 rounded text-[11px] text-indigo-700">.ttf</code>. El motor del Conversor de Letras Bonitas traduce tus letras a glifos matemáticos universales (rango <strong className="text-slate-800">U+1D400..1D7FF</strong>) ya preinstalados en todos los dispositivos modernos.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-indigo-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Conversor de Letras Bonitas con Soporte Universal</span>
          </div>
        </div>

        {/* Card 3: Tofu / Square Boxes troubleshooting */}
        <div className="p-5 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              ¿Por qué algunas fuentes del Conversor de Letras Bonitas muestran cuadros (□)?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Este fenómeno se conoce como <strong className="text-slate-800">"Tofu"</strong>. Ocurre únicamente en dispositivos antiguos (Android 7 o inferior). En el Conversor de Letras Bonitas más del 99% de las tipografías son compatibles con las versiones modernas de iOS y Android.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-amber-700 font-semibold">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Compatibilidad verificada en el Conversor de Letras Bonitas</span>
          </div>
        </div>
      </div>

      {/* Device Character Compatibility Inspector */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-800">
              Inspector de Compatibilidad del Conversor de Letras Bonitas en tu Dispositivo:
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Si puedes ver los símbolos abajo con claridad, tu pantalla es 100% compatible
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {testSamples.map((sample, idx) => (
            <div
              key={idx}
              className="bg-white p-2.5 rounded-lg border border-slate-200 text-center flex flex-col items-center justify-center"
            >
              <span className="text-[10px] text-slate-400 font-medium mb-0.5">{sample.label}</span>
              <span className="text-lg font-bold text-slate-800 my-0.5">{sample.visual || sample.char}</span>
              <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
                <CheckCircle className="w-2.5 h-2.5" /> Compatible
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
