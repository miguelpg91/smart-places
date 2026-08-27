const API_URL = import.meta.env.VITE_API_URL

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



export async function searchPlaces(query: string): Promise<SearchResponse> {
    const res = await fetch(`${API_URL}/places/search`, {
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




export const createPlace = async (formData: FormData) => {

    const response = await fetch(`${API_URL}/places`, {
        method: "POST",

        // No necesitamos Content-Type porque el navegador ve que estás enviando un FormData. 
        body: formData
    })

    return response.json()
}


/*

El navegador al ver que es FORMDATA (contenedor para string y archivos)

automáticamente prepara: Content-Type: multipart/form-data; boundary=ABC123

BOUNDARY:  es simplemente un separador que utiliza el navegador para distinguir las diferentes partes:

*/