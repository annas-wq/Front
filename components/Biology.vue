<script setup lang="ts">
import { useEngStore } from '~/stores/eng'
import { ref, computed, onMounted } from 'vue'

const engStore = useEngStore()

const filtering = computed(()=> {
    return engStore.eng.filter(faculty => faculty.name == 'Biology')
})

onMounted(() => {
    engStore.weather_INT()

    setInterval(()=>{engStore.weather_INT()}, 5000)
})

</script>