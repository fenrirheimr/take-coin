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
      subscribed: true
      // canLoadMore: false,
      // offset: 0
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
    getUserSubscription(state) {
      return state.subscribed
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
          limit: 30,
          offset: this.offset,
        },
      }))
      this.referrals = [...data.items.sort((a, b) => b.mined_money - a.mined_money)]
    },
    async chekUserSubscription() {
      const { data } = await BACKEND.get('/api/check_subscription', withAuthorization(null, {
        params: {
          user_id: this.userId,
          telegram_channel_id: -100199577512,
        },
      }))

      console.log('chekUserSubscription', data.subscribed)
      this.subscribed = data.subscribed
    }
  },
})
