import React, { Suspense, lazy } from 'react';
import { PageRoute } from '../types';
import { ROUTE_CONFIGS } from '../data/routeConfigs';
import { LazyOnVisible } from './LazyOnVisible';

// Lazy load heavy sub-studio tools and secondary pages
const InstagramTools = lazy(() => import('./InstagramTools').then(m => ({ default: m.InstagramTools })));
const FreeFireStudio = lazy(() => import('./FreeFireStudio').then(m => ({ default: m.FreeFireStudio })));
const WhatsAppStudio = lazy(() => import('./WhatsAppStudio').then(m => ({ default: m.WhatsAppStudio })));
const TikTokStudio = lazy(() => import('./TikTokStudio').then(m => ({ default: m.TikTokStudio })));
const FacebookStudio = lazy(() => import('./FacebookStudio').then(m => ({ default: m.FacebookStudio })));
const CursiveStudio = lazy(() => import('./CursiveStudio').then(m => ({ default: m.CursiveStudio })));
const GothicStudio = lazy(() => import('./GothicStudio').then(m => ({ default: m.GothicStudio })));
const InvertedStudio = lazy(() => import('./InvertedStudio').then(m => ({ default: m.InvertedStudio })));
const CirclesStudio = lazy(() => import('./CirclesStudio').then(m => ({ default: m.CirclesStudio })));
const GlitchStudio = lazy(() => import('./GlitchStudio').then(m => ({ default: m.GlitchStudio })));
const LetrasChidasStudio = lazy(() => import('./LetrasChidasStudio').then(m => ({ default: m.LetrasChidasStudio })));
const LetrasElegantesStudio = lazy(() => import('./LetrasElegantesStudio').then(m => ({ default: m.LetrasElegantesStudio })));
const LetrasRarasStudio = lazy(() => import('./LetrasRarasStudio').then(m => ({ default: m.LetrasRarasStudio })));
const LetrasTatuajesStudio = lazy(() => import('./LetrasTatuajesStudio').then(m => ({ default: m.LetrasTatuajesStudio })));
const NicksFreeFireStudio = lazy(() => import('./NicksFreeFireStudio').then(m => ({ default: m.NicksFreeFireStudio })));
const LetrasChinasStudio = lazy(() => import('./LetrasChinasStudio').then(m => ({ default: m.LetrasChinasStudio })));
const InvisibleSpaceStudio = lazy(() => import('./InvisibleSpaceStudio').then(m => ({ default: m.InvisibleSpaceStudio })));
const CoupleNicksStudio = lazy(() => import('./CoupleNicksStudio').then(m => ({ default: m.CoupleNicksStudio })));
const BioCharacterCounter = lazy(() => import('./BioCharacterCounter').then(m => ({ default: m.BioCharacterCounter })));
const UnicodeCompatibilityLab = lazy(() => import('./UnicodeCompatibilityLab').then(m => ({ default: m.UnicodeCompatibilityLab })));
const AboutUsPage = lazy(() => import('./AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const PrivacyPolicyPage = lazy(() => import('./PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const CookiePolicyPage = lazy(() => import('./CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const TermsAndConditionsPage = lazy(() => import('./TermsAndConditionsPage').then(m => ({ default: m.TermsAndConditionsPage })));
const ContactPage = lazy(() => import('./ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./NotFoundPage').then(m => ({ default: m.NotFoundPage })));

interface SubStudioRouterProps {
  currentRoute: PageRoute;
  globalText: string;
  onApplyText: (text: string) => void;
  onRouteChange: (route: PageRoute) => void;
}

export const SubStudioRouter: React.FC<SubStudioRouterProps> = ({
  currentRoute,
  globalText,
  onApplyText,
  onRouteChange,
}) => {
  const isInteractiveStudio = [
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

  const renderContent = () => {
    return (
      <>
        {currentRoute === 'contador-bio' && (
          <div className="mb-8">
            <BioCharacterCounter onApplyText={onApplyText} onRouteChange={onRouteChange} />
          </div>
        )}

        {currentRoute === 'compatibilidad-unicode' && (
          <div className="mb-8">
            <UnicodeCompatibilityLab
              onNavigate={(path) => {
                const clean = path.replace(/\/$/, '');
                const match = Object.values(ROUTE_CONFIGS).find(r => r.path === path || r.path.replace(/\/$/, '') === clean);
                if (match) {
                  onRouteChange(match.route);
                } else if (path === '/') {
                  onRouteChange('inicio');
                }
              }}
            />
          </div>
        )}

        {currentRoute === 'sobre-nosotros' && (
          <div className="mb-8">
            <AboutUsPage onRouteChange={onRouteChange} />
          </div>
        )}

        {currentRoute === 'politica-de-privacidad' && (
          <div className="mb-8">
            <PrivacyPolicyPage />
          </div>
        )}

        {currentRoute === 'politica-de-cookies' && (
          <div className="mb-8">
            <CookiePolicyPage />
          </div>
        )}

        {currentRoute === 'terminos-y-condiciones' && (
          <div className="mb-8">
            <TermsAndConditionsPage />
          </div>
        )}

        {currentRoute === 'contacto' && (
          <div className="mb-8">
            <ContactPage />
          </div>
        )}

        {currentRoute === '404' && (
          <div className="mb-8">
            <NotFoundPage
              onRouteChange={onRouteChange}
              onSearchRedirect={(q) => {
                onApplyText(q);
                onRouteChange('inicio');
              }}
            />
          </div>
        )}

        {currentRoute === 'instagram' && (
          <InstagramTools onApplyText={onApplyText} />
        )}

        {currentRoute === 'free-fire' && (
          <FreeFireStudio onApplyText={onApplyText} />
        )}

        {currentRoute === 'whatsapp' && (
          <WhatsAppStudio onApplyText={onApplyText} />
        )}

        {currentRoute === 'tiktok' && (
          <TikTokStudio onApplyText={onApplyText} />
        )}

        {currentRoute === 'facebook' && (
          <FacebookStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'letras-chidas' && (
          <LetrasChidasStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'letras-elegantes' && (
          <LetrasElegantesStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'letras-raras' && (
          <LetrasRarasStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'letras-tatuajes' && (
          <LetrasTatuajesStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'nicks-free-fire' && (
          <NicksFreeFireStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'letras-chinas' && (
          <LetrasChinasStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'espacio-invisible' && (
          <InvisibleSpaceStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'nombres-parejas' && (
          <CoupleNicksStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'cursiva' && (
          <CursiveStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'goticas' && (
          <GothicStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'invertidas' && (
          <InvertedStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'circulos' && (
          <CirclesStudio onApplyText={onApplyText} initialText={globalText} />
        )}

        {currentRoute === 'glitch' && (
          <GlitchStudio onApplyText={onApplyText} initialText={globalText} />
        )}
      </>
    );
  };

  return (
    <Suspense fallback={<div className="h-16" />}>
      {isInteractiveStudio ? (
        <div id="sub-studio-section" className="mb-10 scroll-mt-20">
          <LazyOnVisible minHeight="280px">
            {renderContent()}
          </LazyOnVisible>
        </div>
      ) : (
        renderContent()
      )}
    </Suspense>
  );
};
