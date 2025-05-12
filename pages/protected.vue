<template>
   <main class="flex flex-col flex-grow justify-center items-center bg-no-repeat bg-cover bg-center" 
   style="background-image: url('/images/protected.jpg'); background-size: cover; height: 100vh;">
   <div class="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-5xl mb-12 border-2 border-white border-opacity-20">
      <h1 v-if="!log_check" class="text-5xl text-black md:text-6xl font-extrabold mb-6 text-center tracking-tight">
          <p>THIS IS A</p>
          <p><span class="text-white">PROTECTED PAGE</span></p>
          <p>Please, log in with <span class="text-white">GitHub</span></p>
      </h1>
      <h1 class="text-5xl text-black md:text-6xl font-extrabold mb-6 text-center tracking-tight">
          <p v-if="log_check">Hello, Dear {{data?.user?.name}}!</p>
      </h1>
    </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const { signOut, status } = useAuth()
const log_check = computed(() => status.value === 'authenticated')
const { data } = await useFetch('/api/me')
definePageMeta({middleware:'sidebase-auth'})

</script>
<style scoped>
main {
  animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

  