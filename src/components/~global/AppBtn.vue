<template>
    <q-btn
      unelevated
        padding="sm"
        dense
        no-caps
        :type="props.type"
        :color="props.color"
        :class="props.class"
        :loading="loading"
        :disable="loading"
        style="min-width:100px"
    >
        <div class="f-12" :class="color===''?'text-primary':''">{{label}}</div>
        <template v-slot:loading>
            <q-spinner-hourglass class="on-left" size="18px" />
            <span class="f-12"> Loading </span>
      </template>
    </q-btn>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: 'submit'
  },
  color: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Label'
  },
  loading: {
    type: Boolean,
    default: false
  }

})
</script>

<style lang="scss" scoped>

</style>
