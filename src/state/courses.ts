import { reactive, toRef } from 'vue'
import { api } from '~/plugins/api'

const state = reactive({})

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
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    fetchCourseArticles,
  }
}
