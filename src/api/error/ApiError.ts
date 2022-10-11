export class ApiError extends Error {
  constructor(private readonly status: string, message: string) {
    super(message);
  }

  public get statusCode(): string {
    return this.status;
  }
}
