import { Plugin } from 'vue'
import axios, { AxiosInstance } from 'axios'

interface AxiosPluginOptions {
  baseURL: string
}

export const api: AxiosInstance = axios.create()
export const apiLocal: AxiosInstance = axios.create()

const plugin: Plugin = function(app, options: AxiosPluginOptions) {
  api.defaults.baseURL = options.baseURL
  apiLocal.defaults.baseURL = 'http://127.0.0.1:8000/api'
}

export default plugin
