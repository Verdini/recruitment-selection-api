import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AccountDTO } from '../dtos/account.dto';
import { ResponseDto } from '../dtos/response.dto';
import { AccountService } from '../services/account.service';
import { cryptPassword } from '../../../utils/crypt-password';
import { Account } from '../entities/account.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

@Controller('v1/accounts')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Post('create-account')
  @ApiTags('Candidate')
  @ApiOperation({ description: 'Creates a candidate account.' })
  @ApiCreatedResponse({
    description: 'The account has been successfully created.',
  })
  @ApiBadRequestResponse({ description: "Couldn't create account." })
  async createAccount(
    @Body() body: AccountDTO,
  ): Promise<Account | HttpException> {
    try {
      const account = new Account();
      account.name = body.name;
      account.email = body.email;
      account.password = await cryptPassword(body.password);

      const newAccount = await this.service.create(account);
      return newAccount;
    } catch (error) {
      if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION)
        throw new HttpException(
          new ResponseDto(false, 'Account already exists.'),
          HttpStatus.BAD_REQUEST,
        );
      else
        throw new HttpException(
          new ResponseDto(false, "Couldn't create account.", null, error),
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
