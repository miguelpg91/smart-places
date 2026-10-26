import { useState } from "react"

import { getPlaces } from "../services/api.js"
import PlaceCard from "./PlaceCard.js"

type Place = {
    id: string
    title: string
    description: string
    province: string
    city: string
    type: string
    pricePerNight: number,
    quiet: boolean,
    hasWater: boolean,
    nearLake: boolean,
    latitude: number,
    longitude: number,
    tags: string[]
    image_url?: string
}

export default function () {

    const [places, setPlaces] = useState<Place[]>([])


    const handleFilter = async (type: string) => {

        const data = await getPlaces()

        const filtered = data.filter(d => d.type === type)

        setPlaces(filtered)
    }


    return (

        <div>

            <div className="flex w-full gap-8 mt-6">

                <button className="gap-2 rounded-full border border-[#1E7A4B] px-5 py-1 text-[#1E7A4B] cursor-pointer hover:bg-[#1E7A4B] hover:text-white transition"
                    onClick={() => handleFilter("Camping")}>Camping</button>

                <button className="gap-2 rounded-full border border-[#1E7A4B] px-5 py-1 text-[#1E7A4B] cursor-pointer hover:bg-[#1E7A4B] hover:text-white transition"
                    onClick={() => handleFilter("Área de autocaravanas")}>Area de autocaravanas</button>

                <button className="gap-2 rounded-full border border-[#1E7A4B] px-5 py-1 text-[#1E7A4B] cursor-pointer hover:bg-[#1E7A4B] hover:text-white transition"
                    onClick={() => handleFilter("Lugar libre")}>Lugar Libre</button>

                <button className="gap-2 rounded-full border border-[#1E7A4B] px-5 py-1 text-[#1E7A4B] cursor-pointer hover:bg-[#1E7A4B] hover:text-white transition"
                    onClick={() => handleFilter("Parking")}>Parking</button>

                <button className="gap-2 rounded-full border border-[#1E7A4B] px-5 py-1 text-[#1E7A4B] cursor-pointer hover:bg-[#1E7A4B] hover:text-white transition"
                    onClick={() => handleFilter("Área Camper")}>Area Camper</button>
            </div>

            <div className="grid grid-cols-3 gap-12 mt-6">
                {places.map(place => (
                    <PlaceCard
                        key={place.id}
                        place={place}
                    />
                ))}
            </div>

        </div>
    )
}