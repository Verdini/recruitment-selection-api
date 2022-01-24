import { HttpException } from '@nestjs/common';
import { AccountDTO } from '../dtos/account.dto';
import { AccountService } from '../services/account.service';
import { Account } from '../entities/account.entity';
export declare class AccountController {
    private readonly service;
    constructor(service: AccountService);
    createAccount(body: AccountDTO): Promise<Account | HttpException>;
}
