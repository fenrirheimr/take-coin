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
      referrals: null,
      loadedItems: null,
      userId: null,
      canLoadMore: false,
      offset: 0
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
    getReferrals(state) {
      return state.referrals
    },

    getUserId(state) {
      return state.userId
    },
  },
  actions: {
    async userData(tgUserId) {
      const token = this.getToken
      try {
        const { data } = await BACKEND.get('/api/user-data', withAuthorization(token, {
          params: {
            user_id: tgUserId,
          },
        }))
        this.user = { ...data }
        this.userId = tgUserId
        this.setIsLoaded(true, false)
      }
      catch (error) {
        this.setIsLoaded(false, true)
      }
    },
    setIsLoaded(loaded, error) {
      this.loaded = loaded
      this.error = error
    },
    async loadReferrals(tgUserId) {
      const token = this.getToken
      const { data } = await BACKEND.get('/api/user-referrals', withAuthorization(token, {
        params: {
          user_id: tgUserId,
          limit: 10,
          offset: this.offset,
        },
      }))
      this.offset = this.offset + data.items.length
      this.referrals = [...data.items]
      if (data.items.length >= 10) {
        this.canLoadMore = true
      }
    },
    async loadMoreReferrals(tgUserId) {

      const token = this.getToken
      if (this.canLoadMore) {
        console.log('I can load more')
        const { data } = await BACKEND.get('/api/user-referrals', withAuthorization(token, {
          params: {
            user_id: tgUserId,
            limit: 10,
            offset: this.offset,
          },
        }))
          
        this.canLoadMore = data.items.length >= 10
  
        this.offset = this.offset + data.items.length
  
        this.referrals = [...this.referrals, ...data.items]

        alert('scroll2', this.offset)
      }
    },
  },
})
