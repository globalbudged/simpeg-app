import { defineStore } from 'pinia'
import { axios, api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
// import { notifErr, notifSuccess } from 'src/modules/utils'
// import { useAuthStore } from './auth'
// import { Dialog } from 'quasar'

export const useFormDetailMutasiStore = defineStore('formdetail', {
  state: () => ({
    isOpen: false,
    form: {
      // data diri
      nip: '46346',
      nik: '4643643',
      nama: 'gdfgfdgd',
      tempat_lahir: '',
      tanggal_lahir: '',
      agama: 'Islam',
      gender: 'L',
      contact: '',
      // alamat asal
      alamat: '',
      provinsi: '',
      kabkot: '',
      kecamatan: '',
      kelurahan: '',
      kodepos: '',

      // pendidikan dan kepegawaian
      pendidikan_id: '',
      kategori_id: '', // kelompok medis
      jurusan_id: '',
      sekolah: '',
      tmt: '',
      // user login,
      email: '',
      password: ''
    },
    api_wilayah: 'https://globalbudged.github.io/api-wilayah-indonesia/static/api',
    provinces: [],
    kotas: [],
    kecs: [],
    kels: [],
    loadingSelect: false,
    loading: false,
    edited: false,

    autocompletes: {
      pendidikans: [],
      kelompokMedis: []
    },
    jurusans: []
  }),

  getters: {

  },

  actions: {
    async getProvinces (id) {
      await axios.get(`${this.api_wilayah}/provinces.json`)
        .then((resp) => {
          console.log(resp)
          this.provinces = resp.data
          return resp.data.name
        }).catch(err => {
          console.log(err)
        })
    },
    async getKota (val) {
      this.loadingSelect = true
      if (this.provinces.length > 0) {
        console.log('jika data array provinsi ada')
        let temp = []
        temp = this.provinces.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/regencies/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.kotas = resp.data
              console.log('kotas', this.kotas)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async getKec (val) {
      this.loadingSelect = true
      if (this.kotas.length > 0) {
        console.log('jika data array provinsi ada')
        let temp = []
        temp = this.kotas.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/districts/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.kecs = resp.data
              console.log('kec', this.kecs)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async getKels (val) {
      this.loadingSelect = true
      if (this.kecs.length > 0) {
        let temp = []
        temp = this.kecs.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/villages/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.kels = resp.data
              this.loadingSelect = false
              console.log('kec', this.kels)
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + (date.getDate())).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal_lahir = formatDb
      this.form.tmt = formatDb
    },
    setForm (name, val) {
      this.form[name] = val
    },
    // async saveForm () {
    //   this.loading = true
    //   try {
    //     const resp = await api.post('/pegawai/adding_data', this.form)
    //     console.log('save data', resp)
    //     if (resp.status === 201) { // ini untuk post request
    //       notifSuccess(resp)
    //       this.resetFORM()
    //       // ini untuk panggil data table
    //       const authStore = useAuthStore()
    //       authStore.getUser()
    //       this.loading = false
    //       return new Promise((resolve) => {
    //         resolve(resp)
    //       })
    //       // ini untuk load data
    //     }
    //     this.loading = false
    //   } catch (error) {
    //     console.log('saved err', error.response)
    //     notifErr(error.response)
    //     this.loading = false
    //   }
    // },
    resetFORM () {
      this.form = {}
      const columns = ['nip', 'nik', 'nama', 'tempat_lahir', 'tanggal_lahir', 'agama', 'gender', 'contact', 'alamat', 'provinsi', 'kabkot', 'kecamatan', 'kelurahan', 'kodepos', 'pendidikan', 'sekolah', 'tmt', 'email', 'password']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setToday()
      this.setForm('gender', 'L')
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
      this.setForm('email', val.user.email)
      this.isOpen = !this.isOpen
    },

    // ================================================================AUTOCOMPLETE
    async getAutocomplete () {
      await api.get('/autocomplete').then((resp) => {
        console.log(resp)
        const results = resp.data.result
        this.autocompletes.pendidikans = results.pendidikans
        this.autocompletes.kelompokMedis = results.kategoris
      })
        .catch(error => {
          console.log(error)
        })
    },

    async getJurusans (payload) {
      const search = typeof payload !== 'undefined' || payload != null ? payload : ''
      const params = {
        params: {
          q: search
        }
      }
      await api.get('/autocomplete/jurusans', params).then(resp => {
        console.log('jurusan', resp)
      })
    }

  }
})
