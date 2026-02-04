#!/usr/bin/env node
/**
 * Inject minified CSS into the JS source file
 *
 * This script reads the minified CSS and injects it into wpfeatureloop.js
 * so you only need to edit the CSS file and run build.
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Paths
const cssPath = join(rootDir, 'src/wpfeatureloop.css');
const jsPath = join(rootDir, 'src/wpfeatureloop.js');
const tempCssPath = join(rootDir, '.temp-minified.css');

console.log('Injecting styles into JS...');

// Minify CSS using lightningcss
execSync(`npx lightningcss --minify ${cssPath} -o ${tempCssPath}`, { cwd: rootDir });

// Read minified CSS
const minifiedCss = readFileSync(tempCssPath, 'utf-8').trim();

// Read JS file
let jsContent = readFileSync(jsPath, 'utf-8');

// Replace the styles constant using regex
// Matches: const styles = `...`;
const stylesRegex = /const styles = `[^`]*`;/;

if (!stylesRegex.test(jsContent)) {
  console.error('Could not find styles constant in JS file');
  process.exit(1);
}

jsContent = jsContent.replace(stylesRegex, `const styles = \`${minifiedCss}\`;`);

// Write updated JS
writeFileSync(jsPath, jsContent);

// Clean up temp file
execSync(`rm ${tempCssPath}`, { cwd: rootDir });

console.log('Styles injected successfully!');
