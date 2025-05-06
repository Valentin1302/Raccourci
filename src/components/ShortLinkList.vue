<script setup>
import ShortListItem from './ShortListItem.vue';
import PaginationControls from './PaginationControls.vue';

defineProps({
  links: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="link-list">
    <h2>Historique des liens</h2>
    <ul>
      <ShortListItem 
        v-for="link in links" 
        :key="link.id" 
        :link="link" 
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
.link-list {
  margin-top: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>