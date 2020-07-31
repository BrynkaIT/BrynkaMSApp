//require('dotenv').config()

module.exports = {
  mode: 'universal',
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/v-mask' },
    { src: '~/plugins/toasted', ssr: false },
    { src: '~/plugins/bootstrapIcons' },
    { src: '~/plugins/formHandler' },
    { src: '~/plugins/convertToUTC' },
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
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:8080', //'https://brynka-api.herokuapp.com',
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
