import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    publicPath: '/vue-js-w2/',
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        'process.env': {
            // 'VITE_API_PATH': '691fefed-6ac2-4e54-a946-30675c44d934',
            // 'VITE_BASE_API_URL': 'https://ec-course-api.hexschool.io/',
        },
    }
})
