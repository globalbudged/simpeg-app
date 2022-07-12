import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getLocalToken } from 'src/modules/storage'
import { notifErr } from 'src/modules/utils'
// import { LocalStorage } from 'quasar'
// import { useAuthStore } from 'src/stores/auth'

const SERVER = process.env.API
const API_VERSION_PREFIX = '/api/v1'
// for api

const api = axios.create(
  {
    baseURL: SERVER + API_VERSION_PREFIX
    // withCredentials: true
  }
)
api.defaults.headers.get.Accepts = 'application/json'
// api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// api.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

api.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`

/* Response Interceptors */
const interceptResErrors = (err) => {
  try {
    // check for response code 123 and redirect to login
    // err = Object.assign(new Error(), { message: err.response.data })
    // console.log('1. interceptResErrors', err.response)
    notifErr(err.response)
  } catch (e) {
    // check for response code 123 and redirect to login
    // Will return err if something goes wrong
    console.log('1. catch', e)
  }
  return Promise.reject(err)
}
const interceptResponse = (res) => {
  try {
    // check for response code 123 and redirect to login
    // console.log('2. interceptResponse', res)
    return Promise.resolve(res)
  } catch (e) {
    // check for response code 123 and redirect to login
    console.log('2. catch interceptResponse', res)
    return Promise.resolve(res)
  }
}
api.interceptors.response.use(interceptResponse, interceptResErrors)

/* Request Interceptors */
const interceptReqErrors = err => Promise.reject(err)
const interceptRequest = (config) => {
  return config
}
api.interceptors.request.use(interceptRequest, interceptReqErrors)

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
