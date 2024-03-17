import { defineStore } from 'pinia'
import { userStore } from './user'

// const us = userStore()

export const coinStore = defineStore('coin', {
  namespaced: true,
  state: () => {
    return {
      coinsValue: null,
      dayCoinsValue: JSON.parse(localStorage.getItem('dayCoinsValue') || 1000),
      totalCoinsValue: 10000,
    }
  },
  getters: {
    getCoinsValue(state) {
      console.log('coin getCoinsValue', state.coinsValue)
      return state.coinsValue
    },
  },
  actions: {
    setCoinsValue() {
      this.coinsValue = userStore().getCoinsValue
    },
    incrementCoinsValue() {
      this.coinsValue++
      localStorage.setItem('balancePersonal', JSON.stringify(this.coinsValue))
    },
    decrementDayCoinsValue() {
      this.dayCoinsValue--
      localStorage.setItem('dayCoinsValue', JSON.stringify(this.dayCoinsValue))
    }
  }
})
