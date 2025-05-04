import express from 'express';
import {
  deleteProject,
  getProjectById,
  getProjects,
  projectCreate,
  searchProjects,
  updateProject,
} from '../controllers/Projects.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { hasRoleAdmin } from '../middlewares/Role.js';
const router = express.Router();

router.post('/', authMiddleware, hasRoleAdmin, projectCreate);
router.get('/', authMiddleware, hasRoleAdmin, getProjects);
router.patch('/:id', authMiddleware, hasRoleAdmin, updateProject);
router.get('/:id', authMiddleware, hasRoleAdmin, getProjectById);
router.delete('/:id', authMiddleware, hasRoleAdmin, deleteProject);
router.post('/search', authMiddleware, hasRoleAdmin, searchProjects);

export default router;
