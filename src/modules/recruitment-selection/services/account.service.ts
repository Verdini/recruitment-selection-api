import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDTO } from '../dtos/account.dto';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repository: Repository<Account>,
  ) {}

  public async create(newAccount: Account): Promise<Account> {
    return await this.repository.save(newAccount);
  }

  public async getById(id: number): Promise<Account> {
    return await this.repository.findOne({ id });
  }
}
