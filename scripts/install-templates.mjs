#!/usr/bin/env node
/**
 * Copy / print soul pack templates into $DSH_HOME/agents/default/.
 * Never writes secrets. Requires DSH_HOME for --apply.
 *
 *   node scripts/install-templates.mjs              # dry print
 *   node scripts/install-templates.mjs --dry        # same
 *   node scripts/install-templates.mjs --apply
 *   node scripts/install-templates.mjs --uninstall --apply
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const apply = process.argv.includes('--apply');
const uninstall = process.argv.includes('--uninstall');
const dry = process.argv.includes('--dry') || !apply;

const files = ['soul.md', 'user.md', 'agent.md'];
const host = '@deepseek-ai/dsh@0.2.1-rc.5';
const destRel = 'agents/default';

console.log(`# agent-soul-pack · ${uninstall ? 'uninstall' : 'install'} templates`);
console.log(`# Host tip: ${host}`);
console.log('# Engine: npm dsh-soul-md (install separately; see docs/wire-dsh-soul-md.md)');
console.log('# Credentials: never in this repo.');
console.log('');
console.log('export DSH_HOME="${DSH_HOME:-$HOME/.agent-soul-pack-dsh}"');
console.log('mkdir -p "$DSH_HOME"');
console.log('');

const dshHome = process.env.DSH_HOME || null;
const destDir = dshHome ? join(dshHome, destRel) : join('$DSH_HOME', destRel);

for (const name of files) {
  const src = join(root, 'templates', name);
  const dst = dshHome ? join(destDir, name) : `$DSH_HOME/${destRel}/${name}`;
  if (uninstall) {
    console.log(`# rm -f ${dst}`);
  } else {
    console.log(`# cp ${src} → ${dst}`);
  }
}

console.log('');
console.log('# Then: dsh plugin --profile web add dsh-soul-md');
console.log('# Paste templates/soul.md into a persona card (plugin UI).');
console.log('# Reverse: npm run uninstall:templates -- --apply  OR  rm -rf "$DSH_HOME"');
console.log('');

if (dry && !apply) {
  console.log('# Dry print only. Re-run with --apply to copy/remove files.');
  process.exit(0);
}

if (!process.env.DSH_HOME) {
  console.error('[install] Refusing --apply without DSH_HOME (set a dedicated directory).');
  process.exit(1);
}

const outDir = join(process.env.DSH_HOME, destRel);
if (uninstall) {
  for (const name of files) {
    const p = join(outDir, name);
    if (existsSync(p)) {
      unlinkSync(p);
      console.log(`[install] removed ${p}`);
    } else {
      console.log(`[install] skip (missing) ${p}`);
    }
  }
  console.log('[install] uninstall done');
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });
for (const name of files) {
  const src = join(root, 'templates', name);
  const dst = join(outDir, name);
  writeFileSync(dst, readFileSync(src, 'utf8'));
  console.log(`[install] wrote ${dst}`);
}
console.log('[install] apply done. Wire plugin: see docs/wire-dsh-soul-md.md');
