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

const copyLink = (url) => {
  navigator.clipboard.writeText(url);
  alert('Lien copié dans le presse-papier ✨');
};
</script>

<template>
  <section class="bg-gray-50 min-h-screen py-12">
    <!-- Header optionnel -->
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-blue-600">Liens Raccourcis</h2>
      <p class="text-sm text-gray-500">Gérez et suivez vos liens facilement</p>
    </div>

    <!-- Grille de cartes -->
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6">
      <div
        v-for="link in shortLinks"
        :key="link.shortCode"
        class="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:ring-1 hover:ring-blue-200 transition-all duration-300"
      >
        <div class="p-6 space-y-3">
          <!-- Titre -->
          <h3 class="text-lg font-semibold text-gray-800 truncate">
            {{ link.title || 'Sans titre' }}
          </h3>

          <!-- Lien court -->
          <a
            :href="link.shortUrl"
            target="_blank"
            class="block text-sm text-blue-600 hover:underline truncate"
          >
            {{ link.shortUrl }}
          </a>

          <!-- Lien long -->
          <p class="text-xs text-gray-500 truncate">
            {{ link.longUrl }}
          </p>

          <!-- Date -->
          <p class="text-xs text-gray-400">Créé le {{ new Date(link.dateCreated).toLocaleDateString() }}</p>

          <!-- Tags -->
          <div
            v-if="link.tags.length"
            class="flex flex-wrap gap-x-2 gap-y-2 mt-2"
          >
            <span
              v-for="tag in link.tags"
              :key="tag"
              class="bg-gray-100 text-xs text-gray-700 px-3 py-1 rounded-full border border-gray-200"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Actions + TagManager -->
        <div class="border-t border-gray-100 px-6 py-4 space-y-3">
          <div class="flex items-center gap-3 text-sm text-gray-500">
            <button @click="copyLink(link.shortUrl)" class="hover:text-black">📋</button>
            <button @click="handleDelete(link.shortCode)" class="hover:text-red-500">🗑️</button>
            <router-link :to="`/visits/${link.shortCode}`" class="hover:text-blue-600">📊</router-link>
          </div>

          <TagManager
            :shortCode="link.shortCode"
            :currentTags="link.tags"
            @updated="fetchLinks"
          />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-12">
      <PaginationControls
        :currentPage="currentPage"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @page-changed="page => currentPage = page"
      />
    </div>
  </section>
</template>
