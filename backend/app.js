
import express from 'express'

import cors from 'cors'

const app = express()

import placesRoutes from './src/routes/places.js'


app.use(cors())     ///???

app.use(express.json())

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