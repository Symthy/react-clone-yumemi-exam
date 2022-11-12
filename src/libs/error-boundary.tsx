import { useErrorHandler as useErrorHandlerOrigin } from 'react-error-boundary';

export const useErrorHandler = () => {
  const errorHandler = useErrorHandlerOrigin();
  return { errorHandler };
};
