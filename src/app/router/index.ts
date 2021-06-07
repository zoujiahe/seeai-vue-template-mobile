import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import { DemoConstructRoute } from '../views/demo-construct'
import { guard } from './guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/index/home',
    meta: {
      name: '入口'
    }
  },
  // {
  //   path: '/empty',
  //   component: () => import(/* webpackChunkName: "empty" */ '@common/components/empty-result/empty-result.vue'),
  //   name: 'empty',
  //   meta: {
  //     name: 'empty'
  //   }
  // },
  {
    path: '/index',
    name: 'app-index',
    component: () => import(/* webpackChunkName: "app-index" */ '@layout/AppIndex.vue'),
    meta: {
      name: '主页'
    },
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@layout/Home.vue'),
        name: 'home',
        meta: {
          name: '首页'
        }
      },
      DemoConstructRoute('demo-construct/:id')
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@layout/Login.vue'),
    name: 'login',
    meta: {
      name: '登录页'
    }
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '@layout/NotFound.vue'),
    meta: {
      name: 'not-found'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => guard(to, from, next))

export default router
