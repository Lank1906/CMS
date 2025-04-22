import Project from '../models/Projects.js';
import { isValidStatusChange } from '../utils/statusValidator.js';

export const updateProjectStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    if (project.track === newStatus) {
      return res.status(400).json({ message: 'New status must be different from current status.' });
    }

    if (!isValidStatusChange(project.track, newStatus)) {
      return res
        .status(400)
        .json({ message: `Invalid status transition from ${project.track} to ${newStatus}.` });
    }

    project.track = newStatus;
    project.updated_at = new Date();
    await project.save();

    res.json({ message: 'Project status updated successfully.', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
