import React, { useState, useMemo, useEffect, useDeferredValue, useRef, Suspense, lazy } from 'react';
import { PageRoute, TabCategory, FontGenerator, FavoriteItem } from '../types';
import { ROUTE_CONFIGS } from '../data/routeConfigs';
import { ROUTE_HEADERS } from '../data/routeHeaders';
import { FONT_GENERATORS } from '../utils/unicodeConverters';
import { FONT_COUNT } from '../constants/siteStats';
import { FontCard } from './FontCard';
import { QuickActionBar } from './QuickActionBar';
import { QuickPresets } from './QuickPresets';
import { trackEvent } from '../utils/analytics';

// Code-split secondary UI sections to significantly lower initial unused JavaScript
const CompactFontRow = lazy(() => import('./CompactFontRow').then(m => ({ default: m.CompactFontRow })));
const FavoritesSection = lazy(() => import('./FavoritesSection').then(m => ({ default: m.FavoritesSection })));
const TrendingFontsBanner = lazy(() => import('./TrendingFontsBanner').then(m => ({ default: m.TrendingFontsBanner })));
const QuickDecoratorPicker = lazy(() => import('./QuickDecoratorPicker').then(m => ({ default: m.QuickDecoratorPicker })));
const SymbolQuickRibbon = lazy(() => import('./SymbolQuickRibbon').then(m => ({ default: m.SymbolQuickRibbon })));
const ScenarioShortcutGrid = lazy(() => import('./ScenarioShortcutGrid').then(m => ({ default: m.ScenarioShortcutGrid })));
const PlatformLimits = lazy(() => import('./PlatformLimits').then(m => ({ default: m.PlatformLimits })));

// Defer non-critical below-the-fold components and on-demand modal bundles
const FaqSection = lazy(() => import('./FaqSection').then(m => ({ default: m.FaqSection })));
const AlphabetReferenceTable = lazy(() => import('./AlphabetReferenceTable').then(m => ({ default: m.AlphabetReferenceTable })));
const MagicNickGenerator = lazy(() => import('./MagicNickGenerator').then(m => ({ default: m.MagicNickGenerator })));
const FontConverterModals = lazy(() => import('./FontConverterModals').then(m => ({ default: m.FontConverterModals })));

import { 
  Search, 
  Sparkles, 
  ChevronDown, 
  Filter,
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
  Link2,
  Eye,
  CheckSquare,
  Square,
  Download,
  Info,
  RefreshCw,
  Volume2
} from 'lucide-react';

