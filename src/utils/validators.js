// A reusable check for any required field
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required.`;
  }
  return null;
};

// Specific check for email format
export const validateEmail = (email) => {
  let error = validateRequired(email, 'Email');
  if (error) return error;

  // Basic email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(String(email).toLowerCase())) {
    return 'Invalid email format.';
  }
  return null;
};

// Specific check for password
export const validatePassword = (password, minLength = 6) => {
  let error = validateRequired(password, 'Password');
  if (error) return error;

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }
  // You can add more rules here (e.g., uppercase, number)
  // if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter.';
  
  return null;
};