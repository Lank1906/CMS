import Role from '../models/Roles.js';

export const validateRegister = async (req, res, next) => {
  const { fullName, password, email, phone, role, address } = req.body;
  if (!fullName || !password || !email || !phone || !role || !address) {
    return res.status(400).json({ message: 'Please fill in all information.' });
  }

  try {
    const roleData = await Role.findOne({ where: { name: role } });
    if (!roleData) {
      return res.status(400).json({ message: 'Role not found.' });
    }

    req.roleId = roleData.id;
    next();
  } catch {
    return res.status(500).json({ message: 'Server error while checking role.' });
  }
};
