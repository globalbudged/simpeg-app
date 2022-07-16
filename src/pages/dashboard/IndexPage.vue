<template>
    <q-page class="bg-page q-pa-md">
        <div class="row q-col-gutter-md">
            <!-- card Pegawai -->
            <div class="col-md-6 col-xs-12">
                <div class="row q-col-gutter-md">
                    <div class="col-md-6 col-xs-12">
                        <q-card class="bg-indigo text-white q-mb-md">
                            <div class="q-pa-md">
                                <div class="column">
                                    <div class="flex items-center justify-between">
                                        <q-icon name="assignment_ind" size="60px" />
                                        <div>
                                            <div class="text-h4 text-weight-light">{{stillActive}}</div>
                                            <div class="f-12 text-weight-thin text-right">Pegawai</div>
                                        </div>
                                    </div>
                                    <q-separator class="bg-white q-my-md" />
                                    <div class="text-h5 text-weight-light">Pegawai Active</div>
                                    <div class="f-12">yang ada di lembaga ini</div>
                                </div>
                            </div>
                        </q-card>
                        <q-card class="bg-red text-white">
                            <div class="q-pa-md">
                                <div class="column">
                                    <div class="flex items-center justify-between">
                                        <q-icon name="people_alt" size="60px" />
                                        <div>
                                            <div class="text-h4 text-weight-light">{{lastOut}}</div>
                                            <div class="f-12 text-weight-thin text-right">Pegawai</div>
                                        </div>
                                    </div>
                                    <q-separator class="bg-white q-my-md" />
                                    <div class="text-h5 text-weight-light">Pegawai Keluar</div>
                                    <div class="f-12">tercatat di mutasi keluar</div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <q-card class="bg-dark text-white full-height">
                            <div class="column flex flex-center full-height q-pa-md">
                                <div class="text-h5 text-weight-light q-mb-lg">Percentage</div>
                                <div class="chart-from-apex">
                                    <apexchart :options="chartOptions" :series="series">
                                    </apexchart>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <q-card class="bg-info text-white">
                            <div class="q-pa-md">
                                <div class="column">
                                    <div class="flex items-center justify-between">
                                        <q-icon name="badge" size="60px" />
                                        <div>
                                            <div class="text-h4 text-weight-light">{{asn}}</div>
                                        </div>
                                    </div>
                                    <q-separator class="bg-white q-my-md" />
                                    <div class="text-h5 text-weight-light text-right">ASN</div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <q-card class="bg-orange text-white">
                            <div class="q-pa-md">
                                <div class="column">
                                    <div class="flex items-center justify-between">
                                        <q-icon name="account_circle" size="60px" />
                                        <div>
                                            <div class="text-h4 text-weight-light">{{nonasn}}</div>
                                        </div>
                                    </div>
                                    <q-separator class="bg-white q-my-md" />
                                    <div class="text-h5 text-weight-light text-right">NON ASN</div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                </div>
            </div>

            <!-- card log -->
            <div class="col-md-6 col-xs-12">
                <q-card>
                    <q-list bordered class="rounded-borders" separator>
                        <q-item-label header>Logs Applikasi</q-item-label>
                        <q-separator></q-separator>
                        <q-item v-for="(item, i) in logs" :key="i" clickable v-ripple>
                            <q-item-section avatar>
                                <q-avatar>
                                    <img src="~assets/images/actor.svg">
                                </q-avatar>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label lines="1">{{item.name}}</q-item-label>
                                <q-item-label caption lines="2">
                                    <span class="text-weight-bold"></span>
                                    -- {{item.activity}}
                                </q-item-label>
                            </q-item-section>

                            <q-item-section side>
                                <div class="f-10 text-grey text-italic">{{ item.log_at }}</div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'

const series = ref([44, 55])
const chartOptions = ref({
  chart: {
    width: 500,
    type: 'donut'
  },
  legend: {
    show: true,
    position: 'bottom',
    fontSize: '12px',
    labels: {
      colors: '#fff'
    }
  },
  colors: ['#3f51b5', '#f44336'],
  labels: ['Active', 'Keluar']
})

const stillActive = ref(0)
const lastOut = ref(0)
const asn = ref(0)
const nonasn = ref(0)
const logs = ref([])

onMounted(() => {
  getPegawai()
  getLogs()
})

async function getPegawai () {
  await api.get('/dashboard').then((resp) => {
    console.log(resp)
    stillActive.value = resp.data.total_active
    lastOut.value = resp.data.total_keluar
    asn.value = resp.data.asn
    nonasn.value = resp.data.honorer
    series.value = [stillActive.value, lastOut.value]
  })
}
async function getLogs () {
  await api.get('/logs_all').then((resp) => {
    console.log('resp', resp)
    logs.value = resp.data
  })
}

</script>

<style lang="scss" scoped>

</style>
