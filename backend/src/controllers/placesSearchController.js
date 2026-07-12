import pool from "../db/connection.js"
import aiService from "../services/aiService.js"

import summaryPrompt from "../services/summaryPrompt.js"

export async function searchPlaces(req, res, next) {

    try {

        const { query } = req.body

        const filters = await aiService(query)      ///Envia el texto a la IA

        console.log(filters);

        let conditions = []                         ///Guardará las condiciones SQL que entran en juego en la consulta
        let values = []                             ///Guardará el valor de esas condiciones

        let index = 1                               ///Si aparece la primera condición, usará $1

        // JS: camelCase (filters.hasWater) → PostgreSQL: snake_case (has_water)

        if (filters.province) {
            conditions.push(`province = $${index}`)     //province = $1
            values.push(filters.province)
            index++                                     ///prepara el número para la SIGUIENTE condición
        }

        if (filters.city) {
            conditions.push(`city = $${index}`)
            values.push(filters.city)
            index++
        }

        if (filters.type) {
            conditions.push(`type = $${index}`)          ///Añade esa condición SQL: "type = $1"
            values.push(filters.type)                   //// Añade el valor: "Camping"
            index++
        }

        if (filters.hasWater) {
            conditions.push(`has_water = $${index}`)
            values.push(true)                           ////Al ser boolean añade el valor: true
            index++
        }

        if (filters.hasToilet) {
            conditions.push(`has_toilet = $${index}`)
            values.push(true)
            index++
        }

        if (filters.hasShower) {
            conditions.push(`has_shower = $${index}`)
            values.push(true)
            index++
        }

        if (filters.quiet) {
            conditions.push(`quiet = $${index}`)
            values.push(true)
            index++
        }

        if (filters.nearBeach) {
            conditions.push(`near_beach = $${index}`)
            values.push(true)
            index++
        }

        if (filters.nearLake) {
            conditions.push(`near_lake = $${index}`)
            values.push(true)
            index++
        }

        if (filters.nearRiver) {
            conditions.push(`near_river = $${index}`)
            values.push(true)
            index++
        }

        if (filters.nearMountain) {
            conditions.push(`near_mountain = $${index}`)
            values.push(true)
            index++
        }

        if (filters.forest) {
            conditions.push(`forest = $${index}`)
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

        ///SI NO HAY FILTROS

        if (conditions.length === 0) {
            return res.json([])
        }

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