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

async function fetchTaskAnswer(taskId: string, id: string) {
  const { data } = await api.get(`/tasks/${taskId}/answers/${id}`)

  return data.data
}

async function fetchTaskUsers(id: string) {
  const { data } = await api.get(`/tasks/${id}/users`)

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

async function updateTaskAnswer(taskId: string, id: string, opts) {
  const { data } = await api.put(`/tasks/${taskId}/answers/${id}`, opts)

  return data.data
}

export function useTasks() {
  return {
    fetchTasks,
    fetchTask,
    fetchTaskAnswer,
    fetchTaskAnswers,
    fetchTaskUsers,
    answerTask,
    createTaskUser,
    createTask,
    updateTask,
    updateTaskAnswer,
  }
}
