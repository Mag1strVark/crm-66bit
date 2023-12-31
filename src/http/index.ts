import axios from 'axios'
import qs from 'qs'
import { Token } from 'models/Auth.ts'

const API_URL = 'http://localhost:10000/api/v1'

const $host = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: API_URL,
})

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const form = {
          client_id: 'frontend',
          client_secret: 'secret',
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refresh_token'),
        }

        const optionsInterceptor = {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(form),
          url: `${import.meta.env.VITE_API_IDENTITY_URL}/connect/token`,
          method: 'POST',
        }

        const { data, status } = await axios<Token>(optionsInterceptor)
        const { access_token, refresh_token } = data

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        //return  $api.request(originalRequest)

        return {
          data,
          status,
        }
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  }
)

export { $api, $host }
