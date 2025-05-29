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
  <div class="flex justify-center items-center gap-4 mt-10">
    <button
      @click="goToPage(props.currentPage - 1)"
      :disabled="props.currentPage === 1"
      class="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      ← Précédent
    </button>

    <span class="text-sm text-gray-700">
      Page <span class="font-semibold">{{ props.currentPage }}</span>
      sur <span class="font-semibold">{{ totalPages }}</span>
    </span>

    <button
      @click="goToPage(props.currentPage + 1)"
      :disabled="props.currentPage === totalPages"
      class="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      Suivant →
    </button>
  </div>
</template>
