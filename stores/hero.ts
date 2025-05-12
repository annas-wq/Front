import { defineStore } from "pinia"

interface Hero {
    id: string
    name: string
    biography: {
        "full-name": string
        publisher: string
        "first-appearance": string
    }
    powerstats: {
        intelligence: string
        strength: string
        speed: string
        durability: string
        power: string
        combat: string
    }
    appearance: {
        gender: string
        race: string
    }
    image: {
        url: string
    }
    connections: {
        "group-affiliation": string
    }
}

interface SearchResults {
    response: string
    "results-for": string
    results: Hero[]
}

export const useSuperheroStore = defineStore('superhero', () => {
    const heroes = ref<Hero[]>([])
    const searchQuery = ref('')
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Group heroes by publisher
    const groupedHeroes = computed(() => {
        const groups: { [key: string]: Hero[] } = {}
        heroes.value.forEach(hero => {
            const publisher = hero.biography.publisher || 'Other'
            if (!groups[publisher]) {
                groups[publisher] = []
            }
            groups[publisher].push(hero)
        })
        return groups
    })

    // Search heroes using the API
    const searchHeroes = async (query: string) => {
        if (!query.trim()) return
        
        try {
            isLoading.value = true
            error.value = null
            searchQuery.value = query

            const response = await fetch(`${process.env.SUPERHERO_API}${query}`)
            const data: SearchResults = await response.json()

            if (data.response === 'success') {
                heroes.value = data.results
            } else {
                error.value = 'No heroes found'
                heroes.value = []
            }
        } catch (err) {
            error.value = 'Error fetching heroes'
            heroes.value = []
        } finally {
            isLoading.value = false
        }
    }

    // Get hero by ID
    const getHeroById = (id: string): Hero | undefined => {
        return heroes.value.find(hero => hero.id === id)
    }

    // Get heroes by publisher
    const getHeroesByPublisher = (publisher: string): Hero[] => {
        return heroes.value.filter(hero => hero.biography.publisher === publisher)
    }

    // Get hero power stats
    const getHeroPowerStats = (id: string) => {
        const hero = getHeroById(id)
        return hero ? hero.powerstats : null
    }

    return {
        heroes,
        searchQuery,
        isLoading,
        error,
        groupedHeroes,
        searchHeroes,
        getHeroById,
        getHeroesByPublisher,
        getHeroPowerStats
    }
}, { persist: true })
        {
            id: 1,
            name: 'Marvel Comics Universe',
            established: 1939,
            description: 'Home to iconic characters who balance superhuman abilities with everyday challenges.',
            popularHeroes: [
                {
                    name: 'Spider-Man',
                    alterEgo: 'Peter Parker',
                    firstAppearance: 1962,
                    powers: ['Wall-crawling', 'Super strength', 'Spider-sense'],
                    description: 'The friendly neighborhood hero who proves that with great power comes great responsibility.',
                    image: '/images/spiderman.jpg'
                },
                {
                    name: 'Iron Man',
                    alterEgo: 'Tony Stark',
                    firstAppearance: 1963,
                    powers: ['Genius intellect', 'Powered armor', 'Advanced technology'],
                    description: 'Billionaire inventor who turned his life around to become a hero.',
                    image: '/images/ironman.jpeg'
                }
            ],
            currentStats: {
                activeComics: 45,
                totalMovies: 32,
                popularityRank: 1,
                monthlyReaders: 2500000
            }
        },
        {
            id: 2,
            name: 'Mortal Kombat Universe',
            established: 1992,
            description: 'A realm where martial arts meets supernatural powers.',
            popularHeroes: [
                {
                    name: 'Scorpion',
                    alterEgo: 'Hanzo Hasashi',
                    firstAppearance: 1992,
                    powers: ['Hellfire manipulation', 'Martial arts mastery', 'Teleportation'],
                    description: 'A ninja spectre seeking vengeance and redemption.',
                    image: '/images/Scorpion.jpg'
                },
                {
                    name: 'Sub-Zero',
                    alterEgo: 'Kuai Liang',
                    firstAppearance: 1992,
                    powers: ['Cryomancy', 'Martial arts expertise', 'Ice weapons creation'],
                    description: 'Grandmaster of the Lin Kuei, master of ice.',
                    image: '/images/SubZero.jpg'
                }
            ],
            currentStats: {
                activeComics: 12,
                totalMovies: 3,
                popularityRank: 3,
                monthlyReaders: 800000
            }
        }
    ])

    // Get a specific universe by ID
    const getUniverseById = (id: number): Universe | undefined => {
        return universes.value.find(universe => universe.id === id)
    }

    // Get heroes from a specific universe
    const getHeroesByUniverse = (universeId: number): Hero[] => {
        const universe = getUniverseById(universeId)
        return universe ? universe.popularHeroes : []
    }

    // Get universe statistics
    const getUniverseStats = (universeId: number): UniverseStats | undefined => {
        const universe = getUniverseById(universeId)
        return universe ? universe.currentStats : undefined
    }

    return {
        universes,
        getUniverseById,
        getHeroesByUniverse,
        getUniverseStats
    }
}, { persist: true })