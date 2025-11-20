// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/mdc',
  ],
  css: ['~/assets/css/main.css'],
  experimental: {
    viewTransition: true,
  },
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
  },
})