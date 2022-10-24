import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MultiLineChartInput } from 'src/types';
import { convertToPlotData } from './converter';
import { useDatakeyToColor } from './useDatakeyToColor';

const NameKey = 'name';

type MultiLineChartProps = {
  input: MultiLineChartInput;
};

export const MultiLineChart = ({ input }: MultiLineChartProps) => {
  const { dataKeyToColor: xLabelToColor } = useDatakeyToColor(input);

  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart data={convertToPlotData(input)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={NameKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(xLabelToColor).map((xLabel) => (
          <Line
            key={`line-${xLabel}`}
            connectNulls
            type='monotone'
            dataKey={xLabel}
            stroke={xLabelToColor[xLabel]}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
