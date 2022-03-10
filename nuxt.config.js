export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fci-proj',
    htmlAttrs: {
      'data-theme': 'light',
      dir: 'rtl',
      lang: 'ar'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/notif', ssr: false },
    '~/plugins/v-tooltip',
    { src: '~/plugins/vue-google-maps', ssr: false },
    '~/plugins/Autocomplete',
    '~/plugins/vuelidate',
    '~/plugins/vue-js-modal.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@braid/vue-formulate/nuxt',
  ],
  formulate: {
    configPath: '~/plugins/formulate.config.js'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: '/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ar'
    }
  },

  auth: {
    // cookie: {
    //   options: {
    //     domain: ''
    //     secure: 'true'
    //   }
    // },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/auth', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/users/me', method: 'get', propertyName: 'data' }
        },
        token: {
          required: true,
          name: 'x-auth-token',
          type: ''
        }
      }
    }
  },
  env: {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://fci-proj.herokuapp.com/api',
  },

  router: {
    middleware: ['ssr-cookie']
  },
  serverMiddleware: {
    '/api': '~/api'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
