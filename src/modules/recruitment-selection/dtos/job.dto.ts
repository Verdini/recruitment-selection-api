import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class JobDTO {
  @ApiProperty({ description: "Job's name" })
  @IsString()
  @Length(3, 255)
  public name: string;
}
