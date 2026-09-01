import React, { useState, useEffect } from 'react';
import { PageRoute, FontGenerator, FavoriteItem } from './types';
import { ROUTE_CONFIGS } from './data/routeConfigs';
import { useSeoHead } from './hooks/useSeoHead';
import { Header } from './components/Header';
import { FontConverter } from './components/FontConverter';
import { SubStudioRouter } from './components/SubStudioRouter';
import { AuxiliarySections } from './components/AuxiliarySections';
import { FavoritesModal } from './components/FavoritesModal';
import { CopyHistoryDrawer } from './components/CopyHistoryDrawer';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { PwaInstallModal } from './components/PwaInstallModal';
import { ToastNotification } from './components/ToastNotification';
import { Breadcrumbs } from './components/Breadcrumbs';
import { StickyMobileInputBar } from './components/StickyMobileInputBar';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Footer } from './components/Footer';
import { ArrowUp, Star } from 'lucide-react';

interface AppProps {
  initialRoute?: PageRoute;
}

const resolveRouteFromUrl = (defaultRoute: PageRoute = 'inicio'): PageRoute => {
  if (typeof window === 'undefined') return defaultRoute;

  // 1. Check clean pathname
  const pathname = window.location.pathname.toLowerCase();
  if (pathname !== '/' && pathname !== '') {
    for (const [key, config] of Object.entries(ROUTE_CONFIGS)) {
      if (config.path !== '/' && (pathname === config.path || pathname === config.path.slice(0, -1))) {
        return key as PageRoute;
      }
    }
    // If not matching any known subpage, trigger 404 page
    return '404';
  }

  // 2. Check hash (e.g. #/instagram, #/contador-bio)
  const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
  if (hash && hash in ROUTE_CONFIGS) {
    return hash as PageRoute;
  }
  // Alternate hash names
  if (hash === 'freefire') return 'free-fire';
  if (hash === 'contador') return 'contador-bio';

  // 3. Check query param (e.g. ?route=instagram)
  const params = new URLSearchParams(window.location.search);
  const r = params.get('route') as PageRoute;
  if (r && r in ROUTE_CONFIGS) {
    return r;
  }

  return defaultRoute;
};

