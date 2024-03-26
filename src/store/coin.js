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
      // initLimit: userStore().getUserData.limit,
      dayLimit: userStore().getUserData.limit,
      // limit: JSON.parse(localStorage.getItem('dayLimitValue') || 1000),
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

      await userStore().userData(userId)
    },
    async decrementLimitValue() {
      this.dayLimit--
      const userId = userStore().getUserData.user_id

      console.log('dayLimit', this.dayLimit)
      await userStore().userData(userId)
      if (this.dayLimit < userStore().getUserData.limit && !this.counterRun) {
        this.counterRun = true
        this.calculateLimit()
      }
    },
    calculateLimit() {
      this.counter = setInterval(() => {
        if (this.dayLimit < userStore().getUserData.limit) {
          this.dayLimit++
        } else {
          clearInterval(this.counter);
        }
        },1000,
      );
    }
  }
})
