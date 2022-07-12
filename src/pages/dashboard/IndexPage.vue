<template>
    <q-page class="flex column flex-center full-height">
        <app-auto-complete-api
            valid outlined
            style="width:50%"
            v-model="jabatanId"
            label="Jabatan"
            autocomplete="nama"
            endpoint="/autocomplete_jabatans"
            option-value="id"
            :optionLabel="(val )=> val ? val.nama:null"

        />
    </q-page>
</template>

<script setup>
import { ref } from 'vue'

const jabatanId = ref('')
</script>

<style lang="scss" scoped>

</style>
