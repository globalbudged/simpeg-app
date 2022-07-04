<template>
    <div class="q-pa-md full-height">
        <div class="flex items-center justify-between">
            <div>
                <div class="text-h4 mini-spacing">{{props.title}}</div>
                <div class="text-caption2">{{caption}}</div>
            </div>
            <div>
                <!-- <q-btn flat round icon="open_in_full" @click="emits('wider')" >
                    <q-tooltip class="primary" :offset="[10, 10]">
                        Melebar
                    </q-tooltip>
                </q-btn> -->
            </div>
        </div>

        <div class="q-mt-lg">
            <q-card class="my-card" flat bordered>
                <q-card-section horizontal>
                    <q-card-section class="bg-grey-1" style="width:50%;">
                        <q-form ref="myForm" @submit="onSubmit" @reset="onReset" class="q-pa-sm">
                            <div class="text-h5 q-mb-lg mini-spacing">Form Input</div>
                            <q-separator></q-separator>
                            <slot name="form"></slot>
                            <div class="q-mt-lg">
                                <app-btn :loading="loading" type="submit" color="primary" label="Selesai & Simpan" />
                                <app-btn :loading="loading" type="reset"  label="Reset" />
                            </div>
                        </q-form>
                    </q-card-section>

                    <q-separator vertical />

                        <div style="width: 100%; height: 100%;" >
                        <div class="q-pa-sm flex items-center justify-between">
                            <div class="title--list text-subtitle2">{{titleList}}</div>
                                <q-btn flat round icon="sort" :class="sort==='asc'?'':'rotate'" @click="emits('sort')" >
                                    <q-tooltip class="primary" :offset="[10, 10]">
                                        {{sort?'Urutkan Ke Atas':'Urutkan ke bawah'}}
                                    </q-tooltip>
                                </q-btn>
                        </div>

                            <q-separator />
                            <q-scroll-area
                                style="height: 370px;"
                                ref="scrollArea"
                                @scroll="onScroll"
                                off
                            >
                                <div v-if="items.length>0" class="bg-grey-2" style="height:350px;">
                                    <q-list  bordered separator class="rounded-borders bg-white" >
                                        <!-- <q-item v-if="loading">
                                            <q-item-section avatar>
                                                <q-skeleton type="QAvatar" size="40px" />
                                            </q-item-section>

                                            <q-item-section>
                                                <q-item-label>
                                                <q-skeleton type="text" />
                                                </q-item-label>
                                                <q-item-label caption>
                                                <q-skeleton type="text" width="65%" />
                                                </q-item-label>
                                            </q-item-section>
                                            <q-item-section side>
                                                <q-skeleton type="QAvatar" size="20px" />
                                            </q-item-section>
                                        </q-item> -->
                                        <!-- <transition-group tag="div"
                                            appear
                                            enter-active-class="animated fadeIn"
                                            leave-active-class="animated fadeOut"
                                        > -->
                                        <q-item v-for="(item, i) in props.mores" :key="i+'item'" >
                                        <!-- icon -->
                                            <q-item-section avatar class="q-ml-sm q-mr-md">
                                                <q-skeleton v-if="loading" type="QAvatar" size="40px" />
                                                <q-avatar v-else :color="iconcolor" text-color="white">
                                                    <slot name="letter-icon" :row="item"></slot>
                                                </q-avatar>
                                            </q-item-section>

                                            <q-item-section>
                                                <q-item-label class="text-bold">
                                                    <q-skeleton v-if="loading" type="text" />
                                                    <div v-else><slot name="nama" :row="item"></slot></div>
                                                </q-item-label>
                                                <q-item-label caption lines="1" style="margin-top: 0px;">
                                                    <q-skeleton v-if="loading" type="text" />
                                                    <slot v-else name="caption-nama" :row="item"></slot>
                                                </q-item-label>
                                            </q-item-section>

                                            <q-item-section side>
                                                <q-item-label>

                                                    <q-skeleton v-if="loading" type="text" />
                                                    <div v-else class="text-grey">
                                                        {{date.formatDate(item.created_at, 'DD MMMM, YYYY')}} pukul: <span class="text-italic">{{date.formatDate(item.created_at, 'hh:mm A')}}</span>
                                                    </div>
                                                </q-item-label>
                                            </q-item-section>

                                            <q-item-section side>
                                                <div class="flex items-center q-gutter-sm">
                                                    <q-icon v-if="!loading" class="gt-xs cursor-pointer" size="18px" name="edit" @click="emits('edit', item)" />
                                                    <q-skeleton v-else type="QAvatar" size="18px" />
                                                    <q-icon v-if="!loading" class="gt-xs cursor-pointer" size="18px" name="delete" @click="del(item.id)" />
                                                    <q-skeleton v-else type="QAvatar" size="18px" />
                                                </div>

                                            </q-item-section>
                                        </q-item>
                                        <!-- </transition-group> -->
                                    </q-list>
                                    <div v-if="loadingMore" class="fixed-bottom q-pa-lg flex flex-center" >
                                            <q-spinner
                                                color="primary"
                                                size="40px"
                                                :thickness="5"
                                            />
                                        </div>
                                </div>
                                <div v-else class="flex column flex-center bg-grey-3" style="height:350px;">
                                    <q-icon name="sentiment_dissatisfied" size="40px" color="grey"/>
                                    <div class="text-grey">tidak ada data</div>
                                </div>
                            </q-scroll-area>
                        </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { date } from 'quasar'
