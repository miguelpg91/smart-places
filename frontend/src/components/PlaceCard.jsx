


export default function PlaceCard({ place }) {

    return (
        <>

            <div className="border-2 border-gray-200 rounded-2xl border-3">


                <img
                    src="https://picsum.photos/400/250"
                    alt={place.title}
                    className=" object-cover rounded-t-xl"
                />

                <h3>{place.title}</h3>

                <p className="info">
                    {place.city},{place.province}
                </p>
                <div>
                    <p>
                        {place.tags.map(tag => (
                            <span key={tag} className="tag">
                                {tag}
                            </span>
                        ))}
                    </p>
                </div>
                <p className="info">
                    {place.description}
                </p>

                <p className="info">
                    Tipo: {place.type}
                </p>

            </div>

        </>
    )


}