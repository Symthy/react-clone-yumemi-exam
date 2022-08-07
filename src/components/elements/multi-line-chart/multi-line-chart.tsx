import { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const NameKey = 'name';
type RechartPlotData =
  | {
      NameKey: string;
    }
  | Record<string, number>;
// const _: RechartPlotData = {
//   name: 'aaa',
//   data1: 100,
//   data2: 200
// };

type MultiLineChartInput = Record<string, Record<string, number>>;

const generateRandRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
const generateColorHexStr = () => generateRandRange(80, 255).toString(16);
const generateRandomColorCode = () => `#${generateColorHexStr()}${generateColorHexStr()}${generateColorHexStr()}`;

export const convertToPlotData = (input: MultiLineChartInput): RechartPlotData[] => {
  const dataset: RechartPlotData[] = Object.keys(input).map((key) => {
    const records = input[key];
    return {
      NameKey: key,
      ...records
    };
  });
  return dataset;
};

const convertToDataKeys = (input: MultiLineChartInput): string[] =>
  Object.values(input)
    .flatMap((values) => Object.keys(values))
    .filter((element, index, arr) => arr.indexOf(element) === index);
type KeyToColor = {
  [key: string]: string;
};
const removeNotExistDataKeys = (dataKeyToColor: KeyToColor, inputKeys: string[]): KeyToColor => {
  const notExistKeys = Object.keys(dataKeyToColor).filter((key) => !inputKeys.includes(key));
  notExistKeys.forEach((key) => delete dataKeyToColor[key]);
  return dataKeyToColor;
};

type MultiLineChartProps = {
  input: MultiLineChartInput;
};

export const MultiLineChart = ({ input }: MultiLineChartProps) => {
  const [dataKeyToColor, setDataKeyToColor] = useState({});

  const inputKeys = convertToDataKeys(input);
  const currentKeyToColor: KeyToColor = removeNotExistDataKeys(dataKeyToColor, inputKeys);
  const newKeyToColor: KeyToColor = inputKeys
    .filter((key) => !Object.keys(currentKeyToColor).includes(key))
    .reduce((targetColors, key, index) => {
      const newColors = {
        ...targetColors,
        [key]: generateRandomColorCode()
      };
      return newColors;
    }, {});
  const updatedKeyToColor: KeyToColor = {
    ...currentKeyToColor,
    ...newKeyToColor
  };

  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart data={convertToPlotData(input)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={NameKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(updatedKeyToColor).map((datakey) => (
          <Line key={datakey} connectNulls type='monotone' dataKey={datakey} stroke={updatedKeyToColor[datakey]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
