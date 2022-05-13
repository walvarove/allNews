import { authenticateToken } from './../../middleware/auth.middleware';
import { UserController } from './controller';

const express = require('express');

const router = express.Router();

router.get('/profile', authenticateToken, UserController.profile);
router.post('/login', UserController.login);
// router.patch('/:id', updateUser)
// router.delete('/:id', deleteUser)

module.exports = router;

