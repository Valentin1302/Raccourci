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
  <div class="min-h-screen bg-gray-50 text-gray-800 px-4 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold tracking-tight text-blue-600">
        Stats pour <code class="text-gray-700">{{ route.params.shortCode }}</code>
      </h1>
      <p class="text-sm text-gray-500 mt-1">
        Total de visites : <strong>{{ pagination.totalItems }}</strong>
      </p>
      <router-link to="/" class="mt-2 inline-block text-blue-500 hover:underline text-sm">
        ← Retour à la liste
      </router-link>
    </div>

    <!-- Liste des visites -->
    <div v-if="visits.length" class="space-y-6 max-w-3xl mx-auto relative border-l border-gray-300 pl-6">
      <div
        v-for="visit in visits"
        :key="visit.visitId"
        class="relative group bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
      >
        <!-- Timeline dot -->
        <span class="absolute -left-[9px] top-5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></span>

        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-400 font-mono">
            {{ new Date(visit.date).toLocaleString() }}
          </span>
          <span class="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600">
            {{ visit.country || 'Global' }}
          </span>
        </div>

        <p class="text-sm text-gray-700">
          Visite depuis :
          <span class="text-blue-500 font-medium">
            {{ visit.referer || 'accès direct' }}
          </span>
        </p>

        <div class="mt-2 text-xs text-gray-500">
          {{ visit.browser }} · {{ visit.os }} · {{ visit.deviceType }}
        </div>
      </div>
    </div>

    <!-- Aucune visite -->
    <p v-else class="text-center text-sm text-gray-400 italic mt-12">
      Aucune visite enregistrée pour ce lien.
    </p>

    <!-- Pagination -->
    <div
      v-if="pagination.totalItems > pagination.itemsPerPage"
      class="mt-10 flex justify-center gap-2"
    >
      <button
        v-for="page in Math.ceil(pagination.totalItems / pagination.itemsPerPage)"
        :key="page"
        @click="handlePageChange(page)"
        :class="[
          'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
          page === pagination.currentPage
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
