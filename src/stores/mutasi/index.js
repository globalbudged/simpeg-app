import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
// import { notifErr } from 'src/modules/utils'
// import { Dialog } from 'quasar'
import { dbFormat } from 'src/modules/formatter'

export const useMutasiStore = defineStore('mutasi', {
  state: () => ({
    loading: false,
    mutations: [{ kode: 'MM', nama: 'Mutasi Masuk' }, { kode: 'MK', nama: 'Mutasi Keluar' }, { kode: 'MAR', nama: 'Mutasi Antar Ruang' }],
    jenis_kepegawaian: [],

    form: {
      kode_mutasi: '',
      no_mutasi: '',
      jenis_kepegawaian_id: null,
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
      await api.get('/autocomplete').then((resp) => {
        console.log(resp)
        const results = resp.data.result
        this.jenis_kepegawaian = results.jenis_kepegawaian
      })
        .catch(error => {
          console.log(error)
        })
    },

    setToday () {
      const date = new Date()
      const formatDb = dbFormat(date)
      this.setForm('tgl_surat', formatDb)
      this.setForm('tgl_mutasi', formatDb)
      this.setForm('tgl_entry', formatDb)
    },
    setForm (name, val) {
      this.form[name] = val
    },
    async saveData () {
      await api.post('/mutasi/adding_data', this.form)
        .then((resp) => {
          console.log(resp)
        // return new Promise((resolve, reject) => {
        //   resolve(resp)
        // })
        }).catch(error => {
          console.log(error.response)
        // notifErr(error.response)
        })
    }
  }
})
