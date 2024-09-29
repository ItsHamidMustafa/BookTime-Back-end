const express = require('express');
const router = express.Router();
const { search, logSearch } = require('../controllers/searchController');
const requireAuth = require('../middleware/requireAuth');

router.get('/query', search);
router.post('/log', requireAuth, logSearch);

module.exports = router;