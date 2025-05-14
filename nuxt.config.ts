// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    devtools: { enabled: true },
    experimental: {
        componentIslands: true,
    },
    css: ['~/assets/css/main.css'],
    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        '@vee-validate/nuxt',
        '@nuxtjs/i18n',
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Lato: [100, 300, 400, 700, 900],
                },
            },
        ],
        '@nuxt/eslint',
    ],
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'en', name: 'English', file: 'en.json' },
            { code: 'nl', name: 'Nederlands', file: 'nl.json' },
        ],
        strategy: 'prefix',
        langDir: 'locales/',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n',
            redirectOn: 'root',
        },
    },
    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
            autoprefixer: {},
        },
    },
    vite: {
        plugins: [tailwindcss(), svgLoader()],
    },
});
