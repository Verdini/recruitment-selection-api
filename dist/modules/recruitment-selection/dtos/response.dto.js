"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
class ResponseDto {
    constructor(success, message, data = null, errors = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map