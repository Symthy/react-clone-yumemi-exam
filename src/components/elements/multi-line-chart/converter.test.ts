import { convertToPlotData } from './converter';
import { MultiLineChartInput, RechartPlotData } from './types';

test('convert to plot data', () => {
  const testInput: MultiLineChartInput = {
    '10s': {
      data1: 110,
      data2: 210,
      data3: 310
    },
    '20s': {
      data1: 120,
      data2: 220,
      data3: 320
    },
    '30s': {
      data1: 130,
      data2: 230,
      data3: 330
    }
  };

  const expected: RechartPlotData[] = [
    {
      name: '10s',
      data1: 110,
      data2: 210,
      data3: 310
    },
    {
      name: '20s',
      data1: 120,
      data2: 220,
      data3: 320
    },
    {
      name: '30s',
      data1: 130,
      data2: 230,
      data3: 330
    }
  ];

  expect(convertToPlotData(testInput)).toEqual(expected);
});
