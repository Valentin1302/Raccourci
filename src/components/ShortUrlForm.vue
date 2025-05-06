<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      longUrl: '',
      title: '',
      customSlug: '',
      slugLength: 6
    })
  }
});

const emit = defineEmits(['submit']);
const formData = ref({ ...props.initialData });

watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal };
}, { deep: true });

const handleSubmit = () => {
  emit('submit', {
    longUrl: formData.value.longUrl,
    title: formData.value.title || null,
    customSlug: formData.value.customSlug || null,
    slugLength: formData.value.customSlug ? null : formData.value.slugLength
  });
};
</script>

<template>
  <form class="url-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="longUrl">URL longue *</label>
      <input v-model="formData.longUrl" type="url" id="longUrl" required />
    </div>

    <div class="form-group">
      <label for="title">Titre (optionnel)</label>
      <input v-model="formData.title" type="text" id="title" />
    </div>

    <div class="form-group">
      <label for="customSlug">Slug personnalisé (optionnel)</label>
      <div class="slug-input">
        <span class="slug-prefix">https://shlink.nook.sh/</span>
        <input
          v-model="formData.customSlug"
          type="text"
          id="customSlug"
          pattern="[a-zA-Z0-9-]+"
        />
      </div>
    </div>

    <div v-if="!formData.customSlug" class="form-group">
      <label for="slugLength">Longueur du slug : {{ formData.slugLength }}</label>
      <input
        v-model.number="formData.slugLength"
        type="range"
        id="slugLength"
        min="4"
        max="10"
      />
    </div>

    <button type="submit">Raccourcir</button>
  </form>
</template>
