<template>
<q-select
    ref="refAuto"
    :options="optionx"
    :label="label"
    dense
    :filled="!outlined?filled:!filled"
    :outlined="outlined"
    hide-bottom-space
    no-error-icon
    @filter="filterFn"
    :input-debounce="0"
    emit-value
    map-options
    use-input
    :option-value="optionValue"
    :option-label="optionLabel"
    :disable="disable"
    :loading="loading"
    lazy-rules
    :rules="[anotherValid]"
    @new-value="createValue"
    clearable
    behavior="menu"
>
    <template v-slot:no-option>
    <q-item>
        <q-item-section class="text-grey">
        No results
        </q-item-section>
    </q-item>
    </template>
</q-select>
</template>

<script setup>
import { ref } from 'vue'
const emits = defineEmits(['onEnter'])
const props = defineProps({
  source: { type: Array, default: () => [] },
  label: { type: String, default: 'Label' },
  searchBy: { type: String, default: 'nama' },
  disable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  optionValue: { Array: String, default: 'name' },
  optionLabel: { Array: String, default: 'name' },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  valid: { type: Boolean, default: false }
})

const optionx = ref(props.source)
const refAuto = ref(null)

function filterFn (val, update) {
  update(() => {
    if (val === '') {
      optionx.value = props.source
    } else {
      const needle = val.toLowerCase()
      const arr = refAuto.value.autocomplete
      if (arr === '') {
        optionx.value = props.source.filter(v => v.toLowerCase().indexOf(needle) > -1)
      } else {
        const splits = arr.split('-')

        const multiFilter = (data = [], filterKeys = [], value = '') => data.filter((item) => filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key]))
        const filteredData = multiFilter(props.source, splits, needle)
        optionx.value = filteredData
      }
    }
  }
  // ref => {
  //   // console.log(ref)
  //   if (val !== '' && ref.options.length > 0) {
  //     ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
  //     ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
  //   }
  // }
  )
}

function createValue (val, done) {
  emits('onEnter', val)
  done(val)
}

function anotherValid (val) {
  if (props.valid) {
    return true
  }
  return (val !== null && val !== '') || 'Harap diisi'
}

</script>

<style lang="scss" scoped>

</style>
