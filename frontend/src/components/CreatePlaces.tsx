import { useState } from "react"

import { createPlace } from "../services/api.js"
import TagsSelector from "./TagsSelector.js"

import Navbar from "./Navbar.js"

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
        <div>
            {/* Cabecera con imagen y degradado */}
            <div
                className="relative bg-cover bg-no-repeat bg-top"
                style={{
                    backgroundImage: "url('/images/background-image-2.png')",
                }}
            >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

                <div className="relative mx-auto max-w-6xl px-4 text-white">
                    <div className="relative mx-auto max-w-6xl px-6 pb-16 text-white">
                        <Navbar />

                        <div className="px-8">
                            <h1 className="text-4xl font-bold">
                                Añade un nuevo lugar
                            </h1>

                            <p className="mt-4 mb-6 text-lg leading-relaxed">
                                Crea un lugar y ayuda a la comunidad a descubrir nuevos rincones que visitar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mx-auto max-w-4xl px-4 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 rounded-xl bg-white p-8 shadow-md"
                >
                    <label className="font-medium">Titulo:</label>
                    <input
                        name="title"
                        value={form.title}
                        placeholder="Pico de Santa Ana"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="font-medium">Descripción:</label>
                    <input
                        name="description"
                        value={form.description}
                        placeholder="Describe tu lugar"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="font-medium">Provincia:</label>
                    <input
                        name="province"
                        value={form.province}
                        placeholder="Asturias"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="font-medium">Ciudad:</label>
                    <input
                        name="city"
                        value={form.city}
                        placeholder="Asturias"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="font-medium">Latitud:</label>
                    <input
                        name="latitude"
                        value={form.latitude}
                        placeholder="43.297200"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="font-medium">Longitud:</label>
                    <input
                        name="longitude"
                        value={form.longitude}
                        placeholder="-5.684000"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex flex-col gap-1">
                        <label className="font-medium">Tipo:</label>

                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="Camping">Camping</option>
                            <option value="Área de autocaravanas">Área de autocaravanas</option>
                            <option value="Lugar libre">Lugar libre</option>
                            <option value="Parking">Parking</option>
                            <option value="Área Camper">Área Camper</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium">Precio por noche:</label>

                        <input
                            type="number"
                            name="pricePerNight"
                            value={form.pricePerNight}
                            placeholder="0€"
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>
                    <label className="font-medium">Imagen:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                                setImage(file);
                            }
                        }}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                name="quiet"
                                type="checkbox"
                                checked={form.quiet}
                                onChange={handleChange}
                            />
                            Silencioso
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                name="hasWater"
                                type="checkbox"
                                checked={form.hasWater}
                                onChange={handleChange}
                            />
                            Tiene agua
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                name="nearLake"
                                type="checkbox"
                                checked={form.nearLake}
                                onChange={handleChange}
                            />
                            Cerca de lagos
                        </label>
                    </div>

                    <TagsSelector form={form} setForm={setForm} />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#1E7A4B] py-3 font-medium text-white transition hover:bg-[#17613B]"
                    >
                        Crear lugar
                    </button>
                </form>
            </div>
        </div>
    );


}

