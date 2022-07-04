<template>
    <div class="q-pa-md full-height">
        <div class="text-h4">Master Pendidikan</div>
        <div class="text-caption2">Masukkan Master Data Pendidikan Pegawai</div>
        <!-- <div class="row">
            <div class="col-md-6 col-xs-12">
                <q-card flat bordered class="my-card bg-grey-2">
                    <q-card-section>
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">Our Planet</div>
                            <div class="text-subtitle2">by John Doe</div>
                        </div>

                        <div class="col-auto">
                            <q-btn color="grey-7" round flat icon="more_vert">
                            <q-menu cover auto-close>
                                <q-list>
                                <q-item clickable>
                                    <q-item-section>Remove Card</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>Send Feedback</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>Share</q-item-section>
                                </q-item>
                                </q-list>
                            </q-menu>
                            </q-btn>
                        </div>
                        </div>
                    </q-card-section>

                    <q-card-section>
                        Lorem
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-btn flat>Action 1</q-btn>
                        <q-btn flat>Action 2</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col-md-6 col-xs-12">
                <q-card class="my-card">
                    <q-card-section>
                        <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">Our Planet</div>
                            <div class="text-subtitle2">by John Doe</div>
                        </div>

                        <div class="col-auto">
                            <q-btn color="grey-7" round flat icon="more_vert">
                            <q-menu cover auto-close>
                                <q-list>
                                <q-item clickable>
                                    <q-item-section>Remove Card</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>Send Feedback</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>Share</q-item-section>
                                </q-item>
                                </q-list>
                            </q-menu>
                            </q-btn>
                        </div>
                        </div>
                    </q-card-section>

                    <q-card-section>
                        Lorem
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-btn flat>Action 1</q-btn>
                        <q-btn flat>Action 2</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div> -->

        <div class="q-mt-lg">
            <q-card class="my-card" flat bordered>
                <q-card-section horizontal>
                    <q-card-section class="bg-grey-2" style="width:50%;">
                        <q-form ref="myForm" @submit="onSubmit">
                            <div class="text-h5 q-mb-lg">Form Input</div>
                                <app-input :autofocus="false" v-model="formData.form.nama" label="Nama Pendidikan" class="q-mb-sm"/>
                                <app-input valid v-model="formData.form.keterangan" label="Keterangan " class="q-mb-sm" />
                                <app-input valid v-model="formData.form.flag" label="Masukkan flag (Optional)" />
                            <q-separator />
                            <div class="q-mt-lg">
                                <app-btn :loading="formData.loading" type="submit" color="primary" label="Selesai & Simpan" />
                                <!-- <app-btn class="q-ml-md" type="reset" label="Close" /> -->
                            </div>
                        </q-form>
                    </q-card-section>

                    <q-separator vertical />

                    <!-- <q-card-section style="width:100%"> -->
                        <!-- <div class="q-pa-lg">
                            <div class="text-h5 ">List Data</div>
                            <div class="text-caption ">List Data</div>
                        </div> -->
                        <div style="width: 100%; height: 100%;">
                            <div class="title--list q-pa-md">List Data Pendidikan</div>
                            <q-separator />
                            <q-scroll-area style="height: 400px;">
                                <q-list bordered separator class="rounded-borders" >
                                    <q-item v-if="pendidikan.loading">
                                        <q-item-section avatar>
                                            <q-skeleton type="QAvatar" size="40px" />
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label>
                                            <q-skeleton type="text" />
                                            </q-item-label>
                                            <q-item-label caption>
                                            <q-skeleton type="text" width="65%" />
                                            </q-item-label>
                                        </q-item-section>
                                        <q-item-section side>
                                            <q-skeleton type="QAvatar" size="20px" />
                                        </q-item-section>
                                    </q-item>
                                    <q-item v-for="(item, i) in items" :key="i" class="" clickable >
                                        <q-item-section avatar class="q-mr-lg">
                                            <q-skeleton v-if="pendidikan.loading" type="QAvatar" size="40px" />
                                            <q-avatar v-else color="primary" text-color="white">
                                                S
                                            </q-avatar>
                                        </q-item-section>

                                        <q-item-section>
                                            <q-item-label class="text-bold">
                                                <q-skeleton v-if="pendidikan.loading" type="text" />
                                                <div v-else >{{item.nama}}</div>
                                            </q-item-label>
                                            <q-item-label v-if="!pendidikan.loading" caption lines="1" style="margin-top: 0px;">
                                                {{item.keterangan}}
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side>
                                            <q-item-label>
                                                <div v-if="!pendidikan.loading" class="text-grey">
                                                    {{date.formatDate(item.created_at, 'DD MMMM, YYYY')}} pukul: <span class="text-italic">{{date.formatDate(item.created_at, 'hh:mm A')}}</span>
                                                </div>
                                            </q-item-label>
                                        </q-item-section>

                                        <q-item-section side>
                                            <q-btn v-if="!pendidikan.loading" class="gt-xs" size="10px" flat dense round icon="delete" @click="deleteData(item.id)" />
                                            <q-skeleton v-else type="QAvatar" size="20px" />
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-scroll-area>
                        </div>
                    <!-- </q-card-section> -->
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
// import ======================================
import { ref, onMounted, computed } from 'vue'
import { useFormStore } from 'src/stores/master/pendidikan/form'
import { usePendidikanStore } from 'src/stores/master/pendidikan'
import { date, useQuasar } from 'quasar'

// const ======================================
const $q = useQuasar()
const formData = useFormStore()
const pendidikan = usePendidikanStore()

const items = computed(() => pendidikan.items)

const myForm = ref(null)
const onSubmit = () => {
  formData.saveForm().then(() => {
    myForm.value.resetValidation()
  })
  // console.log(myForm.value)
}

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
