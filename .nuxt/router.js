import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5db9c226 = () => interopDefault(import('../pages/customers/index.vue' /* webpackChunkName: "pages/customers/index" */))
const _3258725a = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _8f50cd3a = () => interopDefault(import('../pages/notAuthorized.vue' /* webpackChunkName: "pages/notAuthorized" */))
const _f76dc466 = () => interopDefault(import('../pages/preferences.vue' /* webpackChunkName: "pages/preferences" */))
const _68e7cd38 = () => interopDefault(import('../pages/sales/index.vue' /* webpackChunkName: "pages/sales/index" */))
const _5c64e9ed = () => interopDefault(import('../pages/system/index.vue' /* webpackChunkName: "pages/system/index" */))
const _7af50971 = () => interopDefault(import('../pages/customers/create.vue' /* webpackChunkName: "pages/customers/create" */))
const _1fe338e2 = () => interopDefault(import('../pages/operations/customerService.vue' /* webpackChunkName: "pages/operations/customerService" */))
const _20db7fad = () => interopDefault(import('../pages/operations/dev.vue' /* webpackChunkName: "pages/operations/dev" */))
const _5b4bceae = () => interopDefault(import('../pages/operations/tech.vue' /* webpackChunkName: "pages/operations/tech" */))
const _24f8fff8 = () => interopDefault(import('../pages/system/securityRoles.vue' /* webpackChunkName: "pages/system/securityRoles" */))
const _02540ed6 = () => interopDefault(import('../pages/customers/_id.vue' /* webpackChunkName: "pages/customers/_id" */))
const _6cf31c67 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _817c60cc = () => interopDefault(import('../pages/_ms.vue' /* webpackChunkName: "pages/_ms" */))

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
    path: "/home",
    component: _3258725a,
    name: "home"
  }, {
    path: "/notAuthorized",
    component: _8f50cd3a,
    name: "notAuthorized"
  }, {
    path: "/preferences",
    component: _f76dc466,
    name: "preferences"
  }, {
    path: "/sales",
    component: _68e7cd38,
    name: "sales"
  }, {
    path: "/system",
    component: _5c64e9ed,
    name: "system"
  }, {
    path: "/customers/create",
    component: _7af50971,
    name: "customers-create"
  }, {
    path: "/operations/customerService",
    component: _1fe338e2,
    name: "operations-customerService"
  }, {
    path: "/operations/dev",
    component: _20db7fad,
    name: "operations-dev"
  }, {
    path: "/operations/tech",
    component: _5b4bceae,
    name: "operations-tech"
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
  }, {
    path: "/:ms",
    component: _817c60cc,
    name: "ms"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
