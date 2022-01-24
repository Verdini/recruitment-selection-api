"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentSelectionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_controller_1 = require("./controllers/account.controller");
const job_controller_1 = require("./controllers/job.controller");
const account_entity_1 = require("./entities/account.entity");
const job_application_entity_1 = require("./entities/job-application.entity");
const view_job_application_entity_1 = require("./entities/view-job-application.entity");
const job_entity_1 = require("./entities/job.entity");
const account_service_1 = require("./services/account.service");
const job_service_1 = require("./services/job.service");
let RecruitmentSelectionModule = class RecruitmentSelectionModule {
};
RecruitmentSelectionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                account_entity_1.Account,
                job_entity_1.Job,
                job_application_entity_1.JobApplication,
                view_job_application_entity_1.ViewJobApplication,
            ]),
        ],
        controllers: [account_controller_1.AccountController, job_controller_1.JobController],
        providers: [account_service_1.AccountService, job_service_1.JobService],
    })
], RecruitmentSelectionModule);
exports.RecruitmentSelectionModule = RecruitmentSelectionModule;
//# sourceMappingURL=recruitment-selection.module.js.map