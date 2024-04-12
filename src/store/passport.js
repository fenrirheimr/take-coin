import { defineStore } from 'pinia'
import { BACKEND, withAuthorization } from '@/remotes'

export const passportStore = defineStore('passport', {
  namespaced: true,
  state: () => {
    return {
      auth: null,
      tgUserId: null
    }
  },
  getters: {
    getTgUserId(state) {
      return state.tgUserId
    },
    getAuthData(state) {
      if (state.auth !== null)
        return state.auth
    },
  },
  actions: {
    async userAuth() {
      const userId = '2'
      const password = '111111'

      const formData = new FormData()
      formData.append('username', userId)
      formData.append('password', password)
      const { data } = await BACKEND.post('/auth/token', formData, withAuthorization(null))

      this.auth = { ...data }
    },
    setTgUserId(id) {
      this.tgUserId = id
    }
  },
})
