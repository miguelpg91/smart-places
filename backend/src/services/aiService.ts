import OpenAI from "openai"


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type Filters = {
    province?: string
    city?: string
    type?: string
    quiet?: boolean
    hasWater?: boolean
    nearLake?: boolean
    tags?: string[]
    priceMax?: number
}


export default async function aiService(query: string): Promise<Filters> {

    try {
        const prompt = `
Eres un asistente que convierte búsquedas de usuarios en filtros JSON.

Devuelve únicamente un JSON válido.

Campos de la base de datos:

- province
- city
- type
- quiet
- hasWater
- nearLake
- tags

Tipos permitidos:

- Camping
- Parking
- Área Camper
- Área de autocaravanas
- Lugar libre

Tags permitidos:

- lago
- río
- montaña
- bosque
- playa
- senderismo
- ciclismo
- pesca
- mirador
- vistas
- baño
- mascotas
- esquí
- amanecer
- atardecer
- picnic
- barbacoa
- familiar

Filtros permitidos:

- priceMax

Sinónimos:

- trekking → senderismo
- excursión → senderismo
- ruta → senderismo
- caminar → senderismo

- perro → mascotas
- perros → mascotas
- mascota → mascotas
- pet friendly → mascotas

- nadar → baño
- bañarse → baño

- embalse → lago
- pantano → lago

- nieve → esquí
- esquiar → esquí

- comer → picnic
- merendero → picnic

- pescar → pesca

Reglas:

- Si el usuario menciona un tipo de lugar, rellena el campo "type".
- Si menciona actividades o características, añádelas al array "tags".
- Si el usuario menciona varios tags, devuélvelos todos en el array "tags".
- Si menciona un precio máximo, devuelve "priceMax".
- No devuelvas campos con valor false.
- No devuelvas arrays vacíos.
- No inventes campos distintos de los indicados.
- Devuelve únicamente un JSON válido.

Ejemplos:

Usuario:
"Quiero un camping tranquilo"

↓

{
  "type": "Camping",
  "quiet": true
}

Usuario:
"Parking junto a un embalse con vistas"

↓

{
  "type": "Parking",
  "nearLake": true,
  "tags": ["vistas"]
}

Usuario:
"Camping para ir con mi perro y hacer trekking"

↓

{
  "type": "Camping",
  "tags": ["mascotas", "senderismo"]
}

Usuario:

"${query}"
`

        const response = await openai.responses.create({
            model: "gpt-5.4-mini",
            input: prompt
        })

        const filters: Filters = JSON.parse(response.output_text)    ///Convierte la respuesta de la IA de texto a objeto 

        return filters          //// Devuelve ese objeto al controller

    } catch (error) {
        throw error
    }
}







/*

Este proyecto: 

-Prompt: 200–500 tokens.
-Consulta del usuario: 10–30 tokens.
-Respuesta JSON: 20–80 tokens.

TOTAL: 300–600 tokens/busqueda

*/