<script setup>
import { ref } from 'vue';
import ShortUrlForm from '../components/ShortUrlForm.vue';
import ShortLinkList from '../components/ShortLinkList.vue';
import { createShortUrl } from '../services/ShlinkApi';

const shortLinks = ref([]);

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

    shortLinks.value.unshift(result);
  } catch (error) {
    console.error('Erreur création lien :', error);
    alert("Échec de création de l'URL. Vérifie que l'URL est correcte et que le slug n’est pas déjà pris.");
  }
};
</script>


<template>
  <div class="home-view">
    <h1>Raccourcisseur d'URL</h1>
    <ShortUrlForm @submit="handleSubmit" />
    <ShortLinkList :links="shortLinks" />
  </div>
</template>
