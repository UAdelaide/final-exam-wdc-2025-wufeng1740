require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [rows, fields] = await connection.execute(sql, params);
    await connection.commit();
    return rows;
  } catch (err) {
    if (connection) {
      try { await connection.rollback(); } catch (rollbackErr) { /* empty */ }
    }
    console.error('❌ SQL Execution Error:', err.message);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  query,
  pool
};