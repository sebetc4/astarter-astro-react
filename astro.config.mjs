// @ts-check
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import cssnano from 'cssnano'
import variableCompress from 'postcss-variable-compress'

const isProd = import.meta.env.PROD

export default defineConfig({
    integrations: [react(), sitemap()],
    vite: {
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        css: {
            postcss: {
                plugins: isProd ? [cssnano(), variableCompress()] : [],
            },
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
    },
    site: 'https://my-site.com',
})
