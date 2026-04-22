/**
 * Validation utilities for authentication
 */

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationError | null => {
  if (!email.trim()) {
    return { field: 'email', message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { field: 'email', message: 'Invalid email format' };
  }

  return null;
};

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }

  if (password.length < 8) {
    return { field: 'password', message: 'Password must be at least 8 characters' };
  }

  if (!/[A-Z]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one lowercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one number' };
  }

  return null;
};

/**
 * Validate username
 * Requirements:
 * - At least 3 characters
 * - Only alphanumeric characters and underscores
 */
export const validateUsername = (username: string): ValidationError | null => {
  if (!username.trim()) {
    return { field: 'username', message: 'Username is required' };
  }

  if (username.length < 3) {
    return { field: 'username', message: 'Username must be at least 3 characters' };
  }

  if (username.length > 20) {
    return { field: 'username', message: 'Username must not exceed 20 characters' };
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return { field: 'username', message: 'Username can only contain letters, numbers, and underscores' };
  }

  return null;
};

/**
 * Validate password confirmation match
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): ValidationError | null => {
  if (!confirmPassword) {
    return { field: 'confirmPassword', message: 'Confirm password is required' };
  }

  if (password !== confirmPassword) {
    return { field: 'confirmPassword', message: 'Passwords do not match' };
  }

  return null;
};

/**
 * Validate sign in form
 */
export const validateSignIn = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
};

/**
 * Validate sign up form
 */
export const validateSignUp = (
  email: string,
  password: string,
  confirmPassword: string,
  username: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const usernameError = validateUsername(username);
  if (usernameError) errors.push(usernameError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  const matchError = validatePasswordMatch(password, confirmPassword);
  if (matchError) errors.push(matchError);

  return errors;
};
