var express = require('express');
var router = express.Router();
const db = require("./db.js"); // Import the database module

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', async function(req, res, next) {

});

router.get('/api/walkrequests/open', async function(req, res, next) {

});

router.get('/api/walkers/summary', async function(req, res, next) {

});

module.exports = router;
