import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line import/named
import { Route } from 'vue-router'
declare module '*.vue' {
  export default Vue
}
// Expansion
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
    $auth: any
  }
}
