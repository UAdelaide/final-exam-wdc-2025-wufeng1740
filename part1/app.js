var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
const db = require("./db.js"); // Import the database module

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database Initialization --------------------------------------------------------
// ChatGPT suggested a way to run SQL files to initialize the database.
async function runSQLFile(filename) {
  const filePath = path.join(__dirname, filename);
  const sql = fs.readFileSync(filePath, 'utf-8');

  // Split on semicolon + newline to separate commands (you may need to tweak this)
  const statements = sql
    .split(/;\s*[\r\n]+/)
        // Split by semicolon followed by optional whitespace and newline
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  try {
    for (const statement of statements) {
    //   console.log(`Running SQL: ${statement}`);
      await db.rawQuery(statement);
    }
    console.log(`✅ SQL file ${filename} executed successfully.`);
  } catch (err) {
    console.error(`❌ Error executing SQL file ${filename}:`, err.message);
  }
}

// database initialization
async function initDatabase() {
  await runSQLFile('dogwalks.sql');
  await runSQLFile('test_data.sql');
}

initDatabase();
// --------------------------------------------------------------------------

// Error handling middleware in app.js
app.use(function(err, req, res, next) {
  console.error('❌ Error:', err.stack || err.message || err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
