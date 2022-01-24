"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_dto_1 = require("../dtos/account.dto");
const response_dto_1 = require("../dtos/response.dto");
const account_service_1 = require("../services/account.service");
const crypt_password_1 = require("../../../utils/crypt-password");
const account_entity_1 = require("../entities/account.entity");
const swagger_1 = require("@nestjs/swagger");
const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';
let AccountController = class AccountController {
    constructor(service) {
        this.service = service;
    }
    async createAccount(body) {
        try {
            const account = new account_entity_1.Account();
            account.name = body.name;
            account.email = body.email;
            account.password = await (0, crypt_password_1.cryptPassword)(body.password);
            const newAccount = await this.service.create(account);
            return newAccount;
        }
        catch (error) {
            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION)
                throw new common_1.HttpException(new response_dto_1.ResponseDto(false, 'Account already exists.'), common_1.HttpStatus.BAD_REQUEST);
            else
                throw new common_1.HttpException(new response_dto_1.ResponseDto(false, "Couldn't create account.", null, error), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('create-account'),
    (0, swagger_1.ApiTags)('Candidate'),
    (0, swagger_1.ApiOperation)({ description: 'Creates a candidate account.' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The account has been successfully created.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Couldn't create account." }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.AccountDTO]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAccount", null);
AccountController = __decorate([
    (0, common_1.Controller)('v1/accounts'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map