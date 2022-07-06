<template>
    <q-drawer
      show-if-above elevated
      :width="220"
      class="adm-drawer__left"
    >
      <div class="absolute-top" >
        <div class="adm-drawer__logo flex flex-center q-pa-sm" style="height: 50px;">
          <div>Tempat Logo</div>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 50px); margin-top: 50px;">
        <AdmDrawerHeader />
        <q-list padding class="adm-drawer__list">
          <div v-for="(link, i) in links" :key="i">
            <div class="_list-header">{{link.nama}}</div>
            <q-item v-for="(menu, idx) in link.links" :key="idx" class="adm-drawer__item" v-ripple  clickable
              :to="{path:menu.url}"
            >
              <q-item-section avatar>
                <q-icon :name="menu.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{menu.nama}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
</template>

<script setup>
import { ref } from 'vue'
import AdmDrawerHeader from '../admins/AdmDrawerHeader.vue'

const links = ref([
  {
    menu: 1,
    nama: 'User Control',
    links: [
      { icon: 'dashboard', nama: 'Dashboard', url: '/dashboard' },
      { icon: 'description', nama: 'Mutasi', url: '/mutasi' }
    ]
  },
  {
    menu: 2,
    nama: 'Master Controls',
    links: [
      { icon: 'people', nama: 'Data Pegawai', url: '/pegawai' },
      { icon: 'leaderboard', nama: 'Data Pendidikan', url: '/pendidikan' },
      { icon: 'layers', nama: 'Komponen Master', url: '/components' },
      { icon: 'list_alt', nama: 'Data mboh', url: '/' }
    ]
  }
])
</script>

<style lang="scss" scoped>
</style>
