type Place = {
    id: number
    title: string
    description: string
    province: string
    city: string
    type: string
    image_url?: string
    pricePerNight: number
    quiet: boolean
    hasWater: boolean
    nearLake: boolean
    latitude: number
    longitude: number
    tags: string[]
}

type SearchResponse = {
    places: Place[]
    summary: string
}

type CreatePlace = {
    title: string
    description: string
    province: string
    city: string
    type: string
    pricePerNight: number
    quiet: boolean
    hasWater: boolean
    nearLake: boolean
    tags: string[]
}




export async function searchPlaces(query: string): Promise<SearchResponse> {
    const res = await fetch("http://localhost:3000/places/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    })

    if (!res.ok) {
        throw new Error("No se pudo completar la búsqueda")
    }

    return res.json()
}




export async function createPlace(place: CreatePlace): Promise<void> {
    // petición POST para crear el lugar
}