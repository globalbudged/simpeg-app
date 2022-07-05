<template>
    <q-dialog position="right" class="app-dialog" >
        <q-card style="min-width:350px; max-width: 90vw;">
            <q-card-section>
                <div class="f-16 text-bold">Form Input</div>
            </q-card-section>
                <q-separator />
            <q-form ref="refForm" @submit="$emit('onSubmit')" @reset="onReset">
                <q-card-section>
                    <slot />
                </q-card-section>
                <q-separator />
                <q-card-actions>
                    <app-btn :loading="loading" label="Simpan" type="submit" color="primary" />
                    <app-btn label="Reset" type="reset" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, defineProps } from 'vue'

defineEmits(['onSubmit'])

defineProps({
  loading: { type: Boolean, default: false }
})

const refForm = ref(null)
function onReset () {
  refForm.value.resetValidation()
}
</script>

<style lang="scss" scoped>

</style>
