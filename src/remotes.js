import axios from 'axios'

const endpoint = {
  baseURL: 'https://balance.rgwebservice.ru',
}

export function withAuthorization(authorization, config = {}) {
  console.log('withAuthorization', authorization)
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${authorization}`,
    },
  }
}

export const BACKEND = axios.create(endpoint)
