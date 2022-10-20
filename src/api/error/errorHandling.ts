import { ErrorResponseBody } from '../types';
import { ApiClientError } from './ApiClientError';
import { ApiServerError } from './ApiServerError';

export const resolveApiError = (res: ErrorResponseBody): Error => {
  const message = res.message || '';
  const status = res.statusCode;
  if (!status) {
    return new Error(`unexpected api error${message !== '' ? ` (detail: ${message})` : ''}`);
  }
  if (status.match(/^4[0-9]{2}$/g)) {
    return new ApiClientError(status, message);
  }
  if (status.match(/^5[0-9]{2}$/g)) {
    return new ApiServerError(status, message);
  }
  return new Error(`unexpected api error${` (status: ${status})`}${message !== '' ? ` (detail: ${message})` : ''}`);
};
