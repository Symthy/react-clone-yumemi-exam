import { ApiError } from './ApiError';

export class ApiClientError extends ApiError {
  protected displayMsg: string;

  constructor(statusCode: string, message: string) {
    super(statusCode, message);
    this.name = 'ApiClientError';
    this.displayMsg = 'RESAS API エラーが発生しました。再試行しても発生する場合は製作者に問い合わせてください。';
  }

  get displayMessage(): string {
    return this.displayMsg;
  }
}
