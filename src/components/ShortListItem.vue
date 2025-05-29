<script setup>
import { ref } from 'vue';
import { updateShortUrl, updateShortUrlTags } from '@/services/ShlinkApi';

const props = defineProps({
  link: { type: Object, required: true },
  fetchLinks: { type: Function, required: true }
});

const emit = defineEmits(['updated', 'delete']);

const isEditing = ref(false);
const updatedLongUrl = ref(props.link.longUrl);
const updatedTitle = ref(props.link.title);

const handleClick = (e) => {
  e.preventDefault();
  window.open(props.link.shortUrl, '_blank');
};

const copyLink = () => {
  navigator.clipboard.writeText(props.link.shortUrl);
  alert('Lien copié !');
};

const handleEdit = async () => {
  try {
    await updateShortUrl(props.link.shortCode, {
      longUrl: updatedLongUrl.value,
      title: updatedTitle.value,
    });

    emit('updated', {
      ...props.link,
      longUrl: updatedLongUrl.value,
      title: updatedTitle.value,
    });

    isEditing.value = false;
  } catch (error) {
    console.error('Erreur mise à jour:', error);
    alert('Échec de la mise à jour');
  }
};

const handleDelete = () => {
  emit('delete', props.link.shortCode);
};

const removeTag = async (tagToRemove) => {
  const updatedTags = props.link.tags.filter(tag => tag !== tagToRemove);
  try {
    await updateShortUrlTags(props.link.shortCode, updatedTags);
    emit('updated', { ...props.link, tags: updatedTags });
  } catch (e) {
    console.error('Erreur suppression du tag', e);
    alert('Échec suppression tag');
  }
};
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <!-- Titre & Actions -->
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-semibold text-base text-gray-800 truncate max-w-[70%]">
        {{ props.link.title || 'Sans titre' }}
      </h3>
      <div class="flex items-center space-x-3 text-gray-400 text-sm">
        <button @click="copyLink" class="hover:text-gray-800" title="Copier">📋</button>
        <button @click="() => (isEditing = !isEditing)" class="hover:text-blue-600" title="Modifier">✏️</button>
        <button @click="handleDelete" class="hover:text-red-500" title="Supprimer">🗑️</button>
      </div>
    </div>

    <!-- Lien court -->
    <div
      class="text-sm text-blue-600 hover:underline cursor-pointer break-all mb-2"
      @click="handleClick"
    >
      {{ props.link.shortUrl }}
    </div>

    <!-- Formulaire d'édition -->
    <div v-if="isEditing" class="space-y-2">
      <input
        v-model="updatedTitle"
        placeholder="Titre"
        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
      />
      <input
        v-model="updatedLongUrl"
        placeholder="URL longue"
        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
      />
      <div class="flex gap-2">
        <button @click="handleEdit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
          Sauvegarder
        </button>
        <button @click="isEditing = false" class="text-sm text-gray-500 hover:underline">Annuler</button>
      </div>
    </div>

    <!-- Lien long (readonly) -->
    <p v-else class="text-sm text-gray-600 break-all mb-3">{{ props.link.longUrl }}</p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mb-2">
      <span
        v-for="tag in props.link.tags"
        :key="tag"
        class="bg-gray-100 border border-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
      >
        {{ tag }}
        <button @click="removeTag(tag)" class="text-gray-400 hover:text-red-500">×</button>
      </span>
    </div>

    <!-- Meta -->
    <div class="flex justify-between items-center text-xs text-gray-400 mt-2">
      <span>Créé le {{ new Date(props.link.dateCreated).toLocaleDateString() }}</span>
      <router-link
        :to="`/visits/${props.link.shortCode}`"
        class="ml-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs"
      >
        📈 Voir stats
      </router-link>
    </div>
  </div>
</template>
