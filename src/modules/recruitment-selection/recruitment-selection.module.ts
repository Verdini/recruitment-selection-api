import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account.controller';
import { JobController } from './controllers/job.controller';
import { Account } from './entities/account.entity';
import { JobApplication } from './entities/job-application.entity';
import { ViewJobApplication } from './entities/view-job-application.entity';
import { Job } from './entities/job.entity';
import { AccountService } from './services/account.service';
import { JobService } from './services/job.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Job,
      JobApplication,
      ViewJobApplication,
    ]),
  ],
  controllers: [AccountController, JobController],
  providers: [AccountService, JobService],
})
export class RecruitmentSelectionModule {}
