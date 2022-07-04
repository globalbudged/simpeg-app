import { defineStore } from 'pinia'
// import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
// import { notifErr } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useMasterStore = defineStore('master', {
  state: () => ({
    wider: false
  }),

  getters: {

  },

  actions: {
    SET_WIDER () {
      this.wider = !this.wider
    }
  }
})
