import { defineStore } from 'pinia'
import { passportStore } from './passport'
import { BACKEND, withAuthorization } from '@/remotes'

export const userStore = defineStore('user', {
  namespaced: true,
  state: () => {
    return {
      error: false,
      loaded: false,
      user: null,
    }
  },
  getters: {
    getUserData(state) {
      return state.user
    },
    isError(state) {
      return state.error
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

    async userFetch(tgUserId) {
      console.log('>>>')


    },
    async userData(tgUserId) {
      const token = this.getToken
      console.log('?')
      try {
        const { data } = await BACKEND.get('/api/user-data', withAuthorization(token, {
          params: {
            user_id: tgUserId,
          },
        }))
        this.user = {...data}
        this.setIsLoaded(true, false)
      } catch (error) {
        this.setIsLoaded(false, true)
      }
    },
    setIsLoaded(loaded, error) {
      this.loaded = loaded
      this.error = error
    }
  }
})
