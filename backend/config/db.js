import mysql from 'mysql2/promise';
import process from 'process';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'wiman',
    port: process.env.MYSQL_PORT || 3306,
});

export default pool;
