import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7791714',
  password: 'SRVWzfyZn2',
  database: 'sql7791714',
  waitForConnections: true,
  connectionLimit: 10,
});


export default pool;