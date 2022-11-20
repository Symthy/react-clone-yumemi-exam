import { useContext, createContext } from 'react';

export const EnabledE2EContext = createContext(false);

export const useEnabledE2EMode = (): boolean => useContext(EnabledE2EContext);
