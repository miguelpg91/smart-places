

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


type Props = {
    form: Place
    setForm: React.Dispatch<React.SetStateAction<Place>>
}


export default function TagsSelector({ form, setForm }: Props) {

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.checked) {     ///Si el checkbox está marcado...
            setForm({
                ...form,
                tags: [...form.tags, e.target.value]
            })
        } else {
            setForm({
                ...form,
                tags: form.tags.filter(tag => tag !== e.target.value)
            })
        }

        ///e.target.checked: es un booleano, check / unchecked

    }


    return (
        <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
                <input type="checkbox"
                    value="mirador"
                    onChange={handleTags} />
                Mirador
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="senderismo"
                    onChange={handleTags} />
                Senderismo
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="pesca"
                    onChange={handleTags} />
                Pesca
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="barbacoa"
                    onChange={handleTags} />
                Barbacoa
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="picnic"
                    onChange={handleTags} />
                Picnic
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="vistas"
                    onChange={handleTags} />
                Vistas
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="atardecer"
                    onChange={handleTags} />
                Atardecer
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="amanecer"
                    onChange={handleTags} />
                Amanecer
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="baño"
                    onChange={handleTags} />
                Baño
            </label>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    value="mascotas"
                    onChange={handleTags} />
                Mascotas
            </label>

            <label className="flex items-center gap-2">
                <input type="checkbox" value="lago" onChange={handleTags} />
                Lago
            </label>

            <label className="flex items-center gap-2">
                <input type="checkbox" value="montaña" onChange={handleTags} />
                Montaña
            </label>
        </div>

    )
}

/*


Lago
Río
Playa
Montaña
Bosque
Mirador
Senderismo
Ciclismo
Pesca
Familiar
Barbacoa
Sombra
Atardecer
Amanecer
Fotografía


*/