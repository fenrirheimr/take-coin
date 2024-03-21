import { defineStore } from 'pinia'
import { passportStore } from './passport'
import { BACKEND, withAuthorization } from '@/remotes'

export const userStore = defineStore('user', {
  namespaced: true,
  state: () => {
    return {
      loading: true,
      loaded: false,
      user: {},
    }
  },
  getters: {
    getUserData(state) {
      return state.user
    },
    isLoaded(state) {
      return state.loaded
    },
    getCoinsValue(state) {
      return state.user?.balance_personal
    },
    getToken() {
      return passportStore()?.getAuthData?.access_token
    },
  },
  actions: {
    async userData(userId) {
      try {
        const token = this.getToken

        const { data } = await BACKEND.get('/api/user-data', withAuthorization(token, {
          params: {
            user_id: userId,
          },
        }))

        this.user = {...data}
        this.setIsLoaded()
      } catch (e) {
        console.log('e', e)
      }
    },
    setIsLoaded() {
      this.loaded = true
    }
  }
})
