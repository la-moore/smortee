import { reactive, toRef } from 'vue'
import { useArticles } from './articles'
import { api } from '~/plugins/api'

const state = reactive({
  courses: [
    {
      id: 0,
      slug: 'html',
      description: 'Узнаем, как работает интернет, откуда и как попадают веб-сайты на экран. Осваиваем терминологию разработчика',
      name: 'Основы HTML',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'css',
      description: 'Каскадные таблицы стилей, позволяющие оформлять содержимое страницы в соответствии с описанными правилами',
      name: 'Все о CSS',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'design',
      description: 'Чтобы написать хороший код, нужно понять задумку дизайнера и воплотить ее с максимальной точностью',
      name: 'Дизайн',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'javascript',
      description: 'Курс научит использовать максимум возможностей JavaScript, чтобы создавать функциональные, привлекательные сайты',
      name: 'JavaScript',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'first-site',
      description: 'Наконец-то мы приступаем к созданию нашего первого полноценного сайта используя HTML, CSS и JS',
      name: 'Первый сайт',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'libraries',
      description: 'Быть программистом станет не так уж и сложно, после знакомства с популярными библиотеками для разработки',
      name: 'Библиотеки',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'vue',
      description: 'Разработка на Vue 3 - от использования его, как небольшой библиотеки, до создания современного SPA приложения',
      name: 'Великий Vue',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'api',
      description: 'Работа с сервером или как сделать сайт, информация на котором зависит от данных на сервере',
      name: 'Работа с API',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'git',
      description: 'В ходе курса вы научитесь работать с Git, изучите работу с локальным, удаленным хранилищем и концепции технологии Git',
      name: 'Немного про Git',
      articles: [],
      text: null,
    },
    {
      id: 0,
      slug: 'modern-site',
      description: 'Улучшение уже написанного ранее нами сайта на современные технологии с использованием Vue и Git',
      name: 'Современный сайт',
      articles: [],
      text: null,
    },
  ]
})

state.courses.forEach((course, id) => {
  state.courses[id] = { ...course, id: id + 1 }
})

async function fetchCourses() {
  const { data } = await api.get('/courses')

  return data.data
}

async function fetchCourseArticles(id: string) {
  const { data } = await api.get(`/courses/${id}/articles`)

  return data.data
}

async function fetchCourse(id: string) {
  const { data } = await api.get(`/courses/${id}`)

  return data.data
}

async function createCourse(opts) {
  const { data } = await api.post('/courses', opts)

  return data.data
}

async function updateCourse(id: string, opts) {
  const { data } = await api.put(`/courses/${id}`, opts)

  return data.data
}

export function useCourses() {
  return {
    courses: toRef(state, 'courses'),
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    fetchCourseArticles,
  }
}
