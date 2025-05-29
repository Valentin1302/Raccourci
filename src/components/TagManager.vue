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
  <div class="space-y-4 m-">
    <!-- Sélecteur de tags -->
    <div>
      <v-select
        :options="allTags"
        v-model="selectedTags"
        multiple
        :reduce="tag => tag"
        label="name"
        placeholder="Ajouter des tags"
        class="text-sm"
      />
    </div>

    <!-- Tags sélectionnés -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in selectedTags"
        :key="tag"
        class="text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm"
        :style="{ backgroundColor: getTagColor(tag) }"
      >
        {{ tag }}
        <button
          @click="removeTag(tag)"
          class="ml-1 text-white text-xs hover:opacity-70"
        >
          ✕
        </button>
      </span>
    </div>

    <!-- Bouton de sauvegarde -->
    <div>
      <button
        @click="updateTags"
        class="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Sauvegarder les tags
      </button>
    </div>
  </div>
</template>
