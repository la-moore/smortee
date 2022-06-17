import { reactive, toRef } from 'vue'
import { useArticles } from './articles'

const state = reactive({
  courses: [
    {
      id: 0,
      description: 'Узнаем, как работает интернет, откуда и как попадают веб-сайты на экран. Осваиваем терминологию разработчика. Настраиваем среду разработки, выбираем текстовый редактор',
      name: 'Основы HTML',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'Cascading Style Sheets (CSS) — каскадные таблицы стилей, которые позволяют оформлять содержимое страницы в соответствии с описанными правилами',
      name: 'Все о CSS',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'Курс научит использовать максимум возможностей JavaScript, чтобы создавать функциональные, привлекательные сайты',
      name: 'JavaScript',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'Быть программистом станет не так уж и сложно после знакомства с популярными библиотеками для разработки',
      name: 'Библиотеки',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'Наконец то мы приступаем к созданию нашего первого полноценного сайта используя HTML, CSS и JS',
      name: 'Первый сайт',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'Разработка на Vue 3 - от использования его как небольшой библиотеки до создания современного SPA приложения',
      name: 'Великий Vue',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'Работа с сервером или как сделать сайт, информауия на котором зависит от данных на сервере',
      name: 'Работа с API',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'В ходе курса вы научитесь работать с Git, изучите работу с локальным и удаленным хранилищем, а также изучите все основные концепции технологии Git',
      name: 'Немного про Git',
      articles: [],
      text: null,
    },
    {
      id: 0,
      description: 'Улучшение уже написанного ранее нами сайта на современные технологии с использованием Vue и git',
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
  return state.courses
}

async function fetchCourse(id: string) {
  const { articles } = useArticles()
  const course = state.courses.find((course) => course.id === parseInt(id))

  course.articles = articles.value.filter((article) => article.courseId === parseInt(id))

  return course
}

export function useCourses() {
  return {
    courses: toRef(state, 'courses'),
    fetchCourses,
    fetchCourse,
  }
}
