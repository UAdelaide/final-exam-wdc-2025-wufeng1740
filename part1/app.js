var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
const db = require(".db.js"); // Import the database module

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function runSQLFile(filename) {
  const filePath = path.join(__dirname, filename);
  const sql = fs.readFileSync(filePath, 'utf-8');

  // Split on semicolon + newline to separate commands (you may need to tweak this)
  const statements = sql
    .split(/;\s*[\r\n]+/)
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  try {
    for (const statement of statements) {
      console.log(`Running SQL: ${statement}`);
      await db.query(statement);
    }
    console.log('✅ SQL file executed successfully.');
  } catch (err) {
    console.error('❌ Error executing SQL file:', err.message);
  } finally {
    await db.pool.end(); // close the connection pool
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
