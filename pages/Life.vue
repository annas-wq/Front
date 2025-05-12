<template>
  <main class="min-h-screen bg-no-repeat bg-cover bg-center bg-fixed" 
        style="background-image: url('/images/university_bg.jpg');">
    <div class="container px-5 py-24 mx-auto flex flex-col">
      <div class="lg:w-4/6 mx-auto">
        <div class="rounded-md h-64 overflow-hidden mb-10">
          <img alt="Impact of Heroes" class="object-cover object-center h-full w-full" src="/images/Spider1.jpg">
        </div>

        <div class="w-full max-w-4xl mx-auto px-4">
          <div class="flex justify-center items-center w-full mb-12">
            <h1 class="text-4xl font-bold text-white bg-black bg-opacity-80 px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg border-2 border-amber-400">Superheroes in Modern Culture</h1>
          </div>

          <!-- Impact Sections -->
          <div class="space-y-8">
            <!-- Entertainment & Media -->
            <div class="bg-black bg-opacity-90 rounded-xl p-8 transform transition duration-500 hover:scale-105">
              <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3">
                  <img src="/images/Spiderman2.jpg" alt="Entertainment Impact" class="w-full h-48 object-cover rounded-lg">
                </div>
                <div class="md:w-2/3">
                  <h3 class="text-2xl font-bold text-amber-400 mb-4">Entertainment Revolution</h3>
                  <p class="text-white text-lg">
                    Superhero franchises have transformed entertainment, dominating box offices and streaming platforms. The MCU alone has redefined cinematic storytelling, while DC's darker narratives offer compelling alternatives. This cultural phenomenon has influenced everything from TV shows to theme park attractions.
                  </p>
                </div>
              </div>
            </div>

            <!-- Fashion & Design -->
            <div class="bg-black bg-opacity-90 rounded-xl p-8 transform transition duration-500 hover:scale-105">
              <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3">
                  <img src="/images/Spider3.jpg" alt="Fashion Impact" class="w-full h-48 object-cover rounded-lg">
                </div>
                <div class="md:w-2/3">
                  <h3 class="text-2xl font-bold text-amber-400 mb-4">Fashion & Design Influence</h3>
                  <p class="text-white text-lg">
                    Superhero aesthetics have revolutionized fashion and design. From high-end collaborations to streetwear, iconic symbols and costume elements have become mainstream fashion statements. This influence extends to architecture, product design, and digital art.
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Impact -->
            <div class="bg-black bg-opacity-90 rounded-xl p-8 transform transition duration-500 hover:scale-105">
              <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3">
                  <img src="/images/Raiden.jpg" alt="Social Impact" class="w-full h-48 object-cover rounded-lg">
                </div>
                <div class="md:w-2/3">
                  <h3 class="text-2xl font-bold text-amber-400 mb-4">Social Impact & Representation</h3>
                  <p class="text-white text-lg">
                    Modern superhero stories tackle crucial social issues, from diversity and inclusion to environmental concerns. Characters now reflect a broader range of backgrounds and experiences, inspiring real-world conversations about representation and social justice.
                  </p>
                </div>
              </div>
            </div>

            <!-- Gaming & Technology -->
            <div class="bg-black bg-opacity-90 rounded-xl p-8 transform transition duration-500 hover:scale-105">
              <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3">
                  <img src="/images/SubZero.jpg" alt="Gaming Impact" class="w-full h-48 object-cover rounded-lg">
                </div>
                <div class="md:w-2/3">
                  <h3 class="text-2xl font-bold text-amber-400 mb-4">Gaming & Interactive Media</h3>
                  <p class="text-white text-lg">
                    Superhero video games have evolved from simple adaptations to complex narratives. Titles like Spider-Man and the Arkham series have set new standards for interactive storytelling, while fighting games like Mortal Kombat blend multiple hero universes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Detection Section -->
          <div class="w-full max-w-6xl mx-auto mt-16">
            <div class="bg-black bg-opacity-70 p-8 rounded-xl border-2 border-amber-400">
              <div class="flex justify-center items-center w-full mb-8">
                <h2 class="text-4xl font-bold text-white bg-black bg-opacity-80 px-8 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg border-2 border-amber-400">Explore Hero Influence</h2>
              </div>
              
              <div class="bg-black bg-opacity-90 rounded-xl p-6 mb-8">
                <p class="text-white text-center text-lg leading-relaxed">
                  Use our interactive system to discover how superheroes have shaped different aspects of modern culture and entertainment.
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
</style>