import React, { Suspense, lazy } from 'react';
import { PageRoute } from '../types';
import { ROUTE_MODULES, AuxiliaryModule } from '../data/routeModules';
import { LazyOnVisible } from './LazyOnVisible';

// Code-split each individual auxiliary section so they are only downloaded when visible in viewport
const InvisibleSpaceCard = lazy(() => import('./InvisibleSpaceCard').then(m => ({ default: m.InvisibleSpaceCard })));
const TextDecorator = lazy(() => import('./TextDecorator').then(m => ({ default: m.TextDecorator })));
const PlatformPreview = lazy(() => import('./PlatformPreview').then(m => ({ default: m.PlatformPreview })));
const AlphabetReference = lazy(() => import('./AlphabetReference').then(m => ({ default: m.AlphabetReference })));
const SymbolsLibrary = lazy(() => import('./SymbolsLibrary').then(m => ({ default: m.SymbolsLibrary })));
const SingleLetterExplorer = lazy(() => import('./SingleLetterExplorer').then(m => ({ default: m.SingleLetterExplorer })));
const ReadyBioTemplates = lazy(() => import('./ReadyBioTemplates').then(m => ({ default: m.ReadyBioTemplates })));
const SafetyAndUnicodeGuide = lazy(() => import('./SafetyAndUnicodeGuide').then(m => ({ default: m.SafetyAndUnicodeGuide })));
const CrossPlatformGlyphMatrix = lazy(() => import('./CrossPlatformGlyphMatrix').then(m => ({ default: m.CrossPlatformGlyphMatrix })));
const EditorialTypographyMasterclass = lazy(() => import('./EditorialTypographyMasterclass').then(m => ({ default: m.EditorialTypographyMasterclass })));
const AdvancedGuideAndTips = lazy(() => import('./AdvancedGuideAndTips').then(m => ({ default: m.AdvancedGuideAndTips })));
const ReadyNicknamesSection = lazy(() => import('./ReadyNicknamesSection').then(m => ({ default: m.ReadyNicknamesSection })));
const PopularNamesSection = lazy(() => import('./PopularNamesSection').then(m => ({ default: m.PopularNamesSection })));
const SymbolMatrixSection = lazy(() => import('./SymbolMatrixSection').then(m => ({ default: m.SymbolMatrixSection })));
const AlphabetTableSection = lazy(() => import('./AlphabetTableSection').then(m => ({ default: m.AlphabetTableSection })));
const UnicodeGlossarySection = lazy(() => import('./UnicodeGlossarySection').then(m => ({ default: m.UnicodeGlossarySection })));
const CompatibilitySection = lazy(() => import('./CompatibilitySection').then(m => ({ default: m.CompatibilitySection })));
const SignatureGeneratorSection = lazy(() => import('./SignatureGeneratorSection').then(m => ({ default: m.SignatureGeneratorSection })));
const CouplesNameGeneratorSection = lazy(() => import('./CouplesNameGeneratorSection').then(m => ({ default: m.CouplesNameGeneratorSection })));
const BioTemplatesSection = lazy(() => import('./BioTemplatesSection').then(m => ({ default: m.BioTemplatesSection })));
const SpecialOccasionsPhrasesSection = lazy(() => import('./SpecialOccasionsPhrasesSection').then(m => ({ default: m.SpecialOccasionsPhrasesSection })));
const TextDecoratorsGallery = lazy(() => import('./TextDecoratorsGallery').then(m => ({ default: m.TextDecoratorsGallery })));
const GlyphInspectorSection = lazy(() => import('./GlyphInspectorSection').then(m => ({ default: m.GlyphInspectorSection })));
const UserRatingsSection = lazy(() => import('./UserRatingsSection').then(m => ({ default: m.UserRatingsSection })));

// SEO and Informational Components (rendered directly for instant crawler indexing)
import { SeoContent } from './SeoContent';
import { AuthorEditorialBox } from './AuthorEditorialBox';
import { RelatedSilosSection } from './RelatedSilosSection';
import { TableOfContents } from './TableOfContents';

interface AuxiliarySectionsProps {
  currentRoute: PageRoute;
  globalText: string;
  previewText: string;
  previewFontName: string;
  onApplyText: (text: string) => void;
  onRouteChange: (route: PageRoute) => void;
}

