<template>
    <div class="bg-page q-pa-md" style="min-height:500px">
        <div class="row q-col-gutter-md">
            <div class="col-md-7 col-xs-12">
                <q-card class="bg-info text-white">

                    <q-card-section horizontal class="items-center justify-between">
                        <q-card-section>
                            <div class="text-h6">Mutasi Antar Ruang</div>
                            <div class="text-subtitle2 text-grey-5 mt--5 q-mb-sm">Nomor Surat : {{ store.form.no_surat
                                }} </div>
                            <div class="text-subtitle2"> No Mutasi : {{ store.form.no_mutasi }} </div>
                        </q-card-section>
                        <div class="col-4 text-right q-pa-md">
                            <q-icon name="description" size="50px" />
                        </div>
                    </q-card-section>
                </q-card>

                <!-- search pegawai -->
                <q-card>
                    <q-card-section>
                        <q-select outlined v-model="model" use-input clearable option-value="id" option-label="nama"
                            label="Cari Data Pegawai" :options="options" @filter="filterOptions" behavior="menu"
                            hide-dropdown-icon>
                            <template v-slot:prepend>
                                <q-icon name="search" />
                            </template>
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        No results
                                    </q-item-section>
                                </q-item>
                            </template>
                            <template v-slot:option="scope">
                                <q-item v-bind="scope.itemProps">
                                    <q-item-section avatar>
                                        <q-avatar size="30px">
                                            <img src="~assets/images/user-avatar.svg">
                                        </q-avatar>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{ scope.opt.nama }}</q-item-label>
                                        <q-item-label caption> <strong>Nip : </strong> {{ scope.opt.nip }}
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </q-card-section>
                    <q-separator />
                    <transition enter-active-class="animated flip-right" leave-active-class="animated flip-left">
                        <!-- Wrapping only one DOM element, defined by QBtn -->
                        <q-card-section v-if="model">
                            <div class="flex">
                                <div class="left__side bg-page q-mr-md">
                                    <q-avatar rounded color="grey-5" size="100px">
                                        <img src="~assets/images/actor.svg">
                                    </q-avatar>
                                </div>
                                <div class="right__side column">
                                    <div>Nama : <strong>{{ model.nama }}</strong> </div>
                                    <div>NIP : <strong>{{ model.nip }}</strong> </div>
                                    <div>NIK : <strong>{{ model.nik }}</strong> </div>
                                    <div class="q-mt-sm">
                                        <q-chip v-if="model.kategori" color="red" text-color="white"
                                            icon="local_hospital">{{ model.kategori ? model.kategori.nama : '' }}
                                        </q-chip>
                                        <q-chip color="orange" text-color="white">Ruangan :
                                            {{model.ruangan? model.ruangan.gedung:''}} -
                                            {{model.ruangan? model.ruangan.lantai:''}} -
                                            {{model.ruangan? model.ruangan.ruangan:''}}
                                        </q-chip>
                                    </div>
                                </div>
                            </div>
                            <q-separator class="q-my-md" />
                            <q-form @submit="onSubmit">
                                <div>
                                    <div class="row q-col-gutter-sm">
                                        <div class="col-md-3 col-xs-12">Pindah Ke Ruangan?</div>
                                        <div class="col-md-9 col-xs-12">
                                            <app-autocomplete-new outlined
                                                v-model="ruanganId" label="Gedung - Lantai - Ruangan"
                                                autocomplete="gedung-lantai-ruangan"
                                                :source="ruangans"
                                                :option-label="(val)=> Object(val) === val && 'gedung' in val ? `${val.gedung} - ${val.lantai}- ${val.ruangan}`:null"
                                                :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                                                @onEnter="addRuangan" />
                                        </div>
                                    </div>
                                </div>
                                <q-separator class="q-my-md" />
                                <div>
                                    <div class="text-right">
                                        <app-btn type="submit" color="primary" label="Kirim ke list" />
                                    </div>
                                </div>
                            </q-form>
                        </q-card-section>
                    </transition>

                </q-card>

                <!-- btn kembali -->
                <div class="q-mt-md text-right">
                    <app-btn color="dark" label="kembali ke mutasi" @click="backToMutasi" />
                </div>
            </div>
            <div class="col-md-5 col-xs-12">
                <q-card class="bg-indigo-5 text-white">
                    <q-card-section>
                        <div class="text-h6">List Pegawai</div>
                        <div class="f-12 text-grey-5 mt--5 q-mb-sm">Details Pegawai Mutasi Antar Ruang </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section v-if="store.details < 1" class="flex column flex-center" style="min-height:200px">
                        <q-icon name="sentiment_dissatisfied" size="40px" />
                        <div>Data Belum Ada</div>
                    </q-card-section>
                </q-card>
                <!-- listnya -->
                <q-card class="bg-indigo-5 text-white" v-for="(item, i) in store.details" :key="i">
                    <!-- <q-card-section> -->
                    <q-item clickable v-ripple key="item">
                        <q-item-section avatar>
                            <q-avatar rounded class="bg-white" size="60px">
                                <img src="~assets/images/actor.svg">
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label lines="1" class="text-weight-bold">{{ !item.pegawai ? item.nama :
                                item.pegawai.nama
                                }}</q-item-label>
                            <q-item-label caption lines="2">
                                <span class="f-11 text-white">Nip / Kode Pegawai: {{ !item.pegawai ? item.nip :
                                    item.pegawai.nip
                                    }} <br />
                                    -- Nik : {{ !item.pegawai ? item.nik : item.pegawai.nik }} </span>
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-spinner v-if="item.isWait" color="white" size="3em" :thickness="5" />
                            <q-btn v-else flat round class="text-grey-3" icon="delete" @click="store.deleteList(i)" />
                        </q-item-section>
                    </q-item>
                    <!-- </q-card-section> -->
                </q-card>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useMarStore } from 'src/stores/mutasi/mar'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const options = ref(null)
