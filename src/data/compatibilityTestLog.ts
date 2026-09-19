export interface CompatibilityTestRecord {
  id: string;
  styleId: string;
  platform:
    | 'android'
    | 'ios'
    | 'instagram'
    | 'whatsapp'
    | 'tiktok'
    | 'freeFire'
    | 'chrome'
    | 'safari';
  testedAt: string;
  device?: string;
  osVersion?: string;
  appVersion?: string;
  input: string;
  result: 'pass' | 'partial' | 'fail';
  notes?: string;
  evidence?: string;
}

/**
 * Registro oficial de pruebas empíricas manuales documentadas.
 * Únicamente los estilos y plataformas con registros reales aquí pueden marcarse con status: 'verified'.
 */
export const COMPATIBILITY_TEST_LOG: CompatibilityTestRecord[] = [];
