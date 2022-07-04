<template>
    <q-drawer
        side="right"
        show-if-above
        overlay
        bordered
        behavior="mobile"
        :width="300"
        class="adm-drawer__right"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
