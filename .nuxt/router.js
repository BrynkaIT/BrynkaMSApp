import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5db9c226 = () => interopDefault(import('../pages/customers/index.vue' /* webpackChunkName: "pages/customers/index" */))
const _1bb0e6a9 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _c08fcf8a = () => interopDefault(import('../pages/internal/index.vue' /* webpackChunkName: "pages/internal/index" */))
const _8f50cd3a = () => interopDefault(import('../pages/notAuthorized.vue' /* webpackChunkName: "pages/notAuthorized" */))
const _f76dc466 = () => interopDefault(import('../pages/preferences.vue' /* webpackChunkName: "pages/preferences" */))
const _5c64e9ed = () => interopDefault(import('../pages/system/index.vue' /* webpackChunkName: "pages/system/index" */))
const _7af50971 = () => interopDefault(import('../pages/customers/create.vue' /* webpackChunkName: "pages/customers/create" */))
const _24f8fff8 = () => interopDefault(import('../pages/system/securityRoles.vue' /* webpackChunkName: "pages/system/securityRoles" */))
const _02540ed6 = () => interopDefault(import('../pages/customers/_id.vue' /* webpackChunkName: "pages/customers/_id" */))
const _6cf31c67 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/internal",
    component: _c08fcf8a,
    name: "internal"
  }, {
    path: "/notAuthorized",
    component: _8f50cd3a,
    name: "notAuthorized"
  }, {
    path: "/preferences",
    component: _f76dc466,
    name: "preferences"
  }, {
    path: "/system",
    component: _5c64e9ed,
    name: "system"
  }, {
    path: "/customers/create",
    component: _7af50971,
    name: "customers-create"
  }, {
    path: "/system/securityRoles",
    component: _24f8fff8,
    name: "system-securityRoles"
  }, {
    path: "/customers/:id",
    component: _02540ed6,
    name: "customers-id"
  }, {
    path: "/",
    component: _6cf31c67,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
