import axios from 'axios'

const endpoint = {
  baseURL: 'https://portfolio-6278.restdb.io/rest',
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

export const withAuthorization = (authorization, config = {}) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${authorization}`
  }
})

export const PORTFOLIO = axios.create(endpoint)
