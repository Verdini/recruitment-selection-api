import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
export declare class AccountService {
    private repository;
    constructor(repository: Repository<Account>);
    create(newAccount: Account): Promise<Account>;
    getById(id: number): Promise<Account>;
}
