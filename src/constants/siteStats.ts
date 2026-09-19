import { FONT_GENERATORS } from '../utils/unicodeConverters';

/**
 * Single source of truth for site-wide font statistics.
 * Prevents drift and discrepancies across UI components, headers, and metadata.
 */
export const FONT_COUNT = FONT_GENERATORS.length;
export const FONT_COUNT_PLUS = `${Math.floor(FONT_COUNT / 10) * 10}+`;
