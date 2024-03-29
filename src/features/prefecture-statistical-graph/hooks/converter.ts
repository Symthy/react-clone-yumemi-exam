import { SelectableItem } from 'src/components/templates/selection-area/types';
import { MultiLineChartInput, Prefecture } from 'src/types';
import { PrefectureToPopulationDataSet } from '../types';

const mergeMultiLineInput = (
  prevMultiLineInputs: MultiLineChartInput,
  newMultiLineInputs: MultiLineChartInput
): MultiLineChartInput => {
  const years = [...Object.keys(prevMultiLineInputs), ...Object.keys(newMultiLineInputs)];
  return years.reduce<MultiLineChartInput>((inputResults, year) => {
    const prevPrefctureToPopulationValue = Object.hasOwn(prevMultiLineInputs, year) ? prevMultiLineInputs[year] : {};
    const newPrefctureToPopulationValue = Object.hasOwn(newMultiLineInputs, year) ? newMultiLineInputs[year] : {};
    return {
      ...inputResults,
      [year]: {
        ...prevPrefctureToPopulationValue,
        ...newPrefctureToPopulationValue
      }
    };
  }, {});
};

export const convertToMultiLineInput = (
  selectedLabel: string,
  datasets: PrefectureToPopulationDataSet[]
): MultiLineChartInput => {
  if (datasets.length === 0) {
    return {};
  }
  return datasets.reduce<MultiLineChartInput>((prevMultiLineInputs, dataset) => {
    const { boundaryYear } = dataset.populations;
    const currentPopulations = dataset.populations.statisticsLabelToPopulations.get(selectedLabel);
    if (!currentPopulations) {
      return prevMultiLineInputs;
    }

    const currecntMultiLineInputs = currentPopulations
      .filter((population) => population.year <= boundaryYear)
      .reduce<MultiLineChartInput>(
        (prev, population) => ({
          ...prev,
          [population.year.toString()]: {
            [dataset.prefName]: population.value
          }
        }),
        {}
      );

    return mergeMultiLineInput(prevMultiLineInputs, currecntMultiLineInputs);
  }, {});
};

export const convertToSelectableItems = (prefs: Prefecture[]): SelectableItem[] =>
  prefs.map((pref) => ({
    id: String(pref.prefCode),
    label: pref.prefName
  }));
