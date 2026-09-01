import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { PageRoute, TabCategory, FontGenerator, FavoriteItem } from '../types';
import { ROUTE_CONFIGS } from '../data/routeConfigs';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { FontCard } from './FontCard';
import { CompactFontRow } from './CompactFontRow';
import { QuickActionBar } from './QuickActionBar';
import { QuickPresets } from './QuickPresets';
import { SymbolQuickRibbon } from './SymbolQuickRibbon';
import { ScenarioShortcutGrid } from './ScenarioShortcutGrid';
import { TrendingFontsBanner } from './TrendingFontsBanner';
import { FaqSection } from './FaqSection';
import { LivePreviewSimulator } from './LivePreviewSimulator';
import { QuickDecoratorPicker } from './QuickDecoratorPicker';
import { FavoritesSection } from './FavoritesSection';
import { Eye, CheckSquare, Square, Download, AlertTriangle, RefreshCw, Volume2 } from 'lucide-react';
import { PlatformLimits } from './PlatformLimits';
import { BatchCopyModal } from './BatchCopyModal';
import { VisualComparator } from './VisualComparator';
import { TextImageExportModal } from './TextImageExportModal';
import { PosterGeneratorModal } from './PosterGeneratorModal';
import { StyleMixerModal } from './StyleMixerModal';
import { UnicodeFixerModal } from './UnicodeFixerModal';
import { ShareModal } from './ShareModal';
import { AlphabetReferenceTable } from './AlphabetReferenceTable';
import { MagicNickGenerator } from './MagicNickGenerator';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Instagram, 
  MessageCircle, 
  ChevronDown, 
  Filter,
  Wand2,
  Zap,
  SlidersHorizontal,
  Copy,
  Columns2,
  Dices,
  Image as ImageIcon,
  LayoutList,
  Grid,
  ArrowUp,
  X,
  Check,
  History,
  Share2,
  Link2
} from 'lucide-react';

interface FontConverterProps {
  currentRoute: PageRoute;
  favorites: FavoriteItem[];
  initialText?: string;
  onToggleFavorite: (generator: FontGenerator, result: string) => void;
  onPreview: (resultText: string, fontName: string) => void;
  onTextChange?: (text: string) => void;
}

const POPULAR_WORD_PILLS = [
  { label: '🔥 Amor', text: 'Mi amor eterno ♥' },
  { label: '🎂 Cumpleaños', text: '¡Feliz Cumpleaños! 🎂✨' },
  { label: '✨ Aesthetic', text: 'Aesthetic Girl ｡･:*:･ﾟ★' },
  { label: '亗 Rey Insano', text: 'Rey Insano 亗 999' },
  { label: '👑 Queen', text: 'Princess Queen ♛' },
  { label: '🖤 Dark Vibes', text: 'Dark Angel 𝔖𝔬𝔲𝔩' },
  { label: '🌸 Dulzura', text: 'Dulce Caramelo ʚɞ' },
  { label: '🎮 Gamer Pro', text: '꧁༺ PRO GAMER ༻꧂' },
  { label: '☀️ Buenos Días', text: 'Buenos días con amor ☕' },
  { label: '💼 Negocios', text: 'Emprendedor & Éxito' },
  { label: '⚡ Streamer', text: 'Streamer Official ⚡' },
  { label: '🎵 Música', text: 'Viviendo en melodías 🎧' },
];

