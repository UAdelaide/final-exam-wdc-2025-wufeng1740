var express = require('express');
var router = express.Router();
const db = require('../models/db');

router.get('/api/dogs', async function(req, res, next) {
  try {
    const row = await db.query(`
      SELECT d.name as dog_name, d.size, u.username as owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.status(200).json(row);
  } catch (err) {
      next(err);
  }
});