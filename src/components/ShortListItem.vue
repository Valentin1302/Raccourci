<script setup>
import { defineProps, defineEmits} from 'vue';
import { deleteShortUrl } from '@/services/ShlinkApi';
const props = defineProps({
  link: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['delete'])

const handleClick = (e) => {
  e.preventDefault();
  window.open(props.link.shortUrl, '_blank'); 
};

const copyLink = () => {
  navigator.clipboard.writeText(props.link.shortUrl);
  alert('Lien copié !');
};

const handleDelete = () => {
  emit('delete', props.link.shortCode);
};
</script>

<template>
  <li class="link-item">
    <div class="link-content">
      <a :href="link.shortUrl" @click="handleClick">{{ link.shortUrl }}</a>
      <p class="long-url">{{ link.longUrl }}</p>
      <div v-if="link.title" class="link-title">{{ link.title }}</div>
      <div class="link-meta">
        <span class="link-date">
          Créé le {{ new Date(link.dateCreated).toLocaleDateString() }}
        </span>
        <span>
          {{ link.visitsCount }} clic{{ link.visitsCount > 1 ? 's' : '' }}
        </span>
        <button @click="copyLink">Copier</button>
      </div>
    </div>
  </li>
  <router-link
      :to="`/visits/${link.shortCode}`"
      class="ml-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
    >
      Voir stats
    </router-link>
    <button 
      @click="handleDelete" 
      class="text-red-600 hover:underline"
      >
      Supprimer
    </button>
</template>

<style scoped>
</style>
