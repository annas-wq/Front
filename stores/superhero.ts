import { defineStore } from "pinia"
import { ref, computed } from "vue"

export interface PowerStats {
    intelligence: string
    strength: string
    speed: string
    durability: string
    power: string
    combat: string
}

export interface Biography {
    "full-name": string
    "alter-egos": string
    aliases: string[]
    "place-of-birth": string
    "first-appearance": string
    publisher: string
    alignment: string
}

export interface Appearance {
    gender: string
    race: string
    height: string[]
    weight: string[]
    "eye-color": string
    "hair-color": string
}

export interface Work {
    occupation: string
    base: string
}

export interface Connections {
    "group-affiliation": string
    relatives: string
}

export interface Image {
    url: string
}

export interface Hero {
    id: string
    name: string
    powerstats: PowerStats
    biography: Biography
    appearance: Appearance
    work: Work
    connections: Connections
    image: Image
}

// Local database of heroes
const heroesDatabase: Hero[] = [
    {
        id: "1",
        name: "Spider-Man",
        powerstats: {
            intelligence: "90",
            strength: "55",
            speed: "67",
            durability: "75",
            power: "74",
            combat: "85"
        },
        biography: {
            "full-name": "Peter Parker",
            "alter-egos": "No alter egos found.",
            aliases: ["Spidey", "Wall-crawler", "Web-slinger"],
            "place-of-birth": "Queens, New York",
            "first-appearance": "Amazing Fantasy #15",
            publisher: "Marvel Comics",
            alignment: "good"
        },
        appearance: {
            gender: "Male",
            race: "Human",
            height: ["5'10", "178 cm"],
            weight: ["167 lb", "75 kg"],
            "eye-color": "Hazel",
            "hair-color": "Brown"
        },
        work: {
            occupation: "Freelance photographer, teacher",
            base: "New York City"
        },
        connections: {
            "group-affiliation": "Avengers",
            relatives: "May Parker (aunt), Ben Parker (uncle, deceased)"
        },
        image: {
            url: "/images/spiderman.jpg"
        }
    },
    {
        id: "2",
        name: "Iron Man",
        powerstats: {
            intelligence: "100",
            strength: "85",
            speed: "58",
            durability: "85",
            power: "100",
            combat: "64"
        },
        biography: {
            "full-name": "Tony Stark",
            "alter-egos": "No alter egos found.",
            aliases: ["Iron Knight", "Shellhead"],
            "place-of-birth": "Long Island, New York",
            "first-appearance": "Tales of Suspense #39",
            publisher: "Marvel Comics",
            alignment: "good"
        },
        appearance: {
            gender: "Male",
            race: "Human",
            height: ["6'1", "185 cm"],
            weight: ["225 lb", "102 kg"],
            "eye-color": "Blue",
            "hair-color": "Black"
        },
        work: {
            occupation: "Inventor, Businessman",
            base: "Stark Tower, New York"
        },
        connections: {
            "group-affiliation": "Avengers",
            relatives: "Howard Stark (father, deceased), Maria Stark (mother, deceased)"
        },
        image: {
            url: "/images/ironman.jpeg"
        }
    },
    {
        id: "3",
        name: "Batman",
        powerstats: {
            intelligence: "100",
            strength: "26",
            speed: "27",
            durability: "50",
            power: "47",
            combat: "100"
        },
        biography: {
            "full-name": "Bruce Wayne",
            "alter-egos": "No alter egos found.",
            aliases: ["Dark Knight", "Caped Crusader"],
            "place-of-birth": "Gotham City",
            "first-appearance": "Detective Comics #27",
            publisher: "DC Comics",
            alignment: "good"
        },
        appearance: {
            gender: "Male",
            race: "Human",
            height: ["6'2", "188 cm"],
            weight: ["210 lb", "95 kg"],
            "eye-color": "Blue",
            "hair-color": "Black"
        },
        work: {
            occupation: "Businessman",
            base: "Batcave, Gotham City"
        },
        connections: {
            "group-affiliation": "Justice League",
            relatives: "Thomas Wayne (father, deceased), Martha Wayne (mother, deceased)"
        },
        image: {
            url: "/images/batman.jpg"
        }
    }
]

