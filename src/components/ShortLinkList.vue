<script setup>
import ShortListItem from './ShortListItem.vue';

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
  fetchLinks: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['delete', 'updated']);

const handleDelete = (shortCode) => {
  emit('delete', shortCode);
};

const handleUpdated = (updatedLink) => {
  emit('updated', updatedLink);
};
</script>

<template>
  <ul>
    <ShortListItem
      v-for="link in links"
      :key="link.shortCode"
      :link="link"
      :fetchLinks="fetchLinks"
      @delete="handleDelete"
      @updated="handleUpdated"
    />
  </ul>
</template>
