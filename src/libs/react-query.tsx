import toast from 'react-hot-toast';
import { css } from '@emotion/react';
import { DefaultOptions, QueryClient, UseQueryOptions } from '@tanstack/react-query';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BsExclamationDiamond } from 'react-icons/bs';
import { ApiClientError } from 'src/api/error';
import { PREFECTURES_QUERY_KEY } from 'src/consts';
import { Promisable } from 'type-fest'; // eslint-disable-line import/no-extraneous-dependencies

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Promisable<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    staleTime: Infinity,
    useErrorBoundary: true
  }
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig
});

export const resetQueryCache = () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  queryClient.resetQueries([PREFECTURES_QUERY_KEY]);
};

const onToaster = (err: ApiClientError) => {
  const styles = {
    head: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    btn: css`
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0.3);
      :hover {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      }
    `
  };
  toast(
    (t) => (
      <div>
        <div css={styles.head}>
          <BsExclamationDiamond color='#e41010' size={16} />
          <div>{`RESAS API Error:  ${err.statusCode} ${err.message}`}</div>

          <AiFillCloseSquare size={24} css={styles.btn} onClick={() => toast.dismiss(t.id)} />
        </div>
        <p>{err.displayMessage}</p>
      </div>
    ),
    { duration: Infinity }
  );
};

export const errorBoundaryOption = {
  // デフォルトはtrue? trueだとError Boundaryまで？throw Errorを通してしまうため抑止
  useErrorBoundary: (err: Error) => !(err instanceof ApiClientError),
  onError: (err: Error) => {
    if (err instanceof ApiClientError) {
      onToaster(err);
      // Todo: ボタンで閉じるようにしたいのでカスタマイズする
      // ref: https://mebee.info/2021/04/28/post-27258/
    }
  }
};
