<template>
    <div>
        <temp-page-panel
            :loading="pendidikan.loading"
            :loading-more="pendidikan.loadingMore"
            :items="pendidikan.items"
            :mores="pendidikan.mores"
            :meta="pendidikan.meta"
            :sort="pendidikan.params.sort"
            title="Master Data Pendidikan"
            caption="Masukkan Data Pendidikan Pegawai"
            title-list="List Pendidikan"
            @sort="pendidikan.sortOrder"
            @get-more="pendidikan.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.nama" label="Nama Jenis Kepegawaian" class="q-mb-sm"/>
                <app-input valid v-model="formData.form.keterangan" label="Kelompok" class="q-mb-sm"/>
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
import { useFormStore } from 'src/stores/master/pendidikan/form'
import { usePendidikanStore } from 'src/stores/master/pendidikan/index'
import { useQuasar } from 'quasar'
// import { date, useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const pendidikan = usePendidikanStore()

onMounted(() => {
  pendidikan.getDataTable()
  formData.resetFORM()
})

function deleteData (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    pendidikan.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<style lang="scss" scoped>

</style>
