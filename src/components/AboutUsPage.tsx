import React from 'react';
import { ShieldCheck, Cpu, Award, Globe, HeartHandshake, FileCode2, CheckCircle2 } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black shadow-xs">
          <Award className="w-4 h-4" />
          <span>E-E-A-T & Estándares Tipográficos Unicode</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Sobre Nosotros & Laboratorio Tipográfico
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Nuestra misión es democratizar el diseño tipográfico y la personalización estética en español a través del estándar internacional Unicode.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 mb-2">Ingeniería Unicode Pura</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No generamos imágenes pesadas ni archivos .ttf propietarios. Mapeamos cada letra contra los bloques matemáticos y símbolos suplementarios de la <strong>Unicode Consortium Specification</strong>.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-indigo-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>ISO/IEC 10646 compliant</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 mb-2">Zero Server Logging</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tu privacidad es sagrada. Todas las conversiones de texto ocurren 100% en la memoria de tu navegador (lado del cliente). Nunca recopilamos, transmitimos ni almacenamos lo que escribes.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Seguro y Privado</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 mb-2">Comunidad en Español</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Desarrollado y optimizado específicamente para el idioma español (soporte para acentos, virgulilla de la ñ y signos dobles de interrogación/exclamación).
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Multiplataforma</span>
          </div>
        </div>
      </div>

      {/* Editorial Standards and Testing Process */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white p-8 sm:p-10 shadow-md border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <FileCode2 className="w-6 h-6 text-indigo-400" />
          <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
            Nuestro Proceso de Compatibilidad en Dispositivos
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Antes de añadir cualquier estilo tipográfico a nuestra plataforma, pasa por una batería de pruebas de renderizado en:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-black text-white mb-1">📱 iOS / iPadOS</div>
            <div className="text-slate-400">Verificado en Safari y fuentes del sistema Apple (San Francisco).</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-black text-white mb-1">🤖 Android 9 a 15</div>
            <div className="text-slate-400">Compatibilidad con Roboto, One UI, MIUI y motores WebKit móviles.</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-black text-white mb-1">🎮 Garena Free Fire</div>
            <div className="text-slate-400">Comprobación de filtros antispam y aceptación de Hangul Filler [ㅤ].</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-black text-white mb-1">💬 Redes Sociales</div>
            <div className="text-slate-400">Bio de Instagram, feeds de TikTok, chats de WhatsApp y Discord.</div>
          </div>
        </div>
      </div>

      {/* Editorial Disclaimer & Contact Link */}
      <div className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-6 h-6 text-indigo-600 shrink-0" />
          <div>
            <div className="font-bold text-sm text-slate-900">¿Tienes sugerencias o quieres proponer un estilo?</div>
            <div className="text-xs text-slate-500">Estamos en constante evolución para añadir nuevos glifos y símbolos.</div>
          </div>
        </div>
        <a
          href="/contacto/"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '#/contacto';
          }}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
        >
          Contáctanos
        </a>
      </div>
    </div>
  );
};
