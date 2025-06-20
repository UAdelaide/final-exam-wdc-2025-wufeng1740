const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
var fs = require('fs');
const db = require("./db.js"); // Import the database module

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

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

// Setup for session and cookie ------------------------------------------
// Cookie parser middleware
app.use(cookieParser());
// Session middleware
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hour
  }
}));

// Routes -------------------------------------------
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const indexRoutes = require('./routes/userRoutes');
app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;