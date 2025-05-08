export const validateRequiredField = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} fields cannot be empty`;
  }
  return null;
};
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format.';
  }
  return null;
};
export function validateRegisterFrontend({ fullName, password, email, phone, role, address }) {
  if (!fullName || !password || !email || !phone || !role || !address) {
    return 'Please fill in all information.';
  }

  const nameRegexLength = /^.{3,50}$/;
  const nameRegexChars = /^[^@#$%^&*()!]+$/;
  if (!nameRegexLength.test(fullName)) {
    return 'Full name must be 3-50 characters long.';
  }
  if (!nameRegexChars.test(fullName)) {
    return 'Full name cannot contain special characters.';
  }

  const passwordRegexLength = /^.{6,30}$/;
  if (!passwordRegexLength.test(password)) {
    return 'Password must be 6-30 characters long.';
  }
  const sqlInjectionPattern = /(')|(--)|(;)|(\*)|(\*)/;

  const match = password.match(sqlInjectionPattern);
  if (match) {
    const bad = match[0];
    return `Password contains forbidden sequence "${bad}".`;
  }

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  if (!emailRegex.test(email)) {
    return 'Email must be valid and contain only letters, numbers, "@" and "."';
  }

  const phoneRegex = /^[1-9]\d{9,14}$/;
  if (!phoneRegex.test(phone)) {
    return 'Invalid phone number. Please enter the phone number in the proper national format';
  }

  const addressRegex = /^[\p{L}0-9\s,.\-]{5,100}$/u;
  if (!addressRegex.test(address)) {
    return 'Address must be 5-100 characters and contain only letters, numbers, spaces, commas, periods, and hyphens.';
  }

  return null;
}

export function validateUserUpdate({ fullName, email, phone }) {
  const errors = {};

  if (!fullName || fullName.trim() === '') {
    errors.full_name = 'Full name cannot be empty.';
  } else if (fullName.length < 3 || fullName.length > 50) {
    errors.full_name = 'Full name must be 3-50 characters long.';
  } else if (/[@#$%^&*()!]/.test(fullName)) {
    errors.full_name = 'Full name cannot contain special characters.';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email cannot be empty.';
  } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)) {
    errors.email = 'Invalid email format.';
  }

  const phoneRegex = /^[1-9]\d{9,14}$/;
  if (!phone || phone.trim() === '') {
    errors.phone = 'Phone number cannot be empty.';
  } else if (!phoneRegex.test(phone)) {
    errors.phone =
      'Invalid phone number. Please enter the phone number in the proper national format.';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
