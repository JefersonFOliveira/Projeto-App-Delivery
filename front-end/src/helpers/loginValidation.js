export const validEmail = (email) => {
  const emailReg = /\w+@\w+.com(.br)?/;
  if (!email) return false;
  if (emailReg.test(email)) return true;
  return false;
};

export const validPassWord = (password) => {
  const min = 6;
  if (!password) return false;
  if (password.length < min) return false;
  return true;
};

export const validLogin = (email, password) => {
  if (validEmail(email) && validPassWord(password)) return true;
  return false;
};

export const validName = (name) => {
  const nameLength = 12;
  if (!name) return false;
  if (name.length < nameLength) return false;
  return true;
};

export const validRegister = (email, password, name) => {
  if (validEmail(email) && validPassWord(password) && validName(name)) return true;
  return false;
};
