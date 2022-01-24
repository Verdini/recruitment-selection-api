import { genSalt, hash, compare } from 'bcrypt';

export const cryptPassword = function (password: string) {
  return genSalt(10)
    .then((salt) => hash(password, salt))
    .then((hash) => hash);
};

export const comparePassword = function (password, hashword) {
  return compare(password, hashword).then((resp) => resp);
};
