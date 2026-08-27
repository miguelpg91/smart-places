import express from 'express'
import type { Request, Response, NextFunction } from "express"
import pool from '../db/connection.js'          //objeto que nos permite comunicarnos con PostgreSQL
import { searchPlaces } from '../controllers/placesSearchController.js'

import upload from '../middlewares/upload.js'
import cloudinary from '../services/cloudinary.js'

const router = express.Router()

interface Place {
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

router.get(
    '/',
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const result = await pool.query(
                `SELECT * FROM places `                 ///no hace falta RETURNING porque ya viene implicito en SLECT
            )
            res.json(result.rows)                   ///significa que esperamos una respuesta de varios elementos

        } catch (error) {
            next(error)
        }
    })

//$1, $2, ...Son placeholders (parámetros) de PostgreSQL.

router.post('/',
    upload.single("image"),                 ///Multer recoge la foto y la deja disponible como: req.file(como req.body pero de archivos)
    async (
        req: Request<{}, {}, Place>,        ///?????
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const {
            title,
            description,
            province,
            city,
            type,
            pricePerNight,
            quiet,
            hasWater,
            nearLake,
            latitude,
            longitude,
            tags
        } = req.body

        const parsedTags = tags ? JSON.parse(tags) : []

        let image_url = null


        // 2. Comprobamos si el usuario ha enviado una imagen
        if (req.file) {

            // 3. Enviamos la imagen de Multer a Cloudinary
            const result = await new Promise<any>((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "smart-places"
                    },

                    (error, result) => {

                        if (error) {
                            reject(error)
                        } else {
                            resolve(result)
                        }

                    }
                )

                stream.end(req.file.buffer)
            })


            // 4. Cloudinary nos devuelve la URL
            image_url = result.secure_url
        }


        try {
            const result = await pool.query(
                `INSERT INTO places(
            title,
            description,
            province,
            city,
            type,
            price_per_night,
            quiet,
            has_water,
            near_lake,
            latitude,
            longitude,
            tags,
            image_url
            )
            VALUES(
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
            )
            RETURNING *`,
                [
                    title,
                    description,
                    province,
                    city,
                    type,
                    pricePerNight,
                    quiet,
                    hasWater,
                    nearLake,
                    latitude,
                    longitude,
                    parsedTags,
                    image_url
                ]
            )

            res.status(201).json(result.rows[0])

        } catch (error) {
            next(error)
        }
    })


router.put('/:id', async (
    req: Request<{}, {}, Place>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const {
        title,
        description,
        province,
        city,
        type,
        pricePerNight,
        quiet,
        hasWater,
        nearLake,
        latitude,
        longitude,
        tags
    } = req.body
    try {
        const result = await pool.query(
            `SELECT * FROM places
            WHERE id= $1`,
            [req.params.id])

        if (!result.rows[0]) {
            return res.status(404).json({
                error: 'Place doesn´t exist'
            })
        }

        const editPlaces = await pool.query(
            `UPDATE places
             SET
            title = $1,
            description = $2,
            province = $3,
            city = $4,
            type = $5,
            price_per_night = $6,
            quiet = $7,
            has_water = $8,
            near_lake = $9,
            latitude = $10,
            longitude = $11,
            tags = $12
            WHERE id = $13
            RETURNING *`,
            [
                title,
                description,
                province,
                city,
                type,
                pricePerNight,
                quiet,
                hasWater,
                nearLake,
                latitude,
                longitude,
                tags,
                req.params.id
            ]
        )

        res.json(editPlaces.rows[0])

    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const result = await pool.query(
            `DELETE FROM places
             WHERE id=$1
            RETURNING *`,
            [req.params.id])

        if (!result.rows[0]) {
            res.status(404).json({
                error: 'Place doesn´t exist'
            })

            return
        }

        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
})



router.post('/search', searchPlaces)



export default router




/*

title
province
city
type
price_per_night
quiet
has_water
near_lake
tags

*/