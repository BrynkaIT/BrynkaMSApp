const env = require('dotenv').config()
module.exports = {
  mode: 'universal',
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'preconnect', href:'https://fonts.gstatic.com'},
      {
        rel:'stylesheet',
        href:'https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap'
      },
      {
        rel:'stylesheet',
        href:'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#2196f3',
    height: '2.5px',
    continuous: true
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/brynkaToasts', ssr: false},
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/v-mask' },
    { src: '~/plugins/toasted', ssr: false },
    { src: '~/plugins/bootstrapIcons' },
    { src: '~/plugins/formHandler' },
    { src: '~/plugins/convertToUTC' },
    { src: '~/plugins/jwPagination' },
    { src: '~/plugins/moment' },
    { src: '~/plugins/easyLightBox', ssr: false},
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    //'@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ]
  ],
  env: {
    baseURL: process.env.API_DOMAIN,
    username: process.env.BRYNKA_USER_USERNAME,
    password: process.env.BRYNKA_USER_PASSWORD,
    version: process.env.WEB_APP_VERSION
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:process.env.API_DOMAIN,
    withCredentials: false
  },
  /*
   *** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  server: {
    port: process.env.PORT || 4000
  },

}
