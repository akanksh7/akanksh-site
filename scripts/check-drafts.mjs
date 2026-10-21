// Post-build: fail if any draft entry's slug or title appears in dist/.
import fs from 'node:fs'; import path from 'node:path';
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const drafts = walk('src/content').filter(f => f.endsWith('.md')).map(f => ({ f, t: fs.readFileSync(f, 'utf8') })).filter(x => /^draft:\s*true/m.test(x.t))
  .map(x => ({ slug: path.basename(x.f, '.md'), title: (x.t.match(/^title:\s*"?(.+?)"?\s*$/m) || [])[1] }));
const out = walk('dist'); const bad = [];
for (const d of drafts) for (const f of out) {
  if (f.split(path.sep).includes(d.slug)) bad.push(`${f}: path contains draft slug`);
  else if (/\.(html|xml|json|txt)$/.test(f) && d.title && fs.readFileSync(f, 'utf8').includes(d.title)) bad.push(`${f}: contains draft title "${d.title}"`);
}
bad.forEach(b => console.error('LEAK', b)); console.log(`draft check: ${drafts.length} draft(s), ${bad.length} leak(s)`); process.exit(bad.length ? 1 : 0);
