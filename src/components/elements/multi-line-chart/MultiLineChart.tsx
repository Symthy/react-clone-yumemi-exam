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
const generateColorHexStr = () => generateRandRange(50, 255).toString(16);
const generateRandomColor = () => `#${generateColorHexStr()}${generateColorHexStr()}${generateColorHexStr()}`;

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

const convertToDataKey = (input: MultiLineChartInput): string[] => {
  return Object.values(input)
    .flatMap((values) => Object.keys(values))
    .filter((element, index, arr) => arr.indexOf(element) === index);
};

type MultiLineChartProps = {
  input: MultiLineChartInput;
};

export const MultiLineChart = ({ input }: MultiLineChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart data={convertToPlotData(input)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={NameKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {convertToDataKey(input).map((datakey) => (
          <Line key={datakey} connectNulls type='monotone' dataKey={datakey} stroke={generateRandomColor()} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
