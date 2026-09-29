import { PageRoute } from '../types';

export type AuxiliaryModule =
  | 'invisibleSpace'
  | 'textDecorator'
  | 'platformPreview'
  | 'alphabetReference'
  | 'symbolsLibrary'
  | 'singleLetterExplorer'
  | 'readyBioTemplates'
  | 'safetyGuide'
  | 'editorialMasterclass'
  | 'advancedTips'
  | 'readyNicknames'
  | 'popularNames'
  | 'symbolMatrix'
  | 'alphabetTable'
  | 'unicodeGlossary'
  | 'compatibility'
  | 'signatureGenerator'
  | 'couplesGenerator'
  | 'bioTemplates'
  | 'specialOccasions'
  | 'decoratorsGallery'
  | 'glyphInspector';

export const ROUTE_MODULES: Record<PageRoute, AuxiliaryModule[]> = {
  inicio: [
    'platformPreview',
    'readyBioTemplates',
    'safetyGuide',
  ],
  'letras-chidas': [
    'textDecorator',
    'readyNicknames',
    'symbolsLibrary',
    'decoratorsGallery',
  ],
  'letras-elegantes': [
    'signatureGenerator',
    'alphabetReference',
    'readyBioTemplates',
    'specialOccasions',
  ],
  'letras-raras': [
    'symbolMatrix',
    'symbolsLibrary',
    'glyphInspector',
    'unicodeGlossary',
  ],
  'letras-tatuajes': [
    'alphabetReference',
    'signatureGenerator',
    'singleLetterExplorer',
    'specialOccasions',
  ],
  'nicks-free-fire': [
    'readyNicknames',
    'textDecorator',
    'invisibleSpace',
    'symbolsLibrary',
  ],
  'letras-chinas': [
    'symbolMatrix',
    'glyphInspector',
    'decoratorsGallery',
  ],
  'espacio-invisible': [
    'invisibleSpace',
    'safetyGuide',
  ],
  'nombres-parejas': [
    'couplesGenerator',
    'readyBioTemplates',
    'specialOccasions',
  ],
  abecedario: [
    'alphabetTable',
    'alphabetReference',
    'singleLetterExplorer',
    'unicodeGlossary',
  ],
  instagram: [
    'platformPreview',
    'readyBioTemplates',
    'bioTemplates',
    'symbolsLibrary',
    'invisibleSpace',
  ],
  tiktok: [
    'readyBioTemplates',
    'readyNicknames',
    'symbolsLibrary',
    'platformPreview',
  ],
  whatsapp: [
    'invisibleSpace',
    'readyBioTemplates',
    'specialOccasions',
  ],
  'free-fire': [
    'textDecorator',
    'readyNicknames',
    'invisibleSpace',
    'symbolsLibrary',
    'symbolMatrix',
  ],
  facebook: [
    'platformPreview',
    'readyBioTemplates',
    'specialOccasions',
  ],
  cursiva: [
    'alphabetReference',
    'alphabetTable',
    'signatureGenerator',
    'singleLetterExplorer',
  ],
  goticas: [
    'alphabetReference',
    'alphabetTable',
    'singleLetterExplorer',
    'decoratorsGallery',
  ],
  invertidas: [
    'glyphInspector',
    'decoratorsGallery',
  ],
  circulos: [
    'alphabetReference',
    'alphabetTable',
    'decoratorsGallery',
  ],
  glitch: [
    'glyphInspector',
    'decoratorsGallery',
    'symbolsLibrary',
  ],
  simbolos: [
    'symbolsLibrary',
    'symbolMatrix',
  ],
  decorador: [
    'textDecorator',
    'decoratorsGallery',
    'symbolsLibrary',
  ],
  'contador-bio': [
    'readyBioTemplates',
    'bioTemplates',
    'platformPreview',
  ],
  'compatibilidad-unicode': [],
  'sobre-nosotros': [],
  'politica-de-privacidad': [],
  'politica-de-cookies': [],
  'terminos-y-condiciones': [],
  contacto: [],
  '404': [],
};
