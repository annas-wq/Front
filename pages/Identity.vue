<template>
  <main class="min-h-screen bg-no-repeat bg-cover bg-center bg-fixed" 
        style="background-image: url('/images/university_bg.jpg');">
    <div class="container px-5 py-24 mx-auto flex flex-col">
      <div class="lg:w-4/6 mx-auto">
        <!-- Search Section -->
        <div class="w-full max-w-4xl mx-auto px-4 mb-8">
          <div class="bg-black bg-opacity-90 rounded-xl p-6">
            <h1 class="text-4xl font-bold text-white text-center mb-8">Hero Database</h1>
            <div class="flex gap-4 mb-6">
              <input 
                v-model="searchTerm" 
                type="text" 
                placeholder="Search heroes..."
                class="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                @keyup.enter="search"
              >
              <button 
                @click="search"
                class="px-6 py-2 bg-amber-400 text-black rounded-lg hover:bg-amber-300 transition-colors"
                :disabled="superheroStore.isLoading"
              >
                {{ superheroStore.isLoading ? 'Searching...' : 'Search' }}
              </button>
            </div>

            <!-- Error Message -->
            <p v-if="superheroStore.error" class="text-red-400 text-center mb-4">
              {{ superheroStore.error }}
            </p>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="superheroStore.heroes.length > 0" class="w-full max-w-7xl mx-auto px-4">
          <div class="bg-black bg-opacity-90 rounded-xl p-6 mb-8">
            <h2 class="text-2xl font-bold text-white mb-6">Search Results</h2>
            
            <!-- Publisher Groups -->
            <div v-for="(heroes, publisher) in superheroStore.groupedHeroes" :key="publisher" class="mb-8">
              <h3 class="text-xl font-bold text-amber-400 mb-4">{{ publisher }}</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Hero Cards -->
                <div v-for="hero in heroes" 
                     :key="hero.id" 
                     class="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  <img :src="hero.image.url" 
                       :alt="hero.name"
                       class="w-full h-48 object-cover"
                       @click="showHeroDetails(hero.id)">
                  
                  <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="text-lg font-bold text-white">{{ hero.name }}</h4>
                      <button @click="toggleFavorite(hero.id)"
                              class="text-2xl"
                              :class="{ 'text-amber-400': isFavorite(hero.id), 'text-gray-400': !isFavorite(hero.id) }">
                        ★
                      </button>
                    </div>
                    <p class="text-gray-400 text-sm mb-2">{{ hero.biography["full-name"] }}</p>
                    
                    <!-- Power Stats -->
                    <div class="grid grid-cols-2 gap-2">
                      <div v-for="(value, stat) in hero.powerstats" 
                           :key="stat"
                           class="text-sm">
                        <span class="text-gray-400">{{ stat }}:</span>
                        <span class="text-white ml-1">{{ value }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hero Details Modal -->
        <div v-if="selectedHero" 
             class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div class="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-gray-900 p-6 border-b border-gray-800">
              <div class="flex justify-between items-start">
                <h2 class="text-2xl font-bold text-white">{{ selectedHero.name }}</h2>
                <button @click="selectedHero = null" class="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>
            </div>
            
            <div class="p-6">
              <img :src="selectedHero.image.url" 
                   :alt="selectedHero.name"
                   class="w-full h-64 object-cover rounded-lg mb-6">
              
              <!-- Biography -->
              <div class="mb-6">
                <h3 class="text-xl font-bold text-amber-400 mb-2">Biography</h3>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="(value, key) in selectedHero.biography" :key="key">
                    <span class="text-gray-400">{{ formatKey(key) }}:</span>
                    <span class="text-white ml-1">{{ formatValue(value) }}</span>
                  </div>
                </div>
              </div>

              <!-- Appearance -->
              <div class="mb-6">
                <h3 class="text-xl font-bold text-amber-400 mb-2">Appearance</h3>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="(value, key) in selectedHero.appearance" :key="key">
                    <span class="text-gray-400">{{ formatKey(key) }}:</span>
                    <span class="text-white ml-1">{{ formatValue(value) }}</span>
                  </div>
                </div>
              </div>

              <!-- Work -->
              <div class="mb-6">
                <h3 class="text-xl font-bold text-amber-400 mb-2">Work</h3>
                <div class="grid grid-cols-1 gap-2">
                  <div v-for="(value, key) in selectedHero.work" :key="key">
                    <span class="text-gray-400">{{ formatKey(key) }}:</span>
                    <span class="text-white ml-1">{{ value }}</span>
                  </div>
                </div>
              </div>

              <!-- Connections -->
              <div class="mb-6">
                <h3 class="text-xl font-bold text-amber-400 mb-2">Connections</h3>
                <div class="grid grid-cols-1 gap-2">
                  <div v-for="(value, key) in selectedHero.connections" :key="key">
                    <span class="text-gray-400">{{ formatKey(key) }}:</span>
                    <span class="text-white ml-1">{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSuperheroStore } from '~/stores/superhero'
import type { Hero } from '~/stores/superhero'

definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/Protected'
  },
})

const { data } = await useFetch('/api/me')
const superheroStore = useSuperheroStore()
const searchTerm = ref('')
const selectedHero = ref<Hero | null>(null)

const search = async () => {
  if (searchTerm.value.trim()) {
    await superheroStore.searchHeroes(searchTerm.value)
  }
}

const showHeroDetails = async (id: string) => {
  const details = await superheroStore.fetchCompleteHeroDetails(id)
  if (details) {
    selectedHero.value = details
  }
}

const toggleFavorite = (heroId: string) => {
  if (isFavorite(heroId)) {
    superheroStore.removeFromFavorites(heroId)
  } else {
    superheroStore.addToFavorites(heroId)
  }
}

const isFavorite = (heroId: string) => {
  return superheroStore.favoriteHeroes.includes(heroId)
}

const formatKey = (key: string) => {
  return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const formatValue = (value: any) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value
}
</script>

<style scoped>
main {
  animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-card {
  position: relative;
  overflow: hidden;
}

.hero-card img {
  transition: transform 0.5s ease-in-out;
}

.hero-card:hover img {
  transform: scale(1.1);
}

.hero-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.7) 70%,
    rgba(0, 0, 0, 0.9) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.hero-card:hover::after {
  opacity: 1;
}

.hero-title {
  position: relative;
  z-index: 10;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-out;
}

.hero-description {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-out;
}

.hero-card:hover .hero-description {
  opacity: 1;
  transform: translateY(0);
}

.hero-card:hover .hero-title {
  transform: translateY(-5px);
}

@keyframes glowing {
  0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
  50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.7); }
  100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
}

.border-amber-400 {
  animation: glowing 3s infinite;
}

.group:hover .group-hover\:text-yellow-300 {
  text-shadow: 0 0 10px rgba(252, 211, 77, 0.5);
}
</style>