export const FontConverter: React.FC<FontConverterProps> = ({
  currentRoute,
  favorites,
  initialText = 'Letras Bonitas',
  onToggleFavorite,
  onPreview,
  onTextChange: notifyParentTextChange,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const deferredInputText = useDeferredValue(inputText);
  const [activeCategory, setActiveCategory] = useState<TabCategory>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [viewMode, setViewMode] = useState<'compact' | 'grid'>('grid');
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const [selectedFontIds, setSelectedFontIds] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [batchCopied, setBatchCopied] = useState<boolean>(false);
  const [lastDeletedText, setLastDeletedText] = useState<string | null>(null);

  const [batchModalOpen, setBatchModalOpen] = useState<boolean>(false);
  const [comparatorOpen, setComparatorOpen] = useState<boolean>(false);
  const [mixerOpen, setMixerOpen] = useState<boolean>(false);
  const [fixerModalOpen, setFixerModalOpen] = useState<boolean>(false);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState<boolean>(false);
  const [posterModalOpen, setPosterModalOpen] = useState<boolean>(false);
  const [imageExportData, setImageExportData] = useState<{ text: string; fontName: string } | null>(null);
  const [shareModalData, setShareModalData] = useState<{ text: string; fontName?: string } | null>(null);

  // Detect Spanish accents and special characters in input
  const hasAccentsOrSpecialChars = useMemo(() => {
    return /[áéíóúÁÉÍÓÚñÑüÜ¿¡]/.test(inputText);
  }, [inputText]);

  // Scroll listener for sticky floating input bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync initialText if parent changes it
  useEffect(() => {
    if (initialText && initialText !== inputText) {
      setInputText(initialText);
    }
  }, [initialText]);

  // Sync route changes to active tab category & smart default text
  useEffect(() => {
    if (currentRoute === 'cursiva') setActiveCategory('cursiva');
    else if (currentRoute === 'goticas') setActiveCategory('gotica');
    else if (currentRoute === 'free-fire') setActiveCategory('free-fire');
    else if (currentRoute === 'invertidas') setActiveCategory('invertidas');
    else if (currentRoute === 'circulos') setActiveCategory('circulos');
    else if (currentRoute === 'glitch') setActiveCategory('glitch');
    else if (currentRoute === 'facebook') setActiveCategory('bold');
    else if (currentRoute === 'inicio' || currentRoute === 'instagram' || currentRoute === 'tiktok' || currentRoute === 'whatsapp') {
      setActiveCategory('todas');
    }

    // Sync default scenario text if text is unedited
    const routeDefault = ROUTE_CONFIGS[currentRoute]?.defaultText;
    if (routeDefault) {
      const knownDefaults = Object.values(ROUTE_CONFIGS).map((r) => r.defaultText).concat(['Letras Bonitas', '']);
      if (knownDefaults.includes(inputText)) {
        setInputText(routeDefault);
        if (notifyParentTextChange) notifyParentTextChange(routeDefault);
      }
    }
  }, [currentRoute]);

  const handleTextChange = (text: string) => {
    setInputText(text);
    if (notifyParentTextChange) notifyParentTextChange(text);
  };

  const handleCopyShareLink = async () => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://conversordeletrasbonitas.net';
      const pathname = ROUTE_CONFIGS[currentRoute]?.path || '/';
      const shareUrl = `${origin}${pathname}?text=${encodeURIComponent(inputText || 'Letras Bonitas')}`;
      
      await navigator.clipboard.writeText(shareUrl);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(35);
        } catch {}
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('font-copied', {
            detail: { text: shareUrl, fontName: 'Enlace personalizado copiado' },
          })
        );
      }
    } catch (e) {
      console.warn('Share link copy failed', e);
    }
  };

  const handleClear = () => {
    if (inputText.trim()) {
      setLastDeletedText(inputText);
    }
    handleTextChange('');
  };

  const handleUndoClear = () => {
    if (lastDeletedText) {
      handleTextChange(lastDeletedText);
      setLastDeletedText(null);
    }
  };

  // Keyboard shortcut support (Ctrl/Cmd + K to focus input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const inputEl = document.getElementById('main-font-input');
        if (inputEl) {
          inputEl.focus();
          window.scrollTo({ top: inputEl.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) handleTextChange(text);
    } catch (e) {
      console.warn('Clipboard read unavailable', e);
    }
  };

  const handleNormalizeAccents = () => {
    const normalized = inputText
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/Ñ/g, 'N');
    handleTextChange(normalized);
  };

  const sampleTexts = [
    'Mi Biografía Aesthetic ✨',
    '꧁༺ PRO GAMER ༻꧂',
    '亗 𝑹𝑬𝒀 𝑰𝑵𝑺𝑨𝑵𝑶 亗',
    '𝓥𝓲𝓿𝓮, 𝓼𝓾𝓮ñ𝓪, 𝓿𝓲𝓪𝓳𝓪 ✨',
    'ʚ 𝒟𝓊𝓁𝒸𝑒 𝒫𝓇𝒾𝓃𝒸𝑒𝓈𝒶 ɞ',
    '👑 Queen of Instagram ♛',
    'ᴮᴼˢˢ★ Clan Legendario ⚡',
    '•─ 𝒯𝓊 𝓎 𝒴ℴ 𝓅𝒶𝓇𝒶 𝓈𝒾𝑒𝓂𝓅𝓇𝑒 ♡ ─•',
    '✧ 𝐿𝓊𝓏 𝒹𝑒 𝓂𝒾 𝓋𝒾𝒹𝒶 ✧',
    '☠ 𝕯𝖆𝖗𝖐 𝕾𝖔𝖚𝖑 ☠',
    '✦ 𝔸𝕖𝕤𝕥𝕙𝕖𝕥𝕚𝕔 𝔾𝕚𝕣𝕝 ✦',
    '⚡ 𝓝𝓲𝓷𝓳𝓪 𝓕𝓻𝓮𝓮 𝓕𝓲𝓻𝓮 ⚡',
  ];

  const SURPRISE_WRAPPERS = [
    (t: string) => `꧁༺ ${t} ༻꧂`,
    (t: string) => `亗 ${t} 亗`,
    (t: string) => `★彡 ${t} 彡★`,
    (t: string) => `ʚ ${t} ɞ ✧`,
    (t: string) => `👑 ${t} ♛`,
    (t: string) => `•─ ${t} ♡ ─•`,
    (t: string) => `✧*。${t} ｡:*✧`,
    (t: string) => `⚔ 𝕷𝖊𝖌𝖊𝖓𝖉 • ${t} ⚔`,
    (t: string) => `« ${t} » ⚡`,
  ];

  const handleRandomExample = () => {
    // If input is non-empty and not a default greeting, apply a random high-quality decorator frame
    if (inputText && inputText.length > 2 && !sampleTexts.includes(inputText)) {
      const clean = inputText.replace(/[꧁༺༻꧂亗★彡ʚɞ✧👑♛•─♡*。⚔«»⚡]/g, '').trim();
      const wrap = SURPRISE_WRAPPERS[Math.floor(Math.random() * SURPRISE_WRAPPERS.length)];
      handleTextChange(wrap(clean || inputText));
    } else {
      const random = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      handleTextChange(random);
    }
  };

  // Filtered fonts based on category and search query with accent-insensitive fuzzy matching
  const filteredFonts = useMemo(() => {
    // Normalization helper for search: removes accents and diacritics
    const normalizeStr = (s: string) =>
      s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    let list = FONT_GENERATORS.filter((font) => {
      if (showOnlyFavorites) {
        return favorites.some((fav) => fav.fontName === font.name || fav.id === font.id);
      }
      if (activeCategory !== 'todas' && font.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const qNorm = normalizeStr(searchQuery.trim());
        const nameNorm = normalizeStr(font.name);
        const tagsNorm = font.tags.map((t) => normalizeStr(t));
        const sampleNorm = normalizeStr(font.transform(inputText || 'Test'));
        
        const matchesName = nameNorm.includes(qNorm);
        const matchesTags = tagsNorm.some((t) => t.includes(qNorm));
        const matchesSample = sampleNorm.includes(qNorm);
        return matchesName || matchesTags || matchesSample;
      }
      return true;
    });

    if (!showOnlyFavorites && activeCategory === 'todas' && !searchQuery.trim()) {
      if (currentRoute === 'instagram') {
        list = [...list].sort((a, b) => {
          const aMatch = a.tags.some(t => ['instagram', 'aesthetic', 'cursiva', 'bio'].includes(t.toLowerCase())) ? 1 : 0;
          const bMatch = b.tags.some(t => ['instagram', 'aesthetic', 'cursiva', 'bio'].includes(t.toLowerCase())) ? 1 : 0;
          return bMatch - aMatch;
        });
      } else if (currentRoute === 'free-fire') {
        list = [...list].sort((a, b) => {
          const aMatch = a.tags.some(t => ['free fire', 'gamer', 'alas', 'nick', 'smallcaps'].includes(t.toLowerCase())) ? 1 : 0;
          const bMatch = b.tags.some(t => ['free fire', 'gamer', 'alas', 'nick', 'smallcaps'].includes(t.toLowerCase())) ? 1 : 0;
          return bMatch - aMatch;
        });
      } else if (currentRoute === 'whatsapp') {
        list = [...list].sort((a, b) => {
          const aMatch = a.tags.some(t => ['whatsapp', 'negrita', 'bold', 'universal'].includes(t.toLowerCase())) ? 1 : 0;
          const bMatch = b.tags.some(t => ['whatsapp', 'negrita', 'bold', 'universal'].includes(t.toLowerCase())) ? 1 : 0;
          return bMatch - aMatch;
        });
      } else if (currentRoute === 'tiktok') {
        list = [...list].sort((a, b) => {
          const aMatch = a.tags.some(t => ['tiktok', 'aesthetic', 'cute', 'viral'].includes(t.toLowerCase())) ? 1 : 0;
          const bMatch = b.tags.some(t => ['tiktok', 'aesthetic', 'cute', 'viral'].includes(t.toLowerCase())) ? 1 : 0;
          return bMatch - aMatch;
        });
      }
    }

    return list;
  }, [activeCategory, searchQuery, inputText, currentRoute, showOnlyFavorites, favorites]);

  // Compute total fonts count per category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todas: FONT_GENERATORS.length };
    FONT_GENERATORS.forEach((font) => {
      counts[font.category] = (counts[font.category] || 0) + 1;
    });
    return counts;
  }, []);

  const visibleFonts = useMemo(() => {
    return filteredFonts.slice(0, visibleCount);
  }, [filteredFonts, visibleCount]);

  const hasMore = visibleCount < filteredFonts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 24);
  };

  // Multi-select batch handlers
  const handleToggleSelect = (generatorId: string) => {
    setSelectedFontIds((prev) =>
      prev.includes(generatorId)
        ? prev.filter((id) => id !== generatorId)
        : [...prev, generatorId]
    );
  };

  const handleSelectAllVisible = () => {
    if (selectedFontIds.length === visibleFonts.length) {
      setSelectedFontIds([]);
    } else {
      setSelectedFontIds(visibleFonts.map((f) => f.id));
    }
  };

  const handleBatchCopySelected = async (withFontNames = false) => {
    const selectedGens = FONT_GENERATORS.filter((g) => selectedFontIds.includes(g.id));
    if (selectedGens.length === 0) return;

    const textToCopy = selectedGens
      .map((g) => {
        const transformed = g.transform(inputText || 'Letras Bonitas');
        return withFontNames ? `[${g.name}]\n${transformed}` : transformed;
      })
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(textToCopy);
      setBatchCopied(true);

      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 50, 40]);
        } catch {}
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('font-copied', {
            detail: {
              text: textToCopy,
              fontName: `${selectedGens.length} Fuentes Seleccionadas`,
            },
          })
        );
      }

      setTimeout(() => setBatchCopied(false), 2500);
    } catch (e) {
      console.error('Failed to batch copy', e);
    }
  };

  const handleExportBatchTextFile = () => {
    const selectedGens = FONT_GENERATORS.filter((g) => selectedFontIds.includes(g.id));
    if (selectedGens.length === 0) return;

    const content = selectedGens
      .map((g) => `=== ${g.name} ===\n${g.transform(inputText || 'Letras Bonitas')}`)
      .join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `letras-bonitas-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // SEO Page Headings and dynamic subtitles based on Silo Route
  const routeHeaders: Record<
    PageRoute,
    { title: string; subtitle: string; icon: React.ReactNode; badge: string; gradient: string }
  > = {
    inicio: {
      title: 'Conversor de Letras Bonitas y Fuentes para Copiar y Pegar',
      subtitle: 'Bienvenido al Conversor de Letras Bonitas online: transforma cualquier texto en más de 80 fuentes de letras bonitas, cursivas y nicks gamer para copiar y pegar con un solo clic.',
      icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
      badge: 'Conversor de Letras Bonitas · 80+ Fuentes',
      gradient: 'from-indigo-600 to-violet-600',
    },
    instagram: {
      title: 'Letras Bonitas para Instagram (Bio, Stories y Posts)',
      subtitle: 'Convierte tus frases y nombres en tipografías elegantes, cursivas y llamativas para destacar tu perfil de Instagram.',
      icon: <Instagram className="w-4 h-4 text-pink-500" />,
      badge: 'Optimizado para IG Bio',
      gradient: 'from-pink-600 to-rose-600',
    },
    tiktok: {
      title: 'Letras Bonitas para TikTok - Nombres y Biografías Aesthetic',
      subtitle: 'Tipografías virales, nicks decorados y letras aesthetic para nombres de usuario y descripciones de TikTok.',
      icon: <span className="font-black text-xs text-slate-900">TT</span>,
      badge: 'Viral en TikTok',
      gradient: 'from-slate-900 to-indigo-900',
    },
    whatsapp: {
      title: 'Fuentes y Letras para WhatsApp (Estados, Nombres y Chats)',
      subtitle: 'Pon letras en negrita, cursiva, tachado, invertidas y círculos en tus mensajes de WhatsApp sin instalar apps.',
      icon: <MessageCircle className="w-4 h-4 text-emerald-500" />,
      badge: 'Compatible WhatsApp',
      gradient: 'from-emerald-600 to-teal-600',
    },
    facebook: {
      title: 'Letras Bonitas para Facebook - Negritas, Cursivas y Posts',
      subtitle: 'Destaca tus estados, publicaciones de grupos y comentarios de Facebook con fuentes en negrita, cursiva y decoradas.',
      icon: <span className="font-black text-xs text-blue-600">f</span>,
      badge: 'Optimizado Facebook',
      gradient: 'from-blue-600 to-indigo-700',
    },
    'letras-chidas': {
      title: 'Letras Chidas para Copiar y Pegar (Nicks, TikTok y Free Fire)',
      subtitle: 'Generador número 1 de letras chidas, fuentes aesthetic, nicks insanos con alas y tipografías perronas para México y LATAM.',
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      badge: '🇲🇽 Top Letras Chidas',
      gradient: 'from-amber-600 via-orange-600 to-red-600',
    },
    'letras-elegantes': {
      title: 'Letras Elegantes para Copiar y Pegar (Caligrafía y Cursiva)',
      subtitle: 'Tipografías finas, manuscritas de lujo, firmas digitales y letras script elegantes para perfiles y dedicatorias.',
      icon: <span className="font-serif italic font-bold text-indigo-600">𝓔</span>,
      badge: '💎 Tipografía Fina',
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    },
    'letras-raras': {
      title: 'Letras Raras y Símbolos Extraños para Copiar y Pegar',
      subtitle: 'Caracteres Unicode ocultos, alfabetos estilo oriental, glitch zalgo, textos al revés y símbolos misteriosos.',
      icon: <span className="font-bold text-xs text-purple-600">尺</span>,
      badge: '🔮 Glifos Exóticos',
      gradient: 'from-purple-700 via-indigo-900 to-slate-900',
    },
    'letras-tatuajes': {
      title: 'Letras para Tatuajes (Góticas, Cursivas & Números Romanos)',
      subtitle: 'Simulador de tipografías tattoo, caligrafía fina para antebrazo, costillas y números romanos para fechas especiales.',
      icon: <span className="font-serif font-bold text-xs text-amber-600">💉</span>,
      badge: '💉 Especial Tatuajes',
      gradient: 'from-stone-900 via-stone-800 to-amber-900',
    },
    'nicks-free-fire': {
      title: 'Generador de Nicks para Free Fire (Alas, Insanos & ⓥ)',
      subtitle: 'Crea nombres con alas ꧁༺ ༻꧂, coronas de rey 亗, V de verificado ⓥ y el espacio invisible [ㅤ] para Free Fire.',
      icon: <Flame className="w-4 h-4 text-red-500" />,
      badge: '🔥 Top 1 Nicks Gamer',
      gradient: 'from-red-600 via-orange-600 to-amber-600',
    },
    'letras-chinas': {
      title: 'Letras Chinas y Japonesas Kanji Simuladas (Copiar y Pegar)',
      subtitle: 'Transforma cualquier texto a caracteres orientales simulados (尺卂尺ㄖ), katakana anime y kanji auténticos (愛, 龍, 侍).',
      icon: <span className="font-bold text-xs text-rose-600">漢</span>,
      badge: '🏮 Alfabetos Orientales',
      gradient: 'from-rose-700 via-red-800 to-slate-900',
    },
    'espacio-invisible': {
      title: 'Espacio Invisible y Letra Invisible [ㅤ] para Copiar y Pegar',
      subtitle: 'Copia el espacio en blanco invisible (Hangul Filler U+3164) para Free Fire, WhatsApp, TikTok e Instagram.',
      icon: <span className="font-bold text-xs text-indigo-400">👻</span>,
      badge: '👻 U+3164 Invisible',
      gradient: 'from-indigo-900 via-slate-900 to-slate-950',
    },
    'nombres-parejas': {
      title: 'Generador de Nombres para Parejas y Dúos (Matching Nicks)',
      subtitle: 'Nicks combinados para novios, dúos tóxicos de Free Fire, coronas de rey/reina y perfiles aesthetic.',
      icon: <span className="text-xs text-rose-400">♡</span>,
      badge: '💑 Dúos Goals',
      gradient: 'from-rose-900 via-pink-950 to-slate-950',
    },
    'abecedario': {
      title: 'Abecedario de Letras Bonitas (A-Z Completo)',
      subtitle: 'Catálogo de todas las letras del abecedario mayúsculas y minúsculas en cursiva, gótica, círculos y tatuajes.',
      icon: <span className="font-bold text-xs text-amber-400">A-Z</span>,
      badge: '📖 Directorio Maestro A-Z',
      gradient: 'from-amber-800 via-stone-900 to-slate-900',
    },
    'free-fire': {
      title: 'Conversor de Letras para Free Fire - Nicks con Alas y Símbolos',
      subtitle: 'Genera nombres insanos para Free Fire con alas ꧁༺ ༻꧂, coronas de rey 亗, espadas ⚔️ y el espacio invisible [ㅤ].',
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      badge: 'Top Nicks FF',
      gradient: 'from-amber-600 to-orange-600',
    },
    cursiva: {
      title: 'Traductor de Letras Cursivas Online (Script & Manuscrita)',
      subtitle: 'Convierte cualquier texto normal a letra cursiva elegante (𝓒𝓾𝓻𝓼𝓲𝓿𝓪, 𝒮𝒸𝓇𝒾𝓅𝓉, 𝐼𝓉𝒶𝓁𝒾𝒸) para copiar y pegar.',
      icon: <span className="font-serif italic font-bold text-indigo-600">𝒯</span>,
      badge: 'Letra Cursiva Pura',
      gradient: 'from-indigo-600 to-purple-600',
    },
    goticas: {
      title: 'Letras Góticas para Copiar y Pegar (Old English & Fraktur)',
      subtitle: 'Generador de tipografía gótica medieval (𝔊ó𝔱𝔦𝔠𝔞, 𝕲ó𝖙𝖎𝖈𝖆 𝕭𝖔𝖑𝖉) para nombres dark, tatuajes y gamertags.',
      icon: <span className="font-serif font-bold text-slate-900">𝔊</span>,
      badge: 'Estilo Medieval',
      gradient: 'from-slate-900 to-zinc-800',
    },
    invertidas: {
      title: 'Letras Invertidas, Texto al Revés y Letras Tachadas',
      subtitle: 'Herramienta para voltear texto de cabeza (ɐpıʇɹǝʌuI), escribir en espejo y generar letras tachadas (t̶e̶x̶t̶o̶).',
      icon: <span className="font-mono font-bold text-indigo-600">ɐ</span>,
      badge: 'Inversor Online',
      gradient: 'from-indigo-600 to-blue-600',
    },
    circulos: {
      title: 'Letras en Círculos y Cuadros - Fuentes Burbuja Online',
      subtitle: 'Escribe letras encerradas en círculos negros 🅒🄸🅁, círculos blancos ⒸⒾⓇ y cajas cuadradas 🄲🅄🄰🄳🅁🄾🅂.',
      icon: <span className="font-bold text-xs text-indigo-600">🅒</span>,
      badge: 'Burbujas & Cuadros',
      gradient: 'from-indigo-600 to-cyan-600',
    },
    glitch: {
      title: 'Letras Glitch y Zalgo - Generador de Texto Maldito',
      subtitle: 'Crea textos tenebrosos y terroríficos con efectos glitch, corruptos y distorsión zalgo demoníaca (Z̷a̷l̷g̸o̸).',
      icon: <span className="font-mono font-bold text-rose-600">Z̶</span>,
      badge: 'Glitch / Zalgo',
      gradient: 'from-rose-700 to-slate-900',
    },
    simbolos: {
      title: 'Biblioteca de Símbolos, Emojis y Caracteres Especiales',
      subtitle: 'Más de 200 símbolos de alas, coronas, armas, corazones, flores y kaomojis listos para copiar con 1 clic.',
      icon: <Sparkles className="w-4 h-4 text-violet-600" />,
      badge: 'Catálogo de Símbolos',
      gradient: 'from-violet-600 to-fuchsia-600',
    },
    decorador: {
      title: 'Decorador de Textos y Creador de Nicks Personalizados',
      subtitle: 'Personaliza marcos a la izquierda y derecha, elige la tipografía central y crea tu propio gamertag legendario.',
      icon: <Wand2 className="w-4 h-4 text-amber-600" />,
      badge: 'Creador de Nicks',
      gradient: 'from-amber-600 to-pink-600',
    },
    'contador-bio': {
      title: 'Contador de Caracteres para Biografía de Instagram y TikTok',
      subtitle: 'Calcula caracteres y palabras en tiempo real verificando los límites exactos de biografía de Instagram (150), TikTok (80) y Twitter (280).',
      icon: <span className="font-mono font-bold text-xs text-indigo-600">#150</span>,
      badge: 'Contador de Biografía',
      gradient: 'from-indigo-600 to-pink-600',
    },
    'sobre-nosotros': {
      title: 'Sobre Nosotros - Conversor de Letras Bonitas E-E-A-T',
      subtitle: 'Conoce nuestro equipo, metodología de compatibilidad Unicode y estándares de desarrollo de tipografías.',
      icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
      badge: 'Sobre Nosotros',
      gradient: 'from-indigo-600 to-slate-900',
    },
    'politica-de-privacidad': {
      title: 'Política de Privacidad y Procesamiento Seguro',
      subtitle: 'Garantía de procesamiento 100% en cliente. Cero almacenamiento o recolección de tus textos en servidores.',
      icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
      badge: 'Privacidad Garantizada',
      gradient: 'from-emerald-600 to-slate-900',
    },
    'politica-de-cookies': {
      title: 'Política de Cookies y Configuración de Privacidad',
      subtitle: 'Transparencia total sobre el uso de cookies propias y cookies de Google AdSense / DoubleClick según RGPD y ePrivacy.',
      icon: <Sparkles className="w-4 h-4 text-amber-600" />,
      badge: 'Consentimiento de Cookies',
      gradient: 'from-amber-600 to-slate-900',
    },
    'terminos-y-condiciones': {
      title: 'Términos y Condiciones de Uso Legal',
      subtitle: 'Condiciones de servicio, normas de uso aceptable, propiedad intelectual Unicode y exención de responsabilidad de marcas.',
      icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
      badge: 'Aviso Legal',
      gradient: 'from-indigo-600 to-slate-900',
    },
    contacto: {
      title: 'Contacto, Soporte y Solicitud de Fuentes',
      subtitle: 'Envíanos tus dudas, solicitudes de nuevos estilos de letras o reporte de problemas en tu dispositivo.',
      icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
      badge: 'Soporte y Contacto',
      gradient: 'from-indigo-600 to-blue-600',
    },
    '404': {
      title: '404 - Página No Encontrada',
      subtitle: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
      icon: <Sparkles className="w-4 h-4 text-rose-600" />,
      badge: 'Error 404',
      gradient: 'from-rose-600 to-slate-900',
    },
  };

  const headerInfo = routeHeaders[currentRoute] || routeHeaders.inicio;

  const categories: { id: TabCategory; label: string; sample: string; count?: number }[] = [
    { id: 'todas', label: 'Todas', sample: 'Todas las Fuentes' },
    { id: 'cursiva', label: 'Cursivas', sample: '𝓒𝓾𝓻𝓼𝓲𝓿𝓪' },
    { id: 'gotica', label: 'Góticas', sample: '𝔊ó𝔱𝔦𝔠𝔞' },
    { id: 'free-fire', label: 'Free Fire', sample: '꧁Alas FF꧂' },
    { id: 'bold', label: 'Negritas', sample: '𝗕𝗼𝗹𝗱 Sans' },
    { id: 'circulos', label: 'Círculos', sample: '🅒🄸🅁' },
    { id: 'invertidas', label: 'Invertidas', sample: 'ɐpıʇɹǝʌuI' },
    { id: 'aesthetic', label: 'Aesthetic', sample: '｡･:*:･ﾟ★' },
    { id: 'smallcaps', label: 'Small Caps', sample: 'sᴍᴀʟʟ' },
    { id: 'glitch', label: 'Glitch / Zalgo', sample: '̵Z̴a̶l̶g̷o' },
  ];

  return (
    <div id="conversor-principal">
      {/* 1. HERO SECTION */}
      <section className="relative text-center pt-6 sm:pt-10 pb-6 sm:pb-8 max-w-4xl mx-auto px-2">
        {/* Soft Ambient Background Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/70 text-indigo-700 text-xs font-bold shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            {headerInfo.icon}
            <span>{headerInfo.badge}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs">
            <span>⚡</span>
            <span>100% Offline & Privado (Sin descargas)</span>
          </div>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          {headerInfo.title.split(' - ')[0]}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto mt-3.5 leading-relaxed font-normal">
          {headerInfo.subtitle}
        </p>

        {/* Quick Testing Viral Word Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mt-5 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Prueba rápida:
          </span>
          {POPULAR_WORD_PILLS.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => handleTextChange(pill.text)}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 border border-slate-200/80 text-slate-700 transition-all active:scale-95 shadow-2xs"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. SCENARIO SHORTCUT GRID */}
      <ScenarioShortcutGrid
        currentRoute={currentRoute}
        onRouteChange={(route) => {
          if (notifyParentTextChange) {
            const defText = ROUTE_CONFIGS[route]?.defaultText;
            if (defText) notifyParentTextChange(defText);
          }
          window.location.hash = `#/${route === 'inicio' ? '' : route}`;
        }}
      />

      {/* 3. TEXT INPUT WORKBENCH CARD */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-[0_12px_35px_-12px_rgba(79,70,229,0.08)] mb-8 relative transition-all">
        {/* Top bar of workbench */}
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="main-text-input"
            className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Escribe o Pega tu Texto en el Conversor de Letras Bonitas:</span>
          </label>

          {/* Real-time letter & word counters + TTS reader */}
          <div className="flex items-center gap-2">
            {inputText && (
              <button
                type="button"
                id="btn-speak-main-text"
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utter = new SpeechSynthesisUtterance(inputText);
                    utter.lang = 'es-ES';
                    window.speechSynthesis.speak(utter);
                  }
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-200 transition-colors"
                title="Escuchar texto por voz (Pronunciación en Español)"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Escuchar</span>
              </button>
            )}

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60">
              <span>
                <strong className="text-slate-900 font-extrabold">{Array.from(inputText).length}</strong> {Array.from(inputText).length === 1 ? 'letra' : 'letras'}
              </span>
              <span className="text-slate-300">•</span>
              <span>
                <strong className="text-slate-900 font-extrabold">{inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</strong> palabras
              </span>
            </div>
          </div>
        </div>

        {/* Large Textarea Box */}
        <div className="relative mb-3.5">
          <textarea
            id="main-text-input"
            rows={3}
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Escribe aquí en el Conversor de Letras Bonitas tu frase, nombre para Instagram, nick de Free Fire o estado de WhatsApp..."
            className="w-full px-4 sm:px-5 py-3.5 text-lg sm:text-xl rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-y font-medium leading-relaxed"
          />
        </div>

        {/* Spanish Accent & Special Character Compatibility Banner */}
        {hasAccentsOrSpecialChars && (
          <div className="mb-3.5 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-2 flex-wrap text-xs text-amber-900">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Acentos o "ñ" detectados:</strong> Algunas fuentes Unicode decorativas no tienen versión con tilde.
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleNormalizeAccents}
                className="px-2.5 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold rounded-lg transition-colors flex items-center gap-1"
                title="Quita tildes para máxima compatibilidad con todos los glifos"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Normalizar (Sin Tildes)</span>
              </button>
              <button
                type="button"
                onClick={() => setFixerModalOpen(true)}
                className="px-2.5 py-1 bg-white border border-amber-300 hover:bg-amber-100 font-bold text-amber-900 rounded-lg transition-colors"
              >
                Ver Reparador
              </button>
            </div>
          </div>
        )}

        {/* Quick trend preset chips */}
        <div className="mb-3.5">
          <QuickPresets 
            onSelectPreset={handleTextChange} 
            currentText={inputText} 
            currentRoute={currentRoute}
          />
        </div>

        {/* Quick Decorator Picker Strip (1-Click Frame Wrapper) */}
        <div className="mb-3.5">
          <QuickDecoratorPicker
            currentText={inputText}
            onApplyDecoration={(decText) => handleTextChange(decText)}
          />
        </div>

        {/* Quick Symbol Picker Ribbon */}
        <div className="mb-3.5">
          <SymbolQuickRibbon
            onInsertSymbol={(sym) => {
              handleTextChange(inputText + sym);
            }}
          />
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <QuickActionBar
            text={inputText}
            onTextChange={handleTextChange}
            onClear={handleClear}
            onPaste={handlePaste}
            onRandomExample={handleRandomExample}
            onOpenFixerModal={() => setFixerModalOpen(true)}
            onOpenImageExport={() => setPosterModalOpen(true)}
            onOpenShareModal={() => setShareModalData({ text: inputText || 'Letras Bonitas' })}
            lastDeletedText={lastDeletedText}
            onUndoClear={handleUndoClear}
          />

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-bold text-xs shadow-2xs hover:scale-[1.02] active:scale-95 transition-all"
              title="Copiar enlace directo con este texto para compartir en WhatsApp, bio o redes"
            >
              <Link2 className="w-4 h-4 text-indigo-600" />
              <span>Compartir Enlace</span>
            </button>

            <button
              type="button"
              onClick={() => setPosterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
              title="Crear imagen PNG con diseño para Instagram Stories y Estados de WhatsApp"
            >
              <ImageIcon className="w-4 h-4 text-pink-400" />
              <span>Crear Imagen HD (PNG)</span>
            </button>

            <button
              type="button"
              onClick={() => setSimulatorModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-black text-xs shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Eye className="w-4 h-4 animate-pulse" />
              <span>👁️ Ver Vista Previa Real (IG / FF)</span>
            </button>
          </div>
        </div>

        {/* Platform Character Limits Bar */}
        <PlatformLimits text={inputText} />
      </section>

      {/* 2.5 1-CLIC MAGIC NICK GENERATOR & VIRAL WRAPPERS */}
      <MagicNickGenerator
        currentText={inputText}
        onApplyText={handleTextChange}
      />

      {/* 3. FILTER TABS & SEARCH BAR & CONTROLS STRIP */}
      <section className="mb-6 space-y-3.5">
        {/* Tier 1: Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id];
            return (
              <button
                key={cat.id}
                id={`tab-category-${cat.id}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(24);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15'
                    : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/90 shadow-2xs'
                }`}
              >
                <span>{cat.sample}</span>
                {count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive
                        ? 'bg-indigo-500/30 text-indigo-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tier 2: Search Bar & View Controls & Utility Modals */}
        <div className="flex items-center justify-between gap-3 flex-wrap bg-white/90 backdrop-blur-xs p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="font-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el Conversor de Letras Bonitas (ej: cursiva, gotica, alas)..."
              className="w-full pl-10 pr-8 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Style Tag Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold no-scrollbar py-0.5">
            {favorites.length > 0 && (
              <button
                type="button"
                id="btn-filter-favorites"
                onClick={() => {
                  setShowOnlyFavorites(!showOnlyFavorites);
                  setVisibleCount(24);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-black shrink-0 ${
                  showOnlyFavorites
                    ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                    : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                }`}
                title="Mostrar únicamente las fuentes que has guardado en favoritos"
              >
                <span>⭐ Favoritas</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${showOnlyFavorites ? 'bg-amber-700 text-white' : 'bg-amber-200/80 text-amber-900'}`}>
                  {favorites.length}
                </span>
              </button>
            )}

            {[
              { label: '𝓒ursivas', q: 'cursiva' },
              { label: '𝕲óticas', q: 'gotica' },
              { label: '👑 Alas/Nick', q: 'alas' },
              { label: '🅒írculos', q: 'circulo' },
              { label: '⚡ Insano', q: 'insano' },
              { label: '━ Rayado', q: 'tachado' },
              { label: '🔄 Invertido', q: 'invertida' },
            ].map((tag) => (
              <button
                key={tag.q}
                type="button"
                onClick={() => {
                  setShowOnlyFavorites(false);
                  setSearchQuery(searchQuery === tag.q ? '' : tag.q);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 ${
                  searchQuery.toLowerCase().includes(tag.q)
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* View mode toggle (Compact vs Grid) & Font zoom */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Multi-select select-all toggle button */}
            <button
              type="button"
              onClick={handleSelectAllVisible}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedFontIds.length > 0
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Seleccionar todas las fuentes visibles para copiar en lote"
            >
              {selectedFontIds.length === visibleFonts.length && visibleFonts.length > 0 ? (
                <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>
                {selectedFontIds.length > 0 ? `${selectedFontIds.length} Sel.` : 'Multi-Copiar'}
              </span>
            </button>

            {/* View layout mode */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
              <button
                type="button"
                id="btn-view-compact"
                onClick={() => setViewMode('compact')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'compact'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Vista Lista Compacta"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Lista</span>
              </button>

              <button
                type="button"
                id="btn-view-grid"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Vista Tarjetas Cuadrícula"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Tarjetas</span>
              </button>
            </div>

            {/* Font size zoom controls */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
              <span className="text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider hidden sm:inline">
                Zoom:
              </span>
              {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  id={`btn-fontsize-${size}`}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-1 text-xs font-black rounded-lg transition-all ${
                    fontSize === size
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {size === 'sm' && 'A-'}
                  {size === 'md' && 'Norm'}
                  {size === 'lg' && 'A+'}
                  {size === 'xl' && 'A++'}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Utility Tools */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              id="btn-open-mixer"
              onClick={() => setMixerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-800 font-extrabold text-xs border border-amber-200/80 transition-all active:scale-95 shadow-2xs"
            >
              <Dices className="w-3.5 h-3.5 text-amber-600" />
              <span>Mezclador</span>
            </button>

            <button
              type="button"
              id="btn-open-batch-copy"
              onClick={() => setBatchModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 font-extrabold text-xs border border-indigo-200/80 transition-all active:scale-95 shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Lote</span>
            </button>

            <button
              type="button"
              id="btn-open-comparator"
              onClick={() => setComparatorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-extrabold text-xs border border-slate-200 transition-all active:scale-95 shadow-2xs"
            >
              <Columns2 className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Comparar</span>
            </button>

            <button
              type="button"
              id="btn-open-history-drawer"
              onClick={() => window.dispatchEvent(new CustomEvent('open-copy-history'))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-extrabold text-xs border border-slate-200 transition-all active:scale-95 shadow-2xs"
              title="Ver historial de fuentes que has copiado recientemente"
            >
              <History className="w-3.5 h-3.5 text-indigo-600" />
              <span>Historial</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. PINNED FAVORITES SECTION (IF ANY SAVED) */}
      <FavoritesSection
        favorites={favorites}
        inputText={deferredInputText}
        onToggleFavorite={onToggleFavorite}
      />

      {/* 5. TRENDING POPULAR FONTS BANNER */}
      <TrendingFontsBanner
        inputText={deferredInputText}
        allGenerators={FONT_GENERATORS}
      />

      {/* 6. CONVERTED FONTS OUTPUT LIST / GRID */}
      <section className="mb-12">
        {visibleFonts.length > 0 ? (
          viewMode === 'compact' ? (
            /* COMPACT HIGH-DENSITY LIST MODE */
            <div className="space-y-2">
              {visibleFonts.map((generator) => {
                const isFav = favorites.some((fav) => fav.fontName === generator.name);
                const isSelected = selectedFontIds.includes(generator.id);
                return (
                  <div key={generator.id} className="cv-auto">
                    <CompactFontRow
                      generator={generator}
                      inputText={deferredInputText}
                      isFavorite={isFav}
                      isSelected={isSelected}
                      fontSize={fontSize}
                      onToggleFavorite={onToggleFavorite}
                      onToggleSelect={(id) => handleToggleSelect(id)}
                      onPreview={onPreview}
                      onExportImage={(text, name) => setImageExportData({ text, fontName: name })}
                      onShareText={(text, name) => setShareModalData({ text, fontName: name })}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            /* GRID CARDS MODE - Responsive 1/2/3 Columns */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {visibleFonts.map((generator) => {
                const isFav = favorites.some((fav) => fav.fontName === generator.name);
                const isSelected = selectedFontIds.includes(generator.id);
                return (
                  <div key={generator.id} className="cv-auto">
                    <FontCard
                      generator={generator}
                      inputText={deferredInputText}
                      isFavorite={isFav}
                      isSelected={isSelected}
                      fontSize={fontSize}
                      onToggleFavorite={onToggleFavorite}
                      onToggleSelect={(id) => handleToggleSelect(id)}
                      onPreview={onPreview}
                      onExportImage={(text, name) => setImageExportData({ text, fontName: name })}
                      onShareText={(text, name) => setShareModalData({ text, fontName: name })}
                    />
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <p className="text-base font-extrabold text-slate-800 dark:text-white">
              No encontramos fuentes para "{searchQuery}"
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
              Prueba con alguno de estos estilos populares o limpia la búsqueda:
            </p>

            {/* Quick Suggestions Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-md mx-auto">
              {['cursiva', 'gotica', 'alas', 'tachado', 'circulo', 'insano'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  #{tag}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todas');
              }}
              className="mt-6 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/25"
            >
              Restablecer y Ver todas las 80+ fuentes
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              id="btn-load-more-fonts"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200/90 hover:border-indigo-500 text-slate-800 font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95 group"
            >
              <span>Cargar Más Fuentes ({filteredFonts.length - visibleCount} disponibles)</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-y-0.5 transition-all" />
            </button>
          </div>
        )}
      </section>

      {/* 7. ALPHABET REFERENCE UNICODE TABLE (A-Z) */}
      <AlphabetReferenceTable />

      {/* 8. FAQ & SEO GUIDE SECTION */}
      <FaqSection currentRoute={currentRoute} />

      {/* Floating Multi-Select Batch Action Drawer */}
      {selectedFontIds.length > 0 && (
        <div className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[680px] z-50 bg-slate-900 text-white p-3.5 sm:p-4 rounded-3xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3 flex-wrap animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center">
              {selectedFontIds.length}
            </span>
            <span className="text-xs font-bold hidden sm:inline text-slate-200">
              fuentes seleccionadas
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleBatchCopySelected(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all active:scale-95 shadow-xs"
            >
              {batchCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>¡Copiadas!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Todas</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleBatchCopySelected(true)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
              title="Copiar con el nombre de cada fuente"
            >
              <span>Con Nombres</span>
            </button>

            <button
              type="button"
              onClick={handleExportBatchTextFile}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
              title="Descargar como archivo de texto .txt"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">.TXT</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFontIds([])}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Limpiar selección"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Batch Copy Modal */}
      <BatchCopyModal
        isOpen={batchModalOpen}
        onClose={() => setBatchModalOpen(false)}
        inputText={inputText}
        generators={filteredFonts}
      />

      {/* Visual Comparator Modal */}
      <VisualComparator
        isOpen={comparatorOpen}
        onClose={() => setComparatorOpen(false)}
        inputText={inputText}
        generators={FONT_GENERATORS}
      />

      {/* Style Mixer Modal */}
      <StyleMixerModal
        isOpen={mixerOpen}
        onClose={() => setMixerOpen(false)}
        inputText={inputText}
      />

      {/* Live Profile Real-Time Simulator Modal */}
      <LivePreviewSimulator
        isOpen={simulatorModalOpen}
        onClose={() => setSimulatorModalOpen(false)}
        inputText={inputText}
      />

      {/* Unicode Compatibility & Broken Diamond Fixer Modal */}
      <UnicodeFixerModal
        isOpen={fixerModalOpen}
        onClose={() => setFixerModalOpen(false)}
        text={inputText}
        onRepair={(fixedText) => handleTextChange(fixedText)}
      />

      {/* Social Card / Poster Generator Modal (PNG HD) */}
      <PosterGeneratorModal
        isOpen={posterModalOpen}
        onClose={() => setPosterModalOpen(false)}
        initialText={inputText || '𝓥𝓲𝓿𝓮, 𝓼𝓾𝓮ñ𝓪, 𝓿𝓲𝓪𝓳𝓪 ✨'}
      />

      {/* Text to Image PNG Export Modal */}
      {imageExportData && (
        <TextImageExportModal
          isOpen={!!imageExportData}
          onClose={() => setImageExportData(null)}
          text={imageExportData.text}
          fontName={imageExportData.fontName}
        />
      )}

      {/* Direct Viral Share Modal */}
      {shareModalData && (
        <ShareModal
          isOpen={!!shareModalData}
          onClose={() => setShareModalData(null)}
          text={shareModalData.text}
          fontName={shareModalData.fontName}
        />
      )}

      {/* Floating Sticky Input Bar on Scroll */}
      {showStickyBar && selectedFontIds.length === 0 && (
        <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[640px] z-40 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-2.5 sm:p-3 rounded-2xl shadow-2xl text-white transition-all duration-200 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                value={inputText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Escribe para cambiar todas las fuentes..."
                className="w-full pl-3.5 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {inputText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                  title="Borrar texto"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleRandomExample}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-amber-400 shrink-0"
              title="Ejemplo Aleatorio"
            >
              <Dices className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 font-extrabold text-xs text-white rounded-xl flex items-center gap-1 shrink-0 shadow-xs"
              title="Volver Arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Arriba</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


