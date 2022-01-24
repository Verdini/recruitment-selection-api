export class ResponseDto {
  constructor(
    public success: boolean,
    public message: string,
    public data: any = null,
    public errors: any = null,
  ) {}
}
