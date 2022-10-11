export type PrefectureResponse = {
  prefCode: number;
  prefName: string;
};

export type ErrorResponseBody = {
  statusCode?: string;
  message?: string;
  description?: string;
};
