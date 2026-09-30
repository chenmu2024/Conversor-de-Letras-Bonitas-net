export interface PlatformLengthReference {
  name: string;
  referenceMax: number;
  iconName: string;
  status: 'reference';
  lastVerified: null;
  sourceUrl: null;
}

export const PLATFORM_LENGTH_REFERENCES: PlatformLengthReference[] = [
  { name: 'Free Fire Nick', referenceMax: 12, iconName: 'FF', status: 'reference', lastVerified: null, sourceUrl: null },
  { name: 'TikTok Nombre', referenceMax: 30, iconName: 'TT', status: 'reference', lastVerified: null, sourceUrl: null },
  { name: 'TikTok Bio', referenceMax: 80, iconName: 'TT', status: 'reference', lastVerified: null, sourceUrl: null },
  { name: 'WhatsApp Info', referenceMax: 139, iconName: 'WA', status: 'reference', lastVerified: null, sourceUrl: null },
  { name: 'Instagram Bio', referenceMax: 150, iconName: 'IG', status: 'reference', lastVerified: null, sourceUrl: null },
  { name: 'Instagram Nombre', referenceMax: 30, iconName: 'IG', status: 'reference', lastVerified: null, sourceUrl: null },
  { name: 'Twitter / X Post', referenceMax: 280, iconName: 'X', status: 'reference', lastVerified: null, sourceUrl: null },
  { name: 'Discord Sobre Mí', referenceMax: 190, iconName: 'DC', status: 'reference', lastVerified: null, sourceUrl: null },
];

// These values are retained only as historical UI references.
// They are not presented as official current limits until an authoritative source
// and verification date are recorded for the corresponding entry.
