
// get the client

import mysql from 'mysql2/promise'
require('dotenv').config()

// create the connection to database
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
});

// const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'nodejsbasic' });

export default pool
