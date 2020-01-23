import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f0140932 = () => interopDefault(import('../pages/customers/index.vue' /* webpackChunkName: "pages/customers/index" */))
const _45696746 = () => interopDefault(import('../pages/notAuthorized.vue' /* webpackChunkName: "pages/notAuthorized" */))
const _42bd7172 = () => interopDefault(import('../pages/preferences.vue' /* webpackChunkName: "pages/preferences" */))
const _1ad633d3 = () => interopDefault(import('../pages/System/index.vue' /* webpackChunkName: "pages/System/index" */))
const _c3048792 = () => interopDefault(import('../pages/customers/create.vue' /* webpackChunkName: "pages/customers/create" */))
const _c8e5f844 = () => interopDefault(import('../pages/System/securityRoles.vue' /* webpackChunkName: "pages/System/securityRoles" */))
const _23c9ab8f = () => interopDefault(import('../pages/customers/_id.vue' /* webpackChunkName: "pages/customers/_id" */))
const _5dc32d3e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _15f01314 = () => interopDefault(import('../pages/_ms.vue' /* webpackChunkName: "pages/_ms" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/customers",
    component: _f0140932,
    name: "customers"
  }, {
    path: "/notAuthorized",
    component: _45696746,
    name: "notAuthorized"
  }, {
    path: "/preferences",
    component: _42bd7172,
    name: "preferences"
  }, {
    path: "/System",
    component: _1ad633d3,
    name: "System"
  }, {
    path: "/customers/create",
    component: _c3048792,
    name: "customers-create"
  }, {
    path: "/System/securityRoles",
    component: _c8e5f844,
    name: "System-securityRoles"
  }, {
    path: "/customers/:id",
    component: _23c9ab8f,
    name: "customers-id"
  }, {
    path: "/",
    component: _5dc32d3e,
    name: "index"
  }, {
    path: "/:ms",
    component: _15f01314,
    name: "ms"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
