/**
 * @jest-environment jsdom
 */

import { FormEvent } from 'react';
import { renderHook } from '@testing-library/react';
import { ResasApiClient } from 'src/api/resasApiClient';
import * as useResasApiClientModule from 'src/api/useResasApiClient';
import * as reactQueryModule from 'src/libs/react-query';
import * as redirectorModule from 'src/routes/useRedirectAfterLogin';
import { useSubmitApiKey } from './useSubmitApiKey';

describe('useSubmitApiKey test', () => {
  let mockApiClient: ResasApiClient;
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

  test('first execution', () => {
    mockApiClient = new ResasApiClient();
    const apiKey = 'test-key';
    const onSubmitApiKey = useSubmitApiKey(apiKey);
    renderHook(() => onSubmitApiKey(e));

    expect(spiedUseResasApiClient).toHaveBeenCalled();
    expect(spiedResetQueryCache).toHaveBeenCalledTimes(0);
    expect(spiedRedirector).toHaveBeenCalled();
    expect(spiedPreventDefault).toHaveBeenCalled();
    expect(mockApiClient.resasApiKey).toBe(apiKey);
  });

  test('change api key', () => {
    mockApiClient = new ResasApiClient('initialized');
    const apiKey = 'test-key';
    const onSubmitApiKey = useSubmitApiKey(apiKey);
    renderHook(() => onSubmitApiKey(e));

    expect(spiedUseResasApiClient).toHaveBeenCalled();
    expect(spiedResetQueryCache).toHaveBeenCalledTimes(1);
    expect(spiedRedirector).toHaveBeenCalled();
    expect(spiedPreventDefault).toHaveBeenCalled();
    expect(mockApiClient.resasApiKey).toBe(apiKey);
  });
});
