import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import process from 'process';
dotenv.config({ path: '.env.local' });

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'wiman',
  port: process.env.MYSQL_PORT || 3306,
});

pool
  .getConnection()
  .then((connection) => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to MySQL database:', err.message);
  });

export default pool;
