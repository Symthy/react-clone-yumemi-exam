import { PrefecturePopulationGraph } from './components/prefecture-population-graph';
import { PrefecturesSelector } from './components/prefectures-selector';
import { usePrefecturesState } from './hooks/usePrefecturesState';

export const PrefectureGraphPage = () => {
  const { prefectures, savePrefectures, updateSelectedPrefecture } = usePrefecturesState();

  return (
    <>
      <PrefecturesSelector
        prefectures={prefectures}
        savePrefectures={savePrefectures}
        updateSelectedPrefecture={updateSelectedPrefecture}
      />
      <PrefecturePopulationGraph prefectures={prefectures.filter((pref) => pref.isSelected)} />
    </>
  );
};
