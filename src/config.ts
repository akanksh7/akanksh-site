// Edit everything here. URLs are placeholders.
export const site = {
  name: 'AKANKSH', url: 'https://akanksh7.github.io', base: '/akanksh-site',
  bio: 'Placeholder bio. Replace with your own.',
  links: { github: 'https://github.com/akanksh7', linkedin: 'https://linkedin.com/in/akankshcodes', email: 'mailto:i.am.akanksh@gmail.com' },
};
export const sections = { writing: 'Writing', projects: 'Projects', knowledge: 'Knowledge', experiments: 'Experiments', reading: 'Reading', logs: 'Logs', timeline: 'Timeline' } as const;
export const nav = ['writing', 'projects', 'knowledge'] as const;
export const colOf: Record<string, string> = { knowledge: 'notes' };
// About-page data. All values are placeholders: replace, do not trust.
export const profile = {
  github: 'akanksh7',          // public repos are fetched client-side only when this is changed
  resume: '',                  // e.g. '/resume.pdf' after placing the file in public/
  interests: ['Placeholder interest'],
  experience: [{ role: 'Role title (placeholder)', org: 'Organisation', period: 'Years', note: 'Replace with your real history.' }],
  education: [{ what: 'Degree or course (placeholder)', org: 'Institution', period: 'Years' }],
};
