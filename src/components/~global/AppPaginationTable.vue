<template>
  <div class="row items-center f-12">
      <q-btn :disable="props.meta.current_page===1" flat round color="primary" icon="skip_previous" size="sm" @click="emits('first')"/>
      <q-btn :disable="meta.current_page === 1" flat round color="primary" icon="chevron_left" size="sm" @click="emits('prev')"/>
      <div class="bold q-pa-xs">{{meta.current_page}} / {{meta.last_page}}</div>
      <q-btn :disable="meta.current_page === meta.last_page" flat round color="primary" icon="chevron_right" size="sm" @click="emits('next')"/>
      <q-btn :disable="meta.current_page === meta.last_page" flat round color="primary" icon="skip_next" size="sm" @click="emits('last')"/>
  </div>
</template>

<script setup>

const props = defineProps(['meta'])
const emits = defineEmits(['next', 'first', 'prev', 'last'])

</script>

<style lang="scss" scoped>
.table__control {
  display: flex;
  align-items: center;
  font-size: 12px !important;
}
</style>
