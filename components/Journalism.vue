<script setup lang="ts">
import { useEngStore } from '~/stores/eng'
import { computed, onMounted } from 'vue'

const engStore = useEngStore()

const filtering = computed(() => {
    return engStore.eng.filter(faculty => faculty.name == 'Journalism')
})

onMounted(() => {
    engStore.weather_S1()
    setInterval(() => { engStore.weather_S1() }, 5000)
})
</script>