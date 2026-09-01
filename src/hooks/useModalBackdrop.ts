import { useEffect } from 'react';

/**
 * Hook to handle mobile physical/gesture back button for modals.
 * When modal opens, pushes a hash state. If user presses Back button, closes modal instead of navigating away.
 */
export function useModalBackdrop(isOpen: boolean, onClose: () => void, modalId: string = 'modal') {
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const hashTag = `#${modalId}-active`;
    const previousHash = window.location.hash;

    // Push dummy state to capture back button
    try {
      window.history.pushState({ modalOpen: modalId }, '', window.location.pathname + window.location.search + hashTag);
    } catch {}

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    // Also close on ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);

      // Clean up history state if closed via X button / click outside
      if (window.location.hash === hashTag) {
        try {
          window.history.back();
        } catch {}
      }
    };
  }, [isOpen, onClose, modalId]);
}
