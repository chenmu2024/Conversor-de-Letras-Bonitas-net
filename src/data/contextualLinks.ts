import { PageRoute } from '../types';

export interface ContextualLink {
  text: string;
  href: string;
}

export const CONTEXTUAL_LINKS: Partial<Record<PageRoute, ContextualLink[]>> = {
  inicio: [
    { text: 'letras para Instagram', href: '/letras-para-instagram/' },
    { text: 'nicks para Free Fire', href: '/generador-de-nicks-free-fire/' },
    { text: 'compatibilidad Unicode', href: '/compatibilidad-unicode/' },
  ],
  instagram: [
    { text: 'contador de caracteres para bio', href: '/contador-de-caracteres-bio/' },
    { text: 'letras cursivas', href: '/traductor-cursiva/' },
    { text: 'símbolos y emojis', href: '/simbolos-y-emojis/' },
  ],
  tiktok: [
    { text: 'contador de caracteres', href: '/contador-de-caracteres-bio/' },
    { text: 'letras chidas', href: '/letras-chidas/' },
    { text: 'decorador de nicks', href: '/decorador-de-nicks/' },
  ],
  whatsapp: [
    { text: 'texto tachado e invertido', href: '/letras-tachadas-e-invertidas/' },
    { text: 'espacio invisible', href: '/espacio-invisible/' },
    { text: 'compatibilidad Unicode', href: '/compatibilidad-unicode/' },
  ],
  'free-fire': [
    { text: 'generador de nicks', href: '/generador-de-nicks-free-fire/' },
    { text: 'espacio invisible', href: '/espacio-invisible/' },
    { text: 'decorador de nicks', href: '/decorador-de-nicks/' },
  ],
  facebook: [
    { text: 'letras cursivas', href: '/traductor-cursiva/' },
    { text: 'texto tachado', href: '/letras-tachadas-e-invertidas/' },
    { text: 'contador de caracteres', href: '/contador-de-caracteres-bio/' },
  ],
  'letras-chidas': [
    { text: 'decorador de nicks', href: '/decorador-de-nicks/' },
    { text: 'símbolos especiales', href: '/simbolos-y-emojis/' },
  ],
  'letras-elegantes': [
    { text: 'traductor a cursiva', href: '/traductor-cursiva/' },
    { text: 'letras para tatuajes', href: '/letras-para-tatuajes/' },
  ],
  'letras-raras': [
    { text: 'letras glitch y Zalgo', href: '/letras-glitch-zalgo/' },
    { text: 'compatibilidad Unicode', href: '/compatibilidad-unicode/' },
  ],
  'letras-tatuajes': [
    { text: 'letras góticas', href: '/letras-goticas/' },
    { text: 'letras elegantes', href: '/letras-elegantes/' },
  ],
  'nicks-free-fire': [
    { text: 'espacio invisible', href: '/espacio-invisible/' },
    { text: 'símbolos para nicks', href: '/simbolos-y-emojis/' },
  ],
  'letras-chinas': [
    { text: 'letras raras', href: '/letras-raras/' },
    { text: 'símbolos y emojis', href: '/simbolos-y-emojis/' },
  ],
  'espacio-invisible': [
    { text: 'compatibilidad Unicode', href: '/compatibilidad-unicode/' },
    { text: 'nicks para Free Fire', href: '/generador-de-nicks-free-fire/' },
  ],
  'nombres-parejas': [
    { text: 'decorador de nicks', href: '/decorador-de-nicks/' },
    { text: 'nicks para Free Fire', href: '/generador-de-nicks-free-fire/' },
  ],
  abecedario: [
    { text: 'traductor a cursiva', href: '/traductor-cursiva/' },
    { text: 'letras góticas', href: '/letras-goticas/' },
  ],
  cursiva: [
    { text: 'abecedario de letras bonitas', href: '/abecedario-letras-bonitas/' },
    { text: 'letras elegantes', href: '/letras-elegantes/' },
  ],
  goticas: [
    { text: 'letras para tatuajes', href: '/letras-para-tatuajes/' },
    { text: 'compatibilidad Unicode', href: '/compatibilidad-unicode/' },
  ],
  invertidas: [
    { text: 'letras glitch', href: '/letras-glitch-zalgo/' },
    { text: 'símbolos especiales', href: '/simbolos-y-emojis/' },
  ],
  circulos: [
    { text: 'abecedario A-Z', href: '/abecedario-letras-bonitas/' },
    { text: 'letras elegantes', href: '/letras-elegantes/' },
  ],
  glitch: [
    { text: 'letras raras', href: '/letras-raras/' },
    { text: 'compatibilidad Unicode', href: '/compatibilidad-unicode/' },
  ],
  simbolos: [
    { text: 'decorador de nicks', href: '/decorador-de-nicks/' },
    { text: 'letras para Free Fire', href: '/letras-para-free-fire/' },
  ],
  decorador: [
    { text: 'símbolos y emojis', href: '/simbolos-y-emojis/' },
    { text: 'nicks para Free Fire', href: '/generador-de-nicks-free-fire/' },
  ],
  'contador-bio': [
    { text: 'letras para Instagram', href: '/letras-para-instagram/' },
    { text: 'letras para TikTok', href: '/letras-para-tiktok/' },
  ],
  'compatibilidad-unicode': [
    { text: 'espacio invisible', href: '/espacio-invisible/' },
    { text: 'abecedario Unicode', href: '/abecedario-letras-bonitas/' },
  ],
};
