const express = require('express');
const router = express.Router();

// @route  api/profile
// @access Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
