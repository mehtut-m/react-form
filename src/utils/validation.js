import { isEmpty, isEmail } from 'validator';

export const validEmail = (input) => {
  return !isEmpty(input) && isEmail(input);
};
export const validPassword = (input) => {
  return !isEmpty(input) && input.length >= 6;
};
export const passwordMatch = (password, confirmPassword) => {
  return !isEmpty(confirmPassword) && password === confirmPassword;
};
