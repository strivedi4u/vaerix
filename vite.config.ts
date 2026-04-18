import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const GITHUB_PAGES_REPO = 'vaerix'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === 'pages'

  return {
    plugins: [react()],
    base: isGitHubPages ? `/${GITHUB_PAGES_REPO}/` : '/',
    build: {
      outDir: isGitHubPages ? 'docs' : 'dist',
    },
  }
})
