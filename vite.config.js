import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'vite-plugin-copy';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  copy({
    targets: [
      { src: '_redirects', dest: 'dist' }
    ],
    hook: 'writeBundle' // ensures the file is copied after the bundle is written
  })
  ],
})
