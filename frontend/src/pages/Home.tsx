
import { useState } from "react";

import { searchPlaces } from "../services/api.js"
import PlaceCard from "../components/PlaceCard.js";
import Map from "../components/Map.js";



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



export default function Home() {

    const [search, setSearch] = useState<string>("")

    const [response, setResponse] = useState<Place[]>([])

    const [summary, setSummary] = useState<string>("")          //Estado para 2ª respuesta de IA

    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<string>("")


    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {      ///event solo sirve para hacer: event.preventDefault()

        event.preventDefault()

        setLoading(true)

        try {

            const data = await searchPlaces(search)

            setResponse(data.places)
            setSummary(data.summary)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }


    }

    if (error) {
        return <p>Error: {error}</p>
    }


    return (
        <div>

            <div className="border-2 border-gray-300 rounded-xl p-6">

                <p className="mb-4 font-bold 4 text-xl text-[#7a7a7a]">Describe lo que estás buscando...</p>

                <form className="flex gap-3" onSubmit={handleSubmit}>

                    <input
                        className="flex-1 border-2 border-gray-300 rounded-xl p-3"
                        value={search}
                        placeholder="Ask to the AI"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#69b14e] rounded-2xl px-6 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Buscando..." : "Buscar con la IA"}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 text-red-600" role="alert">
                        {error}
                    </p>
                )}
            </div>

            {summary && (
                <div className="p-8 mt-8 bg-gree rounded-xl font-medium text-xl bg-[#69b14e]">

                    {summary}
                </div>
            )}


            <div className="mt-10 rounded-xl overflow-hidden">


                <Map places={response} />

                <p className="mb-4 mt-8 font-bold 4 text-xl text-[#7a7a7a]">Lugares encontrados: {response.length}</p>

                <div className="grid grid-cols-3 gap-12 mt-6 ">

                    {response.map(place => (
                        <PlaceCard
                            key={place.id}
                            place={place} />
                    ))}
                </div>
            </div>

        </div>
    )

}