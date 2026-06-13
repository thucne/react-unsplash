import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  tsconfig: 'tsconfig.lib.json',
  loader: {
    '.svg': 'dataurl',
    '.jpg': 'dataurl',
    '.png': 'dataurl',
    '.css': 'copy',
  },
  onSuccess: async () => {
    // Copy CSS to dist root for the "./styles" export
    try {
      mkdirSync(resolve('dist'), { recursive: true })
      copyFileSync(
        resolve('src/styles/react-unsplash.css'),
        resolve('dist/react-unsplash.css')
      )
      console.log('✓ CSS copied to dist/react-unsplash.css')
    } catch (e) {
      console.warn('Could not copy CSS:', e)
    }
  },
})
