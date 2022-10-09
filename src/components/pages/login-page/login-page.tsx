import { ChangeEvent, useEffect, useState } from 'react';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { useSubmitApiKey } from './useSubmitApiKey';

export const LoginPage = () => {
  const [apiKey, setApiKey] = useState('');
  const onInputApiKey = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const onSumbitApiKey = useSubmitApiKey(apiKey);

  const { apiClient } = useResasApiClient();
  useEffect(() => {
    if (apiClient.initialized()) {
      setApiKey(apiClient.resasApiKey);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <form onSubmit={onSumbitApiKey}>
        <label htmlFor='apikey'>RESAS API キーを入力してください</label>
        <input type='text' required placeholder='API キー' value={apiKey} onChange={onInputApiKey} />
        <button type='submit' id='apikey'>
          利用開始
        </button>
      </form>
    </div>
  );
};
