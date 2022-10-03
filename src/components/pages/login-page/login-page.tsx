import { ChangeEvent, FormEvent, useState } from 'react';
import { useResasApiClientStore } from 'src/api/useResasApiClientStore';
import { useRedirectAfterLogin } from 'src/routes/useRedirectAfterLogin';

export const LoginPage = () => {
  const [apiKey, setApiKey] = useState('');
  const onInputApiKey = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const redirector = useRedirectAfterLogin();
  const [, , setResasApiKey] = useResasApiClientStore();
  const onSumbitApiKey = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResasApiKey(apiKey);
    redirector();
  };

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