// const selected = ref(null)
const model = ref(null)
const ruanganId = ref('')
const ruangans = ref([])
const store = useMarStore()
const router = useRouter()

onMounted(() => {
  store.getHeader()
  getRuangans()
})

async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }

  const params = {
    params: {
      q: val
    }
  }
  const resp = await api.get('/pegawai/search', params)
  console.log(resp)
  update(
    () => (options.value = resp.data.result),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}

function onSubmit () {
  model.value.ruangan_id_after = ruanganId.value
  model.value.mutation_id = store.form.mutation_id
  model.value.isWait = true
  console.log(model.value)
  store.sendToList(model.value).then(() => {
    model.value = null
  })
}

function backToMutasi () {
  router.push('/mutasi')
}

// UNTUK RUANGAN ===========================================================SELECT AUTO COMPLETE
async function getRuangans (payload) {
  console.log(payload)
  const search = typeof payload !== 'undefined' || payload != null ? payload : ''
  const params = {
    params: {
      q: search
    }
  }
  await api.get('/autocomplete_ruangans', params).then(resp => {
    console.log('ruangan', resp)
    ruangans.value = []
    ruangans.value = resp.data.result
  })
}

function addRuangan (val, resolve) {
  const str = val.toUpperCase()
  const splits = str.split('-')
  const gedung = splits[0]
  const lantai = splits[1]
  const ruangan = splits[2]
  console.log(`${gedung}, ${lantai}, ${ruangan}`)
  const params = {
    gedung,
    lantai: typeof lantai !== 'undefined' || lantai != null ? lantai : '',
    ruangan:
            typeof ruangan !== 'undefined' || ruangan != null ? ruangan : ''
  }

  $q.dialog({
    title: 'Konfirmasi',
    message: `Apakah <strong>Gedung : ${gedung}
                </strong> dan <strong>Lantai: ${typeof lantai !== 'undefined' ? lantai : 'tidak ada'
            } </strong>
                </strong> dan <strong>Ruangan: ${typeof ruangan !== 'undefined' ? ruangan : 'tidak ada'
            } </strong> Akan ditambahkan?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(async () => {
      await api.post('/ruangan/adding_data', params).then((resp) => {
        console.log(resp)
        getRuangans()
        ruanganId.value = resp.data.result.id
        resolve(resp.data.result.id)
      })
    })
    .onCancel(() => {
      console.log('Cancel')
    })
}

</script>

<style lang="scss" scoped>
</style>
