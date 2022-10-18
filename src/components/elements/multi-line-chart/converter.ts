import { MultiLineChartInput, RechartPlotData } from './types';

export const convertToPlotData = (input: MultiLineChartInput): RechartPlotData[] => {
  const dataset: RechartPlotData[] = Object.keys(input).map((key) => {
    const records = input[key];
    return {
      name: key,
      ...records
    };
  });
  return dataset;
};
