import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        documentation: resolve(__dirname, 'documentation.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
  plugins: [
    {
      name: 'html-ext-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && !req.url.includes('.') && req.url !== '/') {
            const htmlPath = resolve(__dirname, `${req.url.split('?')[0].slice(1)}.html`);
            if (fs.existsSync(htmlPath)) {
              req.url = `${req.url.split('?')[0]}.html`;
            }
          }
          next();
        });
      },
    },
  ],
  appType: 'mpa',
});
