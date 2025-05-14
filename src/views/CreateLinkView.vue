<script setup>
import { useRouter } from 'vue-router'
import ShortUrlForm from '@/components/ShortUrlForm.vue'
import { createShortUrl } from '@/services/ShlinkApi'

const router = useRouter()

const handleSubmit = async (formData) => {
  try {
    await createShortUrl(formData.longUrl, {
      title: formData.title,
      customSlug: formData.customSlug,
      slugLength: formData.slugLength,
    })
    router.push('/') 
  } catch (error) {
    console.error('Erreur création lien :', error)
    alert("Erreur lors de la création de l'URL.")
  }
}
</script>

<template>
  <div class="create-link-view p-4 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Créer un lien court</h1>
    <ShortUrlForm @submit="handleSubmit" />
  </div>
</template>
