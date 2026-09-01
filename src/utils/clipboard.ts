/**
 * Cross-platform robust clipboard copy utility with fallback for iOS Safari,
 * in-app webviews (Instagram, TikTok, WhatsApp, Facebook), and iframe sandboxes.
 */

export async function copyToClipboard(
  text: string,
  fontName: string = 'Texto Especial'
): Promise<boolean> {
  if (!text) return false;

  let success = false;

  // 1. Try modern navigator.clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText failed, attempting execCommand fallback:', err);
    }
  }

  // 2. Fallback to execCommand for WebViews, older Safari or permission-restricted environments
  if (!success && typeof document !== 'undefined') {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Prevent scrolling to bottom of screen in iOS
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.style.opacity = '0.01';
      textArea.setAttribute('readonly', '');
      
      document.body.appendChild(textArea);
      textArea.focus({ preventScroll: true });
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices

      const executed = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (executed) {
        success = true;
      }
    } catch (fallbackErr) {
      console.warn('execCommand copy fallback failed:', fallbackErr);
    }
  }

  // 3. Dispatch global copy event and trigger haptic feedback if successful
  if (success) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(35);
      } catch {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('font-copied', {
          detail: { text, fontName },
        })
      );
    }
  }

  return success;
}
