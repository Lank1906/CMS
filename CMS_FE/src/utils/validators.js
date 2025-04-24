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
