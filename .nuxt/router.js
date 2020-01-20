import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f3464016 = () => interopDefault(import('../pages/customers/index.vue' /* webpackChunkName: "pages/customers/index" */))
const _b4c4072a = () => interopDefault(import('../pages/notAuthorized.vue' /* webpackChunkName: "pages/notAuthorized" */))
const _285ca2d5 = () => interopDefault(import('../pages/preferences.vue' /* webpackChunkName: "pages/preferences" */))
const _08864a05 = () => interopDefault(import('../pages/System/index.vue' /* webpackChunkName: "pages/System/index" */))
const _6cf36969 = () => interopDefault(import('../pages/customers/create.vue' /* webpackChunkName: "pages/customers/create" */))
const _9fb66fe0 = () => interopDefault(import('../pages/System/securityRoles.vue' /* webpackChunkName: "pages/System/securityRoles" */))
const _27c748c6 = () => interopDefault(import('../pages/customers/_id.vue' /* webpackChunkName: "pages/customers/_id" */))
const _7331076f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _f3464016,
    name: "customers"
  }, {
    path: "/notAuthorized",
    component: _b4c4072a,
    name: "notAuthorized"
  }, {
    path: "/preferences",
    component: _285ca2d5,
    name: "preferences"
  }, {
    path: "/System",
    component: _08864a05,
    name: "System"
  }, {
    path: "/customers/create",
    component: _6cf36969,
    name: "customers-create"
  }, {
    path: "/System/securityRoles",
    component: _9fb66fe0,
    name: "System-securityRoles"
  }, {
    path: "/customers/:id",
    component: _27c748c6,
    name: "customers-id"
  }, {
    path: "/",
    component: _7331076f,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
