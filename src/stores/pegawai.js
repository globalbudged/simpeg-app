import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const usePegawaiStore = defineStore('pegawai', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: ['id', 'uuid', 'created_at', 'user_id', 'user', 'provinsi', 'kabkot', 'kecamatan', 'kelurahan', 'kodepos']
  }),

  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },

  actions: {
    setSearch (val) {
      this.params.q = val
      this.getDataTable()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc' ? this.params.sort = 'asc' : this.params.sort = 'desc'
      this.getDataTable()
    },
    setPage (payload) {
      console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns (payload) {
      const thumb = payload.map(x => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },
    async getDataTable () {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('/pegawai', params)
        console.log('items', resp)
        this.items = resp.data.result.data
        this.meta = resp.data.result
        this.setColumns(resp.data.result.data)
        this.loading = false
      } catch (error) {
        console.log('items', error.response)
        notifErr(error.response)
        this.loading = false
      }
    },
    async deletesData (payload) {
      const params = { id: payload }
      try {
        await api.post('/pegawai/delete_data', params).then(resp => {
          console.log(resp)
          this.getDataTable()
          notifSuccess(resp)
        })
      } catch (error) {
        console.log('err pegawai', error.response)
        notifErr(error.response)
      }
    }
  }
})
