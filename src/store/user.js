import { defineStore } from 'pinia'
import { passportStore } from './passport'
import { BACKEND, withAuthorization } from '@/remotes'

export const userStore = defineStore('user', {
  namespaced: true,
  state: () => {
    return {
      error: false,
      loaded: false,
      user: {},
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
    async userData(tgUserId) {
      console.log('userId', tgUserId)
      // alert('userId', userId)
      try {
        const token = this.getToken

        const { data } = await BACKEND.get('/api/user-data', withAuthorization(token, {
          params: {
            user_id: tgUserId,
          },
        }))

        this.user = {...data}
        this.setIsLoaded(true, false)
      } catch (error) {
        // console.log('e >>>>>>>>>>>>', e)
        this.setIsLoaded(false, true)
        // if (error.response) {
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // }
      }
    },
    setIsLoaded(loaded, error) {
      console.log('e?', error)
      this.loaded = loaded
      this.error = error
    }
  }
})
