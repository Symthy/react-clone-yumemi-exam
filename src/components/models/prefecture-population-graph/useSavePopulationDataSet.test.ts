/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { Population } from 'src/types';
import { PrefectureToPopulationDataSet } from './type';
import { useSavePopulationDataset } from './useSavePopulationDataSet';

describe('useSavePopulationDataSet test', () => {
  test('success', () => {
    const mockSetPrefectureToPopulationDataSet = jest.fn();
    const inputData = [
      {
        prefName: '徳島県',
        populations: {
          boundaryYear: 2015,
          data: [
            {
              label: '総人口',
              data: [
                { year: 1980, value: 825261 },
                { year: 1985, value: 834889 },
                { year: 1990, value: 831598 },
                { year: 1995, value: 832427 },
                { year: 2000, value: 824108 },
                { year: 2005, value: 809950 },
                { year: 2010, value: 785491 },
                { year: 2015, value: 755733 },
                { year: 2020, value: 723087 },
                { year: 2025, value: 687680 }
              ]
            },
            {
              label: '生産年齢人口',
              data: [
                { year: 1980, value: 550779, rate: 66.7 },
                { year: 1985, value: 553858, rate: 66.3 },
                { year: 1990, value: 551067, rate: 66.2 },
                { year: 1995, value: 541945, rate: 65.1 },
                { year: 2000, value: 525724, rate: 63.7 },
                { year: 2005, value: 506642, rate: 62.5 },
                { year: 2010, value: 471788, rate: 60 },
                { year: 2015, value: 428059, rate: 56.6 },
                { year: 2020, value: 398106, rate: 55 },
                { year: 2025, value: 370243, rate: 53.8 }
              ]
            }
          ]
        }
      },
      {
        prefName: '香川県',
        populations: {
          boundaryYear: 2015,
          data: [
            {
              label: '総人口',
              data: [
                { year: 1980, value: 999864 },
                { year: 1985, value: 1022569 },
                { year: 1990, value: 1023412 },
                { year: 1995, value: 1027006 },
                { year: 2000, value: 1022890 },
                { year: 2005, value: 1012400 },
                { year: 2010, value: 995842 },
                { year: 2015, value: 976263 },
                { year: 2020, value: 951400 },
                { year: 2025, value: 921343 }
              ]
            },
            {
              label: '生産年齢人口',
              data: [
                { year: 1980, value: 658291, rate: 65.8 },
                { year: 1985, value: 672022, rate: 65.7 },
                { year: 1990, value: 680493, rate: 66.4 },
                { year: 1995, value: 678404, rate: 66 },
                { year: 2000, value: 659881, rate: 64.5 },
                { year: 2005, value: 635746, rate: 62.7 },
                { year: 2010, value: 595451, rate: 59.7 },
                { year: 2015, value: 547844, rate: 56.1 },
                { year: 2020, value: 530820, rate: 55.7 },
                { year: 2025, value: 508666, rate: 55.2 }
              ]
            }
          ]
        }
      }
    ];

    const expected: PrefectureToPopulationDataSet[] = [
      {
        prefName: '徳島県',
        populations: {
          boundaryYear: 2015,
          labelToPopulations: new Map<string, Population[]>([
            [
              '総人口',
              [
                { year: 1980, value: 825261 },
                { year: 1985, value: 834889 },
                { year: 1990, value: 831598 },
                { year: 1995, value: 832427 },
                { year: 2000, value: 824108 },
                { year: 2005, value: 809950 },
                { year: 2010, value: 785491 },
                { year: 2015, value: 755733 },
                { year: 2020, value: 723087 },
                { year: 2025, value: 687680 }
              ]
            ],
            [
              '生産年齢人口',
              [
                { year: 1980, value: 550779 },
                { year: 1985, value: 553858 },
                { year: 1990, value: 551067 },
                { year: 1995, value: 541945 },
                { year: 2000, value: 525724 },
                { year: 2005, value: 506642 },
                { year: 2010, value: 471788 },
                { year: 2015, value: 428059 },
                { year: 2020, value: 398106 },
                { year: 2025, value: 370243 }
              ]
            ]
          ])
        }
      },
      {
        prefName: '香川県',
        populations: {
          boundaryYear: 2015,
          labelToPopulations: new Map<string, Population[]>([
            [
              '総人口',
              [
                { year: 1980, value: 999864 },
                { year: 1985, value: 1022569 },
                { year: 1990, value: 1023412 },
                { year: 1995, value: 1027006 },
                { year: 2000, value: 1022890 },
                { year: 2005, value: 1012400 },
                { year: 2010, value: 995842 },
                { year: 2015, value: 976263 },
                { year: 2020, value: 951400 },
                { year: 2025, value: 921343 }
              ]
            ],
            [
              '生産年齢人口',
              [
                { year: 1980, value: 658291 },
                { year: 1985, value: 672022 },
                { year: 1990, value: 680493 },
                { year: 1995, value: 678404 },
                { year: 2000, value: 659881 },
                { year: 2005, value: 635746 },
                { year: 2010, value: 595451 },
                { year: 2015, value: 547844 },
                { year: 2020, value: 530820 },
                { year: 2025, value: 508666 }
              ]
            ]
          ])
        }
      }
    ];

    renderHook(() => useSavePopulationDataset(inputData, mockSetPrefectureToPopulationDataSet));
    expect(mockSetPrefectureToPopulationDataSet).toHaveBeenCalled();
    expect(mockSetPrefectureToPopulationDataSet).toHaveBeenCalledWith(expected);
  });
});
