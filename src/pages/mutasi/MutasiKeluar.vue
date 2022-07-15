<template>
    <div class="bg-page q-pa-md" style="min-height:500px">
        <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
                <q-card class="bg-info text-white">

                    <q-card-section horizontal class="items-center justify-between">
                        <q-card-section>
                            <div class="text-h6">Nomor Surat</div>
                            <div class="text-subtitle2 text-grey-5 mt--5 q-mb-sm">{{store.form.no_surat}} </div>
                            <div class="text-subtitle2"> No Mutasi : {{store.form.no_mutasi}} </div>
                        </q-card-section>
                        <div class="col-4 text-right q-pa-md">
                            <q-icon name="description" size="50px"/>
                        </div>
                    </q-card-section>
                </q-card>

                <!-- search pegawai -->
                <q-card>
                    <q-card-section>
                        <q-select
                            outlined
                            v-model="model"
                            use-input
                            clearable
                            option-value="id"
                            option-label="nama"
                            label="Cari Data Pegawai"
                            :options="options"
                            @filter="filterOptions"
                            behavior="menu"
                            hide-dropdown-icon
                        >
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
                                        <q-item-label caption> <strong>Nip : </strong> {{ scope.opt.nip }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </q-card-section>
                    <q-separator />
                    <transition
                        enter-active-class="animated flip-right"
                        leave-active-class="animated flip-left"
                        >
                        <!-- Wrapping only one DOM element, defined by QBtn -->
                        <q-card-section v-if="model">
                            <div class="flex">
                                <div class="left__side bg-page q-mr-md">
                                    <q-avatar rounded color="grey-5" size="100px">
                                        <img src="~assets/images/actor.svg">
                                    </q-avatar>
                                </div>
                                <div class="right__side column">
                                    <div>Nama : <strong>{{model.nama}}</strong>  </div>
                                    <div>NIP : <strong>{{model.nip}}</strong>  </div>
                                    <div>NIK : <strong>{{model.nik}}</strong>  </div>
                                    <div class="q-mt-sm">
                                        <q-chip v-if="model.kategori" color="red" text-color="white" icon="local_hospital">{{model.kategori?model.kategori.nama:''}}</q-chip>
                                        <q-chip color="info" text-color="white" icon="sell">{{model.jenis.nama}} - {{model.jenis.kelompok}}</q-chip>
                                    </div>
                                </div>
                            </div>
                            <q-separator class="q-my-md"/>
                            <q-form @submit="onSubmit">
                                <div>
                                    <div class="row q-col-gutter-sm">
                                        <div class="col-md-3 col-xs-12">Kode SKPD</div>
                                        <div class="col-md-9 col-xs-12"><app-input v-model="kodeskpd" label="kode skpd" /></div>
                                        <div class="col-md-3 col-xs-12">nama SKPD</div>
                                        <div class="col-md-9 col-xs-12"><app-input v-model="namaskpd" label="nama skpd" /></div>
                                    </div>
                                </div>
                                <q-separator class="q-my-md"/>
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
                    <app-btn color="dark" label="kembali ke mutasi" @click="backToMutasi"/>
                </div>
            </div>
            <div class="col-md-6 col-xs-12">
                <q-card class="bg-indigo-5 text-white">
                    <q-card-section>
                        <div class="text-h6">List Pegawai</div>
                            <div class="f-12 text-grey-5 mt--5 q-mb-sm">Details Pegawai mutasi Keluar </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section v-if="store.details < 1" class="flex column flex-center" style="min-height:200px">
                        <q-icon name="sentiment_dissatisfied" size="40px"/>
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
                            <q-item-label lines="1" class="text-weight-bold">{{!item.pegawai? item.nama: item.pegawai.nama}}</q-item-label>
                            <q-item-label caption lines="2">
                                <span class="f-11 text-white">Nip / Kode Pegawai: {{!item.pegawai? item.nip: item.pegawai.nip}} <br />
                                -- Nik  : {{!item.pegawai?item.nik: item.pegawai.nik}} </span>
                            </q-item-label>
                            </q-item-section>

                            <q-item-section side>
                                <q-spinner v-if="item.isWait"
                                    color="white"
                                    size="3em"
                                    :thickness="5"
                                />
                                <q-btn v-else flat round class="text-grey-3" icon="delete" @click="store.deleteList(i)"/>
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
import { useMutasiKeluarStore } from 'src/stores/mutasi/mutasikeluar'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const options = ref(null)
// const selected = ref(null)
const model = ref(null)
const kodeskpd = ref('')
const namaskpd = ref('')
const store = useMutasiKeluarStore()
const router = useRouter()

onMounted(() => {
  store.getHeader()
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
      q: val,
      jenis_kepegawaian_id: store.form.jenis_kepegawaian_id
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
  model.value.kode_skpd = kodeskpd.value
  model.value.nama_skpd = namaskpd.value
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

</script>

<style lang="scss" scoped>

</style>
