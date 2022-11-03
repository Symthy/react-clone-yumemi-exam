import { PopulationDataSet, PopulationResponseResult } from 'src/types';

export type PrefectureToPopulationResponseResult = {
  prefName: string;
  populations: PopulationResponseResult;
};

export type PrefectureToPopulationDataSet = {
  prefName: string;
  populations: PopulationDataSet;
};
