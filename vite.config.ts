import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from .env file
  // Fix: Replaced `process.cwd()` with an empty string to fix a TypeScript type error.
  // Vite's `loadEnv` resolves an empty string to the project root.
  const env = loadEnv(mode, '', '');
  return {
    plugins: [react()],
    build: {
      outDir: 'build'
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})