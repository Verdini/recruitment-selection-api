import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDTO {
  @ApiProperty({ description: 'Name of the account owner' })
  @IsString()
  @Length(3, 255)
  public name: string;

  @ApiProperty({ description: 'Account e-mail' })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ description: 'Account password' })
  @IsString()
  @Length(8)
  public password: string;
}