interface FontConverterProps {
  currentRoute: PageRoute;
  favorites: FavoriteItem[];
  initialText?: string;
  onToggleFavorite: (generator: FontGenerator, result: string) => void;
  onPreview: (resultText: string, fontName: string) => void;
  onTextChange?: (text: string) => void;
  onRouteChange: (route: PageRoute) => void;
  quickAnswerSlot?: React.ReactNode;
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
  onRouteChange,
  quickAnswerSlot,
}) => {
  const [inputText, setInputText] = useState<string>(initialText);
  const deferredInputText = useDeferredValue(inputText);
  const [activeCategory, setActiveCategory] = useState<TabCategory>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(16);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [viewMode, setViewMode] = useState<'compact' | 'grid'>('grid');
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const [selectedFontIds, setSelectedFontIds] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [batchCopied, setBatchCopied] = useState<boolean>(false);
  const [lastDeletedText, setLastDeletedText] = useState<string | null>(null);
  const [advancedToolsOpen, setAdvancedToolsOpen] = useState<boolean>(false);
  const inputStartedTrackedRef = useRef(false);

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

  // Sticky input follows users only while they are actively browsing generated results.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const inputTarget = document.getElementById('scroll-sentinel') || document.getElementById('main-text-input');
    const resultsTarget = document.getElementById('font-results-section');
    if (!inputTarget || !resultsTarget) return;

    let inputVisible = true;
    let resultsVisible = false;
    let rafId: number;

    const updateSticky = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setShowStickyBar(!inputVisible && resultsVisible);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === inputTarget) inputVisible = entry.isIntersecting;
          if (entry.target === resultsTarget) resultsVisible = entry.isIntersecting;
        }
        updateSticky();
      },
      { threshold: 0 }
    );

    observer.observe(inputTarget);
    observer.observe(resultsTarget);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
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

  const handleUserTextChange = (text: string) => {
    if (!inputStartedTrackedRef.current) {
      inputStartedTrackedRef.current = true;
      trackEvent('text_input_started', {
        route: currentRoute,
      });
    }
    handleTextChange(text);
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
        const inputEl = document.getElementById('main-text-input');
        if (inputEl) {
          inputEl.focus();
          inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  const headerInfo = ROUTE_HEADERS[currentRoute] || ROUTE_HEADERS.inicio;

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

  const hasSubStudio = [
    'instagram',
    'free-fire',
    'whatsapp',
    'tiktok',
    'facebook',
    'letras-chidas',
    'letras-elegantes',
    'letras-raras',
    'letras-tatuajes',
    'nicks-free-fire',
    'letras-chinas',
    'espacio-invisible',
    'nombres-parejas',
    'cursiva',
    'goticas',
    'invertidas',
    'circulos',
    'glitch',
  ].includes(currentRoute);

  return (
    <div id="conversor-principal">
      {/* 1. HERO SECTION */}
      <section className="relative text-center pt-5 sm:pt-8 pb-4 sm:pb-5 max-w-4xl mx-auto px-2">
        {/* Soft Ambient Background Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/70 text-indigo-700 text-xs font-bold shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            {headerInfo.icon}
            <span>{headerInfo.badge}</span>
          </div>
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs"
            title="El texto del conversor principal se transforma directamente en tu navegador."
          >
            <span>🔒</span>
            <span>Tu texto se procesa localmente</span>
          </div>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          {headerInfo.title.split(' - ')[0]}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto mt-3.5 leading-relaxed font-normal">
          {headerInfo.subtitle}
        </p>

      </section>

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
            <span>Escribe o pega tu texto:</span>
          </label>

          {/* Real-time letter & word counters */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
              <span>
                <strong className="text-slate-900 font-extrabold">{Array.from(inputText).length}</strong> {Array.from(inputText).length === 1 ? 'letra' : 'letras'}
              </span>
              <span className="text-slate-400">•</span>
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
            onChange={(e) => handleUserTextChange(e.target.value)}
            placeholder="Escribe aquí tu frase, nombre para Instagram, nick de Free Fire o estado de WhatsApp..."
            className="w-full px-4 sm:px-5 py-3.5 text-lg sm:text-xl rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-y font-medium leading-relaxed"
          />
        </div>

        {/* Spanish Accent & Special Character Compatibility Banner */}
        {hasAccentsOrSpecialChars && (
          <div className="mb-3.5 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-2 flex-wrap text-xs text-slate-700">
            <div className="flex items-center gap-2 min-w-0">
              <Info className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>
                <strong className="text-slate-800">Nota de compatibilidad:</strong> Algunos estilos decorativos pueden sustituir letras con tilde o "ñ". Tu texto original no se modifica automáticamente.
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleNormalizeAccents}
                className="px-2.5 py-1 bg-white hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg border border-indigo-200 transition-colors flex items-center gap-1"
                title="Crear una versión sin tildes si una plataforma o estilo concreto la necesita"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Crear versión sin tildes</span>
              </button>
              <button
                type="button"
                onClick={() => setFixerModalOpen(true)}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 rounded-lg transition-colors"
              >
                Más información
              </button>
            </div>
          </div>
        )}

        {/* Primary actions stay visible; secondary utilities are progressively disclosed */}
        <div className="mt-1 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            id="btn-primary-paste"
            onClick={handlePaste}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-extrabold transition-all active:scale-95"
            title="Pegar texto desde el portapapeles"
          >
            <span>📋 Pegar</span>
          </button>

          {inputText && (
            <button
              type="button"
              id="btn-primary-clear"
              onClick={handleClear}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-700 text-xs font-bold transition-all active:scale-95"
              title="Limpiar el texto"
            >
              <span>Limpiar</span>
            </button>
          )}

          <button
            type="button"
            id="btn-toggle-advanced-tools"
            aria-expanded={advancedToolsOpen}
            aria-controls="advanced-converter-tools"
            onClick={() =>
              setAdvancedToolsOpen((open) => {
                const next = !open;
                if (next) trackEvent('advanced_tools_opened', { route: currentRoute });
                return next;
              })
            }
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-700 text-xs font-extrabold shadow-2xs transition-all active:scale-95"
          >
            <span>{advancedToolsOpen ? 'Ocultar herramientas' : 'Más herramientas'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${advancedToolsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {advancedToolsOpen && (
          <div
            id="advanced-converter-tools"
            className="mt-4 p-3.5 sm:p-4 rounded-3xl border border-slate-200 bg-slate-50/70 space-y-3.5 animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs font-black text-slate-800">Herramientas avanzadas</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Opciones extra para decorar, editar, compartir y comprobar tu texto.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {inputText && (
                  <button
                    type="button"
                    id="btn-speak-main-text"
                    aria-label="Escuchar texto por voz (Pronunciación en Español)"
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        const utter = new SpeechSynthesisUtterance(inputText);
                        utter.lang = 'es-ES';
                        window.speechSynthesis.speak(utter);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200 transition-all active:scale-95"
                    title="Escuchar texto por voz (Pronunciación en Español)"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar</span>
                  </button>
                )}

                {hasSubStudio && (
                  <button
                    type="button"
                    onClick={() => document.getElementById('sub-studio-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-all active:scale-95 shadow-2xs"
                    title={`Ir a la suite y simuladores especializados de ${headerInfo.badge}`}
                  >
                    <span>🛠️ Estudio {headerInfo.badge} ↓</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mr-1">
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

            <QuickPresets
              onSelectPreset={handleTextChange}
              currentText={inputText}
              currentRoute={currentRoute}
            />

            <Suspense fallback={null}>
              <QuickDecoratorPicker
                currentText={inputText}
                onApplyDecoration={(decText) => handleTextChange(decText)}
              />
            </Suspense>

            <Suspense fallback={null}>
              <SymbolQuickRibbon
                onInsertSymbol={(sym) => {
                  handleTextChange(inputText + sym);
                }}
              />
            </Suspense>

            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0 flex-1">
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
                  showClipboardActions={false}
                  showShareExportActions={false}
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-3">
                <button
                  type="button"
                  id="btn-advanced-share-link"
                  onClick={handleCopyShareLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-bold text-xs shadow-2xs transition-all active:scale-95"
                  title="Copiar enlace directo con este texto para compartir en WhatsApp, bio o redes"
                >
                  <Link2 className="w-4 h-4 text-indigo-600" />
                  <span>Compartir enlace</span>
                </button>

                <button
                  type="button"
                  id="btn-advanced-image"
                  onClick={() => {
                    trackEvent('image_exported', {
                      source: 'advanced_tools',
                      route: currentRoute,
                    });
                    setPosterModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95"
                  title="Crear imagen PNG con diseño para Instagram Stories y Estados de WhatsApp"
                >
                  <ImageIcon className="w-4 h-4 text-pink-400" />
                  <span>Imagen HD</span>
                </button>

                <button
                  type="button"
                  id="btn-advanced-preview"
                  onClick={() => setSimulatorModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-extrabold text-xs border border-purple-200 transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>Vista previa</span>
                </button>
              </div>
            </div>

            <Suspense fallback={null}>
              <PlatformLimits text={inputText} />
            </Suspense>
          </div>
        )}

      </section>

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
                  trackEvent('category_selected', {
                    category: cat.id,
                    route: currentRoute,
                  });
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15'
                    : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/90 shadow-2xs'
                }`}
              >
                <span title={cat.sample}>{cat.label}</span>
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
              onBlur={() => {
                if (searchQuery.trim()) {
                  trackEvent('font_search', {
                    query_length: Array.from(searchQuery.trim()).length,
                    route: currentRoute,
                  });
                }
              }}
              placeholder="Buscar estilos (ej: cursiva, gótica, alas)..."
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

          {/* Keep favorites visible; style-search shortcuts live in advanced tools */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold">
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
          </div>

          {advancedToolsOpen && (
            <div
              id="advanced-result-controls"
              className="basis-full flex items-center justify-between gap-3 flex-wrap pt-2.5 mt-0.5 border-t border-slate-200/80"
            >
              <div className="basis-full flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold no-scrollbar pb-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                  Atajos de estilo:
                </span>
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
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {/* Result layout, zoom and multi-select */}
              <div className="flex items-center gap-2 flex-wrap">
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

                <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] font-extrabold text-slate-600 px-1 uppercase tracking-wider hidden sm:inline">
                    Zoom:
                  </span>
                  {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      id={`btn-fontsize-${size}`}
                      aria-label={`Ajustar tamaño de fuente a ${size}`}
                      onClick={() => setFontSize(size)}
                      className={`px-2 py-1 text-xs font-black rounded-lg transition-all ${
                        fontSize === size
                          ? 'bg-white text-indigo-600 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
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

              {/* Secondary utilities */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  id="btn-open-mixer"
                  aria-label="Mezclador de estilos de fuentes aleatorios"
                  onClick={() => setMixerOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-800 font-extrabold text-xs border border-amber-200/80 transition-all active:scale-95 shadow-2xs"
                >
                  <Dices className="w-3.5 h-3.5 text-amber-600" />
                  <span>Mezclador</span>
                </button>

                <button
                  type="button"
                  id="btn-open-batch-copy"
                  aria-label="Copiar múltiples fuentes en lote"
                  onClick={() => setBatchModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 font-extrabold text-xs border border-indigo-200/80 transition-all active:scale-95 shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Lote</span>
                </button>

                <button
                  type="button"
                  id="btn-open-comparator"
                  aria-label="Comparar estilos de fuentes lado a lado"
                  onClick={() => setComparatorOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-extrabold text-xs border border-slate-200 transition-all active:scale-95 shadow-2xs"
                  title="Comparar estilos de fuentes lado a lado"
                >
                  <Columns2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Comparar</span>
                </button>

                <button
                  type="button"
                  id="btn-open-history-drawer"
                  aria-label="Ver historial de fuentes que has copiado recientemente"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-copy-history'))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-extrabold text-xs border border-slate-200 transition-all active:scale-95 shadow-2xs"
                  title="Ver historial de fuentes que has copiado recientemente"
                >
                  <History className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Historial</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. PINNED FAVORITES SECTION (IF ANY SAVED) */}
      {favorites.length > 0 && (
        <Suspense fallback={null}>
          <FavoritesSection
            favorites={favorites}
            inputText={deferredInputText}
            onToggleFavorite={onToggleFavorite}
          />
        </Suspense>
      )}

      {/* 5. TRENDING POPULAR FONTS BANNER */}
      <Suspense fallback={null}>
        <TrendingFontsBanner
          inputText={deferredInputText}
          allGenerators={FONT_GENERATORS}
        />
      </Suspense>

      {/* 6. CONVERTED FONTS OUTPUT LIST / GRID */}
      <section id="font-results-section" className="mb-12">
        {visibleFonts.length > 0 ? (
          viewMode === 'compact' ? (
            /* COMPACT HIGH-DENSITY LIST MODE */
            <div className="space-y-2">
              {visibleFonts.map((generator) => {
                const isFav = favorites.some((fav) => fav.fontName === generator.name);
                const isSelected = selectedFontIds.includes(generator.id);
                return (
                  <div key={generator.id} className="cv-auto">
                    <Suspense fallback={<div className="h-14 bg-slate-50 rounded-2xl border border-slate-100" />}>
                      <CompactFontRow
                        generator={generator}
                        inputText={deferredInputText}
                        isFavorite={isFav}
                        isSelected={isSelected}
                        fontSize={fontSize}
                        onToggleFavorite={onToggleFavorite}
                        onToggleSelect={advancedToolsOpen || selectedFontIds.length > 0 ? (id) => handleToggleSelect(id) : undefined}
                        onPreview={onPreview}
                        onExportImage={(text, name) => setImageExportData({ text, fontName: name })}
                        onShareText={(text, name) => setShareModalData({ text, fontName: name })}
                      />
                    </Suspense>
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
                      onToggleSelect={advancedToolsOpen || selectedFontIds.length > 0 ? (id) => handleToggleSelect(id) : undefined}
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
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <p className="text-base font-extrabold text-slate-800">
              No encontramos fuentes para "{searchQuery}"
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Prueba con alguno de estos estilos populares o limpia la búsqueda:
            </p>

            {/* Quick Suggestions Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-md mx-auto">
              {['cursiva', 'gotica', 'alas', 'tachado', 'circulo', 'insano'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-200"
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
              Restablecer y Ver todas las {FONT_COUNT} fuentes
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

      {/* Contextual guidance appears after users can already see and copy results */}
      {quickAnswerSlot && (
        <div className="my-8">
          {quickAnswerSlot}
        </div>
      )}

      {/* Related scenarios remain available without delaying the main conversion flow */}
      <Suspense fallback={<div className="min-h-[50px] my-6" />}>
        <ScenarioShortcutGrid
          currentRoute={currentRoute}
          onRouteChange={(route) => {
            if (notifyParentTextChange) {
              const defText = ROUTE_CONFIGS[route]?.defaultText;
              if (defText) notifyParentTextChange(defText);
            }
            onRouteChange(route);
          }}
        />
      </Suspense>

      {/* 2.5 1-CLIC MAGIC NICK GENERATOR & VIRAL WRAPPERS */}
      <Suspense fallback={<div className="min-h-[160px] my-6" />}>
        <MagicNickGenerator
          currentText={inputText}
          onApplyText={handleTextChange}
        />
      </Suspense>

      {/* 7. ALPHABET REFERENCE UNICODE TABLE (A-Z) */}
      <Suspense fallback={<div className="h-16" />}>
        <AlphabetReferenceTable />
      </Suspense>

      {/* 8. FAQ & SEO GUIDE SECTION */}
      <Suspense fallback={<div className="h-16" />}>
        <FaqSection currentRoute={currentRoute} />
      </Suspense>

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

      {/* Modals via Lazy Loaded Container (only rendered when needed) */}
      {(batchModalOpen || comparatorOpen || mixerOpen || simulatorModalOpen || fixerModalOpen || posterModalOpen || !!imageExportData || !!shareModalData) && (
        <Suspense fallback={null}>
          <FontConverterModals
            batchModalOpen={batchModalOpen}
            onCloseBatchModal={() => setBatchModalOpen(false)}
            comparatorOpen={comparatorOpen}
            onCloseComparator={() => setComparatorOpen(false)}
            mixerOpen={mixerOpen}
            onCloseMixer={() => setMixerOpen(false)}
            simulatorModalOpen={simulatorModalOpen}
            onCloseSimulatorModal={() => setSimulatorModalOpen(false)}
            fixerModalOpen={fixerModalOpen}
            onCloseFixerModal={() => setFixerModalOpen(false)}
            posterModalOpen={posterModalOpen}
            onClosePosterModal={() => setPosterModalOpen(false)}
            imageExportData={imageExportData}
            onCloseImageExport={() => setImageExportData(null)}
            shareModalData={shareModalData}
            onCloseShareModal={() => setShareModalData(null)}
            inputText={inputText}
            filteredFonts={filteredFonts}
            allFonts={FONT_GENERATORS}
            onApplyText={(t) => handleTextChange(t)}
          />
        </Suspense>
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


