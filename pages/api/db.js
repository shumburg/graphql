import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db5018277516.hosting-data.io',
  user: 'dbu563873',
  password: 'crillion2024',
  database: 'dbs14491693',
  waitForConnections: true,
  connectionLimit: 10,
});


export default pool;