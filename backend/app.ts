import express from 'express'

import rateLimit from 'express-rate-limit'

import cors from 'cors'

import placesRoutes from './src/routes/places.js'


const app = express()


app.use(cors({
    origin: "https://smart-places-frontend.onrender.com"
}))

const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Demasiadas peticiones. Inténtalo más tarde.'
})


app.use(express.json())

app.use('/places/search', aiLimiter)

app.use('/places', placesRoutes)





export default app












/*

4. app.js

Aquí solo configuras Express:

import express from 'express';
import cors from 'cors';

import placesRoutes from './src/routes/places.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/places', placesRoutes);

export default app;


*/