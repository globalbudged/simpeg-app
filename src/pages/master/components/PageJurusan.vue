<template>
    <div>
        <temp-page-panel
            :loading="jurusan.loading"
            :loading-more="jurusan.loadingMore"
            :items="jurusan.items"
            :mores="jurusan.mores"
            :meta="jurusan.meta"
            :sort="jurusan.params.sort"
            title="Master Jurusan"
            title-list="List Jurusan"
            caption="Masukkan Jurusan Pegawai"
            @sort="jurusan.sortOrder"
            @get-more="jurusan.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.nama" label="Jurusan" class="q-mb-sm"/>
                <app-input valid v-model="formData.form.profesi" label="Profesi" class="q-mb-sm"/>
            </template>
            <template v-slot:letter-icon="{row}">
              <div class="text-capitalize">{{row.nama.slice(0,1)}}</div>
            </template>
            <template v-slot:nama="{row}">
              {{row.nama}}
            </template>
            <template v-slot:caption-nama="{row}">
              {{row.profesi}}
            </template>
        </temp-page-panel>
    </div>
</template>

<script setup>
import TempPagePanel from './TempPagePanel.vue'
// import ======================================
import { onMounted } from 'vue'
import { useFormStore } from 'src/stores/master/jurusan/form'
import { useJurusanStore } from 'src/stores/master/jurusan/index'
import { useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const jurusan = useJurusanStore()

onMounted(() => {
  jurusan.getDataTable()
  formData.resetFORM()
})

function deleteData (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
  }).onOk(() => {
    jurusan.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
  })
}
</script>

<style lang="scss" scoped>

</style>
