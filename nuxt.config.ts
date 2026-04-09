// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false, // NOT SSR
  modules: ['@vueuse/nuxt', '@pinia/nuxt', 'nuxt-easy-lightbox', '@vueform/nuxt','@maz-ui/nuxt', '@nuxtjs/sitemap'],
  sitemap: {},
  css: ['@/assets/style/global.scss'],
  mazUi: {
    // Theme System
    theme: {
      preset: 'ocean', // Choose: 'mazUi', 'ocean', 'pristine', 'obsidian'
      strategy: 'hybrid', // 'runtime' | 'buildtime' | 'hybrid'
      darkModeStrategy: 'class', // 'class' | 'media' | 'auto'
    },

    // Translations
    translations: {
      locale: 'fr', // Default language
      fallbackLocale: 'en',
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
      title: 'RODAS',
      meta: [],
    }
  }

})