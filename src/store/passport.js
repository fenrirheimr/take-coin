import { defineStore } from 'pinia'
import { BACKEND, withAuthorization } from '@/remotes'

export const passportStore = defineStore('passport', {
  namespaced: true,
  state: () => {
    return {
      username: null,
      password: null,
      auth: {},
    }
  },
  getters: {
    getUserName(state) {
      return state.username
    },
    getAuthData(state) {
      return state.auth
    },
  },
  actions: {
    async userAuth(username, password) {
      this.username = username
      this.password = password

      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      const { data } = await BACKEND.post('/auth/token', formData, withAuthorization(null))

      this.auth = { ...data }
    },
  },
})
