// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: true, 
  modules: ['@vueuse/nuxt', '@pinia/nuxt', 'nuxt-easy-lightbox', '@vueform/nuxt','@maz-ui/nuxt', '@nuxtjs/sitemap'],
  sitemap: {},
  css: ['@/assets/style/global.scss'],
  mazUi: {
    // Theme System
    general: {
      // Enable Nuxt DevTools integration
      devtools: true,
    },

    theme: {
      preset: 'mazUi', // Choose: 'mazUi', 'ocean', 'pristine', 'obsidian'
      strategy: 'hybrid', // 'runtime' | 'buildtime' | 'hybrid'
      darkModeStrategy: 'class', // 'class' | 'media' | 'auto'
      mode: 'both', // 'light' | 'dark' | 'both' (supported color modes)
      colorMode: 'light', // 'auto' | 'light' | 'dark' (initial color mode, only if mode is 'both')
    },

    // Translations
    translations: {
      locale: 'en', // Default language
      fallbackLocale: 'fr',
    },

    // Components (all enabled by default)
    components: {
      autoImport: true, // Auto-import all components globally
    },

    // Composables (customize what you need)
    composables: {
      useTheme: true,
      // ... all others enabled by default
    },

    // Directives
    directives: {
      vTooltip: true,
      vClickOutside: true,
      vFullscreenImg: true,
      vZoomImg: true,
    },
  },

  runtimeConfig:{
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000', // default for dev
    },
  },
  app: {
    head: {
      title: 'ro...',
      meta: [],
    }
  }

})