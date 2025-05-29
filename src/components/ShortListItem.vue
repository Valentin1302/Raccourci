<script setup>
import { ref } from 'vue';
import { updateShortUrlTags, updateShortUrl} from '@/services/ShlinkApi';

const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
    fetchLinks: {
    type: Function,
    required: true,
  },
});
const emit = defineEmits(['updated', 'delete']);

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
</script>

<template>
  <li class="link-item">
    <div class="link-content">
      <a v-if="!isEditing" :href="link.shortUrl" @click="handleClick">{{ link.shortUrl }}</a>
      <div v-if="isEditing">
        <input type="text" v-model="updatedLongUrl" />
        <input type="text" v-model="updatedTitle" />
        <button @click="handleEdit">Sauvegarder</button>
        <button @click="isEditing = false">Annuler</button>
      </div>

      <p v-else>{{ link.longUrl }}</p>
      <div v-if="link.title">{{ link.title }}</div>

      <div class="link-meta">
        <span>Créé le {{ new Date(link.dateCreated).toLocaleDateString() }}</span>
        <button @click="copyLink">Copier</button>
      </div>
    </div>
    <router-link :to="`/visits/${link.shortCode}`" class="ml-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">
      Voir stats
    </router-link>
    <button @click="handleDelete" class="text-blue-600 hover:underline">Supprimer</button>
    <button @click="isEditing = true" class="text-red-600 hover:underline">Modifier</button>
    <TagBadge
    v-for="tag in link.tags"
    :key="tag"
    :tag="tag"
    @remove="removeTag"
    />
  </li>
</template>

<style scoped></style>
