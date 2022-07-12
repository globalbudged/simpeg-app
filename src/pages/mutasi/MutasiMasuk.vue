<template>
    <div class="bg-page q-pa-lg">
        <div class="row q-col-gutter-md">
            <div class="col-md-7 col-xs-12">
                <q-stepper
                    v-model="step"
                    ref="stepper"
                    color="primary"
                    animated
                >
                    <q-step
                        :name="1"
                        title="Data Diri"
                        icon="person"
                        :done="step > 1"
                    >
                        <q-form @submit="stepOneSubmit">
                            <div class="row q-col-gutter-md">
                                <div class="col-md-12 f-14 text-bold">Data Diri</div>
                                <div class="col-md-12 col-xs-12">
                                    <app-input v-model="formData.form.nama" icon="person" label="Nama Lengkap *" outlined />
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <app-input v-model="formData.form.nik" icon="pin" label="Masukkan NIK *" outlined/>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <app-input v-model="formData.form.nip" icon="pin" label="Masukkan NIP / Kode Pegawai *" outlined/>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <app-input-date valid :model="formData.form.tanggal_lahir"
                                    icon="event" label="Tanggal Lahir" @setModel="(val)=>formData.setForm('tanggal_lahir', val)"
                                    outlined/>
                                </div>

                                <div class="col-md-5 col-xs-12">
                                    <app-input valid v-model="formData.form.tempat_lahir" icon="place" label="Tempat Lahir" outlined/>
                                </div>
                                <div class="col-md-6 col-sm-12 q-gutter-sm">
                                    <app-input valid v-model="formData.form.contact" icon="phone" label="No Handphone" outlined/>
                                </div>
                                <div class="col-md-6 col-sm-12 q-gutter-sm">
                                    <q-radio size="sm" v-model="formData.form.gender" val="L" label="Laki-laki" />
                                    <q-radio size="sm" v-model="formData.form.gender" val="P" label="Perempuan" />
                                </div>
                                <div class="col-md-12 f-14 text-bold">Alamat Tempat Tinggal</div>
                                <div class="col-md-12 col-xs-12">
                                    <app-input valid v-model="formData.form.alamat" icon="place" label="Alamat" outlined />
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <app-autocomplete
                                        valid outlined
                                        v-model="formData.form.provinsi"
                                        label="Provinsi"
                                        :source="formData.provinces"
                                        @getSource="formData.getProvinces"
                                        @setModel="(val)=> {formData.setForm('provinsi', val), formData.getKota(val)}"
                                    />
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <app-autocomplete valid outlined
                                        v-model="formData.form.kabkot"
                                        label="Kabupaten /Kota"
                                        :source="formData.kotas"
                                        @getSource="formData.getKota"
                                        @setModel="(val)=>{formData.setForm('kabkot', val), formData.getKec(val)}"
                                        :disable="formData.form.provinsi==='' || formData.form.provinsi === null"
                                        :loading="formData.loadingSelect"
                                    />
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <app-autocomplete valid outlined
                                        v-model="formData.form.kecamatan"
                                        label="Kecamatan"
                                        :source="formData.kecs"
                                        @getSource="formData.getKec"
                                        @setModel="(val)=>{formData.setForm('kecamatan', val), formData.getKels(val)}"
                                        :disable="formData.form.kabkot==='' || formData.form.kabkot === null"
                                        :loading="formData.loadingSelect"
                                    />
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <app-autocomplete valid outlined
                                        v-model="formData.form.kelurahan"
                                        label="Kelurahan"
                                        :source="formData.kels"
                                        @getSource="formData.getKels"
                                        @setModel="(val)=>{formData.setForm('kelurahan', val)}"
                                        :disable="formData.form.kecamatan==='' || formData.form.kecamatan === null"
                                        :loading="formData.loadingSelect"
                                    />
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <app-input valid v-model="formData.form.kodepos" label="Kodepos" outlined />
                                </div>
                            </div>
                            <q-banner class="bg-alert__info q-mt-md">
                                <strong>INFORMASI</strong> <br />
                                <em>Informasi ini Bersifat penting, isi secara detail form diatas. Inputan yang bertanda <strong>*</strong> Wajib diisi untuk yang lainnya Optional</em>
                            </q-banner>
                            <q-stepper-navigation class="text-right">
                                <app-btn :loading="formData.loadingStepper" type="submit" color="primary" label="Lanjut" />
                            </q-stepper-navigation>
                        </q-form>
                    </q-step>

                    <q-step
                        :name="2"
                        title="Keterangan Lainnya"
                        caption="Untuk Kelengkapan Data"
                        icon="create_new_folder"
                    >
                        <q-form @submit="sendToList">
                            <div class="row q-col-gutter-md">
                                <div class="col-md-12 f-14 text-bold">Data Pendidikan dan Kepegawaian</div>

                                <!-- PILIHAN PENDIDIKAN -->
                                <div class="col-md-5 col-xs-12">
                                    Pilih Data Pendidikan, jika pilihan tidak ada? klik pada icon PLUS di samping
                                </div>
                                <div class="col-md-7 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-input v-if="formData.autocompletes.pendidikans.length < 1" outlined readonly
                                        icon="sentiment_dissatisfied" class="cursor-pointer" label="Pilihan Pendidikan Belum Ada"
                                        style="width:90%"
                                        />

                                        <q-list v-else bordered class="q-pa-xs rounded-borders" style="width:90%">
                                            <q-radio  v-for="(pend, idx) in formData.autocompletes.pendidikans" :key="idx"
                                                v-model="formData.form.pendidikan_id" size="xs"
                                                checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                                                :val="pend.id" :label="`${pend.nama}`"
                                            />
                                        </q-list>
                                        <q-btn size="sm" icon="add" flat round  @click="openPendidikan = !openPendidikan"/>
                                    </div>
                                </div>
                                <!-- PILIHAN KEL MEDIS -->
                                <div class="col-md-5 col-xs-12">
                                    Pilih Kelompok Medis, jika pilihan tidak ada? klik pada icon PLUS di samping
                                </div>
                                <div class="col-md-7 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-input v-if="formData.autocompletes.kelompokMedis.length < 1" outlined readonly
                                        icon="sentiment_dissatisfied" class="cursor-pointer" label="Pilihan Kelompok Medis Belum Ada"
                                        style="width:90%"
                                        />

                                        <q-list v-else bordered class="q-pa-xs rounded-borders" style="width:90%">
                                            <q-radio  v-for="(kat, i) in formData.autocompletes.kelompokMedis" :key="i"
                                                v-model="formData.form.kategori_id" size="xs"
                                                checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                                                :val="kat.id" :label="`${kat.nama}`"
                                            />
                                        </q-list>
                                        <q-btn size="sm" icon="add" flat round  @click="openKelMed = !openKelMed"/>
                                    </div>
                                </div>

                                <!-- PILIHAN JURUSAN - PROFESI -->
                                <div class="col-md-4 col-xs-12">
                                    Jurusan dan Profesi Pegawai
                                </div>
                                <div class="col-md-8 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-auto-complete-api
                                            outlined
                                            style="width:90%"
                                            label="Jurusan - Profesi"
                                            autocomplete="nama-profesi"
                                            v-model="formData.form.jurusan_id"
                                            endpoint="/autocomplete_jurusans"
                                            option-value="id"
                                            :option-label="(val)=> Object(val) === val && 'nama' in val ? `${val.nama} - ${val.profesi}`:null"
                                            @onEnter="formData.addJurusan"

                                        />
                                        <q-icon size="25px" name="help_outline" color="info" class="cursor-pointer">
                                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                <strong>Untuk Masukkan data ?</strong> <br />
                                                <em>pisah dgn tanda ( - )</em><br />
                                                <em>Jurusan dan Profesi</em><br />
                                                <em>contoh</em><br />
                                                <strong>INFORMATIKA-JARINGAN</strong><br />
                                                <em>Lalu tekan Enter </em>
                                            </q-tooltip>
                                        </q-icon>
                                    </div>
                                </div>

                                <!-- Autocomplete Jabatan -->
                                <div class="col-md-4 col-xs-12">
                                    Pilih Data Jabatan
                                </div>
                                <div class="col-md-8 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-auto-complete-api
                                            valid outlined
                                            style="width:90%"
                                            label="Jabatan"
                                            autocomplete="nama"
                                            endpoint="/autocomplete_jabatans"
                                            option-value="id"
                                            :optionLabel="val => Object(val) === val && 'nama' in val ? `${val.nama}`:null"
                                            v-model="formData.form.jabatan_id"
                                            @onEnter="formData.addJabatan"

                                        />
                                        <q-icon size="25px" name="help_outline" color="info" class="cursor-pointer">
                                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                <strong>Untuk Masukkan data ?</strong> <br />
                                                <em>Jabatan</em><br />
                                                <em>contoh : </em><br />
                                                <strong>DIREKTUR</strong><br />
                                                <em>Lalu tekan Enter </em>
                                            </q-tooltip>
                                        </q-icon>
                                    </div>
                                </div>
                                <!-- Autocomplete Golongan -->
                                <div class="col-md-4 col-xs-12">
                                    Pilih Data Golongan / Untuk (PNS)
                                </div>
                                <div class="col-md-8 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-auto-complete-api valid outlined
                                            style="width:90%"
                                            v-model="formData.form.golongan_id"
                                            label="Golongan - Keterangan"
                                            endpoint="/autocomplete_golongans"
                                            autocomplete="nama-keterangan"
                                            :option-label="(val)=> Object(val) === val && 'nama' in val ? `${val.nama} - ${val.keterangan}`:null"
                                            :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                                            @onEnter="formData.addGolongan"

                                        />
                                        <q-icon size="25px" name="help_outline" color="info" class="cursor-pointer">
                                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                <strong>Untuk Masukkan data ?</strong> <br />
                                                <em>Golongan - Keterangan</em><br />
                                                <em>contoh : </em><br />
                                                <strong>1/A - JURU MUDA</strong><br />
                                                <em>Lalu tekan Enter </em>
                                            </q-tooltip>
                                        </q-icon>
                                    </div>
                                </div>
                                <!-- Autocomplete Ruang -->
                                <div class="col-md-4 col-xs-12">
                                    Pilih Data Ruangan
                                </div>
                                <div class="col-md-8 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-auto-complete-api
                                            outlined
                                            style="width:90%"
                                            v-model="formData.form.ruangan_id"
                                            label="Gedung - Lantai - Ruangan"
                                            autocomplete="gedung-lantai-ruangan"
                                            endpoint="/autocomplete_ruangans"
                                            :option-label="(val)=> Object(val) === val && 'gedung' in val ? `${val.gedung} - ${val.lantai}- ${val.ruangan}`:null"
                                            :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                                            @onEnter="formData.addRuangan"

                                        />
                                        <q-icon size="25px" name="help_outline" color="info" class="cursor-pointer">
                                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                <strong>Untuk Menambah data ?</strong> <br />
                                                <em>Gedung - Lantai - Ruangan</em><br />
                                                <em>contoh : </em><br />
                                                <strong>A-1-Mawar</strong><br />
                                                <em>Lalu tekan Enter </em>
                                            </q-tooltip>
                                        </q-icon>
                                    </div>
                                </div>
                                <!-- Autocomplete Bagian -->
                                <div class="col-md-4 col-xs-12">
                                    Pilih Data Bagian
                                </div>
                                <div class="col-md-8 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-auto-complete-api
                                            outlined
                                            style="width:90%"
                                            v-model="formData.form.bagian_id"
                                            label="Bagian"
                                            autocomplete="nama"
                                            endpoint="/autocomplete_bagians"
                                            option-label="nama"
                                            option-value="id"
                                            @onEnter="formData.addBagian"

                                        />
                                        <q-icon size="25px" name="help_outline" color="info" class="cursor-pointer">
                                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                                <strong>Untuk Menambah data ?</strong> <br />
                                                <em>Bagian</em><br />
                                                <em>contoh : </em><br />
                                                <strong>KEPEGAWAIAN</strong><br />
                                                <em>Lalu tekan Enter </em>
                                            </q-tooltip>
                                        </q-icon>
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    Kode SKPD Sebelumnya
                                </div>
                                <div class="col-md-8 col-xs-12">
                                    <app-input valid v-model="formData.form.kode_skpd_before" outlined label="kode skpd sebelumnya" />
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    nama SKPD Sebelumnya
                                </div>
                                <div class="col-md-8 col-xs-12">
                                    <app-input valid v-model="formData.form.nama_skpd_before" outlined label="kode skpd sebelumnya" />
                                </div>
                                <!-- {{formData.form.jurusan_id}} -->
                                <div class="col-12 text-right">
                                    <app-btn :loading="formData.loading" color="secondary" type="submit" :label="formData.edited?`Simpan Perubahan`: `Kirim Ke list`"  />
                                </div>

                                <q-banner class="bg-alert__info q-my-lg q-pa-md full-width">
                                    <strong>INFORMASI</strong> <br />
                                    <em> - klik <strong>Kirim ke list</strong> untuk simpan data pegawai mutasi berdasarkan no mutasi</em> <br />
                                    <em> - klik <strong>Tambah Baru</strong> untuk masukkan data pegawai baru dan hapus seluruh form </em> <br />
                                    <em> - klik <strong>kembali</strong> Kembali Ke step 1</em> <br />
                                    <em> - klik <strong>Lanjut</strong> untuk menyelesaikan data surat mutasi</em> <br />
                                </q-banner>
                            </div>
                            <q-separator />
                            <q-stepper-navigation>
                                <div class="flex items-center justify-between">
                                    <div class="left__place">
                                    </div>
                                    <div class="right__place">
                                        <app-btn flat color="secondary" label="Kembali" @click="step = 1" class="q-ml-sm" />
                                        <app-btn color="primary" :label="labelBtnFinish" @click="formData.finishAdd"/>
                                    </div>
                                </div>
                            </q-stepper-navigation>
                        </q-form>

                    </q-step>

                </q-stepper>
            </div>
            <div class="col-md-5 col-xs-12">
                <ListMutasiMasuk
                    :items="formData.details"
                    :temp="formData.temp"
                    @edit="editData"
                    @delete="deleteData"
                />
                <app-btn v-if="formData.details.length > 0" :loading="formData.loading" class="full-width q-mt-md"
                color="primary" :label="labelBtnFinish" @click="formData.finishAdd"/>
            </div>
        </div>
