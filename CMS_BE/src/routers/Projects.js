import express from 'express';
import {
  deleteProject,
  getProjectById,
  getProjects,
  projectCreate,
  searchProjects,
  updateProject,
} from '../controllers/Projects.js';
const router = express.Router();

router.post('/', projectCreate);
router.get('/', getProjects);
router.patch('/:id', updateProject);
router.get('/:id', getProjectById);
router.delete('/:id', deleteProject);
router.post('/search', searchProjects);

export default router;
