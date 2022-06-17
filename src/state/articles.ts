import { reactive, toRef } from 'vue'
import { useTasks } from './tasks'
import { reader } from '/~/helpers/reader'

const state = reactive({
  articles: [
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-intro.md',
      name: 'Введение в HTML',
      courseId: 1,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-how-it-works.md',
      name: 'Как работает сайт',
      courseId: 1,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-forms.md',
      name: 'Формы',
      courseId: 1,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'html-directory.md',
      name: 'Справочник',
      courseId: 1,
      tasks: []
    },

    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-intro.md',
      name: 'Введение в CSS',
      courseId: 2,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-selectors.md',
      name: 'Селекторы',
      courseId: 2,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-colors.md',
      name: 'Цвета',
      courseId: 2,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-responsive.md',
      name: 'Адаптивный дизайн',
      courseId: 2,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-animations.md',
      name: 'Анимации',
      courseId: 2,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'css-directory.md',
      name: 'Справочник',
      courseId: 2,
      tasks: []
    },

    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-intro.md',
      name: 'Введение',
      courseId: 3,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-types.md',
      name: 'Типы данных',
      courseId: 3,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-functions.md',
      name: 'Функции',
      courseId: 3,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-variables.md',
      name: 'Переменные',
      courseId: 3,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-loops.md',
      name: 'Циклы',
      courseId: 3,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-events.md',
      name: 'События',
      courseId: 3,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-console.md',
      name: 'Консоль боаузера',
      courseId: 3,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'javascript-web-api.md',
      name: 'Веб API',
      courseId: 3,
      tasks: []
    },

    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'libs-intro.md',
      name: 'Что такое библиотека',
      courseId: 4,
      tasks: []
    },
    {
      id: 0,
      created_at: '2022-06-15 11:55:04',
      description: null,
      text: '',
      file: 'libs-tailwind-css.md',
      name: 'Tailwind Css',
      courseId: 4,
      tasks: []
    },
  ],
})

state.articles.forEach((article, id) => {
  state.articles[id] = { ...article, id: id + 1 }
})

async function fetchArticles() {
  return state.articles
}

async function fetchArticle(id: string) {
  const { tasks } = useTasks()

  const article = state.articles.find((article) => article.id === parseInt(id))

  article.tasks = tasks.value.filter((task) => task.articleId === parseInt(id))

  if (article.file) {
    const data = await fetch(`/articles/${article.file}`).then(response => response.blob())

    article.text = await reader(data)
  }

  return article
}

export function useArticles() {
  return {
    articles: toRef(state, 'articles'),
    fetchArticles,
    fetchArticle,
  }
}