export const useSuperheroStore = defineStore('superhero', () => {
    const heroes = ref<Hero[]>([])
    const currentHero = ref<Hero | null>(null)
    const searchQuery = ref('')
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const favoriteHeroes = ref<string[]>([])

    // Get hero by ID
    const fetchHeroById = async (id: string) => {
        try {
            isLoading.value = true
            error.value = null
            const hero = heroesDatabase.find(h => h.id === id)
            if (hero) {
                currentHero.value = hero
                return hero
            }
            error.value = 'Hero not found'
            return null
        } catch (err) {
            error.value = 'Error fetching hero'
            return null
        } finally {
            isLoading.value = false
        }
    }

    // Search heroes by name
    const searchHeroes = async (name: string) => {
        if (!name.trim()) return
        
        try {
            isLoading.value = true
            error.value = null
            searchQuery.value = name

            const results = heroesDatabase.filter(hero => 
                hero.name.toLowerCase().includes(name.toLowerCase()) ||
                hero.biography["full-name"].toLowerCase().includes(name.toLowerCase())
            )

            if (results.length > 0) {
                heroes.value = results
            } else {
                error.value = 'No heroes found'
                heroes.value = []
            }
        } catch (err) {
            error.value = 'Error searching heroes'
            heroes.value = []
        } finally {
            isLoading.value = false
        }
    }

    // Fetch complete hero details
    const fetchCompleteHeroDetails = async (id: string) => {
        try {
            isLoading.value = true
            error.value = null
            const hero = await fetchHeroById(id)
            if (hero) {
                currentHero.value = hero
                return hero
            }
            return null
        } catch (err) {
            error.value = 'Error fetching hero details'
            return null
        } finally {
            isLoading.value = false
        }
    }

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

    // Add hero to favorites
    const addToFavorites = (heroId: string) => {
        if (!favoriteHeroes.value.includes(heroId)) {
            favoriteHeroes.value.push(heroId)
        }
    }

    // Remove hero from favorites
    const removeFromFavorites = (heroId: string) => {
        favoriteHeroes.value = favoriteHeroes.value.filter(id => id !== heroId)
    }

    // Get favorite heroes
    const getFavoriteHeroes = computed(() => {
        return heroes.value.filter(hero => favoriteHeroes.value.includes(hero.id))
    })

    // Compare heroes' power stats
    const compareHeroes = (hero1Id: string, hero2Id: string) => {
        const hero1 = getHeroById(hero1Id)
        const hero2 = getHeroById(hero2Id)
        
        if (!hero1 || !hero2) return null

        const comparison = {
            intelligence: parseInt(hero1.powerstats.intelligence) - parseInt(hero2.powerstats.intelligence),
            strength: parseInt(hero1.powerstats.strength) - parseInt(hero2.powerstats.strength),
            speed: parseInt(hero1.powerstats.speed) - parseInt(hero2.powerstats.speed),
            durability: parseInt(hero1.powerstats.durability) - parseInt(hero2.powerstats.durability),
            power: parseInt(hero1.powerstats.power) - parseInt(hero2.powerstats.power),
            combat: parseInt(hero1.powerstats.combat) - parseInt(hero2.powerstats.combat)
        }

        return {
            hero1: hero1.name,
            hero2: hero2.name,
            stats: comparison
        }
    }

    return {
        // State
        heroes,
        currentHero,
        searchQuery,
        isLoading,
        error,
        favoriteHeroes,
        groupedHeroes,
        getFavoriteHeroes,

        // Methods
        fetchHeroById,
        searchHeroes,
        fetchCompleteHeroDetails,
        getHeroById,
        getHeroesByPublisher,
        getHeroPowerStats,
        addToFavorites,
        removeFromFavorites,
        compareHeroes
    }
}, { persist: true })
