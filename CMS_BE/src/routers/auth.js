import express from 'express';
import { validateRegister } from '../middlewares/validateRegister.js';
import { registerUser, confirmAccount } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.get('/confirm', confirmAccount);

export default router;