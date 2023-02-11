import axios from 'axios'

const URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const api = axios.create({
  baseURL: URL,
})

export const apiPrivate = axios.create({
  baseURL: URL,
  withCredentials: true,
})
