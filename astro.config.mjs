// @ts-check
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import cssnano from 'cssnano'
import variableCompress from 'postcss-variable-compress'
import sitemap from '@astrojs/sitemap';

const isProd = import.meta.env.PROD;

console.log('isProd', isProd);

// https://astro.build/config
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