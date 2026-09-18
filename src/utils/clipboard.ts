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
      // Prevent scrolling and multiple DOM reflows with a single cssText assignment
      textArea.style.cssText = 'position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;box-shadow:none;background:transparent;opacity:0.001;pointer-events:none;';
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
