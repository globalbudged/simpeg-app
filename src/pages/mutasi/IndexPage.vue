<template>
    <q-page>
        <router-view v-slot="{ Component }">
            <transition
                appear
                enter-active-class="animated slideInDown "
                leave-active-class="animated slideOutUp "
            >
                <keep-alive>
                <component :is="Component"/>
            </keep-alive>
            </transition>
        </router-view>

    </q-page>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
