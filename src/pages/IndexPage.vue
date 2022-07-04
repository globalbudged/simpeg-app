<template>
  <q-page class="flex column flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <div>{{token}}</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $q = useQuasar()
    const token = $q.localStorage.getItem('token')

    onBeforeRouteUpdate(() => {
      console.log($q.localStorage.getItem('token'))
    })

    return {
      token
    }
  }

})
</script>
