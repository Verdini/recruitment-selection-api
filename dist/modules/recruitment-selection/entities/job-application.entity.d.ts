import { Account } from './account.entity';
import { Job } from './job.entity';
export declare class JobApplication {
    id: number;
    jobId: number;
    accountId: number;
    job: Job;
    account: Account;
}
