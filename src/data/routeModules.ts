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
  | 'crossPlatformMatrix'
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
  | 'glyphInspector'
  | 'userRatings';

export const ROUTE_MODULES: Record<PageRoute, AuxiliaryModule[]> = {
  inicio: [
    'invisibleSpace',
    'platformPreview',
    'symbolsLibrary',
    'textDecorator',
    'readyBioTemplates',
    'readyNicknames',
    'alphabetReference',
    'safetyGuide',
    'userRatings',
  ],
  'letras-chidas': [
    'textDecorator',
    'readyNicknames',
    'symbolsLibrary',
    'decoratorsGallery',
    'userRatings',
  ],
  'letras-elegantes': [
    'signatureGenerator',
    'alphabetReference',
    'readyBioTemplates',
    'specialOccasions',
    'userRatings',
  ],
  'letras-raras': [
    'symbolMatrix',
    'symbolsLibrary',
    'glyphInspector',
    'unicodeGlossary',
    'userRatings',
  ],
  'letras-tatuajes': [
    'alphabetReference',
    'signatureGenerator',
    'singleLetterExplorer',
    'specialOccasions',
    'userRatings',
  ],
  'nicks-free-fire': [
    'readyNicknames',
    'textDecorator',
    'invisibleSpace',
    'symbolsLibrary',
    'userRatings',
  ],
  'letras-chinas': [
    'symbolMatrix',
    'glyphInspector',
    'decoratorsGallery',
    'userRatings',
  ],
  'espacio-invisible': [
    'invisibleSpace',
    'safetyGuide',
    'userRatings',
  ],
  'nombres-parejas': [
    'couplesGenerator',
    'readyBioTemplates',
    'specialOccasions',
    'userRatings',
  ],
  abecedario: [
    'alphabetTable',
    'alphabetReference',
    'singleLetterExplorer',
    'unicodeGlossary',
    'userRatings',
  ],
  instagram: [
    'platformPreview',
    'readyBioTemplates',
    'bioTemplates',
    'symbolsLibrary',
    'invisibleSpace',
    'userRatings',
  ],
  tiktok: [
    'readyBioTemplates',
    'readyNicknames',
    'symbolsLibrary',
    'platformPreview',
    'userRatings',
  ],
  whatsapp: [
    'invisibleSpace',
    'readyBioTemplates',
    'specialOccasions',
    'userRatings',
  ],
  'free-fire': [
    'textDecorator',
    'readyNicknames',
    'invisibleSpace',
    'symbolsLibrary',
    'symbolMatrix',
    'userRatings',
  ],
  facebook: [
    'platformPreview',
    'readyBioTemplates',
    'specialOccasions',
    'userRatings',
  ],
  cursiva: [
    'alphabetReference',
    'alphabetTable',
    'signatureGenerator',
    'singleLetterExplorer',
    'userRatings',
  ],
  goticas: [
    'alphabetReference',
    'alphabetTable',
    'singleLetterExplorer',
    'decoratorsGallery',
    'userRatings',
  ],
  invertidas: [
    'glyphInspector',
    'decoratorsGallery',
    'userRatings',
  ],
  circulos: [
    'alphabetReference',
    'alphabetTable',
    'decoratorsGallery',
    'userRatings',
  ],
  glitch: [
    'glyphInspector',
    'decoratorsGallery',
    'symbolsLibrary',
    'userRatings',
  ],
  simbolos: [
    'symbolsLibrary',
    'symbolMatrix',
    'userRatings',
  ],
  decorador: [
    'textDecorator',
    'decoratorsGallery',
    'symbolsLibrary',
    'userRatings',
  ],
  'contador-bio': [
    'readyBioTemplates',
    'bioTemplates',
    'platformPreview',
    'userRatings',
  ],
  'sobre-nosotros': [],
  'politica-de-privacidad': [],
  'politica-de-cookies': [],
  'terminos-y-condiciones': [],
  contacto: [],
  '404': [],
};
