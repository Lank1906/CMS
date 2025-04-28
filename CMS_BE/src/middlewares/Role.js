import Role from '../models/Roles.js';

export const hasRoleAdmin = async (req, res, next) => {
  const user = req.user || null;
  if (!user) {
    return res.status(400).json({ message: 'No premission!' });
  }
  const roleId = user.role;
  if (!roleId) {
    return res.status(400).json({ message: 'No premission!' });
  }
  const role = await Role.findByPk(roleId);
  if (role.name === 'Admin') {
    return next();
  }
  return res.status(400).json({ message: 'No premission!' });
};
