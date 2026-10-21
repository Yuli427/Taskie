import axios from 'axios'

const AUTH_API_URL = 'https://stake-meeting-enemies-purple.trycloudflare.com/api/auth'

export function login(loginData) {
  return axios.post(`${AUTH_API_URL}/login`,loginData)
}

export function register(registerData) {
  return axios.post(`${AUTH_API_URL}/register`,registerData)
}