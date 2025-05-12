<script setup lang="ts">
import { useEngStore } from '~/stores/eng'
import { ref, computed, onMounted } from 'vue'

const engStore = useEngStore()

const filtering = computed(()=> {
    return engStore.eng.filter(faculty => faculty.name == 'Mathematics')
})

onMounted(() => {
    engStore.weather_GOD()

    setInterval(()=>{engStore.weather_GOD()}, 5000)
})

</script>