import { Op } from 'sequelize';
import Account from '../models/Accounts.js';
import Project from '../models/Projects.js';

class ProjectService {
  static async create(body) {
    if (!body) {
      throw new Error('Request body is missing or empty.');
    }
    const {
      name = null,
      description = null,
      account_id = null,
      start_date = null,
      end_date = null,
      track = 'Planning',
    } = body;

    const missingFields = [];
    if (!name) missingFields.push('Name');
    if (!account_id) missingFields.push('Account');

    if (missingFields.length > 0) {
      throw new Error(`Missing required field(s): ${missingFields.join(', ')}`);
    }

    const project = await Project.create({
      name,
      description,
      account_id,
      start_date,
      end_date,
      track,
    });

    return project;
  }

  static async get(page, limit) {
    const offset = (page - 1) * limit;
    const { rows, count } = await Project.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
      where: {
        is_active: true,
      },
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

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows,
    };
  }

  static async update(id, updateData) {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error('Project not found');
    }
    await project.update(updateData);
    return project;
  }
  static async getById(id) {
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
      throw new Error('Project not found');
    }
    return project;
  }
  static async search(keyword, page, limit) {
    const offset = (page - 1) * limit;

    const where = {
      [Op.or]: [
        { id: isNaN(Number(keyword)) ? -1 : Number(keyword) },
        { name: { [Op.like]: `%${keyword}%` } },
      ],
      is_active: true,
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

    return {
      data: results,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  static async hardRemove(id) {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error('Project not found');
    }
    await project.destroy();
    return 'Project delete successfully';
  }
  static async softRemove(id) {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error('Project not found');
    }
    await project.update({
      is_active: false,
    });
    return 'Project remove successfully';
  }
}
export default ProjectService;
