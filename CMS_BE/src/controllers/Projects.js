import { Op } from 'sequelize';
import Account from '../models/Accounts.js';
import Project from '../models/Projects.js';
import ProjectService from '../services/Projects.js';

export const projectCreate = async (req, res) => {
  try {
    const project = await ProjectService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const projects = await ProjectService.get(page, limit);
    res.status(201).json(projects);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await ProjectService.update(id, updateData);
    return res.status(201).json({
      message: 'Project updated successfully!',
      data: project,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ProjectService.softRemove(id);
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
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getById(id);
    return res.status(201).json({ message: 'Project find successfully', data: project });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const searchProjects = async (req, res) => {
  try {
    const { keyword } = req.query;
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const results = await ProjectService.search(keyword, page, limit);
    return res.status(200).json(results);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
