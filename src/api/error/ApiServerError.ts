import { ApiError } from './ApiError';

export class ApiServerError extends ApiError {
  constructor(statusCode: string, message: string) {
    super(statusCode, message);
    this.name = 'ApiServerError';
  }
}
