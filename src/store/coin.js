import { defineStore } from 'pinia'
import debounce from 'lodash/debounce.js'
import { userStore } from './user'
import { passportStore } from './passport'
import { BACKEND, withAuthorization } from '@/remotes'

export const coinStore = defineStore('coin', {
  namespaced: true,
  state: () => {
    return {
      coinsValue: 0,
      dayLimit: userStore().getUserData.limit,
      totalCoinsValue: 10000,
      counter: null,
      counterRun: false
    }
  },
  getters: {
    getCoinsValue(state) {
      return state.coinsValue
    },
  },
  actions: {
    setCoinsValue() {
      return userStore().getCoinsValue
    },
    async incrementCoinsValue() {
      this.coinsValue++

      const token = passportStore().getAuthData.access_token
      const userId = userStore().getUserData.user_id

      await BACKEND.post('/api/update-personal-balance', {
        user_id: userId,
        amount: 1
      }, withAuthorization(token))
    },
    async decrementLimitValue() {
      this.dayLimit--
      if (this.dayLimit < userStore().getUserData.limit && !this.counterRun) {
        this.counterRun = true
        this.calculateLimit()
      }
    },
    calculateLimit() {
      // this.counter = setInterval(() => {
      setTimeout(() => {
        if (this.dayLimit < userStore().getUserData.limit) {
          this.dayLimit++
          this.calculateLimit()
        } else {
          this.counterRun = false
          // clearInterval(this.counter);
        }
        },1000,
      );
    }
  }
})
