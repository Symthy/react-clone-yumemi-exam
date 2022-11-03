/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { Prefecture, PrefectureResponeseResult } from 'src/types';
import { usePrefecturesState } from './usePrefecturesState';

describe('usePrefecturesState test', () => {
  describe('savePrefectures test', () => {
    test('response is exists', () => {
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
      const { result, rerender } = renderHook(() => usePrefecturesState());
      result.current.savePrefectures(inputeResponse);
      rerender();

      expect(result.current.prefectures).toStrictEqual(expected);
    });

    test('response is empty', () => {
      const { result, rerender } = renderHook(() => usePrefecturesState());
      result.current.savePrefectures(undefined);
      rerender();

      expect(result.current.prefectures).toStrictEqual([]);
    });
  });

  describe('updateSelectedPrefecture test', () => {
    test('specifed exist key', () => {
      const testPrefectures: Prefecture[] = [
        { prefCode: 36, prefName: '徳島県', isSelected: true },
        { prefCode: 37, prefName: '香川県', isSelected: false },
        { prefCode: 38, prefName: '愛媛県', isSelected: false },
        { prefCode: 39, prefName: '高知県', isSelected: false }
      ];
      const { result, rerender } = renderHook(() => usePrefecturesState());
      result.current.savePrefectures(testPrefectures);
      rerender();

      result.current.updateSelectedPrefecture('38', true);
      rerender();
      expect(result.current.prefectures).toStrictEqual([
        { prefCode: 36, prefName: '徳島県', isSelected: true },
        { prefCode: 37, prefName: '香川県', isSelected: false },
        { prefCode: 38, prefName: '愛媛県', isSelected: true },
        { prefCode: 39, prefName: '高知県', isSelected: false }
      ]);
    });

    test('specifed non-exist key', () => {
      const testPrefectures: Prefecture[] = [
        { prefCode: 36, prefName: '徳島県', isSelected: true },
        { prefCode: 37, prefName: '香川県', isSelected: false },
        { prefCode: 38, prefName: '愛媛県', isSelected: false },
        { prefCode: 39, prefName: '高知県', isSelected: false }
      ];
      const { result, rerender } = renderHook(() => usePrefecturesState());
      result.current.savePrefectures(testPrefectures);
      rerender();

      result.current.updateSelectedPrefecture('1', true);
      rerender();
      expect(result.current.prefectures).toStrictEqual([
        { prefCode: 36, prefName: '徳島県', isSelected: true },
        { prefCode: 37, prefName: '香川県', isSelected: false },
        { prefCode: 38, prefName: '愛媛県', isSelected: false },
        { prefCode: 39, prefName: '高知県', isSelected: false }
      ]);
    });
  });
});
