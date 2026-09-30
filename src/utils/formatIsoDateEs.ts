const SPANISH_MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export function formatIsoDateEs(date?: string | null): string {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'Sin fecha registrada';
  const [year, month, day] = date.split('-').map(Number);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return date;
  return `${day} de ${SPANISH_MONTHS[month - 1]} de ${year}`;
}
