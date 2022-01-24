import { genSalt, hash, compare } from 'bcrypt';

/**
 * Function to encrypt a password
 * @param {string} password - input password string to encrypt
 * @returns The password encrypted
 */
export const cryptPassword = function (password: string) {
  return genSalt(10)
    .then((salt) => hash(password, salt))
    .then((hash) => hash);
};

/**
 * Function to compare if a password is the same as a previous hashed password
 * @param {string} password - plain text password for comparison
 * @param {string} hashword - password previously encrypted
 * @returns True if the two passwords match
 */
export const comparePassword = function (password, hashword) {
  return compare(password, hashword).then((resp) => resp);
};
