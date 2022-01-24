import { Test } from '@nestjs/testing';
import { AccountController } from '../controllers/account.controller';
import { AccountDTO } from '../dtos/account.dto';
import { Account } from '../entities/account.entity';
import { AccountService } from '../services/account.service';

const createdAccount: Account = {
  id: 3,
  name: 'Candidato C1',
  email: 'email3@email.com',
  password: '$2b$10$XcnUSZA.ol.DNxiC2Wp1teDqOXD4EK3POKFBP9GNJdpo2ShL16hpa',
};

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            create: jest.fn().mockResolvedValue(createdAccount),
          },
        },
      ],
    }).compile();

    accountService = moduleRef.get<AccountService>(AccountService);
    accountController = moduleRef.get<AccountController>(AccountController);
  });

  describe('createAccount', () => {
    it('should return a new account', async () => {
      const input = new AccountDTO();
      input.name = 'Candidato C1';
      input.email = 'email3@email.com';
      input.password = 'outrasenha123';
      expect(await accountController.createAccount(input)).toBe(createdAccount);
    });
  });
});
