<template>
    <q-page class="">
        <!-- title -->
        <div class="adm-toolbar">
            <q-toolbar >
                <q-avatar color="primary" text-color="white" size="40px" icon="open_in_full" class="cursor-pointer" @click="store.SET_WIDER" />
                <q-toolbar-title><strong>Komponen</strong> Master</q-toolbar-title>
            </q-toolbar>
            <!-- <q-toolbar inset>
            </q-toolbar> -->
        </div>
        <!-- content -->
        <div>
            <q-splitter v-model="splitterModel" :limits="[5, 100]">

            <template v-slot:before>
                <q-tabs
                    v-model="tab"
                    vertical
                    class="text-grey"
                    dense
                    inline-label
                    align="left"
                    :breakpoint="0"
                    active-color="primary"
                >
                <q-tab v-for="(menu, i) in tabs" :key="i"
                    class="my__tab" no-caps :name="menu.name"
                    :label="store.wider?menu.name: null" :icon="menu.icon">
                    <q-tooltip v-if="!store.wider" class="bg-secondary" anchor="center right" self="center left" :offset="[5, 5]">
                        <strong class="f-14">{{menu.name}}</strong> ...
                        <!-- <em>right</em> -->
                        (<q-icon name="keyboard_arrow_right"/>)
                    </q-tooltip>
                </q-tab>
                </q-tabs>
            </template>
            <!-- <template v-slot:separator>
                    <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" class="cursor-pointer" />
            </template> -->
            <template v-slot:after>
                <q-tab-panels
                    v-model="tab"
                    animated
                    swipeable
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                >
                <q-tab-panel v-for="(panel, idx) in tabs" :key="idx" :name="panel.name">
                    <component :is="panel.comp"></component>
                </q-tab-panel>
                </q-tab-panels>
            </template>

            </q-splitter>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted, shallowRef, computed } from 'vue'
import { useMasterStore } from 'src/stores/master'

import PagePendidikan from 'src/pages/master/components/PagePendidikan.vue'
import PageJenis from 'src/pages/master/components/PageJenis.vue'
import PageKelompokMedis from 'src/pages/master/components/PageKelompokMedis.vue'
import PageJurusan from 'src/pages/master/components/PageJurusan.vue'
import PageBagian from 'src/pages/master/components/PageBagian.vue'
import PageJabatan from 'src/pages/master/components/PageJabatan.vue'
import PageGolongan from 'src/pages/master/components/PageGolongan.vue'
import PageRuangan from 'src/pages/master/components/PageRuangan.vue'

const store = useMasterStore()

const tab = ref('Pendidikan')
const tabs = shallowRef([
  { name: 'Pendidikan', icon: 'school', comp: PagePendidikan },
  { name: 'Jenis Kepegawaian', icon: 'assignment', comp: PageJenis },
  { name: 'Kelompok Medis', icon: 'analytics', comp: PageKelompokMedis },
  { name: 'Jurusan', icon: 'interests', comp: PageJurusan },
  { name: 'Bagian', icon: 'assignment_turned_in', comp: PageBagian },
  { name: 'Jenis Jabatan', icon: 'extension', comp: PageJabatan },
  { name: 'Golongan', icon: 'loyalty', comp: PageGolongan },
  { name: 'Ruangan', icon: 'space_dashboard', comp: PageRuangan },
  { name: 'Jadwal Kerja', icon: 'sticky_note_2' },
  { name: 'Shift', icon: 'swap_horiz' },
  { name: 'Satker Luar', icon: 'rule' },
  { name: 'PHK', icon: 'announcement' }
])
const splitterModel = computed(() => {
  return store.wider ? 20 : 5
})

onMounted(() => {
//   console.log('global', globalComponents)
})

// const currentTab = shallowRef(tabs.value[0])
</script>

<style lang="scss" scoped>
.my__tab{
    justify-content:initial;
    padding:8px 15px;
    font-size: 12px;
}
</style>
