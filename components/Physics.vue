<script setup lang="ts">
import { useEngStore } from '~/stores/eng'
import { ref, computed, onMounted } from 'vue'

const engStore = useEngStore()

const filtering = computed(()=> {
    return engStore.eng.filter(faculty => faculty.name == 'Physics')
})

onMounted(() => {
    engStore.weather_S2()

    setInterval(()=>{engStore.weather_S2()}, 5000)
})

</script>