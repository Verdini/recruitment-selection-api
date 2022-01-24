import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { JobApplication } from './job-application.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column()
  published: boolean;

  @OneToMany(() => JobApplication, (ja) => ja.job)
  applications: JobApplication[];
}
