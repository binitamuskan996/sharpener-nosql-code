const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/add-user', userController.postAddUser);
router.get('/user/:userId', userController.getUser);

module.exports = router;