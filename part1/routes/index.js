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
      SELECT request_id, d.name as dog_name, wr.requested_time, duration_minutes, wr.location, u.username as owner_username
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

// Return a summary of each walker with their average rating and number of completed walks.
  // {
  //   "walker_username": "bobwalker",
  //   "total_ratings": 2,
  //   "average_rating": 4.5,
  //   "completed_walks": 2
  // },
router.get('/api/walkers/summary', async function(req, res, next) {
  try {
    const row = await db.query(`
      SELECT u.username as walker_username,
             COUNT(r.rating) as total_ratings,
             AVG(r.rating) as average_rating,
             COUNT(w.request_id) as completed_walks
      FROM WalkRatings r
      LEFT JOIN Users u ON u.user_id = r.walker_id
      LEFT JOIN WalkRequests w ON w.request_id = w.request_id AND w.status = 'completed'
      WHERE u.role = 'walker'
      GROUP BY r.walker_id
    `);
    res.status(200).json(row);
  } catch (err) {
      next(err);
  }
});

module.exports = router;
