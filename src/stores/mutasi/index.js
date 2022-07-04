import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
// import { notifErr } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useMutasiStore = defineStore('mutasi', {
  state: () => ({
    loading: false,
    jenis_kepegawaian: []
  }),

  getters: {

  },

  actions: {
    async getAutocomplete () {
      this.loading = true
      await api.get('/autocomplete').then(resp => {
        console.log('autocomplete', resp)
        const results = resp.data.result
        this.jenis_kepegawaian = results.jenis_kepegawaian
      }).catch(error => {
        console.log('autocomplete', error)
      })
      this.loading = false
    }
  }
})
