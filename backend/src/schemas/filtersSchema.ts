import { z } from "zod"

export const filtersSchema = z.object({
    province: z.string().optional(),
    city: z.string().optional(),

    type: z.enum([
        "Camping",
        "Parking",
        "Área Camper",
        "Área de autocaravanas",
        "Lugar libre"
    ]).optional(),

    quiet: z.boolean().optional(),
    hasWater: z.boolean().optional(),
    nearLake: z.boolean().optional(),

    tags: z.array(z.enum([
        "lago",
        "montaña",
        "senderismo",
        "pesca",
        "mirador",
        "vistas",
        "baño",
        "mascotas",
        "amanecer",
        "atardecer",
        "picnic",
        "barbacoa"
    ])).optional(),
    priceMax: z.number().positive().optional(),

})



/*


Sustituye esta línea:

    const filters: Filters = JSON.parse(response.output_text)

por:

    const parsed: unknown = JSON.parse(response.output_text)
    const filters = filtersSchema.parse(parsed)

    return filters

*/