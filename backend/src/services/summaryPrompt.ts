import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//el primer prompt recoge un string que viene del frontend, y el segundo(ESTE) recoje un array de objetos que son los resultados

type Place = {
    id: number
    title: string
    description: string
    province: string
    city: string
    type: string
    pricePerNight?: number
    quiet?: boolean
    hasWater?: boolean
    nearLake?: boolean
    latitude?: number
    longitude?: number
    tags?: string[]
}


export default async function summaryPrompt(places: Place[]): Promise<string> {

    try {

        const prompt =
            `Eres un asistente de viajes.

Escribe un breve resumen (máximo 2 frases).

No enumeres todos los lugares.

No repitas exactamente la información de las tarjetas.

Explica de forma natural por qué estos resultados pueden encajar con la búsqueda.

Habla directamente al usuario.

Si hay varios resultados similares, resúmelos en conjunto.

            Lugares:

            ${JSON.stringify(places)}`


        const response = await openai.responses.create({
            model: "gpt-5.4-mini",
            input: prompt
        })

        return response.output_text    ///Convierte la respuesta de la IA de texto a objeto 



    } catch (error) {

        throw error
    }


}