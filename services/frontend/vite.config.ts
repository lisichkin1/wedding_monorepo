import path from 'node:path';
import * as process from 'process';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'rollup';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

const hash = Math.floor(Math.random() * 90000) + 10000;

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: '/',
    plugins: [react(), svgr()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "${path.resolve(__dirname, 'src/app/styles/typography.scss').replace(/\\/g, '/')}"; 
        @import "${path.resolve(__dirname, 'src/app/styles/breakpoints.scss').replace(/\\/g, '/')}";`,
          api: 'modern-compiler',
          silenceDeprecations: [
            'import',
            'global-builtin',
            'legacy-js-api',
            'color-functions'
          ]
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@widgets': path.resolve(__dirname, './src/widgets'),
        '@features': path.resolve(__dirname, './src/features'),
        '@entities': path.resolve(__dirname, './src/entities'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@modules': path.resolve(__dirname, './src/modules')
      }
    },
    server: {
      proxy: {
        '/facts': {
          target: env.VITE_ORGSTRUCT_HOST,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/orgstruct-api/, '')
        }
      }
    },
    build: {
      target: 'esnext',

      rollupOptions: {
        output: {
          entryFileNames: '[name]' + hash + '.js',
          chunkFileNames: '[name]' + hash + '.js',
          assetFileNames: '[name]' + hash + '.[ext]'
        },
        plugins: [
          visualizer({
            open: false,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true
          }) as Plugin
        ]
      },
      assetsInlineLimit: 4096
    }
  };
});
