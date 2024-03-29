export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Weather',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' }
        ],
        script: [{
            src: 'https://code.jquery.com/jquery-3.6.0.min.js',
            body: true
        }]
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["~/assets/styles.css"],

    generate: {
        fallback: true
    },

    target: 'static',
    ssr: false,
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    axios: {
        // Все настройки смотрите здесь https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.API_URL,
    },
}