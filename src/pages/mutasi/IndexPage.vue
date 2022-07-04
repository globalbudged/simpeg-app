<template>
    <q-page class="my-page q-pa-md">
        <div class="row q-col-gutter-sm">
            <div class="col-md-7 col-xs-12">
                <FormMutasi />
            </div>
            <div class="col-md-5 col-xs-12">
                <q-card class="card-page" flat bordered>
                    TABLE
                </q-card>
            </div>
        </div>

    </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import FormMutasi from './FormMutasi.vue'
// import { useMutasiStore } from 'src/stores/mutasi'
import { useFormMutasiStore } from '../../stores/mutasi/form'

const formData = useFormMutasiStore()
onMounted(() => {
  formData.getAutocomplete()
  formData.setToday()
})
</script>

<style lang="scss" scoped>

</style>
