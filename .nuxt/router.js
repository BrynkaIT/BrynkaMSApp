import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4d78b74e = () => interopDefault(import('../pages/customers/index.vue' /* webpackChunkName: "pages/customers/index" */))
const _1b7289cf = () => interopDefault(import('../pages/notAuthorized.vue' /* webpackChunkName: "pages/notAuthorized" */))
const _03fd3939 = () => interopDefault(import('../pages/preferences.vue' /* webpackChunkName: "pages/preferences" */))
const _be0effbe = () => interopDefault(import('../pages/System/index.vue' /* webpackChunkName: "pages/System/index" */))
const _76e53185 = () => interopDefault(import('../pages/customers/create.vue' /* webpackChunkName: "pages/customers/create" */))
const _5d7d222c = () => interopDefault(import('../pages/System/securityRoles.vue' /* webpackChunkName: "pages/System/securityRoles" */))
const _61f0e901 = () => interopDefault(import('../pages/customers/_id.vue' /* webpackChunkName: "pages/customers/_id" */))
const _5f0b38d3 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _f963d1f4 = () => interopDefault(import('../pages/_ms.vue' /* webpackChunkName: "pages/_ms" */))

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
    component: _4d78b74e,
    name: "customers"
  }, {
    path: "/notAuthorized",
    component: _1b7289cf,
    name: "notAuthorized"
  }, {
    path: "/preferences",
    component: _03fd3939,
    name: "preferences"
  }, {
    path: "/System",
    component: _be0effbe,
    name: "System"
  }, {
    path: "/customers/create",
    component: _76e53185,
    name: "customers-create"
  }, {
    path: "/System/securityRoles",
    component: _5d7d222c,
    name: "System-securityRoles"
  }, {
    path: "/customers/:id",
    component: _61f0e901,
    name: "customers-id"
  }, {
    path: "/",
    component: _5f0b38d3,
    name: "index"
  }, {
    path: "/:ms",
    component: _f963d1f4,
    name: "ms"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
