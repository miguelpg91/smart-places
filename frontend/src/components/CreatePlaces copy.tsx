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
        <div className="min-h-screen ">

            {/* Cabecera con imagen y degradado */}
            <div
                className="relative bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/background-image-2.png')",
                }}
            >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

                <div className="relative mx-auto max-w-6xl px-6 pb-16 text-white">
                    <Navbar />

                    <div className="px-4 pt-8">
                        <h1 className="pb-4 text-4xl font-bold">
                            Añade un nuevo lugar
                        </h1>

                        <p className="max-w-2xl">
                            Crea un lugar y ayuda a la comunidad a descubrir nuevos rincones que visitar.
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="mx-auto max-w-6xl px-4 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-8 lg:grid-cols-[1.5fr_1fr]"
                >
                    {/* Datos del lugar */}
                    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Información del lugar
                            </h2>

                            <input
                                name="title"
                                value={form.title}
                                placeholder="Título"
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                            />

                            <textarea
                                name="description"
                                value={form.description}
                                placeholder="Descripción"
                                onChange={handleChange}
                                rows={4}
                                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    name="province"
                                    value={form.province}
                                    placeholder="Provincia"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />

                                <input
                                    name="city"
                                    value={form.city}
                                    placeholder="Ciudad"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    name="latitude"
                                    value={form.latitude}
                                    placeholder="Latitud"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />

                                <input
                                    name="longitude"
                                    value={form.longitude}
                                    placeholder="Longitud"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>

                            <p className="text-sm text-gray-500">
                                Las coordenadas permiten situar el lugar en el mapa.
                            </p>
                        </section>

                        <section className="space-y-4 border-t border-gray-100 pt-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Tipo y precio
                            </h2>

                            <div className="flex flex-col gap-1">
                                <label className="font-medium text-gray-700">
                                    Tipo de lugar
                                </label>

                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                >
                                    <option value="">Selecciona un tipo</option>
                                    <option value="camping">Camping</option>
                                    <option value="area-autocaravanas">Área de autocaravanas</option>
                                    <option value="lugar-libre">Lugar libre</option>
                                    <option value="parking">Parking</option>
                                    <option value="area-camper">Área camper</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-medium text-gray-700">
                                    Precio por noche (€)
                                </label>

                                <input
                                    type="number"
                                    name="pricePerNight"
                                    value={form.pricePerNight}
                                    placeholder="0"
                                    min="0"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                />
                            </div>
                        </section>

                        <section className="space-y-4 border-t border-gray-100 pt-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Características
                            </h2>

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

                            <TagsSelector
                                form={form}
                                setForm={setForm}
                            />
                        </section>
                    </div>

                    {/* Imagen y vista previa */}
                    <div className="space-y-6">
                        <section className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Fotografía
                            </h2>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (file) {
                                        setImage(file);
                                    }
                                }}
                                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                            />
                        </section>

                        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <h2 className="font-semibold text-gray-900">
                                    Vista previa
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Así se mostrará tu lugar.
                                </p>
                            </div>

                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Vista previa del lugar"
                                    className="h-48 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-400">
                                    Selecciona una fotografía
                                </div>
                            )}

                            <div className="space-y-3 p-5">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {form.title || "Nombre del lugar"}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {[form.city, form.province].filter(Boolean).join(", ") ||
                                        "Ciudad y provincia"}
                                </p>

                                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                                    {form.description || "Aquí aparecerá la descripción del lugar."}
                                </p>

                                <p className="font-semibold text-gray-900">
                                    {form.pricePerNight !== ""
                                        ? `${form.pricePerNight} € / noche`
                                        : "Precio no indicado"}
                                </p>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#1E7A4B] px-6 py-3 font-semibold text-white transition hover:bg-[#17613B]"
                        >
                            Crear lugar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


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