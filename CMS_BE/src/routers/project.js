import express from 'express';
import { updateProjectStatus } from '../controllers/ProjectController.js';
import { isAdmin } from '../middlewares/role.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.put('/:id/status', authMiddleware, isAdmin, updateProjectStatus);

export default router;
