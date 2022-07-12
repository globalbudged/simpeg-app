<template>
<q-select
    ref="refAutoComplete"
    dense
    lazy-rules
    hide-bottom-space
    no-error-icon
    emit-value
    map-options
    use-input
    clearable
    behavior="menu"
    :options="filterredOptions"
    :label="label"
    :filled="!outlined?filled:!filled"
    :outlined="outlined"
    :input-debounce="0"
    :option-value="optionValue"
    :option-label="optionLabel"
    :disable="disable"
    :loading="loading"
    @filter="filterFn"
    :rules="[anotherValid]"
    @new-value="createValue"

>
    <template v-slot:no-option>
        <q-item>
            <q-item-section class="text-grey">
            Data tidak ditemukan
            </q-item-section>
        </q-item>
    </template>
</q-select>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'

const emits = defineEmits(['onEnter'])

const props = defineProps({
  label: { type: String, default: 'Label' },
  endpoint: { type: String, default: '' },
  searchBy: { type: String, default: 'nama' },
  disable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  optionValue: { Array: String, default: 'name' },
  optionLabel: { Array: String, default: 'name' },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  valid: { type: Boolean, default: false }
})

const options = ref(null)
const refAutoComplete = ref(null)

async function fetchData () {
  const response = await api.get(`${props.endpoint}`)
  const data = response.data.result
  options.value = data
}

fetchData()
const filterredOptions = ref([])

async function filterFn (val, update) {
  update(() => {
    if (val === '') {
      filterredOptions.value = options.value
    } else {
      const needle = val.toLowerCase()
      const arr = refAutoComplete.value.autocomplete
      if (arr === '') {
        filterredOptions.value = options.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
      } else {
        const splits = arr.split('-')

        const multiFilter = (data = [], filterKeys = [], value = '') => data.filter((item) => filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key]))
        const filteredData = multiFilter(filterredOptions.value, splits, needle)
        filterredOptions.value = filteredData
      }
    }
  },
  ref => {
    // console.log(ref)
    if (val !== '' && ref.options.length > 0) {
      ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
      ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
    }
  }
  )
}

function createValue (val, done) {
  const result = new Promise((resolve) => emits('onEnter', val, resolve))

  result.then((resp) => {
    fetchData()
    done(resp, 'add-unique')
  })
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
