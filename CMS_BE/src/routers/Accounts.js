import express from 'express';
import { createAccountSchema, validateRequest } from '../validates/Accounts.js';
import { createAccount, deleteAccount, getAccounts, getAccountById, updateAccount } from '../controllers/Accounts.js';
const router = express.Router();

router.post('/', validateRequest(createAccountSchema), createAccount);
router.get('/', getAccounts);
router.patch('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.get('/:id', getAccountById);

export default router;