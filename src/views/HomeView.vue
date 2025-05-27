<script setup>
import { ref, onMounted, watch } from 'vue';
import ShortUrlForm from '../components/ShortUrlForm.vue';
import ShortLinkList from '../components/ShortLinkList.vue';
import PaginationControls from '../components/PaginationControls.vue';
import { createShortUrl, getShortUrls, deleteShortUrl } from '../services/ShlinkApi';

const shortLinks = ref([]);
const currentPage = ref(1);
const totalItems = ref(0);
const itemsPerPage = 10;

const fetchLinks = async () => {
  try {
    const data = await getShortUrls(currentPage.value, itemsPerPage);
    shortLinks.value = data.shortUrls.data;
    totalItems.value = data.shortUrls.pagination.totalItems;
  } catch (error) {
    console.error('Erreur chargement liens :', error);
  }
};

onMounted(fetchLinks);
watch(currentPage, fetchLinks);

const handleSubmit = async (data) => {
  try {
    await createShortUrl(data.longUrl, {
      title: data.title,
      customSlug: data.customSlug,
      slugLength: data.slugLength,
      tags: ['dev', 'test', 'vue', 'react'],
    });
    await fetchLinks();
  } catch (error) {
    console.error('Erreur création lien :', error);
    alert("Échec de création de l'URL.");
  }
};

const handleDelete = async (shortCode) => {
  try {
    await deleteShortUrl(shortCode);
    await fetchLinks();
  } catch (err) {
    console.error('Erreur suppression :', err);
  }
};

const handleUpdated = (updatedLink) => {
  const index = shortLinks.value.findIndex(l => l.shortCode === updatedLink.shortCode);
  if (index !== -1) {
    shortLinks.value[index] = updatedLink;
  }
};
</script>

<template>
  <div class="home-view">
    <h1>Raccourcisseur d'URL</h1>
    <ShortUrlForm @submit="handleSubmit" />
    <ShortLinkList
      :links="shortLinks"
      :fetchLinks="fetchLinks"
      @delete="handleDelete"
      @updated="handleUpdated"
    />
    <PaginationControls
      :current-page="currentPage"
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      @page-changed="currentPage = $event"
    />
  </div>
</template>
