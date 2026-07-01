// Compiles css/tailwind-input.css and assembles index.template.html + components/*.html
// into the published index.html. Run with: node build.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const root = __dirname;
const templatePath = path.join(root, 'index.template.html');
const outputPath = path.join(root, 'index.html');

execFileSync(
    path.join(root, 'node_modules', '.bin', 'tailwindcss'),
    ['-i', 'css/tailwind-input.css', '-o', 'css/styles.css', '--minify'],
    { cwd: root, stdio: 'inherit' }
);

const includeRegex = /<!--#include ([^\s]+)-->/g;

function resolveIncludes(content, baseDir) {
    return content.replace(includeRegex, (match, includePath) => {
        const fullPath = path.join(root, includePath);
        const includeContent = fs.readFileSync(fullPath, 'utf8');
        return resolveIncludes(includeContent, baseDir);
    });
}

// Content-hash query strings let js be cached as `immutable` for a year
// (see _headers) while still busting the cache the moment the file changes.
function hashOf(relPath) {
    const buf = fs.readFileSync(path.join(root, relPath));
    return crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);
}

// CSS is inlined (not linked) so the browser never has to make a render-blocking
// round trip for it - this is a single-page site, so there's no other page to
// benefit from a separately cached stylesheet anyway.
function postProcess(html) {
    const css = fs.readFileSync(path.join(root, 'css/styles.css'), 'utf8');
    return html
        .replace('<link rel="stylesheet" href="./css/styles.css"/>', `<style>${css}</style>`)
        .replace('./js/main.js"', `./js/main.js?v=${hashOf('js/main.js')}"`);
}

const template = fs.readFileSync(templatePath, 'utf8');
const assembled = postProcess(resolveIncludes(template, root));

const banner = '<!-- AUTO-GENERATED FILE. Edit components/*.html or index.template.html, then run `node build.js`. -->\n';

fs.writeFileSync(outputPath, banner + assembled);
console.log('Built index.html from index.template.html + components/');
