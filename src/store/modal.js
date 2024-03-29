import { defineStore } from 'pinia'

export const modalStore = defineStore('modal', {
  namespaced: true,
  state: () => {
    return {
      data: null,
    }
  },
  getters: {
    getModalData(state) {
      return state.data
    },
  },
  actions: {
    setModalData(data) {
      this.data = null
      this.data = {...data}
    }
  }
})
