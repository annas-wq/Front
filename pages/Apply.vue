<template>
  <main class="min-h-screen bg-no-repeat bg-cover bg-center bg-fixed" 
        style="background-image: url('/images/university_bg.jpg');">
    <div class="container px-5 py-24 mx-auto flex flex-col">
      <div class="lg:w-4/6 mx-auto">
        <div class="rounded-md h-64 overflow-hidden mb-10">
          <img alt="Hero Community" class="object-cover object-center h-full w-full" src="/images/Mortal.jpg">
        </div>

        <div class="w-full max-w-4xl mx-auto px-4">
          <div class="flex justify-center items-center w-full mb-12">
            <h1 class="text-4xl font-bold text-white bg-black bg-opacity-80 px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg border-2 border-amber-400">Join the Hero Community</h1>
          </div>

          <!-- Ways to Engage -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <!-- Conventions & Events -->
            <div class="bg-black bg-opacity-90 rounded-xl p-6 transform transition duration-500 hover:scale-105 group">
              <div class="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img src="/images/Spiderman1.jpg" alt="Conventions" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500">
              </div>
              <h3 class="text-2xl font-bold mb-4 text-amber-400">Conventions & Events</h3>
              <p class="text-white text-lg">
                Discover major comic conventions, fan meetups, and themed events. Connect with fellow enthusiasts and creators in the superhero community.
              </p>
            </div>

            <!-- Digital Communities -->
            <div class="bg-black bg-opacity-90 rounded-xl p-6 transform transition duration-500 hover:scale-105 group">
              <div class="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img src="/images/Motaro.jpg" alt="Online Communities" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500">
              </div>
              <h3 class="text-2xl font-bold mb-4 text-amber-400">Digital Communities</h3>
              <p class="text-white text-lg">
                Join online forums, social media groups, and virtual events. Share your passion for superheroes with a global community of fans.
              </p>
            </div>

            <!-- Creative Expression -->
            <div class="bg-black bg-opacity-90 rounded-xl p-6 transform transition duration-500 hover:scale-105 group">
              <div class="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img src="/images/Scorpion.jpg" alt="Creative Arts" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500">
              </div>
              <h3 class="text-2xl font-bold mb-4 text-amber-400">Creative Expression</h3>
              <p class="text-white text-lg">
                Explore fan art, cosplay, and creative writing. Share your interpretations of beloved characters and contribute to the evolving superhero narrative.
              </p>
            </div>

            <!-- Gaming & Interactive -->
            <div class="bg-black bg-opacity-90 rounded-xl p-6 transform transition duration-500 hover:scale-105 group">
              <div class="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img src="/images/SubZero.jpg" alt="Gaming Communities" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500">
              </div>
              <h3 class="text-2xl font-bold mb-4 text-amber-400">Gaming Communities</h3>
              <p class="text-white text-lg">
                Join gaming communities focused on superhero titles. Participate in tournaments, discussions, and collaborative events.
              </p>
            </div>
          </div>

          <!-- Interactive Section -->
          <div class="w-full max-w-6xl mx-auto mt-16">
            <div class="bg-black bg-opacity-70 p-8 rounded-xl border-2 border-amber-400">
              <div class="flex justify-center items-center w-full mb-8">
                <h2 class="text-4xl font-bold text-white bg-black bg-opacity-80 px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg border-2 border-amber-400">Character Recognition</h2>
              </div>
              
              <div class="bg-black bg-opacity-90 rounded-xl p-6 mb-8">
                <p class="text-white text-center text-lg leading-relaxed">
                  Test our AI's ability to recognize different characters and styles from across the superhero multiverse.
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
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/Protected'
  },
})
const {data} = await useFetch('/api/me')
</script>

<style scoped>
main {
  animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes glowing {
  0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
  50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.7); }
  100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
}

.border-amber-400 {
  animation: glowing 3s infinite;
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>