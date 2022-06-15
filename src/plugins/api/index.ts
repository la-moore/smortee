import { Plugin } from 'vue'
import axios, { AxiosInstance } from 'axios'

interface AxiosPluginOptions {
  baseURL: string
}

export const api: AxiosInstance = axios.create()

const plugin: Plugin = function(app, options: AxiosPluginOptions) {
  api.defaults.baseURL = options.baseURL
}

export default plugin
