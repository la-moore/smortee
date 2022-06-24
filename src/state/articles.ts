import { reactive, toRef } from 'vue'
import { useTasks } from './tasks'
import { reader } from '~/helpers/reader'
import { api } from '~/plugins/api';

const state = reactive({
  articles: [
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-intro.md',
      name: 'Введение в HTML',
      courseSlug: 'html',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-how-it-works.md',
      name: 'Как работает сайт',
      courseSlug: 'html',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-forms.md',
      name: 'Формы',
      courseSlug: 'html',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-directory.md',
      name: 'Справочник',
      courseSlug: 'html',
      tasks: []
    },

    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-intro.md',
      name: 'Введение в CSS',
      courseSlug: 'css',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-selectors.md',
      name: 'Селекторы',
      courseSlug: 'css',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-colors.md',
      name: 'Цвета',
      courseSlug: 'css',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-responsive.md',
      name: 'Адаптивный дизайн',
      courseSlug: 'css',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-animations.md',
      name: 'Анимации',
      courseSlug: 'css',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-directory.md',
      name: 'Справочник',
      courseSlug: 'css',
      tasks: []
    },

    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-intro.md',
      name: 'Введение',
      courseSlug: 'javascript',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-console.md',
      name: 'Консоль браузера',
      courseSlug: 'javascript',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-types.md',
      name: 'Типы данных',
      courseSlug: 'javascript',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-functions.md',
      name: 'Функции',
      courseSlug: 'javascript',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-variables.md',
      name: 'Переменные',
      courseSlug: 'javascript',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-loops.md',
      name: 'Циклы',
      courseSlug: 'javascript',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-events.md',
      name: 'События',
      courseSlug: 'javascript',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-web-api.md',
      name: 'Веб API',
      courseSlug: 'javascript',
      tasks: []
    },

    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'libs-intro.md',
      name: 'Что такое библиотека',
      courseSlug: 'libraries',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'libs-tailwind-css.md',
      name: 'Tailwind Css',
      courseSlug: 'libraries',
      tasks: []
    },

    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'design-intro.md',
      name: 'Что такое дизайн',
      courseSlug: 'design',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'design-colors.md',
      name: 'Цвета',
      courseSlug: 'design',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'design-fonts.md',
      name: 'Типографика',
      courseSlug: 'design',
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'design-graphic.md',
      name: 'Графика',
      courseSlug: 'design',
      tasks: []
    },
  ],
})

state.articles.forEach((article, id) => {
  state.articles[id] = { ...article, id: id + 1 }
})

async function fetchArticles() {
  const { data } = await api.get('/articles')

  return data.data
}

async function fetchArticle(id: string) {
  const { data } = await api.get(`/articles/${id}`)

  return data.data
}

export function useArticles() {
  return {
    articles: toRef(state, 'articles'),
    fetchArticles,
    fetchArticle,
  }
}
