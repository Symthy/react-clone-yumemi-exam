import { useCallback, useState } from 'react';
import { Population, PopulationDataSet, PopulationResponseResult, PopulationsPerLabel } from 'src/types';
import { PrefectureToPopulationDataSet, PrefectureToPopulationResponseResult } from '../types';

export const usePopulationDatasetsState = () => {
  const [perfectureToPopulationDataSets, setPrefectureToPopulationDataSets] = useState<PrefectureToPopulationDataSet[]>(
    []
  );

  const statisticsItems = Array.from(
    perfectureToPopulationDataSets.reduce<Set<string>>(
      (items, dataset) => new Set([...items, ...dataset.populations.statisticsLabelToPopulations.keys()]),
      new Set()
    )
  );

  const savePopulationDatasets = useCallback((results: PrefectureToPopulationResponseResult[]) => {
    const convertToPopulationDataSet = (result: PopulationResponseResult): PopulationDataSet => {
      const labelToPopulations = new Map<string, Population[]>();
      result.data.forEach((populations: PopulationsPerLabel) => {
        labelToPopulations.set(
          populations.label,
          populations.data.map((population) => ({ year: population.year, value: population.value }))
        );
      });
      return {
        boundaryYear: result.boundaryYear,
        statisticsLabelToPopulations: labelToPopulations
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

    setPrefectureToPopulationDataSets(datasets);
  }, []);

  return { perfectureToPopulationDataSets, statisticsItems, savePopulationDatasets };
};
