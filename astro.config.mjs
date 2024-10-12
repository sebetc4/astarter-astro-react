// @ts-check
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import cssnano from 'cssnano'

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    vite: {
        resolve: {
            alias: {
                '@': '/src',
                '@react-comp': '/src/components/react',
                '@astro-comp': '/src/components/astro',
            },
        },
        css: {
            postcss: {
                plugins: [cssnano()],
            },
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
    },
})
