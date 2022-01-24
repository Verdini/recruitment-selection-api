import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JobApplicationDTO } from '../dtos/job-application.dto';
import { JobDTO } from '../dtos/job.dto';
import { ResponseDto } from '../dtos/response.dto';
import { Job } from '../entities/job.entity';
import { ViewJobApplication } from '../entities/view-job-application.entity';
import { AccountService } from '../services/account.service';
import { JobService } from '../services/job.service';

@Controller('v1/jobs')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly accountService: AccountService,
  ) {}

  @Post('create-job')
  @ApiTags('Recruiter')
  @ApiOperation({ description: 'Creates a job.' })
  @ApiCreatedResponse({
    description: 'The job has been successfully created.',
  })
  @ApiBadRequestResponse({ description: "Couldn't create the job." })
  async createJob(@Body() body: JobDTO): Promise<Job | HttpException> {
    try {
      const job = new Job();
      job.name = body.name;
      job.published = false;
      const newJob = await this.jobService.createJob(job);

      return newJob;
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, 'Error creating job', null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('list-all-jobs')
  @ApiTags('Recruiter')
  @ApiOperation({ description: 'Lists all jobs registered.' })
  @ApiOkResponse({
    description: 'The job has been successfully created.',
  })
  @ApiBadRequestResponse({ description: "Couldn't list the jobs." })
  async listAllJobs(): Promise<Job[] | HttpException> {
    try {
      const jobs = await this.jobService.getAllJobs();

      return jobs;
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, 'Error listing all jobs', null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('publish-job/:jobId')
  @ApiTags('Recruiter')
  @ApiOperation({ description: 'Publishes a job for application.' })
  @ApiOkResponse({
    description: 'The job has been successfully published.',
  })
  @ApiBadRequestResponse({ description: "Couldn't publish the job." })
  async publishJob(
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<Job | HttpException> {
    try {
      const job = await this.jobService.getById(jobId);
      if (!job)
        throw new NotFoundException(
          new ResponseDto(false, `Couldn't find job with id ${jobId}`),
        );
      else if (job.published)
        throw new BadRequestException(
          new ResponseDto(false, `Job with id ${job.id} is already published`),
        );

      job.published = true;
      const updatedJob = await this.jobService.updateJob(job);

      return updatedJob;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        new ResponseDto(false, 'Error publishing job', null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('apply/:jobId')
  @ApiTags('Candidate')
  @ApiOperation({ description: 'A candidate apply for a job.' })
  @ApiCreatedResponse({
    description: 'The job applicaiton has been successfully done.',
  })
  @ApiBadRequestResponse({ description: "Couldn't apply for the job." })
  async apply(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() body: JobApplicationDTO,
  ): Promise<string | HttpException> {
    try {
      const job = await this.jobService.getById(jobId);
      if (!job)
        throw new NotFoundException(
          new ResponseDto(false, `Couldn't find job with id ${jobId}`),
        );

      const account = await this.accountService.getById(body.accountId);
      if (!account)
        throw new NotFoundException(
          new ResponseDto(false, `Couldn't find account with id ${jobId}`),
        );

      await this.jobService.createjobApplication(job.id, account.id);
      return 'Job application done!';
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        new ResponseDto(false, 'Error applying to job', null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('view-applications/:jobId')
  @ApiTags('Interviewer')
  @ApiOperation({ description: 'Lists all the applications for a job' })
  @ApiOkResponse({
    description: 'The applications list',
  })
  @ApiBadRequestResponse({
    description: "Couldn't retrieve the applications list.",
  })
  async viewApplications(
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<ViewJobApplication[] | HttpException> {
    try {
      const jobApps = await this.jobService.getJobApplications(jobId);
      if (!jobApps)
        throw new NotFoundException(
          new ResponseDto(
            false,
            `Couldn't find job  applications with id ${jobId}`,
          ),
        );

      return jobApps;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        new ResponseDto(false, 'Error viewing job applications', null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
