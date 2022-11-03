import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MultiLineChartInput } from 'src/types';
import { convertToPlotData } from './converter';
import { useDatakeyToColor } from './useDatakeyToColor';

const NameKey = 'name';

type MultiLineChartProps = {
  input: MultiLineChartInput;
  width?: string;
  height?: number;
  xAliasUnit?: string;
  xAliasTickFormatter?: (tick: any) => any;
  yAliasUnit?: string;
  yAliasWidth?: number;
  yAliasTickFormatter?: (tick: any) => any;
};

export const MultiLineChart = ({
  input,
  width = '100%',
  height = 500,
  xAliasUnit = '',
  xAliasTickFormatter = (tick) => tick, // eslint-disable-line @typescript-eslint/no-unsafe-return
  yAliasUnit = '',
  yAliasWidth = 60,
  yAliasTickFormatter = (tick) => tick // eslint-disable-line @typescript-eslint/no-unsafe-return
}: MultiLineChartProps) => {
  const { dataKeyToColor: xLabelToColor } = useDatakeyToColor(input);

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={convertToPlotData(input)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={NameKey} unit={xAliasUnit} tickFormatter={xAliasTickFormatter} />
        <YAxis unit={yAliasUnit} width={yAliasWidth} tickFormatter={yAliasTickFormatter} />
        <Tooltip formatter={(value, name) => [yAliasTickFormatter(value), xAliasTickFormatter(name)]} />
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
