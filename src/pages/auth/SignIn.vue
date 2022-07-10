<template>
    <q-page class="page__login flex column flex-center bg-white">
        <div class="box__login bg-grey-2 shadow-4">
            <div class="relative-position">
                <div class="q-pa-lg">
                    <div class="text-h3 text-bold text-white">SIMPEG</div>
                    <div class="text-caption text-white">Sistem Informasi Management</div>
                    <div class="text-caption text-white mt--5"> Kepegawaian</div>

                    <!-- box login -->
                    <div class="box__form bg-white q-mt-lg q-pa-md">
                        <!-- text header -->
                        <div class="flex items-center q-mb-md">
                            <q-avatar
                                size="lg"
                                color="primary"
                                text-color="white"
                                icon="lock"
                            />
                            <div class="q-ml-md text-h6">Selamat Datang
                                <div class="text-caption mt--5">Silahkan Anda Login terlebih dahulu</div>
                            </div>
                        </div>
                        <q-separator />
                        <!-- login form -->
                        <q-form
                            ref="myForm"
                            @submit="onSubmit"
                        >
                            <div class="q-col-gutter-xs q-my-lg">
                                <app-input
                                    v-model="form.email"
                                    label="email"
                                    validator="email"
                                    icon="email"
                                />
                                <app-input v-model="form.password" icon="key" label="password" type="password"/>
                            </div>
                            <!-- button login -->
                            <!-- <q-separator /> -->
                            <div class="q-my-lg">
                                <div class="flex items-center justify-between">
                                    <div class="">
                                        <app-btn color="primary" :loading="storeAuth.loading" label="Login" />
                                    </div>
                                    <div class="anchor__me">
                                        <div class="f-14 text-bold" >Lupa Password?</div>
                                    </div>
                                </div>
                            </div>
                            <!-- keterangan -->

                        </q-form>
                        <q-separator />
                        <div class="q-my-md">
                            <div class="text-grey-8">
                                Aplikasi SIMPEG Sistem Informasi Kepegawaian ini
                                tidak di perjualbelikan secara bebas tanpa seizin dari pembuatnya.
                            </div>
                            <div class="q-mt-lg text-right f-14 text-grey-8">
                                SIMPEG Versi 1.0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
// import
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
// import { useRouter } from 'vue-router'

// const
const storeAuth = useAuthStore()
const $q = useQuasar()
// const router = useRouter()
const myForm = ref(null)
const form = ref({
  email: 'fdgf@dsg.ghf',
  password: '4363463',
  device_name: $q.platform.is.name + '-' + $q.platform.is.platform
})
// const loading = computed(() => st.state.loading)
// methods
onMounted(() => {
//   console.log(storeAuth)
})

function onSubmit () {
  storeAuth.login(form.value)
}

</script>

<style lang="scss" scoped>
.box__login {
    width:350px;
    min-height:500px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    &::before {
        content: "";
        width:300px;
        height:300px;
        background-color: $primary;
        background-color: $primary;
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(-45deg, $secondary, $primary);
        top: -26%;
        left: -13%;
        overflow: hidden;
    }
}
.anchor__me {
    cursor: pointer;
    color:$primary;
    &:hover {
        text-decoration: underline;
    }
}

@media(max-width:800px){
    .box__login {
        width: 100vw;
        height:100vh;
        border-radius: 0px;
        &::before {
            top: -22%;
            left: -13%;
        }

        .box__form {
            margin-top:50px;
            border-radius:10px;
        }
    }
}
</style>
