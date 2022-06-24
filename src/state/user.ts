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

export function useUser() {
  return {
    fetchMe,
  }
}
