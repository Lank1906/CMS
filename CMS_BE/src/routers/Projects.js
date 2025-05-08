import express from 'express';
import {
  deleteProject,
  getProjectById,
  getProjects,
  projectCreate,
  restoreProject,
  searchProjects,
  updateProject,
} from '../controllers/Projects.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { hasRoleAdmin } from '../middlewares/Role.js';
const router = express.Router();

router.post('/create', authMiddleware, hasRoleAdmin, projectCreate);
router.get('/get', authMiddleware, hasRoleAdmin, getProjects);
router.patch('/update/:id', authMiddleware, hasRoleAdmin, updateProject);
router.get('/get-by-id/:id', authMiddleware, hasRoleAdmin, getProjectById);
router.post('/remove/:id', authMiddleware, hasRoleAdmin, deleteProject);
router.post('/restore/:id', authMiddleware, hasRoleAdmin, restoreProject);
router.post('/search', authMiddleware, hasRoleAdmin, searchProjects);

export default router;
