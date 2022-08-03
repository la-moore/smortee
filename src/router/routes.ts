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
        path: 'admin',
        component: emptyRouteComponent,
        redirect: { name: 'admin' },
        children: [
          {
            path: '',
            name: 'admin',
            component: () => import('../views/admin/admin.vue')
          },
          {
            path: 'tasks',
            name: 'admin-tasks',
            component: () => import('../views/admin/admin-tasks.vue')
          },
          {
            path: 'courses',
            name: 'admin-courses',
            component: () => import('../views/admin/admin-courses.vue')
          },
          {
            path: 'users',
            name: 'admin-users',
            component: () => import('../views/admin/admin-users.vue')
          },
          {
            path: 'articles',
            name: 'admin-articles',
            component: () => import('../views/admin/admin-articles.vue')
          },
          {
            path: 'articles-create/:courseId?',
            name: 'admin-articles-create',
            props: true,
            component: () => import('../views/admin/admin-articles-create.vue')
          },
          {
            path: 'articles-edit/:id',
            name: 'admin-articles-edit',
            props: true,
            component: () => import('../views/admin/admin-articles-edit.vue')
          },
          {
            path: 'courses-create',
            name: 'admin-courses-create',
            props: true,
            component: () => import('../views/admin/admin-courses-create.vue')
          },
          {
            path: 'courses-edit/:id',
            name: 'admin-courses-edit',
            props: true,
            component: () => import('../views/admin/admin-courses-edit.vue')
          },
          {
            path: 'tasks-create/:articleId?',
            name: 'admin-tasks-create',
            props: true,
            component: () => import('../views/admin/admin-tasks-create.vue')
          },
          {
            path: 'tasks-edit/:id',
            name: 'admin-tasks-edit',
            props: true,
            component: () => import('../views/admin/admin-tasks-edit.vue')
          },
          {
            path: 'tasks-edit/:taskId/answer/:id',
            name: 'admin-answer-edit',
            props: true,
            component: () => import('../views/admin/admin-answer-edit.vue')
          },
          {
            path: 'users-edit/:id',
            name: 'admin-users-edit',
            props: true,
            component: () => import('../views/admin/admin-users-edit.vue')
          },
        ]
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
    path: '/answers',
    name: 'answers-root',
    component: emptyRouteComponent,
    redirect: { name: 'answers' },
    children: [
      {
        path: '',
        name: 'answers',
        component: () => import('../views/answers/answers.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)?',
    name: '404',
    component: () => import('../views/errors/not-found.vue')
  }
] as RouteRecordRaw[]
