<template>
    <div class="">
        <q-list bordered class="bg-info text-white rounded-borders full-width">
            <q-item-label header class="text-white">LIST TABEL PEGAWAI MUTASI MASUK</q-item-label>
            <q-item class="mt--5">
                <q-item-section>
                    <q-item-label>No Mutasi : {{formData.form.no_mutasi}}</q-item-label>
                    <q-item-label caption>No. Surat : {{formData.form.no_surat}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator  class="bg-grey-3"/>
            <div v-for="(item, i) in props.items" :key="i">
                <transition-group
                    appear
                    enter-active-class="animated slide-right"
                    leave-active-class="animated slide-left"
                >
                    <q-item clickable v-ripple key="item">
                        <q-item-section avatar>
                            <q-avatar rounded class="bg-white">
                                <img src="~assets/images/user-avatar.svg">
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                        <q-item-label lines="1" class="text-weight-bold">{{!item.pegawai? item.nama: item.pegawai.nama}}</q-item-label>
                        <q-item-label caption lines="2">
                            <span class="f-11 text-white">Nip / Kode Pegawai: {{!item.pegawai? item.nip: item.pegawai.nip}} <br />
                            -- Nik  : {{!item.pegawai?item.nik: item.pegawai.nik}} </span>
                        </q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-spinner v-if="!item.pegawai"
                                color="primary"
                                size="3em"
                                :thickness="5"
                            />
                            <q-icon v-else class="text-white cursor-pointer" name="more_vert" >
                                <q-menu>
                                    <q-list dense style="min-width: 100px" @click="$emit('edit', i)">
                                        <q-item clickable v-close-popup>
                                            <q-item-section>Edit ..</q-item-section>
                                        </q-item>
                                        <q-item clickable v-close-popup @click="$emit('delete', i)">
                                            <q-item-section>Delete </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-icon>
                        </q-item-section>
                    </q-item>
                    <q-separator v-if="i !== formData.details.length -1" class="bg-grey-3" inset="item" />
                </transition-group>
            </div>
        </q-list>
    </div>
</template>

<script setup>
import { useFormDetailMutasiStore } from 'src/stores/mutasi/formdetail'
const props = defineProps({
  items: { type: Array, default: () => [] },
  temp: { type: Boolean, default: true }
})

const formData = useFormDetailMutasiStore()

defineEmits(['edit', 'delete'])

</script>

<style lang="scss" scoped>

</style>
