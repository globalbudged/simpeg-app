<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
// import { onBeforeRouteUpdate } from 'vue-router'
// import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  setup () {
    document.body.setAttribute(['data-text-size'], 'md')
    // const $q = useQuasar()

    // console.log($q)
  }
})
</script>