export const AuxiliarySections: React.FC<AuxiliarySectionsProps> = ({
  currentRoute,
  globalText,
  previewText,
  previewFontName,
  onApplyText,
  onRouteChange,
}) => {
  const activeModules = new Set<AuxiliaryModule>(ROUTE_MODULES[currentRoute] || []);
  const isEnabled = (mod: AuxiliaryModule) => activeModules.has(mod);

  return (
    <div className="space-y-8">
      {/* 1. Core SEO Content & Editorial Trust (Guaranteed for Search Engines and Crawlers) */}
      <div className="mt-8">
        <TableOfContents />
      </div>

      <div className="mt-6">
        <SeoContent currentRoute={currentRoute} />
      </div>

      <div className="mt-8">
        <AuthorEditorialBox onRouteChange={onRouteChange} />
      </div>

      {/* 2. Context-Relevant Interactive Modules (Deferred on Viewport Entry via LazyOnVisible) */}
      {isEnabled('invisibleSpace') && (
        <LazyOnVisible minHeight="120px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <InvisibleSpaceCard />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('textDecorator') && (
        <LazyOnVisible minHeight="240px">
          <Suspense fallback={<div className="h-40 animate-pulse bg-slate-100 rounded-3xl" />}>
            <TextDecorator initialText={globalText} onApplyGlobalText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('platformPreview') && (
        <LazyOnVisible minHeight="220px">
          <Suspense fallback={<div className="h-36 animate-pulse bg-slate-100 rounded-3xl" />}>
            <PlatformPreview text={previewText} fontName={previewFontName} currentRoute={currentRoute} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('alphabetReference') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <AlphabetReference />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('symbolsLibrary') && (
        <LazyOnVisible minHeight="220px">
          <Suspense fallback={<div className="h-36 animate-pulse bg-slate-100 rounded-3xl" />}>
            <SymbolsLibrary onApplyText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('singleLetterExplorer') && (
        <LazyOnVisible minHeight="180px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <SingleLetterExplorer />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('readyBioTemplates') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <ReadyBioTemplates />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('bioTemplates') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <BioTemplatesSection onApplyText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('safetyGuide') && (
        <LazyOnVisible minHeight="160px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <SafetyAndUnicodeGuide />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('crossPlatformMatrix') && (
        <LazyOnVisible minHeight="180px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <CrossPlatformGlyphMatrix />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('editorialMasterclass') && (
        <LazyOnVisible minHeight="180px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <EditorialTypographyMasterclass onRouteChange={onRouteChange} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('advancedTips') && (
        <LazyOnVisible minHeight="160px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <AdvancedGuideAndTips />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('readyNicknames') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <ReadyNicknamesSection onApplyText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('popularNames') && (
        <LazyOnVisible minHeight="180px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <PopularNamesSection onSelectName={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('symbolMatrix') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <SymbolMatrixSection onInsertSymbol={(s) => onApplyText(globalText ? `${globalText} ${s}` : s)} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('alphabetTable') && (
        <LazyOnVisible minHeight="220px">
          <Suspense fallback={<div className="h-36 animate-pulse bg-slate-100 rounded-3xl" />}>
            <AlphabetTableSection />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('unicodeGlossary') && (
        <LazyOnVisible minHeight="180px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <UnicodeGlossarySection />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('compatibility') && (
        <LazyOnVisible minHeight="180px">
          <Suspense fallback={<div className="h-28 animate-pulse bg-slate-100 rounded-3xl" />}>
            <CompatibilitySection />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('signatureGenerator') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <SignatureGeneratorSection currentText={globalText} onApplyText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('couplesGenerator') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <CouplesNameGeneratorSection onApplyText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('specialOccasions') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <SpecialOccasionsPhrasesSection onApplyText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('decoratorsGallery') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <TextDecoratorsGallery currentText={globalText} onApplyText={onApplyText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('glyphInspector') && (
        <LazyOnVisible minHeight="200px">
          <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl" />}>
            <GlyphInspectorSection currentText={globalText} />
          </Suspense>
        </LazyOnVisible>
      )}

      {isEnabled('userRatings') && (
        <LazyOnVisible minHeight="160px">
          <Suspense fallback={<div className="h-24 animate-pulse bg-slate-100 rounded-3xl" />}>
            <UserRatingsSection />
          </Suspense>
        </LazyOnVisible>
      )}

      {/* 3. Cross-Silo Internal Linking */}
      <div className="mt-8">
        <RelatedSilosSection currentRoute={currentRoute} onRouteChange={onRouteChange} />
      </div>
    </div>
  );
};

export default AuxiliarySections;
