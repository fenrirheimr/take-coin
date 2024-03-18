import { defineStore } from 'pinia'
import { userStore } from './user'
import { passportStore } from './passport'
import { BACKEND, withAuthorization } from '@/remotes'

// const us = userStore()

export const coinStore = defineStore('coin', {
  namespaced: true,
  state: () => {
    return {
      // coinsValue: null,
      coinsValue: 0,
      dayCoinsValue: JSON.parse(localStorage.getItem('dayCoinsValue') || 1000),
      // dayCoinsValue: JSON.parse(localStorage.getItem('dayCoinsValue') || 1000),
      totalCoinsValue: 10000,
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

      console.log('incrementCoinsValue', this.coinsValue)
      await BACKEND.post('/api/update-personal-balance', {
        user_id: userId,
        amount: 1
      }, withAuthorization(token))

      await userStore().userData(userId)
    },


    async decrementDayCoinsValue() {
      this.dayCoinsValue--
      // localStorage.setItem('dayCoinsValue', JSON.stringify(this.dayCoinsValue))

      const token = passportStore().getAuthData.access_token
      const userId = userStore().getUserData.user_id

      await BACKEND.post('/api/update-subscribes-balance', {
        user_id: userId,
        amount: 1
      }, withAuthorization(token))

      await userStore().userData(userId)
    }
  }
})
