import { Prefecture } from 'src/types';
import { useUpdateSelectedPrefecture } from './useUpdateSelectedPrefecture';

describe('useUpdateSelectedPrefecture test', () => {
  test('success', () => {
    let prefectures: Prefecture[] = [
      { prefCode: 36, prefName: '徳島県', isSelected: true },
      { prefCode: 37, prefName: '香川県', isSelected: false },
      { prefCode: 38, prefName: '愛媛県', isSelected: false },
      { prefCode: 39, prefName: '高知県', isSelected: false }
    ];
    const setPrefectures = (input: Prefecture[]) => {
      prefectures = input;
    };
    const updater = useUpdateSelectedPrefecture(prefectures, setPrefectures);
    updater('38', true);
    expect(prefectures).toStrictEqual([
      { prefCode: 36, prefName: '徳島県', isSelected: true },
      { prefCode: 37, prefName: '香川県', isSelected: false },
      { prefCode: 38, prefName: '愛媛県', isSelected: true },
      { prefCode: 39, prefName: '高知県', isSelected: false }
    ]);
  });
  test('specifed non-exist key', () => {
    let prefectures: Prefecture[] = [
      { prefCode: 36, prefName: '徳島県', isSelected: true },
      { prefCode: 37, prefName: '香川県', isSelected: false },
      { prefCode: 38, prefName: '愛媛県', isSelected: false },
      { prefCode: 39, prefName: '高知県', isSelected: false }
    ];
    const setPrefectures = (input: Prefecture[]) => {
      prefectures = input;
    };
    const updater = useUpdateSelectedPrefecture(prefectures, setPrefectures);
    updater('1', true);
    expect(prefectures).toStrictEqual([
      { prefCode: 36, prefName: '徳島県', isSelected: true },
      { prefCode: 37, prefName: '香川県', isSelected: false },
      { prefCode: 38, prefName: '愛媛県', isSelected: false },
      { prefCode: 39, prefName: '高知県', isSelected: false }
    ]);
  });
});
