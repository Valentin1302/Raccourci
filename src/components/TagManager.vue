<script setup>
import { ref, onMounted } from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import ColorHash from 'color-hash'
import { getTags, updateShortUrlTags } from '@/services/ShlinkApi'

const props = defineProps({
  shortCode: String,
  currentTags: Array
})

const emit = defineEmits(['updated'])

const allTags = ref([])
const selectedTags = ref([...props.currentTags])

const colorHash = new ColorHash()
const getTagColor = (tag) => colorHash.hex(tag)

const removeTag = (tagToRemove) => {
  selectedTags.value = selectedTags.value.filter(tag => tag !== tagToRemove)
}

const updateTags = async () => {
  try {
    await updateShortUrlTags(props.shortCode, selectedTags.value)
    emit('updated')
    alert('Tags sauvegardés')
  } catch (e) {
    alert('Erreur lors de la sauvegarde')
    console.error(e)
  }
}

onMounted(async () => {
  try {
    const response = await getTags(1, 50)
    allTags.value = response.tags?.data || []
  } catch (e) {
    allTags.value = []
    console.error('Erreur chargement tags', e)
  }
})
</script>

<template>
  <div class="tag-manager my-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">Ajouter des tags</label>

    <v-select
      :options="allTags"
      v-model="selectedTags"
      multiple
      :reduce="tag => tag"
      label="name"
      placeholder="Sélectionner des tags"
    />

    <div class="flex flex-wrap gap-2 mt-3">
      <span
        v-for="tag in selectedTags"
        :key="tag"
        class="text-white text-sm px-3 py-1 rounded-full cursor-pointer select-none"
        :style="{ backgroundColor: getTagColor(tag) }"
        @click="removeTag(tag)"
        title="Cliquer pour supprimer"
      >
        {{ tag }} ✕
      </span>
    </div>

    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      @click="updateTags"
    >
      Sauvegarder
    </button>
  </div>
</template>