import { reactive, toRef } from 'vue'
import { api } from '~/plugins/api'

const state = reactive({
  tasks: [
    {
      id: 0,
      name: 'Заголовки',
      text: '',
      file: 'hrml-headers.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 2,
    },
    {
      id: 0,
      name: 'Списки',
      text: '',
      file: 'hrml-lists.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 2,
    },
    {
      id: 0,
      name: 'Страничка',
      text: '',
      file: 'hrml-page.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 2,
    },
    {
      id: 0,
      name: 'Поля ввода',
      text: '',
      file: 'html-inputs.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 3,
    },
    {
      id: 0,
      name: 'Сверстать форму',
      text: '',
      file: 'html-form.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 3,
    },

    {
      id: 0,
      name: 'Цвет текста',
      text: '',
      file: 'css-text-colors.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 7,
    },
    {
      id: 0,
      name: 'Стиль страницы',
      text: '',
      file: 'css-page.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 7,
    },
    {
      id: 0,
      name: 'Творческие задания',
      text: '',
      file: 'css-art.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 7,
    },
    {
      id: 0,
      name: 'Цветной размер',
      text: '',
      file: 'css-media.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 8,
    },
    {
      id: 0,
      name: 'Мячик прыг-скок',
      text: '',
      file: 'css-ball.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 9,
    },
    {
      id: 0,
      name: 'Вечное ожидание',
      text: '',
      file: 'css-spinner.md',
      created_at: '2022-06-15 12:12:58',
      articleId: 9,
    },
  ],
})

state.tasks.forEach((task, id) => {
  state.tasks[id] = { ...task, id: id + 1 }
})

async function fetchTasks() {
  const { data } = await api.get('/tasks')

  return data.data
}

async function fetchTask(id: string) {
  const { data } = await api.get(`/tasks/${id}`)

  return data.data
}

async function answerTask(id: string, opts) {
  const { data } = await api.post(`/tasks/${id}/answers`, opts)

  return data.data
}

async function createTask(opts) {
  const { data } = await api.post('/tasks', opts)

  return data.data
}

async function updateTask(id: string, opts) {
  const { data } = await api.put(`/tasks/${id}`, opts)

  return data.data
}

export function useTasks() {
  return {
    tasks: toRef(state, 'tasks'),
    fetchTasks,
    fetchTask,
    answerTask,
    createTask,
    updateTask,
  }
}
