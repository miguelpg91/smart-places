import { useState } from "react"

import { createPlace } from "../services/api.js"
import TagsSelector from "./TagsSelector.js"


type Place = {
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
}

export default function createPlaces() {
    const [image, setImage] = useState<File | null>(null)
    const [form, setForm] = useState<Place>({
        title: "",
        description: "",
        province: "",
        city: "",
        type: "",
        pricePerNight: 0,
        quiet: false,
        hasWater: false,
        nearLake: false,
        latitude: 0,
        longitude: 0,
        tags: []
    })


    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {


        console.log("CAMBIO:", e.target.name, e.target.value)

        const { name, value, } = e.target


        ///En el campo llamado name, guarda un valor: Si es un checkbox → guarda checked (true o false); sino guarda value

        if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            setForm({
                ...form,
                [name]: e.target.checked            ///cambia la propiedad cuyo nombre está en name por el valor de checked 
            })

            return
        }

        setForm({
            ...form,
            [name]: name === "pricePerNight" ||
                name === "latitude" ||
                name === "longitude"
                ? Number(value)                     ///convierte en numero
                : value
        })

    }


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault()

        const formData = new FormData()     ///contenedor nativo especialmente necesario cuando el formulario incluye archivos

        formData.append("title", form.title)                    ///.append = Añade al FormData
        formData.append("description", form.description)
        formData.append("province", form.province)
        formData.append("city", form.city)
        formData.append("type", form.type)
        formData.append("pricePerNight", String(form.pricePerNight))
        formData.append("quiet", String(form.quiet))
        formData.append("hasWater", String(form.hasWater))      ///Convertimos todos los valores a string porque formData acepta strings y archivos (File/Blob)
        formData.append("nearLake", String(form.nearLake))
        formData.append("latitude", String(form.latitude))
        formData.append("longitude", String(form.longitude))
        formData.append("tags", JSON.stringify(form.tags))


        if (image) {
            formData.append("image", image)         // Si hay una imagen seleccionada, la añadimos al FormData.
        }

        const data = await createPlace(formData)

        console.log("Lugar creado:", data)

        alert("¡Lugar creado correctamente!")

        setForm({                                       ///Limpiamos formulario una vez se ha envijado correctamente
            title: "",
            description: "",
            province: "",
            city: "",
            type: "",
            pricePerNight: 0,
            quiet: false,
            hasWater: false,
            nearLake: false,
            latitude: 0,
            longitude: 0,
            tags: []
        })

        setImage(null)

    }


    return (

        <div className="createForm">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-md p-8 space-y-5"
            >
                <input
                    name="title"
                    value={form.title}
                    placeholder="Título"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="description"
                    value={form.description}
                    placeholder="Descripción"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="province"
                    value={form.province}
                    placeholder="Provincia"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="city"
                    value={form.city}
                    placeholder="Ciudad"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="latitude"
                    value={form.latitude}
                    placeholder="Latitud"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="longitude"
                    value={form.longitude}
                    placeholder="Longitud"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-col gap-1">
                    <label className="font-medium">
                        Tipo:
                    </label>

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="">
                            Selecciona un tipo
                        </option>

                        <option value="camping">
                            Camping
                        </option>

                        <option value="area-autocaravanas">
                            Área de autocaravanas
                        </option>

                        <option value="lugar-libre">
                            Lugar libre
                        </option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-medium">
                        Precio por noche:
                    </label>

                    <input
                        type="number"
                        name="pricePerNight"
                        value={form.pricePerNight}
                        placeholder="0"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                </div>

                <input
                    type="file"
                    accept="image/*"    /// Solo permite seleccionar archivos de imagen
                    onChange={(e) => {
                        const file = e.target.files?.[0]

                        if (file) {
                            setImage(file)
                        }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />

                <div className="grid grid-cols-3 gap-4">

                    <label className="flex items-center gap-2">
                        <input
                            name="quiet"
                            type="checkbox"
                            checked={form.quiet}
                            onChange={handleChange}
                        />
                        Quiet
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            name="hasWater"
                            type="checkbox"
                            checked={form.hasWater}
                            onChange={handleChange}
                        />
                        Has water
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            name="nearLake"
                            type="checkbox"
                            checked={form.nearLake}
                            onChange={handleChange}
                        />
                        Near lake
                    </label>
                    <TagsSelector
                        form={form}
                        setForm={setForm}
                    />

                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                    Create Place
                </button>
            </form>

        </div>

    )


}


/*

      title,
        description,
        province,
        city,
        type,
        pricePerNight,
        quiet,
        hasWater,
        nearLake,
        tags

*/