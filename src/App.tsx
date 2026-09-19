import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { PageRoute, FontGenerator, FavoriteItem } from './types';
import { ROUTE_CONFIGS } from './data/routeConfigs';
import { useSeoHead } from './hooks/useSeoHead';
import { Header } from './components/Header';
import { FontConverter } from './components/FontConverter';
import { Breadcrumbs } from './components/Breadcrumbs';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';
import { ArrowUp, Star } from 'lucide-react';

// Lazy load below-the-fold auxiliary sections, interactive sub-studios, and interactive drawer modals
const SubStudioRouter = lazy(() => import('./components/SubStudioRouter').then(m => ({ default: m.SubStudioRouter })));
const AuxiliarySections = lazy(() => import('./components/AuxiliarySections'));
const FavoritesModal = lazy(() => import('./components/FavoritesModal').then(m => ({ default: m.FavoritesModal })));
const CopyHistoryDrawer = lazy(() => import('./components/CopyHistoryDrawer').then(m => ({ default: m.CopyHistoryDrawer })));
const PwaInstallModal = lazy(() => import('./components/PwaInstallModal').then(m => ({ default: m.PwaInstallModal })));
const PwaInstallPrompt = lazy(() => import('./components/PwaInstallPrompt').then(m => ({ default: m.PwaInstallPrompt })));

// Auxiliary sections rendered with React 19 Suspense and content-visibility for instant SEO and low initial layout cost
interface DeferredAuxiliaryProps {
  currentRoute: PageRoute;
  globalText: string;
  previewText: string;
  previewFontName: string;
  onApplyText: (text: string) => void;
  onRouteChange: (route: PageRoute) => void;
}

const DeferredAuxiliarySections: React.FC<DeferredAuxiliaryProps> = (props) => {
  return (
    <div className="min-h-[120px] [content-visibility:auto] [contain-intrinsic-size:auto_500px]">
      <Suspense fallback={<div className="h-20 animate-pulse bg-slate-100 dark:bg-slate-800/40 rounded-2xl my-8" />}>
        <AuxiliarySections {...props} />
      </Suspense>
    </div>
  );
};

