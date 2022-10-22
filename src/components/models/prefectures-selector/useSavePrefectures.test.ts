/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { PrefectureResponeseResult } from 'src/types';
import { useSavePrefectures } from './useSavePrefectures';

describe('useSavePrefectures test', () => {
  test('success', () => {
    const mockSetPrefectures = jest.fn();
    const inputeResponse: PrefectureResponeseResult[] = [
      { prefCode: 36, prefName: '徳島県' },
      { prefCode: 37, prefName: '香川県' },
      { prefCode: 38, prefName: '愛媛県' },
      { prefCode: 39, prefName: '高知県' }
    ];
    const expected = inputeResponse.map((res) => ({
      ...res,
      isSelected: false
    }));
    renderHook(() => useSavePrefectures(inputeResponse, mockSetPrefectures));
    expect(mockSetPrefectures).toHaveBeenCalled();
    expect(mockSetPrefectures).toHaveBeenCalledWith(expected);
  });
});
