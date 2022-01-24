import { Test } from '@nestjs/testing';
import { JobController } from '../controllers/job.controller';
import { Job } from '../entities/job.entity';
import { AccountService } from '../services/account.service';
import { JobService } from '../services/job.service';

const jobsList: Job[] = [
  {
    id: 1,
    name: 'Analyst 1',
    published: true,
    applications: null,
  },
  {
    id: 2,
    name: 'Analyst 2',
    published: true,
    applications: null,
  },
  {
    id: 3,
    name: 'Analyst 3',
    published: true,
    applications: null,
  },
];

const createdJob: Job = {
  name: 'Analyst 4',
  published: false,
  id: 0,
  applications: null,
};

describe('JobController', () => {
  let jobController: JobController;
  let jobService: JobService;
  let accountService: AccountService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        {
          provide: JobService,
          useValue: {
            getAllJobs: jest.fn().mockResolvedValue(jobsList),
            createJob: jest.fn().mockResolvedValue(createdJob),
          },
        },
        {
          provide: AccountService,
          useValue: {},
        },
      ],
    }).compile();

    jobService = moduleRef.get<JobService>(JobService);
    accountService = moduleRef.get<AccountService>(AccountService);
    jobController = moduleRef.get<JobController>(JobController);
  });

  describe('Recruiter tests', () => {
    it('should return the list of jobs', async () => {
      expect(await jobController.listAllJobs()).toBe(jobsList);
    });

    it('should create a job', async () => {
      const job = new Job();
      job.name = 'Analyst 4';
      expect(await jobController.createJob(job)).toBe(createdJob);
    });
  });
});
