import { reactive, toRef } from 'vue'
import { reader } from '/~/helpers/reader'

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
    }
  ],
})

state.tasks.forEach((task, id) => {
  state.tasks[id] = { ...task, id: id + 1 }
})

async function fetchTasks() {
  return state.tasks
}

async function fetchTask(id: string) {
  const task = state.tasks.find((task) => task.id === parseInt(id))

  if (task.file) {
    const data = await fetch(`/tasks/${task.file}`).then(response => response.blob())

    task.text = await reader(data)
  }

  return task
}

export function useTasks() {
  return {
    tasks: toRef(state, 'tasks'),
    fetchTasks,
    fetchTask,
  }
}