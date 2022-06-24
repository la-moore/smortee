import { h, resolveComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const emptyRouteComponent = {
  render: () => h(resolveComponent('router-view')),
}

export default [
  {
    path: '/',
    name: 'main',
    component: () => import('../layouts/main/main.vue'),
    redirect: { name: 'home' },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/profile/profile.vue')
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
    path: '/auth',
    name: 'auth',
    component: emptyRouteComponent,
    redirect: { name: 'login' },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../views/auth/login.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)?',
    name: '404',
    component: () => import('../views/errors/not-found.vue')
  }
] as RouteRecordRaw[]
