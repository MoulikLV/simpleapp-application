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
        trustServerCertificate: false 
    }
};


sql.connect(dbConfig, (err) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Connected to the database successfully!');
        alert('Succesfully connected to SQL Database')
    }
});


app.get('/', (req, res) => {
    res.send('Hello, World! Your app is running.');
    alert('Your application working correctly')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
