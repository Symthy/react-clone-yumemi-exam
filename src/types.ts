export type MultiLineChartInput = Record<string, Record<string, number>>;
/* example
  { xAxisLabel: { usageGuide: value } }
*/

export type PrefectureResponeseResult = {
  prefCode: number;
  prefName: string;
};

export type Prefecture = PrefectureResponeseResult & {
  isSelected: boolean;
};

export type PopulationResponseResult = {
  boundaryYear: number;
  data: PopulationsPerLabel[];
};

export type PopulationDataSet = {
  boundaryYear: number;
  statisticsLabelToPopulations: Map<string, Population[]>; // key: label
};

export type PopulationsPerLabel = {
  label: string;
  data: Population[];
};
export type Population = {
  year: number;
  value: number;
};
