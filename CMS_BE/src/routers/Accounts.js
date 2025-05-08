import express from 'express';
import { createAccountSchema, updateAccountSchema } from '../validates/Accounts.js';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  searchAccounts,
  getAccountWithProjects,
} from '../controllers/Accounts.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { hasRoleAdmin } from '../middlewares/Role.js';
import { validateRequest } from '../services/Validates.js';
const router = express.Router();

router.post('/', authMiddleware, hasRoleAdmin, validateRequest(createAccountSchema), createAccount);
router.get('/', authMiddleware, hasRoleAdmin, getAccounts);
router.get('/details/:id', getAccountWithProjects);
router.patch(
  '/:id',
  authMiddleware,
  hasRoleAdmin,
  validateRequest(updateAccountSchema),
  updateAccount
);
router.delete('/:id', authMiddleware, hasRoleAdmin, deleteAccount);
router.get('/:id', authMiddleware, hasRoleAdmin, getAccountById);
router.post('/search-query', authMiddleware, hasRoleAdmin, searchAccounts);

export default router;
