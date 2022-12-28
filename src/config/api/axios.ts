import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://apifocus.up.railway.app',
})

export const apiPrivate = axios.create({
  baseURL: 'https://apifocus.up.railway.app',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})
