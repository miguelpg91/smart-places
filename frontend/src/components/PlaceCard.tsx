import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa"

type Place = {
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
    tags: string[]
}

type Props = {
    place: Place
}

export default function PlaceCard({ place }: Props) {

    return (
        <>

            <div className="border-2 border-gray-200 rounded-2xl">

                <img
                    src={place.image_url}
                    alt={place.title}
                    className="object-cover rounded-t-xl"
                />

                <div className="p-5 space-y-4">
                    <h3 className="text-xl font-bold">

                        {place.title}

                    </h3>

                    <p className="flex items-center gap-2 text-gray-600 font-semibold">

                        <FaMapMarkerAlt />

                        {place.city}, {place.province}
                    </p>

                    <div className="flex flex-wrap gap-2">

                        {place.tags.map(tag => (
                            <span key={tag} className="bg-gray-300 px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}

                    </div>
                    <p className="info">
                        {place.description}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700">
                        <strong>Tipo:</strong> {place.type}
                    </p>
                </div>

            </div>

        </>
    )


}