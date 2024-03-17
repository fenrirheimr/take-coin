import axios from 'axios'

const endpoint = {
  baseURL: 'http://replic1.rgwebservice.ru:85',
}

// export function withAuthorization(token, config = {}) {
//   return {
//     ...config,
//     headers: {
//       ...config.headers,
//       'x-apikey': token,
//     },
//   }
// }

export function withAuthorization(authorization, config = {}) {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${authorization}`,
    },
  }
}

// export const PORTFOLIO = axios.create(endpoint)
export const BACKEND = axios.create(endpoint)
