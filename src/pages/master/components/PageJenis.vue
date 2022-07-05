<template>
    <div>
        <temp-page-panel
            :loading="jeniskepegawaian.loading"
            :loading-more="jeniskepegawaian.loadingMore"
            :items="jeniskepegawaian.items"
            :mores="jeniskepegawaian.mores"
            :meta="jeniskepegawaian.meta"
            :sort="jeniskepegawaian.params.sort"
            title="Master Jenis Kepegawaian"
            title-list="List Jenis Kepegawaian"
            caption="Masukkan Jenis Kepegawaian Pegawai"
            @sort="jeniskepegawaian.sortOrder"
            @get-more="jeniskepegawaian.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.nama" label="Jenis Kepegawaian, (contoh: PNS)" class="q-mb-sm"/>
                <app-input valid v-model="formData.form.kelompok" label="Kelompok , (contoh: ASN)" class="q-mb-sm"/>
            </template>
            <template v-slot:letter-icon="{row}">
              <div class="text-capitalize">{{row.nama.slice(0,1)}}</div>
            </template>
            <template v-slot:nama="{row}">
              {{row.nama}}
            </template>
            <template v-slot:caption-nama="{row}">
              {{row.kelompok}}
            </template>
        </temp-page-panel>
    </div>
</template>

<script setup>
import TempPagePanel from './TempPagePanel.vue'
// import ======================================
import { onMounted } from 'vue'
import { useFormStore } from 'src/stores/master/jeniskepegawaian/form'
import { useJenisKepegawaianStore } from 'src/stores/master/jeniskepegawaian/index'
import { useQuasar } from 'quasar'
// import { date, useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const jeniskepegawaian = useJenisKepegawaianStore()

onMounted(() => {
  jeniskepegawaian.getDataTable()
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
    jeniskepegawaian.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<style lang="scss" scoped>

</style>
