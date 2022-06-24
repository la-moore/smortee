import { reactive } from 'vue'
import { api } from '~/plugins/api'

const state = reactive({})

async function fetchStats() {
  const { data } = await api.get('/stats')

  return data.data
}

export function useStats() {
  return {
    fetchStats,
  }
}
