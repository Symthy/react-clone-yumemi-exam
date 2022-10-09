import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { resetQueryCache } from 'src/libs/react-query';
import { useRedirectAfterLogin } from 'src/routes/useRedirectAfterLogin';

export const LoginPage = () => {
  const [apiKey, setApiKey] = useState('');
  const onInputApiKey = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const redirector = useRedirectAfterLogin();
  const { apiClient, setApiKey: setResasApiKey } = useResasApiClient();
  const onSumbitApiKey = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResasApiKey(apiKey);
    redirector();
  };

  useEffect(() => {
    if (apiClient.initialized()) {
      setApiKey(apiClient.resasApiKey);
      resetQueryCache();
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
