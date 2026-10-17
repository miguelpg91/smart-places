import type { Request, Response, NextFunction } from "express"
import pool from "../db/connection.js"
import aiService from "../services/aiService.js"

import summaryPrompt from "../services/summaryPrompt.js"

type PlaceType =
    | "Camping"
    | "Parking"
    | "Área Camper"
    | "Área de autocaravanas"
    | "Lugar libre"


type SearchFilters = {
    province?: string
    city?: string
    type?: PlaceType

    hasWater?: boolean
    hasToilet?: boolean
    hasShower?: boolean
    quiet?: boolean

    nearBeach?: boolean
    nearLake?: boolean
    nearRiver?: boolean
    nearMountain?: boolean
    forest?: boolean

    tags?: string[]

    priceMax?: number

    region?: "norte" | "sur" | "este" | "oeste"
}

type SearchRequestDTO = {
    query: string
}

const regions = {
    norte: ["Asturias", "Galicia", "Cantabria"]
}


export async function searchPlaces(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {

    try {

        const { query } = req.body as SearchRequestDTO

        const filters: SearchFilters = await aiService(query)      ///Envia el texto a la IA


        let conditions: string[] = []                         ///Guardará las condiciones SQL que entran en juego en la consulta
        let values: (string | number | boolean | string[])[] = []                             ///Guardará el valor de esas condiciones

        let index = 1                               ///Si aparece la primera condición, usará $1

        // JS: camelCase (filters.hasWater) → PostgreSQL: snake_case (has_water)

        if (filters.province) {
            conditions.push(`LOWER(province) = LOWER($${index})`)     //province = $1
            values.push(filters.province)
            index++                                     ///prepara el número para la SIGUIENTE condición
        }

        if (filters.city) {
            conditions.push(`LOWER(city) = LOWER($${index})`)
            values.push(filters.city)
            index++
        }

        if (filters.type) {
            conditions.push(`LOWER(type) = LOWER($${index})`)          ///Añade esa condición SQL: "type = $1"
            values.push(filters.type)                   //// Añade el valor: "Camping"
            index++
        }

        if (filters.hasWater) {
            conditions.push(`has_water = $${index}`)
            values.push(true)                           ////Al ser boolean añade el valor: true
            index++
        }

        if (filters.quiet) {
            conditions.push(`quiet = $${index}`)
            values.push(true)
            index++
        }


        if (filters.nearLake) {
            conditions.push(`near_lake = $${index}`)
            values.push(true)
            index++
        }



        //@> buscar dentro de un array
        /*
                if (filters.tags) {
                    conditions.forEach(
                        conditions.push(`tags @> ARRAY[$${index}]`)
                    values.push(filters.tags[0])
                    index++
                    )
                }
        
        */

        if (filters.tags) {
            filters.tags.forEach(tag => {
                conditions.push(`tags @> ARRAY[$${index}]`)
                values.push(tag)
                index++;
            })
        }


        ///Filter (no está en la db)

        if (filters.priceMax) {
            conditions.push(`price_per_night <= $${index}`)
            values.push(filters.priceMax)
            index++
        }

        /// REGIONES

        if (filters.region && filters.region in regions) {
            // Si hay una región y existe en el objeto regions...
            conditions.push(`LOWER(province) = ANY($${index})`)
            // Añade a conditions una condición SQL para buscar cualquier provincia de esa región.

            values.push(
                regions[filters.region as keyof typeof regions].map(p => p.toLowerCase()))
            // Añade a values la lista de provincias correspondiente a esa región.

            index++
            // Aumenta el contador para el siguiente marcador SQL.
        }



        ///SI NO HAY FILTROS

        if (conditions.length === 0) {
            res.json([])
            return
        }

        console.log(filters);
        ///sql → la consulta completa construida.

        ///AND → deben cumplirse todas las condiciones.
        ///OR → basta con que se cumpla una de las condiciones.

        const sql = `
            SELECT *
            FROM places
            WHERE ${conditions.join(" AND ")}    
        `

        console.log(sql);
        console.log(values);

        const result = await pool.query(sql, values)    ///// Ejecuta la consulta SQL sustituyendo los placeholders ($1, $2...) por los valores del array `values`


        const places = result.rows              ///Respuesta 1

        const summary = await summaryPrompt(places)     ///Respuesta 2


        res.json({
            places,
            summary
        })

    } catch (error) {
        next(error)
    }

}




/*NO HARIA FALTA
        if (filters.pricePerNight) {                        ///El usuario casi nunca escribe: "Quiero un camping que cueste exactamente 20 €."
            conditions.push(`pricePerNight= $${index}`)
            values.push(filters.pricePerNight)
            index++
        }

        Ya tendriamos el 
*/