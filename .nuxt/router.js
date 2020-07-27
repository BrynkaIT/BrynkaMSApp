import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5db9c226 = () => interopDefault(import('../pages/customers/index.vue' /* webpackChunkName: "pages/customers/index" */))
const _3258725a = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _8f50cd3a = () => interopDefault(import('../pages/notAuthorized.vue' /* webpackChunkName: "pages/notAuthorized" */))
const _f76dc466 = () => interopDefault(import('../pages/preferences.vue' /* webpackChunkName: "pages/preferences" */))
const _2a292e0d = () => interopDefault(import('../pages/System/index.vue' /* webpackChunkName: "pages/System/index" */))
const _7af50971 = () => interopDefault(import('../pages/customers/create.vue' /* webpackChunkName: "pages/customers/create" */))
const _b671b7d0 = () => interopDefault(import('../pages/System/securityRoles.vue' /* webpackChunkName: "pages/System/securityRoles" */))
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
    path: "/System",
    component: _2a292e0d,
    name: "System"
  }, {
    path: "/customers/create",
    component: _7af50971,
    name: "customers-create"
  }, {
    path: "/System/securityRoles",
    component: _b671b7d0,
    name: "System-securityRoles"
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
