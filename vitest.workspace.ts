import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: "frontend/vite.config.ts",
    test: {
      name: 'frontend',
      root: 'frontend',
      environment: "jsdom",
      globals: true
    }
  },
  {
    test: {
      name: 'backend',
      root: 'backend',
      environment: "node",
      globals: true
    }
  }
])
