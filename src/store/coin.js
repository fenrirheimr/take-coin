import { defineStore } from 'pinia'
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
      counterRun: false,
      flash: false
    }
  },
  getters: {
    getFlash(state) {
      return state.flash
    },
    getCoinsValue(state) {
      return state.coinsValue
    },
  },
  actions: {
    async incrementCoinsValue() {
      this.coinsValue++

      const token = passportStore().getAuthData.access_token
      const userId = userStore().getUserData.user_id
      // if(this.dayLimit === 1) {
      if(this.dayLimit === 991) {
        console.log('991')
        // this.flash = true
        // this.dayLimit = userStore().getUserData.limit

        await BACKEND.post('/api/update-personal-balance', {
          user_id: userId,
          amount: 1000
        }, withAuthorization(token))
      } else {
        await BACKEND.post('/api/update-personal-balance', {
          user_id: userId,
          amount: 1
        }, withAuthorization(token))
      }

      await userStore().userData(userId)
    },
    async decrementLimitValue() {
      // setTimeout(() => {
      //   this.flash = false
      // }, 700)
      this.dayLimit--
      const userId = userStore().getUserData.user_id

      await userStore().userData(userId)
      if (this.dayLimit < userStore().getUserData.limit && !this.counterRun) {
        this.counterRun = true
        this.calculateLimit()
      }
      if (this.dayLimit === 990) {
        this.counterRun = false
        // this.flash = true
        clearInterval(this.counter)
        this.dayLimit = userStore().getUserData.limit
        console.log('dayLimit end')
      }
      // this.flash = false
    },
    calculateLimit() {
      this.counter = setInterval(() => {
        if (this.dayLimit < userStore().getUserData.limit) {
          this.dayLimit++
        } else {
          clearInterval(this.counter)
        }
        },1000,
      );
    }
  }
})
