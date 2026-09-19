import { PageRoute } from '../types';

export interface RouteSeoData {
  title: string;
  metaDescription: string;
  h1: string;
  h2Secondary: string;
  keywords: string[];
  canonical: string;
  badge: string;
  guideTitle: string;
  guideSteps: { step: string; title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  proTips: string[];
}

export const SEO_ROUTE_DATA: Record<PageRoute, RouteSeoData> = {
  inicio: {
    title: 'Conversor de Letras Bonitas - Fuentes para Copiar y Pegar',
    metaDescription: 'Conversor de letras bonitas online gratis. 90+ tipografías cursivas, góticas y aesthetic para copiar y pegar en Instagram, TikTok, Free Fire y WhatsApp.',
    h1: 'Conversor de Letras Bonitas (Copiar y Pegar)',
    h2Secondary: 'Fuentes, Tipografías y Nicks Aesthetic en el Conversor de Letras Bonitas',
    keywords: [
      'conversor de letras bonitas',
      'letras para copiar y pegar',
      'fuentes de letras',
      'tipografias online',
      'letras bonitas para instagram',
      'traductor de letras',
      'letras chidas',
      'letras bonitas para copiar'
    ],
    canonical: 'https://conversordeletrasbonitas.net/',
    badge: '✨ Conversor de Letras Bonitas',
    guideTitle: '¿Cómo Usar el Conversor de Letras Bonitas?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Frase en el Conversor de Letras Bonitas', text: 'Introduce cualquier texto o apodo en el cuadro del Conversor de Letras Bonitas. La transformación ocurrirá en tiempo real sin demoras.' },
      { step: '2', title: 'Elige tu Estilo en el Conversor de Letras Bonitas', text: 'Navega por 90+ estilos del Conversor de Letras Bonitas (Cursivas, Góticas, Círculos, Aesthetic, Glitch o Gaming).' },
      { step: '3', title: 'Copia con 1 Clic desde el Conversor de Letras Bonitas', text: 'Toca cualquier tarjeta del Conversor de Letras Bonitas para copiar automáticamente y pegar en tu biografía, estado o juego.' }
    ],
    faqs: [
      {
        question: '¿Es gratis este Conversor de Letras Bonitas?',
        answer: 'Sí, el Conversor de Letras Bonitas ofrece todas sus fuentes, símbolos, letras cursivas y decoradores de manera gratuita, sin registro ni descargas.'
      },
      {
        question: '¿Por qué las fuentes del Conversor de Letras Bonitas se pueden copiar y pegar?',
        answer: 'El Conversor de Letras Bonitas no utiliza archivos de fuentes tradicionales, sino glifos universales del estándar Unicode que tienen amplia compatibilidad en dispositivos modernos, aunque algunos caracteres pueden mostrarse de forma diferente o no estar disponibles en sistemas antiguos.'
      },
      {
        question: '¿Cómo copiar múltiples fuentes en el Conversor de Letras Bonitas?',
        answer: 'Activa el modo Multi-Copiar en el Conversor de Letras Bonitas seleccionando las casillas de verificación y presiona "Copiar Todas" en la barra inferior.'
      },
      {
        question: '¿Las tipografías del Conversor de Letras Bonitas funcionan en WhatsApp e Instagram?',
        answer: 'Sí, las combinaciones de caracteres Unicode funcionan en la biografía de Instagram, TikTok, estados de WhatsApp, Facebook y Free Fire en dispositivos actualizados.'
      },
      {
        question: '¿Cómo escribir con letras al revés en el Conversor de Letras Bonitas?',
        answer: 'Escribe tu frase en el Conversor de Letras Bonitas y selecciona el estilo "Letras Invertidas (Upside Down)" para voltear tu texto automáticamente.'
      },
      {
        question: '¿Puedo generar una firma digital con el Conversor de Letras Bonitas?',
        answer: 'Sí, en el Conversor de Letras Bonitas puedes generar firmas elegantes, marcas de agua y caligrafías artísticas listas para copiar.'
      }
    ],
    proTips: [
      'En el Conversor de Letras Bonitas puedes copiar el "Espacio Invisible [ㅤ]" para separar palabras en apodos de juegos.',
      'El Conversor de Letras Bonitas incluye un normalizador automático si utilizas palabras con tilde o la letra ñ.'
    ]
  },

  instagram: {
    title: 'Letras para Instagram ➜ Fuentes Bio para Copiar y Pegar',
    metaDescription: 'Letras bonitas para Instagram. Crea biografías aesthetic, stories y nombres en negrita o cursiva. 90+ fuentes gratis para copiar y pegar en tu perfil.',
    h1: 'Letras para Instagram (Bio, Stories y Perfil)',
    h2Secondary: 'Tipografías Aesthetic, Cursivas Elegantes y Negritas para Biografías',
    keywords: [
      'letras para instagram',
      'fuentes para instagram bio',
      'tipografias instagram',
      'letras aesthetic instagram',
      'cursiva para instagram',
      'letras bonitas para perfil'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-para-instagram/',
    badge: '📸 Diseñado para Instagram Bio & Stories',
    guideTitle: '¿Cómo Cambiar la Letra de tu Biografía en Instagram?',
    guideSteps: [
      { step: '1', title: 'Genera tu Texto Aesthetic', text: 'Escribe tu biografía o nombre en el conversor y selecciona un estilo cursivo o sans bold.' },
      { step: '2', title: 'Copia con 1 Toque', text: 'Haz clic en el botón Copiar de la tipografía que mejor represente tu estilo personal.' },
      { step: '3', title: 'Edita tu Perfil', text: 'Abre Instagram, entra a "Editar Perfil", pega el texto en el campo "Nombre" o "Presentación / Bio" y guarda los cambios.' }
    ],
    faqs: [
      {
        question: '¿Instagram penaliza o bloquea el uso de letras bonitas?',
        answer: 'El uso de caracteres Unicode en biografías y textos públicos está generalmente permitido en Instagram, de manera similar a los emojis y símbolos estándar.'
      },
      {
        question: '¿Cuántos caracteres puedo usar en la biografía de Instagram?',
        answer: 'El límite de la biografía de Instagram es normalmente de 150 caracteres. Ten en cuenta que algunas letras compuestas pueden contar como 2 caracteres Unicode.'
      }
    ],
    proTips: [
      'Combina una primera línea en Negrita Serif con subtítulos en Cursiva Script para un perfil ordenado y aesthetic.',
      'Agrega saltos de línea limpios para que tu presentación sea fácil de leer.'
    ]
  },

  'free-fire': {
    title: 'Letras para Free Fire - Nicks Insanos con Alas y Símbolos',
    metaDescription: 'Generador de nombres y letras para Free Fire. Nicks con alas ꧁༺ ༻꧂, símbolos V de verificado, coronas 亗 y espacio invisible [ㅤ] copiar y pegar.',
    h1: 'Letras para Free Fire (Nicks Insanos y Símbolos)',
    h2Secondary: 'Alas ꧁༺ ༻꧂, Coronas 亗, V de Verificado y Espacio Invisible U+3164',
    keywords: [
      'letras para free fire',
      'nicks para free fire',
      'espacio invisible free fire',
      'simbolos para free fire',
      'nombres insanos ff',
      'letras con alas free fire'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-para-free-fire/',
    badge: '🎮 Gaming & Nicks Insanos',
    guideTitle: '¿Cómo Crear el Mejor Nick para Free Fire con Alas y Espacio?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Nickname', text: 'Escribe el nombre de tu clan o apodo en el conversor de letras.' },
      { step: '2', title: 'Inserta el Espacio Invisible', text: 'Haz clic en [Copiar Espacio Invisible] para separar palabras sin que el juego de Garena te marque error.' },
      { step: '3', title: 'Adorna con Alas y Coronas', text: 'Elige un marco como ꧁༺ TU NICK ༻꧂ o añade el símbolo 亗 para verte insano.' }
    ],
    faqs: [
      {
        question: '¿Por qué Free Fire rechaza los espacios comunes en el nombre?',
        answer: 'El sistema del juego bloquea la barra espaciadora ordinaria (ASCII 32). La solución es usar el carácter especial Hangul Filler (U+3164), que el juego acepta como letra pero visualmente es invisible.'
      },
      {
        question: '¿Cuál es el límite habitual de letras para un nombre en Free Fire?',
        answer: 'Free Fire suele aplicar como referencia un límite de hasta 12 caracteres para el apodo. Asegúrate de que los símbolos de alas no sobrepasen esta longitud.'
      }
    ],
    proTips: [
      'El espacio invisible pequeño (U+FEFF) es útil para ajustar la longitud de apodos cortos.',
      'Usa fuentes Small Caps (ᴍɪ ɴɪᴄᴋ) para que quepan nombres más largos dentro de la longitud habitual.'
    ]
  },

  tiktok: {
    title: 'Letras para TikTok ➜ Nombres Aesthetic para Copiar y Pegar',
    metaDescription: 'Fuentes y letras para TikTok. Genera nombres aesthetic, tipografías para biografía y comentarios virales. Copia y pega gratis en tu perfil de TikTok.',
    h1: 'Letras para TikTok (Nombres Aesthetic y Hooks)',
    h2Secondary: 'Tipografías Virales, Emojis Secretos y Letras para Biografía de TikTok',
    keywords: [
      'letras para tiktok',
      'fuentes tiktok',
      'nombres aesthetic para tiktok',
      'emojis secretos tiktok',
      'letras para comentarios tiktok',
      'letras bonitas tiktok'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-para-tiktok/',
    badge: '🎵 Tendencias y Viralidad en TikTok',
    guideTitle: '¿Cómo Destacar tu Perfil de TikTok con Letras Aesthetic?',
    guideSteps: [
      { step: '1', title: 'Crea tu Hook o Nombre', text: 'Genera títulos llamativos en negrita o cursiva para la primera línea de tu descripción.' },
      { step: '2', title: 'Copia con 1 Clic', text: 'Toca sobre la tipografía seleccionada para copiarla automáticamente.' },
      { step: '3', title: 'Pega en tu Cuenta', text: 'Pégalo en tu biografía de TikTok o en los primeros 3 segundos de tus textos de video.' }
    ],
    faqs: [
      {
        question: '¿Las letras bonitas ayudan a destacar en TikTok?',
        answer: 'Los textos destacados en negrita o tipografías aesthetic ayudan a estructurar el contenido visual y llamar la atención en biografías y descripciones.'
      }
    ],
    proTips: [
      'Usa letras en burbujas o círculos (🅣🅘🅚🅣🅞🅚) para títulos de series o playlists.',
      'Combina emojis aesthetic (ʚɞ, ✦, ｡･:*) para darle un toque visual a tu descripción.'
    ]
  },

  whatsapp: {
    title: 'Letras para WhatsApp - Negrita, Cursiva y Estados Bonitos',
    metaDescription: 'Conversor de letras para WhatsApp. Letras en negrita, cursivas, tachadas y estilos aesthetic para tus estados, nombres de contacto e información de perfil.',
    h1: 'Letras para WhatsApp (Estados, Chats y Perfil)',
    h2Secondary: 'Fuentes Unicode, Negrita *texto*, Cursiva _texto_ y Estilos para Estados',
    keywords: [
      'letras para whatsapp',
      'letras en negrita whatsapp',
      'fuentes para estados de whatsapp',
      'letras cursivas whatsapp',
      'letras tachadas whatsapp',
      'letras para nombres whatsapp'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-para-whatsapp/',
    badge: '💬 Fuentes para WhatsApp y WA Business',
    guideTitle: '¿Cómo Poner Letras Especiales en WhatsApp?',
    guideSteps: [
      { step: '1', title: 'Selecciona el Tipo de Letra', text: 'Escribe tu mensaje en el conversor para obtener decenas de fuentes visuales.' },
      { step: '2', title: 'Copia al Portapapeles', text: 'Haz clic en el botón de copiar del estilo que más te agrade.' },
      { step: '3', title: 'Pega en tu Conversación o Info', text: 'Pega el texto en tus mensajes, estado de 24 horas o en tu nombre visible de WhatsApp.' }
    ],
    faqs: [
      {
        question: '¿Cuál es la diferencia entre los códigos nativos (*negrita*) y las fuentes de esta web?',
        answer: 'Los códigos nativos de WhatsApp (*palabra*) solo funcionan dentro de los chats de WhatsApp. Las fuentes Unicode de esta web funcionan además en tu Nombre de Usuario, Información de Perfil y Estados.'
      }
    ],
    proTips: [
      'Usa el generador de texto invertido para sorprender y gastar bromas a tus amigos en grupos.',
      'Usa fuentes monoespaciadas para enviar códigos o listas ordenadas en WhatsApp Business.'
    ]
  },

  facebook: {
    title: 'Letras para Facebook - Negrita y Precios Tachados 𝗕𝗼𝗹𝗱',
    metaDescription: 'Conversor de letras para Facebook. Escribe en negrita en publicaciones, grupos y biografías. Precios tachados para Marketplace y tipografías destacadas.',
    h1: 'Letras para Facebook (Posts, Grupos y Marketplace)',
    h2Secondary: 'Letras Negritas para Publicaciones, Cursivas y Precios Tachados',
    keywords: [
      'letras para facebook',
      'letras negritas facebook',
      'como escribir en negrita en facebook',
      'precio tachado facebook marketplace',
      'fuentes para facebook',
      'letras bonitas facebook'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-para-facebook/',
    badge: '📘 Optimizado para Feed y Marketplace',
    guideTitle: '¿Cómo Escribir en Negrita en Publicaciones de Facebook?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Publicación', text: 'Introduce el texto o título de tu post en el conversor.' },
      { step: '2', title: 'Selecciona Negrita Sans o Serif', text: 'Copia la tipografía en negrita que más resalte en el feed de noticias.' },
      { step: '3', title: 'Pega en Facebook', text: 'Pega el texto directamente en el cuadro de publicar de tu perfil, página o grupo.' }
    ],
    faqs: [
      {
        question: '¿Por qué Facebook no tiene botón de negrita en los perfiles personales?',
        answer: 'Facebook solo ofrece herramientas de formato enriquecido en notas o ciertos grupos. Con nuestro conversor Unicode puedes publicar en negrita directamente en tu muro, comentarios o perfil con alta compatibilidad.'
      }
    ],
    proTips: [
      'En Marketplace, utiliza la tipografía tachada para mostrar ofertas (Ejemplo: ~~$50~~ $35), lo que puede ayudar a hacer más visible el precio promocional.'
    ]
  },

  'letras-chidas': {
    title: 'Letras Chidas (2026) ➜ 90+ Fuentes para Copiar y Pegar',
    metaDescription: 'Generador de letras chidas gratis para copiar y pegar. Fuentes aesthetic, nicks con alas y letras perronas para Free Fire, TikTok, Instagram y WhatsApp.',
    h1: 'Letras Chidas para Copiar y Pegar (Fuentes y Nicks 2026)',
    h2Secondary: 'Fuentes Chidas, Nicks Insanos y Letras Bonitas para Redes y Videojuegos',
    keywords: [
      'letras chidas',
      'letras chidas para copiar',
      'tipografias chidas',
      'fuentes chidas',
      'letras chidas para free fire',
      'letras chidas para instagram',
      'letras bonitas chidas',
      'letras perronas',
      'nicks chidos'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-chidas/',
    badge: '🇲🇽 Especial Letras Chidas & Nicks Insanos',
    guideTitle: '¿Cómo Usar y Copiar Letras Chidas en tu Celular?',
    guideSteps: [
      { step: '1', title: 'Escribe tu frase o Nick Chido', text: 'Escribe tu nombre, apodo o frase en la caja de texto superior.' },
      { step: '2', title: 'Elige tu Estilo Perrón', text: 'Elige entre más de 90 variantes chidas: letras con alas, góticas insanas, cursivas aesthetic y símbolos de rey 亗.' },
      { step: '3', title: 'Copia con 1 Toque y Pega', text: 'Toca cualquier tarjeta para copiar automáticamente al portapapeles y pégala en tu juego o biografía.' }
    ],
    faqs: [
      {
        question: '¿Qué son las "Letras Chidas" y dónde se pueden usar?',
        answer: 'En México y Latinoamérica, "Letras Chidas" se refiere a textos con fuentes decorativas llamativas, nicks con alas y letras aesthetic. Se pueden usar en Free Fire, Instagram, TikTok, WhatsApp, Roblox y Fortnite.'
      },
      {
        question: '¿Las letras chidas funcionan en nicks de Free Fire y clanes?',
        answer: 'Muchos caracteres Unicode suelen ser compatibles con Free Fire, aunque la compatibilidad puede variar según la versión del juego, el dispositivo y el sistema operativo.'
      },
      {
        question: '¿Cómo poner letras chidas con espacio invisible en un nick?',
        answer: 'Solo copia nuestro botón de "Espacio Invisible" y pégalo entre tus palabras para separar tu nombre sin que el juego lo rechace.'
      }
    ],
    proTips: [
      'Combina letras chidas en negrita con el símbolo de corona 亗 para crear un perfil imponente.',
      'Usa el decorador de nicks para añadir alas simétricas ꧁ ꧂ alrededor de tu nombre.'
    ]
  },

  'letras-elegantes': {
    title: 'Letras Elegantes ➜ Tipografías Finas para Copiar y Pegar',
    metaDescription: 'Conversor de letras elegantes para copiar y pegar. Fuentes cursivas finas, caligrafía inglesa y tipografías de lujo para biografías, firmas y títulos.',
    h1: 'Letras Elegantes para Copiar y Pegar (Caligrafía y Cursiva)',
    h2Secondary: 'Tipografías Finas, Script de Lujo y Firmas Digitales para Redes Sociales',
    keywords: [
      'letras elegantes',
      'letras elegantes para copiar',
      'fuentes elegantes',
      'tipografias finas',
      'letras bonitas elegantes',
      'cursiva elegante',
      'letras de lujo',
      'firmas aesthetic'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-elegantes/',
    badge: '💎 Tipografías Elegantes & Firmas de Lujo',
    guideTitle: '¿Cómo Crear Biografías y Títulos con Letras Elegantes?',
    guideSteps: [
      { step: '1', title: 'Introduce tu Nombre o Frase', text: 'Escribe tu presentación profesional, marca personal o cita inspiradora.' },
      { step: '2', title: 'Selecciona Caligrafía Fina o Script', text: 'Explora nuestros estilos Script Italiano, Caligrafía Inglesa, Serif Clásico y Doble Trazo de Lujo.' },
      { step: '3', title: 'Copia y Pega en tu Perfil', text: 'Copia con un clic y pégalo en tu biografía de Instagram, WhatsApp Info o pie de foto.' }
    ],
    faqs: [
      {
        question: '¿Cuáles son las fuentes más elegantes para una biografía de Instagram?',
        answer: 'Las más recomendadas son Cursiva Script Fina (𝒮𝒸𝓇𝒾𝓅𝓉), Cursiva Negrita (𝓒𝓾𝓻𝓼𝓲𝓿𝓪), Serif Matemático y Serif en Minúsculas (Small Caps).'
      },
      {
        question: '¿Puedo usar letras elegantes para firmas de correo y documentos?',
        answer: 'Sí, son caracteres Unicode estándar que se pueden pegar en correos de Gmail, Outlook, firmas de WhatsApp Business y documentos de Word.'
      }
    ],
    proTips: [
      'Para un efecto de máxima sobriedad, usa Small Caps (ᴍɪɴúꜱᴄᴜʟᴀꜱ ᴇʟᴇɢᴀɴᴛᴇꜱ) en los encabezados y Script en los nombres propios.',
      'Añade un símbolo sutil como ✧ o ✦ para enmarcar frases de motivación.'
    ]
  },

  'letras-raras': {
    title: 'Letras Raras y Símbolos Extraños ➜ Copiar y Pegar 尺卂尺卂丂',
    metaDescription: 'Conversor de letras raras y símbolos extraños para copiar y pegar. Alfabetos exóticos, glitch zalgo, texto al revés y caracteres ocultos para nicks.',
    h1: 'Letras Raras y Símbolos Extraños (Copiar y Pegar)',
    h2Secondary: 'Caracteres Unicode Ocultos, Alfabetos Exóticos y Nicks con Símbolos Raros',
    keywords: [
      'letras raras',
      'letras raras para copiar',
      'simbolos raros',
      'fuentes raras',
      'letras extrañas',
      'caracteres raros',
      'letras locas',
      'letras raras para free fire'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-raras/',
    badge: '🔮 Glifos Exóticos & Símbolos Raros',
    guideTitle: '¿Cómo Generar y Copiar Letras Raras y Símbolos Ocultos?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Texto', text: 'Escribe cualquier palabra en el generador de letras raras.' },
      { step: '2', title: 'Explora Alfabetos Raros', text: 'Descubre alfabetos simulados en estilo oriental 尺卂尺ㄖ, runas nórdicas, zalgo maldito, texto invertido y código binario.' },
      { step: '3', title: 'Copia y Pega', text: 'Toca para copiar inmediatamente y sorprende a tus amigos en chats o juegos.' }
    ],
    faqs: [
      {
        question: '¿Qué son las letras raras Unicode?',
        answer: 'Son caracteres pertenecientes a bloques exóticos del estándar Unicode internacional (como alfabetos fonéticos IPA, caracteres matemáticos especiales, kana japonés o marcas diacríticas apiladas).'
      },
      {
        question: '¿Por qué las letras raras son tan populares en juegos como Free Fire y Discord?',
        answer: 'Porque permiten crear identidades visuales únicas y difíciles de duplicar, destacando inmediatamente en tablas de clasificación y chats.'
      }
    ],
    proTips: [
      'Si juegas en clan, utiliza letras raras para las iniciales del clan y asegurar que ningún rival copie tu tag.',
      'Usa el Glitch / Zalgo con moderación para mantener la frase legible mientras transmite misterio.'
    ]
  },

  'letras-tatuajes': {
    title: 'Letras para Tatuajes - Fuentes Góticas y Cursivas Tattoo',
    metaDescription: 'Conversor de letras para tatuajes online. Tipografías góticas Old English, caligrafía cursiva, lettering y números romanos para fechas y diseños de piel.',
    h1: 'Letras para Tatuajes y Lettering (Copiar y Pegar)',
    h2Secondary: 'Tipografías Góticas, Caligrafía Fina y Números Romanos para Diseños de Piel',
    keywords: [
      'letras para tatuajes',
      'fuentes para tatuajes',
      'letras goticas para tatuajes',
      'numeros romanos para tatuajes',
      'caligrafia para tatuajes',
      'tipografia tattoo',
      'letras cursivas para tatuajes',
      'lettering tatuajes'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-para-tatuajes/',
    badge: '💉 Especial Lettering & Tatuajes',
    guideTitle: '¿Cómo Elegir y Probar la Fuente Perfecta para tu Tatuaje?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Frase o Nombre', text: 'Introduce el texto o lema que deseas tatuar (ej: Familia, Amor Fati, Memento Mori).' },
      { step: '2', title: 'Compara Estilos y Ubicación', text: 'Prueba la vista previa en el simulador de piel (antebrazo, clavícula, costillas, muñeca).' },
      { step: '3', title: 'Copia o Descarga Plantilla', text: 'Copia el texto estilizado o conviértelo en imagen para mostrárselo a tu tatuador.' }
    ],
    faqs: [
      {
        question: '¿Cuáles son las fuentes más populares para tatuajes?',
        answer: 'Las más solicitadas son Gótica Old English (𝕺𝖑𝖉 𝕰𝖓𝖌𝖑𝖎𝖘𝖍) para nombres y lemas de impacto, Cursiva Script Fina (𝒮𝒸𝓇𝒾𝓅𝓉) para frases delicadas, y Números Romanos para fechas de nacimiento.'
      },
      {
        question: '¿Cómo convertir una fecha a números romanos para tatuaje?',
        answer: 'Usa nuestro conversor integrado: selecciona tu fecha de nacimiento (ej: 15/08/2002) y generará automáticamente la notación perfecta en números romanos (XV · VIII · MMII).'
      }
    ],
    proTips: [
      'Si te tatúas en el antebrazo o pecho, las letras góticas mayúsculas dan mayor presencia y legibilidad.',
      'Para zonas como la clavícula o costillas, la caligrafía fina cursiva y el espaciado amplio resultan más estéticos.'
    ]
  },

  'nicks-free-fire': {
    title: 'Nicks para Free Fire ➜ Alas, ⓥ Verificado & Insanos 亗',
    metaDescription: 'Crea los mejores nicks para Free Fire con alas ꧁༺ ༻꧂, V de verificado ⓥ, coronas 亗, armas MP40 y espacio invisible [ㅤ]. ¡Copiar en 1 Clic!',
    h1: 'Generador de Nicks para Free Fire (Alas, Insanos & ⓥ)',
    h2Secondary: 'Nombres con Alas, Símbolos de Clan, Dúos Tóxicos y Espacio Invisible',
    keywords: [
      'generador de nicks free fire',
      'nombres para free fire',
      'nicks con alas',
      'v de verificado free fire',
      'simbolos para free fire',
      'nicks insanos',
      'espacio invisible free fire',
      'nombres para clan free fire'
    ],
    canonical: 'https://conversordeletrasbonitas.net/generador-de-nicks-free-fire/',
    badge: '🎮 Nicks Gamer 2026',
    guideTitle: '¿Cómo Crear y Copiar un Nick Insano para Free Fire?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Apodo o Nombre', text: 'Escribe tu nombre de jugador en el generador gamer.' },
      { step: '2', title: 'Añade Alas, Tag de Clan o ⓥ', text: 'Selecciona alas ꧁ ꧂, coronas de rey 亗, o la insignia de verificado ⓥ.' },
      { step: '3', title: 'Copia con Espacio Invisible', text: 'Copia tu nick listo y pégalo directamente en la tarjeta de cambio de nombre de Garena Free Fire.' }
    ],
    faqs: [
      {
        question: '¿Cómo se pone el espacio invisible en el nombre de Free Fire?',
        answer: 'Solo haz clic en nuestro botón "Copiar Espacio Invisible [ㅤ]" y pégalo entre las letras de tu nick dentro del juego.'
      },
      {
        question: '¿Estos nicks con alas y símbolos son compatibles con el juego?',
        answer: 'Los símbolos y caracteres de esta sección han sido seleccionados tras verificar su visualización en Free Fire para Android e iOS.'
      }
    ],
    proTips: [
      'Si juegas en escuadra, crea un tag uniforme de clan como ᴮᴼˢˢ★ o 亗 para que todos los miembros resalten en el lobby.',
      'Para nombres de dúo o parejas, utiliza el formato 『 𝓔𝓵 𝓡𝓮𝔂 』 y 『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』.'
    ]
  },

  'letras-chinas': {
    title: 'Letras Chinas y Japonesas Kanji ➜ Copiar y Pegar 尺卂尺ㄖ',
    metaDescription: 'Letras chinas y japonesas simuladas para copiar y pegar. Convierte texto a kanji simulado, katakana anime, dragones 🐉 y símbolos para nicks y bios.',
    h1: 'Letras Chinas y Japonesas Simuladas (Kanji & Katakana)',
    h2Secondary: 'Alfabetos Orientales Simulados, Símbolos Kanji Auténticos y Nicks Anime',
    keywords: [
      'letras chinas',
      'letras chinas para copiar',
      'letras japonesas para copiar',
      'fuentes estilo chino',
      'kanji para copiar',
      'letras anime',
      'simbolos chinos',
      'alfabeto oriental simulado'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-chinas/',
    badge: '🏮 Especial Alfabetos Orientales & Kanji',
    guideTitle: '¿Cómo Generar Letras Chinas y Japonesas para Redes Sociales?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Palabra', text: 'Escribe cualquier frase o nombre en el conversor de letras chinas.' },
      { step: '2', title: 'Selecciona Kanji Simulado o Anime', text: 'Elige entre simulación de caracteres (尺卂尺ㄖ), Katakana (ﾑ乃ᄃ) o símbolos auténticos (愛, 龍, 侍, 桜).' },
      { step: '3', title: 'Copia y Pega', text: 'Copia en 1 clic y pégalo en tu biografía de TikTok, Instagram, Discord o videojuegos.' }
    ],
    faqs: [
      {
        question: '¿Qué significa el símbolo 尺卂尺ㄖ?',
        answer: 'Son caracteres Unicode que simulan visualmente las letras del abecedario latino (R-A-R-O) usando trazos de caracteres chinos y japoneses tradicionales.'
      },
      {
        question: '¿Cuáles son los símbolos kanji más populares para perfiles?',
        answer: 'Los más utilizados son 愛 (Amor), 龍 (Dragón), 侍 (Samurái), 桜 (Flor de Cerezo / Sakura) y 力 (Fuerza).'
      }
    ],
    proTips: [
      'Enmarca tu nombre con los dragones 🐉 𓆩 龍 · NICK · 龍 𓆪 para un perfil oriental aesthetic.',
      'Combina Katakana simulado con flores de cerezo 🌸 para biografías inspiradas en anime.'
    ]
  },

  'espacio-invisible': {
    title: 'Espacio Invisible [ㅤ] y Letra Invisible ➜ Copiar y Pegar',
    metaDescription: 'Copia el espacio invisible [ㅤ] (Hangul Filler U+3164) y letra invisible para Free Fire, WhatsApp, Instagram y TikTok. Compatible con nombres transparentes.',
    h1: 'Espacio Invisible y Letra Invisible [ㅤ] (Copiar y Pegar)',
    h2Secondary: 'Generador de Caracteres Invisibles, Nombres Transparentes y Espacios Vacíos',
    keywords: [
      'espacio invisible',
      'letra invisible',
      'espacio invisible free fire',
      'caracter invisible',
      'espacio en blanco para copiar',
      'nombre invisible whatsapp',
      'letra transparente',
      'hangul filler u3164'
    ],
    canonical: 'https://conversordeletrasbonitas.net/espacio-invisible/',
    badge: '👻 Carácter Invisible Unicode U+3164',
    guideTitle: '¿Cómo Usar el Espacio Invisible en Free Fire, WhatsApp e Instagram?',
    guideSteps: [
      { step: '1', title: 'Copia el Espacio Invisible', text: 'Haz clic en el botón "Copiar Espacio Invisible [ㅤ]" para guardarlo en tu portapapeles.' },
      { step: '2', title: 'Abre tu Juego o Aplicación', text: 'Ve a la pantalla de cambio de nombre de Free Fire, tu perfil de Instagram o un chat de WhatsApp.' },
      { step: '3', title: 'Pégalo en el Campo de Texto', text: 'Mantén presionado y selecciona Pegar para obtener un nombre separado o un mensaje completamente invisible.' }
    ],
    faqs: [
      {
        question: '¿Qué código Unicode tiene el espacio invisible?',
        answer: 'El espacio invisible principal utiliza el carácter Hangul Filler (código Unicode U+3164) y el espacio de ancho cero (Zero-Width Space U+200B), los cuales son interpretados por los sistemas como texto real pero visualmente invisibles.'
      },
      {
        question: '¿Por qué no funciona la barra espaciadora normal en los nicks de Free Fire?',
        answer: 'Garena Free Fire bloquea el carácter de espacio tradicional (U+0020). Al utilizar el espacio invisible Hangul Filler (U+3164), el juego lo acepta como una letra válida y permite separar palabras sin error.'
      }
    ],
    proTips: [
      'Para enviar un mensaje en blanco en WhatsApp, copia el espacio invisible y pulsa Enviar.',
      'Usa el espacio invisible doble para separar clanes y nombres en Free Fire de forma limpia.'
    ]
  },

  'nombres-parejas': {
    title: 'Nombres para Parejas Free Fire y Dúos ➜ Nicks Matching ♡',
    metaDescription: 'Los mejores nombres para parejas en Free Fire, TikTok y videojuegos. Nicks que combinan, dúos tóxicos, coronas de reyes y símbolos de amor listos para copiar.',
    h1: 'Nombres para Parejas y Dúos (Matching Nicks)',
    h2Secondary: 'Nicks Combinados para Novios, Dúos Tóxicos en Free Fire y Perfiles Matching',
    keywords: [
      'nombres para parejas free fire',
      'nicks para duos',
      'nombres de novios para juegos',
      'matching nicks',
      'nombres goals para parejas',
      'duos toxicos free fire',
      'nombres combinados para parejas'
    ],
    canonical: 'https://conversordeletrasbonitas.net/nombres-para-parejas/',
    badge: '💑 Especial Dúos y Parejas Goals',
    guideTitle: '¿Cómo Crear Nombres Combinados Perfectos para Parejas?',
    guideSteps: [
      { step: '1', title: 'Elige tu Temática de Pareja', text: 'Selecciona entre Dúo Rey/Reina, Parejas de Película (Bonnie & Clyde), o Nicks Tóxicos.' },
      { step: '2', title: 'Personaliza los Nombres', text: 'Escribe los apodos de ambos para generar la versión estilizada con coronas y corazones simétricos.' },
      { step: '3', title: 'Copien Ambos su Parte', text: 'Cada integrante de la pareja copia su nick individual y lo aplica en su perfil.' }
    ],
    faqs: [
      {
        question: '¿Cuáles son los nombres de pareja más populares para Free Fire?',
        answer: 'Los más utilizados son 『 𝓔𝓵 𝓡𝓮𝔂 』 ♡ 『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』, 亗 𝑩𝑶𝑵𝑵𝑰𝑬 亗 ♡ 亗 𝑪𝑳𝒀𝑫𝑬 亗, y ⚡ 𝕬𝖉𝖆𝖓 ♡ 𝕰𝖛𝖆 ⚡.'
      },
      {
        question: '¿Se pueden usar estos nicks en Instagram y WhatsApp?',
        answer: 'Sí, los caracteres y fuentes son compatibles con biografías compartidas de Instagram, descripciones de TikTok y nombres de contacto en WhatsApp.'
      }
    ],
    proTips: [
      'Usen el mismo símbolo de clan o corona al inicio (ej: 亗) para que resalten juntos en el marcador.',
      'En Instagram, pueden colocar la mitad de la frase cada uno en sus biografías.'
    ]
  },

  'abecedario': {
    title: 'Abecedario de Letras Bonitas (A-Z) ➜ Fuentes para Copiar',
    metaDescription: 'Catálogo completo del abecedario de letras bonitas de la A a la Z. Letras mayúsculas y minúsculas en cursiva, gótica, círculos, doble trazo y símbolos.',
    h1: 'Abecedario Completo de Letras Bonitas (A a la Z)',
    h2Secondary: 'Directorio de Todas las Letras Mayúsculas y Minúsculas en Fuentes Unicode',
    keywords: [
      'abecedario de letras bonitas',
      'abecedario para copiar',
      'letras bonitas a a la z',
      'abecedario cursiva para copiar',
      'abecedario gotico para copiar',
      'abecedario aesthetic',
      'letras individuales a z'
    ],
    canonical: 'https://conversordeletrasbonitas.net/abecedario-letras-bonitas/',
    badge: '📖 Directorio Maestro A-Z',
    guideTitle: '¿Cómo Explorar y Copiar Letras del Abecedario?',
    guideSteps: [
      { step: '1', title: 'Selecciona una Tipografía', text: 'Explora las tablas de Cursiva, Gótica Old English, Letras en Círculos, Small Caps o Tatuajes.' },
      { step: '2', title: 'Copia el Abecedario Completo o Letras Sueltas', text: 'Usa los botones de copiado masivo o haz clic en cualquier letra específica para copiarla.' },
      { step: '3', title: 'Pégala en tu Diseño', text: 'Úsalas para iniciales destacadas, firmas o títulos.' }
    ],
    faqs: [
      {
        question: '¿El abecedario incluye números y caracteres especiales?',
        answer: 'Sí, cada estilo incluye el abecedario de la A a la Z en mayúsculas y minúsculas, así como los dígitos del 0 al 9 correspondientes.'
      },
      {
        question: '¿Cómo copiar una sola letra bonita?',
        answer: 'Simplemente haz clic sobre la casilla de la letra que te guste en la tabla interactiva y se copiará de inmediato a tu portapapeles.'
      }
    ],
    proTips: [
      'Usa las letras iniciales en Old English o Cursiva Bold para comenzar tus párrafos en redes.',
      'Combina letras en círculos negros 🅐 🅑 🅒 para crear listas numeradas o destacados.'
    ]
  },

  cursiva: {
    title: 'Traductor a Cursiva - Letras Cursivas para Copiar y Pegar',
    metaDescription: 'Traductor de letras a cursiva online. Convierte tu texto en letra manuscrita, script elegante, caligrafía inglesa y cursiva negrita para copiar y pegar.',
    h1: 'Traductor a Cursiva (Letras Cursivas y Manuscritas)',
    h2Secondary: '𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭, 𝒮𝒸𝓇𝒾𝓅𝓉 ℰ𝓁ℯℊ𝒶𝓃𝓉ℯ y Caligrafía para Copiar y Pegar',
    keywords: [
      'traductor a cursiva',
      'letras cursivas para copiar',
      'letras manuscritas online',
      'letras cursivas bonitas',
      'fuente cursiva copiar y pegar',
      'convertidor de letra cursiva'
    ],
    canonical: 'https://conversordeletrasbonitas.net/traductor-cursiva/',
    badge: '✍️ Caligrafía y Cursivas Elegantes',
    guideTitle: '¿Cómo Funciona el Traductor a Cursiva Online?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Texto', text: 'Escribe nombres, cartas, dedicatorias o firmas en la caja de texto.' },
      { step: '2', title: 'Elige entre 10+ Variantes Cursivas', text: 'Desde Cursiva Matemática (𝒞𝓊𝓇𝓈𝒾𝓋𝒶) hasta Manuscrita Gruesa (𝓒𝓾𝓻𝓼𝓲𝓿𝓪 𝓑𝓸𝓵𝓭).' },
      { step: '3', title: 'Copia y Úsala en Cualquier Lugar', text: 'Pégala en cartas digitales, biografías de Instagram, cartas de amor o firmas digitales.' }
    ],
    faqs: [
      {
        question: '¿Qué estilos de letra cursiva incluye este traductor?',
        answer: 'Incluye Cursiva Clásica (Mathematical Script), Cursiva Negrita (Bold Script), Manuscrita Fina, Caligrafía Francesa y combinaciones con adornos.'
      }
    ],
    proTips: [
      'Las letras cursivas son las más utilizadas en biografías de moda, fotografía, poesía y dedicatorias de amor.'
    ]
  },

  goticas: {
    title: 'Letras Góticas para Copiar y Pegar - Fuentes Medievales',
    metaDescription: 'Conversor de letras góticas online. Tipografías Old English, Fraktur medieval, gótico oscuro (Dark Aesthetic) y letras góticas en negrita. Copiar y pegar.',
    h1: 'Letras Góticas (Old English, Fraktur y Medieval)',
    h2Secondary: '𝔊ó𝔱𝔦𝔠𝔞 ℭ𝓁á𝔰𝔦𝔠𝔞, 𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉 y Tipografías Medievales para Copiar',
    keywords: [
      'letras goticas',
      'letras goticas para copiar y pegar',
      'fuentes goticas online',
      'tipografia old english',
      'letras medievales',
      'abecedario de letras goticas'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-goticas/',
    badge: '🖤 Tipografías Medievales & Dark',
    guideTitle: '¿Qué Son las Letras Góticas (Fraktur) y Cómo Usarlas?',
    guideSteps: [
      { step: '1', title: 'Introduce tu Nombre o Frase', text: 'Escribe el texto que deseas transformar en estilo medieval o gótico.' },
      { step: '2', title: 'Selecciona Fraktur o Fraktur Bold', text: 'Compara entre el trazo fino tradicional o el estilo gótico oscuro de alto impacto.' },
      { step: '3', title: 'Copia al Instante', text: 'Úsalas en nicks de Discord, videojuegos de rol, tatuajes conceptuales y perfiles de estilo dark.' }
    ],
    faqs: [
      {
        question: '¿De dónde provienen los caracteres de letras góticas?',
        answer: 'Provienen del bloque Unicode Mathematical Fraktur (U+1D504 - U+1D537), inspirado en los manuscritos medievales europeos y la tipografía alemana clásica.'
      }
    ],
    proTips: [
      'El estilo gótico es el preferido por streamers de juegos oscuros, bandas de rock/metal y comunidades aesthetic dark.'
    ]
  },

  simbolos: {
    title: 'Símbolos para Copiar y Pegar - Alas, Coronas y Estrellas',
    metaDescription: 'Catálogo de más de 200 símbolos bonitos para copiar y pegar. Alas para Free Fire ꧁༺ ༻꧂, coronas 亗, corazones ♥, estrellas ★ y kaomojis aesthetic.',
    h1: 'Símbolos y Adornos para Copiar y Pegar',
    h2Secondary: 'Alas Gamer ꧁༺ ༻꧂, Coronas 亗, Corazones Aesthetic y Kaomojis',
    keywords: [
      'simbolos para copiar y pegar',
      'simbolos para free fire',
      'alas para nick',
      'simbolos aesthetic',
      'corazones para copiar',
      'estrellas unicode'
    ],
    canonical: 'https://conversordeletrasbonitas.net/simbolos-y-emojis/',
    badge: '✨ 200+ Símbolos y Adornos Listos',
    guideTitle: '¿Cómo Insertar Símbolos Especiales en tu Nick o Estado?',
    guideSteps: [
      { step: '1', title: 'Explora por Categoría', text: 'Navega por pestañas de Alas, Coronas, Estrellas, Corazones, Música y Kaomojis.' },
      { step: '2', title: 'Haz Clic en el Símbolo', text: 'Al tocar cualquier glifo o icono se copiará de forma automática a tu portapapeles con vibración de confirmación.' },
      { step: '3', title: 'Pega en tu Apodo', text: 'Combínalo con tus letras bonitas para crear diseños únicos.' }
    ],
    faqs: [
      {
        question: '¿Los símbolos se ven bien en todos los teléfonos?',
        answer: 'Sí, todos los símbolos pertenecen a la tabla Unicode estándar internacional, visibles en iPhone, Android, tablets y ordenadores.'
      }
    ],
    proTips: [
      'Coloca alas simétricas (꧁༺ a la izquierda y ༻꧂ a la derecha) para dar balance y profesionalismo a tu nombre gamer.'
    ]
  },

  decorador: {
    title: 'Decorador de Nicks y Nombres - Marcos con Alas Gamer',
    metaDescription: 'Decorador de nicks automático. Transforma tu nombre con marcos estéticos, alas gamer, coronas, estrellas y separadores listos para copiar y pegar.',
    h1: 'Decorador de Nicks y Nombres (Marcos y Alas)',
    h2Secondary: 'Generador de Apodos con Adornos Frontales y Posteriores Automáticos',
    keywords: [
      'decorador de nicks',
      'decorar nombres',
      'marcos para nicks',
      'generador de apodos con alas',
      'decorador de texto',
      'nombres bonitos con simbolos'
    ],
    canonical: 'https://conversordeletrasbonitas.net/decorador-de-nicks/',
    badge: '👑 Diseñador Automático de Nicks',
    guideTitle: '¿Cómo Decorar tu Nombre en Segundos?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Nick', text: 'Introduce tu apodo base en el recuadro superior.' },
      { step: '2', title: 'Selecciona una Plantilla', text: 'Elige entre marcos gamer, diseños aesthetic con flores, corazones o estilo rey insano.' },
      { step: '3', title: 'Copia el Resultado Final', text: 'Tu apodo quedará perfectamente enmarcado y listo para destacar.' }
    ],
    faqs: [
      {
        question: '¿Puedo combinar decoraciones con letras cursivas o góticas?',
        answer: '¡Por supuesto! Primero convierte tu nombre al estilo de letra deseado y luego aplícale el marco o decorador.'
      }
    ],
    proTips: [
      'Guarda tus creaciones favoritas en la sección de favoritos con la estrella para usarlas cuando cambies de temporada en tus juegos.'
    ]
  },

  invertidas: {
    title: 'Letras Tachadas e Invertidas - Texto al Revés para Copiar',
    metaDescription: 'Conversor de letras tachadas, subrayadas y texto al revés (texto volteado de cabeza ǝnb uǝ ɐʇsɐɥ). Copiar y pegar para bromas y ofertas de Marketplace.',
    h1: 'Letras Tachadas, Subrayadas e Invertidas',
    h2Secondary: 'Texto al Revés (ǝp ɐzǝqɐɔ) y Tachado para Ofertas de Precios',
    keywords: [
      'letras tachadas',
      'texto al reves',
      'inversor de texto',
      'letras de cabeza',
      'texto subrayado copiar y pegar',
      'letras tachadas para facebook'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-tachadas-e-invertidas/',
    badge: '🔄 Efectos Visuales e Inversión',
    guideTitle: '¿Cómo Poner Texto al Revés o Tachado?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Frase', text: 'Escribe el mensaje o precio que deseas modificar.' },
      { step: '2', title: 'Copia el Texto Transformado', text: 'Elige entre tachado simple (t̶e̶x̶t̶o̶), doble tachado o volteado 180 grados.' },
      { step: '3', title: 'Pega en tu Publicación', text: 'Excelente para enfatizar descuentos de productos o sorprender a tus contactos en chats.' }
    ],
    faqs: [
      {
        question: '¿Cómo se logra el efecto de texto al revés?',
        answer: 'Se utilizan caracteres del alfabeto fenicio, griego y Unicode que se asemejan a las letras latinas giradas 180 grados en orden invertido.'
      }
    ],
    proTips: [
      'El tachado diagonal y de barra es ideal para listas de tareas completadas o descuentos comerciales.'
    ]
  },

  circulos: {
    title: 'Letras en Círculos y Cuadros - Burbujas Negras y Blancas',
    metaDescription: 'Conversor de letras en círculos y cuadros. Escribe en burbujas blancas Ⓑⓤⓡⓑⓤⓙⓐ y círculos negros 🅝🅔🅖🅡🅞🅢. Ideal para numerar listas y títulos.',
    h1: 'Letras en Círculos, Cuadros y Burbujas',
    h2Secondary: 'ⓑⓤⓡⓑⓤⓙⓐⓢ ⓣⓔⓧⓣⓞ, 🅒🅘🅡🅒🅤🅛🅞🅢 🅝🅔🅖🅡🅞🅢 y Cuadros',
    keywords: [
      'letras en circulos',
      'letras en burbujas',
      'letras circulos negros',
      'numeros en circulos copiar',
      'letras en cuadros',
      'fuente burbuja copiar y pegar'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-en-circulos-y-cuadros/',
    badge: '🅒 Numeración y Títulos Destacados',
    guideTitle: '¿Para Qué Usar Letras en Círculos y Cuadros?',
    guideSteps: [
      { step: '1', title: 'Escribe Números o Palabras Cortas', text: 'Son ideales para crear índices (① ② ③) o destacar iniciales.' },
      { step: '2', title: 'Selecciona Círculo Blanco o Negro', text: 'Los círculos negros 🅝🅔🅖🅡🅞🅢 proporcionan el mayor contraste visual posible.' },
      { step: '3', title: 'Copia y Pega', text: 'Pégalos en tus notas, listas de productos o títulos de capítulos.' }
    ],
    faqs: [
      {
        question: '¿Hay números disponibles en círculos?',
        answer: 'Sí, disponemos de números del 0 al 99 en círculos blancos, negros y paréntesis dentro del estándar Unicode Enclosed Alphanumerics.'
      }
    ],
    proTips: [
      'Úsalos como viñetas para enumerar pasos en tutoriales de redes sociales.'
    ]
  },

  glitch: {
    title: 'Letras Glitch y Zalgo - Texto Maldito, Corrupto y Cyberpunk',
    metaDescription: 'Generador de letras glitch y texto Zalgo maldito. Crea texto corrupto, terrorífico y distorsionado con caracteres combinados. Copiar y pegar.',
    h1: 'Letras Glitch, Zalgo y Texto Maldito',
    h2Secondary: 'Texto Corrupto, Distorsionado y Efecto Hacker Cyberpunk',
    keywords: [
      'letras glitch',
      'texto zalgo',
      'generador de texto maldito',
      'letras corruptas',
      'texto distorsionado',
      'letras de terror copiar'
    ],
    canonical: 'https://conversordeletrasbonitas.net/letras-glitch-zalgo/',
    badge: '⚡ Efecto Hacker & Horror Zalgo',
    guideTitle: '¿Cómo Funciona el Generador de Texto Zalgo y Glitch?',
    guideSteps: [
      { step: '1', title: 'Escribe tu Mensaje', text: 'Introduce el texto que deseas distorsionar.' },
      { step: '2', title: 'Ajusta el Nivel de Caos', text: 'Genera desde una distorsión sutil estilo cyberpunk hasta caos extremo Zalgo.' },
      { step: '3', title: 'Copia y Sorprende', text: 'Pégalo en perfiles de Halloween, historias de terror o servidores de Discord.' }
    ],
    faqs: [
      {
        question: '¿El texto Zalgo puede romper páginas web?',
        answer: 'No las rompe, pero debido a que utiliza cientos de marcas diacríticas apiladas verticalmente, puede desbordar los contenedores de texto visualmente, que es justamente el efecto deseado.'
      }
    ],
    proTips: [
      'Para nombres de usuario de juegos, utiliza niveles moderados de glitch para asegurar que el sistema lo valide.'
    ]
  },

  'contador-bio': {
    title: 'Contador de Caracteres para Biografía de Instagram y TikTok',
    metaDescription: 'Contador de caracteres y palabras online en tiempo real con límites para biografías de Instagram (150), TikTok (80), Twitter (280) y apodos de Free Fire (12).',
    h1: 'Contador de Caracteres y Palabras para Redes Sociales',
    h2Secondary: 'Límites de Bio para Instagram (150), TikTok (80), WhatsApp y Free Fire',
    keywords: [
      'contador de caracteres',
      'contador de letras para instagram',
      'limite bio instagram',
      'contador de palabras online',
      'cuantas letras caben en bio de tiktok',
      'contador de caracteres twitter'
    ],
    canonical: 'https://conversordeletrasbonitas.net/contador-de-caracteres-bio/',
    badge: '📊 Herramienta de Precisión para Biografías',
    guideTitle: '¿Cómo Contar Caracteres y Ajustar tu Biografía?',
    guideSteps: [
      { step: '1', title: 'Escribe o Pega tu Texto', text: 'Pega tu biografía, tweet o estado para ver el conteo de caracteres en tiempo real.' },
      { step: '2', title: 'Comprueba los Indicadores de Redes', text: 'Visualiza de inmediato si tu texto excede los límites de Instagram (150), TikTok (80), Twitter (280) o Free Fire (12).' },
      { step: '3', title: 'Copia con 1 Clic', text: 'Una vez ajustado, copia el texto final optimizado para tu perfil.' }
    ],
    faqs: [
      {
        question: '¿Los emojis y fuentes bonitas cuentan como 1 o más caracteres?',
        answer: 'En la mayoría de plataformas (Instagram, TikTok), las letras Unicode estilizadas cuentan como 1 o 2 unidades de código UTF-16, mientras que los emojis complejos pueden ocupar hasta 4 bytes. Nuestro contador desglosa el espacio de referencia que ocupan.'
      },
      {
        question: '¿Cuál es el límite habitual de caracteres en la biografía de Instagram?',
        answer: 'Instagram suele permitir hasta 150 caracteres en la biografía y 30 caracteres en el campo de nombre. Este límite puede cambiar según futuras actualizaciones de la plataforma.'
      }
    ],
    proTips: [
      'Aprovecha el espacio disponible usando letras en negrita en la primera línea para captar la atención.',
      'Los saltos de línea suelen contar como 1 carácter cada uno en Instagram.'
    ]
  },

  'sobre-nosotros': {
    title: 'Sobre Nosotros - Conversor de Letras Bonitas Unicode',
    metaDescription: 'Conoce la metodología, estándares de compatibilidad Unicode y funcionamiento del Conversor de Letras Bonitas.',
    h1: 'Sobre Nosotros y Metodología Tipográfica',
    h2Secondary: 'Compatibilidad Unicode, Metodología y Privacidad del Usuario',
    keywords: [
      'sobre nosotros letras bonitas',
      'metodologia unicode',
      'conversor de letras',
      'compatibilidad tipografica'
    ],
    canonical: 'https://conversordeletrasbonitas.net/sobre-nosotros/',
    badge: '🛡️ Metodología y Transparencia',
    guideTitle: 'Nuestros Pilares de Calidad y Desarrollo',
    guideSteps: [
      { step: '1', title: 'Estándar Unicode ISO/IEC 10646', text: 'Mapeamos alfabetos matemáticos y glifos especiales procurando compatibilidad en iOS, Android y Windows.' },
      { step: '2', title: 'Procesamiento en el Navegador', text: 'El texto introducido en el conversor no se almacena en servidores; la transformación se ejecuta de forma local en tu navegador.' },
      { step: '3', title: 'Actualizaciones Constantes', text: 'Revisamos periódicamente la visualización de glifos en plataformas como Free Fire, Instagram y TikTok para detectar caracteres no soportados o fallos de renderizado.' }
    ],
    faqs: [
      {
        question: '¿Quién mantiene esta herramienta?',
        answer: 'Un proyecto especializado en herramientas web y estándares de tipografía Unicode para la comunidad hispanohablante.'
      }
    ],
    proTips: [
      'Puedes enviarnos sugerencias de nuevos alfabetos a través de nuestro formulario de contacto.'
    ]
  },

  'politica-de-privacidad': {
    title: 'Política de Privacidad - Conversor de Letras Bonitas',
    metaDescription: 'Consulta nuestra política de privacidad, uso de cookies y opciones de protección de datos.',
    h1: 'Política de Privacidad y Protección de Datos',
    h2Secondary: 'Procesamiento Local en el Dispositivo y Transparencia',
    keywords: [
      'politica de privacidad letras bonitas',
      'terminos de uso conversor',
      'seguridad de datos',
      'politica de cookies',
      'privacidad letras bonitas'
    ],
    canonical: 'https://conversordeletrasbonitas.net/politica-de-privacidad/',
    badge: '🔒 Privacidad, Cookies y Datos',
    guideTitle: 'Compromiso de Privacidad y Seguridad',
    guideSteps: [
      { step: '1', title: 'Sin Registro Requerido', text: 'No solicitamos contraseñas, correos electrónicos ni datos de tarjetas para usar el conversor.' },
      { step: '2', title: 'Ejecución Local', text: 'Los algoritmos de conversión ocurren en el navegador de tu propio dispositivo.' },
      { step: '3', title: 'Transparencia', text: 'Esta política explica cómo funciona el procesamiento local, las cookies y los servicios de terceros utilizados por el sitio.' }
    ],
    faqs: [
      {
        question: '¿Se guardan mis textos en alguna base de datos?',
        answer: 'No. El conversor funciona de manera local en el cliente (lado del navegador). El servidor no almacena el contenido de los textos que conviertes.'
      },
      {
        question: '¿Cómo gestiona este sitio las cookies publicitarias de terceros?',
        answer: 'Si el sitio incorpora servicios publicitarios de terceros como Google AdSense, dichos proveedores pueden utilizar cookies de acuerdo con las preferencias de consentimiento del usuario. Puedes aceptar, rechazar o configurar las cookies en cualquier momento desde nuestro banner de consentimiento.'
      }
    ],
    proTips: [
      'Tus fuentes favoritas se guardan únicamente en el almacenamiento local (localStorage) de tu propio dispositivo.'
    ]
  },

  'politica-de-cookies': {
    title: 'Política de Cookies - Conversor de Letras Bonitas (RGPD)',
    metaDescription: 'Información sobre el uso de cookies técnicas y de posibles proveedores publicitarios de terceros, y cómo configurar o revocar tus preferencias.',
    h1: 'Política de Cookies y Consentimiento de Privacidad',
    h2Secondary: 'Transparencia en el Uso de Cookies Propias y de Terceros Conforme a la Directiva ePrivacy',
    keywords: [
      'politica de cookies letras bonitas',
      'cookies google adsense',
      'configurar cookies conversor',
      'aviso de cookies rgpd'
    ],
    canonical: 'https://conversordeletrasbonitas.net/politica-de-cookies/',
    badge: '🍪 Transparencia y Consentimiento de Cookies',
    guideTitle: 'Cómo Gestionamos las Cookies en este Sitio Web',
    guideSteps: [
      { step: '1', title: 'Cookies Técnicas Esenciales', text: 'Permiten la funcionalidad básica del conversor y almacenar localmente tus preferencias.' },
      { step: '2', title: 'Servicios Publicitarios de Terceros', text: 'En caso de incorporarse anuncios, ayudan a sostener la infraestructura para ofrecer un servicio gratuito.' },
      { step: '3', title: 'Control del Usuario', text: 'Puedes modificar o retirar tu consentimiento en cualquier momento desde el panel inferior.' }
    ],
    faqs: [
      {
        question: '¿Cómo funcionan las cookies publicitarias de terceros como DoubleClick?',
        answer: 'En caso de utilizarse servicios publicitarios de Google, estos pueden emplear cookies para publicar anuncios según las visitas de los usuarios en la web. Los usuarios pueden inhabilitar este uso a través de la Configuración de Anuncios de Google o el banner de cookies.'
      },
      {
        question: '¿Puedo revocar mi consentimiento de cookies en cualquier momento?',
        answer: 'Sí. En el pie de página encontrarás el botón "Configurar Cookies" para modificar tus preferencias instantáneamente.'
      }
    ],
    proTips: [
      'Puedes navegar en modo incógnito o bloquear cookies de terceros en tu navegador sin perder la funcionalidad básica de conversión de texto.'
    ]
  },

  'terminos-y-condiciones': {
    title: 'Términos y Condiciones de Uso - Conversor de Letras Bonitas',
    metaDescription: 'Términos de servicio, condiciones de uso legal, propiedad intelectual de fuentes Unicode y exención de responsabilidad de marcas registradas.',
    h1: 'Términos y Condiciones de Uso Legal',
    h2Secondary: 'Normas de Uso Aceptable, Propiedad Intelectual y Exención de Responsabilidad',
    keywords: [
      'terminos y condiciones letras bonitas',
      'terminos de servicio',
      'aviso legal conversor letras',
      'condiciones de uso'
    ],
    canonical: 'https://conversordeletrasbonitas.net/terminos-y-condiciones/',
    badge: '⚖️ Marco Legal y Condiciones de Servicio',
    guideTitle: 'Aspectos Clave de los Términos de Servicio',
    guideSteps: [
      { step: '1', title: 'Uso Gratuito y Personal', text: 'Nuestras utilidades tipográficas están disponibles sin coste alguno para uso personal y creativo en redes sociales.' },
      { step: '2', title: 'Carácter Estándar Unicode', text: 'Los símbolos y alfabetos ofrecidos forman parte de la especificación internacional pública del Consorcio Unicode.' },
      { step: '3', title: 'Independencia de Marcas', text: 'Este sitio es un proyecto independiente y no está afiliado ni patrocinado por Instagram, TikTok, Free Fire o Meta.' }
    ],
    faqs: [
      {
        question: '¿Puedo usar las letras generadas para mi marca comercial o logotipo?',
        answer: 'Sí. Los caracteres Unicode son parte de un estándar internacional universal y puedes utilizarlos libremente en nombres de marca, biografías, perfiles o publicaciones comerciales sin necesidad de licencias de software.'
      },
      {
        question: '¿Existe algún límite en la cantidad de textos que puedo convertir?',
        answer: 'No. El servicio es ilimitado y gratuito para todos los usuarios.'
      }
    ],
    proTips: [
      'Revisa periódicamente estos términos para conocer las actualizaciones legales.'
    ]
  },

  contacto: {
    title: 'Contacto y Soporte - Conversor de Letras Bonitas',
    metaDescription: '¿Tienes dudas, sugerencias o encontraste un símbolo no compatible? Contáctanos y nuestro equipo te responderá rápidamente.',
    h1: 'Contacto, Soporte y Reporte de Glifos',
    h2Secondary: 'Envíanos tus Comentarios, Sugerencias de Fuentes o Solicitudes',
    keywords: [
      'contacto conversor letras bonitas',
      'soporte letras bonitas',
      'reportar error de fuente'
    ],
    canonical: 'https://conversordeletrasbonitas.net/contacto/',
    badge: '📬 Atención y Soporte a la Comunidad',
    guideTitle: 'Canales de Comunicación y Asistencia',
    guideSteps: [
      { step: '1', title: 'Selecciona el Motivo', text: 'Elige entre sugerencia de nueva fuente, reporte de incompatibilidad o consulta general.' },
      { step: '2', title: 'Escribe tu Mensaje', text: 'Indica el modelo de tu dispositivo si estás reportando un error de visualización.' },
      { step: '3', title: 'Respuesta Rápida', text: 'Revisamos periódicamente todos los comentarios para mejorar la plataforma.' }
    ],
    faqs: [
      {
        question: '¿Puedo solicitar una fuente personalizada para mi clan o marca?',
        answer: 'Sí, envíanos el diseño o los símbolos que te gustaría incluir y nuestro equipo evaluará su viabilidad técnica dentro de la especificación Unicode.'
      }
    ],
    proTips: [
      'Si una letra se ve en blanco en tu teléfono, envíanos la versión de tu sistema operativo para investigar la compatibilidad de glifos.'
    ]
  },

  '404': {
    title: '404 - Página no encontrada - Conversor de Letras Bonitas',
    metaDescription: 'La página que buscas no existe o ha sido movida. Explora nuestro conversor de fuentes bonitas para Instagram, Free Fire y WhatsApp.',
    h1: '404 - Página No Encontrada',
    h2Secondary: 'Explora Nuestras Herramientas y Fuentes Disponibles',
    keywords: [
      '404 error letras bonitas',
      'conversor de letras bonitas'
    ],
    canonical: 'https://conversordeletrasbonitas.net/404.html',
    badge: '⚠️ Error de Navegación 404',
    guideTitle: 'Cómo Volver a Navegar',
    guideSteps: [
      { step: '1', title: 'Verifica la URL', text: 'Comprueba que no haya errores tipográficos en el enlace introducido.' },
      { step: '2', title: 'Usa el Buscador', text: 'Escribe el nombre de la herramienta o estilo que deseas utilizar.' },
      { step: '3', title: 'Vuelve al Inicio', text: 'Accede a la biblioteca completa de más de 120 fuentes gratis.' }
    ],
    faqs: [
      {
        question: '¿Por qué aparece este error 404?',
        answer: 'Es posible que el enlace haya expirado, haya sido modificado en una actualización o se haya escrito de forma incompleta.'
      }
    ],
    proTips: [
      'Utiliza la navegación superior o inferior para encontrar la herramienta deseada.'
    ]
  }
};
