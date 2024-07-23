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
      // console.log('1')
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
          offset: 0,
        },
      }))
      // console.log('loadReferrals', data.items)
      this.referrals = [...data.items.sort((a, b) => b.mined_money - a.mined_money)]
    },
    async chekUserSubscription() {
      // console.log('2')
      const { data } = await BACKEND.get('/api/check_subscription', withAuthorization(null, {
        params: {
          user_id: this.userId,
          telegram_channel_id: -1001999577512,
        },
      }))
      // console.log('3', data.subscribed)
      // console.log('chekUserSubscription', data.subscribed)
      this.subscribed = data.subscribed
      return data.subscribed
    }
  },
})
