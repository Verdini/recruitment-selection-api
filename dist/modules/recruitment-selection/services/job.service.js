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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_application_entity_1 = require("../entities/job-application.entity");
const job_entity_1 = require("../entities/job.entity");
const view_job_application_entity_1 = require("../entities/view-job-application.entity");
let JobService = class JobService {
    constructor(jobRepo, jobAppRepo, viewJobApp) {
        this.jobRepo = jobRepo;
        this.jobAppRepo = jobAppRepo;
        this.viewJobApp = viewJobApp;
    }
    async createJob(newJob) {
        return await this.jobRepo.save(newJob);
    }
    async getAllJobs() {
        return await this.jobRepo.find();
    }
    async getById(id) {
        return await this.jobRepo.findOne({ id });
    }
    async updateJob(job) {
        return await this.jobRepo.save(job);
    }
    async createjobApplication(jobId, accountId) {
        const jobApp = new job_application_entity_1.JobApplication();
        jobApp.jobId = jobId;
        jobApp.accountId = accountId;
        await this.jobAppRepo.save(jobApp);
    }
    async getJobApplications(jobId) {
        return await this.viewJobApp.find({ jobId });
    }
};
JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplication)),
    __param(2, (0, typeorm_1.InjectRepository)(view_job_application_entity_1.ViewJobApplication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map