// import { h, resolveComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'


export default [
  {
    path: '/',
    component: () => import('../layouts/main/main.vue'),
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: 'article/:id',
        name: 'article',
        props: true,
        component: () => import('../views/article/article.vue')
      },
      {
        path: 'task/:id',
        name: 'task',
        props: true,
        component: () => import('../views/task/task.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)?',
    name: '404',
    component: () => import('../views/errors/not-found.vue')
  }
] as RouteRecordRaw[]
