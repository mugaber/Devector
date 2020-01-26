const express = require('express');
const router = express.Router();

// @route  api/posts
// @access Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
