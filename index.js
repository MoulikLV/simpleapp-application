const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Database configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: false // Adjust if necessary
    }
};

const connectionString = process.env.DB_CONNECTION_STRING;

sql.connect(connectionString)
    .then(() => {
        console.log('Connected to the database successfully!');
    })
    .catch(err => {
        console.error('Database connection failed: ', err);
    });


// Connect to the database
// sql.connect(dbConfig)
//     .then(() => {
//         console.log('Connected to the database successfully!');
//     })
//     .catch(err => {
//         console.error('Database connection failed: ', err);
//     });

app.get('/', (req, res) => {
    res.send('Hello, World! Your app is running.');
});

app.get('/debug', (req, res) => {
    res.send({
        // DB_USER: process.env.DB_USER,
        // DB_PASS: process.env.DB_PASS,
        // DB_HOST: process.env.DB_HOST,
        // DB_NAME: process.env.DB_NAME,
        DB_STRING:process.env.DB_CONNECTION_STRING
    });
});

app.get('/test-db', async (req, res) => {
    try {
        const result = await sql.query`SELECT 1 AS Test`;
        res.send('Database connection is successful: ' + JSON.stringify(result.recordset));
    } catch (err) {
        res.status(500).send('Database connection failed: ' + err.message);
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
