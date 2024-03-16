import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webfontDownload from 'vite-plugin-webfont-dl'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      webfontDownload([
        'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
      ]),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      ...(mode === 'production' && {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          'vue-types': 'vue-types/shim',
        },
      }),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/_mixins.scss";`,
        },
      },
    },
  }
})
