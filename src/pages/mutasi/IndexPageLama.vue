<template>
    <q-page >
        <q-toolbar class="bg-primary text-white">
            <q-toolbar-title inset><strong>Komponen</strong> Master</q-toolbar-title>
            <q-tabs
                    v-model="tab"
                    inline-label
                    shrink stretch
                    indicator-color="transparent"
                >
                    <q-tab no-caps name="input" icon="drive_file_rename_outline" label="Input Data" />
                    <q-tab no-caps name="list" icon="ballot" label="Table / List Data" />
            </q-tabs>
        </q-toolbar>

        <q-tab-panels v-model="tab"
            animated
            transition-prev="slide-down"
            transition-next="slide-up"
            class="bg-page">
            <q-tab-panel name="input" >
                <FormMutasi />
            </q-tab-panel>

            <q-tab-panel name="list">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
        </q-tab-panels>

    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import FormMutasi from './FormMutasi.vue'

const tab = ref('input')
</script>

<style lang="scss" scoped>

</style>