<!-- add Pendidikan -->
        <AppDialogInput
            v-model="openPendidikan"
                @onSubmit="addPendidikan"
                :loading="formPendidikan.loading"
        >
            <div class="q-col-gutter-sm">
                <app-input v-model="formPendidikan.form.nama" label="Pendidikan (Contoh: SD)" />
                <app-input valid v-model="formPendidikan.form.keterangan" label="Keterangan (Contoh: Sekolah Dasar)" />
            </div>
        </AppDialogInput>
<!-- add kelompok medis -->
        <AppDialogInput
            v-model="openKelMed"
                @onSubmit="addKelMed"
                :loading="formKelMed.loading"
        >
            <div class="q-col-gutter-sm">
                <app-input v-model="formKelMed.form.nama" label="Pendidikan (Contoh: NON MEDIS)" />
            </div>
        </AppDialogInput>
    </div>
</template>

<script setup>
import { useFormDetailMutasiStore } from 'src/stores/mutasi/formdetail'
import { useFormStore } from 'src/stores/master/pendidikan/form'
import * as kelompokMedis from 'src/stores/master/kelompokmedis/form'
import { ref, onMounted } from 'vue'
import ListMutasiMasuk from './ListMutasiMasuk.vue'
// import { useQuasar } from 'quasar'

// const $q = useQuasar()
const formData = useFormDetailMutasiStore()
const formPendidikan = useFormStore()
const formKelMed = kelompokMedis.useFormStore()
const step = ref(1)
const labelBtnFinish = ref('kembali ke mutasi')

onMounted(() => {
//   console.log($q.loadingBar)
  formData.task()
})

const openPendidikan = ref(false)
function addPendidikan () {
  formPendidikan.saveForm().then(() => {
    formData.getAutocomplete()
  })
}
const openKelMed = ref(false)
function addKelMed () {
  formKelMed.saveForm().then(() => {
    formData.getAutocomplete()
  })
}

function stepOneSubmit () {
  if (!formData.edited) {
    formData.cekData().then(() => {
      step.value = 2
    })
  } else {
    step.value = 2
  }
}

function sendToList () {
  formData.sendToList().then(() => {
    step.value = 1
  })
}

function editData (idx) {
  formData.editData(idx)
    .then(() => {
      step.value = 1
    })
}

function deleteData (i) {
  const oldStep = step.value
  formData.deleteList(i)
  step.value = oldStep
}
</script>

<style lang="scss" scoped>

</style>
