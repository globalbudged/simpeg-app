<template>
    <div>
        <temp-page-panel
            :loading="jabatan.loading"
            :loading-more="jabatan.loadingMore"
            :items="jabatan.items"
            :mores="jabatan.mores"
            :meta="jabatan.meta"
            :sort="jabatan.params.sort"
            title="Master Jabatan"
            title-list="List Data Jabatan"
            caption="Masukkan Data Jabatan Pegawai"
            @sort="jabatan.sortOrder"
            @get-more="jabatan.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.nama" label="Nama Jabatan , contoh: KARYAWAN" class="q-mb-sm"/>
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
import { useFormStore } from 'src/stores/master/jabatan/form'
import { useJabatanStore } from 'src/stores/master/jabatan/index'
import { useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const jabatan = useJabatanStore()

onMounted(() => {
  jabatan.getDataTable()
  formData.resetFORM()
})

function deleteData (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
  }).onOk(() => {
    jabatan.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
  })
}
</script>

<style lang="scss" scoped>

</style>
