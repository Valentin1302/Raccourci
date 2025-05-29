<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <!-- Barre de navigation -->
    <NavigationBar />

    <!-- Contenu -->
    <main class="flex-grow flex flex-col items-center justify-start px-4 py-10">
      <div class="w-full max-w-7xl text-center mb-12">
        <h1 class="text-4xl font-bold text-blue-600">Site trop cool</h1>
        <p class="text-sm text-gray-500">Raccourcisseur d'URL rapide & stylé</p>
      </div>

      <div class="w-full max-w-7xl">
        <router-view />
      </div>
    </main>

    <!-- Pied de page -->
    <footer class="bg-white border-t py-4 text-center text-sm text-gray-500">
      © 2025 Mon Application. Tous droits réservés.
    </footer>
  </div>
</template>
