import express from 'express';
import { createAccountSchema, updateAccountSchema, validateRequest } from '../validates/Accounts.js';
import { createAccount, deleteAccount, getAccounts, getAccountById, updateAccount, searchAccounts } from '../controllers/Accounts.js';
const router = express.Router();

router.post('/', validateRequest(createAccountSchema), createAccount);
router.get('/', getAccounts);
router.patch('/:id', validateRequest(updateAccountSchema), updateAccount);
router.delete('/:id', deleteAccount);
router.get('/:id', getAccountById);
router.post('/search-query', searchAccounts);

export default router;