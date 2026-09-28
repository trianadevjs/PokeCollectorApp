// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        // CSS de Bootstrap 5
        { 
          rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' 
        },
        // Bootstrap Icons
        { 
          rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css' 
        }
      ]
    },
    baseURL: process.env.BASE_URL || '/' // Reemplaza 'tu-repositorio' por el nombre exacto de tu repo en GitHub
  },
  nitro: {
    preset: 'github-pages',
    prerender: {
      // Evita que el proceso de build se detenga si Nitro no encuentra rutas estáticas secundarias
      failOnError: false,
      routes: ['/']
    }
  }

})
