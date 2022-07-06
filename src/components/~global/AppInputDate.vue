<template>
    <q-input
      ref="refInputDate"
      :dense="dense"
      :filled="!outlined?filled:!filled"
      :outlined="outlined"
      :label="label"
      :hide-bottom-space="true"
      no-error-icon
      lazy-rules
      :rules="[anotherValid]"
      :validator="validator"
      class="cursor-pointer"
      :autofocus="autofocus"
      :disable="disable"
      :readonly="readonly"
      @click="showDate"
      @focus="showDate"
      :model-value="modelProp"
        @update:model-value="closeDate()"
    >

      <template v-slot:append v-if="icon!==null">
          <q-icon :name="icon" size="18px" />
      </template>
      <template v-slot:prepend>
        <q-popup-proxy
            cover
            transition-show="scale"
            transition-hide="scale"
            ref="refPopup"
          >
          <!-- <q-menu v-model="showing"> -->
            <q-date
                mask="YYYY-MM-DD"
                today-btn
                @input="closeDate()"
                v-model="modelProp"
            >
                <div class="row items-center justify-end">
                <q-btn
                    @click="closeDate()"
                    label="Close"
                    color="primary"
                    flat
                />
                </div>
            </q-date>
        <!-- </q-menu> -->
        </q-popup-proxy>
      </template>
    </q-input>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
const emits = defineEmits(['showDate', 'setModel'])
const props = defineProps({
  icon: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: 'label'
  },
  model: {
    type: String,
    default: ''
  },
  mask: {
    type: String,
    default: '#.##'
  },
  fillMask: {
    type: String,
    default: '#'
  },
  validator: {
    type: String,
    default: null
  },
  valid: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  dense: { type: Boolean, default: true },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  reverseFillMask: { type: Boolean, default: false },
  errMessage: { type: String, default: 'error, data tidak valid' }
})

const modelProp = computed({
  get () { return props.model },
  set (val) { emits('setModel', val) }
})
// const modelProp = toRef(props, 'model')// react to ref
// watch(modelProp, (value) => {
//   props.model.value = modelProp.value // OK, textEnvoye is yours
// })

const refInputDate = ref(null)
const refPopup = ref(null)
// const showing = ref(false)
// const modelProxy = ref()

onMounted(() => {
//   console.log(refInputDate.value.modelValue)
  // modelProxy.value = refInputDate.value.modelValue
})

function anotherValid (val) {
  if (props.valid) {
    return true
  }
  return (val !== null && val !== '') || 'Harap diisi'
}

function closeDate () {
  refPopup.value.hide()
}
function showDate () {
  refPopup.value.show()
//   showing.value = true
}

// function coba (val) {
//   console.log(val)
// }
</script>

<style lang="scss" scoped>
.q-field--dense .q-field__bottom {
    display:none;
}

.q-field--error .q-field--highligted {
  background: none;
}
.q-field--standout.q-field--highlighted .q-field__control {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
    background: rgb(250, 173, 173);
}
</style>
