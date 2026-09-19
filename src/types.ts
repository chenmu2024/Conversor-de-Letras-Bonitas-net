export type TabCategory = 
  | 'todas'
  | 'cursiva'
  | 'gotica'
  | 'bold'
  | 'circulos'
  | 'invertidas'
  | 'glitch'
  | 'free-fire'
  | 'aesthetic'
  | 'smallcaps';

export type PageRoute =
  | 'inicio'
  | 'instagram'
  | 'tiktok'
  | 'whatsapp'
  | 'free-fire'
  | 'facebook'
  | 'letras-chidas'
  | 'letras-elegantes'
  | 'letras-raras'
  | 'letras-tatuajes'
  | 'nicks-free-fire'
  | 'letras-chinas'
  | 'espacio-invisible'
  | 'nombres-parejas'
  | 'abecedario'
  | 'cursiva'
  | 'goticas'
  | 'invertidas'
  | 'circulos'
  | 'glitch'
  | 'simbolos'
  | 'decorador'
  | 'contador-bio'
  | 'compatibilidad-unicode'
  | 'sobre-nosotros'
  | 'politica-de-privacidad'
  | 'politica-de-cookies'
  | 'terminos-y-condiciones'
  | 'contacto'
  | '404';

export interface RouteMeta {
  route: PageRoute;
  path: string;
  category: 'general' | 'plataforma' | 'estilo' | 'recursos';
  label: string;
  seoKeyword: string;
  defaultText: string;
  title: string;
  description: string;
  canonical: string;
}

export interface FontGenerator {
  id: string;
  name: string;
  category: TabCategory;
  description?: string;
  isPopular?: boolean;
  isNew?: boolean;
  transform: (text: string) => string;
  tags: string[];
}

export interface SymbolItem {
  char: string;
  name: string;
  category: string;
}

export interface NickDecoration {
  id: string;
  name: string;
  category: 'free-fire' | 'aesthetic' | 'stars' | 'hearts' | 'clan' | 'faces';
  left: string;
  right: string;
  example?: string;
}

export interface FavoriteItem {
  id: string;
  text: string;
  fontName: string;
  result: string;
  createdAt: number;
}
