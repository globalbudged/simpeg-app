<template>
  <q-dialog>
    <q-card class="card-dialog q-pa-sm" style="width: 100%; max-width:350px;">
      <q-card-section>
        <div class="f-18 text-bold">Form Tambah / Edit Data</div>
        <div class="text-subtitle2">Data Master Pendidikan </div>
      </q-card-section>
      <q-separator />
      <q-form ref="myForm" @submit="onSubmit" @reset="onReset">
        <q-card-section>
          <div class="row q-col-gutter-sm ">
            <div class="col-12">
                <app-input autofocus v-model="formData.form.nama" label="Nama Pendidikan" />
            </div>
            <div class="col-12">
                <app-input valid v-model="formData.form.keterangan" label="Keterangan " />
            </div>
            <div class="col-12">
                <app-input valid v-model="formData.form.flag" label="Masukkan flag (Optional)" />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <app-btn :loading="formData.loading" type="submit" color="primary" label="Selesai & Simpan" />
          <app-btn class="q-ml-md" type="reset" label="Close" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>

</template>

<script setup>
// import ======================================
import { ref, onMounted } from 'vue'
import { useFormStore } from 'src/stores/master/pendidikan/form'

// const ======================================
// const options = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya']
const formData = useFormStore()
// const provinces = form.provinces
onMounted(() => {
//   form.getProvinces()
//   form.setToday()
  console.log(myForm.value)
})

const myForm = ref(null)
const onSubmit = () => {
  formData.saveForm().then(() => {
    myForm.value.resetValidation()
  })
  // console.log(myForm.value)
}
const onReset = () => {
  myForm.value.resetValidation()
  formData.toggleOpen()
}
</script>

<style lang="scss" scoped>

</style>