// Defer secondary floating widgets until idle or user interaction
const DeferredInteractiveTools: React.FC<{
  isFavoritesOpen: boolean;
  isPwaModalOpen: boolean;
  favorites: FavoriteItem[];
  onCloseFavorites: () => void;
  onRemoveFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onClosePwaModal: () => void;
}> = (props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (props.isFavoritesOpen || props.isPwaModalOpen) {
      setReady(true);
      return;
    }
    const trigger = () => {
      setReady(true);
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener('pointerdown', trigger);
      window.removeEventListener('keydown', trigger);
      window.removeEventListener('scroll', trigger);
    };
    window.addEventListener('pointerdown', trigger, { passive: true, once: true });
    window.addEventListener('keydown', trigger, { passive: true, once: true });
    window.addEventListener('scroll', trigger, { passive: true, once: true });
    return cleanup;
  }, [props.isFavoritesOpen, props.isPwaModalOpen]);

  if (!ready && !props.isFavoritesOpen && !props.isPwaModalOpen) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      {props.isFavoritesOpen && (
        <FavoritesModal
          isOpen={props.isFavoritesOpen}
          onClose={props.onCloseFavorites}
          favorites={props.favorites}
          onRemoveFavorite={props.onRemoveFavorite}
          onClearAllFavorites={props.onClearAllFavorites}
        />
      )}
      <CopyHistoryDrawer />
      <PwaInstallPrompt />
      {props.isPwaModalOpen && (
        <PwaInstallModal
          isOpen={props.isPwaModalOpen}
          onClose={props.onClosePwaModal}
        />
      )}
    </Suspense>
  );
};

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

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState<boolean>(false);
  const [previewText, setPreviewText] = useState<string>('𝓣𝓾 𝓣𝓮𝔁𝓽𝓸 𝓐𝓺𝓾í ✨');
  const [previewFontName, setPreviewFontName] = useState<string>('Cursiva Negrita');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Initial text matches route default consistently during SSR and first client render
  const [globalText, setGlobalText] = useState<string>(() => {
    return ROUTE_CONFIGS[currentRoute]?.defaultText || 'Letras Bonitas';
  });

  // Hydrate custom query parameter (?text= / ?q=) after mount to prevent hydration mismatch
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('text') || params.get('q');
      if (q && q !== globalText) {
        setGlobalText(q);
      }
    } catch (e) {
      console.warn('Query text sync failed', e);
    }
  }, []);

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

  const isStandalonePage = [
    'sobre-nosotros',
    'politica-de-privacidad',
    'politica-de-cookies',
    'terminos-y-condiciones',
    'contacto',
    'contador-bio',
    '404',
  ].includes(currentRoute);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white relative bg-slate-50 text-slate-900">
      {/* Non-blocking IntersectionObserver Sentinel for scroll detection */}
      <div id="scroll-sentinel" className="absolute top-[380px] left-0 w-full h-1 pointer-events-none opacity-0" aria-hidden="true" />

      {/* 1. Header & Navigation */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenPwaInstall={() => setIsPwaModalOpen(true)}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Visual Breadcrumb Navigation for Google Crawlers & Users */}
        <Breadcrumbs currentRoute={currentRoute} onRouteChange={handleRouteChange} />

        {isStandalonePage ? (
          /* Standalone Information & Legal Pages (Own H1, Clean Single-View Layout) */
          <Suspense fallback={<div className="h-40 animate-pulse bg-slate-100 rounded-3xl my-8" />}>
            <SubStudioRouter
              currentRoute={currentRoute}
              globalText={globalText}
              onApplyText={(t) => setGlobalText(t)}
              onRouteChange={handleRouteChange}
            />
          </Suspense>
        ) : (
          <>
            {/* 1. Primary Unicode Font Converter (Top H1 Title, Input Workbench & Real-time Fonts) */}
            <FontConverter
              currentRoute={currentRoute}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPreview={handleOpenPreview}
              initialText={globalText}
              onTextChange={(t) => setGlobalText(t)}
              onRouteChange={handleRouteChange}
            />

            {/* 2. Dedicated Interactive Studio / Platform Toolkit (Sub-studios for Instagram, Free Fire, etc.) */}
            <Suspense fallback={null}>
              <SubStudioRouter
                currentRoute={currentRoute}
                globalText={globalText}
                onApplyText={(t) => setGlobalText(t)}
                onRouteChange={handleRouteChange}
              />
            </Suspense>

            {/* 3. Auxiliary Content, Alphabet Tables, Guides, Infographics & SEO (Deferred to eliminate LCP delay) */}
            <DeferredAuxiliarySections
              currentRoute={currentRoute}
              globalText={globalText}
              previewText={previewText}
              previewFontName={previewFontName}
              onApplyText={(t) => setGlobalText(t)}
              onRouteChange={handleRouteChange}
            />
          </>
        )}
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

      {/* 4. Deferred Floating Drawers & Secondary Modals */}
      <DeferredInteractiveTools
        isFavoritesOpen={isFavoritesOpen}
        isPwaModalOpen={isPwaModalOpen}
        favorites={favorites}
        onCloseFavorites={() => setIsFavoritesOpen(false)}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAllFavorites={handleClearAllFavorites}
        onClosePwaModal={() => setIsPwaModalOpen(false)}
      />

      {/* Global Instant Copy Toast Notification */}
      <ToastNotification />

      {/* GDPR / CCPA Cookie Consent Banner */}
      <CookieConsentBanner onRouteChange={handleRouteChange} />

      {/* 7. Footer */}
      <Footer onRouteChange={handleRouteChange} />
    </div>
  );
}
