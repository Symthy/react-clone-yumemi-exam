/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { DatakeyToColor, MultiLineChartInput } from './types';
import { useDatakeyToColor } from './useDatakeyToColor';
import * as useDatakeyToColorModule from './useDatakeyToColor';

describe('useDataKeyToColor test', () => {
  test('input is empty', () => {
    const input: MultiLineChartInput = {};
    const expected: DatakeyToColor = {};

    const { result } = renderHook(() => useDatakeyToColor(input));
    expect(result.current.dataKeyToColor).toStrictEqual(expected);
  });

  test('input is new data', () => {
    const spiedGenerateRandomColorCode = jest.spyOn(useDatakeyToColorModule, 'generateRandomColorCode');

    /* 1回目 */
    spiedGenerateRandomColorCode
      .mockReturnValue('#000000')
      .mockReturnValueOnce('#010101')
      .mockReturnValueOnce('#020202')
      .mockReturnValueOnce('#030303');
    const input1: MultiLineChartInput = {
      key1: { data1: 110, data2: 210, data3: 310 },
      key2: { data1: 120, data2: 220, data3: 320 },
      key3: { data1: 130, data2: 230, data3: 330 }
    };
    const expected1 = {
      data1: '#010101',
      data2: '#020202',
      data3: '#030303'
    };
    const { result, rerender } = renderHook((input: MultiLineChartInput) => useDatakeyToColor(input), {
      initialProps: input1
    });
    expect(spiedGenerateRandomColorCode).toHaveBeenCalledTimes(3);
    expect(result.current.dataKeyToColor).toStrictEqual(expected1);

    /* 2回目: 入力データ変化なし */
    spiedGenerateRandomColorCode.mockClear(); // 呼び出し回数リセット
    rerender(input1);
    expect(spiedGenerateRandomColorCode).toHaveBeenCalledTimes(0);
    expect(result.current.dataKeyToColor).toStrictEqual(expected1);

    /* 3回目: 入力データ増加 */
    spiedGenerateRandomColorCode.mockReset();
    spiedGenerateRandomColorCode.mockReturnValue('#000000').mockReturnValueOnce('#040404');
    const input2: MultiLineChartInput = {
      key1: { ...input1.key1, data4: 410 },
      key2: { ...input1.key2, data4: 420 },
      key3: { ...input1.key3, data4: 430 }
    };
    const expected2 = {
      data1: '#010101',
      data2: '#020202',
      data3: '#030303',
      data4: '#040404'
    };
    rerender(input2);
    expect(result.current.dataKeyToColor).toStrictEqual(expected2);
    expect(spiedGenerateRandomColorCode).toHaveBeenCalledTimes(1);

    /* 4回目: データ減少＆増加 */
    spiedGenerateRandomColorCode.mockReset();
    spiedGenerateRandomColorCode
      .mockReturnValue('#000000')
      .mockReturnValueOnce('#050505')
      .mockReturnValueOnce('#060606');
    const input3: MultiLineChartInput = {
      key1: { data3: 310, data5: 510, data6: 610 },
      key2: { data3: 320, data5: 520, data6: 620 },
      key3: { data3: 330, data5: 530, data6: 630 }
    };
    const expected3 = {
      data3: '#030303',
      data5: '#050505',
      data6: '#060606'
    };
    rerender(input3);
    expect(result.current.dataKeyToColor).toStrictEqual(expected3);
    expect(spiedGenerateRandomColorCode).toHaveBeenCalledTimes(2);

    /* 5回目: キー変更/データ変更なし */
    spiedGenerateRandomColorCode.mockReset();
    spiedGenerateRandomColorCode.mockReturnValue('#000000');

    const input4: MultiLineChartInput = {
      key2: { data3: 320, data5: 520, data6: 620 },
      key4: { data3: 340, data5: 540, data6: 640 },
      key5: { data3: 350, data5: 550, data6: 650 }
    };
    const expected4 = {
      data3: '#030303',
      data5: '#050505',
      data6: '#060606'
    };
    rerender(input4);
    expect(result.current.dataKeyToColor).toStrictEqual(expected4);
    expect(spiedGenerateRandomColorCode).toHaveBeenCalledTimes(0);
  });
});
