import { Repository } from 'typeorm';
import { JobApplication } from '../entities/job-application.entity';
import { Job } from '../entities/job.entity';
import { ViewJobApplication } from '../entities/view-job-application.entity';
export declare class JobService {
    private jobRepo;
    private jobAppRepo;
    private viewJobApp;
    constructor(jobRepo: Repository<Job>, jobAppRepo: Repository<JobApplication>, viewJobApp: Repository<ViewJobApplication>);
    createJob(newJob: Job): Promise<Job>;
    getAllJobs(): Promise<Job[]>;
    getById(id: number): Promise<Job>;
    updateJob(job: Job): Promise<Job>;
    createjobApplication(jobId: number, accountId: number): Promise<void>;
    findJobApplication(jobId: number, accountId: number): Promise<JobApplication>;
    getJobApplications(jobId: number): Promise<ViewJobApplication[]>;
}
