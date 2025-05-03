import express from 'express';
import {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
  searchContracts,
  getContractWithProjects,
} from '../controllers/Contracts.js';
import {
  createContractSchema,
  updateContractSchema,
  validateRequest,
} from '../validates/Contracts.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { hasRoleAdmin } from '../middlewares/Role.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  hasRoleAdmin,
  validateRequest(createContractSchema),
  createContract
);

router.get('/', authMiddleware, hasRoleAdmin, getContracts);

router.get('/details/:id', authMiddleware, hasRoleAdmin, getContractWithProjects);

router.get('/:id', authMiddleware, hasRoleAdmin, getContractById);

router.patch(
  '/:id',
  authMiddleware,
  hasRoleAdmin,
  validateRequest(updateContractSchema),
  updateContract
);

router.delete('/:id', authMiddleware, hasRoleAdmin, deleteContract);

router.post('/search-query', authMiddleware, hasRoleAdmin, searchContracts);

export default router;
