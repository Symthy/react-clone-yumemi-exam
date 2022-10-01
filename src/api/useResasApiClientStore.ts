import { atom, SetStateAction, useAtom } from 'jotai';
import { ResasApiClient } from './resasApiClient';

export const resasApiClientAtom = atom<ResasApiClient>(new ResasApiClient());

export const useResasApiClientStore = (): [ResasApiClient, (update: SetStateAction<ResasApiClient>) => void] => {
  const [apiClient, setApiClient] = useAtom(resasApiClientAtom);
  return [apiClient, setApiClient];
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
