import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifErr, waitLoad } from 'src/modules/utils'
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
      tgl_phk: '',
      dasar_phk: '',
      jenis_phk: '',
      dasar: '',
      kepada: '',
      untuk: ''
    }
  }),

  getters: {

  },

  actions: {
    async getAutocomplete () {
      waitLoad('show')
      await api.get('/autocomplete').then((resp) => {
        console.log(resp)
        const results = resp.data.result
        this.jenis_kepegawaian = results.jenis_kepegawaian

        waitLoad('done')
      })
        .catch(error => {
          console.log(error)
          waitLoad('done')
        })
    },

    setToday () {
      const date = new Date()
      const formatDb = dbFormat(date)
      this.setForm('tgl_surat', formatDb)
      this.setForm('tgl_mutasi', formatDb)
      this.setForm('tgl_phk', formatDb)
    },
    setForm (name, val) {
      this.form[name] = val
    },
    resetFORM () {
      this.form = {}
      const columns = ['kode_mutasi', 'no_mutasi', 'jenis_kepegawaian_id', 'no_surat', 'tgl_surat', 'tgl_mutasi', 'tgl_entry']
      for (let i = 0; i < columns.length; i++) {
        this.form[columns[i]] = ''
      }
      this.setToday()
      this.setForm('jenis_kepegawaian_id', null)
    },
    async saveData () {
      this.loading = true
      await api.post('/mutasi/adding_data', this.form)
        .then((resp) => {
          if (this.form.kode_mutasi === 'MM') {
            routerInstance.replace({ name: 'mutasi.masuk', params: { slug: resp.data.result.uuid } })
          } else if (this.form.kode_mutasi === 'MK') {
            routerInstance.replace({ name: 'mutasi.keluar', params: { slug: resp.data.result.uuid } })
          } else {
            routerInstance.replace({ name: 'mutasi.antar', params: { slug: resp.data.result.uuid } })
          }
          this.loading = false
          this.resetFORM()
        }).catch(error => {
          console.log(error.response)
          notifErr(error.response)
          this.loading = false
        })
    }

  }
})
