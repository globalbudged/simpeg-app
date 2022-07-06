<template>
    <div class="bg-page q-pa-lg">
        <div class="row q-col-gutter-md">
            <div class="col-md-7 col-xs-12">
                <q-stepper
                    v-model="step"
                    header-nav
                    ref="stepper"
                    color="primary"
                    animated
                >
                    <q-step
                        :name="1"
                        title="Data Diri"
                        icon="person"
                    >
                        <q-form @submit="step=2">
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
                                    <app-input-date valid v-model="formData.form.tanggal_lahir"
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
                            <q-banner class="bg-page q-mt-md">
                                <strong>INFORMASI</strong> <br />
                                <em>Informasi ini Bersifat penting, isi secara detail form diatas. Inputan yang bertanda <strong>*</strong> Wajib diisi untuk yang lainnya Optional</em>
                            </q-banner>
                            <q-stepper-navigation class="text-right">
                                <app-btn type="submit" color="primary" label="Lanjut" />
                            </q-stepper-navigation>
                        </q-form>
                    </q-step>

                    <q-step
                        :name="2"
                        title="Keterangan Lainnya"
                        caption="Untuk Kelengkapan Data"
                        icon="create_new_folder"
                    >
                        <q-form>
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
                                <div class="col-md-5 col-xs-12">
                                    Jurusan dan Profesi Pegawai
                                </div>
                                <div class="col-md-7 col-xs-12">
                                    <div class="flex items-center justify-between">
                                        <app-autocomplete valid outlined
                                            v-model="formData.form.jurusan_id"
                                            label="Jurusan - Profesi"
                                            :source="formData.jurusans"
                                            @setModel="coba"
                                            @create="create"
                                        />
                                        <q-btn size="sm" icon="add" flat round  @click="openKelMed = !openKelMed"/>
                                    </div>
                                </div>

                                <!-- <div class="col-md-1 col-xs-4">
                                </div> -->
                                <div class="col-md-12 col-xs-12">
                                    <!-- {{openPendidikan}} -->
                                </div>
                            </div>

                            <q-stepper-navigation>
                                <q-btn @click="() => { step = 3 }" color="primary" label="Continue" />
                                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                            </q-stepper-navigation>
                        </q-form>

                    </q-step>

                    <q-step
                        :name="3"
                        title="Create an ad"
                        icon="add_comment"
                    >
                        Try out different ad text to see what brings in the most customers, and learn how to
                        enhance your ads using features like ad extensions. If you run into any problems with
                        your ads, find out how to tell if they're running and how to resolve approval issues.

                        <q-stepper-navigation>
                        <q-btn color="primary"  label="Finish" />
                        <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>

                </q-stepper>
            </div>
            <div class="col-md-5 col-xs-12">
                untuk list tabel
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

const formData = useFormDetailMutasiStore()
const formPendidikan = useFormStore()
const formKelMed = kelompokMedis.useFormStore()
const step = ref(1)

onMounted(() => {
  formData.getProvinces()
  formData.setToday()
  formData.getAutocomplete()
  formData.getJurusans()
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

function coba (val) {
  console.log('input', val)
}

function create (val) {
  console.log('enter', val)
}
</script>

<style lang="scss" scoped>

</style>
