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
      // dayLimit: 10,
      counter: 0,
      counterRun: false,
    }
  },
  getters: {
    getCoinsValue(state) {
      return state.coinsValue
    },
  },
  actions: {
    async incrementCoinsValue(value) {
      this.coinsValue++
      // console.log('this +1000', value)
      const token = passportStore().getAuthData.access_token
      const userId = userStore().getUserData.user_id
      // console.log('incrementCoinsValue', this.dayLimit)
      if (this.dayLimit === 1) {
        // console.log('this +1000', value)
        await BACKEND.post('/api/update-personal-balance', {
          user_id: userId,
          amount: 1000,
        }, withAuthorization(token))

        this.counterRun = false
        clearInterval(this.counter)
        this.dayLimit = userStore().getUserData.limit
      }
      else {
        await BACKEND.post('/api/update-personal-balance', {
          user_id: userId,
          amount: value,
        }, withAuthorization(token))
      }

      await userStore().userData(userId)
    },
    async decrementLimitValue() {
      this.dayLimit--

      const userId = userStore().getUserData.user_id
      await userStore().userData(userId)

      if (this.dayLimit < userStore().getUserData.limit && !this.counterRun) {
        this.counterRun = true
        this.calculateLimit()
      }

      // if (this.dayLimit === 0) {
        
      //   console.log('dayLimit end')
      // }
    },
    calculateLimit() {
      // console.log('this.counter 1', this.counter)
      this.counter = setInterval(() => {
        if (this.dayLimit < userStore().getUserData.limit) {
          this.dayLimit++
        }
        else {
          clearInterval(this.counter)
        }
      }, 1000)
      // console.log('this.counter 2', this.counter)
    },
  },
})
