import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/wpfeatureloop.js'),
      name: 'WPFeatureLoop',
      fileName: (format) => `wpfeatureloop.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'wpfeatureloop.[ext]'
      }
    },
    minify: 'esbuild',
    sourcemap: true
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.js']
    }
  }
});
