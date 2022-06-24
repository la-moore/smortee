import { Plugin } from 'vue'
import axios, { AxiosInstance } from 'axios'
import { handleAuth } from './interceptors/handle-auth'
import Storage from '~/plugins/storage/local'

interface AxiosPluginOptions {
  baseUrl: string
}

export const api: AxiosInstance = axios.create()
export const apiAuth: AxiosInstance = axios.create()

const plugin: Plugin = function(app, options: AxiosPluginOptions) {
  api.defaults.baseURL = `${options.baseUrl}/api`
  apiAuth.defaults.baseURL = `${options.baseUrl}/auth`

  api.defaults.headers['Authorization'] = `Bearer ${Storage.get('smortee.accessToken')}`
  apiAuth.defaults.headers['Authorization'] = `Bearer ${Storage.get('smortee.refreshToken')}`

  api.interceptors.response.use((v) => v, (err) => handleAuth(err, api))
  apiAuth.interceptors.response.use((v) => v, (err) => handleAuth(err, apiAuth))
}

export default plugin
