<template>
    <q-dialog>
        <q-stepper
          v-model="step"
          vertical
          color="primary"
          animated
          style="width:700px; max-width:80vw"
        >
        <!-- step 1 -->
          <q-step
            :name="1"
            title="Profile Data Diri"
            icon="person"
            :done="step > 1"
          >
            <q-form @submit="step=2">
              <div class="row q-col-gutter-sm ">
                  <div class="col-md-9 col-sm-12">
                    <app-input autofocus v-model="formPegawai.form.nama" label="Nama Lengkap" />
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <app-input v-model="formPegawai.form.nip" label="Masukkan NIP" />
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <app-input v-model="formPegawai.form.nik" label="Masukkan NIK" />
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <app-input v-model="formPegawai.form.tempat_lahir" label="Tempat Lahir" />
                  </div>
                  <div class="col-md-3 col-sm-12">
                    <!-- input date -->
                    <q-input
                      ref="refInput"
                      v-model="formPegawai.form.tanggal_lahir"
                      dense
                      filled
                      label="Tanggal Lahir"
                      hide-bottom-space
                      no-error-icon
                      class="cursor-pointer"
                      @click="showDate()"
                    >
                      <template v-slot:prepend>
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="daterPopup"
                        >
                          <q-date
                              v-model="formPegawai.form.tanggal_lahir"
                              mask="YYYY-MM-DD"
                              today-btn
                              @input="closeDate()"
                          >
                              <div class="row items-center justify-end">
                              <q-btn
                                  @click="closeDate()"
                                  label="Close"
                                  color="primary"
                                  flat
                              />
                              </div>
                          </q-date>
                        </q-popup-proxy>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <q-select
                      v-model="formPegawai.form.agama"
                      :options="options" label="Pilih Agama"
                      dense
                      filled
                      hide-bottom-space
                      no-error-icon
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
                    />
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <app-input
                    v-model="formPegawai.form.contact"
                    label="No Hp"
                    mask="####-####-####"
                    />
                  </div>
                  <div class="col-md-8 col-sm-12 q-gutter-sm">
                    <q-radio size="sm" v-model="formPegawai.form.gender" val="L" label="Laki-laki" />
                    <q-radio size="sm" v-model="formPegawai.form.gender" val="P" label="Perempuan" />
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <q-input
                      ref="refDate"
                      v-model="formPegawai.form.tmt"
                      dense
                      filled
                      label="TMT"
                      hide-bottom-space
                      no-error-icon
                      class="cursor-pointer"
                      @click="showDate()"
                    >
                      <template v-slot:prepend>
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="daterPopup"
                        >
                          <q-date
                              v-model="formPegawai.form.tmt"
                              mask="YYYY-MM-DD"
                              today-btn
                              @input="closeDate()"
                          >
                              <div class="row items-center justify-end">
                              <q-btn
                                  @click="closeDate()"
                                  label="Close"
                                  color="primary"
                                  flat
                              />
                              </div>
                          </q-date>
                        </q-popup-proxy>
                      </template>
                    </q-input>
                  </div>
              </div>
              <q-stepper-navigation>
                <app-btn no-caps color="primary" type="submit" label="Continue" />
              </q-stepper-navigation>
            </q-form>
          </q-step>

          <!-- step 2 -->
          <q-step
            :name="2"
            title="Data Alamat Asal"
            icon="place"
            :done="step > 2"
          >
            <q-form @submit="step=3">
              <div class="row q-col-gutter-sm ">
                  <div class="col-md-9 col-sm-12">
                    <app-input autofocus v-model="formPegawai.form.alamat" label="Alamat Tempat tinggal" />
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <app-autocomplete
                    valid
                      v-model="formPegawai.form.provinsi"
                      label="Cari Provinsi"
                      :source="formPegawai.provinces"
                      @getSource="formPegawai.getProvinces"
                      @setModel="setForm"
                    />
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <app-autocomplete valid
                      v-model="formPegawai.form.kabkot"
                      label="Cari Kab /Kota"
                      :source="formPegawai.kotas"
                      @getSource="formPegawai.getKota"
                      @setModel="setFormKota"
                      :disable="formPegawai.form.provinsi==='' || formPegawai.form.provinsi === null"
                      :loading="formPegawai.loadingSelect"
                    />
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <app-autocomplete valid
                      v-model="formPegawai.form.kecamatan"
                      label="Kecamatan"
                      :source="formPegawai.kecs"
                      @getSource="formPegawai.getKec"
                      @setModel="setFormKec"
                      :disable="formPegawai.form.kabkot==='' || formPegawai.form.kabkot === null"
                      :loading="formPegawai.loadingSelect"
                    />
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <app-autocomplete valid
                      v-model="formPegawai.form.kelurahan"
                      label="Kelurahan / Desa"
                      :source="formPegawai.kels"
                      @getSource="formPegawai.getKels"
                      @setModel="setFormKel"
                      :disable="formPegawai.form.kecamatan==='' || formPegawai.form.kecamatan === null"
                      :loading="formPegawai.loadingSelect"
                    />
                  </div>
                  <div class="col-md-3 col-sm-12">
                    <app-input valid v-model="formPegawai.form.kodepos" label="kode pos" />
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <app-input
                    v-model="formPegawai.form.contact"
                    label="No Hp"
                    mask="####-####-####"
                    />
                  </div>
                  <div class="col-md-7 col-sm-12 q-gutter-sm">
                    <q-radio size="sm" v-model="formPegawai.form.gender" val="L" label="Laki-laki" />
                    <q-radio size="sm" v-model="formPegawai.form.gender" val="P" label="Perempuan" />
                  </div>
                  <!-- {{formPegawai.form.provinsi}} -->
              </div>
              <q-stepper-navigation>
                <app-btn no-caps type="submit" label="Continue" />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-form>
          </q-step>

          <q-step
            :name="3"
            title="Data User"
            icon="person"
            :done="step > 3"
          >
            <q-form @submit="saveForm">
                <div class="row q-col-gutter-sm">
                  <div class="col-md-6 col-sm-12">
                    <app-input icon="email" v-model="formPegawai.form.email" label="Email" />
                    <app-input valid icon="key" v-model="formPegawai.form.password" label="Password" class="q-mt-sm" />
                  </div>
                  <div class="col-md-12">
                    <div v-if="!formPegawai.edited">Jika Password dikosongi maka password defaultnya menggunakan NIK</div>
                    <div v-else>Jika tidak ingin Merubah Password ?, isian password dikosongi saja</div>
                  </div>
                </div>
              <q-stepper-navigation>
                <app-btn :loading="formPegawai.loading" type="submit" color="primary" label="Selesai & Simpan" />
                <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-form>
          </q-step>

        </q-stepper>

  </q-dialog>

</template>

<script setup>
// import ======================================
import { ref, onMounted } from 'vue'
import { useFormPegawaiStore } from 'src/stores/formpegawai'

// const ======================================
const options = ref(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya'])
const formPegawai = useFormPegawaiStore()
// const provinces = formPegawai.provinces
const step = ref(1)
const daterPopup = ref(null)
onMounted(() => {
  formPegawai.getProvinces()
  formPegawai.setToday()
})
function showDate () {
  daterPopup.value.show()
}
function closeDate () {
  daterPopup.value.hide()
}
function setForm (val) {
  formPegawai.setForm('provinsi', val)
  formPegawai.getKota(val)
}
function setFormKota (val) {
  formPegawai.setForm('kabkot', val)
  formPegawai.getKec(val)
}
function setFormKec (val) {
  formPegawai.setForm('kecamatan', val)
  formPegawai.getKels(val)
}
function setFormKel (val) {
  formPegawai.setForm('kelurahan', val)
}
function saveForm () {
  formPegawai.saveForm().then(() => {
    step.value = 1
  })
}
</script>

<style lang="scss" scoped>

</style>
