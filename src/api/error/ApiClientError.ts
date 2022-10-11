import { ApiError } from './ApiError';

export class ApiClientError extends ApiError {
  constructor(statusCode: string, message: string) {
    super(statusCode, message);
    this.name = 'ApiClientError';
  }
}
