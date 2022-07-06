<template>
  <q-header class="adm-header" bordered>
    <div class="adm-header__toolbar flex items-center justify-between">
      <!-- sisi kiri -->
      <div class="flex ">
        <div class="btn--header flex flex-center" @click="emits('openLeft')">
          <q-icon name="segment" class="flip__icon" />
        </div>
      </div>
      <!-- sisi kanan -->
      <div class="flex">
        <!-- tombol fullscreen -->
        <div class="btn--header flex flex-center" @click="$q.fullscreen.toggle()">
          <q-icon :name="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
        </div>
        <!-- notif -->
        <div class="btn--header flex flex-center">
          <div class="relative-position">
            <q-icon name="notifications_none"></q-icon>
            <div class="my_badge flex flex-center">
              20
            </div>
          </div>
        </div>
        <!-- tempat user -->
        <div class="btn--header flex items-center q-pa-sm">
          <q-menu
            transition-show="slide-down"
            transition-hide="slide-up"
            :offset="[0,-2]"
            class="q-pt-sm"
          >
              <q-list style="min-width: 131px">
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="account_circle" size="16px" />
                  </q-item-section>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="settings" size="16px" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="storeAuth.logout">
                  <q-item-section avatar >
                    <q-icon name="exit_to_app" size="16px" />
                  </q-item-section>
                  <q-item-section>Logout </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          <div class="q-mx-sm f-14 text-bold">{{user? user.name: 'Administrator'}}
          </div>
          <q-avatar size="30px">
            <img :src="imgSrc">
          </q-avatar>
        </div>
        <!-- tombol drawer kanan -->
        <div class="btn--header flex flex-center" @click="emits('openRight')">
          <q-icon name="segment" />
        </div>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
const emits = defineEmits(['openLeft', 'openRight'])

const storeAuth = useAuthStore()
const user = computed(() => storeAuth.user)
// ~assets/images/user-avatar.svg ditaruh langsung di html
const imgSrc = ref('/src/assets/images/user-avatar.svg')

</script>

<style lang="scss" scoped>
.flip__icon {
  transform: scaleX(-1);
}

.my_badge {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color:#fff !important;
  background: $negative;
  top:0px;
  right: -5px;
  font-size: 8px;
}

</style>
