<script setup>
import ColorHash from 'color-hash'

const props = defineProps({
  tag: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['remove'])

const colorHash = new ColorHash()
const backgroundColor = colorHash.hex(props.tag)

const handleRemove = () => {
  emit('remove', props.tag)
}
</script>

<template>
  <span
    class=""
    :style="{ backgroundColor }"
    @click="handleRemove"
    title="Cliquer pour supprimer"
  >
    {{ tag }} ✕
  </span>
</template>
