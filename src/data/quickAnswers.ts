import { PageRoute } from '../types';
import { SEO_ROUTE_DATA } from './seoRouteData';

export interface QuickAnswerData {
  question: string;
  answer: string;
  relatedLink?: {
    text: string;
    href: string;
  };
}

const ROUTE_QUICK_ANSWERS: Partial<Record<PageRoute, QuickAnswerData>> = {
  tiktok: {
    question: '¿Cómo usar letras bonitas en TikTok?',
    answer: 'Escribe tu nombre o texto, copia el estilo Unicode que prefieras y pruébalo en los campos de TikTok que acepten esos caracteres. La apariencia y aceptación pueden variar según la versión de la app, el dispositivo y el campo donde lo pegues.',
    relatedLink: { text: 'Comprobar longitud del texto', href: '/contador-de-caracteres-bio/' },
  },
  whatsapp: {
    question: '¿Cómo poner letras diferentes en WhatsApp?',
    answer: 'Escribe el texto en el conversor, copia una variante Unicode y pégala en el campo de WhatsApp que quieras probar. Para chats también puedes usar el formato nativo de WhatsApp; los caracteres decorativos dependen de las fuentes disponibles en cada dispositivo.',
    relatedLink: { text: 'Ver compatibilidad Unicode', href: '/compatibilidad-unicode/' },
  },
  facebook: {
    question: '¿Cómo escribir con letras diferentes en Facebook?',
    answer: 'Genera una variante Unicode, cópiala y pruébala en publicaciones, comentarios o campos de perfil compatibles. No es una fuente instalada en Facebook: son caracteres Unicode, por lo que el resultado puede variar entre funciones, navegadores y dispositivos.',
    relatedLink: { text: 'Probar letras en cursiva', href: '/traductor-cursiva/' },
  },
  'letras-chidas': {
    question: '¿Qué son las letras chidas para copiar y pegar?',
    answer: 'Son combinaciones de caracteres Unicode, símbolos y decoraciones visuales que puedes copiar como texto normal. Sirven para probar estilos llamativos en perfiles, chats y nicks sin instalar una fuente.',
    relatedLink: { text: 'Abrir el decorador de nicks', href: '/decorador-de-nicks/' },
  },
  'letras-elegantes': {
    question: '¿Cómo crear letras elegantes para copiar y pegar?',
    answer: 'Introduce un nombre o frase y compara variantes cursivas, script, serif y otros estilos Unicode. Copia el resultado que mantenga mejor la legibilidad en el lugar donde vayas a utilizarlo.',
    relatedLink: { text: 'Ver traductor a cursiva', href: '/traductor-cursiva/' },
  },
  'letras-raras': {
    question: '¿Cómo generar letras raras y símbolos especiales?',
    answer: 'Escribe tu texto y explora transformaciones Unicode, caracteres encerrados, invertidos, decorativos y combinaciones de símbolos. Algunos bloques tienen soporte desigual, así que conviene comprobar el resultado en tu dispositivo.',
    relatedLink: { text: 'Abrir el laboratorio Unicode', href: '/compatibilidad-unicode/' },
  },
  'letras-tatuajes': {
    question: '¿Cómo probar letras para un tatuaje?',
    answer: 'Usa el conversor para comparar visualmente estilos góticos, cursivos y caligráficos antes de preparar un boceto. El resultado de esta web es una referencia de texto Unicode y no sustituye el diseño final realizado por un tatuador.',
    relatedLink: { text: 'Comparar letras góticas', href: '/letras-goticas/' },
  },
  'nicks-free-fire': {
    question: '¿Cómo crear un nick para Free Fire?',
    answer: 'Escribe tu apodo, combina letras Unicode con marcos o símbolos y prueba el resultado en el juego antes de confirmar el cambio. Las reglas y filtros de nombres pueden variar por versión y región.',
    relatedLink: { text: 'Probar espacio invisible', href: '/espacio-invisible/' },
  },
  'letras-chinas': {
    question: '¿Estas “letras chinas” son una traducción real?',
    answer: 'No necesariamente. Esta herramienta mezcla caracteres Unicode orientales auténticos con estilos visuales simulados para decoración. Para traducir palabras o nombres al chino o japonés necesitas un traductor lingüístico específico.',
    relatedLink: { text: 'Ver símbolos y caracteres', href: '/simbolos-y-emojis/' },
  },
  'espacio-invisible': {
    question: '¿Qué es un espacio invisible Unicode?',
    answer: 'Es un carácter Unicode que puede ocupar una posición de texto sin mostrar un espacio convencional. Su aceptación depende de la aplicación, del filtro de caracteres y de la versión, por lo que conviene probarlo antes de guardar un nombre o perfil.',
    relatedLink: { text: 'Ver compatibilidad Unicode', href: '/compatibilidad-unicode/' },
  },
  'nombres-parejas': {
    question: '¿Cómo crear nombres combinados para parejas o dúos?',
    answer: 'Elige una estructura compartida, usa el mismo marco o símbolo y genera dos nombres con un patrón visual coherente. Después copia cada resultado por separado y comprueba que ambos caben en el servicio donde se usarán.',
    relatedLink: { text: 'Abrir decorador de nicks', href: '/decorador-de-nicks/' },
  },
  abecedario: {
    question: '¿Qué incluye el abecedario de letras bonitas?',
    answer: 'Reúne letras de la A a la Z en varias representaciones Unicode para comparar mayúsculas, minúsculas y estilos decorativos. Puedes copiar caracteres individuales o utilizar el conversor para transformar palabras completas.',
    relatedLink: { text: 'Abrir traductor a cursiva', href: '/traductor-cursiva/' },
  },
  cursiva: {
    question: '¿Cómo convertir texto a letra cursiva?',
    answer: 'Escribe tu texto y la herramienta sustituirá las letras compatibles por caracteres Unicode de estilo script o itálico. Después puedes copiar el resultado como texto normal y probarlo en otras aplicaciones.',
    relatedLink: { text: 'Ver abecedario completo', href: '/abecedario-letras-bonitas/' },
  },
  goticas: {
    question: '¿Cómo generar letras góticas para copiar y pegar?',
    answer: 'Introduce tu texto y compara variantes Unicode inspiradas en Fraktur y blackletter. Copia la opción que prefieras y verifica su legibilidad, porque algunos dispositivos pueden representar ciertos caracteres de forma distinta.',
    relatedLink: { text: 'Comprobar compatibilidad', href: '/compatibilidad-unicode/' },
  },
  invertidas: {
    question: '¿Cómo hacer texto invertido o tachado?',
    answer: 'La herramienta sustituye caracteres por equivalentes visuales invertidos y puede aplicar marcas Unicode combinantes para el tachado. El resultado sigue siendo texto copiable, aunque la apariencia depende de la fuente del dispositivo.',
    relatedLink: { text: 'Ver letras glitch y Zalgo', href: '/letras-glitch-zalgo/' },
  },
  circulos: {
    question: '¿Cómo poner letras dentro de círculos o cuadros?',
    answer: 'Escribe tu texto y selecciona una variante Unicode encerrada en círculos o cuadros cuando exista un carácter equivalente. No todas las letras y símbolos tienen una versión encerrada idéntica.',
    relatedLink: { text: 'Ver abecedario A-Z', href: '/abecedario-letras-bonitas/' },
  },
  glitch: {
    question: '¿Qué es el texto Glitch o Zalgo?',
    answer: 'Es texto al que se añaden marcas Unicode combinantes alrededor de las letras para producir un efecto visual distorsionado. Un nivel alto puede reducir la legibilidad o comportarse de forma distinta según la aplicación.',
    relatedLink: { text: 'Abrir letras raras', href: '/letras-raras/' },
  },
  simbolos: {
    question: '¿Cómo copiar símbolos y emojis especiales?',
    answer: 'Busca el símbolo que necesitas, cópialo y combínalo con tu texto o nick. La biblioteca utiliza caracteres Unicode, por lo que algunos símbolos pueden tener apariencia de emoji o variar entre sistemas.',
    relatedLink: { text: 'Abrir decorador de nicks', href: '/decorador-de-nicks/' },
  },
  decorador: {
    question: '¿Cómo decorar un nick con alas, marcos y símbolos?',
    answer: 'Escribe el nombre, elige decoraciones para los extremos y combina el resultado con un estilo de letra. Copia el nick terminado y comprueba que el servicio de destino acepta todos los caracteres.',
    relatedLink: { text: 'Ver símbolos disponibles', href: '/simbolos-y-emojis/' },
  },
  'contador-bio': {
    question: '¿Para qué sirve el contador de caracteres de una bio?',
    answer: 'Cuenta la longitud del texto para ayudarte a comparar una biografía, nombre o publicación con las referencias mostradas por la herramienta. Los límites de las plataformas pueden cambiar, por lo que conviene confirmar reglas recientes antes de publicar.',
    relatedLink: { text: 'Crear letras para Instagram', href: '/letras-para-instagram/' },
  },
  'compatibilidad-unicode': {
    question: '¿Cómo saber si una letra Unicode funcionará en mi dispositivo?',
    answer: 'Consulta el bloque Unicode y el estado de referencia, y después prueba el carácter en el dispositivo o plataforma de destino. Una referencia Unicode confirma la existencia del carácter, no garantiza que todas las aplicaciones lo rendericen o acepten igual.',
    relatedLink: { text: 'Probar espacio invisible', href: '/espacio-invisible/' },
  },
};

export const getQuickAnswerForRoute = (route: PageRoute): QuickAnswerData | undefined =>
  SEO_ROUTE_DATA[route]?.quickAnswer || ROUTE_QUICK_ANSWERS[route];
