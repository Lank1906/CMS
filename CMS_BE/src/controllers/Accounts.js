import { Op } from 'sequelize';
import Account from '../models/Accounts.js';
import Project from '../models/Projects.js';
import AccountServce from '../services/Accounts.js';

export const createAccount = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      message: 'Request body is missing or empty.',
    });
  const {
    company = null,
    contact_person = null,
    email = null,
    phone = null,
    url = null,
    address = null,
  } = req.body;
  const missingFields = [];
  if (!company) missingFields.push('company');
  if (!contact_person) missingFields.push('contact_person');
  if (!email) missingFields.push('email');
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required field(s): ${missingFields.join(', ')}`,
    });
  }

  await Account.create({ company, contact_person, email, phone, url, address });
  return res.status(200).json({
    message: 'Account data is valid',
    data: { company, contact_person, email, phone, url, address },
  });
};

export const getAccounts = async (req, res) => {
  try {
    const { page = 1, limit = 10, is_active = 1 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await Account.findAndCountAll({
      where: {
        is_active: is_active == 1 ? true : false,
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
    });
    const inactiveCount = await Account.count({
      where: {
        is_active: false,
      },
    });
    return res.status(200).json({
      totalItems: count,
      inactiveCount: inactiveCount,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await account.update(updateData);

    return res.status(200).json({
      message: 'Account updated successfully',
      data: account,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Missing \'id\' parameter in request',
      });
    }
    const message = await AccountServce.softRemove(id);
    return res.status(200).json({
      message: message,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res.status(200).json({ message: 'Account find successfully', data: account });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchAccounts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {
      [Op.or]: [
        { id: isNaN(Number(keyword)) ? -1 : Number(keyword) },
        { contact_person: { [Op.like]: `%${keyword}%` } },
        { phone: { [Op.like]: `%${keyword}%` } },
        { email: { [Op.like]: `%${keyword}%` } },
        { company: { [Op.like]: `%${keyword}%` } },
        { address: { [Op.like]: `%${keyword}%` } },
      ],
    };

    const { rows: results, count: total } = await Account.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    return res.json({
      data: results,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error: ' + err });
  }
};
export const getAccountWithProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const account = await Account.findOne({
      where: { id },
      include: [
        {
          model: Project,
          as: 'projects',
          limit: parseInt(limit),
          offset: parseInt(offset),
          order: [['created_at', 'DESC']],
          where: {
            is_active: true,
          },
        },
      ],
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const totalProjects = await Project.count({ where: { account_id: id } });

    res.status(200).json({
      account,
      projectsPagination: {
        totalItems: totalProjects,
        totalPages: Math.ceil(totalProjects / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
