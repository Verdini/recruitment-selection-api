import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class JobApplicationDTO {
  @ApiProperty({ description: 'Id of the account applying for a job' })
  @IsNumber()
  @Min(1)
  accountId: number;
}
