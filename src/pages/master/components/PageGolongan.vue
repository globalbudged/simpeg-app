<template>
    <div>
        <temp-page-panel
            :loading="golongan.loading"
            :loading-more="golongan.loadingMore"
            :items="golongan.items"
            :mores="golongan.mores"
            :meta="golongan.meta"
            :sort="golongan.params.sort"
            title="Master Golongan"
            title-list="List Golongan"
            caption="Masukkan Data Golongan Pegawai"
            @sort="golongan.sortOrder"
            @get-more="golongan.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.nama" label="Nama Golongan , contoh: 1/A" class="q-mb-sm"/>
                <app-input valid v-model="formData.form.keterangan" label="Keterangan... (contoh: JURU MUDA)" class="q-mb-sm"/>
            </template>
            <template v-slot:letter-icon="{row}">
              <div class="text-capitalize">{{row.nama.slice(0,1)}}</div>
            </template>
            <template v-slot:nama="{row}">
              {{row.nama}}
            </template>
            <template v-slot:caption-nama="{row}">
              {{row.keterangan}}
            </template>
        </temp-page-panel>
    </div>
</template>

<script setup>
import TempPagePanel from './TempPagePanel.vue'
// import ======================================
import { onMounted } from 'vue'
import { useFormStore } from 'src/stores/master/golongan/form'
import { useGolonganStore } from 'src/stores/master/golongan/index'
import { useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const golongan = useGolonganStore()

onMounted(() => {
  golongan.getDataTable()
  formData.resetFORM()
})

function deleteData (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
  }).onOk(() => {
    golongan.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
  })
}
</script>

<style lang="scss" scoped>

</style>
