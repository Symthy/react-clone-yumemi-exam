import { SelectableItem } from 'src/components/templates/selection-area/types';
import { MultiLineChartInput, Population, Prefecture } from 'src/types';
import { PrefectureToPopulationDataSet } from '../types';
import { convertToMultiLineInput, convertToSelectableItems } from './converter';

describe('convertToMultiLineInput test', () => {
  test('success', () => {
    const inputDataSet: PrefectureToPopulationDataSet[] = [
      {
        prefName: '徳島県',
        populations: {
          boundaryYear: 2015,
          statisticsLabelToPopulations: new Map<string, Population[]>([
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
          statisticsLabelToPopulations: new Map<string, Population[]>([
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
    const expected: MultiLineChartInput = {
      '1980': { 徳島県: 825261, 香川県: 999864 },
      '1985': { 徳島県: 834889, 香川県: 1022569 },
      '1990': { 徳島県: 831598, 香川県: 1023412 },
      '1995': { 徳島県: 832427, 香川県: 1027006 },
      '2000': { 徳島県: 824108, 香川県: 1022890 },
      '2005': { 徳島県: 809950, 香川県: 1012400 },
      '2010': { 徳島県: 785491, 香川県: 995842 },
      '2015': { 徳島県: 755733, 香川県: 976263 }
    };

    expect(convertToMultiLineInput('総人口', inputDataSet)).toStrictEqual(expected);
  });
});

describe('convertToSelectableItems test', () => {
  const input: Prefecture[] = [
    { prefCode: 36, prefName: '徳島県', isSelected: true },
    { prefCode: 37, prefName: '香川県', isSelected: false },
    { prefCode: 38, prefName: '愛媛県', isSelected: false },
    { prefCode: 39, prefName: '高知県', isSelected: false }
  ];
  test('success', () => {
    const expected: SelectableItem[] = [
      { id: '36', label: '徳島県' },
      { id: '37', label: '香川県' },
      { id: '38', label: '愛媛県' },
      { id: '39', label: '高知県' }
    ];
    expect(convertToSelectableItems(input)).toStrictEqual(expected);
  });
});
