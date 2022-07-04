<template>
    <div class="adm-drawer__header" >
        <div class="flex column flex-center">
        <q-avatar size="60px">
            <img src="images/user-avatar.svg">
        </q-avatar>
        <div class="text-caption2 q-mt-sm">Nama User</div>
        <div class="f-10">Nama User</div>
        <div class="q-my-sm flex items-center justify-around">
            <q-btn size="sm" flat round icon="admin_panel_settings">
                <q-tooltip class="primary" :offset="[10, 10]">
                    Settings
                </q-tooltip>
            </q-btn>
            <q-btn size="sm" flat round icon="account_circle">
                <q-tooltip class="primary" :offset="[10, 10]">
                    Profile
                </q-tooltip>
            </q-btn>
            <q-btn size="sm" flat round icon="exit_to_app">
                <q-tooltip class="primary" :offset="[10, 10]">
                    Logout
                </q-tooltip>
            </q-btn>
        </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
