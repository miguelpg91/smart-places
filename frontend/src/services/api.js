
export default async function searchPlaces(query) {
    const res = await fetch("http://localhost:3000/places/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    })

    return res.json()
}