import { watch, ref } from 'vue'

// const ======================================
const emits = defineEmits(['submit', 'reset', 'delete', 'edit', 'getMore', 'sort'])
const props = defineProps({
  title: {
    type: String,
    default: 'Judul'
  },
  titleList: {
    type: String,
    default: 'List Data'
  },
  caption: {
    type: String,
    default: 'Caption Judul'
  },
  iconcolor: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingMore: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => []
  },
  mores: {
    type: Array,
    default: () => []
  },
  meta: {
    type: Object,
    default: () => {}
  },
  sort: {
    type: String
  }
})

const myForm = ref(null)
const scrollArea = ref(null)

function onSubmit () {
  myForm.value.resetValidation()
  scrollArea.value.setScrollPosition('vertical', [0, 500])
  emits('submit')
}
function onReset () {
  myForm.value.resetValidation()
  scrollArea.value.setScrollPosition('vertical', [0, 500])
  emits('reset')
}
watch(() => props.items, (first) => {

})

function onScroll (pos) {
  const stop = props.meta.next_page_url === null || props.meta.total === props.mores.length
  const area = scrollArea.value
  const scrollTarget = area.getScrollTarget()
  const height = scrollTarget.scrollHeight
  const scrollMoveToBot = pos.verticalPosition + pos.verticalSize

  const isNext = scrollMoveToBot === height
  if (pos.verticalPosition === 0) return
  if (props.meta === {}) return
  if (!isNext) return
  if (isNext) {
    if (!stop) {
      emits('getMore')
    }
    console.log('next', isNext)
  }
}

function del (id) {
  emits('delete', id)
}
</script>

<style lang="scss" scoped>
.mini-spacing {
    letter-spacing: -2px;
}
.rotate {
    transform:  rotate(180deg);
}
// .q-item {
//     border-bottom: 1px #aaaaaa6b solid;
// }

// /** LIST TRANSITION */
// .list-enter-from {
//     opacity:0;
//     transform: scale(0.6);
//     // transform: translateX(100px);
// }
// .list-enter-to{
//     opacity: 1;
//     transform: scale(0);
//     // transform: translateX(0)
// }
// .list-enter-active{
//     opacity: all .4s ease;
// }

// .list-leave-from{
//     opacity:0;
//     transform: scale(0.6);
// }
// .list-leave-to{
//     opacity: 1;
//     transform: scale(0);
// }
// .list-leave-active{
//     opacity: all .4s ease;
// }
</style>
