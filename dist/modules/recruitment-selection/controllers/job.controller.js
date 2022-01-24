"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const job_application_dto_1 = require("../dtos/job-application.dto");
const job_dto_1 = require("../dtos/job.dto");
const response_dto_1 = require("../dtos/response.dto");
const job_entity_1 = require("../entities/job.entity");
const account_service_1 = require("../services/account.service");
const job_service_1 = require("../services/job.service");
let JobController = class JobController {
    constructor(jobService, accountService) {
        this.jobService = jobService;
        this.accountService = accountService;
    }
    async createJob(body) {
        try {
            const job = new job_entity_1.Job();
            job.name = body.name;
            job.published = false;
            const newJob = await this.jobService.createJob(job);
            return newJob;
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, 'Error creating job', null, error), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listAllJobs() {
        try {
            const jobs = await this.jobService.getAllJobs();
            return jobs;
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, 'Error listing all jobs', null, error), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async publishJob(jobId) {
        try {
            const job = await this.jobService.getById(jobId);
            if (!job)
                throw new common_1.NotFoundException(new response_dto_1.ResponseDto(false, `Couldn't find job with id ${jobId}`));
            else if (job.published)
                throw new common_1.BadRequestException(new response_dto_1.ResponseDto(false, `Job with id ${job.id} is already published`));
            job.published = true;
            const updatedJob = await this.jobService.updateJob(job);
            return updatedJob;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, 'Error publishing job', null, error), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async apply(jobId, body) {
        try {
            const job = await this.jobService.getById(jobId);
            if (!job)
                throw new common_1.NotFoundException(new response_dto_1.ResponseDto(false, `Couldn't find job with id ${jobId}`));
            const account = await this.accountService.getById(body.accountId);
            if (!account)
                throw new common_1.NotFoundException(new response_dto_1.ResponseDto(false, `Couldn't find account with id ${jobId}`));
            await this.jobService.createjobApplication(job.id, account.id);
            return 'Job application done!';
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, 'Error applying to job', null, error), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async viewApplications(jobId) {
        try {
            const jobApps = await this.jobService.getJobApplications(jobId);
            if (!jobApps)
                throw new common_1.NotFoundException(new response_dto_1.ResponseDto(false, `Couldn't find job  applications with id ${jobId}`));
            return jobApps;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, 'Error viewing job applications', null, error), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('create-job'),
    (0, swagger_1.ApiTags)('Recruiter'),
    (0, swagger_1.ApiOperation)({ description: 'Creates a job.' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The job has been successfully created.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Couldn't create the job." }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.JobDTO]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)('list-all-jobs'),
    (0, swagger_1.ApiTags)('Recruiter'),
    (0, swagger_1.ApiOperation)({ description: 'Lists all jobs registered.' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The job has been successfully created.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Couldn't list the jobs." }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "listAllJobs", null);
__decorate([
    (0, common_1.Patch)('publish-job/:jobId'),
    (0, swagger_1.ApiTags)('Recruiter'),
    (0, swagger_1.ApiOperation)({ description: 'Publishes a job for application.' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The job has been successfully published.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Couldn't publish the job." }),
    __param(0, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "publishJob", null);
__decorate([
    (0, common_1.Post)('apply/:jobId'),
    (0, swagger_1.ApiTags)('Candidate'),
    (0, swagger_1.ApiOperation)({ description: 'A candidate apply for a job.' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The job applicaiton has been successfully done.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Couldn't apply for the job." }),
    __param(0, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, job_application_dto_1.JobApplicationDTO]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "apply", null);
__decorate([
    (0, common_1.Get)('view-applications/:jobId'),
    (0, swagger_1.ApiTags)('Interviewer'),
    (0, swagger_1.ApiOperation)({ description: 'Lists all the applications for a job' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The applications list',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Couldn't retrieve the applications list.",
    }),
    __param(0, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "viewApplications", null);
JobController = __decorate([
    (0, common_1.Controller)('v1/jobs'),
    __metadata("design:paramtypes", [job_service_1.JobService,
        account_service_1.AccountService])
], JobController);
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map