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
      console.log('user getCoinsValue', state.user.balance_personal)
      return state.user?.balance_personal
    },
  },
  actions: {
    async userData(userId) {
      const token = passportStore().getAuthData.access_token

      const { data } = await BACKEND.get('/api/user-data', withAuthorization(token, {
        params: {
          user_id: userId,
        },
      }))

      const count = JSON.parse(localStorage.getItem('balancePersonal') || 0)

      this.user = {
        ...data,
        balance_personal: data.balance_personal > count ? data.balance_personal : count
      }
      this.setIsLoaded()
    },
    setIsLoaded() {
      this.loaded = true
    }
  }
})
