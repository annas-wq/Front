<template>
  <header class="fixed top-0 left-0 w-full z-30 flex items-center justify-between bg-[#eeeded] border-b-[6px] border-yellow-400 text-xl text-black h-[100px] px-4">

    <div class="flex items-center w-1/10">
      <!-- <img src="/public/images/logotype.png" alt="Logo" class="w-30 h-20 bg-transparent max-sm:w-40 max-sm:h-8"> -->
       <div class="w-30 h-20 bg-transparent max-sm:w-40 max-sm:h-8 text-black font-bold text-3xl">
        Development of Superhero Culture
       </div>
    </div>

    <nav class="flex justify-center items-center gap-10 w-2/3">
      <NuxtLink to="/" class="group rounded-full bg-[#eeeded] w-auto h-[60px] text-black font-bold
      flex items-center justify-center hover:text-white hover:bg-yellow-400 active:bg-amber-500 transition-colors duration-150 px-6">Evolution</NuxtLink>

      <NuxtLink to="/Identity" class="group rounded-full bg-[#eeeded] w-auto h-[60px] text-black font-bold
      flex items-center justify-center hover:text-white hover:bg-yellow-400 active:bg-amber-500 transition-colors duration-150 px-6">Universes</NuxtLink>

      <NuxtLink to="/Life" class="group rounded-full bg-[#eeeded] w-auto h-[60px] text-black font-bold
      flex items-center justify-center hover:text-white hover:bg-yellow-400 active:bg-amber-500 transition-colors duration-150 px-6 whitespace-nowrap">Modern Culture</NuxtLink>

      <NuxtLink to="/Apply" class="group rounded-full bg-[#eeeded] w-auto h-[60px] text-black font-bold
      flex items-center justify-center hover:text-white hover:bg-yellow-400 active:bg-amber-500 transition-colors duration-150 px-6">Community</NuxtLink>

    </nav>

      <NuxtLink v-if="!log_check" to="/Login" class="group rounded-full bg-[#eeeded] min-w-[60px] h-[60px] text-black font-bold
      flex items-center justify-center hover:text-white hover:bg-yellow-400 transition-colors duration-300 px-6">LogIn</NuxtLink>

      <div v-if="log_check" @click="signOut({ callbackUrl: '/' })" class="group rounded-full bg-[#eeeded] min-w-[60px] h-[60px] text-black font-bold
      flex items-center justify-center hover:text-white hover:bg-amber-500 transition-colors duration-300 px-6">Log Out</div>

      <img v-show="log_check" :src="data?.user?.image" class="w-14 h-14 border-2 border-black rounded-full" />
  </header>

  <main class="pt-[80px] min-h-screen w-full bg-[#F8F7F2] text-black flex-1 flex">
    <div class="w-full">
      <slot />
    </div>
  </main>

  <footer class="flex flex-row w-full bg-[#eeeded] border-t-[6px] border-yellow-400 items-center justify-center px-4 py-2 h-8 gap-4">
    <a href="https://t.me/second_nikon" class="hover:scale-110 transition-transform duration-300">
      <img src="/images/Telegram_logo.svg.webp" class="w-8 h-8 filter-red" />
    </a>
    <a href="https://github.com/vnikonv" class="hover:scale-110 transition-transform duration-300">
      <img src="/images/github.png" class="w-8 h-8 filter-red" />
    </a>
    <a href="https://linkedin.com/in/nikon-veremeichik-44055b361" class="hover:scale-110 transition-transform duration-300">
      <img src="/images/linkedin.svg" class="w-8 h-8 filter-red" />
    </a>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const labsOpen = ref<boolean>(false)

const toggleLabs = () => {
  labsOpen.value = !labsOpen.value
}

const { signOut, status } = useAuth()
const log_check = computed(() => status.value === 'authenticated')
const { data } = await useFetch('/api/me')

useHead({
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-YM1HZ1JLP4",
      async: true
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YM1HZ1JLP4');
      `,
      type: "text/javascript"
    }
  ]
})
</script>

<style scoped>
.links {
  @apply p-2 rounded-md hover:bg-[#ea3a3a] hover:text-white;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hexagon {
        width: 150px;
        height: 150px;
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      }

</style>
