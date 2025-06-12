import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { CustomPagesPlugin } from './src/next-style-pages-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [CustomPagesPlugin(), react()],
})
