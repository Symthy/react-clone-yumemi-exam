import { useMemo, useState } from 'react';
import { MultiLineChartInput } from 'src/types';
import { DatakeyToColor } from './types';

const generateRandRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
const generateColorHexStr = () => generateRandRange(100, 255).toString(16);
export const generateRandomColorCode = () =>
  `#${generateColorHexStr()}${generateColorHexStr()}${generateColorHexStr()}`;

const extractToDataKeys = (input: MultiLineChartInput): string[] =>
  Object.values(input)
    .flatMap((values) => Object.keys(values))
    .filter((element, index, arr) => arr.indexOf(element) === index);

const removeNotExistDataKeys = (dataKeyToColor: DatakeyToColor, inputKeys: string[]): DatakeyToColor => {
  const notExistKeys = Object.keys(dataKeyToColor).filter((key) => !inputKeys.includes(key));
  notExistKeys.forEach((key) => delete dataKeyToColor[key]);
  return dataKeyToColor;
};

export const useDatakeyToColor = (input: MultiLineChartInput): { dataKeyToColor: DatakeyToColor } => {
  const [dataKeyToColor, setDataKeyToColor] = useState({});

  const inputKeys = extractToDataKeys(input);
  const joinedInputKeys = inputKeys.sort().join('');

  useMemo(() => {
    setDataKeyToColor((prevDataKeyToColor) => {
      const remainingKeyToColor: DatakeyToColor = removeNotExistDataKeys(prevDataKeyToColor, inputKeys);
      const newKeyToColor: DatakeyToColor = inputKeys
        .filter((key) => !Object.keys(remainingKeyToColor).includes(key))
        .reduce((targetColors, key, _) => {
          const newColors = {
            ...targetColors,
            [key]: generateRandomColorCode()
          };
          return newColors;
        }, {});
      return {
        ...remainingKeyToColor,
        ...newKeyToColor
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinedInputKeys]);

  return { dataKeyToColor };
};
