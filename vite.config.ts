import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import PagesPlugin from './src/next-style-pages-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [PagesPlugin(), react()],
  define: {
    'process.env': process.env,
  },
})
