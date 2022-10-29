<script lang="ts" setup>
import { ErrorMessageModel } from '../models'

interface Props {
  errorMessage: ErrorMessageModel
  name: string
  label: string
  required?: boolean
  help?: string
}
const props = withDefaults(defineProps<Props>(), { required: false, help: '', fullWidth: false })
const isShowHelp = computed(() => {
  return props.help.length > 0
})
const isShowError = computed(() => {
  return props.errorMessage.hasError(props.name)
})
const error = computed(() => {
  return props.errorMessage.message(props.name)
})
</script>

<template>
  <div class="field" :class="{'is-error': isShowError}">
    <label class="label">{{ props.label }}</label>
    <div class="control">
      <slot />
      <p v-if="isShowError" class="help is-danger">
        {{ error }}
      </p>
      <span v-if="isShowHelp" class="help" v-html="props.help" />
    </div>
  </div>
</template>
