import express from 'express';
import {
  updateUserById,
  deactivateUserById,
  searchUsers,
  getAllUsers,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { hasRoleAdmin } from '../middlewares/Role.js';
const router = express.Router();

router.put('/updateUser/:id', authMiddleware, hasRoleAdmin, updateUserById);
router.put('/deactivateUserById/:id', authMiddleware, hasRoleAdmin, deactivateUserById);
router.get('/searchUser', authMiddleware, hasRoleAdmin, searchUsers);
router.get('/getAllUsers', authMiddleware, hasRoleAdmin, getAllUsers);

export default router;
