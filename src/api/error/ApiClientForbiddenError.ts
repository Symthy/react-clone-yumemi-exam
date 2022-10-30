import { ApiClientError } from './ApiClientError';

export class ApiClientForbiddenError extends ApiClientError {
  constructor(statusCode: string, message: string) {
    super(statusCode, message);
    this.name = 'ApiClientForbiddenError';
    this.displayMsg = 'RESAS API キーが不正です。再指定してください。';
  }
}
