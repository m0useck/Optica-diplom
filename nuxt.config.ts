// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-swiper",
    "@nuxtjs/supabase",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts"
  ],
  supabase: {
    redirect: false
  },
  googleFonts: {
    families: {
        'PT Sans': true,
        'Comfortaa': true
    }
  },
  postcss: {
    plugins: {
      cssnano: false 
    }
  }
})