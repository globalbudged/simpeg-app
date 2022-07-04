<template>
  <q-layout view="lHh Lpr lFf" class="text-size-12" :data-theme="theme">

    <AppBeforeMount v-show="wait" />
    <AdmHeader
      @open-left="menuLeft = !menuLeft"
      @open-right="menuRight = !menuRight"
    />
    <AdmDrawerLeft v-model="menuLeft" />
    <AdmDrawerRight v-model="menuRight" />

    <q-page-container>
        <router-view v-slot="{ Component }">
          <transition
            appear
            enter-active-class="animated slide-left"
            leave-active-class="animated silde-right"
          >
            <component :is="Component" />
          </transition>
        </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onBeforeUpdate, onUpdated, onBeforeMount, onMounted, onActivated } from 'vue'
// import { useAuthStore } from 'src/stores/auth'
import AdmHeader from '../admins/AdmHeader.vue'
import AdmDrawerLeft from '../admins/AdmDrawerLeft.vue'
import AdmDrawerRight from '../admins/AdmDrawerRight.vue'

const wait = ref(false)

onBeforeUpdate(() => {
  console.log('beforeUpdate loading...')
})
onUpdated(() => {
  console.log('updated ')
  // wait.value = false
})
onBeforeMount(() => {
  console.log('before mounted ')
  wait.value = true
})
onMounted(() => {
  console.log('mounted ')
  wait.value = false
})
onActivated(() => {
  console.log('activaated ')
})

// const storeAuth = useAuthStore()
const theme = ref('default')
const menuLeft = ref(true)
const menuRight = ref(false)

// import
</script>
