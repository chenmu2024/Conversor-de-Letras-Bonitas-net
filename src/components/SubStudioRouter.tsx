import React, { Suspense, lazy } from 'react';
import { PageRoute } from '../types';

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
  return (
    <Suspense fallback={<div className="h-16" />}>
      {currentRoute === 'contador-bio' && (
        <div className="mb-8">
          <BioCharacterCounter onApplyText={onApplyText} />
        </div>
      )}

      {currentRoute === 'sobre-nosotros' && (
        <div className="mb-8">
          <AboutUsPage />
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
        <div className="mb-8">
          <InstagramTools onApplyText={onApplyText} />
        </div>
      )}

      {currentRoute === 'free-fire' && (
        <div className="mb-8">
          <FreeFireStudio onApplyText={onApplyText} />
        </div>
      )}

      {currentRoute === 'whatsapp' && (
        <div className="mb-8">
          <WhatsAppStudio onApplyText={onApplyText} />
        </div>
      )}

      {currentRoute === 'tiktok' && (
        <div className="mb-8">
          <TikTokStudio onApplyText={onApplyText} />
        </div>
      )}

      {currentRoute === 'facebook' && (
        <div className="mb-8">
          <FacebookStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'letras-chidas' && (
        <div className="mb-8">
          <LetrasChidasStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'letras-elegantes' && (
        <div className="mb-8">
          <LetrasElegantesStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'letras-raras' && (
        <div className="mb-8">
          <LetrasRarasStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'letras-tatuajes' && (
        <div className="mb-8">
          <LetrasTatuajesStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'nicks-free-fire' && (
        <div className="mb-8">
          <NicksFreeFireStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'letras-chinas' && (
        <div className="mb-8">
          <LetrasChinasStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'espacio-invisible' && (
        <div className="mb-8">
          <InvisibleSpaceStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'nombres-parejas' && (
        <div className="mb-8">
          <CoupleNicksStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'cursiva' && (
        <div className="mb-8">
          <CursiveStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'goticas' && (
        <div className="mb-8">
          <GothicStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'invertidas' && (
        <div className="mb-8">
          <InvertedStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'circulos' && (
        <div className="mb-8">
          <CirclesStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}

      {currentRoute === 'glitch' && (
        <div className="mb-8">
          <GlitchStudio onApplyText={onApplyText} initialText={globalText} />
        </div>
      )}
    </Suspense>
  );
};
