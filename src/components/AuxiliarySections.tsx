import React, { Suspense, lazy } from 'react';
import { PageRoute } from '../types';

// Code-split each individual auxiliary section so they are only downloaded when needed
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
const RegionalSearchTerms = lazy(() => import('./RegionalSearchTerms').then(m => ({ default: m.RegionalSearchTerms })));
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
const InvisibleSpaceSection = lazy(() => import('./InvisibleSpaceSection').then(m => ({ default: m.InvisibleSpaceSection })));
const SeoContent = lazy(() => import('./SeoContent').then(m => ({ default: m.SeoContent })));
const UserRatingsSection = lazy(() => import('./UserRatingsSection').then(m => ({ default: m.UserRatingsSection })));
const RelatedSilosSection = lazy(() => import('./RelatedSilosSection').then(m => ({ default: m.RelatedSilosSection })));
const TableOfContents = lazy(() => import('./TableOfContents').then(m => ({ default: m.TableOfContents })));

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
  return (
    <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 rounded-3xl my-8" />}>
      {/* Espacio Invisible Quick Tool */}
      <div className="mt-8 mb-8">
        <InvisibleSpaceCard />
      </div>

      {/* Table of Contents */}
      <TableOfContents />

      {/* Text Decorator */}
      {(currentRoute === 'decorador' || currentRoute === 'inicio') && (
        <div className="mb-8">
          <TextDecorator
            initialText={globalText}
            onApplyGlobalText={onApplyText}
          />
        </div>
      )}

      {/* Platform Preview Simulator */}
      <div id="preview-simulator-section" className="mb-8">
        <PlatformPreview
          text={previewText}
          fontName={previewFontName}
          currentRoute={currentRoute}
        />
      </div>

      {/* Alphabet Reference */}
      {(currentRoute === 'cursiva' || currentRoute === 'goticas' || currentRoute === 'circulos' || currentRoute === 'inicio') && (
        <div className="mb-8">
          <AlphabetReference />
        </div>
      )}

      {/* Symbols Library */}
      {(currentRoute === 'inicio' || currentRoute === 'decorador' || currentRoute === 'simbolos') && (
        <div className="mb-8">
          <SymbolsLibrary onApplyText={onApplyText} />
        </div>
      )}

      {/* Single Letter Explorer */}
      <SingleLetterExplorer />

      {/* Ready Bio Templates */}
      <ReadyBioTemplates />

      {/* Safety and Unicode Guide */}
      <SafetyAndUnicodeGuide />

      {/* Cross Platform Glyph Matrix */}
      <CrossPlatformGlyphMatrix />

      {/* Editorial Typography Masterclass */}
      <EditorialTypographyMasterclass onRouteChange={onRouteChange} />

      {/* Advanced Guide and Tips */}
      <div className="mb-8">
        <AdvancedGuideAndTips />
      </div>

      {/* Ready Nicknames Section */}
      <ReadyNicknamesSection onApplyText={onApplyText} />

      {/* Regional Search Terms */}
      <RegionalSearchTerms onApplyText={onApplyText} />

      {/* Popular Spanish Names */}
      <PopularNamesSection onSelectName={onApplyText} />

      {/* Symbol Matrix */}
      <SymbolMatrixSection onInsertSymbol={(s) => onApplyText(globalText ? `${globalText} ${s}` : s)} />

      {/* Full A-Z Alphabet Table */}
      <AlphabetTableSection />

      {/* Unicode Glossary */}
      <UnicodeGlossarySection />

      {/* Technical Compatibility */}
      <CompatibilitySection />

      {/* Signature Generator */}
      <SignatureGeneratorSection
        currentText={globalText}
        onApplyText={onApplyText}
      />

      {/* Couple Name Generator */}
      <CouplesNameGeneratorSection onApplyText={onApplyText} />

      {/* Bio Templates Section */}
      <BioTemplatesSection onApplyText={onApplyText} />

      {/* Special Occasion Phrases */}
      <SpecialOccasionsPhrasesSection onApplyText={onApplyText} />

      {/* Text Decorators Gallery */}
      <TextDecoratorsGallery
        currentText={globalText}
        onApplyText={onApplyText}
      />

      {/* Glyph Inspector */}
      <GlyphInspectorSection currentText={globalText} />

      {/* Invisible Space Section */}
      <InvisibleSpaceSection />

      {/* SEO Content */}
      <div className="mt-12">
        <SeoContent currentRoute={currentRoute} />
      </div>

      {/* User Ratings */}
      <UserRatingsSection />

      {/* Related Silos */}
      <RelatedSilosSection currentRoute={currentRoute} onRouteChange={onRouteChange} />
    </Suspense>
  );
};
export default AuxiliarySections;
