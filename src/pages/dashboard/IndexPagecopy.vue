<template>
    <div>
        <temp-page-panel
            :loading="kelompokmedis.loading"
            :loading-more="kelompokmedis.loadingMore"
            :items="kelompokmedis.items"
            :mores="kelompokmedis.mores"
            :meta="kelompokmedis.meta"
            :sort="kelompokmedis.params.sort"
            title="Master Kelompok Medis Kepegawaian"
            caption="Masukkan Data Kelompok Medis Pegawai"
            title-list="List Pendidikan"
            @get-more="kelompokmedis.setMorePage"
            @submit="formData.saveForm"
            @delete="deleteData"
            @edit="formData.editData"
            @reset="formData.newData"
        >
            <template v-slot:form>
                <app-input :autofocus="false" v-model="formData.form.nama" label="Jenis Kelompok Medis" class="q-mb-sm"/>
                <app-input valid v-model="formData.form.flag" label="Masukkan flag (Optional)" />
            </template>
            <template v-slot:letter-icon="{row}">
              <div class="text-capitalize">{{row.nama.slice(0,1)}}</div>
            </template>
            <template v-slot:nama="{row}">
              {{row.nama}}
            </template>
            <template v-slot:caption-nama="{row}">
              {{row.flag}}
            </template>
        </temp-page-panel>
    </div>
</template>

<script setup>
import TempPagePanel from 'src/pages/master/components/TempPagePanel.vue'
// import ======================================
import { onMounted } from 'vue'
import { useFormStore } from 'src/stores/master/kolompokmedis/form'
import { useKelMedisStore } from 'src/stores/master/kelompokmedis/index'
import { useQuasar } from 'quasar'
// import { date, useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const kelompokmedis = useKelMedisStore()

onMounted(() => {
  kelompokmedis.getDataTable()
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
    kelompokmedis.deletesData(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<style lang="scss" scoped>

</style>
