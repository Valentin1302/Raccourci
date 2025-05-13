<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getShortUrlVisits } from '@/services/ShlinkApi'

const route = useRoute()
const visits = ref([])
const pagination = ref({
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 5 
})

const fetchVisits = async () => {
  const response = await getShortUrlVisits(route.params.shortCode, {  
      page: pagination.value.currentPage,
      itemsPerPage: pagination.value.itemsPerPage
    })
      visits.value = response.visits.data
      pagination.value.totalItems = response.visits.pagination.totalItems
      pagination.value.itemsPerPage = response.visits.pagination.itemsPerPage
}

const handlePageChange = (page) => {
  pagination.value.currentPage = page
  fetchVisits()
}

onMounted(fetchVisits)
</script>

<template>
    
<header class="mb-8">
    <h1 class="text-2xl font-bold">Statistiques pour {{ route.params.shortCode }}</h1>
    <router-link 
      to="/" 
      class="text-blue-600 hover:underline text-sm"
    >
      ← Retour à la liste
    </router-link>
  </header>
<div class="max-w-2xl mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">
      Statistiques pour {{ route.params.shortCode }}
    </h1>

    <p class="mb-2">{{ pagination.totalItems }} visites au total</p>

    <ul>
      <li 
        v-for="visit in visits" 
        :key="visit.visitId" 
        class="mb-2 p-2 border rounded"
      >
        {{ new Date(visit.date).toLocaleString() }}
      </li>
    </ul>

    <div v-if="pagination.totalItems > pagination.itemsPerPage" class="mt-4 flex gap-2">
      <button
        v-for="page in Math.ceil(pagination.totalItems / pagination.itemsPerPage)"
        :key="page"
        @click="handlePageChange(page)"
        :class="{
          'bg-blue-500 text-white': page === pagination.currentPage,
          'bg-gray-200': page !== pagination.currentPage
        }"
        class="px-3 py-1 rounded"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>