export default function App({ initialRoute = 'inicio' }: AppProps) {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    return resolveRouteFromUrl(initialRoute);
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('letras_bonitas_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('letras_bonitas_theme', next ? 'dark' : 'light');
      } catch (e) {
        console.warn('Theme could not be saved', e);
      }
      return next;
    });
  };
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState<boolean>(false);
  const [previewText, setPreviewText] = useState<string>('𝓣𝓾 𝓣𝓮𝔁𝓽𝓸 𝓐𝓺𝓾í ✨');
  const [previewFontName, setPreviewFontName] = useState<string>('Cursiva Negrita');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [globalText, setGlobalText] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('text') || params.get('q');
      if (q) return q;
    }
    return ROUTE_CONFIGS[currentRoute]?.defaultText || 'Letras Bonitas';
  });

  // Dynamic SEO Head injection (Title, Canonical, Meta Description, Schema.org JSON-LD)
  useSeoHead(currentRoute);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('letras_bonitas_favs');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load favorites from localStorage', e);
    }
  }, []);

  // Listen to scroll for back to top button with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (items: FavoriteItem[]) => {
    setFavorites(items);
    try {
      localStorage.setItem('letras_bonitas_favs', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  };

  const handleToggleFavorite = (generator: FontGenerator, resultText: string) => {
    const existingIndex = favorites.findIndex((f) => f.fontName === generator.name);
    if (existingIndex >= 0) {
      // Remove
      const updated = favorites.filter((f) => f.fontName !== generator.name);
      saveFavorites(updated);
    } else {
      // Add
      const newItem: FavoriteItem = {
        id: `${generator.id}-${Date.now()}`,
        fontName: generator.name,
        text: globalText,
        result: resultText,
        createdAt: Date.now(),
      };
      saveFavorites([newItem, ...favorites]);
    }
  };

  const handleRemoveFavorite = (id: string) => {
    saveFavorites(favorites.filter((f) => f.id !== id));
  };

  const handleClearAllFavorites = () => {
    saveFavorites([]);
  };

  const handleOpenPreview = (resultText: string, fontName: string) => {
    setPreviewText(resultText);
    setPreviewFontName(fontName);
    // Smooth scroll to preview
    const previewEl = document.getElementById('preview-simulator-section');
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(resolveRouteFromUrl('inicio'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleRouteChange = (route: PageRoute) => {
    setCurrentRoute(route);
    const newDefault = ROUTE_CONFIGS[route]?.defaultText;
    const knownDefaults = Object.values(ROUTE_CONFIGS).map((r) => r.defaultText).concat(['Letras Bonitas', '']);
    if (newDefault && knownDefaults.includes(globalText)) {
      setGlobalText(newDefault);
    }
    const targetPath = ROUTE_CONFIGS[route]?.path || '/';
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      try {
        window.history.pushState(null, '', targetPath);
      } catch {
        // Fallback for sandboxed iframes
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white relative transition-colors duration-200 ${
      isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* 1. Header & Navigation */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenPwaInstall={() => setIsPwaModalOpen(true)}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Visual Breadcrumb Navigation for Google Crawlers & Users */}
        <Breadcrumbs currentRoute={currentRoute} onRouteChange={handleRouteChange} />

        {/* Dedicated Views for Tools, Studios & Legal Pages (Lazy Loaded) */}
        <SubStudioRouter
          currentRoute={currentRoute}
          globalText={globalText}
          onApplyText={(t) => setGlobalText(t)}
          onRouteChange={handleRouteChange}
        />

        {/* Core Instant Unicode Font Converter (Unified Clean Engine for Home & All Subpages) */}
        {currentRoute !== '404' && (
          <FontConverter
            currentRoute={currentRoute}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onPreview={handleOpenPreview}
            initialText={globalText}
            onTextChange={(t) => setGlobalText(t)}
          />
        )}

        {/* Auxiliary Content, Alphabet Tables, Guides, Infographics & SEO */}
        <AuxiliarySections
          currentRoute={currentRoute}
          globalText={globalText}
          previewText={previewText}
          previewFontName={previewFontName}
          onApplyText={(t) => setGlobalText(t)}
          onRouteChange={handleRouteChange}
        />
      </main>

      {/* 3. Floating Actions (Back to Top & Sticky Favorites Quick Button) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {favorites.length > 0 && (
          <button
            type="button"
            id="floating-btn-favorites"
            onClick={() => setIsFavoritesOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/25 hover:bg-amber-600 transition-all hover:scale-105 active:scale-95"
            title="Ver mis fuentes favoritas guardadas"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>{favorites.length} {favorites.length === 1 ? 'Favorita' : 'Favoritas'}</span>
          </button>
        )}

        {showScrollTop && (
          <button
            type="button"
            id="floating-btn-scroll-top"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/20 hover:bg-indigo-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-slate-700"
            title="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 4. Favorites Drawer/Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAllFavorites={handleClearAllFavorites}
      />

      {/* 5. Copy History Drawer (Floating) */}
      <CopyHistoryDrawer />

      {/* 6. PWA Install Floating Banner & Detailed Modal */}
      <PwaInstallPrompt />
      <PwaInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />

      {/* Global Instant Copy Toast Notification */}
      <ToastNotification />

      {/* GDPR / CCPA Cookie Consent Banner */}
      <CookieConsentBanner onRouteChange={handleRouteChange} />

      {/* 8. Sticky Mobile Input Bar for Fast Mid-Page Input & Copy */}
      <StickyMobileInputBar
        currentText={globalText}
        onTextChange={(t) => setGlobalText(t)}
        onScrollToTop={scrollToTop}
      />

      {/* 7. Footer */}
      <Footer onRouteChange={handleRouteChange} />
    </div>
  );
}
