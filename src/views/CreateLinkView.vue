<script setup>
import { ref, watch } from 'vue';
import { createShortUrl } from '@/services/ShlinkApi'
import { useRouter } from 'vue-router'

const router = useRouter();

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

const handleSubmit = async () => {
  try {
    await createShortUrl(formData.value.longUrl, {
      title: formData.value.title || null,
      customSlug: formData.value.customSlug || null,
      slugLength: formData.value.customSlug ? null : formData.value.slugLength,
    })
    router.push('/') // ici aussi
  } catch (error) {
    console.error('Erreur création lien :', error)
    alert("Erreur lors de la création de l'URL.")
  }
}

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
        <inpu
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
