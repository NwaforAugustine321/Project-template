const express = require('express');
const { registerUser } = require('../UserServices/user');

const router = express.Router();

router.post('/users', registerUser);

module.exports = router;
