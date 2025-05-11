import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    title: 'ToDo App with Yjs',
  },
  output: {
    assetPrefix: '/2025-05-11-collaborative-todo-app-with-yjs/',
  },
  plugins: [pluginReact()],
})
