export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-12-18',
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'abcdEmoji',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A fun game to learn your numbers and letters.' },
        
        // OpenGraph metadata
        { property: 'og:title', content: 'abcdEmoji' },
        { property: 'og:description', content: 'A fun game to learn your numbers and letters.' },
        { property: 'og:image', content: 'https://abcdemoji.netlify.app/og-image.png' },
        { property: 'og:url', content: 'https://abcdemoji.netlify.app/' },
        { property: 'og:type', content: 'website' },
        
        // Twitter Card metadata
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'abcdEmoji' },
        { name: 'twitter:description', content: 'A fun game to learn your numbers and letters.' },
        { name: 'twitter:image', content: 'https://abcdemoji.netlify.app/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest'},
        { rel: 'canonical', href: 'https://abcdemoji.netlify.app/' }
      ]
    }
  },
  nitro: {
    preset: 'static'
  }
})