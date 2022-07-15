import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { routerInstance } from 'src/boot/router'
import { waitLoad, notifSuccess, notifErrVue } from 'src/modules/utils'
// import { useAuthStore } from './auth'
import { Dialog } from 'quasar'

export const useMarStore = defineStore('mar', {
  state: () => ({
    form: {
      no_mutasi: '',
      no_surat: '',
      mutation_id: '',
      jenis_kepegawaian_id: '',
      jenis_phk_id: '',
      dasar_phk: ''
    },
    details: [],
    slug: null
  }),

  getters: {},

  actions: {
    async task () {
      waitLoad('show')
      await this.getHeader()
      waitLoad('done')
      this.setToday()
    },
    async getHeader () {
      this.slug = routerInstance.currentRoute.value.params.slug
      const params = { params: { uuid: this.slug } }
      await api
        .get('/mutasi_by_uuid', params)
        .then((resp) => {
          console.log('header', resp)
          this.form.mutation_id = resp.data.result.id
          this.form.no_mutasi = resp.data.result.no_mutasi
          this.form.no_surat = resp.data.result.no_surat
          this.form.jenis_phk_id = resp.data.result.jenis_phk_id
          this.form.dasar_phk = resp.data.result.dasar_phk
          this.form.jenis_kepegawaian_id = resp.data.result.jenis_kepegawaian_id
          this.setDetails(resp.data.result.mutasi_details)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal_lahir = formatDb
      this.form.tmt = formatDb
    },
    setDetails (payload) {
      this.details = []
      this.details = payload
    },
    setUnshiftDetails (payload) {
      this.details.unshift(payload)
    },

    async sendToList (payload) {
      const find = this.details.filter(x => x.pegawai.id === payload.id)
      console.log('find', find)
      if (find.length > 0) {
        return notifErrVue('Hei, NIK ini sudah ada di list!')
      }
      this.setUnshiftDetails(payload)
      return new Promise((resolve, reject) => {
        const form = this.details[0]
        this.saveNewList(form)
        resolve()
      })
    },
    async saveNewList (payload) {
      const params = payload
      //   console.log(params)
      await api
        .post('/mutasidetail/adding_data', params)
        .then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          // this.loading = false
          this.getHeader()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async deleteList (idx) {
      // console.log('del', this.details[idx])
      this.details[idx].isWait = true
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Data dengan nama <strong>${this.details[idx].pegawai.nama}</strong> Akan dihapus dari daftar list?`,
        cancel: true,
        html: true
        // persistent: true
      })
        .onOk(async () => {
          const params = { id: this.details[idx].id }
          await api
            .post('/mutasidetail/del_mutasi_antar', params)
            .then((resp) => {
              console.log(resp)
              notifSuccess(resp)
              this.getHeader()
              // this.newData()
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .onCancel(() => {
          this.details[idx].isWait = false
        })
    }
  }// actions
})
