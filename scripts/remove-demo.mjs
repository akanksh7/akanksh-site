// Lists demo content (filename starts "demo-", tag "demo", or "placeholder" in the title). Pass --yes to delete.
import fs from 'node:fs'; import path from 'node:path';
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const hits = walk('src/content').filter(f => f.endsWith('.md')).filter(f => { const t = fs.readFileSync(f, 'utf8'); return path.basename(f).startsWith('demo-') || /^tags:.*\bdemo\b/m.test(t) || /^title:.*placeholder/im.test(t); });
hits.forEach(f => console.log(process.argv.includes('--yes') ? 'delete' : 'would delete', f));
if (process.argv.includes('--yes')) hits.forEach(f => fs.unlinkSync(f)); else console.log('Dry run. Re-run with --yes to delete. Also edit src/config.ts profile placeholders.');
