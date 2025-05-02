<script setup>
import NavigationBar from './components/NavigationBar.vue'; // Importez votre composant
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavigationBar />

    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-blue-600 text-center mb-8">Mon Application Vue.js</h1>
      <router-view /> 
    </main>

    <footer class="bg-gray-100 py-4 text-center">
      <p>© 2025 Mon Application</p>
    </footer>
  </div>
</template>


<style scoped>

</style>