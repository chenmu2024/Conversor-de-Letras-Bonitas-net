export type PlatformReferenceStatus = 'reference' | 'verified';

export interface PlatformLengthReference {
  name: string;
  referenceMax: number;
  iconName: string;
  status: PlatformReferenceStatus;
  lastVerified: string | null;
  sourceUrl: string | null;
  sourceTitle: string | null;
  scopeNote: string | null;
}

export const PLATFORM_LENGTH_REFERENCES: PlatformLengthReference[] = [
  { name: 'Free Fire Nick', referenceMax: 12, iconName: 'FF', status: 'reference', lastVerified: null, sourceUrl: null, sourceTitle: null, scopeNote: null },
  { name: 'TikTok Nombre', referenceMax: 30, iconName: 'TT', status: 'reference', lastVerified: null, sourceUrl: null, sourceTitle: null, scopeNote: null },
  { name: 'TikTok Bio', referenceMax: 80, iconName: 'TT', status: 'reference', lastVerified: null, sourceUrl: null, sourceTitle: null, scopeNote: null },
  { name: 'WhatsApp Info', referenceMax: 139, iconName: 'WA', status: 'reference', lastVerified: null, sourceUrl: null, sourceTitle: null, scopeNote: null },
  { name: 'Instagram Bio', referenceMax: 150, iconName: 'IG', status: 'reference', lastVerified: null, sourceUrl: null, sourceTitle: null, scopeNote: null },
  { name: 'Instagram Nombre', referenceMax: 30, iconName: 'IG', status: 'reference', lastVerified: null, sourceUrl: null, sourceTitle: null, scopeNote: null },
  {
    name: 'Twitter / X Post',
    referenceMax: 280,
    iconName: 'X',
    status: 'verified',
    lastVerified: '2026-09-30',
    sourceUrl: 'https://help.x.com/en/using-x/how-to-post',
    sourceTitle: 'How to Post | X Help Center',
    scopeNote: 'Referencia para publicaciones estándar; X Premium permite publicaciones más largas.',
  },
  { name: 'Discord Sobre Mí', referenceMax: 190, iconName: 'DC', status: 'reference', lastVerified: null, sourceUrl: null, sourceTitle: null, scopeNote: null },
];

// Entries with status "reference" are retained as historical UI references only.
// They must not be described as official current limits until an authoritative source,
// scope and verification date are recorded. "verified" means the stated scope is
// supported by the linked source as of lastVerified; it is not a guarantee that the
// platform will never change the rule.
