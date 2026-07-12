
import { useState } from "react";

import searchPlaces from "../services/api.js"
import PlaceCard from "../components/PlaceCard.jsx";
import Map from "../components/Map.jsx";


export default function Home() {

    const [search, setSearch] = useState("")

    const [response, setResponse] = useState([])

    const [summary, setSummary] = useState("")          //Estado para 2ª respuesta de IA


    const handleSubmit = async (event) => {      ///event solo sirve para hacer: event.preventDefault()

        event.preventDefault()

        const data = await searchPlaces(search)

        console.log(data)

        setResponse(data.places)

        setSummary(data.summary)

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
                        className="bg-green-500 rounded-2xl px-6 cursor-pointer">Buscar con la IA</button>
                </form>
            </div>

            {summary && (
                <div className="p-8 mt-8 bg-gree rounded-xl font-medium text-xl bg-[#7a7a7a]">
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