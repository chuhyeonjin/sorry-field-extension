import { readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import pkg from '../package.json' assert { type: 'json' };
function clearDistFolder() {
  const files = readdirSync('./dist');
  for (const file of files) {
    rmSync(join('./dist', file), { recursive: true });
  }
}
clearDistFolder();

function manifestTransformer(content: string) {
  return content.replace(/\$\{version\}/g, pkg.version);
}
const manifest = readFileSync('./static/manifest.json', 'utf-8');
const transformedManifest = manifestTransformer(manifest);
writeFileSync('./dist/manifest.json', transformedManifest);

writeFileSync('./dist/icon1024.png', readFileSync('./static/icon1024.png'));
