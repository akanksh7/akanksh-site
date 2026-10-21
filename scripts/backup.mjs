// Creates a complete, restorable Git bundle (all branches, full history).
import { execFileSync } from 'node:child_process';
const f = `akanksh-backup-${new Date().toISOString().slice(0, 10)}.bundle`;
execFileSync('git', ['bundle', 'create', f, '--all'], { stdio: 'inherit' }); execFileSync('git', ['bundle', 'verify', f], { stdio: 'inherit' }); console.log('Wrote', f);
