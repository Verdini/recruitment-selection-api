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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewJobApplication = void 0;
const typeorm_1 = require("typeorm");
let ViewJobApplication = class ViewJobApplication {
};
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewJobApplication.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewJobApplication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewJobApplication.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewJobApplication.prototype, "email", void 0);
ViewJobApplication = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: 'view_job_application',
        expression: `
  SELECT j.id AS "jobId", a.id AS id, a.name AS name, a.email AS email FROM job_application ja
	INNER JOIN job j ON "ja"."jobId" = j.id
	INNER JOIN account a ON "ja"."accountId" = a.id
  `,
    })
], ViewJobApplication);
exports.ViewJobApplication = ViewJobApplication;
//# sourceMappingURL=view-job-application.js.map