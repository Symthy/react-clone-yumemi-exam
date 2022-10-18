export type MultiLineChartInput = Record<string, Record<string, number>>;

export type RechartPlotData =
  | {
      name: string;
    }
  | Record<string, number>;
// const _: RechartPlotData = {
//   name: 'aaa',
//   data1: 100,
//   data2: 200
// };

export type DatakeyToColor = {
  [key: string]: string;
};
