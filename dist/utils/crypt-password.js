"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.cryptPassword = void 0;
const bcrypt_1 = require("bcrypt");
const cryptPassword = function (password) {
    return (0, bcrypt_1.genSalt)(10)
        .then((salt) => (0, bcrypt_1.hash)(password, salt))
        .then((hash) => hash);
};
exports.cryptPassword = cryptPassword;
const comparePassword = function (password, hashword) {
    return (0, bcrypt_1.compare)(password, hashword).then((resp) => resp);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=crypt-password.js.map