import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
// import { notifErr } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useFormMutasiStore = defineStore('formmutasi', {
  state: () => ({
    loading: false,
    jenis_kepegawaian: [],
    form: {
      jenis_pegawai: '',
      kode_mutasi: '',
      no_surat: '',
      tgl_surat: '',
      tgl_mutasi: '',
      tgl_entry: ''
    }
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
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + (date.getDate())).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      // this.form.tgl_surat = formatDb
      // this.form.tgl_mutasi = formatDb
      // this.form.tgl_entry = formatDb
      console.log(formatDb)
    },
    setForm (name, val) {
      this.form[name] = val
    }
  }
})
