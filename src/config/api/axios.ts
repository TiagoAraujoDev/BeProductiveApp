import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: URL,
})

export const apiPrivate = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})
