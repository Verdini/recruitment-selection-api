import { JobApplication } from './job-application.entity';
export declare class Job {
    id: number;
    name: string;
    published: boolean;
    applications: JobApplication[];
}
