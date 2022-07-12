<template>
    <div class="flex column flex-center" style="min-height:500px">
        <div>MUTASI KELUAR BELUM PUNYA HALAMAN</div>
        <div>Progress Hello World</div>
        <app-btn color="dark" label="kembali ke mutasi" @click="router.push('/mutasi')" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>

</style>
