import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { Job } from './job.entity';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobId: number;

  @Column()
  accountId: number;

  @ManyToOne(() => Job, (j) => j.applications)
  job: Job;

  @ManyToOne(() => Account, (a) => a)
  account: Account;
}
