import { Test } from '@nestjs/testing';
import { AccountController } from '../controllers/account.controller';
import { AccountDTO } from '../dtos/account.dto';
import { Account } from '../entities/account.entity';
import { AccountService } from '../services/account.service';

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountService = moduleRef.get<AccountService>(AccountService);
    accountController = moduleRef.get<AccountController>(AccountController);
  });

  describe('createAccount', () => {
    it('should return a new account', async () => {
      const input = new AccountDTO();
      input.name = 'Candidato C';
      input.email = 'email3@email.com';
      input.password = 'outrasenha123';

      const result = new Account();
      result.name = 'Candidato C1';
      result.email = 'email3@email.com';
      result.password =
        '$2b$10$XcnUSZA.ol.DNxiC2Wp1teDqOXD4EK3POKFBP9GNJdpo2ShL16hpa';
      result.id = 3;

      jest
        .spyOn(accountService, 'create')
        .mockImplementation(async () => result);

      expect(await accountController.createAccount(input)).toBe(result);
    });
  });
});
