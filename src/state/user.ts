import { reactive } from 'vue'
import { api } from '~/plugins/api'

const state = reactive({
  user: undefined
})

async function fetchMe() {
  if (state.user) {
    return state.user
  }

  const { data } = await api.get('/me')

  state.user = data.data

  return data.data
}

async function fetchUsers() {
  const { data } = await api.get('/users')

  return data.data
}

async function updateUser(id: string, opts) {
  const { data } = await api.put(`/users/${id}`, opts)

  return data.data
}

async function fetchUser(id: string) {
  const { data } = await api.get(`/users/${id}`)

  return data.data
}

async function fetchUserAnswers(id: string) {
  const { data } = await api.get(`/users/${id}/answers`)

  return data.data
}

export function useUser() {
  return {
    fetchMe,
    fetchUser,
    fetchUsers,
    updateUser,
    fetchUserAnswers
  }
}
