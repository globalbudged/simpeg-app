import { defineStore } from 'pinia'
import { useBagianStore } from 'src/stores/master/bagian'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { useAuthStore } from './auth'
// import { Dialog } from 'quasar'

export const useFormStore = defineStore('formbagian', {
  state: () => ({
    isOpen: false,
    form: {
      nama: '',
      keterangan: '',
      flag: ''
    },
    loading: false,
    edited: false
  }),

  getters: {

  },

  actions: {
    setForm (name, val) {
      this.form[name] = val
    },
    async saveForm () {
      this.loading = true
      try {
        const resp = await api.post('/bagian/adding_data', this.form)
        console.log('save data', resp)
        if (resp.status === 201) { // ini untuk post request
          notifSuccess(resp)
          this.newData()
          // ini untuk panggil data table
          const bagianStore = useBagianStore()
          bagianStore.getDataTable()
          this.loading = false
          return new Promise((resolve) => {
            resolve(resp)
          })
          // ini untuk load data
        }
        this.loading = false
      } catch (error) {
        console.log('saved err', error.response)
        notifErr(error.response)
        this.loading = false
      }
    },
    resetFORM () {
      this.form = {}
      const columns = ['nama', 'keterangan', 'flag']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
    //   this.setToday()
    //   this.setForm('gender', 'L')
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      //   this.setForm('email', val.user.email)
      this.isOpen = !this.isOpen
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
    }

  }
})
