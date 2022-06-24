import { AxiosResponse, AxiosInstance } from 'axios'
import { useAuth } from '~/state/auth'
import router from '~/router'

const state = {
  isRefreshing: false,
  requests: []
}

export async function handleAuth(err: AxiosResponse, client: AxiosInstance) {
  const { request, config } = err
  const { logout, refreshAuth } = useAuth()

  if (request.status === 401) {
    if(state.isRefreshing) {
      return new Promise((resolve) => {
        state.requests.push(() => {
          if( config.url.indexOf('?') > -1) {
            config.url = config.url + '&n='+ new Date().getTime()
          } else  {
            config.url = config.url + '?n='+ new Date().getTime()
          }

          resolve(client(config))
        })
      })
    } else {
      state.isRefreshing = true

      try {
        await refreshAuth()
        state.requests.forEach(cb => cb())
        state.requests = []

        return client(config)
      } catch(error: any) {
        logout()
        await router.push({ name: 'login' })
        await Promise.reject(err)
      } finally {
        state.isRefreshing = false
      }
    }
  }

  return Promise.reject(err)
}
