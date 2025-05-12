<template>
  <div>
    <!-- Главный контейнер с фоновым изображением -->
    <div class="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat" style="background-image: url('/images/university_bg.jpg');">
      <!-- Переключатель вкладок -->
      <div class="pt-8 flex justify-center">
        <div class="bg-black bg-opacity-70 rounded-xl p-1 inline-flex">
          <button 
            @click="activeTab = 'evolution'"
            :class="{'bg-amber-400 text-black': activeTab === 'evolution', 'text-white': activeTab !== 'evolution'}"
            class="px-6 py-2 rounded-lg font-bold transition-all"
          >
            Evolution of Heroes
          </button>
          <button 
            @click="activeTab = 'management'"
            :class="{'bg-amber-400 text-black': activeTab === 'management', 'text-white': activeTab !== 'management'}"
            class="px-6 py-2 rounded-lg font-bold transition-all"
          >
            Heroes Management
          </button>
        </div>
      </div>

      <!-- Контент вкладки Evolution -->
      <div v-if="activeTab === 'evolution'" class="container px-5 py-12 mx-auto flex flex-col">
        <div class="lg:w-4/6 mx-auto">
          <div class="rounded-md h-64 overflow-hidden mb-10">
            <img alt="Evolution of Heroes" class="object-cover object-center h-full w-full" src="/images/Spiderman2.jpg">
          </div>
          
          <div class="w-full max-w-4xl mx-auto px-4 mb-12">
            <div class="flex justify-center items-center w-full mb-8">
              <h1 class="text-4xl font-bold text-white bg-black bg-opacity-80 px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg border-2 border-amber-400">The Evolution of Superhero Culture</h1>
            </div>
          </div>

          <div class="flex flex-col mt-10">
            <div class="w-full max-w-4xl mx-auto px-4">
              <div class="grid grid-cols-1 gap-8 py-6">
                <!-- Box 1: Comic Book Era -->
                <div class="bg-black bg-opacity-90 rounded-xl p-6 ml-20 transform transition duration-500 hover:scale-105 text-white">
                  <h3 class="text-2xl font-bold mb-4 text-amber-400">The Comic Book Era (1938-1970)</h3>
                  <p class="text-base sm:text-lg leading-relaxed">
                    The superhero genre emerged from the pages of comic books, with Superman's debut in Action Comics #1 marking the beginning of the Golden Age. This era saw the birth of iconic characters like Batman, Wonder Woman, and Captain America, who represented hope and justice during World War II.<br><br>
                    The Silver Age (1956-1970) brought a new wave of heroes, with Marvel Comics introducing more relatable characters like Spider-Man, the X-Men, and the Fantastic Four. These heroes dealt with personal struggles alongside their heroic duties, revolutionizing how superhero stories were told.
                  </p>
                </div>

                <!-- Box 2: Media Evolution -->
                <div class="bg-black bg-opacity-90 rounded-xl p-6 mr-20 transform transition duration-500 hover:scale-105 text-white">
                  <h3 class="text-2xl font-bold mb-4 text-amber-400">From Page to Screen (1970-2000)</h3>
                  <p class="text-base sm:text-lg leading-relaxed">
                    The 1970s and 80s saw superheroes transition to television and film, with shows like Wonder Woman and The Incredible Hulk bringing these characters to life. The 1989 Batman film demonstrated the genre's potential for serious storytelling.<br><br>
                    Comic storylines grew darker and more complex, with works like Watchmen and The Dark Knight Returns examining the psychological depth of heroism. This period redefined superheroes for a more mature audience, exploring themes of power, responsibility, and moral ambiguity.
                  </p>
                </div>

                <!-- Box 3: Modern Era -->
                <div class="bg-black bg-opacity-90 rounded-xl p-6 ml-20 transform transition duration-500 hover:scale-105 text-white">
                  <h3 class="text-2xl font-bold mb-4 text-amber-400">The Cinematic Revolution (2000-Present)</h3>
                  <p class="text-base sm:text-lg leading-relaxed">
                    The 21st century ushered in a new golden age of superhero content. The Marvel Cinematic Universe revolutionized storytelling with its interconnected narrative across multiple films and series. DC's darker, more grounded approach offered a different perspective on heroic legends.<br><br>
                    Today, superhero culture transcends traditional media, influencing fashion, technology, and social discourse. The genre continues to evolve, embracing diversity and tackling contemporary issues while maintaining its core theme: the extraordinary potential within humanity.
                  </p>
                </div>
              </div>

              <div class="w-full max-w-6xl mb-16 mt-12">
                <div class="bg-black bg-opacity-70 p-8 rounded-xl border-2 border-amber-400">
                  <div class="flex justify-center items-center w-full mb-8">
                    <h2 class="text-4xl font-bold text-white bg-black bg-opacity-80 px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg border-2 border-amber-400">Modern Heroes Gallery</h2>
                  </div>
                  
                  <div class="bg-black bg-opacity-90 rounded-xl p-6 mb-8">
                    <p class="text-white text-center text-lg leading-relaxed">
                      Witness the evolution of heroic imagery through our interactive detection system. Explore how superhero representation has changed over the decades.
                    </p>
                  </div>
                  
                  <div class="bg-black bg-opacity-90 rounded-xl p-6">
                    <Detection />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Контент вкладки Management -->
      <div v-if="activeTab === 'management'" class="container mx-auto p-4 bg-white bg-opacity-90 rounded-lg shadow-xl max-w-6xl my-8">
        <!-- Форма добавления/редактирования -->
        <form @submit.prevent="saveHero" class="mb-8 p-4 bg-gray-100 rounded-lg">
          <h2 class="text-xl font-bold mb-4">{{ editingHero ? 'Edit Hero' : 'Add New Hero' }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mb-2">Hero Name</label>
              <input v-model="form.hero_name" required class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block mb-2">Real Name</label>
              <input v-model="form.real_name" required class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block mb-2">Universe</label>
              <select v-model="form.universe" required class="w-full p-2 border rounded">
                <option value="Marvel">Marvel</option>
                <option value="DC">DC</option>
              </select>
            </div>
            <div>
              <label class="block mb-2">First Appearance</label>
              <input v-model="form.first_appearance" type="number" class="w-full p-2 border rounded">
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block mb-2">Powers</label>
            <textarea v-model="form.powers" required class="w-full p-2 border rounded h-24"></textarea>
          </div>
          
          <div class="flex gap-2">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
              {{ editingHero ? 'Update' : 'Add' }}
            </button>
            <button v-if="editingHero" @click="cancelEdit" type="button" class="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
          </div>
        </form>

        <!-- Таблица героев -->
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border">
  <thead>
    <tr class="bg-gray-100">
      <th class="py-2 px-4 border">ID</th>
      <th class="py-2 px-4 border">hero_name</th>
      <th class="py-2 px-4 border">real_name</th>
      <th class="py-2 px-4 border">powers</th>
      <th class="py-2 px-4 border">universe</th>
      <th class="py-2 px-4 border">first_appearance</th>
      <th class="py-2 px-4 border">Actions</th> <!-- Добавлен отдельный столбец для кнопок -->
    </tr>
  </thead>
  <tbody>
    <tr v-for="hero in heroes" :key="hero.id" class="hover:bg-gray-50">
      <td class="py-2 px-4 border">{{ hero.id }}</td>
      <td class="py-2 px-4 border">{{ hero.hero_name }}</td>
      <td class="py-2 px-4 border">{{ hero.real_name }}</td>
      <td class="py-2 px-4 border">{{ hero.powers }}</td>
      <td class="py-2 px-4 border">{{ hero.universe }}</td>
      <td class="py-2 px-4 border">{{ hero.first_appearance }}</td>
      <td class="py-2 px-4 border flex gap-2 justify-center"> <!-- Кнопки в отдельном столбце -->
        <button @click="editHero(hero)" class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Edit</button>
        <button @click="deleteHero(hero.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
// Import useHeroes composable
import { useHeroes } from '~/composables/useHeroes'

// Состояние активной вкладки
const activeTab = ref('evolution')

// Используем composable для управления героями
const { heroes, loading, error, fetchHeroes, addHero, updateHero, deleteHero } = useHeroes()

const form = reactive({
  id: null,
  hero_name: '',
  real_name: '',
  powers: '',
  universe: 'Marvel',
  first_appearance: null
})
const editingHero = ref(false)

// Сохранение героя
const saveHero = async () => {
  try {
    if (editingHero.value) {
      await updateHero(form)
    } else {
      await addHero(form)
    }
    resetForm()
  } catch (error) {
    console.error('Error saving hero:', error)
  }
}

// Редактирование героя
const editHero = (hero) => {
  Object.assign(form, hero)
  editingHero.value = true
}

// Сброс формы
const resetForm = () => {
  form.id = null
  form.hero_name = ''
  form.real_name = ''
  form.powers = ''
  form.universe = 'Marvel'
  form.first_appearance = null
  editingHero.value = false
}

// Отмена редактирования
const cancelEdit = () => {
  resetForm()
}

// Загружаем героев при монтировании
onMounted(() => {
  fetchHeroes()
})
</script>

<style scoped>
/* Стили для плавного перехода между вкладками */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>