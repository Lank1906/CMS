import { Op } from 'sequelize';
import Contract from '../models/Contracts.js';
import Project from '../models/Projects.js';
import Account from '../models/Accounts.js';
import ContractStaff from '../models/ContractStaffs.js';
import User from '../models/Users.js';
import ContractRole from '../models/ContractRoles.js';
import Role from '../models/Roles.js';
import { Sequelize } from 'sequelize';

export const findContractById = async (id) => {
  return await Contract.findOne({
    where: { id },
    include: [
      {
        model: Project,
        as: 'Project',
        attributes: ['id', 'name', 'description'],
        include: [
          {
            model: Account,
            as: 'account',
            attributes: ['company', 'contact_person', 'phone', 'email'],
          },
        ],
      },
    ],
  });
};

export const findContractStaffs = async (contractId, limit, offset) => {
  return await ContractStaff.findAll({
    where: { contract_id: contractId, is_active: true },
    include: [
      {
        model: User,
        attributes: ['id', 'full_name', 'email', 'phone'],
      },
      {
        model: ContractRole,
        attributes: ['id', 'name'],
      },
    ],
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10),
  });
};

export const getContractStaffRow = async (id) => {
  const totalItems = await ContractStaff.count({ where: { contract_id: id, is_active: true } });
  return totalItems;
};

export const createContractStaff = async ({ contract_id, user_id, contract_role_id }) => {
  return await ContractStaff.create({
    contract_id,
    user_id,
    contract_role_id,
    is_active: true,
  });
};

export const checkStaffExists = async (contract_id, user_id, contract_role_id) => {
  return await ContractStaff.findOne({
    where: { contract_id, user_id, contract_role_id },
  });
};

export const reactivateContractStaff = async (staffRecord) => {
  staffRecord.is_active = true;
  return await staffRecord.save();
};

export const updateStaffInactive = async (id) => {
  const staff = await ContractStaff.findByPk(id);
  if (!staff) return null;
  await staff.update({ is_active: false });
  return staff;
};

export const deleteStaff = async (id) => {
  const staff = await ContractStaff.findByPk(id);
  if (!staff) return null;
  await staff.destroy();
  return staff;
};

export const getActiveRoles = async () => {
  return await ContractRole.findAll({
    attributes: ['id', 'name', 'level', 'description'],
    where: { is_active: true },
    order: [['level', 'ASC']],
  });
};

export const getFilteredUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'full_name', 'email', 'phone'],
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
        where: {
          name: ['Manage', 'Employee'],
          is_active: true,
        },
        required: true,
      },
    ],
    limit: 15,
    order: [['full_name', 'ASC']],
  });
};

export const getUserWithLatestContractRole = async (userId) => {
  const roles = await ContractStaff.findAll({
    where: { user_id: userId },
    attributes: [
      'contract_role_id',
      [Sequelize.fn('COUNT', Sequelize.col('contract_role_id')), 'count'],
    ],
    include: [
      {
        model: ContractRole,
        as: 'ContractRole',
        attributes: ['id', 'name'],
      },
    ],
    group: ['contract_role_id', 'ContractRole.id'],
    order: [[Sequelize.literal('count'), 'DESC']],
  });

  return roles.map((r) => ({
    role_id: r.contract_role_id,
    role_name: r.ContractRole?.name,
    count: r.get('count'),
  }));
};

export const searchUsersByKeyword = async (keyword) => {
  return await User.findAll({
    where: {
      is_active: true,
      [Op.or]: [
        { full_name: { [Op.like]: `%${keyword}%` } },
        { email: { [Op.like]: `%${keyword}%` } },
        { phone: { [Op.like]: `%${keyword}%` } },
      ],
    },
    include: [
      {
        model: Role,
        attributes: ['name'],
        where: {
          name: ['Manage', 'Employee'],
          is_active: true,
        },
        required: true,
      },
    ],
    attributes: ['id', 'full_name', 'email', 'phone'],
    limit: 15,
    order: [['full_name', 'ASC']],
  });
};
