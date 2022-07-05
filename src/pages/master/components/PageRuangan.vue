<template>
    <div>
        <temp-page-panel
            :loading="ruangan.loading"
            :loading-more="ruangan.loadingMore"
            :items="ruangan.items"
            :mores="ruangan.mores"
            :meta="ruangan.meta"
            :sort="ruangan.params.sort"
            title="Master Ruangan"
            title-list="List Ruangan"
            caption="Masukkan Data Ruangan Pegawai"
            @sort="ruangan.sortOrder"
            @get-more="ruangan.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.gedung" label="Nama Gedung , contoh: GEDUNG A" class="q-mb-sm"/>
                <app-input v-model="formData.form.lantai" label="Lantai ?" class="q-mb-sm"/>
                <app-input v-model="formData.form.ruangan" label="Nama Ruangan contoh: RUANG MELATI" class="q-mb-sm"/>
            </template>
            <template v-slot:letter-icon="{row}">
              <div class="text-capitalize">{{row.ruangan.slice(0,1)}}</div>
            </template>
            <template v-slot:nama="{row}">
              {{row.gedung}} - LANTAI {{row.lantai}}
            </template>
            <template v-slot:caption-nama="{row}">
              RUANGAN  {{row.ruangan}}
            </template>
        </temp-page-panel>
    </div>
</template>

<script setup>
import TempPagePanel from './TempPagePanel.vue'
// import ======================================
import { onMounted } from 'vue'
import { useFormStore } from 'src/stores/master/ruangan/form'
import { useRuanganStore } from 'src/stores/master/ruangan/index'
import { useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const ruangan = useRuanganStore()

onMounted(() => {
  ruangan.getDataTable()
  formData.resetFORM()
})

function deleteData (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
  }).onOk(() => {
    ruangan.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
  })
}
</script>

<style lang="scss" scoped>

</style>
