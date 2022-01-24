"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    constructor(errors = []) {
        this.errors = errors;
        this.hasMinLen = (value, min, message) => {
            if (!value || value.length < min) {
                this.errors.push(message);
            }
        };
        this.hasMaxLen = (value, max, message) => {
            if (!value || value.length > max) {
                this.errors.push(message);
            }
        };
        this.isFixedLen = (value, len, message) => {
            if (value.length !== len) {
                this.errors.push(message);
            }
        };
        this.isEmail = (value, message) => {
            const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
            if (!reg.test(value)) {
                this.errors.push(message);
            }
        };
        this.isNotNull = (value, message) => {
            if (!value.length) {
                this.errors.push(message);
            }
        };
        this.isGreaterThan = (valuea, valueb, message) => {
            if (valuea > valueb) {
                this.errors.push(message);
            }
        };
    }
    isRequired(value, message) {
        if (!value || value.length <= 0) {
            this.errors.push(message);
        }
    }
    clear() {
        this.errors = [];
    }
    isValid() {
        return this.errors.length === 0;
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map