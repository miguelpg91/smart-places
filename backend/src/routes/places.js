import express from 'express'

import pool from '../db/connection.js'
import { searchPlaces } from '../controllers/placesSearchController.js'

const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT * FROM places `                 ///no hace falta RETURNING porque ya viene implicito en SLECT
        )
        res.json(result.rows)

    } catch (error) {
        next(error)
    }
})

//$1, $2, ...Son placeholders (parámetros) de PostgreSQL.

router.post('/', async (req, res, next) => {
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
            tags
            )
            VALUES(
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
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
                tags
            ]
        )

        res.status(201).json(result.rows[0])

    } catch (error) {
        next(error)
    }
})


router.put('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
    try {

        const result = await pool.query(
            `DELETE FROM places
             WHERE id=$1
            RETURNING *`,
            [req.params.id])

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