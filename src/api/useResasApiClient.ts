import { atom, useAtom } from 'jotai';
import { ResasApiClient } from './resasApiClient';

export const resasApiClientAtom = atom<ResasApiClient>(new ResasApiClient());

type UseResasApiClientReturns = {
  initialized: boolean;
  apiClient: ResasApiClient;
  setApiKey: (apiKey: string) => void;
  resetApiKey: () => void;
};

export const useResasApiClient = (): UseResasApiClientReturns => {
  const [apiClient, setApiClient] = useAtom(resasApiClientAtom);

  const setApiKey = (apiKey: string) => {
    setApiClient(new ResasApiClient(apiKey));
  };
  const resetApiKey = () => {
    setApiClient(new ResasApiClient());
  };
  const initialized = apiClient.initialized();
  return { initialized, apiClient, setApiKey, resetApiKey };
};

// if used zustand
//
// interface ApiClientState {
//   apiCilent: ResasApiClient;
//   initialize: (key: string) => void;
//   reset: () => void;
// }
// export const useResasApiClientStore = create<ApiClientState>((set) => ({
//   apiCilent: new ResasApiClient(),
//   initialize: (key: string) => set({ apiCilent: new ResasApiClient(key) }),
//   reset: () => set({ apiCilent: undefined })
// }));
