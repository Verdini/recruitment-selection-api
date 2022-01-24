import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
  SELECT j.id AS "jobId", a.id AS id, a.name AS name, a.email AS email FROM "R&S"."job_application" ja
	INNER JOIN "R&S".job j ON "ja"."jobId" = j.id
	INNER JOIN "R&S".account a ON "ja"."accountId" = a.id
  `,
})
export class ViewJobApplication {
  @ViewColumn()
  jobId: number;

  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  email: string;
}
