// Edit everything here. URLs are placeholders.
export const site = {
  name: 'AKANKSH', url: 'https://akanksh7.github.io', base: '/akanksh-site',
  bio: 'Placeholder bio. Replace with your own.',
  links: { github: 'https://github.com/akanksh7', linkedin: 'https://linkedin.com/in/YOURUSER', email: 'mailto:you@example.com' },
};
export const sections = { writing: 'Blogs', projects: 'Projects', reading: 'Reading', motorcycle: 'Motorcycle', timeline: 'Timeline' } as const;
export const colOf: Record<string, string> = { motorcycle: 'logs' };
// About-page data. All values are placeholders: replace, do not trust.
export const profile = {
  github: 'akanksh7',          // public repos are fetched client-side only when this is changed
  resume: '',                  // e.g. '/resume.pdf' after placing the file in public/
  interests: ['Placeholder interest'],
  experience: [{ role: 'Role title (placeholder)', org: 'Organisation', period: 'Years', note: 'Replace with your real history.' }],
  education: [{ what: 'Degree or course (placeholder)', org: 'Institution', period: 'Years' }],
};
// Icon paths (24x24 stroke icons) used by the nav and homepage tiles.
export const icons: Record<string, string> = {
  writing: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  projects: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  reading: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  motorcycle: '<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17l4-8h5l4 8M9.5 9L8 6H6M14.5 9l1-3h2"/>',
  photos: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  timeline: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
};
