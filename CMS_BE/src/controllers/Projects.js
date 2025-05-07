import { Op } from 'sequelize';
import Account from '../models/Accounts.js';
import Project from '../models/Projects.js';

export const projectCreate = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      message: 'Request body is missing or empty.',
    });
  const {
    name = null,
    description = null,
    account_id = null,
    start_date = null,
    end_date = null,
  } = req.body;
  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!account_id) missingFields.push('account_id');

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required field(s): ${missingFields.join(', ')}`,
    });
  }
  const track = 'Planning';
  await Project.create({
    name,
    description,
    account_id,
    start_date: start_date ? new Date(start_date) : null,
    end_date: end_date ? new Date(end_date) : null,
    track,
  });
  return res.status(200).json({
    message: 'Project data is valid',
    data: { name, description, account_id, start_date, end_date, track },
  });
};

export const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await Project.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Account,
          as: 'account',
          attributes: [
            'company',
            'contact_person',
            'email',
            'phone',
            'status',
            'url',
            'address',
            'created_at',
          ],
        },
      ],
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
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.update(updateData);

    return res.status(200).json({
      message: 'Project updated successfully!',
      data: project,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: Account,
          as: 'account',
          attributes: [
            'company',
            'contact_person',
            'email',
            'phone',
            'status',
            'url',
            'address',
            'created_at',
          ],
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({ message: 'Project find successfully', data: project });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchProjects = async (req, res) => {
  try {
    const { keyword } = req.query;
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {
      [Op.or]: [
        { id: isNaN(Number(keyword)) ? -1 : Number(keyword) },
        { name: { [Op.like]: `%${keyword}%` } },
      ],
    };

    const { rows: results, count: total } = await Project.findAndCountAll({
      where: where,
      include: [
        {
          model: Account,
          as: 'account',
          attributes: [
            'company',
            'contact_person',
            'email',
            'phone',
            'status',
            'url',
            'address',
            'created_at',
          ],
        },
      ],
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
