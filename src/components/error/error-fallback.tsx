import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ error }: FallbackProps) => (
  <div>
    <h2>エラーが発生しました。</h2>
    <pre>{error.message}</pre>
  </div>
);
