import React from 'react';
import { PageRoute } from '../types';
import { InvisibleSpaceCard } from './InvisibleSpaceCard';
import { TextDecorator } from './TextDecorator';
import { PlatformPreview } from './PlatformPreview';
import { AlphabetReference } from './AlphabetReference';
import { SymbolsLibrary } from './SymbolsLibrary';
import { SingleLetterExplorer } from './SingleLetterExplorer';
import { ReadyBioTemplates } from './ReadyBioTemplates';
import { SafetyAndUnicodeGuide } from './SafetyAndUnicodeGuide';
import { CrossPlatformGlyphMatrix } from './CrossPlatformGlyphMatrix';
import { EditorialTypographyMasterclass } from './EditorialTypographyMasterclass';
import { AdvancedGuideAndTips } from './AdvancedGuideAndTips';
import { ReadyNicknamesSection } from './ReadyNicknamesSection';
import { RegionalSearchTerms } from './RegionalSearchTerms';
import { PopularNamesSection } from './PopularNamesSection';
import { SymbolMatrixSection } from './SymbolMatrixSection';
import { AlphabetTableSection } from './AlphabetTableSection';
import { UnicodeGlossarySection } from './UnicodeGlossarySection';
import { CompatibilitySection } from './CompatibilitySection';
import { SignatureGeneratorSection } from './SignatureGeneratorSection';
import { CouplesNameGeneratorSection } from './CouplesNameGeneratorSection';
import { BioTemplatesSection } from './BioTemplatesSection';
import { SpecialOccasionsPhrasesSection } from './SpecialOccasionsPhrasesSection';
import { TextDecoratorsGallery } from './TextDecoratorsGallery';
import { GlyphInspectorSection } from './GlyphInspectorSection';
import { InvisibleSpaceSection } from './InvisibleSpaceSection';
import { SeoContent } from './SeoContent';
import { UserRatingsSection } from './UserRatingsSection';
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
  return (
    <>
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
    </>
  );
};
export default AuxiliarySections;
