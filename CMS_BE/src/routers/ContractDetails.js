import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { hasRoleAdmin } from '../middlewares/Role.js';
import {
  getContractById,
  getContractStaffByContractId,
  addContractStaff,
  softDeleteContractStaff,
  getAllContractRoles,
  getUsers,
  getUserLatestRole,
  searchUsers,
} from '../controllers/ContractDetails.js';

const router = express.Router();

router.use(authMiddleware, hasRoleAdmin);

router.get('/search-users', searchUsers);
router.get('/users', getUsers);
router.get('/roles/all', getAllContractRoles);
router.get('/latest-role/:userId', getUserLatestRole);
router.delete('/staffs/:id', softDeleteContractStaff);
router.post('/:id/staffs', addContractStaff);
router.get('/:id/staffs', getContractStaffByContractId);
router.get('/:id', getContractById);

export default router;
