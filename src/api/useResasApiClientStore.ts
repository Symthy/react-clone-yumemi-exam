import { atom, useAtom } from 'jotai';
import { ResasApiClient } from './resasApiClient';

export const resasApiClientAtom = atom<ResasApiClient>(new ResasApiClient());

export const useResasApiClientStore = (): [boolean, ResasApiClient, (apiKey: string) => void] => {
  const [apiClient, setApiClient] = useAtom(resasApiClientAtom);

  const setApiKey = (apiKey: string) => {
    setApiClient(new ResasApiClient(apiKey));
  };
  const initialized = apiClient.initialized();

  return [initialized, apiClient, setApiKey];
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
