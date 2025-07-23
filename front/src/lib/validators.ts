export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length > 6 && password.length < 12;
};

export const validateUsername = (username: string): boolean => {
  return username.length > 2 && username.length < 13;
};

export const validateLoginForm = (mail: string, password: string): boolean => {
  return validateEmail(mail) && validatePassword(password);
};

export const validateRegisterForm = (
  mail: string,
  password: string,
  username: string
): boolean => {
  return (
    validateEmail(mail) &&
    validatePassword(password) &&
    validateUsername(username)
  );
};
