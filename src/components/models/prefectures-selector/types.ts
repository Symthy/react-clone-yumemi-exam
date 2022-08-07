import { PrefectureResponeseResult } from 'src/api/resasApiClient';

export type Prefecture = PrefectureResponeseResult & {
  isSelected: boolean;
};
