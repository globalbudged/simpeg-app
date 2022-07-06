<template>
    <div>
        <q-form @submit="onSubmit">
            <div class="bg-page q-pa-lg">
                <div class="row q-my-md">
                    <div class="col-md-5 col-xs-12">
                        <div class="f-16 text-bold q-mb-sm">Pilih Mutasi</div>
                        Pilih Data Mutasi dan nomor mutasi akan otomatis ditambahkan
                    </div>
                    <div class="col-md-7 col-xs-12 bg-page-secondary rounded-borders shadow-1">
                        <div class="q-pa-lg">
                            <div class="q-mb-xs">Kode Mutasi</div>
                            <q-list bordered dense separator class="rounded-borders q-mb-lg" style="width:350px;">
                                <q-item v-for="(mutasi, i) in store.mutations" :key="i"
                                    tag="label" v-ripple>
                                    <q-item-section avatar>
                                        <q-radio v-model="store.form.kode_mutasi" unchecked-icon="panorama_fish_eye"
                                            checked-icon="task_alt" :val="mutasi.kode" color="primary"
                                            @update:model-value="onChangeMutasi(mutasi)"
                                        />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{mutasi.kode}} - {{mutasi.nama}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>

                            <div class="q-mb-xs">Nomor Mutasi (Otomatis)</div>
                            <app-input v-model="store.form.no_mutasi" outlined readonly disable label="Nomor Mutasi" />
                            <!--  -->
                        </div>
                    </div>
                </div>

                <q-separator />
                <!-- pilih jenis kepegawaian -->
                <div class="row q-my-md">
                    <div class="col-md-5 col-xs-12 q-pr-md">
                        <div class="f-16 text-bold q-mb-sm">Pilih Jenis Kepegawaian</div>
                        Pilih Jenis / Kelompok Kepegawaian, jika tidak ada pada pilihannya? klik tombol
                        <strong><em>plus</em></strong> untuk memunculkan form tambah, isi sesuai petunjuk
                        lalu tekan tombol <strong><em>Simpan</em></strong> untuk menambahkan data pilihan
                    </div>
                    <div class="col-md-7 col-xs-12">
                        <q-card>
                            <q-card-section>
                                <q-btn
                                    fab
                                    color="primary"
                                    icon="add"
                                    class="absolute"
                                    padding="xs"
                                    style="bottom: 0; right: 5px; transform: translateY(50%);"
                                    @click="showAddJenis = !showAddJenis"
                                />

                                <div class="q-mb-xs">Pilih Jenis Kepegawaian</div>
                                <div class="q-gutter-sm">

                                    <app-input v-if="store.jenis_kepegawaian.length < 1" outlined readonly icon="sentiment_dissatisfied" label="Pilihan Tidak Ada" />
                                    <q-radio v-else v-for="(jenis, idx) in store.jenis_kepegawaian" :key="idx"
                                        v-model="store.form.jenis_kepegawaian_id"
                                        checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                                        :val="jenis.id" :label="`${jenis.nama} - ${jenis.kelompok}`"
                                        @update:model-value="onChangeKelompok(jenis)"
                                        />
                                </div>
                            </q-card-section>
                        </q-card>

                    </div>
                </div>
                <q-separator />
                <!-- pilih jenis kepegawaian -->
                <div class="row q-my-md">
                    <div class="col-md-5 col-xs-12 q-pr-md">
                        <div class="f-16 text-bold q-mb-sm">Tanggal & Nomor Surat</div>
                        Pengaturan tanggal mutasi, tanggal entry, tanggal surat dan nomor surat
                    </div>
                    <div class="col-md-7 col-xs-12">
                        <q-card>
                            <q-card-section>
                                <div class="">Tanggal & Nomor Surat</div>
                                <div class="q-mt-sm">
                                    <div class="row q-col-gutter-sm">
                                        <div class="col-md-4 col-xs-12">
                                            <app-input-date outlined :model="store.form.tgl_surat"
                                                @setModel="(value)=>store.setForm('tgl_surat', value)" label="Tanggal Surat"
                                            />
                                        </div>
                                        <div class="col-md-4 col-xs-12">
                                            <app-input-date outlined :model="store.form.tgl_mutasi"
                                                @setModel="(value)=>store.setForm('tgl_mutasi', value)" label="Tanggal Mutasi"
                                            />
                                        </div>
                                        <div class="col-md-4 col-xs-12">
                                            <app-input-date outlined :model="store.form.tgl_entry"
                                                @setModel="(value)=>store.setForm('tgl_entry', value)" label="Tanggal Entry"
                                            />
                                        </div>
                                        <div class="col-md-12 col-xs-12">
                                            <app-input v-model="store.form.no_surat" outlined label="Nomor Surat" />
                                        </div>
                                    </div>

                                </div>
                            </q-card-section>
                            <q-card-section>
                                <div class="text-right">
                                    <app-btn type="submit" color="primary" label="Simpan & Lanjutkan"/>
                                </div>
                            </q-card-section>
                        </q-card>

                    </div>
                </div>
            </div>

        </q-form>

        <!-- add jenis kepegawaian -->
        <AppDialogInput
            v-model="showAddJenis"
                @onSubmit="saveDataJenis"
                :loading="formJenis.loading"
        >
            <div class="q-col-gutter-sm">
                <app-input v-model="formJenis.form.nama" label="Jenis Kepegawaian (Contoh: PNS)" />
                <app-input valid v-model="formJenis.form.kelompok" label="Kelompok Kepegawaian (Contoh: ASN)" />
            </div>
        </AppDialogInput>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useMutasiStore } from 'src/stores/mutasi/index'
import { useFormStore } from 'src/stores/master/jeniskepegawaian/form'
// import { useRouter } from 'vue-router'
import { notifErrVue } from 'src/modules/utils'

// import MutasiMasuk from 'src/pages/mutasi/MutasiMasuk.vue'

const store = useMutasiStore()
const formJenis = useFormStore()
// const router = useRouter()

// const step = ref(1)
const title = ref('')
const caption = ref('')
const showAddJenis = ref(false)

onMounted(() => {
  store.getAutocomplete()
  store.setToday()
})

function saveDataJenis () {
  formJenis.saveForm().then(() => {
    store.getAutocomplete()
  })
}
const uniqueId = () => {
  const dateString = Date.now().toString(36)
  const randomness = Math.random().toString(36).substring(2, 7)
  return dateString + randomness
}

function onChangeMutasi (val) {
  console.log(val)
  let str = ''
  switch (val.kode) {
    case 'MM':
      str = 'MM-'
      break
    case 'MK':
      str = 'MK-'
      break
    case 'MAR':
      str = 'MAR-'
      break

    default:
      break
  }
  title.value = val.nama
  const uniq = str + uniqueId()
  store.setForm('no_mutasi', uniq)
}

function onChangeKelompok (val) {
  caption.value = val.nama + '-' + val.kelompok
}

function onSubmit () {
  if (store.form.kode_mutasi === '' || store.form.kode_mutasi === null) {
    return notifErrVue('Error!, Kode Mutasi Belum dipilih')
  }
  if (store.form.jenis_kepegawaian_id === '' || store.form.jenis_kepegawaian_id === null) {
    return notifErrVue('Error!, Kelompok Kepegawaian belum dipilih')
  }

  store.saveData()
  // router.replace({ name: 'mutasi.masuk', params: { slug: store.form.no_mutasi } })
}
</script>

<style lang="scss" scoped>

</style>
