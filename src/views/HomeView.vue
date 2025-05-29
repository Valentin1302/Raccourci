<script setup>
import { ref, onMounted, watch } from 'vue';
import ShortListItem from '../components/ShortListItem.vue';
import TagManager from '../components/TagManager.vue';
import PaginationControls from '../components/PaginationControls.vue';
import { getShortUrls, deleteShortUrl } from '../services/ShlinkApi';

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
    <ul>
      <li v-for="link in shortLinks" :key="link.shortCode">
        <ShortListItem
          :link="link"
          :fetchLinks="fetchLinks"
          @delete="handleDelete"
          @updated="handleUpdated"
        />
        <TagManager
          :short-code="link.shortCode"
          :current-tags="link.tags"
          @updated="fetchLinks"
        />
      </li>
    </ul>

    <PaginationControls
      :current-page="currentPage"
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      @page-changed="currentPage = $event"
    />
  </div>
</template>
