export function formatDate(date?: string): string {
  if (!date || date === 'Coming Soon') return date ?? 'Coming Soon';

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
