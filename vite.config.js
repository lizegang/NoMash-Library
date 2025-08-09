import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
// eslint-disable-next-line no-undef
module.exports = {
 
  // eslint-disable-next-line no-undef
  publicPath: process.env.NODE_ENV === 'production'
    ? '/NoMash-Library/'  
    : '/'
}