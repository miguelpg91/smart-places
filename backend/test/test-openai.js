import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
    const response = await openai.responses.create({
        model: "gpt-5.4-mini",
        input: `
Convierte esta búsqueda en un JSON.

Campos permitidos:
- province
- city
- type
- quiet
- hasWater
- nearLake
- tags

Tags permitidos:
- mirador
- senderismo
- pesca
- barbacoa
- picnic
- vistas
- atardecer
- amanecer
- baño
- mascotas

Búsqueda:
"Quiero un camping tranquilo junto a un lago con buenas vistas"
`
    });

    console.log(response.output_text);
}

test();