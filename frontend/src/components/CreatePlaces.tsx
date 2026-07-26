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
    tags: string[]
}

export default function createPlaces() {

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
            [name]: name === "pricePerNight"
                ? Number(value)                     ///convierte en numero
                : value
        })

    }


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault()

        const data = await createPlace(form)
    }


    return (

        <div className="createForm">
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={form.title}
                    placeholder="title"
                    onChange={handleChange}
                />
                <input
                    name="description"
                    value={form.description}
                    placeholder="description"
                    onChange={handleChange}
                />
                <input
                    name="province"
                    value={form.province}
                    placeholder="province"
                    onChange={handleChange}
                />
                <input
                    name="city"
                    value={form.city}
                    placeholder="city"
                    onChange={handleChange}
                />
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="">Selecciona un tipo</option>
                    <option value="camping">Camping</option>
                    <option value="area-autocaravanas">Área de autocaravanas</option>
                    <option value="lugar-libre">Lugar libre</option>
                </select>
                <input
                    type="number"
                    name="pricePerNight"
                    value={form.pricePerNight}
                    placeholder="pricePerNight"
                    onChange={handleChange}
                />

                <div className="checkboxes">

                    <label>
                        <input
                            name="quiet"
                            type="checkbox"
                            checked={form.quiet}
                            onChange={handleChange}
                        />
                        Quiet
                    </label>

                    <label>
                        <input
                            name="hasWater"
                            type="checkbox"
                            checked={form.hasWater}
                            onChange={handleChange}
                        />
                        Has water
                    </label>
                    <label>
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

                <button type="submit">
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