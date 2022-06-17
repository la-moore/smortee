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
        component: () => import('../views/home-new/home.vue')
      },
      {
        path: 'course/:id',
        name: 'course',
        props: true,
        component: () => import('../views/course/course.vue')
      },
      {
        path: 'article/:id',
        name: 'article',
        props: true,
        component: () => import('../views/article-new/article.vue')
      },
      {
        path: 'task/:id',
        name: 'task',
        props: true,
        component: () => import('../views/task-new/task.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)?',
    name: '404',
    component: () => import('../views/errors/not-found.vue')
  }
] as RouteRecordRaw[]
