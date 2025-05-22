<script setup>
import ShortListItem from './ShortListItem.vue';
import TagManager from './TagManager.vue';

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
    <li v-for="link in links" :key="link.shortCode">
      <ShortListItem
        :link="link"
        :fetchLinks="fetchLinks"
        @delete="handleDelete"
        @updated="handleUpdated"
      />
      <TagManager
        :short-code="link.shortCode"
        :current-tags="link.tags"
        @updated="fetchLinks"
      />
    </li>
  </ul>
</template>
