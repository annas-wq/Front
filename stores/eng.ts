import { defineStore } from "pinia"

interface faculty {
    id: number,
    name: string,
    year: number,
    director: string,
    img: string
}
export const useEngStore = defineStore('eng', ()=> {
    const eng = ref<faculty[]>([
        { id: 1, name: 'Journalism', year: 2012, director: 'Cameron Campbell', img: '/images/journalism.jpg'},
        { id: 2, name: 'Biology', year: 2016, director: 'Edward Wendigo', img: '/images/biology.jpg'},
        { id: 3, name: 'Liberal Arts', year: 2012, director: 'Simon Bluebird', img: '/images/liberal_arts.jpg'},
        { id: 4, name: 'Mathematics', year: 2016, director: 'James Cliff', img: '/images/mathematics.jpg'},
        { id: 5, name: 'Physics', year: 2020, director: 'Sir Francis Gros', img: '/images/physics.jpg'},
    ]
    )

    const temp_S1 = ref<string>('')

    const wind_S1 = ref<string>('')

    const temp_S2 = ref<string>('')

    const wind_S2 = ref<string>('')

    const temp_S3 = ref<string>('')

    const wind_S3 = ref<string>('')

    const temp_GOD = ref<string>('')

    const wind_GOD = ref<string>('')

    const temp_INT = ref<string>('')
    
    const wind_INT = ref<string>('')

    const weather_S1 = async ()=> {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&hourly=temperature_2m&current=temperature_2m,wind_speed_10m')
        const data = await response.json()
        temp_S1.value = data.current.temperature_2m
        wind_S1.value = data.current.wind_speed_10m
    }

    const weather_S2 = async ()=> {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=39.2208&longitude=-7.0023&hourly=temperature_2m&current=temperature_2m,wind_speed_10m')
        const data = await response.json()
        temp_S2.value = data.current.temperature_2m
        wind_S2.value = data.current.wind_speed_10m
    }

    const weather_S3 = async ()=> {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=53.2833&longitude=69.4&hourly=temperature_2m&current=temperature_2m,wind_speed_10m')
        const data = await response.json()
        temp_S3.value = data.current.temperature_2m
        wind_S3.value = data.current.wind_speed_10m
    }

    const weather_GOD = async ()=> {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m&current=temperature_2m,wind_speed_10m')
        const data = await response.json()
        temp_GOD.value = data.current.temperature_2m
        wind_GOD.value = data.current.wind_speed_10m
    }

    const weather_INT = async ()=> {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.2904&longitude=25.9324&hourly=temperature_2m&current=temperature_2m,wind_speed_10m')
        const data = await response.json()
        temp_INT.value = data.current.temperature_2m
        wind_INT.value = data.current.wind_speed_10m
    }

    return {eng, temp_S1, wind_S1, temp_S2, wind_S2, temp_S3, wind_S3, temp_GOD, wind_GOD, temp_INT, wind_INT, weather_S1, weather_S2, weather_S3, weather_GOD, weather_INT}
},{persist:true})