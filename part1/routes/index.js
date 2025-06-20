var express = require('express');
var router = express.Router();
const db = require("../db.js"); // Import the database module

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Return a list of all dogs with their size and owner's username.
  // {
  //   "dog_name": "Max",
  //   "size": "medium",
  //   "owner_username": "alice123"
  // },
router.get('/api/dogs', async function(req, res, next) {
  try {
    const row = await db.query(`
      SELECT d.name as dog_name, d.size, u.username as owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(row);
  } catch (err) {
      next(err);
  }
});

// Return all open walk requests, including the dog name, requested time, location, and owner's username.
  // {
  //   "request_id": 1,
  //   "dog_name": "Max",
  //   "requested_time": "2025-06-10T08:00:00.000Z",
  //   "duration_minutes": 30,
  //   "location": "Parklands",
  //   "owner_username": "alice123"
  // }
router.get('/api/walkrequests/open', async function(req, res, next) {
    try {
    const row = await db.query(`
      SELECT request_id, d.name as dog_name, wr.requested_time, wr.location, u.username as owner_username
      FROM WalkRequests wr
      JOIN Dogs d ON wr.dog_id = d.dog_id
      JOIN Users u ON d.owner_id = u.user_id
      WHERE wr.status = 'open'
    `);
    res.json(row);
  } catch (err) {
      next(err);
  }
});

router.get('/api/walkers/summary', async function(req, res, next) {

});

module.exports = router;
