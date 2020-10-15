import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_bootstrapvue_5a4fd586 from 'nuxt_plugin_bootstrapvue_5a4fd586' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_templatespluginf532cde8_d6fb3bb6 from 'nuxt_plugin_templatespluginf532cde8_d6fb3bb6' // Source: ./templates.plugin.f532cde8.js (mode: 'all')
import nuxt_plugin_axios_7f933e57 from 'nuxt_plugin_axios_7f933e57' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_brynkaToasts_4b440606 from 'nuxt_plugin_brynkaToasts_4b440606' // Source: ../plugins/brynkaToasts (mode: 'client')
import nuxt_plugin_vuelidate_4345260a from 'nuxt_plugin_vuelidate_4345260a' // Source: ../plugins/vuelidate (mode: 'all')
import nuxt_plugin_filters_2dd71012 from 'nuxt_plugin_filters_2dd71012' // Source: ../plugins/filters.js (mode: 'all')
import nuxt_plugin_axios_3566aa80 from 'nuxt_plugin_axios_3566aa80' // Source: ../plugins/axios (mode: 'all')
import nuxt_plugin_vmask_3801a64e from 'nuxt_plugin_vmask_3801a64e' // Source: ../plugins/v-mask (mode: 'all')
import nuxt_plugin_toasted_bbce2e60 from 'nuxt_plugin_toasted_bbce2e60' // Source: ../plugins/toasted (mode: 'client')
import nuxt_plugin_bootstrapIcons_22223e42 from 'nuxt_plugin_bootstrapIcons_22223e42' // Source: ../plugins/bootstrapIcons (mode: 'all')
import nuxt_plugin_formHandler_641e06a0 from 'nuxt_plugin_formHandler_641e06a0' // Source: ../plugins/formHandler (mode: 'all')
import nuxt_plugin_convertToUTC_e0f6eca8 from 'nuxt_plugin_convertToUTC_e0f6eca8' // Source: ../plugins/convertToUTC (mode: 'all')
import nuxt_plugin_jwPagination_e7178186 from 'nuxt_plugin_jwPagination_e7178186' // Source: ../plugins/jwPagination (mode: 'all')
import nuxt_plugin_moment_4f74a614 from 'nuxt_plugin_moment_4f74a614' // Source: ../plugins/moment (mode: 'all')
import nuxt_plugin_easyLightBox_330c1d26 from 'nuxt_plugin_easyLightBox_330c1d26' // Source: ../plugins/easyLightBox (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"brynka-manager","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"App to manage system configurations for BrynkaWebApp"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_bootstrapvue_5a4fd586 === 'function') {
    await nuxt_plugin_bootstrapvue_5a4fd586(app.context, inject)
  }

  if (typeof nuxt_plugin_templatespluginf532cde8_d6fb3bb6 === 'function') {
    await nuxt_plugin_templatespluginf532cde8_d6fb3bb6(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_7f933e57 === 'function') {
    await nuxt_plugin_axios_7f933e57(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_brynkaToasts_4b440606 === 'function') {
    await nuxt_plugin_brynkaToasts_4b440606(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_4345260a === 'function') {
    await nuxt_plugin_vuelidate_4345260a(app.context, inject)
  }

  if (typeof nuxt_plugin_filters_2dd71012 === 'function') {
    await nuxt_plugin_filters_2dd71012(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3566aa80 === 'function') {
    await nuxt_plugin_axios_3566aa80(app.context, inject)
  }

  if (typeof nuxt_plugin_vmask_3801a64e === 'function') {
    await nuxt_plugin_vmask_3801a64e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toasted_bbce2e60 === 'function') {
    await nuxt_plugin_toasted_bbce2e60(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapIcons_22223e42 === 'function') {
    await nuxt_plugin_bootstrapIcons_22223e42(app.context, inject)
  }

  if (typeof nuxt_plugin_formHandler_641e06a0 === 'function') {
    await nuxt_plugin_formHandler_641e06a0(app.context, inject)
  }

  if (typeof nuxt_plugin_convertToUTC_e0f6eca8 === 'function') {
    await nuxt_plugin_convertToUTC_e0f6eca8(app.context, inject)
  }

  if (typeof nuxt_plugin_jwPagination_e7178186 === 'function') {
    await nuxt_plugin_jwPagination_e7178186(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_4f74a614 === 'function') {
    await nuxt_plugin_moment_4f74a614(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_easyLightBox_330c1d26 === 'function') {
    await nuxt_plugin_easyLightBox_330c1d26(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
