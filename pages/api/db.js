import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db5018277516.hosting-data.io', // 'sql7.freesqldatabase.com',
  user: 'dbu563873', // 'sql7791714',
  password: 'sql7791714', // 'SRVWzfyZn2',
  database: 'dbs14491693', // 'sql7791714',
  waitForConnections: true,
  connectionLimit: 10,
});


export default pool;