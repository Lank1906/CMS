import { Op } from 'sequelize';
import Project from '../models/Projects.js';
import Contract from '../models/Contracts.js';

export const createContract = async (req, res) => {
  const {
    title,
    project_id,
    signed_date,
    total_amount,
    working_days,
    start_date,
    end_date,
    status,
  } = req.body;

  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!project_id) missingFields.push('project_id');

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required field(s): ${missingFields.join(', ')}`,
    });
  }

  try {
    const contract = await Contract.create({
      title,
      project_id,
      signed_date,
      total_amount,
      working_days,
      start_date,
      end_date,
      status: status || 'draft',
    });

    return res.status(201).json({
      message: 'Contract created successfully',
      data: contract,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getContracts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await Contract.findAndCountAll({
      where: { is_active: 1 },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    const validStatuses = ['draft', 'signed', 'waitingforapproval'];
    if (updateData.status && !validStatuses.includes(updateData.status.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    await contract.update(updateData);

    return res.status(200).json({
      message: 'Contract updated successfully',
      data: contract,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    contract.is_active = 0;
    await contract.save();

    return res.status(200).json({ message: 'Contract soft-deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getContractById = async (req, res) => {
  try {
    const { id } = req.params;

    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    return res.status(200).json({ message: 'Contract found', data: contract });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchContracts = async (req, res) => {
  try {
    const { keyword = '' } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {
      [Op.or]: [
        { id: isNaN(Number(keyword)) ? -1 : Number(keyword) },
        { title: { [Op.like]: `%${keyword}%` } },
        { project_id: { [Op.like]: `%${keyword}%` } },
        { signed_date: { [Op.like]: `%${keyword}%` } },
        { total_amount: { [Op.like]: `%${keyword}%` } },
        { working_days: { [Op.like]: `%${keyword}%` } },
        { start_date: { [Op.like]: `%${keyword}%` } },
        { end_date: { [Op.like]: `%${keyword}%` } },
        { status: { [Op.like]: `%${keyword}%` } },
      ],
    };

    const { rows: results, count: total } = await Contract.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      data: results,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getContractWithProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findOne({
      where: { id },
      include: [
        {
          model: Project,
          attributes: ['id', 'name', 'start_date', 'end_date'],
        },
      ],
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    return res.status(200).json({ data: contract });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
