import { reactive, toRef } from 'vue'
import { api } from '~/plugins/api'

const state = reactive({})

async function fetchArticles() {
  const { data } = await api.get('/articles')

  return data.data
}

async function fetchArticle(id: string) {
  const { data } = await api.get(`/articles/${id}`)

  return data.data
}

async function fetchArticleTasks(id: string) {
  const { data } = await api.get(`/articles/${id}/tasks`)

  return data.data
}

async function createArticle(opts) {
  const { data } = await api.post('/articles', opts)

  return data.data
}

async function updateArticle(id: string, opts) {
  const { data } = await api.put(`/articles/${id}`, opts)

  return data.data
}

export function useArticles() {
  return {
    fetchArticles,
    fetchArticle,
    fetchArticleTasks,
    createArticle,
    updateArticle,
  }
}
