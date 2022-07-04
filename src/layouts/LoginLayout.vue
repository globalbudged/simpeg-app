<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <!-- <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      > -->
        <router-view />
      <!-- </transition> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginLayout'

})
</script>
