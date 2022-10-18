import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { convertToPlotData } from './converter';
import { MultiLineChartInput } from './types';
import { useDatakeyToColor } from './useDatakeyToColor';

const NameKey = 'name';

type MultiLineChartProps = {
  input: MultiLineChartInput;
};

export const MultiLineChart = ({ input }: MultiLineChartProps) => {
  const { dataKeyToColor } = useDatakeyToColor(input);

  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart data={convertToPlotData(input)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={NameKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(dataKeyToColor).map((datakey) => (
          <Line key={datakey} connectNulls type='monotone' dataKey={datakey} stroke={dataKeyToColor[datakey]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
