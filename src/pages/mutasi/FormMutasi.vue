<template>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      alternative-labels
      animated
    >
      <q-step
        :name="1"
        title="Pilih Mutasi"
        icon="settings"
      >
        <q-form ref="formStep1" @submit="step = 2" >
            <div class="row q-col-gutter-sm q-mb-md">
                <div class="col-md-12 col-xs-12">
                    <AppAutocomplete
                      :source="optionsMutasi"
                      v-model="mutasi"
                      :option-value="opt => Object(opt) === opt && 'kode' in opt ? opt : ''"
                      :option-label="opt => Object(opt) === opt && 'kode' in opt ? `${opt.kode} - ${opt.nama}` : ''"
                      label="Pilih Jenis Mutasi"
                      @change="onChangeMutasi"
                    />
                    <!-- <div class="q-gutter-sm">
                      <q-radio v-for="(opt, i) in optionsMutasi" :key="i" v-model="mutasi" :val="opt.kode" :label="opt.nama" @update:model-value="onChangeMutasi" />
                    </div> -->
                </div>
                <div class="col-md-7 col-xs-12">
                    <app-input v-model="formData.form.kode_mutasi" readonly label="kode Mutasi (otomatis)" />
                </div>
                <div class="col-md-4 col-xs-12">
                    <AppAutocomplete
                    :source="formData.jenis_kepegawaian"
                    v-model="formData.form.jenis_pegawai"
                    :option-value="opt => Object(opt) === opt && 'id' in opt ? opt : ''"
                    :option-label="opt => Object(opt) === opt && 'id' in opt ? `${opt.nama} - ${opt.kelompok}` : ''"
                    label="Pilih Kelompok Kepegawaian" />
                </div>
                <div class="col-md-4 col-xs-12">
                    <app-input v-model="formData.form.no_surat"  label="Nomor Surat" />
                </div>
                <div class="col-md-4 col-xs-12">
                    <app-input-date :model="formData.form.tgl_surat"
                      @setModel="(value)=>formData.setForm('tgl_surat', value)" label="Tanggal Surat"
                    />
                </div>
                <div class="col-md-4 col-xs-12">
                    <app-input-date :model="formData.form.tgl_mutasi"
                      @setModel="(value)=>formData.setForm('tgl_mutasi', value)" label="Tanggal Mutasi"
                    />
                </div>
                <div class="col-md-4 col-xs-12">
                    <app-input-date :model="formData.form.tgl_entry"
                      @setModel="(value)=>formData.setForm('tgl_entry', value)" label="Tanggal Entry"
                    />
                </div>
            </div>

            <!-- {{mutasi}} -->
            <q-separator />
            <q-stepper-navigation>
                <app-btn no-caps color="primary" type="submit" label="Continue" />
            </q-stepper-navigation>
        </q-form>
      </q-step>

      <q-step
        :name="2"
        :title="`${title} pegawai `"
        caption="(Profile Data Diri Pegawai)"
        icon="people"
        :done="step > 2"
      >
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>
    </q-stepper>
</template>

<script setup>
import { ref } from 'vue'
import { useFormMutasiStore } from '../../stores/mutasi/form'

const formData = useFormMutasiStore()

const optionsMutasi = ref([{ kode: 'MM', nama: 'Mutasi Masuk' }, { kode: 'MK', nama: 'Mutasi Keluar' }, { kode: 'MAR', nama: 'Mutasi Antar Ruang' }])
const mutasi = ref('')
const title = ref('')
const step = ref(1)

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
  formData.setForm('kode_mutasi', uniq)
}
</script>

<style lang="scss" scoped>

</style>
