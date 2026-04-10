import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = fileURLToPath(new URL('.', import.meta.url))

const MIME = {
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.mp4':  'video/mp4',
}

export default defineConfig({
  plugins: [
    // Disable transformAssetUrls so Vue never generates static `import _imports_N`
    // for image/video paths. All assets are served at runtime by the middleware below.
    vue({
      template: {
        transformAssetUrls: false,
      },
    }),
    {
      name: 'serve-project-images',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Decode percent-encoded paths (e.g. %20 → space) before file lookup
          const raw = req.url?.split('?')[0] ?? ''
          const url = decodeURIComponent(raw)
          if (!url.startsWith('/images/')) return next()
          const filePath = path.join(ROOT, url)
          if (!fs.existsSync(filePath)) return next()
          const ext = path.extname(filePath).toLowerCase()
          res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
          fs.createReadStream(filePath).pipe(res)
        })
      },
    },
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  resolve: {
    alias: { '@': path.resolve(ROOT, 'src') },
  },
})
