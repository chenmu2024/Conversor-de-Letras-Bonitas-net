import React, { Suspense, lazy } from 'react';
import { FontGenerator, FavoriteItem } from '../types';

// Lazy load modals that are only opened on user click
const BatchCopyModal = lazy(() => import('./BatchCopyModal').then(m => ({ default: m.BatchCopyModal })));
const VisualComparator = lazy(() => import('./VisualComparator').then(m => ({ default: m.VisualComparator })));
const StyleMixerModal = lazy(() => import('./StyleMixerModal').then(m => ({ default: m.StyleMixerModal })));
const LivePreviewSimulator = lazy(() => import('./LivePreviewSimulator').then(m => ({ default: m.LivePreviewSimulator })));
const UnicodeFixerModal = lazy(() => import('./UnicodeFixerModal').then(m => ({ default: m.UnicodeFixerModal })));
const PosterGeneratorModal = lazy(() => import('./PosterGeneratorModal').then(m => ({ default: m.PosterGeneratorModal })));
const TextImageExportModal = lazy(() => import('./TextImageExportModal').then(m => ({ default: m.TextImageExportModal })));
const ShareModal = lazy(() => import('./ShareModal').then(m => ({ default: m.ShareModal })));

interface FontConverterModalsProps {
  batchModalOpen: boolean;
  onCloseBatchModal: () => void;
  comparatorOpen: boolean;
  onCloseComparator: () => void;
  mixerOpen: boolean;
  onCloseMixer: () => void;
  simulatorModalOpen: boolean;
  onCloseSimulatorModal: () => void;
  fixerModalOpen: boolean;
  onCloseFixerModal: () => void;
  posterModalOpen: boolean;
  onClosePosterModal: () => void;
  imageExportData: { text: string; fontName: string } | null;
  onCloseImageExport: () => void;
  shareModalData: { text: string; fontName?: string } | null;
  onCloseShareModal: () => void;
  inputText: string;
  filteredFonts: FontGenerator[];
  allFonts: FontGenerator[];
  onApplyText: (text: string) => void;
}

export const FontConverterModals: React.FC<FontConverterModalsProps> = ({
  batchModalOpen,
  onCloseBatchModal,
  comparatorOpen,
  onCloseComparator,
  mixerOpen,
  onCloseMixer,
  simulatorModalOpen,
  onCloseSimulatorModal,
  fixerModalOpen,
  onCloseFixerModal,
  posterModalOpen,
  onClosePosterModal,
  imageExportData,
  onCloseImageExport,
  shareModalData,
  onCloseShareModal,
  inputText,
  filteredFonts,
  allFonts,
  onApplyText,
}) => {
  return (
    <Suspense fallback={null}>
      {batchModalOpen && (
        <BatchCopyModal
          isOpen={batchModalOpen}
          onClose={onCloseBatchModal}
          inputText={inputText}
          generators={filteredFonts}
        />
      )}

      {comparatorOpen && (
        <VisualComparator
          isOpen={comparatorOpen}
          onClose={onCloseComparator}
          inputText={inputText}
          generators={allFonts}
        />
      )}

      {mixerOpen && (
        <StyleMixerModal
          isOpen={mixerOpen}
          onClose={onCloseMixer}
          inputText={inputText}
        />
      )}

      {simulatorModalOpen && (
        <LivePreviewSimulator
          isOpen={simulatorModalOpen}
          onClose={onCloseSimulatorModal}
          inputText={inputText}
        />
      )}

      {fixerModalOpen && (
        <UnicodeFixerModal
          isOpen={fixerModalOpen}
          onClose={onCloseFixerModal}
          text={inputText}
          onRepair={onApplyText}
        />
      )}

      {posterModalOpen && (
        <PosterGeneratorModal
          isOpen={posterModalOpen}
          onClose={onClosePosterModal}
          initialText={inputText || '𝓥𝓲𝓿𝓮, 𝓼𝓾𝓮ñ𝓪, 𝓿𝓲𝓪𝓳𝓪 ✨'}
        />
      )}

      {imageExportData && (
        <TextImageExportModal
          isOpen={!!imageExportData}
          onClose={onCloseImageExport}
          text={imageExportData.text}
          fontName={imageExportData.fontName}
        />
      )}

      {shareModalData && (
        <ShareModal
          isOpen={!!shareModalData}
          onClose={onCloseShareModal}
          text={shareModalData.text}
          fontName={shareModalData.fontName}
        />
      )}
    </Suspense>
  );
};
