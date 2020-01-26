const express = require('express');
const router = express.Router();

// @route  api/users
// @access Public
router.get('/', (req, res) => res.send('Users route'));

module.exports = router;
