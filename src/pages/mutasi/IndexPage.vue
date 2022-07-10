<template>
    <q-page>
        <router-view v-slot="{ Component }">
            <transition
                appear
                enter-active-class="animated slideInDown "
                leave-active-class="animated slideOutUp "
            >
                <keep-alive>
                <component
                @pageActivated="hasActiveChildPage = true"
                @pageDeactivated="hasActiveChildPage = false"
                :is="Component"/>
            </keep-alive>
            </transition>
        </router-view>

    </q-page>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from 'vue'
const emit = defineEmits(['pageActivated', 'pageDeactivated'])

const hasActiveChildPage = ref(false)

onActivated(() => {
  // console.log("activated");
  emit('pageActivated')
})
onDeactivated(() => {
  // console.log("deactivated");
  emit('pageDeactivated')
})
</script>

<style lang="scss" scoped>

</style>
