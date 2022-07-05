<template>
    <div>
        <temp-page-panel
            :loading="bagian.loading"
            :loading-more="bagian.loadingMore"
            :items="bagian.items"
            :mores="bagian.mores"
            :meta="bagian.meta"
            :sort="bagian.params.sort"
            title="Master Bagian"
            title-list="List Bagian"
            caption="Masukkan Data Bagian Pegawai"
            @sort="bagian.sortOrder"
            @get-more="bagian.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.nama" label="Nama Bagian , contoh: KEUANGAN" class="q-mb-sm"/>
                <app-input valid v-model="formData.form.keterangan" label="Keterangan... (Optional)" class="q-mb-sm"/>
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
import { useFormStore } from 'src/stores/master/bagian/form'
import { useBagianStore } from 'src/stores/master/bagian/index'
import { useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const bagian = useBagianStore()

onMounted(() => {
  bagian.getDataTable()
  formData.resetFORM()
})

function deleteData (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
  }).onOk(() => {
    bagian.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
  })
}
</script>

<style lang="scss" scoped>

</style>
