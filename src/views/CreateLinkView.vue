<script setup>
import { ref, watch } from 'vue';
import { createShortUrl } from '@/services/ShlinkApi';
import { useRouter } from 'vue-router';

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
const success = ref(false);

watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal };
}, { deep: true });

const handleSubmit = async () => {
  try {
    await createShortUrl(formData.value.longUrl, {
      title: formData.value.title || null,
      customSlug: formData.value.customSlug || null,
      slugLength: formData.value.customSlug ? null : formData.value.slugLength,
    });
    success.value = true;
    setTimeout(() => {
      router.push('/');
    }, 1200);
  } catch (error) {
    console.error('Erreur création lien :', error);
    alert("Erreur lors de la création de l'URL.");
  }
};
</script>

<template>
  <div class="flex justify-center mt-14 py-30">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-lg bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6 transition-all duration-300"
    >
      <h2 class="text-2xl font-bold text-center text-blue-600">Créer un lien raccourci </h2>

      <!-- URL longue -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1" for="longUrl">URL longue *</label>
        <input
          v-model="formData.longUrl"
          type="url"
          id="longUrl"
          required
          placeholder="https://exemple.com/page"
          class="w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <!-- Titre -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1" for="title">Titre (optionnel)</label>
        <input
          v-model="formData.title"
          type="text"
          id="title"
          placeholder="Titre du lien"
          class="w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <!-- Slug personnalisé -->
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1" for="customSlug">Slug personnalisé</label>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">https://shlink.nook.sh/</span>
          <input
            v-model="formData.customSlug"
            type="text"
            id="customSlug"
            pattern="[a-zA-Z0-9-]+"
            placeholder="ex: mon-lien"
            class="flex-1 px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <!-- Slug automatique -->
      <div v-if="!formData.customSlug">
        <label for="slugLength" class="block text-sm font-medium text-gray-600 mb-1">
          Longueur du slug : <strong>{{ formData.slugLength }}</strong>
        </label>
        <input
          v-model.number="formData.slugLength"
          type="range"
          id="slugLength"
          min="4"
          max="10"
          class="w-full accent-blue-600"
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition duration-200 shadow-sm"
      >
        Raccourcir l'URL
      </button>

      <!-- Succès -->
      <transition name="fade">
        <div
          v-if="success"
          class="text-green-600 text-sm text-center mt-2 animate-pulse"
        >
          ✅ Lien créé avec succès !
        </div>
      </transition>
    </form>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
