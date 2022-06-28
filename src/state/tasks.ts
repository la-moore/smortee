import { reactive, toRef } from 'vue'
import { api } from '~/plugins/api'

const state = reactive({})

async function fetchTasks() {
  const { data } = await api.get('/tasks')

  return data.data
}

async function fetchTask(id: string) {
  const { data } = await api.get(`/tasks/${id}`)

  return data.data
}

async function fetchTaskAnswers(id: string) {
  const { data } = await api.get(`/tasks/${id}/answers`)

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

async function createTaskUser(id: string, opts) {
  const { data } = await api.post(`/tasks/${id}/users`, opts)

  return data.data
}

async function updateTask(id: string, opts) {
  const { data } = await api.put(`/tasks/${id}`, opts)

  return data.data
}

export function useTasks() {
  return {
    fetchTasks,
    fetchTask,
    fetchTaskAnswers,
    answerTask,
    createTaskUser,
    createTask,
    updateTask,
  }
}
