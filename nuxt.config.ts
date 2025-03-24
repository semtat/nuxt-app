import fs from 'fs';
import path from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  nitro: {
    storage: {
      data: {
        driver: 'fs',
        base: './server/data' // Указываем путь к папке с данными
      }
    },
    hooks: {
      'build:before': () => {
        const sourcePath = path.resolve(process.cwd(), 'server/data/users.json')
        const destPath = path.resolve(process.cwd(), '.output/server/data/users.json')

        if (!fs.existsSync(sourcePath)) {
          throw new Error(`Файл ${sourcePath} не найден!`)
        }

        const destDir = path.dirname(destPath)
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true })
        }

        fs.copyFileSync(sourcePath, destPath)
      }
    }
  }
});