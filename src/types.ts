export type PrefectureResponeseResult = {
  prefCode: number;
  prefName: string;
};

export type PopulationsResponseResult = {
  boundaryYear: number;
  data: PopulationDataSet[];
};
export type PopulationDataSet = {
  label: string;
  data: PopulationData[];
};
export type PopulationData = {
  year: number;
  value: number;
};
