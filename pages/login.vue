<template>
    <div class="flex flex-col flex-grow justify-center items-center bg-no-repeat bg-cover bg-center" 
         style="background-image: url('/images/protected.jpg'); background-size: cover; height: 100vh;">
      
      <div class="flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-5xl mb-12 border-2 border-white border-opacity-20">
        
        <h1 class="text-6xl font-extrabold text-white mb-6 text-center tracking-tight">
          Log in with <span class="text-black">GitHub</span>
        </h1>
  
        <div class='flex flex-row justify-center w-full'>
  <button class='group rounded-xl bg-[#eeeded] min-w-[250px] h-[60px] text-black font-bold
    flex flex-row items-center justify-center hover:text-white hover:bg-amber-500 transition-colors duration-300'
    @click="signIn('github', { callbackUrl: '/' })">
    
    <img src="/images/git.png" class="mr-2 w-10 h-10 transition duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert" alt="GitHub Logo">
    
    Sign In with GitHub
  </button>
  </div> 
  </div>
</div>
</template>
  
  <script setup lang="ts">
  definePageMeta({
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/Protected'
    },
  })
  
  const { signIn } = useAuth()
  </script>
  