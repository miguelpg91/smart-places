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
    hasToilet: z.boolean().optional(),
    hasShower: z.boolean().optional(),
    nearBeach: z.boolean().optional(),
    nearRiver: z.boolean().optional(),
    nearMountain: z.boolean().optional(),
    forest: z.boolean().optional(),

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
    region: z.enum([
        "norte",
        "sur",
        "este",
        "oeste"
    ]).optional()
})



