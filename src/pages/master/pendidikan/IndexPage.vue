<template>
    <q-page class="my-page q-pa-sm">
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <q-card class="card-page" flat bordered>
                    <!-- table -->
                    <div class="q-pa-md">
                        <app-table
                            title="Data Pemdidikan"
                            :columns="pendidikan.columns"
                            :columnHide="pendidikan.columnHide"
                            :items="pendidikan.items"
                            :meta="pendidikan.meta"
                            :per-page="pendidikan.params.per_page"
                            :order-by="pendidikan.params.order_by"
                            :sort="pendidikan.params.sort"
                            :loading="pendidikan.loading"
                            :to-search="pendidikan.params.q"
                            @setOrder="pendidikan.setOder"
                            @setRow="pendidikan.setPerPage"
                            @goto="pendidikan.setPage"
                            @deleteIds="pendidikan.deletesData"
                            @delete="pendidikan.deletesData"
                            @refresh="pendidikan.getDataTable"
                            @find="pendidikan.setSearch"
                            @newData="formData.newData"
                            @editData="formData.editData"
                        >
                        <!-- nanti kembali
                            @newData="formData.newData"
                            @editData="formData.editData"
                            row-image="image"
                        -->
                        <!-- ini untuk ubah header -->
                        <template v-slot:col-created_at >
                            <div>dibuat pd tgl</div>
                        </template>
                        <template v-slot:col-updated_at >
                            <div>diubah pd tgl</div>
                        </template>
                        <!-- ini untuk ubah format cellnya -->
                        <template v-slot:cell-created_at="{row}" >
                            <div>{{date.formatDate(row.created_at, 'DD MMMM, YYYY')}} pukul: <span class="text-grey text-italic">{{date.formatDate(row.created_at, 'hh:mm A')}}</span></div>
                        </template>
                        <template v-slot:cell-updated_at="{row}" >
                            <div>{{date.formatDate(row.updated_at, 'DD MMMM, YYYY')}} pukul: <span class="text-grey text-italic">{{date.formatDate(row.updated_at, 'hh:mm A')}}</span></div>
                        </template>
                        </app-table>
                    </div>
                    <!-- {{formPegawai.isOpen}} -->

                    <FormDialog v-model="formData.isOpen" />
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup>
// import ======================================
import { onMounted } from 'vue'
import { usePendidikanStore } from 'src/stores/master/pendidikan'
import { useFormStore } from 'src/stores/master/pendidikan/form'
import { date } from 'quasar'
import FormDialog from '../pendidikan/FormDialog.vue'

// const ======================================
onMounted(() => {
  pendidikan.getDataTable()
})
const pendidikan = usePendidikanStore()
const formData = useFormStore()
// methods ======================================

</script>

<style lang="scss" scoped>

</style>
