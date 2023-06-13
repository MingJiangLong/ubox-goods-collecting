import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/

export default defineConfig({
  base: '/goods-collection-dev',
  plugins: [
    vue(),
    viteCompression(),
    legacy({
      targets: ['defaults', 'ie >= 11', 'chrome 52'],  //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }),
    // Components({
    //   resolvers: [VantResolver()],
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  build: {
    outDir: "../h5/goods-collection-dev",
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {

      output: {
        entryFileNames: 'assets/entry/[name][hash].js',
        chunkFileNames: 'assets/chunk/[name][hash].js',
        assetFileNames: 'assets/file/[name][hash].[ext]',
        manualChunks(id) {
          const NODE_MODULES = 'node_modules'
          if (id.includes(NODE_MODULES)) return 'vendor'
        }
      },
    }
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      '/newgoods': {
        target: 'https://api.dev.uboxol.com',
        secure: false,
        changeOrigin: true,
      }
    }
  }
})
