import {
  findContractById,
  findContractStaffs,
  createContractStaff,
  checkStaffExists,
  updateStaffInactive,
  deleteStaff,
  getActiveRoles,
  getFilteredUsers,
  getUserWithLatestContractRole,
  searchUsersByKeyword,
  reactivateContractStaff,
  getContractStaffRow,
} from '../services/ContractDetails.js';

export const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await findContractById(id);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    return res.status(200).json({
      message: 'Contract found successfully',
      data: contract,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getContractStaffByContractId = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const staffs = await findContractStaffs(id, limit, offset);

    const totalItems = await getContractStaffRow(id);

    const grouped = staffs.reduce((acc, item) => {
      const role = item.ContractRole?.name + '-' + item.ContractRole?.id || 'Unknown';
      if (!acc[role]) acc[role] = [];
      acc[role].push({
        id: item.id,
        user_id: item.User.id,
        full_name: item.User.full_name,
        email: item.User.email,
        phone: item.User.phone,
      });
      return acc;
    }, {});

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      data: grouped,
      totalItems,
      totalPages,
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addContractStaff = async (req, res) => {
  try {
    const { contract_id, user_id, contract_role_id } = req.body;
    if (!contract_id || !user_id || !contract_role_id) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const existingStaff = await checkStaffExists(contract_id, user_id, contract_role_id);

    if (existingStaff) {
      if (existingStaff.is_active) {
        return res.status(409).json({ message: 'Staff already assigned with this role.' });
      } else {
        const reactivated = await reactivateContractStaff(existingStaff);
        return res.status(200).json({ message: 'Staff reactivated.', data: reactivated });
      }
    }

    const newStaff = await createContractStaff({ contract_id, user_id, contract_role_id });
    return res.status(201).json({ message: 'Contract staff added successfully', data: newStaff });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const softDeleteContractStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateStaffInactive(id);

    if (!result) {
      return res.status(404).json({ message: 'Contract staff not found' });
    }

    return res.status(200).json({ message: 'Contract staff deactivated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const hardDeleteContractStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteStaff(id);

    if (!result) {
      return res.status(404).json({ message: 'Contract staff not found' });
    }

    return res.status(200).json({ message: 'Contract staff deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllContractRoles = async (req, res) => {
  try {
    const roles = await getActiveRoles();
    return res.status(200).json({ data: roles });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getFilteredUsers();
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserLatestRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const roles = await getUserWithLatestContractRole(userId);
    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: 'User has no assigned roles' });
    }

    return res.status(200).json({
      role: Object.values(roles),
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: 'Missing search keyword.' });
    }

    const users = await searchUsersByKeyword(keyword);
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
