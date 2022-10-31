/**
 * @jest-environment jsdom
 */

import { FormEvent } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { ResasApiClient } from 'src/api/resasApiClient';
import * as useResasApiClientModule from 'src/api/useResasApiClient';
import * as reactQueryModule from 'src/libs/react-query';
import * as redirectorModule from 'src/routes/useRedirectAfterLogin';
import { useSubmitApiKey } from './useSubmitApiKey';
import * as validaterModule from './validater';

describe('useSubmitApiKey test', () => {
  let mockApiClient: ResasApiClient;
  const spiedValidateApiKey = jest.spyOn(validaterModule, 'validateApiKey').mockResolvedValue(true);
  const spiedResetQueryCache = jest.spyOn(reactQueryModule, 'resetQueryCache');
  const spiedRedirector = jest.spyOn(redirectorModule, 'useRedirectAfterLogin').mockImplementation(() => () => {});
  const spiedUseResasApiClient = jest.spyOn(useResasApiClientModule, 'useResasApiClient').mockImplementation(() => {
    const setApiKey = (apiKey: string) => {
      mockApiClient = new ResasApiClient(apiKey);
    };
    const initialized = mockApiClient.initialized();
    return { initialized, apiClient: mockApiClient, setApiKey };
  });
  const e = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
  const spiedPreventDefault = jest.spyOn(e, 'preventDefault');

  test('first execution', async () => {
    mockApiClient = new ResasApiClient();
    const apiKey = 'test-key';
    const { onSubmitApiKey } = useSubmitApiKey(apiKey);
    renderHook(() => onSubmitApiKey(e));

    await waitFor(() => {
      expect(spiedValidateApiKey).toHaveBeenCalled();
      expect(spiedUseResasApiClient).toHaveBeenCalled();
      expect(spiedResetQueryCache).toHaveBeenCalledTimes(0);
      expect(spiedRedirector).toHaveBeenCalled();
      expect(spiedPreventDefault).toHaveBeenCalled();
      expect(mockApiClient.resasApiKey).toBe(apiKey);
    });
  });

  test('change api key', async () => {
    mockApiClient = new ResasApiClient('initialized');
    const apiKey = 'test-key';
    const { onSubmitApiKey } = useSubmitApiKey(apiKey);
    renderHook(() => onSubmitApiKey(e));

    await waitFor(() => {
      expect(spiedValidateApiKey).toHaveBeenCalled();
      expect(spiedUseResasApiClient).toHaveBeenCalled();
      expect(spiedResetQueryCache).toHaveBeenCalledTimes(1);
      expect(spiedRedirector).toHaveBeenCalled();
      expect(spiedPreventDefault).toHaveBeenCalled();
      expect(mockApiClient.resasApiKey).toBe(apiKey);
    });
  });
});
