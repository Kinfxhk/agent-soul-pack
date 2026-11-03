#!/usr/bin/env node
/**
 * Local M0 gate: required files, template presence, dry install, no obvious secrets.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function fail(m) {
  console.error(`[check] FAIL: ${m}`);
  process.exit(1);
}
function ok(m) {
  console.log(`[check] OK: ${m}`);
}

const required = [
  'LICENSE',
  'NOTICE',
  'README.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'CHANGELOG.md',
  'CODE_OF_CONDUCT.md',
  'THIRD_PARTY_NOTICES.md',
  '.env.example',
  'package.json',
  'templates/soul.md',
  'templates/user.md',
  'templates/agent.md',
  'docs/wire-dsh-soul-md.md',
  'scripts/install-templates.mjs',
  'scripts/check.mjs',
];
for (const rel of required) {
  if (!existsSync(join(root, rel))) fail(`missing ${rel}`);
}
ok('required files');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
if (pkg.name !== 'agent-soul-pack') fail(`package.json name is ${pkg.name}`);
if (pkg.license !== 'MIT') fail('license must be MIT');
ok('package.json');

const readme = readFileSync(join(root, 'README.md'), 'utf8');
for (const needle of ['M0', 'dsh-soul-md', '0.2.1-rc.5', 'MIT', '無隸屬', 'Not affiliated']) {
  if (!readme.includes(needle)) fail(`README missing needle: ${needle}`);
}
ok('README needles');

// Ban competitor UI copy / product branding in templates (honest technical host pin OK in docs)
const brandBan = /\b(?:Grok Bot|ChatGPT|Claude\.ai)\b/i;
for (const name of ['soul.md', 'user.md', 'agent.md']) {
  const t = readFileSync(join(root, 'templates', name), 'utf8');
  if (t.length < 40) fail(`template too short: ${name}`);
  if (brandBan.test(t)) fail(`banned brand string in templates/${name}`);
  if (/sk-[a-zA-Z0-9]{20,}/.test(t)) fail(`key-like material in templates/${name}`);
}
ok('templates clean');

const wire = readFileSync(join(root, 'docs/wire-dsh-soul-md.md'), 'utf8');
if (!wire.includes('dsh-soul-md') || !wire.includes('0.2.1-rc.5')) {
  fail('wire doc must mention dsh-soul-md and host pin');
}
if (!wire.includes('agents/default') && !wire.includes('$DSH_HOME/agents')) {
  fail('wire doc must document agents path');
}
ok('wire doc');

const suspicious =
  /(?:sk-[a-zA-Z0-9]{20,}|api[_-]?key\s*[:=]\s*['\"][^'\"]+['\"]|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(md|json|ya?ml|mjs|js|example|toml|txt)$/i.test(name) || name === 'LICENSE' || name === 'NOTICE')
      out.push(p);
  }
  return out;
}
for (const file of walk(root)) {
  const text = readFileSync(file, 'utf8');
  if (suspicious.test(text)) fail(`suspicious secret-like material in ${file}`);
}
ok('no obvious secrets');

const dry = spawnSync(process.execPath, [join(root, 'scripts/install-templates.mjs'), '--dry'], {
  encoding: 'utf8',
});
if (dry.status !== 0) {
  console.error(dry.stdout);
  console.error(dry.stderr);
  fail('install-templates --dry failed');
}
ok('install-templates --dry');

console.log('[check] all green');
