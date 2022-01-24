import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from '../entities/job-application.entity';
import { Job } from '../entities/job.entity';
import { ViewJobApplication } from '../entities/view-job-application.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(JobApplication)
    private jobAppRepo: Repository<JobApplication>,
    @InjectRepository(ViewJobApplication)
    private viewJobApp: Repository<ViewJobApplication>,
  ) {}

  public async createJob(newJob: Job): Promise<Job> {
    return await this.jobRepo.save(newJob);
  }

  public async getAllJobs(): Promise<Job[]> {
    return await this.jobRepo.find();
  }

  public async getById(id: number): Promise<Job> {
    return await this.jobRepo.findOne({ id });
  }

  public async updateJob(job: Job): Promise<Job> {
    return await this.jobRepo.save(job);
  }

  public async createjobApplication(jobId: number, accountId: number) {
    const jobApp = new JobApplication();
    jobApp.jobId = jobId;
    jobApp.accountId = accountId;
    await this.jobAppRepo.save(jobApp);
  }

  public async getJobApplications(
    jobId: number,
  ): Promise<ViewJobApplication[]> {
    return await this.viewJobApp.find({ jobId });
  }
}
