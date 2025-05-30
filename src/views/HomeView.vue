<script setup>
import { ref, onMounted, watch } from 'vue';
import TagManager from '../components/TagManager.vue';
import PaginationControls from '../components/PaginationControls.vue';
import { getShortUrls, deleteShortUrl, updateShortUrl } from '../services/ShlinkApi';

const shortLinks = ref([]);
const currentPage = ref(1);
const totalItems = ref(0);
const itemsPerPage = 10;

const fetchLinks = async () => {
  try {
    const data = await getShortUrls(currentPage.value, itemsPerPage);
    shortLinks.value = data.shortUrls.data.map(link => ({
      ...link,
      isEditing: false,
      editedTitle: link.title,
      editedLongUrl: link.longUrl,
    }));
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

const copyLink = (url) => {
  navigator.clipboard.writeText(url);
  alert('Lien copié dans le presse-papier ✨');
};

const startEdit = (link) => {
  link.isEditing = true;
};

const cancelEdit = (link) => {
  link.isEditing = false;
  link.editedTitle = link.title;
  link.editedLongUrl = link.longUrl;
};

const saveEdit = async (link) => {
  try {
    await updateShortUrl(link.shortCode, {
      title: link.editedTitle,
      longUrl: link.editedLongUrl,
    });

    link.title = link.editedTitle;
    link.longUrl = link.editedLongUrl;
    link.isEditing = false;

    alert('Mise à jour réussie');
  } catch (error) {
    alert('Erreur lors de la mise à jour');
    console.error(error);
  }
};
</script>

<template>
  <section class="bg-gray-50 min-h-screen py-12">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-blue-600">Liens Raccourcis</h2>
      <p class="text-sm text-gray-500">Gérez et suivez vos liens facilement</p>
    </div>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6">
      <div
        v-for="link in shortLinks"
        :key="link.shortCode"
        class="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:ring-1 hover:ring-blue-200 transition-all duration-300"
      >
        <div class="p-6 space-y-3">
          <!-- Édition -->
          <div v-if="link.isEditing" class="space-y-2">
            <input v-model="link.editedTitle" placeholder="Titre" class="w-full p-2 border rounded" />
            <input v-model="link.editedLongUrl" placeholder="Long URL" class="w-full p-2 border rounded" />
            <div class="flex gap-2">
              <button @click="saveEdit(link)" class="bg-blue-500 text-white px-3 py-1 rounded">Sauvegarder</button>
              <button @click="cancelEdit(link)" class="bg-gray-300 text-black px-3 py-1 rounded">Annuler</button>
            </div>
          </div>

          <!-- Lecture seule -->
          <div v-else>
            <h3 class="text-lg font-semibold text-gray-800 truncate">{{ link.title || 'Sans titre' }}</h3>
            <a :href="link.shortUrl" target="_blank" class="block text-sm text-blue-600 hover:underline truncate">
              {{ link.shortUrl }}
            </a>
            <p class="text-xs text-gray-500 truncate">{{ link.longUrl }}</p>
            <p class="text-xs text-gray-400">Créé le {{ new Date(link.dateCreated).toLocaleDateString() }}</p>

            <div v-if="link.tags.length" class="flex flex-wrap gap-x-2 gap-y-2 mt-2">
              <span
                v-for="tag in link.tags"
                :key="tag"
                class="bg-gray-100 text-xs text-gray-700 px-3 py-1 rounded-full border border-gray-200"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="border-t border-gray-100 px-6 py-4 space-y-3">
          <div class="flex items-center gap-3 text-sm text-gray-500">
            <button @click="copyLink(link.shortUrl)" class="hover:text-black">📋</button>
            <button @click="startEdit(link)" class="hover:text-black">✏️</button>
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
