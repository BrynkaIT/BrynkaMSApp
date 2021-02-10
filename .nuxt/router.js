import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5db9c226 = () => interopDefault(import('../pages/customers/index.vue' /* webpackChunkName: "pages/customers/index" */))
const _1bb0e6a9 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _4c2b3519 = () => interopDefault(import('../pages/forgotPassword.vue' /* webpackChunkName: "pages/forgotPassword" */))
const _c08fcf8a = () => interopDefault(import('../pages/internal/index.vue' /* webpackChunkName: "pages/internal/index" */))
const _8f50cd3a = () => interopDefault(import('../pages/notAuthorized.vue' /* webpackChunkName: "pages/notAuthorized" */))
const _35ff6109 = () => interopDefault(import('../pages/passwordReset.vue' /* webpackChunkName: "pages/passwordReset" */))
const _f76dc466 = () => interopDefault(import('../pages/preferences.vue' /* webpackChunkName: "pages/preferences" */))
const _5c64e9ed = () => interopDefault(import('../pages/system/index.vue' /* webpackChunkName: "pages/system/index" */))
const _10273976 = () => interopDefault(import('../pages/internal/inventory.vue' /* webpackChunkName: "pages/internal/inventory" */))
const _65146f2f = () => interopDefault(import('../pages/internal/rma.vue' /* webpackChunkName: "pages/internal/rma" */))
const _68f02ed3 = () => interopDefault(import('../pages/system/preferences.vue' /* webpackChunkName: "pages/system/preferences" */))
const _24ce5d60 = () => interopDefault(import('../pages/system/versions.vue' /* webpackChunkName: "pages/system/versions" */))
const _9b6e0950 = () => interopDefault(import('../pages/customers/_id/index.vue' /* webpackChunkName: "pages/customers/_id/index" */))
const _163cd678 = () => interopDefault(import('../pages/customers/_id/buildings/_bid.vue' /* webpackChunkName: "pages/customers/_id/buildings/_bid" */))
const _02e926c3 = () => interopDefault(import('../pages/customers/_id/locations/_lid.vue' /* webpackChunkName: "pages/customers/_id/locations/_lid" */))
const _84e1c4bc = () => interopDefault(import('../pages/customers/_id/users/_uid.vue' /* webpackChunkName: "pages/customers/_id/users/_uid" */))
const _6cf31c67 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _123ea824 = () => interopDefault(import('../pages/_managedService/login.vue' /* webpackChunkName: "pages/_managedService/login" */))

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
    component: _5db9c226,
    name: "customers"
  }, {
    path: "/dashboard",
    component: _1bb0e6a9,
    name: "dashboard"
  }, {
    path: "/forgotPassword",
    component: _4c2b3519,
    name: "forgotPassword"
  }, {
    path: "/internal",
    component: _c08fcf8a,
    name: "internal"
  }, {
    path: "/notAuthorized",
    component: _8f50cd3a,
    name: "notAuthorized"
  }, {
    path: "/passwordReset",
    component: _35ff6109,
    name: "passwordReset"
  }, {
    path: "/preferences",
    component: _f76dc466,
    name: "preferences"
  }, {
    path: "/system",
    component: _5c64e9ed,
    name: "system"
  }, {
    path: "/internal/inventory",
    component: _10273976,
    name: "internal-inventory"
  }, {
    path: "/internal/rma",
    component: _65146f2f,
    name: "internal-rma"
  }, {
    path: "/system/preferences",
    component: _68f02ed3,
    name: "system-preferences"
  }, {
    path: "/system/versions",
    component: _24ce5d60,
    name: "system-versions"
  }, {
    path: "/customers/:id",
    component: _9b6e0950,
    name: "customers-id"
  }, {
    path: "/customers/:id/buildings/:bid?",
    component: _163cd678,
    name: "customers-id-buildings-bid"
  }, {
    path: "/customers/:id/locations/:lid?",
    component: _02e926c3,
    name: "customers-id-locations-lid"
  }, {
    path: "/customers/:id/users/:uid?",
    component: _84e1c4bc,
    name: "customers-id-users-uid"
  }, {
    path: "/",
    component: _6cf31c67,
    name: "index"
  }, {
    path: "/:managedService/login",
    component: _123ea824,
    name: "managedService-login"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
