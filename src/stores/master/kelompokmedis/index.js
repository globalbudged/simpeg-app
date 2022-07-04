import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useKelMedisStore = defineStore('kelompokmedis', {
  state: () => ({
    items: [],
    mores: [],
    meta: {},
    item: {},
    loading: false,
    loadingMore: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'id',
      sort: 'desc'
    },
    columns: [],
    columnHide: ['id', 'uuid', 'updated_at']
  }),

  getters: {
    // getterColumns (state) {
    //   return state.columns.filter((el) => !state.columnHide.includes(el))
    // }
  },

  actions: {
    setSearch (val) {
      this.params.q = val
      this.getDataTable()
    },
    sortOrder () {
      this.params.sort === 'desc' ? this.params.sort = 'asc' : this.params.sort = 'desc'
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
    setMorePage () {
      let page = this.params.page
      if (page !== this.meta.last_page) {
        page = this.params.page + 1
      }
      this.params.page = page
      console.log('setMorePage', page)
      this.getDataTable(true)
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
    // setMores (payload) {
    //   this.mores.push(...payload)
    // },
    async getDataTable (more) {
      if (!more) {
        this.params.page = 1
      }
      !more ? this.loading = true : this.loadingMore = true
      const params = { params: this.params }
      try {
        const resp = await api.get('/kelompokmedis', params)
        this.items = resp.data.result.data
        this.meta = resp.data.result
        // this.setMores = resp.data.result.data
        this.pushMores(resp.data.result)

        this.setColumns(resp.data.result.data)
        console.log('jenis', this.mores.length)
        console.log('resp', resp.data.result)
        !more ? this.loading = false : this.loadingMore = false
      } catch (error) {
        console.log('items', error.response)
        notifErr(error.response)
        !more ? this.loading = false : this.loadingMore = false
      }
    },
    async deletesData (payload) {
      const params = { id: payload }
      try {
        await api.post('/kelompokmedis/delete_data', params).then(resp => {
          console.log(resp)
          // this.mores.slice(0, this.items.)
          this.removeFromMores(payload)
          // this.getDataTable()
          notifSuccess(resp)
        })
      } catch (error) {
        console.log('err kelompokmedis', error.response)
        notifErr(error.response)
      }
    },
    // setMores (payload) {
    //   this.mores = []
    //   this.mores = payload
    // },
    pushMores (payload) {
      if (payload.current_page === 1) {
        this.mores = []
        this.mores = payload.data
      } else {
        const arr = payload.data
        for (let i = 0; i < arr.length; i++) {
          if (payload.total !== this.mores.length) {
            this.mores.push(arr[i])
          }

          console.log(i)
        }
      }
    },
    removeFromMores (id) {
      const find = this.mores.filter(x => x.id === id)
      const index = this.mores.indexOf(find[0])
      this.mores.splice(index, 1)
      // console.log(index)
    }
  }
})
