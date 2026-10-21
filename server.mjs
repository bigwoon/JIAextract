import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const baseDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const jsDir = path.join(baseDir, 'static', 'js');
const cssDir = path.join(baseDir, 'static', 'css');

fs.mkdirSync(jsDir, { recursive: true });
fs.mkdirSync(cssDir, { recursive: true });

// Copy JS bundle
const srcJs = 'C:/Users/User/.gemini/antigravity-ide/brain/41e07e72-0908-4893-bae8-39ddf1d9187b/scratch/jia-app/main.07a82f92.js';
const dstJs = path.join(jsDir, 'main.07a82f92.js');
if (fs.existsSync(srcJs) && !fs.existsSync(dstJs)) {
  fs.copyFileSync(srcJs, dstJs);
  console.log('Copied main.07a82f92.js to', dstJs);
}

// Download CSS if missing
const dstCss = path.join(cssDir, 'main.e699ab20.css');
if (!fs.existsSync(dstCss)) {
  console.log('Fetching CSS...');
  const res = await fetch('https://app.jia-technologies.com/static/css/main.e699ab20.css');
  const css = await res.text();
  fs.writeFileSync(dstCss, css, 'utf8');
  console.log('Saved CSS (' + css.length + ' bytes)');
}

// Write index.html
const indexHtmlPath = path.join(baseDir, 'index.html');
const indexHtmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Jia Partner Web Portal (Localhost Replica)</title>
  <link href="https://fonts.googleapis.com/css?family=Red+Hat+Text:400,500,700&display=swap&subset=latin-ext" rel="stylesheet">
  <script defer="defer" src="https://kit.fontawesome.com/f2e7750c39.js" crossorigin="anonymous"></script>
  <script>
    HTMLCanvasElement.prototype.getContext = function(t) {
      return function(e, n) {
        n = n || {};
        n.preserveDrawingBuffer = true;
        return t.call(this, e, n);
      };
    }(HTMLCanvasElement.prototype.getContext);
  </script>
  <script defer="defer" src="/static/js/main.07a82f92.js"></script>
  <link href="/static/css/main.e699ab20.css" rel="stylesheet">
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>`;
fs.writeFileSync(indexHtmlPath, indexHtmlContent, 'utf8');
console.log('index.html ready at', indexHtmlPath);

// Create HTTP Server with SPA fallback
const PORT = 3030;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Normalize path
  let filePath = path.join(baseDir, reqPath === '/' ? 'index.html' : reqPath);

  // If path doesn't exist or is a directory, fallback to index.html for SPA routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(baseDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      });
      res.end(content);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`====================================================`);
  console.log(`🚀 Jia Localhost App is running at http://127.0.0.1:${PORT}`);
  console.log(`   Map View: http://127.0.0.1:${PORT}/map`);
  console.log(`====================================================`);
});
