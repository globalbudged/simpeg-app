import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getLocalToken } from 'src/modules/storage'
// import { LocalStorage } from 'quasar'
// import { useAuthStore } from 'src/stores/auth'

const SERVER = process.env.API
const API_VERSION_PREFIX = '/api/v1'

// axios.defaults.withCredentials = true
// axios.defaults.baseURL = SERVER

// for api

const api = axios.create(
  {
    baseURL: SERVER + API_VERSION_PREFIX,
    withCredentials: true
  }
)
// api.defaults.headers.get.Accepts = 'application/json'
// api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// api.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

api.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

// eslint-disable-next-line no-return-assign
const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
const deleteToken = () => delete api.defaults.headers.common.Authorization

export { axios, api, setToken, deleteToken, API_VERSION_PREFIX }
