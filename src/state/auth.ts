import { reactive } from 'vue'
import { api, apiAuth } from '~/plugins/api'
import Storage from '~/plugins/storage/local'

const state = reactive({
  accessToken: Storage.get('smortee.accessToken'),
  refreshToken: Storage.get('smortee.refreshToken'),
})

async function login(opts) {
  const { data } = await apiAuth.post('/login', opts)

  api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`
  apiAuth.defaults.headers['Authorization'] = `Bearer ${data.access_token}`

  state.accessToken = data.access_token
  state.refreshToken = data.refresh_token

  Storage.set('smortee.accessToken', data.access_token)
  Storage.set('smortee.refreshToken', data.refresh_token)

  return data.data
}

function logout() {
  state.accessToken = ''
  state.refreshToken = ''

  Storage.remove('smortee.accessToken')
  Storage.remove('smortee.refreshToken')
}

async function refreshAuth() {
  const { data } = await apiAuth.post('/refresh', {
    token: state.refreshToken
  })

  state.accessToken = data.access_token
  state.refreshToken = data.refresh_token

  return data.data
}

export function useAuth() {
  return {
    login,
    logout,
    refreshAuth
  }
}
