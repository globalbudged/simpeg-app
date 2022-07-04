<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
// import { onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup () {
    document.body.setAttribute(['data-text-size'], 'md')
  }
})
</script>
