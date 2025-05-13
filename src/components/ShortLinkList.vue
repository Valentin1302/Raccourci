<script setup>
import ShortListItem from './ShortListItem.vue';
import PaginationControls from './PaginationControls.vue';

defineProps({
  links: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['delete'])

const handleDelete = (shortCode) => {
  emit('delete', shortCode)
}
</script>

<template>
  <div class="link-list">
    <h2>Historique des liens</h2>
    <ul>
      <ShortListItem 
        v-for="link in links" 
        :key="link.shortCode" 
        :link="link" 
        @delete="handleDelete"
      />
    </ul>
    <PaginationControls 
      v-if="links.length > 10"
      :current-page="1"
      :total-pages="Math.ceil(links.length / 10)"
    />
  </div>
</template>

<style scoped>

</style>