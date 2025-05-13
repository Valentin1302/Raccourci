<script setup>
import { ref, onMounted, watch } from 'vue';
import ShortUrlForm from '../components/ShortUrlForm.vue';
import ShortLinkList from '../components/ShortLinkList.vue';
import PaginationControls from '../components/PaginationControls.vue';
import { createShortUrl, getShortUrls, deleteShortUrl} from '../services/ShlinkApi';

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
  const response = await createShortUrl(data.longUrl, {
      title: data.title,
      customSlug: data.customSlug,
      slugLength: data.slugLength
    });

    const result = {
      id: Date.now(),
      shortUrl: response.shortUrl,  
      longUrl: data.longUrl,
      title: data.title,
      createdAt: new Date().toISOString()
    };
    await fetchLinks(); 
  } catch (error) {
    console.error('Erreur création lien :', error);
    alert("Échec de création de l'URL. Vérifie que l'URL est correcte et que le slug n’est pas déjà pris.");
  }
};
const handleDelete = (shortCode) => {
  deleteShortUrl(shortCode)
    .then(() => {
      fetchLinks()  
    })
    .catch((err) => {
      console.error('Erreur lors de la suppression:', err)  
    })
}

</script>


<template>
  <div class="home-view">
    <h1>Raccourcisseur d'URL</h1>
    <ShortUrlForm @submit="handleSubmit" />
    <ShortLinkList :links="shortLinks" @delete="handleDelete" />
    <PaginationControls
      :current-page="currentPage"
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      @page-changed="currentPage = $event"
    />
  </div>
</template>
