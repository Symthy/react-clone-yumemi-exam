import { useEffect } from 'react';
import { Population, PopulationDataSet, PopulationResponseResult, PopulationsPerLabel } from 'src/types';
import { PrefectureToPopulationDataSet, PrefectureToPopulationResponseResult } from './type';

export const useSavePopulationDataset = (
  results: PrefectureToPopulationResponseResult[],
  setPrefectureToPopulationDataSet: (datasets: PrefectureToPopulationDataSet[]) => void
) => {
  const perfNamesKey = results.reduce((prevKeys, current) => prevKeys + current.prefName, '');

  useEffect(() => {
    const convertToPopulationDataSet = (result: PopulationResponseResult): PopulationDataSet => {
      const labelToPopulations = new Map<string, Population[]>();
      result.data.forEach((data: PopulationsPerLabel) => {
        labelToPopulations.set(
          data.label,
          data.data.map((population) => ({ year: population.year, value: population.value }))
        );
      });
      return {
        boundaryYear: result.boundaryYear,
        labelToPopulations
      };
    };
    const datasets = results.reduce<PrefectureToPopulationDataSet[]>((prevDatasets, currentResult) => {
      if (currentResult) {
        prevDatasets.push({
          prefName: currentResult.prefName,
          populations: convertToPopulationDataSet(currentResult.populations)
        });
      }
      return prevDatasets;
    }, []);
    setPrefectureToPopulationDataSet(datasets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfNamesKey, setPrefectureToPopulationDataSet]);
};
