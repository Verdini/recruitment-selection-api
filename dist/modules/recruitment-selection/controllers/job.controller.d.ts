import { HttpException } from '@nestjs/common';
import { JobApplicationDTO } from '../dtos/job-application.dto';
import { JobDTO } from '../dtos/job.dto';
import { Job } from '../entities/job.entity';
import { ViewJobApplication } from '../entities/view-job-application.entity';
import { AccountService } from '../services/account.service';
import { JobService } from '../services/job.service';
export declare class JobController {
    private readonly jobService;
    private readonly accountService;
    constructor(jobService: JobService, accountService: AccountService);
    createJob(body: JobDTO): Promise<Job | HttpException>;
    listAllJobs(): Promise<Job[] | HttpException>;
    publishJob(jobId: number): Promise<Job | HttpException>;
    apply(jobId: number, body: JobApplicationDTO): Promise<string | HttpException>;
    viewApplications(jobId: number): Promise<ViewJobApplication[] | HttpException>;
}
