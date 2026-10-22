// Checks: internal links to missing/draft entries, photo files exist, required photo fields.
import fs from 'node:fs'; import path from 'node:path';
const root = 'src/content'; const cfg = fs.readFileSync('src/config.ts', 'utf8');
const base = (cfg.match(/base:\s*'([^']*)'/) || [, ''])[1];
const colToSection = { writing: 'writing', projects: 'projects', notes: 'knowledge', experiments: 'experiments', reading: 'reading', logs: 'motorcycle', timeline: 'timeline' };
const files = []; for (const col of fs.readdirSync(root)) { const d = path.join(root, col); if (fs.statSync(d).isDirectory()) for (const f of fs.readdirSync(d)) if (f.endsWith('.md')) files.push({ col, id: f.slice(0, -3), file: path.join(d, f), text: fs.readFileSync(path.join(d, f), 'utf8') }); }
const known = new Map(); for (const f of files) if (colToSection[f.col]) known.set(`${colToSection[f.col]}/${f.id}`, !/^draft:\s*true/m.test(f.text));
const errs = [], warns = [];
for (const f of files) {
  for (const m of f.text.matchAll(/\]\((?:\/[^/)]*\/)?(?:\.\/)?\/?(writing|projects|knowledge|experiments|reading|motorcycle|timeline)\/([^/)#\s]+)/g)) {
    const k = `${m[1]}/${m[2]}`; if (!known.has(k)) errs.push(`${f.file}: broken link to ${k}`); else if (!known.get(k) && !/^draft:\s*true/m.test(f.text)) errs.push(`${f.file}: published entry links to draft ${k}`);
  }
  const tl = (f.text.match(/^link:\s*"?\/?([a-z]+)\/([^"\s\/]+)/m) || []); if (f.col === 'timeline' && tl[1] && !known.has(`${tl[1]}/${tl[2]}`)) errs.push(`${f.file}: timeline link target missing ${tl[1]}/${tl[2]}`);
  if (f.col === 'photos') { const img = (f.text.match(/^image:\s*"?([^"\n]+)"?/m) || [])[1]; if (!img) errs.push(`${f.file}: missing image`); else { const rel = img.replace(base, ''); if (!fs.existsSync(path.join('public', rel))) errs.push(`${f.file}: image not found public${rel}`); } if (!/^alt:\s*\S/m.test(f.text)) errs.push(`${f.file}: missing alt text`); }
}
warns.forEach(w => console.warn('WARN', w)); errs.forEach(e => console.error('ERROR', e));
console.log(`validated ${files.length} content files, ${errs.length} error(s)`); process.exit(errs.length ? 1 : 0);
