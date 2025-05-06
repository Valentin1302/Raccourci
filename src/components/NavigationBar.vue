<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
<header class="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
  <nav class="max-w-6xl mx-auto">
    <ul class="flex items-center space-x-8">
      <li>
        <RouterLink 
          to="/" 
          class="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1 border-b-2 border-transparent hover:border-blue-600"
        >
          Shlink Manager
        </RouterLink>
      </li>
      <li>
        <RouterLink 
          to="/" 
          class="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1 border-b-2 border-transparent hover:border-blue-600"
        >
          Accueil 
        </RouterLink>
      </li>
      <li>
        <RouterLink 
          to="/stats" 
          class="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-1 border-b-2 border-transparent hover:border-blue-600"
        >
          Statistiques
        </RouterLink>
      </li>
    </ul>
  </nav>
</header>
</template>