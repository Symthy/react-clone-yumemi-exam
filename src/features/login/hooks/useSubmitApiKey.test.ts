/**
 * @jest-environment jsdom
 */

import { FormEvent } from 'react';
import * as errorBoundaryModule from 'react-error-boundary';
import { renderHook, waitFor } from '@testing-library/react';
import { ApiClientError, ApiServerError } from 'src/api/error';
import { ResasApiClient } from 'src/api/resasApiClient';
import * as useResasApiClientModule from 'src/api/useResasApiClient';
import * as reactQueryModule from 'src/libs/react-query';
import * as toastModule from 'src/libs/toast';
import * as redirectorModule from 'src/routes/hooks/useRedirectAfterLogin';
import { useSubmitApiKey } from './useSubmitApiKey';
import * as validaterModule from './validator';

describe('useSubmitApiKey test', () => {
  let mockApiClient: ResasApiClient;
  const spiedValidateApiKey = jest.spyOn(validaterModule, 'validateApiKey').mockResolvedValue(true);
  const spiedResetQueryCache = jest.spyOn(reactQueryModule, 'resetQueryCache');
  const spiedRedirector = jest.spyOn(redirectorModule, 'useRedirectAfterLogin').mockImplementation(() => () => {});
  const spiedUseResasApiClient = jest.spyOn(useResasApiClientModule, 'useResasApiClient').mockImplementation(() => {
    const setApiKey = (apiKey: string) => {
      mockApiClient = new ResasApiClient(apiKey);
    };
    const resetApiKey = () => {};
    const initialized = mockApiClient.initialized();
    return { initialized, apiClient: mockApiClient, setApiKey, resetApiKey };
  });
  const spiedOnCustomToaster = jest.spyOn(toastModule, 'onCustomToaster');
  const mockErrorHandler = jest.fn();
  const spiedUseErrorHandler = jest
    .spyOn(errorBoundaryModule, 'useErrorHandler')
    .mockImplementation(() => mockErrorHandler);
  const e = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
  const spiedPreventDefault = jest.spyOn(e, 'preventDefault');

  beforeEach(() => {
    spiedValidateApiKey.mockClear();
    spiedResetQueryCache.mockClear();
    spiedRedirector.mockClear();
    spiedUseResasApiClient.mockClear();
    spiedOnCustomToaster.mockClear();
    spiedUseErrorHandler.mockClear();
    mockErrorHandler.mockClear();
    spiedPreventDefault.mockClear();
  });

  test('first execution', async () => {
    mockApiClient = new ResasApiClient();
    const apiKey = 'test-key';

    renderHook(() => {
      const { onSubmitApiKey } = useSubmitApiKey(apiKey);
      void onSubmitApiKey(e);
    });

    await waitFor(() => {
      expect(spiedValidateApiKey).toHaveBeenCalled();
      expect(spiedUseResasApiClient).toHaveBeenCalled();
      expect(spiedResetQueryCache).toHaveBeenCalledTimes(0);
      expect(spiedRedirector).toHaveBeenCalled();
      expect(spiedPreventDefault).toHaveBeenCalled();
      expect(spiedUseErrorHandler).toHaveBeenCalledTimes(1);
      expect(mockErrorHandler).toHaveBeenCalledTimes(0);
      expect(spiedOnCustomToaster).toHaveBeenCalledTimes(0);
      expect(mockApiClient.resasApiKey).toBe(apiKey);
    });
  });

  test('change api key', async () => {
    mockApiClient = new ResasApiClient('initialized');
    const apiKey = 'test-key';
    renderHook(() => {
      const { onSubmitApiKey } = useSubmitApiKey(apiKey);
      void onSubmitApiKey(e);
    });

    await waitFor(() => {
      expect(spiedValidateApiKey).toHaveBeenCalled();
      expect(spiedUseResasApiClient).toHaveBeenCalled();
      expect(spiedResetQueryCache).toHaveBeenCalledTimes(1);
      expect(spiedRedirector).toHaveBeenCalled();
      expect(spiedPreventDefault).toHaveBeenCalled();
      expect(spiedUseErrorHandler).toHaveBeenCalledTimes(1);
      expect(mockErrorHandler).toHaveBeenCalledTimes(0);
      expect(spiedOnCustomToaster).toHaveBeenCalledTimes(0);
      expect(mockApiClient.resasApiKey).toBe(apiKey);
    });
  });

  test('api client error', async () => {
    mockApiClient = new ResasApiClient('initialized');
    const apiKey = 'test-key';
    const spiedValidateApiKeyForError = jest.spyOn(validaterModule, 'validateApiKey').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject(new ApiClientError('403', 'Forbidden'));
        })
    );

    renderHook(() => {
      const { onSubmitApiKey } = useSubmitApiKey(apiKey);
      void onSubmitApiKey(e);
    });

    await waitFor(() => {
      expect(spiedValidateApiKeyForError).toHaveBeenCalled();
      expect(spiedUseResasApiClient).toHaveBeenCalled();
      expect(spiedResetQueryCache).toHaveBeenCalledTimes(1);
      expect(spiedRedirector).toHaveBeenCalled();
      expect(spiedPreventDefault).toHaveBeenCalled();
      expect(spiedUseErrorHandler).toHaveBeenCalledTimes(1);
      expect(mockErrorHandler).toHaveBeenCalledTimes(0);
      expect(spiedOnCustomToaster).toHaveBeenCalledTimes(1);
      expect(mockApiClient.resasApiKey).toBe('initialized');
    });
  });

  test('api server error', async () => {
    mockApiClient = new ResasApiClient('initialized');
    const apiKey = 'test-key';
    const spiedValidateApiKeyForError = jest.spyOn(validaterModule, 'validateApiKey').mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject(new ApiServerError('500', 'Server Error'));
        })
    );

    renderHook(() => {
      const { onSubmitApiKey } = useSubmitApiKey(apiKey);
      void onSubmitApiKey(e);
    });

    await waitFor(() => {
      expect(spiedValidateApiKeyForError).toHaveBeenCalled();
      expect(spiedUseResasApiClient).toHaveBeenCalled();
      expect(spiedResetQueryCache).toHaveBeenCalledTimes(1);
      expect(spiedRedirector).toHaveBeenCalled();
      expect(spiedPreventDefault).toHaveBeenCalled();
      expect(spiedUseErrorHandler).toHaveBeenCalledTimes(1);
      expect(mockErrorHandler).toHaveBeenCalledTimes(1);
      expect(spiedOnCustomToaster).toHaveBeenCalledTimes(0);
      expect(mockApiClient.resasApiKey).toBe('initialized');
    });
  });
});
