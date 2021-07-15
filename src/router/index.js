import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/lunBo',
    name: 'lunBo',
    component: () => import(/* webpackChunkName: "about" */ '../views/lunBo.vue')
  },
  {
    path: '/lunBo2',
    name: 'lunBo2',
    component: () => import(/* webpackChunkName: "about" */ '../views/lunBo2.vue')
  },
  {
    path: '/zhuanpan',
    name: 'zhuanpan',
    component: () => import(/* webpackChunkName: "about" */ '../views/zhuanpan.vue')
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
