import { ref } from 'vue'

export function useHeroes() {
  const heroes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchHeroes = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useFetch('/api/students', {
        key: 'heroes-list',
        watch: false,
        immediate: true
      })
      if (data.value) {
        heroes.value = data.value
      }
    } catch (e) {
      error.value = e
      console.error('Error fetching heroes:', e)
    } finally {
      loading.value = false
    }
  }

  const addHero = async (hero) => {
    loading.value = true
    error.value = null
    try {
      await useFetch('/api/students', {
        method: 'POST',
        body: hero
      })
      await fetchHeroes()
    } catch (e) {
      error.value = e
      console.error('Error adding hero:', e)
    } finally {
      loading.value = false
    }
  }

  const updateHero = async (hero) => {
    loading.value = true
    error.value = null
    try {
      await useFetch(`/api/students/${hero.id}`, {
        method: 'PUT',
        body: hero
      })
      await fetchHeroes()
    } catch (e) {
      error.value = e
      console.error('Error updating hero:', e)
    } finally {
      loading.value = false
    }
  }

  const deleteHero = async (id) => {
    loading.value = true
    error.value = null
    try {
      await useFetch(`/api/students/${id}`, {
        method: 'DELETE'
      })
      await fetchHeroes()
    } catch (e) {
      error.value = e
      console.error('Error deleting hero:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    heroes,
    loading,
    error,
    fetchHeroes,
    addHero,
    updateHero,
    deleteHero
  }
}
