import { defineStore } from 'pinia'
import { axios, api } from 'boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifErrVue, notifErr, notifSuccess } from 'src/modules/utils'
// import { useAuthStore } from './auth'
import { Dialog } from 'quasar'
// import { Dialog, LocalStorage } from 'quasar'

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
      jenis_kepegawaian_id: '',
      jurusan_id: '',
      jabatan_id: '',
      golongan_id: '',
      ruangan_id: '',
      bagian_id: '',
      kode_skpd: '',
      nama_skpd: '',
      kode_skpd_before: '',
      nama_skpd_before: '',
      // header

      no_mutasi: '',
      no_surat: '',
      mutation_id: ''
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
    jurusans: [],
    jabatans: [],
    golongans: [],
    ruangans: [],
    bagians: [],

    details: [],
    slug: '',
    index: 0
  }),

  getters: {

  },

  actions: {
    async getHeader () {
      this.slug = routerInstance.currentRoute.value.params.slug
      const params = { params: { uuid: this.slug } }
      await api.get('/mutasi_by_uuid', params).then((resp) => {
        console.log('header', resp)
        this.form.mutation_id = resp.data.result.id
        this.form.no_mutasi = resp.data.result.no_mutasi
        this.form.no_surat = resp.data.result.no_surat
        this.details = resp.data.result.mutasi_details
      }).catch(err => {
        console.log(err)
      })
    },
    cekData () {
      const params = {
        nip: this.form.nip,
        nik: this.form.nik
      }
      return new Promise((resolve, reject) => {
        api.post('/pegawai/checking', params)
          .then(resp => {
            resolve(resp)
          }).catch(error => {
            console.log(error)
            notifErr(error.response)
          })
      })
    },
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
      const columns = ['nip', 'nik', 'nama', 'tempat_lahir', 'tanggal_lahir', 'agama', 'gender', 'contact', 'alamat', 'provinsi', 'kabkot', 'kecamatan', 'kelurahan', 'kodepos',
        'pendidikan_id', 'kategori_id', 'jurusan_id', 'jabatan_id', 'golongan_id',
        'ruangan_id', 'bagian_id', 'kode_skpd', 'nama_skpd', 'kode_skpd_before', 'nama_skpd_before', 'sekolah', 'tmt']

      for (let i = 0; i < columns.length; i++) {
        this.form[columns[i]] = ''
      }
      this.setToday()
      this.setForm('gender', 'L')
      this.setForm('agama', 'Islam')
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
      this.getHeader()
      console.log('new', this.form)
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    editData (idx) {
      this.edited = true
      this.index = idx
      const val = this.details[idx]
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object pegawai
      const pegawai = this.details[idx].pegawai
      const key = Object.keys(pegawai)
      key.forEach((ky, index) => {
        this.setForm(ky, pegawai[ky])
      })

      console.log('edit', pegawai)
      this.isOpen = !this.isOpen
      return new Promise((resolve, reject) => {
        resolve()
      })
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
    // ================================================================        AUTOCOMPLETE =================== JURUSAN
    async getJurusans (payload) {
      console.log(payload)
      const search = typeof payload !== 'undefined' || payload != null ? payload : ''
      const params = {
        params: {
          q: search
        }
      }
      await api.get('/autocomplete_jurusans', params).then(resp => {
        console.log('jurusan', resp)
        this.jurusans = []
        this.jurusans = resp.data.result
      })
    },

    addJurusan (val) {
      const str = val.toUpperCase()
      const splits = str.split('-')
      const nama = splits[0]
      const profesi = splits[1]
      console.log(`${nama}, ${profesi}`)
      const params = {
        nama,
        profesi: typeof profesi !== 'undefined' || profesi != null ? profesi : ''
      }

      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah <strong>Jurusan : ${nama}
                </strong> dan <strong>Profesi: ${typeof profesi !== 'undefined' ? profesi : 'tidak ada'} </strong> Akan ditambahkan?`,
        cancel: true,
        html: true
        // persistent: true
      }).onOk(async () => {
        await api.post('/jurusan/adding_data', params).then((resp) => {
          console.log(resp)
          this.getJurusans()
          this.form.jurusan_id = resp.data.result.id
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    // ================================================================        AUTOCOMPLETE =================== JABATAN
    async getJabatans (payload) {
      console.log(payload)
      const search = typeof payload !== 'undefined' || payload != null ? payload : ''
      const params = {
        params: {
          q: search
        }
      }
      await api.get('/autocomplete_jabatans', params).then(resp => {
        console.log('jabatan', resp)
        this.jabatans = []
        this.jabatans = resp.data.result
      })
    },

    addJabatan (val) {
      const str = val.toUpperCase()
      const params = {
        nama: str
      }

      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah <strong>Jabatan : ${str}
                </strong> Akan ditambahkan?`,
        cancel: true,
        html: true
        // persistent: true
      }).onOk(async () => {
        await api.post('/jabatan/adding_data', params).then((resp) => {
          console.log(resp)
          this.getJabatans()
          this.form.jabatan_id = resp.data.result.id
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    // ================================================================        AUTOCOMPLETE =================== JABATAN
    async getGolongans (payload) {
      console.log(payload)
      const search = typeof payload !== 'undefined' || payload != null ? payload : ''
      const params = {
        params: {
          q: search
        }
      }
      await api.get('/autocomplete_golongans', params).then(resp => {
        console.log('golongan', resp)
        this.golongans = []
        this.golongans = resp.data.result
      })
    },

    addGolongan (val) {
      const str = val.toUpperCase()
      const splits = str.split('-')
      const nama = splits[0]
      const keterangan = splits[1]
      console.log(`${nama}, ${keterangan}`)
      const params = {
        nama,
        keterangan: typeof keterangan !== 'undefined' || keterangan != null ? keterangan : ''
      }

      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah <strong>Golongan : ${nama}
                </strong> dan <strong>Profesi: ${typeof keterangan !== 'undefined' ? keterangan : 'tidak ada'} </strong> Akan ditambahkan?`,
        cancel: true,
        html: true
        // persistent: true
      }).onOk(async () => {
        await api.post('/golongan/adding_data', params).then((resp) => {
          console.log(resp)
          this.getGolongans()
          this.form.golongan_id = resp.data.result.id
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    // ================================================================        AUTOCOMPLETE =================== RUANGAN
    async getRuangans (payload) {
      console.log(payload)
      const search = typeof payload !== 'undefined' || payload != null ? payload : ''
      const params = {
        params: {
          q: search
        }
      }
      await api.get('/autocomplete_ruangans', params).then(resp => {
        console.log('ruangan', resp)
        this.ruangans = []
        this.ruangans = resp.data.result
      })
    },

    addRuangan (val) {
      const str = val.toUpperCase()
      const splits = str.split('-')
      const gedung = splits[0]
      const lantai = splits[1]
      const ruangan = splits[2]
      console.log(`${gedung}, ${lantai}, ${ruangan}`)
      const params = {
        gedung,
        lantai: typeof lantai !== 'undefined' || lantai != null ? lantai : '',
        ruangan: typeof ruangan !== 'undefined' || ruangan != null ? ruangan : ''
      }

      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah <strong>Gedung : ${gedung}
                </strong> dan <strong>Lantai: ${typeof lantai !== 'undefined' ? lantai : 'tidak ada'} </strong>
                </strong> dan <strong>Ruangan: ${typeof ruangan !== 'undefined' ? ruangan : 'tidak ada'} </strong> Akan ditambahkan?`,
        cancel: true,
        html: true
        // persistent: true
      }).onOk(async () => {
        await api.post('/ruangan/adding_data', params).then((resp) => {
          console.log(resp)
          this.getRuangans()
          this.form.ruangan_id = resp.data.result.id
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    // ================================================================        AUTOCOMPLETE =================== BAGIAN
    async getBagians (payload) {
      console.log(payload)
      const search = typeof payload !== 'undefined' || payload != null ? payload : ''
      const params = {
        params: {
          q: search
        }
      }
      await api.get('/autocomplete_bagians', params).then(resp => {
        console.log('bagian', resp)
        this.bagians = []
        this.bagians = resp.data.result
      })
    },

    addBagian (val) {
      const str = val.toUpperCase()
      const splits = str.split('-')
      const nama = splits[0]
      console.log(`${nama}`)
      const params = {
        nama
      }

      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah <strong>Bagian : ${nama} Akan ditambahkan?`,
        cancel: true,
        html: true
        // persistent: true
      }).onOk(async () => {
        await api.post('/bagian/adding_data', params).then((resp) => {
          console.log(resp)
          this.getBagians()
          this.form.bagian_id = resp.data.result.id
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },

    // ===============================================================================================SEND TO LIST
    async sendToList () {
      this.loading = true
      console.log(this.form)
      if (this.form.nik === '' || this.form.nip === '' || this.form.nama === '') {
        return notifErrVue('Hei, Data Nik Atau Nip Belum Ada!')
      }
      // const thumb = []
      // thumb.push(this.form)
      // this.details = LocalStorage.getItem('details') || []
      // const find = this.details.filter(x => x.nik === this.form.nik)
      // if (find.length > 0 && !this.edited) {
      //   return notifErrVue('Hei, NIK ini sudah ada di list!')
      // } else if (this.edited) {
      //   console.log(find)
      //   this.details[this.index] = this.form
      //   LocalStorage.set('details', this.details)
      // } else {
      //   this.details.push(...thumb)
      //   LocalStorage.set('details', this.details)
      // }

      await api.post('/mutasidetail/adding_data', this.form).then((resp) => {
        console.log(resp)
        notifSuccess(resp)
        this.loading = false
        this.getHeader()
      }).catch(error => {
        console.log(error)
        notifErr(error.response)
        this.loading = false
      })

      // hapus form
    },

    async deleteList (idx) {
      // console.log('del', this.details[idx])
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Data dengan nama <strong>${this.details[idx].pegawai.nama}</strong> Akan dihapus dari daftar list?`,
        cancel: true,
        html: true
        // persistent: true
      }).onOk(async () => {
        // this.details.splice(idx, 1)
        // LocalStorage.set('details', this.details)
        const params = { id: this.details[idx].id }
        await api.post('/mutasidetail/delete_data', params).then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          this.getHeader()
          // this.newData()
        }).catch(error => {
          console.log(error)
          notifErr(error.response)
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },

    async finishAdd () {
      this.loading = true
      const params = { params: { uuid: this.slug } }
      await api.get('/mutasi/set_status', params).then((resp) => {
        notifSuccess(resp)
        routerInstance.push('/mutasi')
        this.loading = false
      })
    }

  }// actions
})
