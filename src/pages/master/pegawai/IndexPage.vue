<template>
    <q-page class="my-page q-pa-sm">
        <q-card class="card-page" flat bordered>
            <!-- table -->
            <div class="q-pa-md">
                <app-table
                    title="Data Pegawai"
                    :columns="pegawai.columns"
                    :columnHide="pegawai.columnHide"
                    :items="pegawai.items"
                    :meta="pegawai.meta"
                    :per-page="pegawai.params.per_page"
                    :order-by="pegawai.params.order_by"
                    :sort="pegawai.params.sort"
                    :loading="pegawai.loading"
                    :to-search="pegawai.params.q"
                    @setOrder="pegawai.setOder"
                    @setRow="pegawai.setPerPage"
                    @goto="pegawai.setPage"
                    @deleteIds="pegawai.deletesData"
                    @delete="pegawai.deletesData"
                    @find="pegawai.setSearch"
                    @newData="formPegawai.newData"
                    @editData="formPegawai.editData"
                    row-image="image"
                >
                <!-- ini untuk ubah header -->
                <template v-slot:col-name >
                    <div>Nama</div>
                </template>
                <template v-slot:col-gender >
                    <div>L/P</div>
                </template>
                <!-- ini untuk ubah format cellnya -->
                <template v-slot:cell-alamat="{row}" >
                    <div>{{row.alamat}}, {{row.provinsi}}</div>
                </template>
                <template v-slot:cell-updated_at="{row}" >
                    <div>{{date.formatDate(row.updated_at, 'DD MMMM, YYYY')}}</div>
                </template>
                </app-table>
            </div>
            <!-- {{formPegawai.isOpen}} -->

            <FormDialog v-model="formPegawai.isOpen" />
        </q-card>
    </q-page>
</template>

<script setup>
// import ======================================
import { onMounted } from 'vue'
import { usePegawaiStore } from 'src/stores/pegawai'
import { useFormPegawaiStore } from 'src/stores/formpegawai'
import { date } from 'quasar'
import FormDialog from '../pegawai/FormDialog.vue'

// const ======================================
onMounted(() => {
  pegawai.getDataTable()
})
const pegawai = usePegawaiStore()
const formPegawai = useFormPegawaiStore()
// methods ======================================
</script>

<style lang="scss" scoped>

</style>
