import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '@headlessui/react': 'path/to/installed/module',
    '@heroicons/react': 'path/to/installed/module'
  }
})
