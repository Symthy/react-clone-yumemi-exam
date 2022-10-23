import { SelectableItem } from 'src/components/templates/selection-area/types';
import { Prefecture } from 'src/types';
import { useConvertToSelectableItems } from './useConvertToSelectableItems';

describe('useConvertToSelectableItems test', () => {
  const input: Prefecture[] = [
    { prefCode: 36, prefName: '徳島県', isSelected: true },
    { prefCode: 37, prefName: '香川県', isSelected: false },
    { prefCode: 38, prefName: '愛媛県', isSelected: false },
    { prefCode: 39, prefName: '高知県', isSelected: false }
  ];
  test('success', () => {
    const converter = useConvertToSelectableItems();
    const expected: SelectableItem[] = [
      { id: '36', label: '徳島県' },
      { id: '37', label: '香川県' },
      { id: '38', label: '愛媛県' },
      { id: '39', label: '高知県' }
    ];
    expect(converter(input)).toStrictEqual(expected);
  });
});
