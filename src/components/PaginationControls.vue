<script setup>
import { computed } from 'vue';
const props = defineProps({
  currentPage: Number,
  totalItems: Number,
  itemsPerPage: Number,
});

const emit = defineEmits(['page-changed']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-changed', page);
  }
};
</script>

<template>
  <div class="pagination flex justify-center items-center space-x-2 mt-4">
    <button @click="goToPage(props.currentPage - 1)" :disabled="props.currentPage === 1">Précédent</button>
    
    <span>Page {{ props.currentPage }} sur {{ totalPages }}</span>
    
    <button @click="goToPage(props.currentPage + 1)" :disabled="props.currentPage === totalPages">Suivant</button>
  </div>
</template>

<style scoped>
</style>
