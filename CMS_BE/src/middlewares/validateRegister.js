import Role from '../models/Roles.js';

export const validateRegister = async (req, res, next) => {
  const { fullName, password, email, phone, role, address } = req.body;
  if (!fullName || !password || !email || !phone || !role || !address) {
    return res.status(400).json({ message: 'Please fill in all information.' });
  }

  const nameRegexLength = /^.{3,50}$/;
  const nameRegexChars = /^[A-Za-z][A-Za-z0-9_]{2,49}$/;
  if (!nameRegexLength.test(fullName)) {
    return res.status(400).json({
      message: 'Full name must be 3-50 characters long.',
    });
  }
  if (!nameRegexChars.test(fullName)) {
    return res.status(400).json({
      message: 'Full name must contain only letters, numbers, spaces, or underscores.',
    });
  }

  const passwordRegexLength = /^.{6,30}$/;
  const passwordRegexChars = /^[A-Za-z0-9]+$/;
  if (!passwordRegexLength.test(password)) {
    return res.status(400).json({
      message: 'Password must be 6-30 characters long.',
    });
  }
  if (!passwordRegexChars.test(password)) {
    return res.status(400).json({
      message: 'Password must contain only letters and numbers (no special characters).',
    });
  }

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Email must be valid and contain only letters, numbers, "@" and "."',
    });
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ message: 'Invalid phone number. Please enter exactly 10 digits.' });
  }

  const addressRegex = /^[^@#$%^&*()!]+$/;
  if (!addressRegex.test(address)) {
    return res.status(400).json({
      message: 'Address must not contain special characters like @, $, %, &, etc.',
    });
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
