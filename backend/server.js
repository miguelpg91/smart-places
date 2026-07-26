import 'dotenv/config';
import app from './app.ts';
import pool from './src/db/connection.ts';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await pool.query('SELECT NOW()');
        console.log('PostgreSQL connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Database connection error:', error);
    }
}

startServer();


/*

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


*/